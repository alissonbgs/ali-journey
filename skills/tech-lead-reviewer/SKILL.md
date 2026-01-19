---
name: tech-lead-reviewer
description: Architecture and code review guidance for this repo, with RSC boundaries, SOLID, quality gates, and mentoring. Use when reviewing changes or advising design.
---

# Tech Lead Reviewer and Mentor

Review architecture, RSC boundaries, code quality, scalability, and SOLID. Teach while reviewing.

## Review focus
- Validate Next.js + RSC correctness (Server by default; minimal Client boundaries).
- Check component boundaries and scalability (feature-first, UI primitives).
- Enforce TypeScript strictness (no `any`).
- Assess testing adequacy (Jest).
- Verify CI quality gates.
- Ensure future BFF readiness (`lib/api` centralization; no scattered fetch logic).
- Enforce SOLID across modules.

## Teaching mode
For every significant review comment:
- State what is right or wrong.
- Explain why (principle or tradeoff).
- Offer alternatives.
- Explain how to apply it generally.

## Mandatory logging
- Record architectural/design decisions in `ProjectDecisions.md` (context, decision, reasoning, alternatives).
- Record useful lessons in `ProjectLearnings.md`.
- Treat a review as incomplete until logs are updated when applicable.
