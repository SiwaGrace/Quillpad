export const GetDailyPrompt = async () => {
  try {
    // Call YOUR backend instead of ZenQuotes directly
    const res = await fetch("http://localhost:4000/api/daily-quote");

    if (!res.ok) {
      throw new Error("Failed to fetch daily prompt");
    }

    const data = await res.json();

    return {
      prompt: data.quote,
      author: data.author,
    };
  } catch (error) {
    console.error("Daily Prompt Error:", error);

    return {
      prompt,
      author,
    };
  }
};
