## Why

The current home page does not present key portfolio information (career/tech profile, soft skills, and interests) in a clear, portfolio-first layout. A structured scroll-based redesign is needed to improve recruiter readability while keeping the existing universe identity.

## What Changes

- Redesign the home page into a minimalist vertical-scroll portfolio layout with three clear sections:
  - Tech stack resume and expertise
  - Future view and aiming (Node + React projects/studies)
  - Interests and personal curiosities
- Keep the original hero presentation at the top and add a clear scroll action into the portfolio sections below.
- Render sections directly on the page surface (no card/panel background containers).
- Update visual styling to a darker universe theme: black-first background with dark-purple accents, while preserving stars/cosmic atmosphere.
- Add a Journey action button in the tech section and a Cool Tools action button in the future section.
- Keep page interaction simple and content-first (no heavy UI complexity or app-like widgets).

## Capabilities

### New Capabilities
- `home-page-portfolio-sections`: Home page presents portfolio sections (tech stack, future view, interests/curiosity) in a vertical-scroll structure while preserving the top hero.
- `home-page-cosmic-theme-refresh`: Home page adopts a black-focused universe palette while preserving starfield/cosmic background identity.
- `home-page-section-actions`: Home page provides clear section actions to Journey and Cool Tools pages.

### Modified Capabilities
- None.

## Impact

- `src/app/page.tsx` (home page content structure and section composition)
- `src/features/home/*` (small reusable home page components and content composition)
- `src/app/globals.css` and/or layout styles (palette and section theming updates)
- `src/components/layout/GalaxyBackground.tsx` (if needed to adjust darkness and preserve star/universe feel)
- Section-level action links for Journey and Cool Tools navigation
