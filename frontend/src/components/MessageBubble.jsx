import { formatMessage, formatSuggestionLabel } from "../utils/chat";
import { useChat } from "../hooks/useChat";

export function MessageBubble({ message }) {
  const { sendMessage } = useChat();
  const isUser = message.sender === "user";

  return (
    <div
      className={`mb-3 flex gap-2.5 sm:gap-3 md:gap-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser ? (
        <div className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-accent/30 bg-accent/10 text-sm font-semibold text-accent sm:flex md:h-10 md:w-10">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-card/80 p-1.5 shadow-[0_10px_30px_rgba(14,165,233,0.16)] md:h-11 md:w-11 md:rounded-2xl md:p-2">
            <img
              src="/logo.png"
              alt="GoLite logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      ) : null}

      <div
        className={`flex max-w-[94%] flex-col gap-2 sm:max-w-[88%] lg:max-w-[min(880px,82%)] 2xl:max-w-[960px] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`w-full break-words rounded-[22px] border px-3 py-2 text-[13px] leading-6 shadow-panel [&_a]:break-all sm:rounded-3xl sm:px-4 sm:py-3 sm:text-sm sm:leading-7 md:px-5 ${
            isUser
              ? "border-sky-500/20 bg-bubbleUser text-white"
              : "border-accent/20 bg-bubbleBot text-ink"
          }`}
          dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
        />

        {message.suggestions?.length ? (
          <div
            className={`flex flex-wrap gap-2 ${isUser ? "justify-end" : "justify-start"}`}
          >
            {message.suggestions.map((suggestion) => (
              <button
                key={`${message.id}-${suggestion}`}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="max-w-full rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-[11px] font-medium text-accent transition hover:bg-accent/20 sm:text-xs"
              >
                {formatSuggestionLabel(suggestion)}
              </button>
            ))}
          </div>
        ) : null}

        <div className="text-xs text-muted">{message.time}</div>
      </div>

      {isUser ? (
        <div className="mt-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-sky-500/25 bg-sky-900/40 text-sm font-semibold text-sky-100 sm:flex md:h-10 md:w-10">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-card/80 p-1.5 shadow-[0_10px_30px_rgba(14,165,233,0.16)] md:h-11 md:w-11 md:rounded-2xl md:p-2">
            <img
              src="/avatar.svg"
              alt="User avatar"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
