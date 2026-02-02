import Link from "next/link";
import { ArrowDownIcon, FlyingSaucerIcon } from "@phosphor-icons/react/ssr";

type HeroSectionProps = {
  scrollTargetId: string;
};

export default function HeroSection({ scrollTargetId }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="home-hero-section flex min-h-[65vh] flex-col items-center justify-center text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        Hi there, I am
      </p>
      <h1
        className="mt-3 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl"
        id="home-hero-title"
      >
        Alisson Godoy
      </h1>
      <p className="home-copy mt-6 max-w-2xl text-lg">
        Fullstack Software Engineer passionated for creating beautiful and easy
        to use applications end to end.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          className="home-pill-button inline-flex items-center gap-3"
          href="/journey"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center text-white">
            <FlyingSaucerIcon size={20} weight="light" className="ufo-wiggle" />
          </span>
          <span>Know my journey</span>
        </Link>
        <a className="home-scroll-link" href={`#${scrollTargetId}`}>
          <span>Scroll to profile</span>
          <ArrowDownIcon size={16} weight="bold" />
        </a>
      </div>
    </section>
  );
}
