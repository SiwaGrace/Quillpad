const mongoose = require("mongoose");

const subVisionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["not started", "in progress", "completed"], // space, not dash
      default: "not started",
    },
    reflections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Journal" }],
    progress: { type: Number, default: 0 },
    visionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vision",
      required: true,
    }, // name must match creation
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubVision", subVisionSchema);
