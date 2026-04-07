import {
  MdBusinessCenter,
  MdCreditCard,
  MdOutlineRocketLaunch,
  MdOutlinePhoneIphone,
  MdOutlineSupportAgent,
  MdOutlineWifi,
  MdOutlineSecurity,
  MdSimCard,
} from "react-icons/md";
import { popularSearches, welcomeTiles } from "../data/uiConfig";
import { useChat } from "../hooks/useChat";

const tileIcons = {
  rocket: MdOutlineRocketLaunch,
  plans: MdOutlineWifi,
  phone: MdOutlinePhoneIphone,
  sim: MdSimCard,
  billing: MdCreditCard,
  support: MdOutlineSupportAgent,
  shield: MdOutlineSecurity,
  business: MdBusinessCenter,
};

export function WelcomeCard({ time }) {
  const { sendMessage } = useChat();

  return (
    <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:gap-4">
      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-card/80 p-2 shadow-[0_10px_30px_rgba(14,165,233,0.16)] sm:flex sm:h-11 sm:w-11">
        <img
          src="/logo.png"
          alt="GoLite logo"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="w-full max-w-6xl">
        <div className="rounded-[22px] border border-border bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(255,255,255,0.14),rgba(244,114,182,0.10))] p-4 shadow-panel sm:rounded-[26px] sm:p-5 md:p-6 lg:rounded-[30px] lg:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            GoLite Support
          </p>
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
            We&apos;re here to help you stay connected
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/80 sm:leading-7">
            What can we help you with today? Search plans, help, or anything, or
            jump straight into the help center sections below.
          </p>

          <div className="mt-5 sm:mt-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Main Categories
            </p>
          </div>

          <div className="grid gap-2.5 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
            {welcomeTiles.map((tile) => {
              const Icon = tileIcons[tile.icon] || MdOutlineWifi;

              return (
                <button
                  key={tile.title}
                  type="button"
                  onClick={() => sendMessage(tile.value)}
                  className="rounded-2xl border border-border bg-card/70 p-3 text-left transition hover:-translate-y-0.5 hover:border-accent hover:bg-card sm:p-4 xl:min-h-[108px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent sm:h-10 sm:w-10 sm:rounded-2xl">
                      <Icon className="text-lg sm:text-xl" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {tile.title}
                      </div>
                      <div className="mt-1 text-xs leading-5 text-muted sm:text-sm">
                        {tile.subtitle}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 text-xs text-muted">{time}</div>
      </div>
    </div>
  );
}
