// routes/scripture.js
const express = require("express");
const router = express.Router();

router.get("/daily-scripture", async (req, res) => {
  try {
    const url = "https://bible-api.com/data/web/random";
    const response = await fetch(url);
    const data = await response.json();

    const verse = data.random_verse;

    console.log(verse);

    return res.json({
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text,
    });
  } catch (error) {
    console.error("Error fetching scripture:", error);
    return res.status(500).json({ message: "Failed to fetch scripture" });
  }
});

module.exports = router;
