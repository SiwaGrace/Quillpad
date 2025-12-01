import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSubVision,
  getAllSubVisions,
  getSubVisionById,
  updateSubVision,
  deleteSubVision,
} from "../api/subvision";

// -------------------------------
// Async Thunks
// -------------------------------

// Fetch all subvisions for a specific vision
export const fetchSubVisions = createAsyncThunk(
  "subvisions/fetchAll",
  async (visionId, thunkAPI) => {
    try {
      return await getAllSubVisions(visionId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Fetch a specific subvision
export const fetchSubVisionById = createAsyncThunk(
  "subvisions/fetchOne",
  async ({ visionId, subId }, thunkAPI) => {
    try {
      return await getSubVisionById(visionId, subId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Add a new subvision
export const addSubVision = createAsyncThunk(
  "subvisions/add",
  async ({ visionId, data }, thunkAPI) => {
    try {
      return await createSubVision(visionId, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Update subvision
export const updateSubVisionById = createAsyncThunk(
  "subvisions/update",
  async ({ visionId, subId, data }, thunkAPI) => {
    try {
      return await updateSubVision(visionId, subId, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Delete subvision
export const removeSubVision = createAsyncThunk(
  "subvisions/remove",
  async ({ visionId, subId }, thunkAPI) => {
    try {
      await deleteSubVision(visionId, subId);
      return subId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// -------------------------------
// Slice
// -------------------------------

const subVisionSlice = createSlice({
  name: "subvisions",
  initialState: {
    items: [], // all subvisions of selected vision
    selected: null, // single subvision details
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedSubVision: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchSubVisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubVisions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubVisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch one
      .addCase(fetchSubVisionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubVisionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchSubVisionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addSubVision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubVision.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addSubVision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateSubVisionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubVisionById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;

        // also update selected if open
        if (state.selected?._id === action.payload._id)
          state.selected = action.payload;
      })
      .addCase(updateSubVisionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(removeSubVision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSubVision.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((s) => s._id !== action.payload);

        if (state.selected?._id === action.payload) state.selected = null;
      })
      .addCase(removeSubVision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedSubVision } = subVisionSlice.actions;
export default subVisionSlice.reducer;
