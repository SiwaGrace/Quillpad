import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getJournals,
  addJournal,
  deleteJournal,
  updateJournal,
} from "../api/journalApi";

// ============================
// THUNKS
// ============================

// GET all journals
export const fetchJournals = createAsyncThunk(
  "journal/fetchJournals",
  async (_, { rejectWithValue }) => {
    try {
      return await getJournals(); // returns res.data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch journals"
      );
    }
  }
);

// GET one journal by ID
export const fetchJournalById = createAsyncThunk(
  "journal/fetchJournalById",
  async (id, { rejectWithValue }) => {
    try {
      return await getJournal(id); // returns res.data
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch journal"
      );
    }
  }
);

// ADD a journal
export const createJournal = createAsyncThunk(
  "journal/createJournal",
  async (journalData, { rejectWithValue }) => {
    try {
      return await addJournal(journalData);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create journal"
      );
    }
  }
);

// DELETE a journal
export const removeJournal = createAsyncThunk(
  "journal/removeJournal",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteJournal(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete journal"
      );
    }
  }
);

// UPDATE a journal
export const editJournal = createAsyncThunk(
  "journal/editJournal",
  async ({ id, updatedJournal }, { rejectWithValue }) => {
    try {
      return await updateJournal(id, updatedJournal);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update journal"
      );
    }
  }
);

// ============================
// SLICE
// ============================
const journalSlice = createSlice({
  name: "journal",
  initialState: {
    entries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== GET Journals =====
      .addCase(fetchJournals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload; // array of journals
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===== GET Journal =====
      .addCase(fetchJournalById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJournalById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentEntry = action.payload; // store single journal
      })
      .addCase(fetchJournalById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ===== CREATE Journal =====
      .addCase(createJournal.fulfilled, (state, action) => {
        state.entries.unshift(action.payload); // add new journal to the top
      })

      // ===== DELETE Journal =====
      .addCase(removeJournal.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.entries = state.entries.filter((j) => j._id !== deletedId);
      })

      // ===== UPDATE Journal =====
      .addCase(editJournal.fulfilled, (state, action) => {
        const updatedJournal = action.payload;
        const index = state.entries.findIndex(
          (j) => j._id === updatedJournal._id
        );
        if (index !== -1) {
          state.entries[index] = updatedJournal;
        }
      });
  },
});

export default journalSlice.reducer;
