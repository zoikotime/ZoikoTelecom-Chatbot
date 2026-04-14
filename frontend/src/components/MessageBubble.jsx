import { formatMessage, formatSuggestionLabel } from "../utils/chat";
import { useChat } from "../hooks/useChat";
import { trackChatEvent } from "../services/chatService";

const POINT_RIGHT = "\u{1F449}";
const ARROW_RIGHT = "\u2192";

export function MessageBubble({ message }) {
  const { sendMessage } = useChat();
  const isUser = message.sender === "user";

  return (
    <div className={`mb-4 flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-card/80 font-display text-sm font-bold text-accent shadow-[0_10px_30px_rgba(0,208,132,0.16)]">
          Z
        </div>
      ) : null}

      <div className={`flex max-w-[min(900px,88%)] flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`w-full break-words rounded-[24px] border px-4 py-3 text-sm leading-7 shadow-panel [&_a]:break-all ${
            isUser ? "border-accent/25 bg-bubbleUser text-white" : "border-accent/15 bg-bubbleBot text-ink"
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }} />

          {message.ctas?.length ? (
            <div className="mt-3 grid gap-2">
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
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-accent/25 bg-accent/8 px-4 py-3 text-left transition hover:border-accent hover:bg-accent/12"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink">
                      <span className="mr-2 text-base">{POINT_RIGHT}</span>
                      <span className="rounded-full bg-accent/12 px-2 py-0.5 text-accent">{cta.label}</span>
                    </div>
                    <div className="mt-1 break-all text-[11px] text-muted">{cta.url}</div>
                  </div>
                  <span className="shrink-0 text-lg text-accent transition group-hover:translate-x-1">{ARROW_RIGHT}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {message.suggestions?.length ? (
          <div className={`flex flex-wrap gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
            {message.suggestions.map((suggestion) => (
              <button
                key={`${message.id}-${suggestion}`}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="max-w-full rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition hover:bg-accent/20"
              >
                {formatSuggestionLabel(suggestion)}
              </button>
            ))}
          </div>
        ) : null}

        <div className="text-xs text-muted">{message.time}</div>
      </div>

      {isUser ? (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/80 text-sm font-semibold text-ink shadow-panel">
          You
        </div>
      ) : null}
    </div>
  );
}
