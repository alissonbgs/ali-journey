---
name: deploy-devops-lite
description: Deployment and infra guidance for this repo. Use when deciding deployment strategy, environment setup, or future infra readiness (Vercel now; AWS/K8s later).
---

# Deploy and DevOps-lite

Provide a simple deployment path now and keep the repo ready for future infra growth.

## Current deployment
- Prefer Vercel for Next.js speed and simplicity.
- Document the build command and environment variable strategy.

## Future readiness
- Prepare for introducing `apps/bff` (Node/Fastify) later.
- Keep boundaries so the web app can switch from static/content to BFF APIs via `lib/api`.

## Required logging
- Record deployment strategy choices in `ProjectDecisions.md`.
- Record infra/deploy lessons in `ProjectLearnings.md`.
