const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const apiPaths = {
  // Keeping API paths together makes the frontend flow easier to trace.
  chat: `${API_BASE}/api/chat`,
};
