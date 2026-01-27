## Context

The portfolio is a Next.js App Router app with RSC-first pages and minimal client components. There is no existing backend for realtime messaging, so a hosted realtime provider is the shortest path to presence-aware chat.

## Goals / Non-Goals

**Goals:**
- Provide a visitor chat entry point that is enabled only when the owner is online and active within 10 minutes.
- Provide an owner-only admin view with Supabase Auth + allowlist gating.
- Stream incoming messages to the admin view in near real time.
- Provide a clear offline fallback with the owner email address.
- Require a visitor name before starting a chat conversation.
- Allow admin replies in the first iteration.
- Keep the chat entry point floating at bottom-right and persistent across navigation.

**Non-Goals:**
- Building a full customer support system (multi-agent routing, ticketing, etc.).
- Persisting visitor accounts or requiring visitor login.
- Long-term analytics or CRM integrations.

## Decisions

- **Supabase for Auth + Realtime + Postgres:** One provider for realtime channels, storage, and auth.
- **Owner allowlist by email:** Admin access is granted only when the authenticated email matches the allowlist.
- **Presence + inactivity window:** Use Supabase Realtime presence plus a 10-minute inactivity window to gate availability.
- **Minimal client surface:** The chat widget and admin presence tracker are the only client components.
- **Name required for first message:** Capture a display name before allowing the first message to be sent.
- **Admin replies enabled:** Include a simple reply composer in the admin view.
- **Global floating widget:** Mount the chat entry point in the root layout so it persists across route changes.
- **Persisted conversations:** Restore conversation state on reload; warn before leaving with active chat.

## Component Design Guidelines

- Prefer small, focused components (single responsibility, limited props) over large monoliths.
- Extract reusable UI blocks and hooks; keep client components thin and explicit.
- Avoid derived state where possible; compute values inline or with memoization.
- Use effects only for external systems (subscriptions, timers, persistence) and always clean up.

## Risks / Trade-offs

- **Spam or abuse:** Public message inserts can be abused; mitigate with rate limits and RLS policies.
- **Realtime quotas:** Supabase realtime limits may require upgrades if traffic spikes.
- **Presence edge cases:** Tab suspended or network flaky; fallback to last_active timestamp.

## Migration Plan

- Create Supabase project and apply schema/policies.
- Add environment variables and wire up Supabase client/server helpers.
- Roll out the chat widget and admin view in one deploy.

## Open Questions

- None.
