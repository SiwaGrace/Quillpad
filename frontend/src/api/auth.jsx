import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BASE_HOST}/api/auth`,
  withCredentials: true,
});

export const loginUser = async (credentials) => {
  const res = await api.post("/login", credentials);
  console.log(res.data);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await api.post("/register", userData);
  console.log(res.data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/logout");
  console.log(res.data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/me");
  console.log(res.data);
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post("/forgot-password", { email });
  console.log(res.data);
  return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await api.post(`/reset-password/${token}`, { password });
  console.log(res.data);
  return res.data;
};
