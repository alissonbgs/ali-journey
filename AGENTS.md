# AGENTS - Repo Guide (OpenSpec)

## OpenSpec workflow
- Use `openspec/` for specs and change work.
- Specs live in `openspec/specs/`.
- Change artifacts live in `openspec/changes/<change-name>/`.
- Create a change with `npx openspec new change <change-name>` before coding.

## App conventions
- Next.js App Router lives in `web/` (RSC-first).
- Keep client components minimal and interaction-focused.
- Tailwind for styling; TypeScript strict (no `any`).
- `apps/bff/` is reserved for a future backend-for-frontend.

## Quality and logging
- UI scripts: `npm run typecheck:ui`, `npm run test:ui`, `npm run build:ui`.
- Log architecture/workflow decisions in `agents_notes/ProjectDecisions.md`.
- Log lessons/patterns in `agents_notes/ProjectLearnings.md`.
- CI rules live in `.github/AGENTS.md`.
