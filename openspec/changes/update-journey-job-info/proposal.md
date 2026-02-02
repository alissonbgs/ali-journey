## Why

The Journey page currently has generic summaries and placeholder highlights for several past roles, which does not reflect the real scope of work. Updating this content now improves portfolio clarity for recruiters without changing core structure or timeline data.

## What Changes

- Update role `summary` and `highlights` content for specific Journey entries using the provided role notes as source content.
- Keep `dateRange`, `company`, `stackSummary`, and `technologies` unchanged.
- Keep the Globant entry unchanged across all fields.
- Preserve existing Journey layout and interaction behavior; this is a content-only update.

## Capabilities

### New Capabilities
- `journey-role-summary-content`: The Journey page presents meaningful, role-specific summaries and highlights aligned with each role's responsibilities.

### Modified Capabilities
- None.

## Impact

- `src/features/journey/data.ts` (update summary and highlights content for selected entries)
- `src/app/journey/page.tsx` (indirectly affected by updated data rendering)
