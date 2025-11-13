const asyncHandler = require("express-async-handler");
const Vision = require("../models/Vision");

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

// @desc    Get all Visions
// @route   GET /api/visions
// @access  Private
const getAllVisions = asyncHandler(async (req, res) => {
  const visions = await Vision.find();
  res.json(visions);
});

// @desc    Get single Vision by ID
// @route   GET /api/visions/:id
// @access  Private
const getVisionById = asyncHandler(async (req, res) => {
  const vision = await Vision.findById(req.params.id);

  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  res.json(vision);
});

// @desc    Update Vision by ID
// @route   PUT /api/visions/:id
// @access  Private
const updateVision = asyncHandler(async (req, res) => {
  const vision = await Vision.findById(req.params.id);

  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const {
    title,
    description,
    category,
    status,
    subVisions,
    startDate,
    targetDate,
  } = req.body;

  vision.title = title || vision.title;
  vision.description = description || vision.description;
  vision.category = category || vision.category;
  vision.status = status || vision.status;
  vision.subVisions = subVisions || vision.subVisions;
  vision.startDate = startDate || vision.startDate;
  vision.targetDate = targetDate || vision.targetDate;

  const updatedVision = await vision.save();
  res.json(updatedVision);
});

// @desc    Delete Vision by ID
// @route   DELETE /api/visions/:id
// @access  Private
const deleteVision = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedVision = await Vision.findByIdAndDelete(id);

  if (!deletedVision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  res.status(200).json({
    message: "vision deleted successfully",
    deletedId: id,
    visiontitle: deletedVision.title,
    visioncontent: deletedVision.description,
  });
});

module.exports = {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision,
};
