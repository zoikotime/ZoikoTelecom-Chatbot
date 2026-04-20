const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "knowledge.json",
);
const SESSION_TIMEOUT_MS = 15 * 60 * 1000;
const sessions = new Map();
const analytics = [];
const URL_UTM =
  "utm_source=chatbot&utm_medium=website_chat&utm_campaign=zoiko_assistant";

function withTrackedUrl(url) {
  if (!url) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${URL_UTM}`;
}

const CTA_MAP = {
  "View Plans Now": {
    label: "View Plans Now",
    url: withTrackedUrl("https://zoikotelecom.com/ee-mobile-plans/"),
    type: "cta",
  },
  "View eSIM Plans": {
    label: "View eSIM Plans",
    url: withTrackedUrl("https://zoikotelecom.com/ee-mobile-plans/"),
    type: "cta",
  },
  "Mobile Plans": {
    label: "Mobile Plans",
    url: withTrackedUrl("https://zoikotelecom.com/ee-mobile-plans/"),
    type: "cta",
  },
  "Check Broadband Packages": {
    label: "Check Broadband Packages",
    url: withTrackedUrl("https://zoikotelecom.com/bt-broadband/"),
    type: "cta",
  },
  Broadband: {
    label: "Broadband",
    url: withTrackedUrl("https://zoikotelecom.com/bt-broadband/"),
    type: "cta",
  },
  "View Home Landlines": {
    label: "View Home Landlines",
    url: withTrackedUrl("https://zoikotelecom.com/landlines/"),
    type: "cta",
  },
  "View Business Landline": {
    label: "View Business Landline",
    url: withTrackedUrl("https://zoikotelecom.com/landline-business/"),
    type: "cta",
  },
  "Landline Business": {
    label: "Landline Business",
    url: withTrackedUrl("https://zoikotelecom.com/landline-business/"),
    type: "cta",
  },
  "View Business Solutions": {
    label: "View Business Solutions",
    url: withTrackedUrl("https://zoikotelecom.com/business-solutions/"),
    type: "cta",
  },
  Accessories: {
    label: "Accessories",
    url: withTrackedUrl("https://zoikotelecom.com/accessories/"),
    type: "cta",
  },
  "Phone Equipment": {
    label: "Phone Equipment",
    url: withTrackedUrl("https://zoikotelecom.com/phone-equipment/"),
    type: "cta",
  },
  "Become a Reseller": {
    label: "Become a Reseller",
    url: withTrackedUrl("https://zoikotelecom.com/become-a-reseller/"),
    type: "cta",
  },
  "About Zoiko Telecom": {
    label: "About Zoiko Telecom",
    url: withTrackedUrl("https://zoikotelecom.com/about-us/"),
    type: "cta",
  },
  "Open contact page": {
    label: "Open contact page",
    url: withTrackedUrl("https://zoikotelecom.com/contact/"),
    type: "cta",
  },
  "Call support": {
    label: "Call support",
    url: withTrackedUrl("https://zoikotelecom.com/contact/"),
    type: "cta",
  },
  "Connect Me to an Agent": {
    label: "Connect Me to an Agent",
    url: withTrackedUrl("https://zoikotelecom.com/contact/"),
    type: "agent",
  },
};

const MENU_LABELS = [
  "1 Mobile plans (EE network)",
  "2 Home broadband",
  "3 Landlines & Business solutions",
  "4 Already a customer - need support",
  "5 Something else",
];

function normalizeText(text) {
  const lowered = (text || "").toLowerCase();
  const cleaned = lowered.replace(/[^a-z0-9\s]/g, " ");
  return cleaned.replace(/\s+/g, " ").trim();
}

function loadKnowledgeFromFile() {
  if (!fs.existsSync(dataPath)) {
    return {
      assistantName: "Zakko",
      fallback:
        "I did not quite understand that. Please select an option below.",
      secondFallback: "I will connect you to an agent for further assistance.",
      agentMessage:
        "I understand - speaking to an agent is the fastest way to resolve this.",
      defaultSuggestions: MENU_LABELS,
      intents: [],
      urls: {},
    };
  }

  const raw = fs.readFileSync(dataPath, "utf8").replace(/^\uFEFF/, "");
  const data = JSON.parse(raw);

  return {
    assistantName: data.assistantName || "Zakko",
    fallback:
      data.fallback ||
      "I did not quite understand that. Please select an option below.",
    secondFallback:
      data.second_fallback ||
      "I will connect you to an agent for further assistance.",
    agentMessage:
      data.agent_message ||
      "I understand - speaking to an agent is the fastest way to resolve this.",
    defaultSuggestions: data.default_suggestions || MENU_LABELS,
    intents: data.intents || [],
    urls: data.urls || {},
    searchRedirects: data.search_redirects || [],
  };
}

function appendReturnPrompt(_intentId, response) {
  return response;
}

function buildSearchRedirectCta(redirect) {
  return {
    label: redirect.actionLabel || redirect.prompt || "Open Zoiko Telecom",
    url: withTrackedUrl(redirect.url),
    type: "cta",
  };
}

function ensureSuggestions(intentId, suggestions = []) {
  if (intentId === "welcome") {
    return suggestions.length ? suggestions : MENU_LABELS;
  }

  if (intentId === "agent") {
    return ["Connect Me to an Agent", "Back to Main Menu"];
  }

  const next = [...suggestions];
  if (!next.includes("Back to Main Menu")) {
    next.push("Back to Main Menu");
  }
  if (!next.includes("Speak to an Agent")) {
    next.push("Speak to an Agent");
  }
  return next;
}

function getIntentCtas(intentId) {
  switch (intentId) {
    case "mobile_intro":
    case "mobile_traditional":
    case "mobile_light":
    case "mobile_moderate":
    case "mobile_heavy":
    case "mobile_usage_unsure":
    case "esim_intro":
    case "esim_check":
    case "esim_explain":
    case "broadband_intro":
    case "broadband_help":
    case "business_intro":
    case "landline_intro":
    case "support_intro":
    case "something_else":
      return [];
    case "mobile_contract":
    case "website_search_mobile":
    case "faq_number_porting":
      return [CTA_MAP["View Plans Now"]];
    case "esim_plans":
      return [CTA_MAP["View eSIM Plans"]];
    case "broadband_recommendation":
    case "website_search_broadband":
    case "faq_installation":
    case "faq_upgrade_broadband":
      return [CTA_MAP["Check Broadband Packages"]];
    case "landline_business":
      return [CTA_MAP["View Business Landline"]];
    case "landline_home":
      return [CTA_MAP["View Home Landlines"]];
    case "business_solutions":
    case "iot_sims":
    case "website_search_business":
      return [CTA_MAP["View Business Solutions"]];
    case "equipment":
      return [CTA_MAP.Accessories, CTA_MAP["Phone Equipment"]];
    case "reseller":
      return [CTA_MAP["Become a Reseller"]];
    case "about_company":
      return [CTA_MAP["About Zoiko Telecom"]];
    case "support_technical":
      return [CTA_MAP["Call support"], CTA_MAP["Open contact page"]];
    case "billing_question":
      return [CTA_MAP["Call support"]];
    case "pricing":
      return [
        CTA_MAP["Mobile Plans"],
        CTA_MAP.Broadband,
        CTA_MAP["Landline Business"],
      ];
    case "agent":
      return [CTA_MAP["Connect Me to an Agent"]];
    default:
      return [];
  }
}

function createSession(sessionId) {
  return {
    sessionId,
    user_intent: null,
    user_sub_intent: null,
    fallback_count: 0,
    last_action: "session_start",
    session_timestamp: Date.now(),
  };
}

function trackEvent(type, payload = {}) {
  analytics.push({ type, payload, timestamp: new Date().toISOString() });
  if (analytics.length > 500) {
    analytics.shift();
  }
}

function getSession(sessionId) {
  const key = sessionId || "anonymous";
  const existing = sessions.get(key);

  if (!existing) {
    const created = createSession(key);
    sessions.set(key, created);
    trackEvent("session_start", { sessionId: key });
    return created;
  }

  if (Date.now() - existing.session_timestamp > SESSION_TIMEOUT_MS) {
    trackEvent("session_end", { sessionId: key, reason: "timeout" });
    const refreshed = createSession(key);
    sessions.set(key, refreshed);
    trackEvent("session_start", { sessionId: key, resumed: true });
    return refreshed;
  }

  existing.session_timestamp = Date.now();
  return existing;
}

async function seedKnowledgeBase() {
  return loadKnowledgeFromFile();
}

async function getKnowledgeBase() {
  return loadKnowledgeFromFile();
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

function buildSessionPayload(session) {
  return {
    user_intent: session.user_intent,
    user_sub_intent: session.user_sub_intent,
    fallback_count: session.fallback_count,
    last_action: session.last_action,
    session_timestamp: session.session_timestamp,
  };
}

function buildIntentResponse(intent, knowledge, session) {
  if (!intent) {
    return buildFallbackResponse(knowledge, session);
  }

  session.fallback_count = 0;
  session.user_intent = intent.id;
  session.user_sub_intent = intent.id.includes("_") ? intent.id : null;
  session.last_action = intent.id;
  session.session_timestamp = Date.now();

  return {
    response: appendReturnPrompt(
      intent.id,
      intent.response || knowledge.fallback,
    ),
    suggestions: ensureSuggestions(
      intent.id,
      intent.suggestions || knowledge.defaultSuggestions || [],
    ),
    ctas: getIntentCtas(intent.id),
    matched_intent: intent.id,
    escalation: intent.id === "agent",
    session: buildSessionPayload(session),
  };
}

function buildAgentResponse(knowledge, session, reason) {
  session.user_intent = "agent";
  session.user_sub_intent = reason || session.user_sub_intent;
  session.last_action = "agent_handover";
  session.session_timestamp = Date.now();
  trackEvent("agent_request", { sessionId: session.sessionId, reason });

  return {
    response: knowledge.agentMessage,
    suggestions: ["Connect Me to an Agent", "Back to Main Menu"],
    ctas: [CTA_MAP["Connect Me to an Agent"]],
    matched_intent: "agent",
    escalation: true,
    session: buildSessionPayload(session),
  };
}

function buildSecondFallbackResponse(knowledge, session) {
  session.user_intent = "agent";
  session.user_sub_intent = "fallback_limit";
  session.last_action = "agent_handover";
  session.session_timestamp = Date.now();
  trackEvent("agent_request", {
    sessionId: session.sessionId,
    reason: "fallback_limit",
  });

  return {
    response: knowledge.secondFallback || knowledge.agentMessage,
    suggestions: ["Connect Me to an Agent", "Back to Main Menu"],
    ctas: [CTA_MAP["Connect Me to an Agent"], CTA_MAP["Open contact page"]],
    matched_intent: "agent",
    escalation: true,
    session: buildSessionPayload(session),
  };
}

function buildFallbackResponse(knowledge, session) {
  session.fallback_count += 1;
  session.last_action = "fallback";
  session.session_timestamp = Date.now();
  trackEvent("fallback_trigger", {
    sessionId: session.sessionId,
    count: session.fallback_count,
  });

  if (session.fallback_count >= 2) {
    return buildSecondFallbackResponse(knowledge, session);
  }

  return {
    response: knowledge.fallback,
    suggestions: knowledge.defaultSuggestions || MENU_LABELS,
    ctas: [],
    matched_intent: null,
    escalation: false,
    session: buildSessionPayload(session),
  };
}

function findSearchRedirectMatches(query, knowledge) {
  const redirects = Array.isArray(knowledge.searchRedirects)
    ? knowledge.searchRedirects
    : [];

  if (!redirects.length) {
    return [];
  }

  const queryTokens = new Set(query.split(" "));

  return redirects
    .map((redirect) => {
      const keywords = Array.isArray(redirect.keywords)
        ? redirect.keywords
        : [];
      const score = keywords.reduce((total, keyword) => {
        const normalizedKeyword = normalizeText(keyword);
        if (!normalizedKeyword) {
          return total;
        }

        if (query.includes(normalizedKeyword)) {
          return total + Math.max(3, normalizedKeyword.split(" ").length * 2);
        }

        const overlap = normalizedKeyword
          .split(" ")
          .filter((token) => queryTokens.has(token)).length;

        return total + overlap;
      }, 0);

      return { redirect, score };
    })
    .filter((entry) => entry.score >= 2)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

function buildSearchRedirectResponse(matches, knowledge, session) {
  const [primary] = matches;
  const prompt =
    primary?.redirect?.prompt ||
    "Here are the closest Zoiko Telecom pages for your search.";

  session.fallback_count = 0;
  session.user_intent = primary?.redirect?.intentId || "website_search";
  session.user_sub_intent = "website_search";
  session.last_action = "website_search";
  session.session_timestamp = Date.now();

  return {
    response: `${prompt}\n\nChoose one of the links below or continue chatting and I'll guide you.`,
    suggestions: ["Back to Main Menu", "Speak to an Agent"],
    ctas: matches.map(({ redirect }) => buildSearchRedirectCta(redirect)),
    matched_intent: primary?.redirect?.intentId || "website_search",
    escalation: false,
    session: buildSessionPayload(session),
  };
}

