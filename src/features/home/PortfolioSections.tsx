import ChipList from "./ChipList";
import SectionActionLink from "./SectionActionLink";
import SectionHeading from "./SectionHeading";
import TextList from "./TextList";
import {
  futureFocus,
  interestsAndCuriosities,
  techExpertise,
  techResumeHighlights,
} from "./content";

export default function PortfolioSections() {
  return (
    <div className="home-sections" id="home-sections">
      <section
        aria-labelledby="home-tech-title"
        className="home-vertical-section"
        id="home-tech-info"
      >
        <SectionHeading
          headingId="home-tech-title"
          kicker="Tech Stack Resume"
          title="Core expertise across backend, frontend, and product delivery."
          description="A practical stack built through real production software, with focus on reliable architecture and user-centered execution."
        />
        <TextList items={techResumeHighlights} />
        <ChipList items={techExpertise} />
        <SectionActionLink href="/journey" label="Open Journey" />
      </section>

      <section
        aria-labelledby="home-future-title"
        className="home-vertical-section"
        id="home-future-view"
      >
        <SectionHeading
          headingId="home-future-title"
          kicker="Future View"
          title="Node + React growth path for future projects and studies."
          description="I am investing in advanced patterns, performance, and product-oriented experiments to push my next level."
        />
        <TextList items={futureFocus} />
        <SectionActionLink href="/tools" label="Open Cool Tools" />
      </section>

      <section
        aria-labelledby="home-interests-title"
        className="home-vertical-section border-b-0"
        id="home-interests"
      >
        <SectionHeading
          headingId="home-interests-title"
          kicker="Interests"
          title="Interests and personal curiosities."
        />
        <TextList items={interestsAndCuriosities} />
      </section>
    </div>
  );
}
