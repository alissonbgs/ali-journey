# cool-tools-gallery Specification

## Purpose
Define the Cool Tools gallery contents and link behavior for featured apps.

## Tech Stack
- Next.js App Router (RSC-first)
- TypeScript (strict)
- Tailwind CSS
- Jest + React Testing Library (when tests are added)

## Skills Needed
- None beyond standard Next.js + Tailwind UI work.
## Requirements
### Requirement: Cool Tools page shows ADHDoro and Video Suggestor cards
The Cool Tools page SHALL render at least two tool cards in the grid, including ADHDoro and Video Suggestor.

#### Scenario: Tools grid includes ADHDoro card with external link
- **WHEN** a user visits `/tools`
- **THEN** the grid displays a card titled "ADHDoro" that links to `https://adhdoro.vercel.app/`.

#### Scenario: Tools grid includes Video Suggestor card
- **WHEN** a user visits `/tools`
- **THEN** the grid displays a card titled "Video Suggestor" with the description "Find great videos about any subject."

### Requirement: Pomodoro route removed
The Pomodoro page SHALL be removed from the app.

#### Scenario: Pomodoro route no longer exists
- **WHEN** a user navigates to `/pomodoro`
- **THEN** the route is not found (404).

### Requirement: Video Suggestor card is non-navigable
The Video Suggestor card SHALL not navigate when clicked until an external link is available.

#### Scenario: Clicking Video Suggestion card does nothing
- **WHEN** a user clicks the "Video Suggestor" card
- **THEN** no navigation occurs.
