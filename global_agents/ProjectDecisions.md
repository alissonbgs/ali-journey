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

## Decision: Top toolbar navigation and Apps hub
Context:
Navigation moved from a left sidebar to a top toolbar, and small tools should be grouped under a dedicated Apps page.
Decision:
Replace the sidebar layout with a top toolbar (left brand, right page links) and add an Apps route with cards linking to individual tools like Pomodoro.
Reasoning:
This matches the new layout direction, reduces persistent UI width, and creates a clear entry point for multiple mini-apps.
Alternatives:
Keep the sidebar, or expose each tool directly in the top-level navigation.
