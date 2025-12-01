import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlices";
import visionReducer from "../features/VisionSlice";
import subVisionReducer from "../features/SubVisionSlice";
import journalReducer from "../features/JournalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visions: visionReducer,
    subvisions: subVisionReducer,
    journal: journalReducer,
  },
});
