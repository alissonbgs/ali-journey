# Task <NNN> — <Title>

## Status
- State: OPEN | IN_PROGRESS | DONE | ARCHIVED
- Owner: <you/agent>
- Created: <YYYY-MM-DD>
- Last updated: <YYYY-MM-DD>

## Context
Why are we doing this? What problem does it solve?

## Goal
What must be true when this task is complete? (1–3 bullet points)

## Scope
### In
- ...

### Out
- ...

## Acceptance Criteria (Definition of Done for this task)
- [ ] AC1 ...
- [ ] AC2 ...
- [ ] AC3 ...

## Constraints (must follow)
- Next.js is the main frontend framework
- RSC is default; minimize Client Components
- Tailwind for styling
- TypeScript strict (no `any`; prefer `unknown` + narrowing)
- SOLID is mandatory
- Update logs when applicable:
  - ProjectDecisions.md (design/architecture decisions)
  - ProjectLearnings.md (learnings/patterns)

## Implementation Plan (short)
1. ...
2. ...
3. ...

## Notes / Edge Cases
- ...

## Files (expected)
- `apps/web/...`
- `...`

## Verification
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Logging checklist
- [ ] If I made/changed an architectural or design decision: updated `ProjectDecisions.md`
- [ ] If I learned something or introduced a new pattern: updated `ProjectLearnings.md`
