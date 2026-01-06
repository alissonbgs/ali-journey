import Link from "next/link";

export default function AppsPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Apps
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Tiny tools
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
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
      </div>
    </section>
  );
}
