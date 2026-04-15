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
    <div className="border-b border-border bg-panel/70 px-3 py-2 xl:hidden">
      {/* Scrollable row on xs; wraps to 2-col grid on sm, 3-col on md */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-2 sm:overflow-visible sm:pb-0">
        {mobileActions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => sendMessage(label)}
            className="inline-flex min-h-9 min-w-[130px] shrink-0 items-center justify-start gap-2 rounded-xl border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-[11px] font-medium text-accent transition hover:bg-accent/20 sm:min-w-0 sm:min-h-10 sm:rounded-2xl sm:px-3 sm:text-xs"
          >
            <span className="inline-flex min-w-6 h-6 items-center justify-center rounded-full bg-accent/15 px-1.5 text-[10px] font-bold sm:min-w-7 sm:h-7">
              {actionBadges[label] || "+"}
            </span>
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
