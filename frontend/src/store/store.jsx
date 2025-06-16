import { configureStore } from "@reduxjs/toolkit";
import journalSlice from "../features/JournalSlice";

export const store = configureStore({
  reducer: {
    journal: journalSlice,
  },
});
