const express = require("express");
const router = express.Router();
const {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getJournals).post(protect, createJournal);

router
  .route("/:id")
  .get(protect, getJournal)
  .put(protect, updateJournal)
  .delete(protect, deleteJournal);

module.exports = router;
