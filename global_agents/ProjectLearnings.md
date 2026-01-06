# Project Learnings

Capture useful lessons, patterns, mistakes corrected, and best practices learned while building.
Format:
## Learning: <title>
Explanation:
Example:
When to use:

## Notes
- Add learnings here as the project evolves.

## Learning: Monorepo split between web and future BFF
Explanation:
The repo is organized under `apps/` to keep the Next.js frontend isolated from the future backend-for-frontend. This keeps deployment and dependency boundaries clear.
Example:
`apps/web` contains the Next.js app; `apps/bff` is reserved for a future Node/Fastify API layer.
When to use:
When you want clear separation between UI and API layers without blocking future backend work.

## Learning: Web app folder structure and ownership
Explanation:
The Next.js App Router lives under `apps/web/src/app`, shared layout components live under `apps/web/src/components/layout`, and shared UI primitives should go under `apps/web/src/components/ui` per local rules.
Example:
`apps/web/src/app/layout.tsx` hosts the root layout, while `apps/web/src/components/layout/AppShell.tsx` owns the shell and sidebar.
When to use:
When adding new pages, layouts, or shared components to keep boundaries consistent and scalable.

## Learning: Pages and sidebar implementation pattern
Explanation:
Pages are file-based routes in the App Router (`apps/web/src/app/**/page.tsx`) and the sidebar is a layout component with a minimal client boundary for interactivity.
Example:
`apps/web/src/components/layout/SidebarNav.tsx` is a client component that handles active route state and collapse toggle; `AppShell` is server-rendered and wraps all pages.
When to use:
When adding navigation or global UI that must appear on every page without duplicating markup in each route.

## Learning: Code patterns applied so far
Explanation:
Keep RSC by default, isolate interactivity in small client components, and use Tailwind utility classes for concise styling. Avoid new dependencies unless needed.
Example:
`SidebarNav` uses `usePathname` for active link state and keeps icon SVGs local; `AppShell` is pure and just composes layout.
When to use:
When building shared UI to minimize client bundles and keep layout components simple.

## Learning: CSS slide transitions keyed by route
Explanation:
Use a small client wrapper keyed by `usePathname` to trigger CSS keyframes, keeping the page surface and text aligned during transitions.
Example:
`apps/web/src/components/layout/PageTransition.tsx` with `.page-transition__surface` keyframes in `apps/web/src/app/globals.css`.
When to use:
When you need lightweight page transitions without adding an animation library.

## Learning: Next steps for code design
Explanation:
As the app grows, move page-specific UI into `features/` and promote reusable pieces into `components/ui` or `components/layout`. Add tests for navigation and layout behavior.
Example:
Future journey timeline or pomodoro widgets should live under `apps/web/src/features/` with feature docs and tests.
When to use:
When new functionality starts to grow beyond a single page or requires reusable UI patterns.
