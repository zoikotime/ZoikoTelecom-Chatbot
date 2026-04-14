import { apiPaths } from "../api/apiPaths";

export async function sendChatMessage(message, sessionId) {
  const response = await fetch(apiPaths.chat, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
}

export async function trackChatEvent(event, payload = {}) {
  try {
    await fetch(apiPaths.analytics, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event, payload }),
    });
  } catch (_error) {
    // Avoid interrupting the chat flow if analytics fails.
  }
}
