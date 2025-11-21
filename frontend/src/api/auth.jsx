import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BASE_HOST}/api/auth`,
  withCredentials: true,
});

// Refresh token when access token expires
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalReq = error.config;

//     if (error.response?.status === 401 && !originalReq._retry) {
//       originalReq._retry = true;
//       try {
//         await api.get("/refresh");
//         return api(originalReq);
//       } catch {
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export const loginUser = async (credentials) => {
  const res = await api.post("/login", credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await api.post("/register", userData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/logout");
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/me");
  return res.data;
};
