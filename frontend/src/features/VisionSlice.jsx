import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision,
} from "../api/vision";

// Async thunks
export const fetchVisions = createAsyncThunk("visions/fetchAll", async () => {
  const response = await getAllVisions();
  return response.data;
});

export const addVision = createAsyncThunk("visions/add", async (data) => {
  const response = await createVision(data);
  return response.data;
});

export const removeVision = createAsyncThunk("visions/remove", async (id) => {
  await deleteVision(id);
  return id;
});

export const updateVisionById = createAsyncThunk(
  "visions/update",
  async ({ id, data }) => {
    const response = await updateVision(id, data);
    return response.data;
  }
);

// Slice
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
      .addCase(fetchVisions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addVision.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeVision.fulfilled, (state, action) => {
        state.items = state.items.filter((v) => v._id !== action.payload);
      })
      .addCase(updateVisionById.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (v) => v._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default visionSlice.reducer;
