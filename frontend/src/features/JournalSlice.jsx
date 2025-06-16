import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch entries
export const getEntries = createAsyncThunk("journal/getEntries", async () => {
  const response = await axios.get("http://localhost:5000/api/journals");
  return response.data;
});

// Post new entry
export const postEntries = createAsyncThunk(
  "journal/postEntries",
  async (entryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/journals",
        entryData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to post entry"
      );
    }
  }
);

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    entries: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEntries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entries = action.payload;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(postEntries.fulfilled, (state, action) => {
        state.entries.unshift(action.payload); // Add new entry to top
      });
  },
});

export default journalSlice.reducer;
