import { useTheme } from "../context/ThemeContext";
import { useChat } from "../hooks/useChat";

export function ChatHeader() {
  const { sendMessage, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-2 border-b border-border bg-panel/92 px-3 py-2.5 backdrop-blur sm:px-5 sm:py-3 lg:px-6">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-card/80 shadow-[0_4px_16px_rgba(0,208,132,0.15)] sm:h-10 sm:w-10 sm:rounded-[14px]">
          <img src="./logo.png" alt="Zoiko" className="h-full w-full object-contain p-0.5" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-sm font-bold leading-tight text-ink sm:text-base">
            Zoiko Agent
          </h1>
          <p className="text-[10px] leading-tight text-muted sm:text-[11px]">
            Mobile · Broadband · Support
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        {[
          { label: theme === "light" ? "Dark" : "Light", action: toggleTheme },
          { label: "Agent", action: () => sendMessage("Speak to an Agent") },
          { label: "Clear", action: clearChat },
        ].map(({ label, action }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="inline-flex h-7 items-center justify-center rounded-full border border-border bg-card/80 px-2.5 text-[11px] font-medium text-ink transition hover:border-accent/60 hover:bg-accent/8 hover:text-accent sm:h-8 sm:px-3 sm:text-xs"
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}