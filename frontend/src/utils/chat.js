const linkLabels = {
  "https://golitemobile.com/activate-sim/": "👉 Activate SIM",
  "https://golitemobile.com/byod/": "👉 Bring your own phone",
  "https://golitemobile.com/switch-and-save/": "👉 Switch and save",
  "https://golitemobile.com/login/": "👉 Account login",
  "https://golitemobile.com/help-and-support/": "👉 Help center",
  "https://golitemobile.com/track-order/": "👉 Track order",
  "https://golitemobile.com/network-status/": "👉 Network status",
  "https://golitemobile.com/lost-sim/": "👉 Lost SIM help",
  "https://golitemobile.com/device-protection/": "👉 Device protection",
  "https://golitemobile.com/business/": "👉 Business plans",
  "https://golitemobile.com/international-calls/": "👉 International calling",
  "https://golitemobile.com/travel-plans/": "👉 Travel plans",
  "https://golitemobile.com/international-roaming/": "👉 International roaming",
  "https://golitemobile.com/prepaid-plans/": "👉 Prepaid plan",
  "https://golitemobile.com/prepaid-plans/": "👉 Prepaid plan",
  "https://golitemobile.com/prepaid-plans/": "👉 Prepaid plan",
  "https://golitemobile.com/plans/postpaid-plan/": "👉 Postpaid plan",
  "https://golitemobile.com/plans-features-overview/": "👉 Plans overview",
  "https://golitemobile.com/top-up/": "👉 Top-up plan",
  "https://golitemobile.com/streaming-enthusiasts-plans/": "👉 Streaming plans",
  "https://golitemobile.com/shop-family-multi-line-plans/": "👉 Family plans",
  "https://golitemobile.com/special-offers-promotions/": "👉 Special offers",
  "https://golitemobile.com/military-discount-eligibility-form/":
    "👉 Military discount",
  "https://golitemobile.com/students-discount-application/":
    "👉 Student discount",
  "https://golitemobile.com/first-responder-discount-application/":
    "👉 First responder discount",
  "https://golitemobile.com/senior-citizen-discount-enrollment-form/":
    "👉 Senior discount",
  "https://golitemobile.com/about-us/": "👉 About GoLite",
};

function resolveLinkLabel(url) {
  return (
    linkLabels[url] ||
    linkLabels[url.replace(/\/$/, "")] ||
    linkLabels[`${url}/`] ||
    "👉 Open GoLite page"
  );
}

function formatLinks(text) {
  return text.replace(/https:\/\/golitemobile\.com\/[^\s<]+/g, (url) => {
    const cleanUrl = url.replace(/[.,!?)]$/, "");
    const trailing = url.slice(cleanUrl.length);
    const label = resolveLinkLabel(cleanUrl);

    return `<a href="${cleanUrl}" target="_blank" rel="noreferrer" class="font-medium text-[#f5c518] no-underline transition hover:underline">${label}</a>${trailing}`;
  });
}

export function formatMessage(text) {
  const withBreaks = (text || "").replace(/\n/g, "<br />");
  return formatLinks(withBreaks);
}

const suggestionLabels = {
  "\u{1F50D} Exploring plans": "\u{1F50D} Exploring plans",
  "\u{1F4F1} Bringing your own phone": "\u{1F4F1} Bringing your own phone",
  "\u{1F504} Switching from another carrier":
    "\u{1F504} Switching from another carrier",
  "\u{2753} Something else": "\u{2753} Something else",
  "Exploring plans": "\u{1F50D} Exploring plans",
  "Bring your own phone": "\u{1F4F1} Bringing your own phone",
  "Switch carriers": "\u{1F504} Switching from another carrier",
  "Something else": "\u{2753} Something else",
  "Activation help": "\u{1F4F6} Activation help",
  "Account & billing": "\u{1F4B3} Account & billing",
  "Technical issues": "\u{1F6E0} Technical issues",
  "Help and support": "\u{1F4AC} Help and support",
  "Getting started": "\u{1F680} Getting started",
  "Plans and features": "\u{1F4CB} Plans & features",
  "Account management": "\u{1F464} Account management",
  "Technical support": "\u{1F6E0} Technical support",
  "Business solutions": "\u{1F4BC} Business solutions",
  "Protection & Add-Ons": "\u{1F6E1} Protection & Add-Ons",
  "Business plans": "\u{1F4BC} Business plans",
  "Special offers": "\u{1F3F7} Special offers",
  "Student discount": "\u{1F393} Student discount",
  Activate: "\u{1F50E} Activate",
  International: "\u{1F30D} International",
  FAQ: "\u{2753} FAQ",
};

export function formatSuggestionLabel(label) {
  return suggestionLabels[label] || label;
}

export function timeStampLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
