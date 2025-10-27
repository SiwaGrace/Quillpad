import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/auth/register`, data);
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
