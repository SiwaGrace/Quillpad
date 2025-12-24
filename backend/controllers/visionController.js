const asyncHandler = require("express-async-handler");
const Vision = require("../models/Vision");
const SubVision = require("../models/SubVision");
const Journal = require("../models/Journal");
const {
  subVisionProgressFromStatus,
  recalculateVisionStatusAndProgress,
} = require("../utils/progressUtils");

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
  const userId = req.user._id; // from auth middleware
  const visions = await Vision.find({ userId })
    .populate("subVisions")
    .populate("reflections")
    .sort({ createdAt: -1 })
    .lean();
  res.status(200).json(visions);
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
  // vision.status = status || vision.status;
  vision.subVisions = subVisions || vision.subVisions;
  vision.startDate = startDate || vision.startDate;
  vision.targetDate = targetDate || vision.targetDate;
  if (vision.subVisions.length === 0 && status) {
    vision.status = status;
    // vision.progress = subVisionProgressFromStatus(status);
  }
  if (vision.subVisions.length > 0) {
    await recalculateVisionStatusAndProgress(vision._id);
  }

  const updatedVision = await vision.save();
  res.json(updatedVision);
});

// @desc    Delete Vision by ID
// @route   DELETE /api/visions/:id
// @access  Private
const deleteVision = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const vision = await Vision.findById(id);

  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  // 1️⃣ Delete related subvisions
  await SubVision.deleteMany({ _id: { $in: vision.subVisions } });

  // 2️⃣ Delete related journals
  await Journal.deleteMany({ _id: { $in: vision.reflections } });

  // 3️⃣ Delete the vision itself
  await Vision.findByIdAndDelete(id);

  res.status(200).json({
    message: "Vision and related data deleted successfully",
    deletedId: id,
  });
});

module.exports = {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision,
};
