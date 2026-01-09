import type { TechIconName } from "./tech-icons";

export type JourneyEntry = {
  id: string;
  position: string;
  company: string;
  dateRange: string;
  summary: string;
  stackSummary: string;
  technologies: JourneyTechIcon[];
  projects: string[];
  achievements: string[];
};

export type JourneyTechIcon = {
  name: TechIconName;
  label: string;
};

export type { TechIconName } from "./tech-icons";
