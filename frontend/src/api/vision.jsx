import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api/visions";

// Create a new vision
export const createVision = async (data) => {
  return await axios.post(API_URL, data, { withCredentials: true });
};

// Get all visions
export const getAllVisions = async () => {
  return await axios.get(API_URL, { withCredentials: true });
};

// Get a single vision by ID
export const getVisionById = async (id) => {
  return await axios.get(`${API_URL}/${id}`, { withCredentials: true });
};

// Update a vision by ID
export const updateVision = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
};

// Delete a vision by ID
export const deleteVision = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};
