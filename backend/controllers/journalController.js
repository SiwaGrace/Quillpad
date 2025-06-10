const Journal = require("../models/Journal");
const asyncHandler = require("express-async-handler");

// @desc    Get all journals for a user
// @route   GET /api/journals
// @access  Private
const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(journals);
});

// @desc    Get single journal
// @route   GET /api/journals/:id
// @access  Private
const getJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  res.status(200).json(journal);
});

// @desc    Create new journal
// @route   POST /api/journals
// @access  Private
const createJournal = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const journal = await Journal.create({
    title,
    content,
    user: req.user.id,
  });

  res.status(201).json(journal);
});

// @desc    Update journal
// @route   PUT /api/journals/:id
// @access  Private
const updateJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  const updatedJournal = await Journal.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title || journal.title,
      content: req.body.content || journal.content,
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
  const journal = await Journal.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  await journal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
};
