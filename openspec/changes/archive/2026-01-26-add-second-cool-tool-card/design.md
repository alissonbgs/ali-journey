## Context

The Cool Tools page (`web/src/app/tools/page.tsx`) renders a grid of tool cards using Next.js and Tailwind. It currently contains a single Link card for the Pomodoro tool.

## Goals / Non-Goals

**Goals:**
- Add a second card for the Video Suggestion tool on the Cool Tools page.
- Match the existing card styling and layout.
- Link the new card to `/video-suggestion`.

**Non-Goals:**
- Implementing the `/video-suggestion` page or any backend logic.
- Refactoring the tools page into a shared data model or component.

## Decisions

- **Inline card markup in `tools/page.tsx`**: Keep the current simple structure and add a second card adjacent to the existing one to minimize scope.
- **Use a `Link` component**: Maintain consistent behavior and styling with the existing Pomodoro card while satisfying the navigation requirement.
- **Copy existing visual treatment**: Reuse the same Tailwind classes to preserve UI consistency and avoid design churn.

## Risks / Trade-offs

- **Risk: `/video-suggestion` route not implemented** → Mitigation: Create a stub page in a follow-up task or adjust the card to a disabled state if the route will not be ready soon.
- **Trade-off: Hardcoded cards** → Acceptable for two cards; revisit if the list grows and needs data-driven rendering.

## Migration Plan

- No data migrations required.
- Deploy as a UI-only change.

## Open Questions

- Should a placeholder `/video-suggestion` page be created now to avoid 404s?
- Do we want to add an icon or visual accent for the Video Suggestion card?
