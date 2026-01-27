## Why

Recruiters need a direct, low-friction way to reach you in real time when you are actually available. Presence-aware chat prevents missed messages, while still offering a reliable fallback when you are offline.

## What Changes

- Add a realtime chat entry point on the portfolio that is enabled only when the owner is online and active within 10 minutes.
- Add an owner-only admin chat view (Supabase Auth + allowlist) to signal presence and read incoming messages.
- Use Supabase Realtime + Postgres to store and stream chat messages.
- Show the email fallback when chat is disabled.
- Require visitors to enter a name before sending the first message.
- Provide admin replies and keep the chat widget floating/persistent across page navigation.

## Capabilities

### New Capabilities
- `realtime-chat`: Visitors can send realtime messages when the owner is online and active.
- `realtime-chat-admin`: Owner can authenticate, appear online, and receive chat messages.

### Modified Capabilities
- None.

## Impact

- `src/app/layout.tsx` (mount the chat entry point)
- `src/app/page.tsx` (if the chat entry point is page-scoped)
- `src/app/admin/chat/page.tsx`
- `src/features/realtime-chat/*`
- `src/lib/supabase/*`
- Env configuration for Supabase keys and owner allowlist
- Supabase SQL schema/policies (documented and applied)
