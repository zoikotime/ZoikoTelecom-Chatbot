import { useTheme } from "../context/ThemeContext";
import { useChat } from "../hooks/useChat";

export function ChatHeader() {
  const { sendMessage, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="
      flex items-center justify-between gap-2 border-b border-border
      bg-panel/92 backdrop-blur
      px-3 py-2.5
      sm:px-4 sm:py-3
      md:px-5
      lg:px-6 lg:py-3.5
      xl:px-8
    ">
      {/* Brand */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-2.5 md:gap-3">
        <div className="
          flex shrink-0 items-center justify-center overflow-hidden
          h-8 w-8 rounded-xl border border-accent/25 bg-card/80
          shadow-[0_6px_20px_rgba(0,208,132,0.14)]
          sm:h-9 sm:w-9 sm:rounded-[14px]
          md:h-10 md:w-10 md:rounded-2xl
          lg:h-11 lg:w-11 lg:rounded-[18px]
        ">
          <img src="./logo.png" alt="Zoiko Logo" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0">
          <h1 className="
            font-display font-bold text-ink truncate
            text-[13px]
            sm:text-sm
            md:text-base
            lg:text-lg
          ">
            Zoiko Agent
          </h1>
          <p className="
            hidden text-muted leading-4 truncate
            sm:block sm:text-[10.5px] sm:leading-[1.4]
            md:text-[11px]
            lg:text-xs lg:leading-5
          ">
            Mobile · Broadband · Landlines · Support
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
        {[
          { label: theme === "light" ? "Dark" : "Light", onClick: toggleTheme },
          { label: "Agent", onClick: () => sendMessage("Speak to an Agent") },
          { label: "Clear", onClick: clearChat },
        ].map(({ label, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="
              inline-flex items-center justify-center font-medium
              rounded-full border border-border bg-card text-ink
              transition hover:border-accent/60 hover:bg-accent/8 hover:text-accent
              h-7 px-2.5 text-[11px]
              sm:h-8 sm:px-3 sm:text-xs
              md:h-8 md:px-3.5
              lg:h-9 lg:px-4 lg:text-sm
            "
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}