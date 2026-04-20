import { useEffect, useRef } from "react";
import { popularSearches, searchKeywordCatalog } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

function normalizeText(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
}

function getMatchingCatalog(query) {
  const normalized = normalizeText(query);
  if (normalized.length < 3) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return searchKeywordCatalog.filter((item) =>
    item.keywords.some((keyword) => {
      const nk = normalizeText(keyword);
      if (nk.startsWith(normalized)) return true;
      return tokens.some((t) => t.length >= 3 && nk.startsWith(t));
    })
  );
}

export function ChatInput() {
  const { input, setInput, handleInputKeyDown, sendMessage } = useChat();
  const textareaRef = useRef(null);
  const matchingCatalog = getMatchingCatalog(input);
  const suggestionOptions = matchingCatalog.map((item) => ({ label: item.label, value: item.value }));
  const hasAutocomplete = input.trim().length >= 3 && suggestionOptions.length > 0;

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
  }, [input]);

  return (
    <div className="border-t border-border bg-panel/92 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2.5 backdrop-blur sm:px-4 sm:pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pt-3 lg:px-6">
      <div className="mx-auto w-full max-w-3xl lg:max-w-4xl">
        {/* Input row */}
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/70 p-2 shadow-panel sm:rounded-[20px] sm:p-2.5">
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            placeholder="Ask about plans, broadband, support…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="min-h-[36px] max-h-[120px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-ink outline-none placeholder:text-muted sm:min-h-[40px] sm:max-h-[140px]"
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            className="mb-0.5 shrink-0 rounded-full bg-linear-to-br from-accentDeep to-accent px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Send
          </button>
        </div>

        {/* Quick searches */}
        <div className="mt-2 sm:mt-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted sm:text-[11px]">
            {hasAutocomplete ? "Suggestions" : "Top Searches"}
          </p>
          <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0 sm:gap-2">
            {(hasAutocomplete ? suggestionOptions : popularSearches).map((item) => (
              <button
                key={`${item.label}-${item.value}`}
                type="button"
                onClick={() => sendMessage(item.value)}
                className="inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-full border border-accent/35 bg-accent/8 px-3 text-[11px] font-medium leading-none text-accent transition hover:border-accent/60 hover:bg-accent/16 active:scale-95 sm:h-7.5 sm:text-xs"
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

