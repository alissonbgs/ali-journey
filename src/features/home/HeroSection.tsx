import { ArrowDownIcon } from "@phosphor-icons/react/ssr";

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
      <a className="home-scroll-link mt-8" href={`#${scrollTargetId}`}>
        <span>Scroll to profile</span>
        <ArrowDownIcon size={16} weight="bold" />
      </a>
    </section>
  );
}
