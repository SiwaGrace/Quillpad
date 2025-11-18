// export const GetDailyPrompt = async () => {
//   try {
//     const res = await fetch("https://zenquotes.io/api/random");
//     if (!res.ok) throw new Error("Network response was not ok");
//     const data = await res.json();

//     // The API returns an array of quote objects:
//     // [{ q: "Quote text", a: "Author", ... }]
//     const { q: prompt, a: author } = data[0];

//     return { prompt, author };
//   } catch (err) {
//     console.error("Failed to fetch daily prompt:", err);
//     return {
//       prompt: "Stay positive — something good is coming.",
//       author: "Unknown",
//     };
//   }
// };
