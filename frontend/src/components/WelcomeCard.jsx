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
    <div className="mb-6 flex items-start gap-4">
      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-card/80 font-display text-lg font-bold text-accent shadow-[0_10px_30px_rgba(0,208,132,0.16)] sm:flex">
        Z
      </div>

      <div className="w-full max-w-6xl">
        <div className="rounded-[30px] border border-border bg-[linear-gradient(145deg,rgba(0,208,132,0.12),rgba(255,255,255,0.08),rgba(22,41,37,0.18))] p-5 shadow-panel md:p-7">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Zoiko Telecom</p>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Zakko now follows the final Zoiko support flow</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/80">
            Start with one of the five documented journeys below or search by keyword to jump to the right Zoiko page, FAQ, or support route.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {welcomeTiles.map((tile) => (
              <button
                key={tile.title}
                type="button"
                onClick={() => sendMessage(tile.value)}
                className="min-w-0 rounded-2xl border border-border bg-card/75 p-4 text-left transition hover:-translate-y-0.5 hover:border-accent hover:bg-card"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-accent/12 px-2 text-sm font-bold text-accent">
                    {tileBadges[tile.icon] || "+"}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink">{tile.title}</div>
                    <div className="mt-1 text-xs leading-5 text-muted">{tile.subtitle}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 text-xs text-muted">{time}</div>
      </div>
    </div>
  );
}
