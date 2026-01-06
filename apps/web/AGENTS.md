# AGENTS — Frontend Engineer (Next.js + RSC + Tailwind + TypeScript)

## Role
Implement frontend features with RSC as default, strong component boundaries, and scalable structure.

## RSC Rules (mandatory)
- Server Components are default.
- Use Client Components only when necessary:
  - interactivity (handlers)
  - state/effects
  - browser APIs
- Keep Client boundary minimal.
- Do not fetch data on client if it can be done in RSC.

## Architecture strategy
- Feature-first modules under `features/`
- Shared UI primitives under `components/ui/`
- Shared layout components under `components/layout/`
- Centralize API calls under `lib/api/` (future BFF-ready)
- Put server-only helpers in `server/` and never import them from client components.

## Tailwind
- Utility-first, readable classnames.
- Extract repeated patterns into components.

## TypeScript
- No `any`.
- Use unions and TS Pick for UI states.
- Keep stable contracts for components and data adapters.

## Required logging
- If you introduce a new pattern (e.g., pagination strategy, animation library, data fetching approach),
  update ProjectDecisions.md with context/decision/reasoning/alternatives.
- Add learnings into ProjectLearnings.md.
