# Project Decisions

# Project Decisions Log to follow
Track architectural and design decisions.
Format:
## Decision: <title>
Context:
Decision:
Reasoning:
Alternatives:


## Initial setup
- Next.js App Router (RSC-first), TypeScript strict, Tailwind, Jest + RTL, and CI with GitHub Actions.
- Monorepo-ready layout with `web` and reserved structure for a future `apps/bff`.

## Decision: CSS-based page slide transitions
Context:
We want page-to-page motion without adding a new animation dependency.
Decision:
Introduce a small client `PageTransition` component that keys off `usePathname` and applies CSS keyframe slide/fade to the page surface.
Reasoning:
This keeps the App Router and RSC boundaries intact while providing lightweight transitions using built-in CSS.
Alternatives:
Use Framer Motion, the View Transitions API, or no transitions.

## Decision: Top toolbar navigation and Apps hub
Context:
Navigation moved from a left sidebar to a top toolbar, and small tools should be grouped under a dedicated Apps page.
Decision:
Replace the sidebar layout with a top toolbar (left brand, right page links) and add an Apps route with cards linking to individual tools like Pomodoro.
Reasoning:
This matches the new layout direction, reduces persistent UI width, and creates a clear entry point for multiple mini-apps.
Alternatives:
Keep the sidebar, or expose each tool directly in the top-level navigation.

## Decision: Use Phosphor Icons for artwork-heavy UI
Context:
The portfolio will use many artistic icons and needs a consistent, expressive icon set.
Decision:
Adopt `@phosphor-icons/react` for icon usage across the UI.
Reasoning:
Phosphor provides multiple stylistic weights and a cohesive visual language, making it easier to keep icons expressive without mixing libraries.
Alternatives:
Lucide for a minimal style, or react-icons for broader but inconsistent sets.

## Decision: Journey accordion with minimal client boundary
Context:
The Journey page needs expandable timeline cards while keeping the App Router RSC default intact.
Decision:
Keep the Journey page as a Server Component, place the accordion state/interaction in a small client component under `features/journey`, and pass a serializable data array from the page.
Reasoning:
This isolates interactivity to the smallest surface, preserves RSC benefits, and keeps the data/source-of-truth separate from UI state.
Alternatives:
Make the entire Journey page a client component or implement a CSS-only accordion without state.

## Decision: Framer Motion for Journey accordion details transitions
Context:
We needed delayed fade-in and exit animations for Journey details without managing manual timeouts.
Decision:
Adopt `framer-motion` with `AnimatePresence` + `motion.div` to handle enter/exit timing and keep the card collapse in sync with the exit animation.
Reasoning:
Framer Motion removes custom timer bookkeeping, provides clear enter/exit lifecycles, and keeps the visuals consistent with minimal component changes.
Alternatives:
Continue custom timeout management or use `@headlessui/react` Transition.

## Decision: Package guidance as Codex skills
Context:
We had local guidance markdown files scattered across directories.
Decision:
Move guidance into packaged skills under `skills/` with SKILL.md frontmatter and references for longer docs.
Reasoning:
This aligns with Codex skill format, enables progressive disclosure, and centralizes discovery.
Alternatives:
Keep ad-hoc SKILLS.md files or maintain a mixed approach.

## Decision: Adopt OpenSpec for spec-driven changes
Context:
We want a structured workflow for proposals, tasks, and specs that can be shared with AI tools.
Decision:
Initialize OpenSpec and store specs under `openspec/specs` and change artifacts under `openspec/changes`.
Reasoning:
This provides a consistent spec-first workflow and a single home for change artifacts.
Alternatives:
Continue using ad-hoc task guides under `tasks/` only.

## Decision: Flatten Next.js app to a single root package
Context:
The repo should have one `node_modules` and no BFF package, with scripts and dependencies consolidated at the root.
Decision:
Move the Next.js app and configs from `web/` to the repository root and drop workspace/BFF scripts.
Reasoning:
This simplifies dependency management, removes the extra package boundary, and aligns the scripts with a single-package setup.
Alternatives:
Keep workspaces with hoisted dependencies, or keep `web/` as a package and only prune unused BFF scripts.

