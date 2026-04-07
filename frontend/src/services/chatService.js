import { apiPaths } from "../api/apiPaths";

export async function sendChatMessage(message) {
  // This service is the only place where the frontend talks to the backend.
  const response = await fetch(apiPaths.chat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
}
