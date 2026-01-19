# Testing Guide

## Scope (now vs future)
### Now (frontend-only portfolio)
- Write unit and integration tests for UI and feature modules.
- Add minimal smoke coverage for navigation and critical pages.
- Do not add E2E unless explicitly requested.

### Future (BFF added)
- Add API/service unit tests.
- Add integration tests for repository boundaries (with DB).
- Add E2E tests that validate full flows (web + BFF).

## Priorities (what to test first)
1) Critical pages render and basic navigation works.
2) Feature behavior (filters, pagination, sorting, search, animations where testable).
3) Error/empty/loading states exist and are tested for major screens.
4) Regression tests for fixed bugs.
5) Contract tests for shared boundaries (when BFF exists).

## Test types and when to use
### Unit tests (fastest, most isolated)
Use for:
- Pure functions and utilities (`lib/utils`).
- Formatting and mapping functions.
- Pagination, filtering, sorting logic (logic-only).
- Reducers/state machines (if used).
- Small adapters (mapping CMS/content to UI props).

Guidelines:
- Avoid DOM when not required.
- Avoid network.
- Use clear Arrange/Act/Assert.
- Cover edge cases heavily.

### Integration tests (most valuable for UI)
Use for:
- Components interacting together (feature module level).
- Pages rendering key content.
- User flows: searching, filtering, pagination.
- Conditional rendering: empty/error/loading states.

In a Next.js + RSC context:
- Test composed UI behavior.
- Prefer testing Client Component interactions where needed.
- For Server Components, use integration rendering and verify presence of content.

Guidelines:
- Test behavior as the user sees it.
- Avoid testing internal state or specific hooks directly.
- Avoid brittle CSS class assertions (Tailwind changes easily).
- Prefer role/text/label queries.

### E2E tests (future, when BFF is ready)
Use for:
- Happy path flows that must never break.
- Critical conversions (contact, hire me, request info).
- Web + BFF integration (auth, persistence, pagination from API).

Rules:
- Keep the E2E suite small (smoke tests).
- Rely on stable selectors; use data-testid only when necessary.
- Run E2E in CI only when stable to avoid flakiness.

When BFF exists, validate:
- API availability and client rendering.
- Error fallbacks when API fails.
- Real pagination and sorting from backend.

Tooling:
- Only add Playwright/Cypress with an explicit decision; log it in `ProjectDecisions.md`.

## Test patterns (mandatory)
### Arrange / Act / Assert (AAA)
- Arrange: setup props, mocks, test data.
- Act: render or simulate user action.
- Assert: user-observable outcome.

### Table-driven tests
- Use `it.each` for systematic coverage (pagination edge cases, sorting criteria, invalid inputs).

### Given / When / Then naming
Use titles that state behavior:
- "shows empty state when there are no projects"
- "disables Next button on last page"
- "shows error message when fetch fails"

### Regression-first mindset
- When a bug is fixed, add a test that reproduces it and ensure it fails before the fix.

### Avoid brittle tests
Avoid:
- Exact DOM structure assertions.
- Snapshot tests for large components.
- Tailwind class list assertions.
Prefer:
- Role-based queries.
- Text and labels.
- Accessible names.

## Frontend UI assertions
Prefer:
- Key headings exist.
- Expected items appear or disappear.
- Buttons enable or disable correctly.
- Correct aria-labels for interactive elements.
- Navigation triggers expected content changes.

Avoid:
- Exact layout structure.
- Tailwind class lists.
- Internal state variables.
