import { useEffect, useState, useRef } from "react";
import { GetDailyScripture } from "../../api/GetDailyScripture";
import { GetDailyPrompt } from "../../api/GetDailyPrompt";

export const useDailyInspiration = () => {
  const [scripture, setScripture] = useState(null);
  const [prompt, setPrompt] = useState(null);

  // Prevent StrictMode double fetching
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const today = new Date().toISOString().split("T")[0];

    const stored = JSON.parse(localStorage.getItem("daily_inspiration"));

    if (stored && stored.date === today) {
      setScripture(stored.scripture);
      setPrompt(stored.prompt);
      return;
    }

    const loadData = async () => {
      const s = await GetDailyScripture();
      const p = await GetDailyPrompt();

      const payload = {
        date: today,
        scripture: s,
        prompt: p,
      };

      localStorage.setItem("daily_inspiration", JSON.stringify(payload));

      setScripture(s);
      setPrompt(p);
    };

    loadData();
  }, []);

  return { scripture, prompt };
};
