import { MdLocalOffer, MdOutlineSupportAgent, MdSimCard } from "react-icons/md";
import { mobileActions } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const mobileIcons = {
  Activate: MdSimCard,
  "Technical support": MdOutlineSupportAgent,
  "Special offers": MdLocalOffer,
  "Student discount": MdLocalOffer,
  "Business plans": MdOutlineSupportAgent,
};

export function MobileQuickActions() {
  const { sendMessage } = useChat();

  return (
    <div className="border-b border-border bg-panel/70 px-3 py-2.5 sm:px-4 sm:py-3 xl:hidden">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {mobileActions.map((label) => {
          const Icon = mobileIcons[label] || MdOutlineSupportAgent;

          return (
            <button
              key={label}
              type="button"
              onClick={() => sendMessage(label)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-3 py-2 text-[11px] font-medium text-accent transition hover:bg-accent/20 sm:text-xs"
            >
              <Icon className="text-sm" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
