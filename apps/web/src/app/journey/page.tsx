import JourneyAccordion from "@/features/journey/JourneyAccordion";
import { journeyEntries } from "@/features/journey/data";

export default function JourneyPage() {
  return (
    <section className="space-y-10">
      <header className="space-y-3 flex flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          This is my
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Journey
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
          A timeline of milestones, projects, and lessons learned along the way.
        </p>
      </header>

      <JourneyAccordion entries={journeyEntries} />
    </section>
  );
}
