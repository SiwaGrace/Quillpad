const asyncHandler = require("express-async-handler");
const Vision = require("../models/Vision");
const SubVision = require("../models/SubVision");

// ---------------------------------------------
// ADD Sub-Vision
// POST /api/visions/:visionId/subvisions
// ---------------------------------------------
const addSubVision = asyncHandler(async (req, res) => {
  const { visionId } = req.params;
  const { title, description, status } = req.body;
  console.log("visionId:", visionId, "body:", req.body);

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const newSub = await SubVision.create({
    visionId,
    title,
    description: description || "",
    status: status || "not started",
    reflections: [],
    progress: 0,
  });

  vision.subVisions.push(newSub._id);
  await vision.save();

  res.status(201).json(newSub);
});

// ---------------------------------------------
// GET all Sub-VISIONS for a Vision
// GET /api/visions/:visionId/subvisions
// ---------------------------------------------
const getAllSubVisions = asyncHandler(async (req, res) => {
  const { visionId } = req.params;

  const vision = await Vision.findById(visionId);
  if (!vision) {
    res.status(404);
    throw new Error("Vision not found");
  }

  const subvisions = await SubVision.find({ visionId });
  res.json(subvisions);
});

// ---------------------------------------------
// GET single Sub-VISION
// GET /api/visions/:visionId/subvisions/:subId
// ---------------------------------------------
const getSubVisionById = asyncHandler(async (req, res) => {
  const { visionId, subId } = req.params;

  const sub = await SubVision.findOne({ _id: subId, visionId });
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
  const { title, description, status, progress } = req.body;

  const sub = await SubVision.findOne({ _id: subId, visionId });
  if (!sub) {
    res.status(404);
    throw new Error("Sub-vision not found");
  }

  sub.title = title ?? sub.title;
  sub.description = description ?? sub.description;
  sub.status = status ?? sub.status;
  sub.progress = progress ?? sub.progress;

  await sub.save();
  res.json(sub);
});

// ---------------------------------------------
// DELETE Sub-Vision
// DELETE /api/visions/:visionId/subvisions/:subId
// ---------------------------------------------
const deleteSubVision = asyncHandler(async (req, res) => {
  const { visionId, subId } = req.params;

  const sub = await SubVision.findOneAndDelete({ _id: subId, visionId });
  if (!sub) {
    res.status(404);
    throw new Error("Sub-vision not found");
  }

  // remove reference from Vision
  await Vision.findByIdAndUpdate(visionId, {
    $pull: { subVisions: sub._id },
  });

  res.json({ message: "Sub-vision deleted", subId });
});

module.exports = {
  addSubVision,
  getAllSubVisions,
  getSubVisionById,
  updateSubVision,
  deleteSubVision,
};
