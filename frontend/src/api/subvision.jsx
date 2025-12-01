import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BASE_HOST}/api/visions`,
  withCredentials: true,
});

// -----------------------------
// SubVision API
// -----------------------------

// Create subvision
export const createSubVision = async (visionId, data) => {
  const res = await api.post(`/${visionId}/subvisions`, data);
  return res.data;
};

// Get all subvisions of a vision
export const getAllSubVisions = async (visionId) => {
  const res = await api.get(`/${visionId}/subvisions`);
  return res.data;
};

// Get a single subvision
export const getSubVisionById = async (visionId, subId) => {
  const res = await api.get(`/${visionId}/subvisions/${subId}`);
  return res.data;
};

// Update subvision
export const updateSubVision = async (visionId, subId, data) => {
  const res = await api.put(`/${visionId}/subvisions/${subId}`, data);
  return res.data;
};

// Delete subvision
export const deleteSubVision = async (visionId, subId) => {
  const res = await api.delete(`/${visionId}/subvisions/${subId}`);
  return res.data;
};
