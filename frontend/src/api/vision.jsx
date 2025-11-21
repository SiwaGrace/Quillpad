import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BASE_HOST}/api/visions`,
  withCredentials: true,
});

// Create a new vision
export const createVision = async (data) => {
  const res = await api.post("/", data);
  return res.data;
};

// Get all visions
export const getAllVisions = async () => {
  const res = await api.get("/");
  return res.data;
};

// Get a single vision by ID
export const getVisionById = async (id) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

// Update a vision by ID
export const updateVision = async (id, data) => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

// Delete a vision by ID
export const deleteVision = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};
