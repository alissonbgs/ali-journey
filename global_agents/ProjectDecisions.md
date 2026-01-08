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

## Decision: Use Phosphor Icons for artwork-heavy UI
Context:
The portfolio will use many artistic icons and needs a consistent, expressive icon set.
Decision:
Adopt `@phosphor-icons/react` for icon usage across the UI.
Reasoning:
Phosphor provides multiple stylistic weights and a cohesive visual language, making it easier to keep icons expressive without mixing libraries.
Alternatives:
Lucide for a minimal style, or react-icons for broader but inconsistent sets.

## Decision: Journey accordion with minimal client boundary
Context:
The Journey page needs expandable timeline cards while keeping the App Router RSC default intact.
Decision:
Keep the Journey page as a Server Component, place the accordion state/interaction in a small client component under `features/journey`, and pass a serializable data array from the page.
Reasoning:
This isolates interactivity to the smallest surface, preserves RSC benefits, and keeps the data/source-of-truth separate from UI state.
Alternatives:
Make the entire Journey page a client component or implement a CSS-only accordion without state.

## Decision: Framer Motion for Journey accordion details transitions
Context:
We needed delayed fade-in and exit animations for Journey details without managing manual timeouts.
Decision:
Adopt `framer-motion` with `AnimatePresence` + `motion.div` to handle enter/exit timing and keep the card collapse in sync with the exit animation.
Reasoning:
Framer Motion removes custom timer bookkeeping, provides clear enter/exit lifecycles, and keeps the visuals consistent with minimal component changes.
Alternatives:
Continue custom timeout management or use `@headlessui/react` Transition.
