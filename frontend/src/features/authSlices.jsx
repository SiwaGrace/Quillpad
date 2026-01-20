import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, getMe } from "../api/auth";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

// GET LOGGED-IN USER
export const fetchUser = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    return await getMe();
  } catch (error) {
    return thunkAPI.rejectWithValue("UNAUTHORIZED"); // user not logged in
  }
});

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  return await logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    message: null,
    loading: false,
    loginLoading: false,
    registerLoading: false,
    error: null,
    authChecked: false, // 🔑 key fix
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload;
      })

      // GET USER
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        // VM2409:1  GET http://localhost:4000/api/auth/me 401 (Unauthorized) when loggedout
        state.user = action.payload?.user || null;
        state.message = action.payload?.message || null;
        state.authChecked = true; // ✅ stop future calls
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.message = null;
        state.authChecked = true; // ✅ stop future calls
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.message = null;
      });
  },
});

export default authSlice.reducer;
