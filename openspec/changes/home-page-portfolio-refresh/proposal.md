## Why

The current home page does not present key portfolio information (career/tech profile, soft skills, and interests) in a clear, portfolio-first layout. A structured scroll-based redesign is needed to improve recruiter readability while keeping the existing universe identity.

## What Changes

- Redesign the home page into a minimalist vertical-scroll portfolio layout with three clear sections:
  - Tech info (career overview + technologies/expertise)
  - Soft skills (including communication and teaching)
  - Interests (game development, music production, sports)
- Keep the original hero presentation at the top and add a clear scroll action into the portfolio sections below.
- Render sections directly on the page surface (no card/panel background containers).
- Add a lightweight final Connect section for social profile actions.
- Update visual styling to a darker universe theme: black-first background with dark-purple accents, while preserving stars/cosmic atmosphere.
- Add GitHub and LinkedIn profile links in a high-visibility placement that fits the layout (likely hero/header area and/or final section CTA).
- Keep page interaction simple and content-first (no heavy UI complexity or app-like widgets).

## Capabilities

### New Capabilities
- `home-page-portfolio-sections`: Home page presents portfolio sections (tech info, soft skills, interests, and connect) in a vertical-scroll structure while preserving the top hero.
- `home-page-cosmic-theme-refresh`: Home page adopts a black-focused universe palette while preserving starfield/cosmic background identity.
- `home-page-social-links`: Home page surfaces GitHub and LinkedIn links in clear, intentional placements.

### Modified Capabilities
- None.

## Impact

- `src/app/page.tsx` (home page content structure and section composition)
- `src/features/home/*` (small reusable home page components and content composition)
- `src/app/globals.css` and/or layout styles (palette and section theming updates)
- `src/components/layout/GalaxyBackground.tsx` (if needed to adjust darkness and preserve star/universe feel)
- Potential shared layout wrappers/components if social links are placed in global chrome
