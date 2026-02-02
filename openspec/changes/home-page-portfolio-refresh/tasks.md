## 1. Build the new home page section structure

- [x] 1.1 Keep the old hero at the top and provide a scroll cue to the sectioned portfolio content below.
- [x] 1.2 Refactor home page implementation into small reusable components under `src/features/home/`, keeping `src/app/page.tsx` as a thin composition layer.
- [x] 1.3 Compose semantic sections for Tech, Soft Skills, Interests, and final Connect.
- [x] 1.4 Populate Tech, Soft Skills, and Interests content with clear headings and concise supporting copy.
- [x] 1.5 Add GitHub and LinkedIn actions in the Connect section using Phosphor icons plus text labels.

## 2. Apply black-first cosmic theme refresh

- [x] 2.1 Add/update reusable color tokens and minimalist section styles in `src/app/globals.css` (or equivalent) for black-dominant styling with dark-purple accents.
- [x] 2.2 Ensure portfolio sections render directly on the page without card background containers.
- [x] 2.3 Update `src/components/layout/GalaxyBackground.tsx` gradient/cloud color values to darken the scene while preserving stars and cosmic atmosphere.
- [x] 2.4 Ensure section contrast/readability remains strong across desktop and mobile breakpoints.

## 3. Accessibility and link behavior

- [x] 3.1 Ensure GitHub and LinkedIn links use the exact URLs: `https://github.com/alissonbgs` and `https://www.linkedin.com/in/alissonsabino`.
- [x] 3.2 Provide accessible names (`aria-label`) for social links and keep visible text labels beside icons.

## 4. Verification

- [x] 4.1 Manually verify vertical scroll flow and section order on home page (`/`).
- [x] 4.2 Manually verify social links open the expected profiles.
- [x] 4.3 Run `npm run typecheck:ui`.
- [x] 4.4 Run `npm run test:ui`.
- [x] 4.5 Run `npm run build:ui`.
