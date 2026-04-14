import { useTheme } from "../context/ThemeContext";
import { useChat } from "../hooks/useChat";

export function ChatHeader() {
  const { sendMessage, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col gap-3 border-b border-border bg-panel/92 px-4 py-3 backdrop-blur lg:flex-row lg:items-center lg:justify-between lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-accent/25 bg-card/80 font-display text-lg font-bold text-accent shadow-[0_14px_34px_rgba(0,208,132,0.16)]">
          Z
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg font-bold text-ink">Zoiko Telecom Assistant</h1>
          <p className="line-clamp-2 text-xs leading-5 text-muted">
            Final customer support flow for mobile, broadband, landlines, support, and general enquiries.
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-0.5 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-border bg-card px-4 text-sm text-ink transition hover:border-accent hover:bg-card/80"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
        <button
          type="button"
          onClick={() => sendMessage("Speak to an Agent")}
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-border bg-card px-4 text-sm text-ink transition hover:border-accent hover:bg-card/80"
        >
          Agent
        </button>
        <button
          type="button"
          onClick={clearChat}
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-border bg-card px-4 text-sm text-ink transition hover:border-accent hover:bg-card/80"
        >
          Clear
        </button>
      </div>
    </header>
  );
}
