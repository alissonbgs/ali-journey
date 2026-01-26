---
name: repo-orchestrator
description: Repo-wide rules, task workflow, and quality gates for this portfolio project. Use at the start of any task or when making cross-cutting decisions.
---

# Repo Orchestrator

Build a modern portfolio project with Next.js App Router and React Server Components (RSC) by default. Scale to complex UI with a single-package layout.

## Tech stack (authoritative)
- Use TypeScript.
- Use Next.js with RSC default and Tailwind.
- Use Jest for tests (existing tooling).
- Use GitHub Actions for CI.
- Deploy with Vercel now; plan for AWS/K8s later.

## Frontend global standard
- Use Next.js as the only frontend framework.
- Default to Server Components.
- Use Client Components only when required (state, effects, browser APIs, event handlers).
- Keep client boundaries minimal; never leak server-only data to the client.

## SOLID (mandatory)
- Enforce SOLID in architecture and module boundaries.
- Keep frontend SRP/DIP and composition-first design.

## Task system (mandatory)
### Tasks live in `/tasks`
- Create a Markdown ticket:
  - `/tasks/NNN-short-title.md`
  - or a task pack folder `/tasks/NNN-short-title/` with `task.md` as entrypoint.

### Tasks are time-bounded instructions, not permanent architecture
- Treat tickets as "what to do now".
- Record durable truth in:
  - `ProjectDecisions.md` for architecture/design decisions.
  - `ProjectLearnings.md` for general learnings and patterns.
  - `src/features/<feature>/FEATURE.md` when applicable.

### Required task lifecycle
- Use states: OPEN -> IN_PROGRESS -> DONE -> ARCHIVED.
- When a task is DONE:
  - Log decisions and learnings.
  - Optionally move it to `/tasks/_archive/` or mark State: ARCHIVED.
  - Do not treat old tasks as authoritative guidance.

### How to consume task context
- Read the task ticket first.
- Read relevant `FEATURE.md` (if it exists).
- Follow the relevant skill in `skills/` for the touched area:
  - Frontend: `skills/frontend-engineer/SKILL.md`
  - Testing: `skills/testing-specialist/SKILL.md`
  - Infra/deploy: `skills/deploy-devops-lite/SKILL.md`
  - Tech lead review: `skills/tech-lead-reviewer/SKILL.md`
- Update `ProjectDecisions.md` and/or `ProjectLearnings.md` when applicable.

## Mandatory knowledge logging
- Record architectural/design decisions in `ProjectDecisions.md` (context, decision, reasoning, alternatives).
- Record useful lessons and patterns in `ProjectLearnings.md`.
- If you change architecture, folder structure, caching, data-fetching, or component boundaries, log it in `ProjectDecisions.md`.
- If you teach or discover something useful during implementation/review, log it in `ProjectLearnings.md`.

## Non-negotiables
- Do not invent requirements.
- Prefer small, safe diffs.
- Enforce TypeScript strictness; avoid `any` (prefer `unknown` with narrowing).
- Include tests with each change or write a justification.

## Definition of done
- Build passes.
- Tests pass.
- Typecheck passes.
- CI passes.
- Logs updated.

