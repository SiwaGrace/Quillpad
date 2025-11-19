// routes/quotes.js
const express = require("express");
const router = express.Router();

router.get("/daily-quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/today");
    const data = await response.json();

    return res.json({
      quote: data[0]?.q,
      author: data[0]?.a,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return res.status(500).json({ message: "Failed to fetch quote" });
  }
});

module.exports = router;
