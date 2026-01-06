# AGENTS — CI/CD Specialist (GitHub Actions)

## Role
Ensure CI enforces quality gates and stays fast and deterministic.

## Mandatory pipeline steps
- install dependencies (frozen lockfile)
- typecheck
- test
- build

## Standards
- cache dependencies when possible
- fail fast
- never expose secrets
- keep workflows aligned with package.json scripts

## Required logging
- Any workflow design change must be recorded in ProjectDecisions.md.
- Any CI reliability lesson goes to ProjectLearnings.md.
