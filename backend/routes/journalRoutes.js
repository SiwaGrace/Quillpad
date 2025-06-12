const express = require("express");
const router = express.Router();
const {
  getJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalController");

router.route("/").get(getJournals).post(createJournal);
router.route("/:id").get(getJournal).put(updateJournal).delete(deleteJournal);

module.exports = router;
