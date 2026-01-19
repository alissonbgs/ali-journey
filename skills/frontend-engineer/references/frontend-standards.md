# Frontend Standards

## Architecture strategy
- Organize features under `features/`.
- Keep shared UI primitives under `components/ui/`.
- Keep shared layout components under `components/layout/`.
- Centralize API calls under `lib/api/` for future BFF readiness.
- Put server-only helpers in `server/` and never import them from Client Components.

## Tailwind
- Use utility-first, readable classnames.
- Extract repeated patterns into components.

## TypeScript
- Avoid `any`.
- Use unions and `Pick` for UI states.
- Keep stable contracts for components and data adapters.

## Required logging
- If you introduce a new pattern (pagination strategy, animation library, data fetching approach), update `ProjectDecisions.md` with context, decision, reasoning, and alternatives.
- Add learnings to `ProjectLearnings.md`.
