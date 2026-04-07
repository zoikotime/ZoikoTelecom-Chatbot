const express = require("express");

const {
  getHealth,
  sendChatResponse,
} = require("../controllers/chat.controller");

const router = express.Router();

router.get("/health", getHealth);
router.post("/chat", sendChatResponse);

module.exports = router;
