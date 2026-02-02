## Context

The current home page started as a short hero-only section and needed to evolve into a portfolio narrative. The refined request keeps the old hero at the top, adds a clear scroll path into profile sections, requires sections to render directly on the page (no card backgrounds), and keeps the universe/star identity in a darker black-first palette.

The required section lineup is now:
- Tech stack resume and expertise (with Journey button)
- Future view and aiming for Node + React projects/studies (with Cool Tools button)
- Interests and personal curiosities

## Goals / Non-Goals

**Goals:**
- Keep the old hero style at the top of the home page.
- Provide a clear scroll jump from hero to portfolio content below.
- Deliver a minimalist vertical-scroll portfolio layout with sections rendered directly on the page (no card containers).
- Represent core content as the three requested sections with clear vertical flow.
- Preserve the universe/star concept while making the page visually darker (black dominant, dark purple accent).
- Remove hero-level Journey CTA and move page actions into section-level controls.

**Non-Goals:**
- No backend/API/database changes.
- No changes to Journey page behavior/data in this change.
- No heavy animation frameworks or complex interactive widgets.

## Decisions

- **Compose the home page with small reusable feature components under `src/features/home/` and keep `src/app/page.tsx` thin.**
  - Rationale: This follows the project convention for scalable feature ownership and avoids monolithic page files.
  - Alternative considered: place everything in `src/app/page.tsx`; rejected to avoid large, hard-to-maintain files.

- **Keep the original hero style as the first viewport section and add an explicit scroll cue to profile sections.**
  - Rationale: Preserves existing top-of-page identity while adding the requested vertical discovery flow.
  - Alternative considered: remove the old hero and start immediately with profile sections; rejected by updated requirement.

- **Use three requested portfolio sections after the hero: Tech Stack, Future View, and Interests/Curiosities.**
  - Rationale: Matches current content direction and keeps the page focused.
  - Alternative considered: keep the extra Connect section; rejected to maintain a cleaner minimal flow.

- **Move actions to section-level buttons (`/journey`, `/tools`).**
  - Rationale: Keeps navigation contextual to each section and removes hero clutter.
  - Alternative considered: keep hero Journey button and add more hero actions; rejected as less minimalist.

- **Darken the cosmic background by tuning existing `GalaxyBackground` gradients/clouds toward near-black and restrained purple highlights.**
  - Rationale: Reuses existing starfield system and preserves brand atmosphere with minimal risk.
  - Alternative considered: replacing canvas background with static image/gradient; rejected to keep current animated universe identity.

- **Use minimal section styling without card/surface backgrounds.**
  - Rationale: Matches the requested clean portfolio look where content sits directly on the page.
  - Alternative considered: panel/card sections with background fills; rejected by updated requirement.

- **Define reusable color tokens in CSS for black-first palette and subtle accents.**
  - Rationale: Keeps styling consistent while avoiding heavy visual containers.
  - Alternative considered: ad-hoc utility colors only; rejected due to maintainability and visual drift risk.

## Risks / Trade-offs

- **[Risk]** Over-darkening may reduce readability or flatten visual hierarchy.  
  **Mitigation:** keep strong text contrast, spacing rhythm, and subtle divider/border cues.

- **[Risk]** Removing social profile links may reduce direct outbound contact paths.  
  **Mitigation:** keep clear Journey and Cool Tools navigation and add social links later only if needed.

## Migration Plan

1. Create/reuse small components under `src/features/home/` and keep `src/app/page.tsx` as composition only.
2. Keep old hero at the top and add a scroll link to portfolio sections.
3. Update global/page styles for black-first palette and no-card section styling, with tighter spacing between sections.
4. Tune `src/components/layout/GalaxyBackground.tsx` colors to darker black with subtle purple accents.
5. Validate responsive behavior on desktop/mobile and ensure links open correctly.
6. Run `npm run typecheck:ui`, `npm run test:ui`, `npm run build:ui`.

Rollback: restore previous home page layout/styles and prior `GalaxyBackground` color values.

## Open Questions

- None. Social URLs and section direction are now defined.
