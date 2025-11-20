import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/auth";

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true, // <- this is critical
  });
};

export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/register`, data, {
    withCredentials: true, // <- this is critical
  });
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error.response?.data || error.message;
  }
};

export const getMe = async () => {
  return await axios.get(`${API_URL}/me`, { withCredentials: true });
};
