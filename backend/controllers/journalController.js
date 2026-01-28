const Journal = require("../models/Journal");
const asyncHandler = require("express-async-handler");
const Vision = require("../models/vision");
const SubVision = require("../models/SubVision");

// @desc    Create new journal
// @route   POST /api/journals
// @access  Private
const createJournal = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    visionId,
    subVisionId,
    // , mood, insights
  } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const journal = await Journal.create({
    title,
    content,
    userId: req.user._id,
    visionId: visionId || null,
    subVisionId: subVisionId || null,
    // mood: mood || null,
    // insights: insights || null,
  });

  // Add references to Vision or SubVision if they exist
  try {
    if (subVisionId) {
      const subvisionExists = await SubVision.findById(subVisionId);
      if (subvisionExists) {
        await SubVision.findByIdAndUpdate(subVisionId, {
          $push: { reflections: journal._id },
        });
      }
    } else if (visionId) {
      const visionExists = await Vision.findById(visionId);
      if (visionExists) {
        await Vision.findByIdAndUpdate(visionId, {
          $push: { reflections: journal._id },
        });
      }
    }
  } catch (err) {
    console.error("Failed to update reflections:", err.message);
  }

  res.status(201).json(journal);
});

// @desc    Get journals (by vision, subvision, or all independent journals for user)
// @route   GET /api/journals
// @access  Private
const getJournals = asyncHandler(async (req, res) => {
  const { visionId, subVisionId } = req.query;

  // Start with empty filter
  const filter = { userId: req.user._id }; // Only journals of the logged-in user

  // Filter by vision if provided
  if (visionId) {
    filter.visionId = visionId;
  }

  // Filter by subvision if provided
  if (subVisionId) {
    filter.subVisionId = subVisionId;
  }

  // Fetch journals
  const journals = await Journal.find(filter)
    .populate("visionId", "title") // optional: get vision title
    .populate("subVisionId", "title") // optional: get subvision title
    .sort({ createdAt: -1 });

  res.status(200).json(journals);
});

// @desc    Get single journal
// @route   GET /api/journals/:id
// @access  Private
const getJournal = asyncHandler(async (req, res) => {
  // const journal = await Journal.findOne({
  //   _id: req.params.id,
  //   user: req.user.id,
  // });
  const { id } = req.params;

  const journal = await Journal.findById(id);

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  res.status(200).json(journal);
});

// @desc    Update journal
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = asyncHandler(async (req, res) => {
  const { title, content, visionId } = req.body;
  const { id } = req.params;

  const journal = await Journal.findById(id);

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  const updatedJournal = await Journal.findByIdAndUpdate(
    id,
    {
      title: title || journal.title,
      content: content || journal.content,
      visionId: visionId !== undefined ? visionId : journal.visionId,
      updatedAt: Date.now(),
    },
    { new: true },
  );

  res.status(200).json(updatedJournal);
});

// @desc    Delete journal
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = asyncHandler(async (req, res) => {
  // const journal = await Journal.findOne({
  //   _id: req.params.id,
  //   user: req.user.id,
  // });
  const { id } = req.params;

  const journal = await Journal.findByIdAndDelete(id);

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  res.status(200).json({
    message: "Journal deleted successfully",
    deletedId: id,
    journaltitle: journal.title,
    journalcontent: journal.content,
  });
});

module.exports = {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
};
