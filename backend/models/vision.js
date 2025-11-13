const mongoose = require("mongoose");

// ---- SUBVISIONS FIELD ----
const subVisionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Learn Frontend"
  description: { type: String },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  reflections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journal", // connect reflections specific to this sub-vision
    },
  ],
  progress: { type: Number, default: 0 }, // percentage (optional)
});

// ---- VISIONS FIELD ----
const visionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true, // e.g., "Become the best fullstack developer"
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
    progress: {
      type: Number,
      default: 0, // auto-calculated from sub-visions later
    },
    startDate: Date,
    targetDate: Date,
    subVisions: [subVisionSchema], // mini goals
  },
  { timestamps: true }
);

// ---- Virtual field ----
visionSchema.virtual("subVisionCount").get(function () {
  return this.subVisions ? this.subVisions.length : 0;
});

// Making sure virtuals appear in JSON / objects
visionSchema.set("toJSON", { virtuals: true });
visionSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Vision", visionSchema);
