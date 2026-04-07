const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const KnowledgeBase = require("../models/KnowledgeBase");

const KNOWLEDGE_KEY = "golite-default";
const dataPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "knowledge.json",
);

function normalizeText(text) {
  const lowered = (text || "").toLowerCase();
  const cleaned = lowered.replace(/[^a-z0-9\s]/g, " ");
  return cleaned.replace(/\s+/g, " ").trim();
}

function loadKnowledgeFromFile() {
  if (!fs.existsSync(dataPath)) {
    return {
      fallback:
        "I can help with GoLite plans, BYOD, switching carriers, activation, billing, discounts, technical support, and business lines.",
      defaultSuggestions: [
        "Exploring plans",
        "Bring your own phone",
        "Switch carriers",
        "Activation help",
      ],
      intents: [],
    };
  }

  const raw = fs.readFileSync(dataPath, "utf8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);

  return {
    fallback: data.fallback || "Could you share a little more detail?",
    defaultSuggestions: data.default_suggestions || [],
    intents: data.intents || [],
  };
}

async function seedKnowledgeBase() {
  if (mongoose.connection.readyState !== 1) {
    return loadKnowledgeFromFile();
  }

  const fileKnowledge = loadKnowledgeFromFile();
  const existing = await KnowledgeBase.findOne({ key: KNOWLEDGE_KEY });
  if (existing) {
    existing.fallback = fileKnowledge.fallback;
    existing.defaultSuggestions = fileKnowledge.defaultSuggestions;
    existing.intents = fileKnowledge.intents;
    await existing.save();
    return existing.toObject();
  }

  const created = await KnowledgeBase.create({
    key: KNOWLEDGE_KEY,
    fallback: fileKnowledge.fallback,
    defaultSuggestions: fileKnowledge.defaultSuggestions,
    intents: fileKnowledge.intents,
  });

  return created.toObject();
}

async function getKnowledgeBase() {
  if (mongoose.connection.readyState !== 1) {
    return loadKnowledgeFromFile();
  }

  const knowledge = await KnowledgeBase.findOne({ key: KNOWLEDGE_KEY }).lean();
  if (knowledge) {
    return knowledge;
  }

  return seedKnowledgeBase();
}

function scoreIntent(query, keywords) {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return 0;
  }

  let score = 0;
  const queryTokens = new Set(query.split(" "));
  const paddedQuery = ` ${query} `;

  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) {
      continue;
    }

    if (paddedQuery.includes(` ${normalizedKeyword} `)) {
      score += Math.max(3, normalizedKeyword.split(" ").length * 2);
      continue;
    }

    const keywordTokens = normalizedKeyword.split(" ");
    const overlap = keywordTokens.filter((token) =>
      queryTokens.has(token),
    ).length;

    if (overlap === keywordTokens.length && keywordTokens.length > 1) {
      score += overlap * 2;
    } else if (keywordTokens.length === 1 && overlap === 1) {
      score += 1;
    }
  }

  return score;
}

function findIntentById(intents, intentId) {
  return intents.find((intent) => intent.id === intentId) || null;
}

