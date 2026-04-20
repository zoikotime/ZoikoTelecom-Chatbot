import { welcomeTiles } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const tileBadges = {
  mobile: "1",
  broadband: "2",
  landline: "3",
  support: "4",
  other: "5",
};

export function WelcomeCard({ time }) {
  const { sendMessage } = useChat();

  return (
    <div className="mb-4 flex items-start gap-2.5 sm:mb-6 sm:gap-3">
      {/* Avatar */}
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-card/80 font-display text-xs font-bold text-accent shadow-[0_4px_14px_rgba(0,208,132,0.15)] sm:h-9 sm:w-9 sm:rounded-[14px] sm:text-sm">
        Z
      </div>

      <div className="min-w-0 flex-1">
        <div className="rounded-2xl border border-accent/12 bg-bubbleBot p-3.5 shadow-panel sm:rounded-[20px] sm:p-5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-[11px]">
            Zoiko Telecom
          </p>
          <h2 className="font-display text-base font-bold text-ink sm:text-xl md:text-2xl">
            Zakko follows the final Zoiko support flow
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/75 sm:mt-2 sm:text-sm sm:leading-6">
            Start with one of the journeys below or search by keyword to jump to the right page, FAQ, or support route.
          </p>

          {/* Tiles */}
          <div className="mt-3.5 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-2.5 xl:grid-cols-3">
            {welcomeTiles.map((tile) => (
              <button
                key={tile.title}
                type="button"
                onClick={() => sendMessage(tile.value)}
                className="flex items-start gap-2.5 rounded-xl border border-border bg-card/60 p-3 text-left transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card/90 sm:rounded-2xl sm:p-3.5"
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-xs font-bold text-accent sm:h-9 sm:w-9 sm:text-sm">
                  {tileBadges[tile.icon] ?? "+"}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-ink sm:text-[13px]">{tile.title}</div>
                  <div className="mt-0.5 text-[11px] leading-5 text-muted">{tile.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-1.5 px-0.5 text-[10px] text-muted/60 sm:text-[11px]">{time}</div>
      </div>
    </div>
  );
}