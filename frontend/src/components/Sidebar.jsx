import { featureTags, quickActions } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const actionBadges = {
  mobile: "1", broadband: "2", landline: "3", support: "4", other: "5",
};
const featureBadges = {
  "Traditional SIM": "SIM", eSIM: "eSIM", "IoT SIMs": "IoT",
  "Billing question": "£", "Phone accessories": "EQ",
  "Becoming a reseller": "RS", "Speak to an Agent": "A",
};

function SidebarAction({ action, onAction }) {
  return (
    <button
      type="button"
      onClick={() => onAction(action.value)}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card/50 px-3.5 py-3 text-left text-sm text-ink transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card/80"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-sm font-bold text-accent">
        {actionBadges[action.icon] ?? "+"}
      </span>
      <span className="min-w-0 truncate text-sm">{action.label}</span>
    </button>
  );
}

export function Sidebar() {
  const { sendMessage } = useChat();

  return (
    <aside className="hidden h-full w-[290px] min-w-[290px] flex-col overflow-hidden rounded-[26px] border border-border bg-panel/95 xl:flex 2xl:w-[310px] 2xl:min-w-[310px]">
      {/* Header */}
      <div className="border-b border-border bg-[linear-gradient(155deg,rgba(0,208,132,0.15)_0%,transparent_50%,rgba(18,55,42,0.2)_100%)] px-5 pb-4 pt-5">
        <div className="flex items-center justify-between gap-3">
          <img src="./logo.png" alt="Zoiko" className="h-10 w-auto object-contain" />
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-card/70 px-2.5 py-1 text-[11px] font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulseSoft" />
            Online
          </div>
        </div>
        <h2 className="mt-3 font-display text-xl font-bold text-ink">Zakko</h2>
        <p className="mt-1.5 text-xs leading-5 text-ink/70">
          Final-flow navigation for mobile, broadband, landlines, support, and general Zoiko enquiries.
        </p>
      </div>

      {/* Body */}
      <div className="scrollbar-slim flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
          Main Services
        </p>
        <div className="space-y-1.5">
          {quickActions.map((action) => (
            <SidebarAction key={action.label} action={action} onAction={sendMessage} />
          ))}
        </div>

        <div className="mt-5">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Fast Topics
          </p>
          <div className="flex flex-wrap gap-1.5">
            {featureTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => sendMessage(tag)}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/8 px-2.5 py-1.5 text-[11px] font-medium text-accent transition hover:border-accent/55 hover:bg-accent/15"
              >
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent/20 px-1 text-[8px] font-bold">
                  {featureBadges[tag] ?? "+"}
                </span>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}