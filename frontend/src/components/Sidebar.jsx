import {
  MdBusinessCenter,
  MdCreditCard,
  MdLocalOffer,
  MdOutlineAutoAwesome,
  MdOutlineInventory2,
  MdOutlinePhoneIphone,
  MdOutlineRocketLaunch,
  MdOutlineSecurity,
  MdOutlineSupportAgent,
  MdOutlineTravelExplore,
  MdOutlineWifi,
  MdSimCard,
  MdSwapHoriz,
} from "react-icons/md";
import { featureTags, quickActions } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const actionIcons = {
  rocket: MdOutlineRocketLaunch,
  plans: MdOutlineWifi,
  phone: MdOutlinePhoneIphone,
  switch: MdSwapHoriz,
  sim: MdSimCard,
  billing: MdCreditCard,
  support: MdOutlineSupportAgent,
  discount: MdLocalOffer,
  business: MdBusinessCenter,
  shield: MdOutlineSecurity,
};

const featureIcons = {
  Activate: MdSimCard,
  International: MdOutlineTravelExplore,
  "Student discount": MdLocalOffer,
  "Special offers": MdLocalOffer,
  "Network status": MdOutlineWifi,
  "Track order": MdOutlineInventory2,
  "Business plans": MdBusinessCenter,
  "Device protection": MdOutlineSecurity,
  FAQ: MdOutlineAutoAwesome,
};

function SidebarAction({ action, onAction }) {
  const Icon = actionIcons[action.icon] || MdOutlineSupportAgent;

  return (
    <button
      type="button"
      onClick={() => onAction(action.value)}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card/45 px-4 py-3 text-left text-sm text-ink transition hover:-translate-y-0.5 hover:border-accent hover:bg-card/80 xl:px-4 xl:py-3.5"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon className="text-lg" />
      </span>
      <span>{action.label}</span>
    </button>
  );
}

export function Sidebar() {
  const { sendMessage } = useChat();

  return (
    <aside className="hidden h-full w-[300px] min-w-[300px] flex-col overflow-hidden rounded-[28px] border border-border bg-panel/95 xl:flex xl:w-[320px] xl:min-w-[320px] 2xl:w-[340px] 2xl:min-w-[340px]">
      <div className="border-b border-border bg-[linear-gradient(145deg,rgba(14,165,233,0.12)_0%,rgba(255,255,255,0.18)_42%,rgba(244,114,182,0.12)_100%)] px-5 pb-3 pt-6">
        <div className="flex items-center justify-center gap-2">
          <img src="/logo.png" alt="GoLite Mobile" className="h-10" />
          <div className=" inline-flex items-center gap-2 rounded-full border border-accent/25 bg-card/80 px-3 py-1.5 text-xs font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulseSoft" />
            GoLite Guide - Online now
          </div>
        </div>

        <p className="mt-2 text-sm leading-6 text-ink/80">
          Search plans, help, or anything, then jump into the exact GoLite help
          category or popular search from the flow guide.
        </p>
      </div>

      <div className="scrollbar-slim flex-1 overflow-y-auto px-5 py-4 2xl:px-6">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Help Center
          </p>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <SidebarAction
                key={action.label}
                action={action}
                onAction={sendMessage}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Popular Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {featureTags.map((tag) => {
              const Icon = featureIcons[tag] || MdLocalOffer;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => sendMessage(tag)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-[11px] font-medium text-blue-400"
                >
                  <Icon className="text-sm" />
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
