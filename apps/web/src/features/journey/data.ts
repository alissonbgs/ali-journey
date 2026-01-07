import type { JourneyEntry } from "./types";

export const journeyEntries: JourneyEntry[] = [
  {
    id: "orbit-labs",
    position: "Backend Engineer",
    company: "Orbit Labs",
    dateRange: "2023 — Present",
    summary: "Building high-throughput event pipelines and internal platforms.",
    stackSummary: "TypeScript, Node, Kafka, Postgres",
    technologies: [
      "TypeScript",
      "Node.js",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    projects: [
      "Event ingestion service for real-time analytics.",
      "Internal tooling for release orchestration and metrics.",
    ],
    achievements: [
      "Reduced processing latency by ~40% through batching improvements.",
      "Improved reliability with automated backfill and retry logic.",
    ],
  },
  {
    id: "nova-studio",
    position: "Fullstack Engineer",
    company: "Nova Studio",
    dateRange: "2021 — 2023",
    summary: "Shipped customer dashboards and design systems for B2B SaaS.",
    stackSummary: "React, Next.js, Tailwind, GraphQL",
    technologies: [
      "React",
      "Next.js",
      "Tailwind",
      "GraphQL",
      "Node.js",
      "Vercel",
    ],
    projects: [
      "Modular dashboard builder for enterprise clients.",
      "Design system migration with tokenized theming.",
    ],
    achievements: [
      "Cut feature delivery time by ~30% with shared UI primitives.",
      "Increased weekly active usage by ~20% after UX refresh.",
    ],
  },
  {
    id: "atlas-systems",
    position: "Software Engineer",
    company: "Atlas Systems",
    dateRange: "2019 — 2021",
    summary: "Built APIs and tooling that improved developer velocity.",
    stackSummary: "Node, Express, Redis, AWS",
    technologies: [
      "Node.js",
      "Express",
      "Redis",
      "AWS Lambda",
      "DynamoDB",
      "S3",
    ],
    projects: [
      "Internal API gateway with auditing and rate limiting.",
      "Developer CLI for environment provisioning.",
    ],
    achievements: [
      "Reduced onboarding time from days to hours with automation.",
      "Stabilized deployments by improving rollback tooling.",
    ],
  },
];
