const Journal = require("../models/Journal");
const asyncHandler = require("express-async-handler");

// @desc    Create new journal
// @route   POST /api/journals
// @access  Private
const createJournal = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new Error("Please add all fields");
  }

  const journal = await Journal.create({
    title,
    content,
    // user: req.user.id,
  });

  res.status(201).json(journal);
});

// @desc    Get all journals for a user
// @route   GET /api/journals
// @access  Private
const getJournals = asyncHandler(async (req, res) => {
  // { user: req.user.id }
  const journals = await Journal.find().sort("-createdAt");
  if (journals.length === 0) {
    res.status(404);
    throw new Error("No journals found");
  }
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
  const { title, content } = req.body;
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
      updatedAt: Date.now(),
    },
    { new: true }
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
