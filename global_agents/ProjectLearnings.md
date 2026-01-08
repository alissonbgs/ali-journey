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

## Learning: Understanding `className` usage in this project
Explanation:
`className` strings are Tailwind utility classes applied directly to elements. They describe layout, spacing, typography, color, and responsiveness without writing new CSS for each component.
Example:
`className="flex min-h-[60vh] flex-col items-center justify-center text-center"` centers content vertically and horizontally using flexbox and sets a minimum height.
When to use:
Whenever styling a component; prefer Tailwind classes for most styles and reserve CSS files for global or reusable patterns.

## Learning: Common Tailwind class patterns used here
Explanation:
We use a small set of layout and typography classes consistently to keep the UI minimal and aligned.
Example:
Layout: `flex`, `items-center`, `justify-between`, `min-h-screen`, `gap-6`, `px-6`, `py-8`.
Typography: `text-xs`, `text-lg`, `text-4xl`, `font-semibold`, `tracking-[0.3em]`.
Colors: `bg-zinc-950`, `bg-zinc-900`, `text-white`, `text-white/70`, `border-zinc-800`.
Responsive: `md:px-10`, `md:py-12`, `md:text-5xl`, `lg:grid-cols-2`.
When to use:
Follow these patterns for new pages to keep consistency with the existing visual system.

## Learning: Where the classes come from and who applies them
Explanation:
Tailwind classes come from the Tailwind CSS framework configured for the project (see `apps/web/src/app/globals.css` for the Tailwind import). Developers apply them in React components through `className`.
Example:
Navigation styles live in `apps/web/src/components/layout/SidebarNav.tsx`, while page layouts live in `apps/web/src/app/**/page.tsx`.
When to use:
Use Tailwind classes directly in components for most styling; keep global CSS for base setup and any shared utility classes.

## Learning: How Tailwind relates to CSS and the design architecture
Explanation:
Tailwind compiles `className` utilities into CSS at build time. This keeps styling close to the component and aligns with the layout hierarchy: layout components define global structure, pages define content layout, and `globals.css` defines project-wide base styles.
Example:
`AppShell` sets the overall background and spacing; pages control their own text layout; `globals.css` holds the Tailwind import and any global rules.
When to use:
Use layout components for structure, page components for content, and global CSS only for base styles or cross-cutting rules.

## Learning: RSC + client accordion split for Journey
Explanation:
Keep the page and data in a Server Component, and isolate accordion state in a small client component that receives serializable entries.
Example:
`apps/web/src/app/journey/page.tsx` renders `JourneyAccordion` with `journeyEntries` from `apps/web/src/features/journey/data.ts`.
When to use:
When an interactive UI needs state but you want to preserve the App Router’s RSC default and keep data definitions server-side.

## Learning: AnimatePresence for delayed enter and clean exit
Explanation:
`AnimatePresence` keeps elements mounted for exit animations and avoids manual timeout coordination. Pair it with `onExitComplete` when layout changes must wait until the exit finishes.
Example:
`JourneyAccordionItem` uses `AnimatePresence` + `motion.div` to fade details in after a delay and to collapse the card only after the exit animation completes.
When to use:
When UI elements need enter/exit animations that should control unmount timing without custom timers.
