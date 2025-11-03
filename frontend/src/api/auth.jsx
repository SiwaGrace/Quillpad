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
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error.response?.data || error.message;
  }
};

export const getMe = async () => {
  return await axios.get(`${API_URL}/me`, { withCredentials: true });
};

// ⚙️ Bonus: apiClient.js (Optional but Powerful)

// If you want all your requests to automatically include the JWT token (once logged in), add this:

// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
// });

// // Add token automatically
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default apiClient;

// Then your other files use this:

// import apiClient from "./apiClient";

// export const getTodos = () => apiClient.get("/todos");
