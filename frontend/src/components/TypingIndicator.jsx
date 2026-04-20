export function TypingIndicator() {
  return (
    <div className="
      px-2.5 pb-2
      sm:px-4 sm:pb-2.5
      md:px-5
      lg:px-6 lg:pb-3
      xl:px-8
    ">
      <div className="mx-auto flex max-w-3xl items-center gap-2 lg:max-w-4xl xl:max-w-5xl sm:gap-2.5 lg:gap-3">
        <div className="
          flex shrink-0 items-center justify-center
          rounded-xl border border-accent/25 bg-card/80
          font-display font-bold text-accent
          shadow-[0_4px_14px_rgba(0,208,132,0.14)]
          h-7 w-7 text-[11px]
          sm:h-8 sm:w-8 sm:rounded-[14px] sm:text-xs
          md:h-9 md:w-9 md:rounded-2xl
          lg:h-10 lg:w-10 lg:text-sm
        ">
          Z
        </div>
        <div className="
          flex items-center gap-1 rounded-full border border-accent/20 bg-bubbleBot
          px-3 py-2.5
          sm:px-4 sm:py-3
          lg:px-5
        ">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              style={{ animationDelay: `${delay}ms` }}
              className="
                rounded-full bg-accent animate-bounceSoft
                h-1.5 w-1.5
                sm:h-2 sm:w-2
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}