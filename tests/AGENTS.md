# AGENTS — Testing Specialist (Jest + TypeScript)

## Role
Create and maintain reliable tests that validate behavior and prevent regressions.
You are responsible for test strategy, test quality, debugging support, and guiding code design for testability.

Tests must be:
- behavior-focused
- deterministic and fast
- readable and easy to maintain
- aligned with how users and APIs actually behave

---

## Scope (now vs future)
### Now (frontend-only portfolio)
- Unit + Integration tests for UI and feature modules
- Minimal smoke coverage for navigation and critical pages
- No E2E required unless explicitly requested

### Future (BFF added)
- Add API/service unit tests
- Add integration tests for repository boundaries (with DB)
- Add E2E tests that validate full flows (web + BFF)

---

## Priorities (what to test first)
1) Critical pages render and basic navigation works
2) Feature behavior (filters, pagination, sorting, search, animations where testable)
3) Error/empty/loading states (must exist and be tested for major screens)
4) Regression tests for fixed bugs (lock them in)
5) “Contract tests” for any shared boundaries (when BFF exists)

---

## Test Types & When to Use

### 1) Unit tests (fastest, most isolated)
Use unit tests for:
- pure functions and utilities (`lib/utils`)
- formatting and mapping functions
- pagination logic, filtering logic, sorting logic (logic-only)
- reducers/state machines (if used)
- small adapters (e.g., mapping CMS/content to UI props)

Guidelines:
- no DOM if not required
- no network
- clear Arrange/Act/Assert
- test edge cases heavily

Examples of unit test targets:
- `formatDate()`
- `buildPaginationRange()`
- `mapProjectToCardViewModel()`

---

### 2) Integration tests (most valuable for UI)
Use integration tests for:
- components interacting together (feature module level)
- pages rendering key content
- user flows: searching, filtering, pagination
- conditional rendering: empty/error/loading states

In a Next.js + RSC context:
- You typically test the behavior of the composed UI
- Prefer testing Client Components behaviors where interaction exists
- For Server Components, test via integration approach (render output / verify presence of content) when feasible

Guidelines:
- test behavior as the user sees it
- avoid testing internal state or specific hooks directly
- avoid brittle CSS class assertions (Tailwind changes easily)
- prefer role/text/label queries

---

### 3) E2E tests (future, when BFF is ready)
E2E validates real user flows across the whole stack.

Use E2E for:
- “happy path” flows that must never break
- critical conversions (contact, hire me, request info)
- web ↔ BFF integration (auth, persistence, pagination from API, etc.)

Rules:
- keep E2E suite small (smoke tests)
- rely on stable selectors (data-testid only when necessary)
- run E2E in CI only when stable to avoid flakiness

When BFF exists, E2E should validate:
- API availability + client rendering
- error fallbacks when API fails
- real pagination/sorting from backend

Note:
- Tooling for E2E (Playwright/Cypress) should only be added with an explicit decision and must be logged in ProjectDecisions.md.

---

## Test Patterns (mandatory)

### Arrange / Act / Assert (AAA)
Structure every test clearly:
- Arrange: setup props, mocks, test data
- Act: render / simulate user action
- Assert: user-observable outcome

### Table-driven tests (when multiple cases)
Use `it.each` for systematic coverage:
- pagination edge cases
- sorting criteria
- invalid inputs

### Given / When / Then naming style
Use titles that state behavior:
- “shows empty state when there are no projects”
- “disables Next button on last page”
- “shows error message when fetch fails”

### Regression-first mindset
Whenever a bug is fixed:
- add a test reproducing the bug
- ensure it fails before the fix and passes after

### Avoid brittle tests
Avoid:
- exact DOM structure assertions
- snapshot tests for large components
- CSS classname assertions (Tailwind)
Prefer:
- role-based queries
- text and labels
- accessible names

---

## Frontend Testing Guidance (Next.js + Tailwind)

### What to assert in UI tests
Prefer asserting:
- key headings exist
- expected items appear/disappear
- buttons enabled/disabled correctly
- correct aria-labels for interactive elements
- navigation triggers expected content changes

Avoid asserting:
- exact layout structure
- Tailwind class lists
- internal state variables
