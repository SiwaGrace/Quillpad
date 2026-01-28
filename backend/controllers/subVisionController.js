const asyncHandler = require("express-async-handler");
const Vision = require("../models/vision");
const SubVision = require("../models/SubVision");
const {
  subVisionProgressFromStatus,
  recalculateVisionStatus,
} = require("../utils/progressUtils");

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
  const progress = subVisionProgressFromStatus(status);

  const newSub = await SubVision.create({
    visionId,
    title,
    description: description || "",
    status: status || "not started",
    reflections: [],
    progress,
  });

  vision.subVisions.push(newSub._id);
  await vision.save();
  await recalculateVisionStatus(visionId);

  // // Optional: return full updated Vision
  // const updatedVision = await Vision.findById(visionId).populate("subVisions");
  // res.status(201).json(updatedVision);
  //   This way the frontend immediately knows the Vision’s new status/progress and all subvisions, not just the new one.

  // But if your frontend only needs the new subvision, your current code is perfectly fine.

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
  const { title, description, status } = req.body;

  const sub = await SubVision.findOne({ _id: subId, visionId });
  if (!sub) {
    res.status(404);
    throw new Error("Sub-vision not found");
  }

  if (status) {
    sub.status = status;
    sub.progress = subVisionProgressFromStatus(status);
  }

  sub.title = title ?? sub.title;
  sub.description = description ?? sub.description;

  await sub.save();
  await recalculateVisionStatus(visionId);

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
  await recalculateVisionStatus(visionId);

  res.json({ message: "Sub-vision deleted", subId });
});

module.exports = {
  addSubVision,
  getAllSubVisions,
  getSubVisionById,
  updateSubVision,
  deleteSubVision,
};
