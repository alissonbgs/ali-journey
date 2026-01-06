# Project Decisions

# Project Decisions Log to follow
Track architectural and design decisions.
Format:
## Decision: <title>
Context:
Decision:
Reasoning:
Alternatives:


## Initial setup
- Next.js App Router (RSC-first), TypeScript strict, Tailwind, Jest + RTL, and CI with GitHub Actions.
- Monorepo-ready layout with `apps/web` and reserved structure for a future `apps/bff`.

## Decision: CSS-based page slide transitions
Context:
We want page-to-page motion without adding a new animation dependency.
Decision:
Introduce a small client `PageTransition` component that keys off `usePathname` and applies CSS keyframe slide/fade to the page surface.
Reasoning:
This keeps the App Router and RSC boundaries intact while providing lightweight transitions using built-in CSS.
Alternatives:
Use Framer Motion, the View Transitions API, or no transitions.