function buildChatResponse(message, knowledge) {
  const rawMessage = (message || "").trim();
  const fallback = knowledge.fallback || "How can I help you today?";
  const defaultSuggestions = knowledge.defaultSuggestions || [];
  const intents = knowledge.intents || [];

  if (!rawMessage) {
    return {
      response: fallback,
      suggestions: defaultSuggestions,
      matched_intent: null,
    };
  }

  const normalized = normalizeText(rawMessage);
  const exactRuleMap = [
    {
      phrases: [
        "business plans",
        "business plan",
        "need multiple lines for work",
        "multiple lines for work",
        "work lines",
        "business lines",
        "golite for business",
      ],
      intentId: "business_plans",
    },
    {
      phrases: ["business solutions", "business overview", "contact business sales"],
      intentId: "business_solutions",
    },
    {
      phrases: [
        "technical support",
        "technical support help",
        "device compatibility",
        "supported devices",
        "sim card help",
      ],
      intentId: "technical_support_help",
    },
    {
      phrases: ["plans and features", "plans features"],
      intentId: "plans_features_help",
    },
    {
      phrases: ["account management"],
      intentId: "account_management_help",
    },
    {
      phrases: ["help center", "golite support"],
      intentId: "help_center_home",
    },
    {
      phrases: ["activate", "activating", "activation"],
      intentId: "search_activate",
    },
    {
      phrases: ["international", "international calling", "international roaming"],
      intentId: "search_international",
    },
    {
      phrases: ["prepaid"],
      intentId: "search_prepaid",
    },
    {
      phrases: ["postpaid"],
      intentId: "search_postpaid",
    },
    {
      phrases: ["family"],
      intentId: "search_family",
    },
    {
      phrases: ["unlimited"],
      intentId: "search_unlimited",
    },
    {
      phrases: ["travel"],
      intentId: "search_travel",
    },
    {
      phrases: ["business"],
      intentId: "search_business",
    },
    {
      phrases: ["switch", "port"],
      intentId: "search_switch_port",
    },
    {
      phrases: ["login", "account"],
      intentId: "search_login_account",
    },
    {
      phrases: ["promo", "offer"],
      intentId: "special_offers",
    },
    {
      phrases: ["discount"],
      intentId: "special_offers",
    },
    {
      phrases: [
        "faq",
        "common questions",
        "most asked questions",
        "most common questions",
      ],
      intentId: "faq",
    },
    {
      phrases: ["popular searches"],
      intentId: "popular_searches",
    },
  ];

  if (["act", "fam", "int", "stu"].includes(normalized)) {
    const suggestionIntent = findIntentById(intents, "autocomplete_suggestions");

    if (suggestionIntent) {
      return {
        response: suggestionIntent.response || fallback,
        suggestions: suggestionIntent.suggestions || [],
        matched_intent: suggestionIntent.id,
      };
    }
  }

  for (const rule of exactRuleMap) {
    if (rule.phrases.includes(normalized)) {
      const matchedIntent = findIntentById(intents, rule.intentId);

      if (matchedIntent) {
        return {
          response: matchedIntent.response || fallback,
          suggestions: matchedIntent.suggestions || [],
          matched_intent: matchedIntent.id,
        };
      }
    }
  }

  // We check a few direct phrase rules first so common support questions
  // always map to the expected GoLite answer before keyword scoring.
  const ruleMap = [
    {
      phrases: [
        "need multiple lines for work",
        "multiple lines for work",
        "work lines",
        "company lines",
        "business lines",
        "business roaming",
      ],
      intentId: "business_plans",
    },
    {
      phrases: [
        "business solutions",
        "business overview",
        "golite for business",
        "contact business sales",
      ],
      intentId: "business_solutions",
    },
    {
      phrases: [
        "technical support",
        "technical support help",
        "device compatibility",
        "supported devices",
        "sim card help",
      ],
      intentId: "technical_support_help",
    },
    {
      phrases: [
        "looking at plans",
        "what plans do you have",
        "need a new plan",
        "exploring plans",
      ],
      intentId: "exploring_plans",
    },
    {
      phrases: ["light usage", "calls and texts", "some browsing"],
      intentId: "light_usage",
    },
    {
      phrases: ["basic affordable", "budget friendly", "cheap plan", "top up"],
      intentId: "basic_affordable",
    },
    {
      phrases: [
        "heavy data",
        "lots of data",
        "streaming videos",
        "streaming enthusiast",
      ],
      intentId: "heavy_data",
    },
    {
      phrases: [
        "international calls",
        "travel plans",
        "international roaming",
        "calling overseas",
      ],
      intentId: "international",
    },
    {
      phrases: ["family plans", "multi line", "share data"],
      intentId: "family_plans",
    },
    {
      phrases: ["pay as you go"],
      intentId: "prepaid_plans",
    },
    {
      phrases: ["postpaid plans", "postpaid", "monthly bill"],
      intentId: "postpaid_plans",
    },
    {
      phrases: [
        "plans overview",
        "compare plans",
        "all plans",
        "plans features overview",
      ],
      intentId: "plans_overview",
    },
    {
      phrases: [
        "do you have contracts",
        "are there contracts",
        "contract terms",
      ],
      intentId: "contracts",
    },
    {
      phrases: [
        "activate sim",
        "activate esim",
        "activating your sim",
        "activating sim",
        "activation help",
        "activation troubleshooting",
        "got my sim",
        "cant activate",
      ],
      intentId: "activation_help",
    },
    {
      phrases: ["esim", "esim setup", "digital sim"],
      intentId: "esim_setup",
    },
    {
      phrases: ["sim card broken", "broken sim", "damaged sim", "lost sim"],
      intentId: "lost_or_damaged_sim",
    },
    {
      phrases: ["physical sim", "sim card", "insert sim"],
      intentId: "physical_sim",
    },
    {
      phrases: [
        "bring my phone",
        "bring your own phone",
        "byod",
        "imei",
        "compatibility",
      ],
      intentId: "byod",
    },
    {
      phrases: ["keep my number", "can i keep my number", "number transfer"],
      intentId: "keep_number",
    },
    {
      phrases: [
        "switch carriers",
        "switch from another carrier",
        "keep my number",
        "port my number",
      ],
      intentId: "switch_carriers",
    },
    {
      phrases: ["set up autopay", "automatic payments", "autopay discount"],
      intentId: "autopay",
    },
    {
      phrases: [
        "account billing",
        "autopay",
        "update payment method",
      ],
      intentId: "account_billing",
    },
    {
      phrases: [
        "login help",
        "forgot password",
        "cant log in",
        "cannot log in",
      ],
      intentId: "login_help",
    },
    {
      phrases: [
        "billing question",
        "question about my bill",
        "billing questions",
        "line item",
        "surprise bill",
      ],
      intentId: "billing_questions",
    },
    {
      phrases: [
        "update payment method",
        "change card",
        "digital wallet",
        "credit card",
      ],
      intentId: "payment_method",
    },
    {
      phrases: ["special offers", "promotions", "promo", "current promotions"],
      intentId: "special_offers",
    },
    {
      phrases: [
        "military discount",
        "student discount",
        "first responder",
        "senior discount",
      ],
      intentId: "special_discounts",
    },
    {
      phrases: [
        "no service",
        "data not working",
        "phone not working",
        "technical issues",
        "network status",
      ],
      intentId: "technical_support",
    },
    {
      phrases: ["outage", "outages", "coverage", "what network do you use"],
      intentId: "network_status",
    },
    {
      phrases: [
        "lost sim",
        "damaged sim",
        "replacement sim",
        "sim not recognized",
      ],
      intentId: "lost_or_damaged_sim",
    },
    {
      phrases: [
        "device protection",
        "insurance",
        "broken phone",
        "file a claim",
      ],
      intentId: "device_protection",
    },
    {
      phrases: [
        "business plans",
        "business plan",
        "business lines",
        "business sales",
        "multiple lines for work",
        "need multiple lines for work",
      ],
      intentId: "business_plans",
    },
    {
      phrases: ["track order", "order status", "where is my order"],
      intentId: "track_order",
    },
    {
      phrases: ["help center", "help and support", "contact support", "faq"],
      intentId: "help_support",
    },
    {
      phrases: ["do you have 5g", "5g access", "does golite have 5g"],
      intentId: "five_g",
    },
    {
      phrases: ["about golite", "about us", "company info", "store location"],
      intentId: "about_us",
    },
    {
      phrases: [
        "this is frustrating",
        "this is annoying",
        "not happy",
        "i am upset",
      ],
      intentId: "frustrated_customer",
    },
  ];

  for (const rule of ruleMap) {
    if (rule.phrases.some((phrase) => normalized.includes(phrase))) {
      const matchedIntent = intents.find(
        (intent) => intent.id === rule.intentId,
      );

      if (matchedIntent) {
        return {
          response: matchedIntent.response || fallback,
          suggestions: matchedIntent.suggestions || [],
          matched_intent: matchedIntent.id,
        };
      }
    }
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const intent of intents) {
    const score = scoreIntent(normalized, intent.keywords || []);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch && bestScore >= 2) {
    return {
      response: bestMatch.response || fallback,
      suggestions: bestMatch.suggestions || [],
      matched_intent: bestMatch.id,
    };
  }

  return {
    response: fallback,
    suggestions: defaultSuggestions,
    matched_intent: null,
  };
}

module.exports = {
  buildChatResponse,
  getKnowledgeBase,
  loadKnowledgeFromFile,
  seedKnowledgeBase,
};
