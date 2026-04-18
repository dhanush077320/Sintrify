const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  LEADS: `${API_BASE_URL}/api/leads`,
  PROJECTS: `${API_BASE_URL}/api/projects`,
  STATS: `${API_BASE_URL}/api/stats`,
  BASE: API_BASE_URL,
};
