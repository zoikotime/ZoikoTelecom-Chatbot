import { useEffect, useRef } from "react";

import { popularSearches, searchKeywordCatalog } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

function normalizeText(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
}

function getMatchingCatalog(query) {
  const normalized = normalizeText(query);
  if (normalized.length < 3) {
    return [];
  }

  const tokens = normalized.split(/\s+/).filter(Boolean);

  return searchKeywordCatalog.filter((item) =>
    item.keywords.some((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedKeyword.startsWith(normalized)) {
        return true;
      }

      return tokens.some((token) => token.length >= 3 && normalizedKeyword.startsWith(token));
    })
  );
}

export function ChatInput() {
  const { input, setInput, handleInputKeyDown, sendMessage } = useChat();
  const textareaRef = useRef(null);
  const matchingCatalog = getMatchingCatalog(input);
  const suggestionOptions = matchingCatalog.map((item) => ({
    label: item.label,
    value: item.value,
  }));
  const hasAutocomplete = input.trim().length >= 3 && suggestionOptions.length > 0;

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
  }, [input]);

  return (
    <div className="border-t border-border bg-panel/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2.5 sm:px-4 sm:pb-[calc(env(safe-area-inset-bottom)+0.9rem)] sm:pt-3 lg:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {/* Input box */}
        <div className="rounded-[18px] border border-border bg-card/70 p-2.5 shadow-panel sm:rounded-[22px] sm:p-3">
          <div className="flex items-end gap-2 sm:gap-3">
            <textarea
              ref={textareaRef}
              value={input}
              rows={1}
              placeholder="Ask about plans, broadband, support…"
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              className="min-h-[40px] max-h-[120px] flex-1 resize-none bg-transparent px-1.5 py-1.5 text-sm text-ink outline-hidden placeholder:text-muted sm:min-h-[44px] sm:max-h-[140px] sm:px-2 sm:py-2"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              className="shrink-0 rounded-full bg-linear-to-br from-accentDeep to-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:px-5 sm:py-3"
            >
              Send
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-2.5 sm:mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[11px] sm:tracking-[0.22em]">
            {hasAutocomplete ? "Auto-Fill" : "Top Searches"}
          </p>
          {/* Pill container: scrollable on xs, wraps on sm+ */}
          <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-2 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0">
            {(hasAutocomplete ? suggestionOptions : popularSearches).map((item) => (
              <button
                key={`${item.label}-${item.value}`}
                type="button"
                onClick={() => sendMessage(item.value)}
                className="inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-full border border-accent/35 bg-accent/10 px-3 text-[11px] font-medium leading-none text-accent transition hover:bg-accent/20 active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}