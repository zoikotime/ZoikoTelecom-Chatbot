import { featureTags, quickActions } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const actionBadges = {
  mobile: "1",
  broadband: "2",
  landline: "3",
  support: "4",
  other: "5",
};

const featureBadges = {
  "Traditional SIM": "SIM",
  "eSIM": "eSIM",
  "IoT SIMs": "IoT",
  "Billing question": "GBP",
  "Equipment & Phone accessories": "EQ",
  "Becoming a reseller": "RS",
  "Speak to an Agent": "A",
};

function SidebarAction({ action, onAction }) {
  return (
    <button
      type="button"
      onClick={() => onAction(action.value)}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card/50 px-3 py-3 text-left text-sm text-ink transition hover:-translate-y-0.5 hover:border-accent hover:bg-card/80"
    >
      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-accent/15 px-2 text-sm font-bold text-accent">
        {actionBadges[action.icon] || "+"}
      </span>
      <span className="min-w-0 truncate">{action.label}</span>
    </button>
  );
}

export function Sidebar() {
  const { sendMessage } = useChat();

  return (
    <aside className="hidden h-full w-[310px] min-w-[310px] flex-col overflow-hidden rounded-[30px] border border-border bg-panel/95 xl:flex">
      <div className="border-b border-border bg-[linear-gradient(155deg,rgba(0,208,132,0.18)_0%,rgba(255,255,255,0.08)_42%,rgba(18,55,42,0.28)_100%)] px-5 pb-4 pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent/80">Zoiko Telecom</div>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">Zakko</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/70 px-3 py-1.5 text-xs font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulseSoft" />
            Online now
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-ink/80">
          Final-flow navigation for mobile, broadband, landlines, support, and general Zoiko enquiries.
        </p>
      </div>

      <div className="scrollbar-slim flex-1 overflow-y-auto px-5 py-4">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Main Services</p>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <SidebarAction key={action.label} action={action} onAction={sendMessage} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Fast Topics</p>
          <div className="flex flex-wrap gap-2">
            {featureTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => sendMessage(tag)}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11px] font-medium text-accent transition hover:bg-accent/20"
              >
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent/15 px-1 text-[9px] font-bold">
                  {featureBadges[tag] || "+"}
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
