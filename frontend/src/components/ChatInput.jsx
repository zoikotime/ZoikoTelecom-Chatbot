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
    <div className="border-t border-border bg-panel/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 sm:px-4 lg:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-[22px] border border-border bg-card/70 p-3 shadow-panel">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <textarea
              ref={textareaRef}
              value={input}
              rows={1}
              placeholder="Ask about mobile plans, broadband, landlines, support, reseller, pricing, or coverage..."
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
              className="min-h-[44px] max-h-[140px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink outline-hidden placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              className="min-h-11 w-full rounded-full bg-linear-to-br from-accentDeep to-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
            >
              Send
            </button>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            {hasAutocomplete ? "Auto-Fill Search Keywords" : "Top Searches"}
          </p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible">
            {(hasAutocomplete ? suggestionOptions : popularSearches).map((item) => (
              <button
                key={`${item.label}-${item.value}`}
                type="button"
                onClick={() => sendMessage(item.value)}
                className="shrink-0 whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/20"
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