## Decision: Supabase Auth + owner allowlist for realtime chat admin access
Context:
The realtime chat admin view must be restricted to the portfolio owner for long-term use.
Decision:
Use Supabase Auth with an owner allowlist check to gate the admin view.
Reasoning:
Supabase Auth integrates directly with Realtime, supports secure sessions, and allows simple server-side gating by email.
Alternatives:
Secret admin URL with token, basic password login, or IP allowlist.

## Decision: Supabase as realtime chat backend
Context:
We need presence-aware chat without operating our own realtime infrastructure.
Decision:
Use Supabase (Auth + Realtime + Postgres) for presence tracking and message storage.
Reasoning:
Supabase provides hosted realtime channels, built-in auth, and a Postgres store with RLS for a fast, maintainable implementation.
Alternatives:
Custom Postgres + Redis presence with AWS WebSocket or self-hosted WebSocket/SSE.

## Decision: Journey role update as content-only summary and highlights edit
Context:
The Journey page had generic descriptions for older roles, and the update request explicitly preserved dates, company names, stack summaries, and technologies.
Decision:
Apply a content-only patch to `summary` and `highlights` fields in `src/features/journey/data.ts` for `find-my-profession`, `smarkio`, `embraer`, and `black-bee-drones`, while keeping `globant1` unchanged.
Reasoning:
This satisfies the user request with the smallest safe change and avoids accidental regression in timeline or stack metadata.
Alternatives:
Move job content to another source; out of scope for this request.

## Decision: Home page portfolio refresh with a dedicated Connect section
Context:
The home page was hero-only and needed a minimalist vertical portfolio structure with required sections for tech info, soft skills, and interests.
Decision:
Keep the original hero at the top, add a scroll cue into the profile content, and structure the portfolio into four sections: Tech, Soft Skills, Interests, and a final Connect section containing GitHub and LinkedIn actions with icons.
Reasoning:
The extra Connect section keeps required content focused while creating a strong closing CTA for profile actions, and preserving the old hero keeps familiarity while enabling a clear scroll narrative.
Alternatives:
Keep only three sections and place social links in the hero; rejected because the links become less intentional and easier to miss.

## Decision: Black-first cosmic palette while preserving animated universe identity
Context:
The visual direction requested a darker black background with dark-purple accents, but stars/cosmic atmosphere had to remain.
Decision:
Introduce reusable cosmic color tokens and minimalist no-card section styling in `src/app/globals.css`, and tune `src/components/layout/GalaxyBackground.tsx` gradients/clouds toward near-black with restrained purple glow.
Reasoning:
This keeps the current animated canvas system, preserves the universe identity, and matches the requested direct-on-page section presentation.
Alternatives:
Replace the animated background with a static gradient or image; rejected because it loses the existing starfield identity.

## Decision: Home page feature componentization over monolithic page file
Context:
The home page refresh required multiple sections and repeated UI patterns, and the request explicitly asked for reusable tiny components.
Decision:
Split home implementation into small feature components under `src/features/home/` and keep `src/app/page.tsx` as a thin composition layer.
Reasoning:
This improves maintainability, reduces page-level complexity, and supports iterative section tuning without a single large file.
Alternatives:
Keep all markup/styles in `src/app/page.tsx`; rejected because it scales poorly and violates local guidance.

## Decision: Home page section refinement for minimalist professional flow
Context:
After reviewing the first refresh iteration, the section cards and extra Connect block were heavier than requested.
Decision:
Refine the home page to three direct-on-page sections (Tech Stack Resume, Future View, Interests/Curiosities), remove card backgrounds, remove the hero Journey button, and use section-level actions for Journey and Cool Tools.
Reasoning:
This keeps the page cleaner, preserves the old hero, and aligns the visual hierarchy with the requested minimalist/professional concept.
Alternatives:
Keep the Connect section and social links; rejected to reduce visual density and section sprawl.

