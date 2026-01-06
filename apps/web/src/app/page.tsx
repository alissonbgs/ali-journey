import { FlyingSaucerIcon } from "@phosphor-icons/react/ssr";

export default function Home() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        Hi there, I am
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Alisson Godoy
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-white/70">
        Fullstack Software Engineer passionated for creating beautiful and easy
        to use applications end to end.
      </p>
      <a
        href="/journey"
        className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/50 hover:bg-white/10"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center text-white">
          <FlyingSaucerIcon size={20} weight="light" className="ufo-wiggle" />
        </span>
        <span>Know my journey</span>
      </a>
    </section>
  );
}