function buildChatResponse(message, knowledge, sessionId) {
  const session = getSession(sessionId);
  const rawMessage = (message || "").trim();
  const intents = knowledge.intents || [];

  if (!rawMessage) {
    const welcomeIntent = findIntentById(intents, "welcome");
    return buildIntentResponse(welcomeIntent, knowledge, session);
  }

  const normalized = normalizeText(rawMessage);
  trackEvent("button_click", {
    sessionId: session.sessionId,
    text: rawMessage,
  });

  if (
    [
      "back to main menu",
      "main menu",
      "menu",
      "home",
      "zoiko telecom home",
    ].includes(normalized)
  ) {
    const welcomeIntent = findIntentById(intents, "welcome");
    return buildIntentResponse(welcomeIntent, knowledge, session);
  }

  if (
    ["help", "support", "problem", "already a customer"].includes(normalized)
  ) {
    const supportIntent = findIntentById(intents, "support_intro");
    if (supportIntent) {
      return buildIntentResponse(supportIntent, knowledge, session);
    }
  }

  if (
    ["speak to an agent", "connect me to an agent", "agent", "human"].includes(
      normalized,
    )
  ) {
    const agentIntent = findIntentById(intents, "agent");
    return buildIntentResponse(agentIntent, knowledge, session);
  }

  const suggestionMap = {
    "1 mobile plans ee network": "mobile_intro",
    "2 home broadband": "broadband_intro",
    "3 landlines business solutions": "business_intro",
    "4 already a customer need support": "support_intro",
    "5 something else": "something_else",
    "traditional sim": "mobile_traditional",
    esim: "esim_intro",
    "not sure what the difference is": "esim_explain",
    "light user 10 20gb": "mobile_light",
    "moderate user 50 100gb": "mobile_moderate",
    "heavy user 150gb": "mobile_heavy",
    "i m not sure": "mobile_usage_unsure",
    "30 day rolling": "mobile_contract",
    "12 month contract": "mobile_contract",
    "24 month contract": "mobile_contract",
    "yes it does": "esim_check",
    "how do i check": "esim_check",
    "what even is an esim": "esim_explain",
    "view esim plans": "esim_plans",
    "just need the basics": "broadband_recommendation",
    "good all rounder": "broadband_recommendation",
    "super fast": "broadband_recommendation",
    "help me choose": "broadband_help",
    "working from home": "broadband_recommendation",
    streaming: "broadband_recommendation",
    gaming: "broadband_recommendation",
    "general browsing and social media": "broadband_recommendation",
    "all of the above": "broadband_recommendation",
    "landlines home or business": "landline_intro",
    "home landline small setup": "landline_home",
    "business landline multiple users": "landline_business",
    "mobile plans for staff": "business_solutions",
    "business solutions": "business_solutions",
    "multiple services not sure": "business_solutions",
    "iot sims": "iot_sims",
    "mobile sim issue": "support_technical",
    "broadband problem": "support_technical",
    "order status": "support_technical",
    "change my plan": "support_technical",
    "speak to someone": "support_technical",
    "billing question": "billing_question",
    "our company who we are": "about_company",
    "equipment phone accessories": "equipment",
    "becoming a reseller": "reseller",
    "coverage in my area": "coverage",
    "what payment methods do you accept": "faq_payment_methods",
    "when will i be billed": "faq_billed",
    "how do i cancel my service": "faq_cancel",
    "how long does installation take": "faq_installation",
    "can i upgrade or downgrade my broadband package": "faq_upgrade_broadband",
    "can i keep my existing mobile number": "faq_number_porting",
    "do you offer unlimited data": "faq_unlimited_data",
    "can i use my plan abroad": "faq_roaming",
    "how do i place an order": "faq_place_order",
    "how do i access my account": "faq_account_access",
    "do your accessories come with warranty": "faq_warranty",
    "what s the difference between a sim and an esim": "esim_explain",
    "what's the difference between a sim and an esim": "esim_explain",
    "view plans now": "mobile_contract",
    "check broadband packages": "broadband_intro",
    "view business solutions": "business_solutions",
    "view business landline": "landline_business",
    "view home landlines": "landline_home",
    "about zoiko telecom": "about_company",
    accessories: "equipment",
    "phone equipment": "equipment",
    "become a reseller": "reseller",
    "open contact page": "support_technical",
    "call support": "support_technical",
    "mobile plans": "pricing",
    broadband: "pricing",
    "landline business": "pricing",
  };

  const suggestionIntentId = suggestionMap[normalized];
  if (suggestionIntentId) {
    const mappedIntent = findIntentById(intents, suggestionIntentId);
    if (mappedIntent) {
      return buildIntentResponse(mappedIntent, knowledge, session);
    }
  }

  const searchRedirectMatches = findSearchRedirectMatches(
    normalized,
    knowledge,
  );
  if (searchRedirectMatches.length > 0) {
    return buildSearchRedirectResponse(
      searchRedirectMatches,
      knowledge,
      session,
    );
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
    return buildIntentResponse(bestMatch, knowledge, session);
  }

  return buildFallbackResponse(knowledge, session);
}

function getAnalyticsSnapshot() {
  return analytics.slice(-100);
}

module.exports = {
  buildChatResponse,
  getAnalyticsSnapshot,
  getKnowledgeBase,
  loadKnowledgeFromFile,
  seedKnowledgeBase,
  trackEvent,
};
