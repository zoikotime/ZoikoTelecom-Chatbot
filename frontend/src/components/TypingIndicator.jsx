export function TypingIndicator() {
  return (
    <div className="px-2 pb-1.5 sm:px-4 sm:pb-2 lg:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-sm font-semibold text-accent sm:h-10 sm:w-10 sm:rounded-2xl">
          Z
        </div>
        <div className="flex items-center gap-1 rounded-full border border-accent/20 bg-bubbleBot px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounceSoft sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounceSoft [animation-delay:150ms] sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounceSoft [animation-delay:300ms] sm:h-2 sm:w-2" />
        </div>
      </div>
    </div>
  );
}
