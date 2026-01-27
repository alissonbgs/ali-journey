-- Realtime chat schema + policies
-- Replace the email in policies if you change the owner email.

create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations (id) on delete cascade,
  sender_role text not null check (sender_role in ('visitor', 'admin')),
  sender_name text,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.owner_status (
  id text primary key,
  last_active timestamptz not null,
  updated_at timestamptz not null default now()
);

alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.owner_status enable row level security;

-- Conversations: allow anyone to create, owner can read.
create policy "chat_conversations_insert_public"
  on public.chat_conversations
  for insert
  with check (true);

create policy "chat_conversations_select_owner"
  on public.chat_conversations
  for select
  using ((auth.jwt() ->> 'email') = 'alissonbgs97@gmail.com');

-- Messages: visitors can insert visitor messages, owner can read and insert admin replies.
create policy "chat_messages_insert_visitor"
  on public.chat_messages
  for insert
  with check (auth.uid() is null and sender_role = 'visitor');

create policy "chat_messages_insert_owner"
  on public.chat_messages
  for insert
  with check ((auth.jwt() ->> 'email') = 'alissonbgs97@gmail.com' and sender_role = 'admin');

create policy "chat_messages_select_owner"
  on public.chat_messages
  for select
  using ((auth.jwt() ->> 'email') = 'alissonbgs97@gmail.com');

-- Presence: everyone can read, only owner can upsert.
create policy "owner_status_select_public"
  on public.owner_status
  for select
  using (true);

create policy "owner_status_upsert_owner"
  on public.owner_status
  for insert
  with check ((auth.jwt() ->> 'email') = 'alissonbgs97@gmail.com');

create policy "owner_status_update_owner"
  on public.owner_status
  for update
  using ((auth.jwt() ->> 'email') = 'alissonbgs97@gmail.com');
