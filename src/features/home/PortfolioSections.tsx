import ChipList from "./ChipList";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";
import TextList from "./TextList";
import { interests, socialLinks, softSkills, techExpertise } from "./content";

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
          kicker="Tech Info"
          title="Career and technologies I build with."
          description="I design and deliver robust software from API architecture to polished frontend experience, balancing speed, quality, and long-term maintainability."
        />
        <ChipList items={techExpertise} />
      </section>

      <section
        aria-labelledby="home-soft-skills-title"
        className="home-vertical-section"
        id="home-soft-skills"
      >
        <SectionHeading
          headingId="home-soft-skills-title"
          kicker="Soft Skills"
          title="Communication and teaching in real project contexts."
        />
        <TextList items={softSkills} />
      </section>

      <section
        aria-labelledby="home-interests-title"
        className="home-vertical-section"
        id="home-interests"
      >
        <SectionHeading
          headingId="home-interests-title"
          kicker="Interests"
          title="Creative areas that keep my engineering mindset fresh."
        />
        <TextList items={interests} />
      </section>

      <section
        aria-labelledby="home-connect-title"
        className="home-vertical-section border-b-0"
        id="home-connect"
      >
        <SectionHeading
          headingId="home-connect-title"
          kicker="Connect"
          title="Let’s keep in touch."
          description="Find my latest work, projects, and professional updates on these platforms."
        />
        <SocialLinks links={socialLinks} />
      </section>
    </div>
  );
}
