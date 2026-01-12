const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
    createBid,
    getBidsForGig,
    getMyBids,
    updateBid,
    hireBid,
} = require("../controllers/bidController");

// freelancer
router.post("/", protect, createBid);
router.get("/my/bids", protect, getMyBids);
router.get("/gig/:gigId", protect, getBidsForGig);
router.put("/:bidId", protect, updateBid);

// client
router.patch("/:bidId/hire", protect, hireBid);

module.exports = router;