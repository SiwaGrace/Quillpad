import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from "../api/auth";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed",
      );
    }
  },
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

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await forgotPasswordApi(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send reset email",
      );
    }
  },
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      return await resetPasswordApi(token, newPassword);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reset password",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    message: null,
    loading: false,
    loginLoading: false,
    registerLoading: false,
    forgotPasswordLoading: false,
    resetPasswordLoading: false,
    error: null,
    authChecked: false, // 🔑 key fix
  },

  reducers: {
    // Call this as soon as the user starts typing
    clearAuthError: (state) => {
      state.error = null;
    },
    // Call this for front-end validation (e.g., "Passwords don't match")
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loginLoading = false;
      state.registerLoading = false;
    },
  },

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
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.message = action.payload?.message || null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.error = action.payload;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.message = action.payload?.message || null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearAuthError, setAuthError } = authSlice.actions;
export default authSlice.reducer;
