const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vision",
      required: true,
    },
    subVisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vision.subVisions",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    }, // e.g., "My progress this week"
    content: {
      type: String,
      required: true,
    }, // detailed reflection
    mood: {
      type: String,
      enum: ["motivated", "neutral", "tired", "stressed", "proud"],
    },
    insights: { type: String }, // optional key takeaways
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", JournalSchema);
