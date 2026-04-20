import { mobileActions } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const actionBadges = {
  "1 Mobile plans (EE network)": "1",
  "2 Home broadband": "2",
  "3 Landlines & Business solutions": "3",
  "4 Already a customer - need support": "4",
  "Speak to an Agent": "A",
};

export function MobileQuickActions() {
  const { sendMessage } = useChat();

  return (
    <div className="border-b border-border bg-panel/60 px-3 py-2 backdrop-blur xl:hidden sm:px-4">
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0 sm:gap-2 hidden sm:block">
        {mobileActions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => sendMessage(label)}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/30 bg-accent/8 px-2.5 text-[11px] font-medium text-accent transition hover:border-accent/55 hover:bg-accent/15 active:scale-95 sm:h-9 sm:px-3 sm:text-xs sm:hidden"
          >
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent/20 text-[9px] font-bold sm:h-5 sm:w-5 sm:text-[10px]">
              {actionBadges[label] ?? "+"}
            </span>
            <span className="max-w-[120px] truncate sm:max-w-[160px]">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
