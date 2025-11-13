const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createVision } = require("../controllers/visionController");

const router = express.Router();

// router.post("/", protect, createVision); // POST /api/visions
router.post("/", createVision);

module.exports = router;
