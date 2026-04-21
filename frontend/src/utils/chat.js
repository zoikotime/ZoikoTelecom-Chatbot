const linkLabels = {
  "https://zoikotelecom.com/ee-mobile-plans/": "EE Mobile Plans",
  "https://zoikotelecom.com/faqs/": "Mobile FAQs",
  "https://zoikotelecom.com/faqs/ee-sim-deals-faqs/": "Mobile FAQs",
  "https://zoikotelecom.com/bt-broadband/": "High-Speed Broadband",
  "https://zoikotelecom.com/landlines/": "Home Landlines",
  "https://zoikotelecom.com/landline-business/": "Business Landline Service",
  "https://zoikotelecom.com/business-solutions/": "Business Solutions Overview",
  "https://zoikotelecom.com/phone-equipment/": "Phone Equipment",
  "https://zoikotelecom.com/accessories/": "Accessories",
  "https://zoikotelecom.com/become-a-reseller/": "Become a Reseller",
  "https://zoikotelecom.com/about-us/": "About Zoiko Telecom",
  "https://zoikotelecom.com/contact/": "Contact Zoiko Telecom",
  "https://zoikotelecom.com/": "Zoiko Telecom Home",
};

const URL_UTM =
  "utm_source=chatbot&utm_medium=website_chat&utm_campaign=zoiko_assistant";

export function withTrackedUrl(url) {
  if (!url) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${URL_UTM}`;
}

function resolveLinkLabel(url) {
  const [baseUrl] = url.split("?");
  return (
    linkLabels[baseUrl] ||
    linkLabels[baseUrl.replace(/\/$/, "")] ||
    "Open Zoiko Telecom"
  );
}

function formatLinks(text) {
  return text.replace(/https:\/\/zoikotelecom\.com\/[^\s<]+/g, (url) => {
    const cleanUrl = url.replace(/[.,!?)]$/, "");
    const trailing = url.slice(cleanUrl.length);
    const trackedUrl = withTrackedUrl(cleanUrl);
    const label = resolveLinkLabel(cleanUrl);
    return `<a href="${trackedUrl}" target="_blank" rel="noreferrer" class="font-medium text-[#00d084] no-underline transition hover:underline">${label}</a>${trailing}`;
  });
}

export function formatMessage(text) {
  const withBreaks = (text || "").replace(/\n/g, "<br />");
  return formatLinks(withBreaks);
}

const suggestionLabels = {
  "1 Mobile plans (EE network)": "1 Mobile plans",
  "2 Home broadband": "2 Home broadband",
  "3 Landlines & Business solutions": "3 Landlines & Business solutions",
  "4 Already a customer - need support": "4 Need support",
  "5 Something else": "5 Something else",
  "Speak to an Agent": "Speak to an Agent",
  "Back to Main Menu": "Back to Main Menu",
  "Traditional SIM": "Traditional SIM",
  eSIM: "eSIM",
  "Not sure what the difference is": "SIM vs eSIM",
  "Light user (10-20GB)": "Light user",
  "Moderate user (50-100GB)": "Moderate user",
  "Heavy user (150GB+)": "Heavy user",
  "I'm not sure": "I'm not sure",
  "30-day rolling": "30-day rolling",
  "12-month contract": "12-month contract",
  "24-month contract": "24-month contract",
  "Just need the basics": "Just need the basics",
  "Good all-rounder": "Good all-rounder",
  "Super fast": "Super fast",
  "Help me choose!": "Help me choose",
  "Landlines (Home or Business)": "Landlines",
  "IoT SIMs": "IoT SIMs",
  "Mobile plans for staff": "Plans for staff",
  "Business Solutions": "Business Solutions",
  "Multiple services / not sure": "Multiple services",
  "Billing question": "Billing question",
  "Equipment & Phone accessories": "Equipment & accessories",
  "Becoming a reseller": "Becoming a reseller",
  "Connect Me to an Agent": "Connect to Agent",
};

export function formatSuggestionLabel(label) {
  return suggestionLabels[label] || label;
}

export function createSessionId() {
  return `zoiko-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function timeStampLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
