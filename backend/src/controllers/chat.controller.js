const mongoose = require("mongoose");

const {
  buildChatResponse,
  getAnalyticsSnapshot,
  getKnowledgeBase,
  trackEvent,
} = require("../services/chatService");

async function getHealth(_req, res) {
  try {
    const knowledge = await getKnowledgeBase();

    res.json({
      status: "ok",
      service: "zoiko-chatbot-api",
      assistant: knowledge.assistantName || "Zakko",
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      intent_count: (knowledge.intents || []).length,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to load health data",
      error: error.message,
    });
  }
}

async function sendChatResponse(req, res) {
  try {
    const { message = "", sessionId = "anonymous" } = req.body || {};
    const knowledge = await getKnowledgeBase();
    const response = buildChatResponse(message, knowledge, sessionId);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      response: "Something went wrong. Please try again or speak to an agent.",
      suggestions: ["Back to Main Menu", "Speak to an Agent"],
      matched_intent: null,
      ctas: [],
      error: error.message,
    });
  }
}

function getAnalytics(_req, res) {
  res.json({ events: getAnalyticsSnapshot() });
}

function trackClientEvent(req, res) {
  try {
    const { event = "unknown", payload = {} } = req.body || {};
    trackEvent(event, payload);
    res.status(202).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = {
  getAnalytics,
  getHealth,
  sendChatResponse,
  trackClientEvent,
};
