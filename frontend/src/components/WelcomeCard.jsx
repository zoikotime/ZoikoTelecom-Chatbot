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
    <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:gap-3 md:gap-4">
      {/* Avatar */}
      <div className="
        hidden shrink-0 items-center justify-center
        border border-accent/25 bg-card/80 font-display font-bold text-accent
        shadow-[0_8px_24px_rgba(0,208,132,0.15)]
        sm:flex sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm
        md:h-10 md:w-10 md:rounded-[18px] md:text-base
        lg:h-11 lg:w-11 lg:rounded-2xl lg:text-lg
      ">
        Z
      </div>

      <div className="min-w-0 flex-1">
        <div className="
          border border-border/60 shadow-panel
          bg-[linear-gradient(145deg,rgba(0,208,132,0.10),rgba(255,255,255,0.06),rgba(22,41,37,0.16))]
          rounded-[18px] p-3.5
          sm:rounded-[22px] sm:p-4
          md:rounded-[26px] md:p-5
          lg:rounded-[30px] lg:p-6
        ">
          <p className="
            font-semibold uppercase tracking-widest text-accent
            text-[9.5px]
            sm:text-[10px] sm:tracking-[0.22em]
            lg:text-[11px] lg:tracking-[0.24em]
          ">
            Zoiko Telecom
          </p>
          <h2 className="
            mt-1 font-display font-bold text-ink leading-snug
            text-[17px]
            sm:text-xl sm:mt-1.5
            md:text-2xl
            lg:text-3xl
          ">
            Zakko follows the final Zoiko support flow
          </h2>
          <p className="
            text-ink/75 leading-relaxed
            mt-1.5 text-[12px]
            sm:mt-2 sm:text-[13px]
            md:text-sm
            lg:mt-3 lg:text-sm lg:leading-7
          ">
            Start with one of the journeys below or search by keyword to jump
            to the right page, FAQ, or support route.
          </p>

          {/* Tiles grid:
              320-639px  : 1 col
              640-767px  : 2 col
              768-1023px : 2 col
              1024px+    : 3 col                */}
          <div className="
            mt-3 grid gap-2
            grid-cols-1
            sm:mt-4 sm:grid-cols-2 sm:gap-2.5
            md:gap-3
            lg:mt-5 lg:grid-cols-3 lg:gap-3
          ">
            {welcomeTiles.map((tile) => (
              <button
                key={tile.title}
                type="button"
                onClick={() => sendMessage(tile.value)}
                className="
                  min-w-0 text-left border border-border/60 bg-card/70
                  transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card active:scale-[0.98]
                  rounded-xl p-2.5
                  sm:rounded-2xl sm:p-3
                  lg:p-4
                "
              >
                <div className="flex items-start gap-2 sm:gap-2.5 lg:gap-3">
                  <span className="
                    inline-flex shrink-0 items-center justify-center
                    rounded-xl bg-accent/12 font-bold text-accent
                    h-8 w-8 text-[11px]
                    sm:h-9 sm:w-9 sm:rounded-[14px] sm:text-xs
                    md:h-10 md:w-10 md:rounded-2xl md:text-sm
                  ">
                    {tileBadges[tile.icon] || "+"}
                  </span>
                  <div className="min-w-0">
                    <div className="
                      font-semibold text-ink leading-snug
                      text-[12px]
                      sm:text-[12.5px]
                      md:text-sm
                    ">
                      {tile.title}
                    </div>
                    <div className="
                      mt-0.5 text-muted leading-snug
                      text-[10.5px]
                      sm:text-[11px]
                      md:text-xs md:mt-1
                    ">
                      {tile.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-1.5 text-[9.5px] text-muted sm:mt-2 sm:text-[10.5px] lg:text-xs">
          {time}
        </div>
      </div>
    </div>
  );
}