export function TypingIndicator() {
  return (
    <div className="px-3 pb-2 sm:px-4 lg:px-6">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-semibold text-accent">
          Z
        </div>
        <div className="flex items-center gap-1 rounded-full border border-accent/20 bg-bubbleBot px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-accent animate-bounceSoft" />
          <span className="h-2 w-2 rounded-full bg-accent animate-bounceSoft [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-full bg-accent animate-bounceSoft [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
