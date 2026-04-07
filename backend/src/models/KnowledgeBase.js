const mongoose = require("mongoose");

const intentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    keywords: { type: [String], default: [] },
    response: { type: String, default: "" },
    suggestions: { type: [String], default: [] },
  },
  { _id: false }
);

const knowledgeBaseSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    fallback: { type: String, default: "Could you share a bit more detail?" },
    defaultSuggestions: { type: [String], default: [] },
    intents: { type: [intentSchema], default: [] },
  },
  {
    timestamps: true,
    collection: "knowledgebases",
  }
);

module.exports = mongoose.model("KnowledgeBase", knowledgeBaseSchema);
