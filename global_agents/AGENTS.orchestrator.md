# AGENTS — Repo-wide Rules (Orchestrator)

## Mission
Build a modern portfolio project with Next.js App Router and React Server Components (RSC) as default.
The project must scale to complex UI (animations, pagination, filtering) and be future-ready for a BFF.

## Tech Stack (authoritative)
- Language: TypeScript (mandatory)
- Frontend: Next.js (main framework) + RSC default + Tailwind
- Tests: Jest (and existing React testing tooling in repo)
- CI/CD: GitHub Actions
- Deploy: Start simple (Vercel recommended); future AWS/K8s
- Future: BFF (Node/Fastify) will be added later (not now)

## Frontend Global Standard (MANDATORY)
- Next.js is the only frontend framework.
- RSC is default.
- Client Components only when required (state, effects, browser APIs, event handlers).
- Keep Client boundaries minimal. Never leak server-only data to the client.

## SOLID (MANDATORY)
Enforce SOLID in architecture and module boundaries.
- Controllers/services/repositories will be introduced when BFF exists, but frontend must still follow SRP, DIP, composition-first design.

## Task System (MANDATORY) 

To avoid stale guidance and context confusion, tasks must follow this workflow:

### 1) Tasks live in `/tasks`
- Each task must have a Markdown ticket:
  - `/tasks/NNN-short-title.md`
  - or a task pack folder `/tasks/NNN-short-title/` with `task.md` as entrypoint.

### 2) Tasks are time-bounded instructions, not permanent architecture
- Tickets describe *what to do now*.
- Durable truth must be recorded in:
  - `ProjectDecisions.md` (architecture/design decisions)
  - `ProjectLearnings.md` (general learnings and patterns)
  - feature documentation `apps/web/src/features/<feature>/FEATURE.md` when applicable

### 3) Required task lifecycle
- OPEN → IN_PROGRESS → DONE → ARCHIVED
- When a task is DONE:
  - ensure decisions/learnings are logged
  - optionally move it to `/tasks/_archive/` or mark State: ARCHIVED
  - do NOT treat old tasks as authoritative guidance

### 4) How agents must consume task context
For any implementation:
- Read the task ticket first
- Then read relevant `FEATURE.md` (if exists)
- Then follow local `AGENTS.md` rules for the touched directory
- Update `ProjectDecisions.md` and/or `ProjectLearnings.md` when applicable


## Mandatory knowledge logging (MANDATORY)
All agents must update logs when applicable:
- ProjectDecisions.md: architectural/design decisions (context, decision, reasoning, alternatives)
- ProjectLearnings.md: coding learnings, patterns, mistakes corrected, best practices

If you change architecture, folder structure, caching approach, data-fetching strategy, or component boundaries:
- MUST record in ProjectDecisions.md.

If you teach or discover something useful during implementation/review:
- MUST record in ProjectLearnings.md.

## Non-negotiables
- Do not invent requirements.
- Prefer small, safe diffs.
- TypeScript strict, no `any` (prefer `unknown` + narrowing).
- Every change includes tests or a written justification.

## Definition of Done
- Build passes
- Tests pass
- Typecheck passes
- CI passes
- Logs updated (Decisions/Learnings)
