import Link from "next/link";

export default function AppsPage() {
  return (
    <section className="space-y-10">
      <header className="flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          Apps
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Cool Tools
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/70">
          A focused set of minimal apps designed to help me stay consistent.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Link
          href="/pomodoro"
          className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-600 hover:bg-zinc-900"
        >
          <h2 className="text-lg font-semibold text-white">Pomodoro</h2>
          <p className="mt-2 text-sm text-white/70">
            A focused timer to structure deep work sessions in short, calm
            intervals.
          </p>
        </Link>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-lg font-semibold text-white">
            Video Suggestion
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Find great videos about any subject.
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Coming soon...
          </p>
        </div>
      </div>
    </section>
  );
}
