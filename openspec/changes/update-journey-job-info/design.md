## Context

The Journey page reads role data from `src/features/journey/data.ts`. Several non-current roles have placeholder-like summaries that do not reflect the richer highlights already present in the same entries. The requested update is content-only: improve `summary` text while preserving timeline, company names, stack summaries, and technology lists.

## Goals / Non-Goals

**Goals:**
- Update summaries for Find My Profession, Smarkio, Embraer, and Black Bee Drones to be direct and meaningful.
- Keep all non-summary fields unchanged for those entries.
- Keep the Globant entry unchanged in all fields.
- Preserve current Journey UI behavior and data structure.

**Non-Goals:**
- No UI layout or component behavior changes.
- No edits to role dates, company names, stack summary, technologies, or highlights.
- No new dependencies, data model changes, or API changes.

## Decisions

- **Edit only `summary` fields in one source file (`src/features/journey/data.ts`).**
  - Rationale: The page is already data-driven from this file, so a focused content edit is the smallest safe change.
  - Alternative considered: splitting content into CMS/JSON files; rejected as unnecessary for this scoped update.

- **Derive summaries strictly from user-provided highlights.**
  - Rationale: Ensures the final text matches real responsibilities and outcomes.
  - Alternative considered: rewriting both summaries and highlights for consistency; rejected because highlights were provided as source-of-truth.

- **Leave Globant untouched.**
  - Rationale: User explicitly requested no changes for that entry.
  - Alternative considered: stylistic consistency edits across all entries; rejected to avoid scope drift.

## Risks / Trade-offs

- **[Risk]** Summary text may become too verbose for the accordion preview.  
  **Mitigation:** Keep each summary concise, single-sentence, and outcome-oriented.

- **[Risk]** Accidental edits to protected fields (dates/company/stack/tech).  
  **Mitigation:** Limit patch scope to `summary` lines and review diff before finalizing.

## Migration Plan

1. Update summaries in `src/features/journey/data.ts`.
2. Run UI validation commands (`typecheck`, `test`, `build`) when feasible.
3. Deploy as normal frontend content update.

Rollback: revert the summary line changes in `src/features/journey/data.ts`.

## Open Questions

- None.
