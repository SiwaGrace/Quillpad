const asyncHandler = require("express-async-handler");
const Vision = require("../models/Vision");

// ---------------------------------------------
// ADD Sub-Vision
// POST /api/visions/:visionId/subvisions
// ---------------------------------------------
const addSubVision = asyncHandler(async (req, res) => {
  const { visionId } = req.params;
  const { title, description, status } = req.body;

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const newSub = {
    title,
    description: description || "",
    status: status || "not started",
    reflections: [],
    progress: 0,
  };

  vision.subVisions.push(newSub);
  await vision.save();

  res.status(201).json(vision);
});

// ---------------------------------------------
// GET all Sub-VISIONS
// GET /api/visions/:visionId/subvisions
// ---------------------------------------------
const getAllSubVisions = asyncHandler(async (req, res) => {
  const { visionId } = req.params;

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  res.json(vision.subVisions);
});

// ---------------------------------------------
// GET single Sub-VISION
// GET /api/visions/:visionId/subvisions/:subId
// ---------------------------------------------
const getSubVisionById = asyncHandler(async (req, res) => {
  const { visionId, subId } = req.params;

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const sub = vision.subVisions.id(subId);
  if (!sub) {
    res.status(404);
    throw new Error("Sub-vision not found");
  }

  res.json(sub);
});

// ---------------------------------------------
// UPDATE Sub-Vision
// PUT /api/visions/:visionId/subvisions/:subId
// ---------------------------------------------
const updateSubVision = asyncHandler(async (req, res) => {
  const { visionId, subId } = req.params;

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const sub = vision.subVisions.id(subId); // <-- Beautiful Mongoose method
  if (!sub) {
    res.status(404);
    throw new Error("Sub-vision not found");
  }

  const { title, description, status, progress } = req.body;

  sub.title = title ?? sub.title;
  sub.description = description ?? sub.description;
  sub.status = status ?? sub.status;
  sub.progress = progress ?? sub.progress;

  await vision.save();

  res.json(vision);
});

// ---------------------------------------------
// DELETE Sub-Vision
// DELETE /api/visions/:visionId/subvisions/:subId
// ---------------------------------------------
const deleteSubVision = asyncHandler(async (req, res) => {
  const { visionId, subId } = req.params;

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const sub = vision.subVisions.id(subId);
  if (!sub) {
    res.status(404);
    throw new Error("Sub-vision not found");
  }

  sub.remove(); // <-- Mongoose method again
  await vision.save();

  res.json({ message: "Sub-vision deleted", subId });
});

module.exports = {
  addSubVision,
  getAllSubVisions,
  getSubVisionById,
  updateSubVision,
  deleteSubVision,
};
