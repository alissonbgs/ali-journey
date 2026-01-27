## Implementation guidance

- Keep React components small and single-responsibility; extract UI blocks and hooks.
- Prefer derived values over extra state; use effects only for external subscriptions.

## 1. Supabase setup and schema

- [ ] 1.1 Create Supabase project and configure environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- [ ] 1.2 Create tables for `chat_messages` and `owner_presence` (or equivalent) with timestamps and indexes.
- [ ] 1.3 Enable RLS and add policies (anonymous insert for messages, owner-only read, owner-only presence updates).
- [ ] 1.4 Document the SQL schema and policies under this change for repeatability.

## 2. Supabase helpers and auth gating

- [ ] 2.1 Add Supabase client/server helpers under `src/lib/supabase`.
- [ ] 2.2 Create `/admin/chat` route with Supabase Auth login flow.
- [ ] 2.3 Enforce owner allowlist gating by email on the admin route.

## 3. Presence and inactivity logic

- [ ] 3.1 Publish presence on the admin view using Supabase Realtime presence.
- [ ] 3.2 Track last active time (heartbeat + activity events) and mark offline after 10 minutes of inactivity.
- [ ] 3.3 Expose a simple API or client hook for availability checks on the visitor side.

## 4. Visitor chat widget

- [ ] 4.1 Add a minimal chat entry point (client component) and modal UI.
- [ ] 4.2 Require a visitor name before enabling the first message send.
- [ ] 4.3 Disable chat when offline; show the email fallback in the modal.
- [ ] 4.4 When online, allow visitors to submit messages and show send status.
- [ ] 4.5 Persist conversation state across client-side navigation.
- [ ] 4.6 Restore conversation state on reload and warn before closing with active chat.

## 5. Admin inbox

- [ ] 5.1 Subscribe to incoming messages in the admin view (realtime stream).
- [ ] 5.2 Render a simple message list with timestamps.
- [ ] 5.3 Add reply composer and send replies to the visitor conversation.

## 6. QA

- [ ] 6.1 Manual verification of online/offline gating and 10-minute inactivity behavior.
- [ ] 6.2 Manual verification of message delivery and admin visibility.
- [ ] 6.3 Run `npm run typecheck:ui`, `npm run test:ui`, `npm run build:ui`.
