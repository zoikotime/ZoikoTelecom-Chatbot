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
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedKeyword.startsWith(normalized)) return true;
      return tokens.some((token) => token.length >= 3 && normalizedKeyword.startsWith(token));
    })
  );
}

export function ChatInput() {
  const { input, setInput, handleInputKeyDown, sendMessage } = useChat();
  const textareaRef = useRef(null);
  const matchingCatalog = getMatchingCatalog(input);
  const suggestionOptions = matchingCatalog.map((item) => ({ label: item.label, value: item.value }));
  const hasAutocomplete = input.trim().length >= 3 && suggestionOptions.length > 0;
  const autoFillItems = suggestionOptions.slice(0, 6);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
  }, [input]);

  return (
    <div className="
      border-t border-border bg-panel/92 backdrop-blur
      px-2.5 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.6rem)]
      sm:px-4 sm:pt-2.5 sm:pb-[calc(env(safe-area-inset-bottom)+0.75rem)]
      md:px-5
      lg:px-6 lg:pt-3 lg:pb-[calc(env(safe-area-inset-bottom)+0.9rem)]
      xl:px-8
    ">
      <div className="mx-auto w-full max-w-6xl 2xl:max-w-[1320px]">

        {/* Top Searches — always visible, fixed height */}
        <div className="mb-2 sm:mb-2.5">
          <p className="
            font-semibold uppercase tracking-widest text-muted
            text-[9.5px]
            sm:text-[10px]
            lg:text-[11px]
          ">
            Top Searches
          </p>
          <div className="
            mt-1.5 flex gap-1.5 overflow-x-auto
            pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:flex-wrap sm:overflow-visible sm:pb-0 sm:gap-2
          ">
            {popularSearches.map((item) => (
              <button
                key={`top-${item.value}`}
                type="button"
                onClick={() => sendMessage(item.value)}
                className="
                  inline-flex shrink-0 items-center whitespace-nowrap
                  rounded-full border border-accent/35 bg-accent/10
                  font-medium leading-none text-accent
                  transition hover:bg-accent/20 active:scale-95
                  h-6 px-2.5 text-[10.5px]
                  sm:h-7 sm:px-3 sm:text-[11px]
                  lg:h-7 lg:px-3.5 lg:text-xs
                "
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input box — always stays at the bottom */}
        <div className="relative">

          {/* Auto-Fill dropdown: floats ABOVE input, zero layout shift */}
          {hasAutocomplete && (
            <div className="absolute bottom-full left-0 right-0 mb-2 z-30">
              <div className="
                overflow-hidden border border-accent/30 bg-panel/98 backdrop-blur-md
                shadow-[0_-6px_28px_rgba(0,208,132,0.13)]
                rounded-2xl
                sm:rounded-[20px]
              ">
                <div className="
                  flex items-center justify-between border-b border-accent/15
                  px-3 py-1.5 sm:px-4 sm:py-2
                ">
                  <p className="
                    font-semibold uppercase tracking-widest text-accent
                    text-[9.5px] sm:text-[10px] lg:text-[11px]
                  ">
                    Auto-Fill
                  </p>
                  <span className="text-[9.5px] text-muted sm:text-[10px]">
                    {autoFillItems.length} match{autoFillItems.length !== 1 ? "es" : ""}
                  </span>
                </div>
                {/* 2-col on mobile, 3-col on sm+ */}
                <div className="
                  grid gap-1.5 p-2
                  grid-cols-2
                  sm:grid-cols-3 sm:gap-2 sm:p-3
                  lg:grid-cols-3 lg:p-3.5
                ">
                  {autoFillItems.map((item) => (
                    <button
                      key={`af-${item.value}`}
                      type="button"
                      onClick={() => { sendMessage(item.value); setInput(""); }}
                      className="
                        flex w-full items-center justify-center text-center
                        rounded-xl border border-accent/30 bg-accent/10
                        font-medium leading-snug text-accent
                        transition hover:border-accent/60 hover:bg-accent/20 active:scale-95
                        px-2 py-2 text-[11px]
                        sm:rounded-2xl sm:py-2.5 sm:text-xs
                        lg:py-3 lg:text-xs
                      "
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* The input bar itself */}
          <div className="
            border border-border bg-card/70 shadow-panel
            rounded-[16px] p-2
            sm:rounded-[18px] sm:p-2.5
            md:rounded-[20px]
            lg:rounded-[22px] lg:p-3
          ">
            <div className="flex items-end gap-2 sm:gap-2.5 lg:gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                rows={1}
                placeholder="Ask about plans, broadband, support…"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="
                  flex-1 resize-none bg-transparent text-ink outline-hidden placeholder:text-muted
                  min-h-[36px] max-h-[100px] px-1.5 py-1.5 text-[13px]
                  sm:min-h-[40px] sm:max-h-[120px] sm:px-2 sm:text-sm
                  lg:min-h-[44px] lg:max-h-[140px] lg:text-sm
                "
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                className="
                  shrink-0 rounded-full bg-linear-to-br from-accentDeep to-accent
                  font-semibold text-white transition hover:brightness-110 active:scale-95
                  px-3.5 py-2 text-[12.5px]
                  sm:px-4 sm:py-2.5 sm:text-sm
                  lg:px-5 lg:py-3 lg:text-sm
                "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}