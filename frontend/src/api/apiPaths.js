const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const apiPaths = {
  chat: `${API_BASE}/api/chat`,
  analytics: `${API_BASE}/api/analytics`,
};
