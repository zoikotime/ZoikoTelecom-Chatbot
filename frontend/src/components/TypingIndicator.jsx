export function TypingIndicator() {
  return (
    <div className="px-3 pb-2 sm:px-4 lg:px-6">
      <div className="mx-auto flex max-w-3xl items-center gap-2 lg:max-w-4xl">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-card/80 text-xs font-bold text-accent sm:h-8 sm:w-8">
          Z
        </div>
        <div className="flex items-center gap-1 rounded-2xl border border-accent/15 bg-bubbleBot px-3.5 py-2.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="h-1.5 w-1.5 rounded-full bg-accent animate-bounceSoft sm:h-2 sm:w-2"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}