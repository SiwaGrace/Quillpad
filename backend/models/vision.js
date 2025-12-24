const mongoose = require("mongoose");

const visionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String, // e.g., "Career", "Health", "Personal Growth"
    },
    status: {
      type: String,
      enum: ["not started", "in progress", "completed"],
      default: "not started",
    },
    reflections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journal", // general reflections (not tied to sub-visions)
      },
    ],
    startDate: Date,
    targetDate: Date,
    subVisions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubVision" }, // reference subvisions
    ],
  },
  { timestamps: true }
);

// Virtual field to count subvisions
visionSchema.virtual("subVisionCount").get(function () {
  return this.subVisions ? this.subVisions.length : 0;
});

// Ensure virtuals appear in JSON / objects
visionSchema.set("toJSON", { virtuals: true });
visionSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Vision", visionSchema);
