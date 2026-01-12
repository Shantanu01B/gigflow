const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");

/**
 * CREATE BID
 * - Only one bid per freelancer per gig
 * - Freelancer cannot bid on own gig
 * - Gig must be open
 * - 🔔 Emits real-time event: newBid
 */
exports.createBid = async(req, res) => {
    try {
        const { gigId, message, bidAmount } = req.body;

        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() === req.user._id.toString()) {
            return res
                .status(400)
                .json({ message: "You cannot bid on your own job" });
        }

        if (gig.status !== "open") {
            return res
                .status(400)
                .json({ message: "Job is not open for bidding" });
        }

        const existingBid = await Bid.findOne({
            gigId,
            freelancerId: req.user._id,
        });

        if (existingBid) {
            return res
                .status(400)
                .json({ message: "You have already placed a bid" });
        }

        const bid = await Bid.create({
            gigId,
            freelancerId: req.user._id,
            message,
            bidAmount,
        });

        // 🔔 REAL-TIME: Notify job owner
        const io = req.app.get("io");
        if (io) {
            io.to(gigId).emit("newBid");
        }

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET ALL BIDS FOR A GIG (CLIENT VIEW)
 */
exports.getBidsForGig = async(req, res) => {
    try {
        const bids = await Bid.find({ gigId: req.params.gigId })
            .populate("freelancerId", "name")
            .sort({ createdAt: -1 });

        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET MY BIDS (FREELANCER DASHBOARD)
 */
exports.getMyBids = async(req, res) => {
    try {
        const bids = await Bid.find({ freelancerId: req.user._id })
            .populate("gigId", "title budget status")
            .sort({ createdAt: -1 });

        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * UPDATE BID
 * - Only owner of bid
 * - Only if status = pending
 */
exports.updateBid = async(req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId);

        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        if (bid.freelancerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (bid.status !== "pending") {
            return res
                .status(400)
                .json({ message: "Cannot edit this bid" });
        }

        bid.message = req.body.message;
        bid.bidAmount = req.body.bidAmount;

        await bid.save();
        res.json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * HIRE BID (TRANSACTION SAFE)
 * - Only gig owner
 * - Prevent race conditions
 * - Atomic update
 * - 🔔 Emits real-time event: bidHired
 */
exports.hireBid = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bid = await Bid.findById(req.params.bidId).session(session);
        if (!bid) {
            throw new Error("Bid not found");
        }

        const gig = await Gig.findById(bid.gigId).session(session);
        if (!gig) {
            throw new Error("Gig not found");
        }

        if (gig.ownerId.toString() !== req.user._id.toString()) {
            throw new Error("Not authorized");
        }

        if (gig.status !== "open") {
            throw new Error("Gig already assigned");
        }

        // 1️⃣ Mark gig as assigned
        gig.status = "assigned";
        await gig.save({ session });

        // 2️⃣ Reject all bids for this gig
        await Bid.updateMany({ gigId: gig._id }, { status: "rejected" }, { session });

        // 3️⃣ Mark selected bid as hired
        bid.status = "hired";
        await bid.save({ session });

        await session.commitTransaction();
        session.endSession();

        // 🔔 REAL-TIME: Notify freelancers & client
        const io = req.app.get("io");
        if (io) {
            io.to(gig._id.toString()).emit("bidHired");
        }

        res.json({ message: "Freelancer hired safely" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(400).json({ message: error.message });
    }
};