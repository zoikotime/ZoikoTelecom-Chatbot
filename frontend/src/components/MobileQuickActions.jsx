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
    <div className="border-b border-border bg-panel/70 px-3 py-2.5 xl:hidden">
      <div className="flex gap-2 overflow-x-auto pb-0.5 sm:grid sm:grid-cols-3 sm:overflow-visible">
        {mobileActions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => sendMessage(label)}
            className="inline-flex min-h-10 min-w-[150px] shrink-0 items-center justify-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition hover:bg-accent/20 sm:min-w-0"
          >
            <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-accent/15 px-1.5 py-1 text-[10px] font-bold">
              {actionBadges[label] || "+"}
            </span>
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
