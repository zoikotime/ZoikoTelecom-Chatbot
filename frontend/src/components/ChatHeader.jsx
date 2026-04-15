import { useTheme } from "../context/ThemeContext";
import { useChat } from "../hooks/useChat";

export function ChatHeader() {
  const { sendMessage, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-2 border-b border-border bg-panel/92 px-3 py-2.5 backdrop-blur sm:px-4 sm:py-3 lg:px-6">
      {/* Brand */}
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-accent/25 bg-card/80 font-display text-base font-bold text-accent shadow-[0_10px_26px_rgba(0,208,132,0.16)] sm:h-11 sm:w-11 sm:rounded-[18px]">
          <img src="./logo.png" alt="Zoiko Logo" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-sm font-bold text-ink sm:text-base lg:text-lg">
            Zoiko Assistant
          </h1>
          <p className="hidden text-[11px] leading-4 text-muted sm:block sm:leading-5">
            Mobile · Broadband · Landlines · Support
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-8 items-center justify-center rounded-full border border-border bg-card px-3 text-xs text-ink transition hover:border-accent hover:bg-card/80 sm:h-9 sm:px-4 sm:text-sm"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <button
          type="button"
          onClick={() => sendMessage("Speak to an Agent")}
          className="inline-flex h-8 items-center justify-center rounded-full border border-border bg-card px-3 text-xs text-ink transition hover:border-accent hover:bg-card/80 sm:h-9 sm:px-4 sm:text-sm"
        >
          Agent
        </button>
        <button
          type="button"
          onClick={clearChat}
          className="inline-flex h-8 items-center justify-center rounded-full border border-border bg-card px-3 text-xs text-ink transition hover:border-accent hover:bg-card/80 sm:h-9 sm:px-4 sm:text-sm"
        >
          Clear
        </button>
      </div>
    </header>
  );
}
