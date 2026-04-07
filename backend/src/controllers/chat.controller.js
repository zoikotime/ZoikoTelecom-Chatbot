const mongoose = require("mongoose");

const {
  buildChatResponse,
  getKnowledgeBase,
} = require("../services/chatService");

async function getHealth(_req, res) {
  try {
    const knowledge = await getKnowledgeBase();

    res.json({
      status: "ok",
      service: "golite-chatbot-api",
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
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
    const { message = "" } = req.body || {};

    // Backend flow:
    // route -> controller -> service -> knowledge base -> response JSON
    const knowledge = await getKnowledgeBase();
    const response = buildChatResponse(message, knowledge);

    res.json(response);
  } catch (error) {
    res.status(500).json({
      response:
        "I ran into a server issue while checking the GoLite knowledge base. Please try again in a moment.",
      suggestions: ["Exploring plans", "Activation help", "Account & billing"],
      matched_intent: null,
      error: error.message,
    });
  }
}

module.exports = {
  getHealth,
  sendChatResponse,
};
