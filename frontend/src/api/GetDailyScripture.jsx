// api/GetDailyScripture.js
export const GetDailyScripture = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/daily-scripture");
    if (!res.ok) throw new Error("Failed to fetch scripture");

    const data = await res.json();
    console.log("Fetched:", data.book);

    return {
      book: data.book,
      chapter: data.chapter,
      verse: data.verse,
      text: data.text,
    };
  } catch (err) {
    console.error("Error fetching scripture:", err);

    // SAFE fallback text
    // return {
    //   book: "Proverbs",
    //   chapter: 3,
    //   verse: 5,
    //   text: "Trust in the Lord with all your heart.",
    // };
  }
};
