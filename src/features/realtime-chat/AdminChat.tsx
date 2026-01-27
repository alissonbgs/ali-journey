"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RealtimeChannel, Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  ACTIVITY_GRACE_MS,
  OWNER_EMAIL,
  OWNER_STATUS_ID,
  PRESENCE_HEARTBEAT_MS,
} from "./constants";
import type { ChatMessage, ConversationSummary } from "./types";

type ChatConversationRow = {
  id: string;
  visitor_name: string;
  created_at: string;
};

type ChatMessageRow = {
  id: string;
  conversation_id: string;
  sender_role: "visitor" | "admin";
  sender_name: string | null;
  body: string;
  created_at: string;
};

const toChatMessage = (row: ChatMessageRow): ChatMessage => ({
  id: row.id,
  conversationId: row.conversation_id,
  senderRole: row.sender_role,
  senderName: row.sender_name,
  body: row.body,
  createdAt: row.created_at,
});

const toConversationSummary = (
  row: ChatConversationRow,
): ConversationSummary => ({
  id: row.id,
  visitorName: row.visitor_name,
  createdAt: row.created_at,
  lastMessageAt: null,
  lastMessagePreview: null,
});

const useOwnerSession = (supabase: ReturnType<typeof getSupabaseClient>) => {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSession = useCallback(
    async (session: Session | null) => {
      const email = session?.user?.email ?? null;
      if (email && email.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
        setAuthError("Access denied. This admin view is owner-only.");
        await supabase.auth.signOut();
        setSessionEmail(null);
        return;
      }
      setAuthError(null);
      setSessionEmail(email);
    },
    [supabase],
  );

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) {
        return;
      }
      if (error) {
        setAuthError("Could not load session.");
        return;
      }
      await handleSession(data.session);
    };

    loadSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleSession(session).catch(() => undefined);
      },
    );

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, [handleSession, supabase]);

  const isOwner = sessionEmail?.toLowerCase() === OWNER_EMAIL.toLowerCase();

  return {
    isOwner,
    sessionEmail,
    authError,
    setAuthError,
    setSessionEmail,
  };
};

const useOwnerPresence = (
  supabase: ReturnType<typeof getSupabaseClient>,
  isOwner: boolean,
) => {
  const lastActiveRef = useRef(0);
  const lastHeartbeatRef = useRef(0);

  useEffect(() => {
    if (!isOwner) {
      return;
    }

    lastActiveRef.current = Date.now();

    const markActive = () => {
      lastActiveRef.current = Date.now();
    };

    const sendHeartbeat = async () => {
      const now = Date.now();
      if (now - lastActiveRef.current > ACTIVITY_GRACE_MS) {
        return;
      }
      if (now - lastHeartbeatRef.current < PRESENCE_HEARTBEAT_MS) {
        return;
      }
      lastHeartbeatRef.current = now;
      await supabase.from("owner_status").upsert(
        {
          id: OWNER_STATUS_ID,
          last_active: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
    };

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((eventName) =>
      window.addEventListener(eventName, markActive),
    );

    sendHeartbeat().catch(() => undefined);
    const interval = window.setInterval(sendHeartbeat, PRESENCE_HEARTBEAT_MS);

    return () => {
      events.forEach((eventName) =>
        window.removeEventListener(eventName, markActive),
      );
      window.clearInterval(interval);
    };
  }, [isOwner, supabase]);
};

type AdminHeaderProps = {
  readonly onSignOut: () => void;
};

function AdminHeader({ onSignOut }: AdminHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">Chat inbox</h1>
        <p className="text-sm text-white/60">
          Live visitor conversations with realtime updates.
        </p>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-white"
      >
        Sign out
      </button>
    </div>
  );
}

type AdminLoginProps = {
  readonly email: string;
  readonly onEmailChange: (value: string) => void;
  readonly onSignIn: () => void;
  readonly authError: string | null;
  readonly authNotice: string | null;
};

function AdminLogin({
  email,
  onEmailChange,
  onSignIn,
  authError,
  authNotice,
}: AdminLoginProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center gap-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold text-white">Admin chat</h1>
        <p className="mt-2 text-sm text-white/60">
          Sign in with your owner email to access live conversations.
        </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <label className="text-xs uppercase tracking-[0.2em] text-white/50">
          Owner email
          <input
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="Enter email"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={onSignIn}
          className="mt-4 w-full rounded-2xl border border-emerald-400/40 bg-emerald-400/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/30"
        >
          Send magic link
        </button>
        {authError && <p className="mt-3 text-sm text-rose-200">{authError}</p>}
        {authNotice && (
          <p className="mt-3 text-sm text-emerald-200">{authNotice}</p>
        )}
      </div>
    </div>
  );
}

