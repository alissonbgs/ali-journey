import HeroSection from "./HeroSection";
import PortfolioSections from "./PortfolioSections";

export default function HomePageContent() {
  return (
    <div className="home-page mx-auto max-w-5xl">
      <HeroSection scrollTargetId="home-sections" />
      <PortfolioSections />
    </div>
  );
}
