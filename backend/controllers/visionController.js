const asyncHandler = require("express-async-handler");
const Vision = require("../models/Vision.js");

// @desc    Create a new Vision
// @route   POST /api/visions
// @access  Private (user must be authenticated)
const createVision = asyncHandler(async (req, res) => {
  const {
    userId,
    title,
    description,
    category,
    status,
    subVisions,
    startDate,
    targetDate,
  } = req.body;

  // Basic validation
  if (!userId || !title) {
    res.status(400);
    throw new Error("userId and title are required");
  }

  // Create Vision object
  const vision = new Vision({
    userId,
    title,
    description: description || "",
    category: category || "",
    status: status || "not started",
    subVisions: subVisions || [],
    reflections: [],
    progress: 0,
    startDate: startDate || null,
    targetDate: targetDate || null,
  });

  // Save to DB
  const createdVision = await vision.save();

  res.status(201).json(createdVision);
});

module.exports = { createVision };