type ConversationListProps = {
  readonly conversations: ConversationSummary[];
  readonly selectedConversationId: string | null;
  readonly onSelect: (id: string) => void;
};

function ConversationList({
  conversations,
  selectedConversationId,
  onSelect,
}: ConversationListProps) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
        Conversations
      </p>
      {conversations.length === 0 && (
        <p className="text-sm text-white/60">
          No conversations yet. Keep this tab open to show as online.
        </p>
      )}
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelect(conversation.id)}
            className={`w-full rounded-2xl border px-3 py-3 text-left text-sm transition ${
              conversation.id === selectedConversationId
                ? "border-emerald-400/40 bg-emerald-400/10 text-white"
                : "border-white/10 bg-zinc-900/40 text-white/70 hover:border-white/30"
            }`}
          >
            <p className="font-semibold text-white">{conversation.visitorName}</p>
            <p className="text-xs text-white/50">
              Started {new Date(conversation.createdAt).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}

type ConversationPanelProps = {
  readonly selectedConversationId: string | null;
  readonly messages: ChatMessage[];
  readonly loadingMessages: boolean;
  readonly replyInput: string;
  readonly onReplyChange: (value: string) => void;
  readonly onReplySend: () => void;
  readonly sendingReply: boolean;
};

function ConversationPanel({
  selectedConversationId,
  messages,
  loadingMessages,
  replyInput,
  onReplyChange,
  onReplySend,
  sendingReply,
}: ConversationPanelProps) {
  return (
    <section className="flex min-h-[420px] flex-col rounded-3xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-white">
          {selectedConversationId ? "Conversation" : "Select a conversation"}
        </p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {loadingMessages && (
          <p className="text-sm text-white/60">Loading messages...</p>
        )}
        {!loadingMessages && messages.length === 0 && (
          <p className="text-sm text-white/60">
            No messages yet for this conversation.
          </p>
        )}
        {messages.map((message) => {
          const isVisitor = message.senderRole === "visitor";
          return (
            <div
              key={message.id}
              className={`flex ${isVisitor ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                  isVisitor
                    ? "bg-white/10 text-white/80"
                    : "bg-emerald-400/20 text-emerald-50"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {isVisitor ? message.senderName ?? "Visitor" : "You"}
                </p>
                <p>{message.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <input
            value={replyInput}
            onChange={(event) => onReplyChange(event.target.value)}
            placeholder="Type your reply..."
            className="flex-1 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none disabled:cursor-not-allowed"
            disabled={!selectedConversationId}
          />
          <button
            type="button"
            onClick={onReplySend}
            disabled={!selectedConversationId || sendingReply}
            className="rounded-xl border border-emerald-400/40 bg-emerald-400/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reply
          </button>
        </div>
      </div>
    </section>
  );
}

export default function AdminChat() {
  const [email, setEmail] = useState("");
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyInput, setReplyInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const selectedConversationRef = useRef<string | null>(null);
  const broadcastChannelRef = useRef<RealtimeChannel | null>(null);

  const supabase = useMemo(() => getSupabaseClient(), []);

  const {
    isOwner,
    sessionEmail,
    authError,
    setAuthError,
    setSessionEmail,
  } = useOwnerSession(supabase);

  useOwnerPresence(supabase, isOwner);

  useEffect(() => {
    selectedConversationRef.current = selectedConversationId;
  }, [selectedConversationId]);

  useEffect(() => {
    if (!isOwner) {
      return;
    }

    let isMounted = true;

    const loadConversations = async () => {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("id, visitor_name, created_at")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error) {
        setAdminError("Could not load conversations.");
        return;
      }

      const rows = (data ?? []) as ChatConversationRow[];
      const next = rows.map(toConversationSummary);
      setConversations(next);
      if (!selectedConversationRef.current && next.length > 0) {
        setSelectedConversationId(next[0].id);
      }
    };

    loadConversations();

    const channel = supabase
      .channel("admin_messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          const row = payload.new as ChatMessageRow | null;
          if (!row) {
            return;
          }
          const message = toChatMessage(row);
          setConversations((current) => {
            const existing = current.find(
              (item) => item.id === message.conversationId,
            );
            if (existing) {
              return current;
            }
            if (message.senderRole === "visitor") {
              return [
                {
                  id: message.conversationId,
                  visitorName: message.senderName ?? "Visitor",
                  createdAt: message.createdAt,
                  lastMessageAt: null,
                  lastMessagePreview: null,
                },
                ...current,
              ];
            }
            return current;
          });
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [isOwner, supabase]);

  useEffect(() => {
    if (!isOwner || !selectedConversationId) {
      setMessages([]);
      return;
    }

    let isMounted = true;

    const loadMessages = async () => {
      setLoadingMessages(true);
      const { data, error } = await supabase
        .from("chat_messages")
        .select(
          "id, conversation_id, sender_role, sender_name, body, created_at",
        )
        .eq("conversation_id", selectedConversationId)
        .order("created_at", { ascending: true });

      if (!isMounted) {
        return;
      }

      if (error) {
        setAdminError("Could not load messages.");
      } else {
        const rows = (data ?? []) as ChatMessageRow[];
        setMessages(rows.map(toChatMessage));
      }
      setLoadingMessages(false);
    };

    loadMessages();

    const messageChannel = supabase
      .channel(`conversation-${selectedConversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${selectedConversationId}`,
        },
        (payload) => {
          const row = payload.new as ChatMessageRow | null;
          if (!row) {
            return;
          }
          const message = toChatMessage(row);
          setMessages((current) => {
            if (current.some((item) => item.id === message.id)) {
              return current;
            }
            return [...current, message];
          });
        },
      )
      .subscribe();

    const broadcastChannel = supabase.channel(`chat-${selectedConversationId}`, {
      config: { broadcast: { ack: true } },
    });
    broadcastChannelRef.current = broadcastChannel;
    broadcastChannel.subscribe();

    return () => {
      isMounted = false;
      broadcastChannelRef.current = null;
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(broadcastChannel);
    };
  }, [isOwner, selectedConversationId, supabase]);

  const handleSignIn = async () => {
    setAuthError(null);
    setAuthNotice(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setAuthError("Enter your email first.");
      return;
    }
    if (trimmed.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
      setAuthError("Only the owner email can request a magic link.");
      return;
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const redirectTo = siteUrl
      ? `${siteUrl}/admin/chat`
      : window.location.href;

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setAuthError("Could not send magic link.");
      return;
    }
    setAuthNotice("Check your email for the sign-in link.");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSessionEmail(null);
  };

  const handleReply = async () => {
    if (!selectedConversationId || !replyInput.trim()) {
      return;
    }
    setSendingReply(true);
    setAdminError(null);

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        conversation_id: selectedConversationId,
        sender_role: "admin",
        sender_name: "Ali",
        body: replyInput.trim(),
      })
      .select("id, conversation_id, sender_role, sender_name, body, created_at")
      .maybeSingle();

    if (error || !data) {
      setAdminError("Reply failed to send.");
      setSendingReply(false);
      return;
    }

    const message = toChatMessage(data as ChatMessageRow);
    setMessages((current) => [...current, message]);
    setReplyInput("");

    await broadcastChannelRef.current?.send({
      type: "broadcast",
      event: "message",
      payload: { message },
    });

    setSendingReply(false);
  };

  if (!sessionEmail) {
    return (
      <AdminLogin
        email={email}
        onEmailChange={setEmail}
        onSignIn={handleSignIn}
        authError={authError}
        authNotice={authNotice}
      />
    );
  }

  if (!isOwner) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center gap-4 px-6 py-10 text-center">
        <h1 className="text-2xl font-semibold text-white">Access denied</h1>
        <p className="text-sm text-white/60">
          This admin area is restricted to the owner.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col gap-6 px-6 py-10">
      <AdminHeader onSignOut={handleSignOut} />

      {adminError && <p className="text-sm text-rose-200">{adminError}</p>}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />

        <ConversationPanel
          selectedConversationId={selectedConversationId}
          messages={messages}
          loadingMessages={loadingMessages}
          replyInput={replyInput}
          onReplyChange={setReplyInput}
          onReplySend={handleReply}
          sendingReply={sendingReply}
        />
      </div>
    </div>
  );
}
