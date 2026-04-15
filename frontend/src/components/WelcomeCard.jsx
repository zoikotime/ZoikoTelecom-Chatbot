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
    <div className="mb-4 flex items-start gap-2.5 sm:mb-6 sm:gap-4">
      {/* Avatar — hidden on xs, shown on sm+ */}
      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-card/80 font-display text-base font-bold text-accent shadow-[0_10px_30px_rgba(0,208,132,0.16)] sm:flex sm:h-11 sm:w-11 sm:rounded-2xl sm:text-lg">
        Z
      </div>

      <div className="min-w-0 flex-1">
        <div className="rounded-[22px] border border-border bg-[linear-gradient(145deg,rgba(0,208,132,0.12),rgba(255,255,255,0.08),rgba(22,41,37,0.18))] p-4 shadow-panel sm:rounded-[30px] sm:p-5 md:p-7">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent sm:mb-2 sm:text-[11px] sm:tracking-[0.24em]">
            Zoiko Telecom
          </p>
          <h2 className="font-display text-lg font-bold text-ink sm:text-2xl md:text-3xl">
            Zakko follows the final Zoiko support flow
          </h2>
          <p className="mt-2 text-xs leading-6 text-ink/80 sm:mt-3 sm:text-sm sm:leading-7">
            Start with one of the journeys below or search by keyword to jump to
            the right page, FAQ, or support route.
          </p>

          {/* Tiles: 1-col on xs, 2-col on sm, 3-col on xl */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3">
            {welcomeTiles.map((tile) => (
              <button
                key={tile.title}
                type="button"
                onClick={() => sendMessage(tile.value)}
                className="min-w-0 rounded-xl border border-border bg-card/75 p-3 text-left transition hover:-translate-y-0.5 hover:border-accent hover:bg-card sm:rounded-2xl sm:p-4"
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-accent/12 px-1.5 text-xs font-bold text-accent sm:h-10 sm:min-w-10 sm:rounded-2xl sm:px-2 sm:text-sm">
                    {tileBadges[tile.icon] || "+"}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-ink sm:text-sm">
                      {tile.title}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-5 text-muted sm:mt-1">
                      {tile.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-1.5 text-[10px] text-muted sm:mt-2 sm:text-xs">
          {time}
        </div>
      </div>
    </div>
  );
}
