import axios from "axios";

const BASE_HOST = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: `${BASE_HOST}/api/journals`,
  withCredentials: true,
});

// Get all journals
export const getJournals = async () => {
  const res = await api.get("/");
  return res.data;
};

// Add a new journal
export const addJournal = async (journal) => {
  const res = await api.post("/", journal);
  return res.data;
};

// Delete a journal by ID
export const deleteJournal = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

// Update a journal by ID
export const updateJournal = async (id, updatedJournal) => {
  const res = await api.put(`/${id}`, updatedJournal);
  return res.data;
};
