// /utils/progressUtils.js
const Vision = require("../models/Vision");

// Convert SubVision status → progress
const subVisionProgressFromStatus = (status) => {
  if (status === "completed") return 100;
  if (status === "in progress") return 50;
  return 0;
};

// Recalculate Vision status and progress from its SubVisions
const recalculateVisionStatusAndProgress = async (visionId) => {
  const vision = await Vision.findById(visionId).populate("subVisions");
  if (!vision) return;

  // Case: no subvisions
  if (!vision.subVisions.length) {
    // Vision status stays as-is or defaults
    vision.status =
      vision.status === "completed"
        ? "completed"
        : vision.status === "in progress"
        ? "in progress"
        : "not started";

    await vision.save();
    return;
  }

  // Compute average progress from subvisions
  const progresses = vision.subVisions.map((s) => s.progress);
  const avg = Math.round(
    progresses.reduce((a, b) => a + b, 0) / progresses.length
  );

  // Determine vision status
  if (avg === 0) vision.status = "not started";
  else if (avg === 100) vision.status = "completed";
  else vision.status = "in progress";

  await vision.save();
};

module.exports = {
  subVisionProgressFromStatus,
  recalculateVisionStatusAndProgress,
};
