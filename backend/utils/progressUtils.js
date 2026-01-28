// /utils/progressUtils.js
const Vision = require("../models/vision");

// Convert SubVision status → progress
const subVisionProgressFromStatus = (status) => {
  if (status === "completed") return 100;
  if (status === "in progress") return 50;
  return 0;
};

// Recalculate Vision status and progress from its SubVisions
const recalculateVisionStatus = async (visionId) => {
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

  // Determine status based on subVision progress
  const totalProgress = vision.subVisions.reduce(
    (sum, sub) => sum + subVisionProgressFromStatus(sub.status),
    0,
  );
  const avgProgress = Math.round(totalProgress / vision.subVisions.length);

  if (avgProgress === 0) vision.status = "not started";
  else if (avgProgress === 100) vision.status = "completed";
  else vision.status = "in progress";

  await vision.save();
};

module.exports = {
  subVisionProgressFromStatus,
  recalculateVisionStatus,
};
