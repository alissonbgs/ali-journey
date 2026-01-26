# Project Setup — Portfolio (Next.js RSC + Tailwind + TypeScript)

## Goals (now)
- Modern frontend-only portfolio using Next.js App Router with React Server Components (RSC) as default.
- Tailwind for styling.
- Strong quality gates: TS strictness, tests, CI.
- Architecture designed to scale to complex UI (animations, pagination, content, search).
- Single-package Next.js app with scripts and deps at the repo root.

---

## Stack
- Next.js (App Router) + RSC default
- TypeScript (strict)
- Tailwind CSS
- Tests: Jest (and React Testing Library)
- CI: GitHub Actions
- Deploy (now): Vercel recommended

---

## Step-by-step Initialization

### 1) Create the repo
- Create a GitHub repo: `portfolio`
- Clone locally
- Create a `main` branch and protect it later with CI checks

### 2) Create Next.js app (App Router + TS)
Use Next’s official initializer:
- Choose TypeScript
- Choose Tailwind
- Use App Router (important for RSC-first)

Use the repository root (no subfolder) for the app.

### 3) Add strict TypeScript rules
- Ensure `strict: true` in `tsconfig.json`
- Disallow implicit any
- Prefer `unknown` + narrowing instead of `any`

### 4) Add lint + formatting (optional but recommended)
- ESLint (Next includes)
- Prettier (optional)
- Keep consistent scripts in `package.json`

### 5) Add testing baseline (Jest + RTL)
- Add Jest + React Testing Library
- Create a minimal test:
  - renders home page
  - verifies a key heading exists
- Add a test script `npm run test`

### 6) Create scalable folder structure (RSC-first)
In `src`, standardize:

- `app/` for routes (RSC default)
- `components/` shared UI components
- `features/` feature modules (each feature has its own components, hooks, types)
- `lib/` utilities (formatting, fetchers, env parsing)
- `styles/` (if needed beyond tailwind)
- `content/` (mdx/json content sources for portfolio)
- `server/` (server-only helpers; never imported by client components)

### 7) Decide design strategy (scalable)
Start with:
- “Feature-first” + “UI primitives”
- Keep components small and composable
- Introduce a design tokens pattern early:
  - Tailwind config for colors, spacing, radii
- Prefer Server Components for data/content render
- Client Components only for interactions/animations

### 8) Add GitHub Actions CI
Create workflow:
- Install deps
- Typecheck
- Test
- Build

Make CI mandatory for PR merge.

### 9) Deploy (now)
Deploy strategy:
- Use Vercel for simplest and fastest iteration
- Keep `Deploy Agent` instructions future-friendly (AWS/K8s later)

### 10) Logging decisions & learnings (mandatory)
Create these files in the root:
- `ProjectDecisions.md`
- `ProjectLearnings.md`

Rule:
- Any architectural/design decision must be recorded in `ProjectDecisions.md`
- Any lesson or best-practice learned must be recorded in `ProjectLearnings.md`

---

## Verification Checklist
- `npm run typecheck` passes
- `npm run test` passes
- `npm run build` passes
- CI passes on PR
- `ProjectDecisions.md` + `ProjectLearnings.md` exist and are being updated


