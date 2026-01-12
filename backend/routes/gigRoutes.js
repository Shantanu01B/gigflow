const express = require("express");
const router = express.Router();
const {
    createGig,
    getGigs,
    getGigById,
    getMyGigs,
} = require("../controllers/gigController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getGigs);
router.get("/my", protect, getMyGigs); // static FIRST
router.get("/:id", getGigById); // dynamic LAST
router.post("/", protect, createGig);

module.exports = router;