import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getJournals = async () => {
  return await axios.get(`${API_URL}/journals`);
};

export const addJournal = async (journal) => {
  return await axios.post(`${API_URL}/journals`, journal);
};

export const deleteJournal = async (id) => {
  return await axios.delete(`${API_URL}/journals/${id}`);
};

export const updateJournal = async (id, updatedJournal) => {
  return await axios.put(`${API_URL}/journals/${id}`, updatedJournal);
};
