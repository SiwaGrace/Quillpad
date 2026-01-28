import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const GetDailyPrompt = async () => {
  try {
    const res = await fetch(`${BASE_HOST}/api/daily-quote`);

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
