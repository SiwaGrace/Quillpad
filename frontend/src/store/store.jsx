import { configureStore } from "@reduxjs/toolkit";
import journalReducer from "../features/JournalSlice";
import visionReducer from "../features/VisionSlice";
import authReducer from "../features/authSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visions: visionReducer,
    journal: journalReducer,
  },
});
