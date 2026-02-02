## Why

The Journey page currently has generic summaries for several past roles, which does not reflect the real scope of work shown in each role's highlights. Updating those summaries now improves portfolio clarity for recruiters without changing core structure or timeline data.

## What Changes

- Update role `summary` text for specific Journey entries using the provided highlights as source content.
- Keep `dateRange`, `company`, `stackSummary`, and `technologies` unchanged.
- Keep the Globant entry unchanged across all fields.
- Preserve existing Journey layout and interaction behavior; this is a content-only update.

## Capabilities

### New Capabilities
- `journey-role-summary-content`: The Journey page presents meaningful, role-specific summaries aligned with each role's highlights.

### Modified Capabilities
- None.

## Impact

- `src/features/journey/data.ts` (update summary content for selected entries only)
- `src/app/journey/page.tsx` (indirectly affected by updated data rendering)
