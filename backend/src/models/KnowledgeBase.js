const mongoose = require("mongoose");

const intentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    keywords: { type: [String], default: [] },
    response: { type: String, default: "" },
    suggestions: { type: [String], default: [] },
  },
  { _id: false },
);

const knowledgeBaseSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    assistantName: { type: String, default: "Zakko" },
    fallback: {
      type: String,
      default:
        "I did not quite understand that. Please select an option below.",
    },
    secondFallback: {
      type: String,
      default: "I will connect you to an agent for further assistance.",
    },
    agentMessage: {
      type: String,
      default:
        "I understand - speaking to an agent is the fastest way to resolve this.",
    },
    defaultSuggestions: { type: [String], default: [] },
    intents: { type: [intentSchema], default: [] },
    urls: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    collection: "knowledgebases",
  },
);

module.exports = mongoose.model("KnowledgeBase", knowledgeBaseSchema);
