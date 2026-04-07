import {
  MdDarkMode,
  MdLightMode,
  MdOutlineDeleteSweep,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useChat } from "../hooks/useChat";

export function ChatHeader() {
  const { sendMessage, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col gap-3 border-b border-border bg-panel/90 px-3 py-3 backdrop-blur sm:px-4 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6 2xl:px-7">
      <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-card/80 p-1.5 shadow-[0_10px_30px_rgba(14,165,233,0.16)] sm:h-12 sm:w-12 sm:rounded-[18px] sm:p-2">
          <img
            src="/logo.png"
            alt="GoLite logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-[15px] font-bold text-ink sm:text-lg">
            GoLite Guide
          </h1>
          <p className="line-clamp-2 text-[10px] leading-4 text-muted sm:text-xs sm:leading-5">
            Website search, help center flows, and support guidance aligned to
            the GoLite support guide
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3 lg:flex lg:flex-wrap lg:justify-end">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs text-ink transition hover:border-accent hover:bg-card/80 sm:rounded-full sm:px-4 sm:text-sm"
        >
          {theme === "light" ? (
            <MdDarkMode className="text-base" />
          ) : (
            <MdLightMode className="text-base" />
          )}
          {theme === "light" ? "Dark theme" : "Light theme"}
        </button>
        <button
          type="button"
          onClick={() => sendMessage("Help and support")}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs text-ink transition hover:border-accent hover:bg-card/80 sm:rounded-full sm:px-4 sm:text-sm"
        >
          <MdOutlineSupportAgent className="text-base" />
          Help center
        </button>
        <button
          type="button"
          onClick={clearChat}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-xs text-ink transition hover:border-accent hover:bg-card/80 sm:rounded-full sm:px-4 sm:text-sm"
        >
          <MdOutlineDeleteSweep className="text-base" />
          Clear chat
        </button>
      </div>
    </header>
  );
}
