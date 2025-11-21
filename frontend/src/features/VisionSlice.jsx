import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision,
} from "../api/vision";

export const fetchVisions = createAsyncThunk(
  "visions/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getAllVisions();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const addVision = createAsyncThunk(
  "visions/add",
  async (data, thunkAPI) => {
    try {
      return await createVision(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateVisionById = createAsyncThunk(
  "visions/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateVision(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const removeVision = createAsyncThunk(
  "visions/remove",
  async (id, thunkAPI) => {
    try {
      await deleteVision(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const visionSlice = createSlice({
  name: "visions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchVisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addVision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVision.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addVision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update
      .addCase(updateVisionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVisionById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (v) => v._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateVisionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete
      .addCase(removeVision.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVision.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((v) => v._id !== action.payload);
      })
      .addCase(removeVision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default visionSlice.reducer;
