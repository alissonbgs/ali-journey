# Task — Journey Page Expandable Timeline Cards (RSC + Tailwind)

## Agents to use
- **Frontend Engineer Agent** (`apps/web/AGENTS.md`): implementation of UI and behavior
- **Tech Lead Reviewer & Mentor** (`AGENTS.tech-lead-reviewer.md`): validate tech design decisions, RSC/client boundaries, SOLID, and update logs

---

## Context
We are building the **Journey** page of the portfolio. This page will list all my jobs and projects.
For now, we will hard-code 3 jobs, but the design must be ready to later move data into static/static content files.

---

## Goal
Create a **Journey page section** with **3 expandable cards/columns**:
- Cards alternate alignment left/right (1st left, 2nd right, 3rd left…)
- Only one card can be expanded at a time (expanding one collapses others)
- When collapsed, show a summary
- When expanded, show detailed information (technologies, projects, achievements)
- Visual style: **no side borders**, so it feels embedded in the page layout

---

## Requirements

### UI / Layout
1) Implement on the **Journey page** (create route if missing).
2) Render **3 job entries** as **cards/columns** (vertical flow is acceptable).
3) Cards alternate text alignment and layout position:
   - Job 1 aligned left
   - Job 2 aligned right
   - Job 3 aligned left
4) Cards must be **expandable** (accordion-like behavior).
5) Expanding one card **collapses all others**.
6) Cards must **not have side borders** (no left/right border visual).
7) Page must be responsive:
   - On mobile: single-column layout
   - Preserve visual alternation via spacing and text alignment

---

### Collapsed state (summary)
Each collapsed card must show (hard-coded for now):
- **Position**
- **Company**
- **Date range**
- **Short description**
- **Main tech stack summary**  
  (example: “TypeScript, Node, Kafka, Postgres”)

---

### Expanded state (details)
When expanded, the card must show additional info:
- **Technologies** (detailed list)
- **Projects** (bullet list)
- **Achievements / Impact** (bullet list; metrics can be placeholders)

---

### Interaction
- Clicking the card header toggles expansion
- Clicking another card expands it and collapses the previously open card
- Provide a clear affordance (e.g., chevron icon rotation)
- Keep interaction minimal and clean

---

## Data (hard-coded for now)
Create an in-file array with **3 jobs**.

Example structure (adjust as needed):

- Job 1:
  - position: "Backend Engineer"
  - company: "Company A"
  - date: "2023 — Present"
  - summary: "Building high-throughput event pipelines and internal platforms."
  - stackSummary: "TypeScript, Node, Kafka, Postgres"
  - technologies: [...]
  - projects: [...]
  - achievements: [...]

Repeat for Job 2 and Job 3.

---

## Technical constraints (MANDATORY)
- Next.js as main framework
- **React Server Components (RSC) by default**
- Client Components must be minimal:
  - Accordion/expand interaction only
- Tailwind for styling
- TypeScript strict:
  - No `any`
  - Prefer `unknown` + narrowing
- SOLID principles adapted to UI:
  - Data/types separated from UI
  - State logic isolated
  - Presentational components kept simple

---

## Suggested implementation approach (guidance, not strict)
- `JourneyPage` as a **Server Component**
- Small **Client Component**: `JourneyAccordion` managing `openId`
- Subcomponents:
  - `JourneyCardHeader` (summary + click target)
  - `JourneyCardDetails` (expanded content)

---

## Acceptance Criteria
- [ ] Journey page renders 3 job cards
- [ ] Cards alternate alignment left/right/left
- [ ] Only one card expanded at a time
- [ ] Collapsed state shows summary info correctly
- [ ] Expanded state shows technologies, projects, achievements
- [ ] No side borders on cards
- [ ] Responsive layout works on mobile and desktop
- [ ] Minimal client boundary respected
- [ ] Logs updated:
  - `ProjectDecisions.md` (accordion + RSC boundary decision)
  - `ProjectLearnings.md` (accordion + RSC pattern learnings)

---

## Files expected
- `apps/web/app/journey/page.tsx` (or equivalent route)
- `apps/web/features/journey/*` or `apps/web/components/*`
- Updates to:
  - `ProjectDecisions.md`
  - `ProjectLearnings.md`

---

## Verification
- `npm run typecheck`
- `npm run test` (if tests exist; at least a basic render/interaction test if feasible)
- `npm run build`
