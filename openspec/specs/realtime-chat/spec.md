# realtime-chat Specification

## Purpose
Enable real-time recruiter chat when the portfolio owner is online and active, with a fallback contact option when offline.

## Tech Stack
- Next.js App Router (RSC-first)
- TypeScript (strict)
- Tailwind CSS
- Supabase (Auth + Realtime + Postgres)

## Skills Needed
- Supabase Auth and Realtime presence patterns
- Owner allowlist gating for admin access

## Requirements
### Requirement: Visitor chat availability depends on owner presence
The portfolio site SHALL only enable chat when the owner is online and active within the last 10 minutes.

#### Scenario: Owner online and active
- **GIVEN** the owner has the admin view open and has been active within 10 minutes
- **WHEN** a visitor opens the portfolio
- **THEN** the chat entry point is enabled and indicates availability.

#### Scenario: Owner offline or inactive
- **GIVEN** the owner is offline OR the last activity is more than 10 minutes ago
- **WHEN** a visitor opens the portfolio
- **THEN** the chat entry point is disabled.

### Requirement: Offline state shows email contact
When chat is disabled due to offline or inactivity, the UI SHALL show the email contact option.

#### Scenario: Offline message displays email
- **GIVEN** chat is disabled
- **WHEN** a visitor opens the chat modal
- **THEN** the UI displays the email address `alissonbgs97@gmail.com`.

### Requirement: Visitor name is required to start chat
The chat UI SHALL require a visitor name before allowing the first message to be sent.

#### Scenario: Name is required before sending
- **GIVEN** the chat is enabled
- **WHEN** a visitor opens the chat modal
- **THEN** the UI prompts for a name before starting the conversation.

#### Scenario: Name is missing
- **GIVEN** the chat is enabled
- **WHEN** a visitor tries to send a message without a name
- **THEN** the message is blocked and the UI indicates the name is required.

### Requirement: Owner-only admin presence view
The app SHALL provide an owner-only admin view used to signal presence and receive messages.

#### Scenario: Admin view access is restricted
- **WHEN** a user attempts to access the admin view without owner credentials
- **THEN** access is denied.

#### Scenario: Admin view access is allowlisted
- **GIVEN** a user authenticates via Supabase Auth
- **WHEN** the user email is not in the owner allowlist
- **THEN** access is denied.

#### Scenario: Admin view access is granted for owner
- **GIVEN** a user authenticates via Supabase Auth
- **WHEN** the user email matches the owner allowlist (`alissonbgs97@gmail.com`)
- **THEN** access is granted to the admin view.

#### Scenario: Admin view sends presence heartbeats
- **GIVEN** the owner is on the admin view
- **WHEN** the page is open and active
- **THEN** a presence heartbeat is emitted at a regular interval (implementation-defined).

### Requirement: Admin can reply to visitor messages
The admin view SHALL allow the owner to send replies to visitor messages.

#### Scenario: Admin sends a reply
- **GIVEN** the owner is viewing a visitor conversation in the admin view
- **WHEN** the owner sends a reply message
- **THEN** the reply is stored and delivered to the visitor chat UI.

### Requirement: Global floating chat entry point
The app SHALL show a floating chat icon at the bottom-right of the page across the site.

#### Scenario: Chat icon persists across navigation
- **GIVEN** a visitor navigates between pages
- **WHEN** the route changes
- **THEN** the floating chat icon remains visible.

#### Scenario: Conversation persists across navigation
- **GIVEN** a visitor has an active chat conversation
- **WHEN** the visitor navigates to another page
- **THEN** the conversation state remains available without restarting.

#### Scenario: Conversation persists across reload
- **GIVEN** a visitor has an active chat conversation
- **WHEN** the visitor reloads the page
- **THEN** the conversation state is restored.

#### Scenario: Warn before closing with active conversation
- **GIVEN** a visitor has an active chat conversation
- **WHEN** the visitor attempts to close the tab or navigate away from the site
- **THEN** the UI warns that the conversation will be cleared.
