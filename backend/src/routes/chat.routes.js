const express = require("express");

const {
  getAnalytics,
  getHealth,
  sendChatResponse,
  trackClientEvent,
} = require("../controllers/chat.controller");

const router = express.Router();

router.get("/health", getHealth);
router.get("/analytics", getAnalytics);
router.post("/analytics", trackClientEvent);
router.post("/chat", sendChatResponse);

module.exports = router;
