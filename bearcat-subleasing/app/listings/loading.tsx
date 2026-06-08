export default function ListingsLoading() {
  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-border/70 bg-card/55 px-6 pb-8 pt-6 shadow-soft dark:border-white/8 dark:bg-card/35 sm:px-8 sm:pb-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="h-3 w-28 rounded-full bg-muted animate-pulse" />
              <div className="mt-3 h-8 w-64 rounded-xl bg-muted animate-pulse" />
            </div>
            <div className="h-4 w-40 rounded-full bg-muted animate-pulse" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-card dark:border-white/8 dark:bg-card/96"
              >
                <div className="aspect-[1.08] w-full bg-muted animate-pulse" />
                <div className="flex flex-1 flex-col p-5 gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-3 w-24 rounded-full bg-muted animate-pulse" />
                      <div className="h-6 w-40 rounded-lg bg-muted animate-pulse" />
                    </div>
                    <div className="h-16 w-20 rounded-full bg-muted animate-pulse" />
                  </div>
                  <div className="h-4 w-full rounded-full bg-muted animate-pulse" />
                  <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse" />
                  <div className="flex gap-2 mt-1">
                    <div className="h-6 w-20 rounded-full bg-muted animate-pulse" />
                    <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="h-16 rounded-full bg-muted animate-pulse" />
                    <div className="h-16 rounded-full bg-muted animate-pulse" />
                  </div>
                  <div className="flex gap-4 border-t border-border/80 pt-4 dark:border-white/8">
                    <div className="h-4 w-16 rounded-full bg-muted animate-pulse" />
                    <div className="h-4 w-28 rounded-full bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
