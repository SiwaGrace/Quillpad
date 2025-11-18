// const maxChapters = {
//   Genesis: 50,
//   Exodus: 40,
//   Leviticus: 27,
//   Numbers: 36,
//   Deuteronomy: 34,
//   Joshua: 24,
//   Judges: 21,
//   Ruth: 4,
//   "1 Samuel": 31,
//   "2 Samuel": 24,
//   // ... continue for all books
//   Obadiah: 1,
//   Philemon: 1,
//   Psalms: 150,
//   // etc.
// };

// const getRandomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// export const GetDailyScripture = async () => {
//   try {
//     const book = books[getRandomInt(0, books.length - 1)];
//     const chapter = getRandomInt(1, maxChapters[book]);
//     const verse = getRandomInt(1, 30); // optional: later can map chapter → maxVerse

//     const reference = `${book}+${chapter}:${verse}`;
//     const url = `https://bible-api.com/${encodeURIComponent(
//       reference
//     )}?translation=web`;

//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Network response was not ok");
//     const data = await res.json();

//     return {
//       reference: data.reference,
//       text: data.text,
//       translation: data.translation_name,
//     };
//   } catch (err) {
//     console.error("Failed to fetch random verse:", err);
//     return {
//       reference: "",
//       text: "Could not load verse. Try again later.",
//       translation: "WEB",
//     };
//   }
// };
