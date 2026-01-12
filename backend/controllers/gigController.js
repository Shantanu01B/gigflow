const Gig = require("../models/Gig");

// CREATE GIG
exports.createGig = async(req, res) => {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
        title,
        description,
        budget,
        ownerId: req.user._id, // 🔥 THIS WAS THE ISSUE
        status: "open",
    });

    res.status(201).json(gig);
};


// GET ALL OPEN GIGS + SEARCH
exports.getGigs = async(req, res) => {
    const keyword = req.query.search ? {
        title: { $regex: req.query.search, $options: "i" },
    } : {};

    const gigs = await Gig.find({
        ...keyword,
        status: "open",
    }).populate("ownerId", "name email");

    res.json(gigs);
};

// GET SINGLE GIG
exports.getGigById = async(req, res) => {
    const gig = await Gig.findById(req.params.id).populate(
        "ownerId",
        "name email"
    );

    if (!gig) {
        return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
};
// In gigController.js
exports.getMyGigs = async(req, res) => {
    const gigs = await Gig.find({
        ownerId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(gigs);
};