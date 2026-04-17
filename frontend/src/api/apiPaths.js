const API_BASE = import.meta.env.VITE_API_BASE || "";

export const apiPaths = {
  chat: `${API_BASE}/api/chat`,
  analytics: `${API_BASE}/api/analytics`,
};
