import { formatMessage, formatSuggestionLabel } from "../utils/chat";
import { useChat } from "../hooks/useChat";
import { trackChatEvent } from "../services/chatService";

const POINT_RIGHT = "\u{1F449}";
const ARROW_RIGHT = "\u2192";

// If average label length <= 15 chars → short (3 cols), else long (2 cols)
function getSuggestionGridCols(suggestions) {
  if (!suggestions?.length) return 2;
  const avg =
    suggestions.reduce(
      (sum, s) => sum + (formatSuggestionLabel(s) || s).length,
      0,
    ) / suggestions.length;
  return avg <= 15 ? 3 : 2;
}

export function MessageBubble({ message }) {
  const { sendMessage } = useChat();
  const isUser = message.sender === "user";
  const cols = getSuggestionGridCols(message.suggestions);

  return (
    <div
      className={`mb-3 flex items-end gap-2 sm:mb-4 sm:gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-card/80 font-display text-xs font-bold text-accent shadow-[0_8px_24px_rgba(0,208,132,0.14)] sm:h-10 sm:w-10 sm:text-sm">
          Z
        </div>
      )}

      {/* Content column */}
      <div
        className={`flex min-w-0 flex-col gap-1.5 sm:gap-2 ${
          isUser ? "items-end" : "items-start"
        } ${
          isUser
            ? "max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[min(680px,55%)]"
            : "max-w-[80vw] sm:max-w-[72vw] md:max-w-[62vw] lg:max-w-[min(720px,58%)]"
        }`}
      >
        {/* Bubble */}
        <div
          className={`w-full break-words rounded-2xl border px-3.5 py-2.5 text-sm leading-relaxed shadow-panel [&_a]:break-all sm:rounded-[22px] sm:px-4 sm:py-3 sm:leading-7 md:px-5 ${
            isUser
              ? "border-accent/25 bg-bubbleUser text-white"
              : "border-accent/15 bg-bubbleBot text-ink"
          }`}
        >
          <div
            dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
          />

          {/* CTA links */}
          {message.ctas?.length ? (
            <div className="mt-3 grid gap-2 sm:mt-3.5">
              {message.ctas.map((cta) => (
                <a
                  key={`${message.id}-${cta.label}`}
                  href={cta.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackChatEvent("cta_click", {
                      source: "message_cta",
                      label: cta.label,
                      url: cta.url,
                    });
                    trackChatEvent("url_redirect", {
                      source: "message_cta",
                      label: cta.label,
                      url: cta.url,
                    });
                  }}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-accent/25 bg-accent/8 px-3 py-2.5 text-left transition hover:border-accent hover:bg-accent/12 sm:px-4 sm:py-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink">
                      <span className="mr-2 text-base">{POINT_RIGHT}</span>
                      <span className="rounded-full bg-accent/12 px-2 py-0.5 text-accent">
                        {cta.label}
                      </span>
                    </div>
                    <div className="mt-1 break-all text-[11px] text-muted">
                      {cta.url}
                    </div>
                  </div>
                  <span className="shrink-0 text-lg text-accent transition group-hover:translate-x-1">
                    {ARROW_RIGHT}
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Suggestion pills — adaptive grid */}
        {message.suggestions?.length ? (
          <div
            className={`w-full grid gap-1.5 sm:gap-2 ${
              cols === 3
                ? "grid-cols-3 sm:grid-cols-4" // short labels: 3 col mobile → 4 col sm+
                : "grid-cols-2 sm:grid-cols-3" // long labels:  2 col mobile → 3 col sm+
            }`}
          >
            {message.suggestions.map((suggestion) => (
              <button
                key={`${message.id}-${suggestion}`}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="flex w-full items-center justify-center rounded-2xl border border-accent/35 bg-accent/10 px-1 py-1 text-[11px] font-medium leading-snug text-accent transition hover:bg-accent/20 active:scale-95 sm:rounded-2xl sm:px-1 sm:py-1 sm:text-xs text-center"
              >
                {formatSuggestionLabel(suggestion)}
              </button>
            ))}
          </div>
        ) : null}

        {/* Timestamp */}
        <div className="text-[10px] text-muted sm:text-[11px]">
          {message.time}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="mb-0.5 flex h-8 w-8 shrink-0 overflow-hidden rounded-2xl border border-border bg-card/80 shadow-panel sm:h-10 sm:w-10">
          <img
            src="./Avatar.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
