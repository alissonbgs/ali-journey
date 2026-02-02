## 1. Refine home page section flow

- [x] 1.1 Keep the old hero at the top and preserve a clear scroll cue into the profile sections.
- [x] 1.2 Remove the hero "Know my journey" button.
- [x] 1.3 Compose home page using small reusable components under `src/features/home/` with `src/app/page.tsx` as thin composition.
- [x] 1.4 Update section lineup to: Tech Stack Resume and Expertise, Future View and Aiming, Interests and Personal Curiosities.
- [x] 1.5 Add section-level actions: Journey button in tech section and Cool Tools button in future section.

## 2. Styling and spacing adjustments

- [x] 2.1 Apply black-first theme tokens in `src/app/globals.css`.
- [x] 2.2 Ensure sections render directly on page surface without card/panel backgrounds.
- [x] 2.3 Reduce spacing between sections for a tighter minimalist flow.
- [x] 2.4 Keep text legibility and professional visual hierarchy across breakpoints.
- [x] 2.5 Darken `src/components/layout/GalaxyBackground.tsx` while preserving stars/cosmic identity.

## 3. Verification

- [ ] 3.1 Manually verify home section order and scroll behavior.
- [ ] 3.2 Manually verify Journey and Cool Tools section buttons navigate to `/journey` and `/tools`.
- [x] 3.3 Run `npm run typecheck:ui`.
- [x] 3.4 Run `npm run test:ui`.
- [x] 3.5 Run `npm run build:ui`.
