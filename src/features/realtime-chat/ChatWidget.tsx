"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  CHAT_STORAGE_KEY,
  ONLINE_WINDOW_MS,
  OWNER_STATUS_ID,
} from "./constants";
import type { ChatMessage, PersistedChatState } from "./types";

type OwnerStatusRow = {
  last_active: string | null;
};

type ChatMessageRow = {
  id: string;
  conversation_id: string;
  sender_role: "visitor" | "admin";
  sender_name: string | null;
  body: string;
  created_at: string;
};

const emptyState: PersistedChatState = {
  conversationId: null,
  visitorName: null,
  messages: [],
};

const safeParseState = (raw: string | null): PersistedChatState => {
  if (!raw) {
    return emptyState;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedChatState;
    return {
      conversationId: parsed.conversationId ?? null,
      visitorName: parsed.visitorName ?? null,
      messages: Array.isArray(parsed.messages) ? parsed.messages : [],
    };
  } catch {
    return emptyState;
  }
};

const toChatMessage = (row: ChatMessageRow): ChatMessage => ({
  id: row.id,
  conversationId: row.conversation_id,
  senderRole: row.sender_role,
  senderName: row.sender_name,
  body: row.body,
  createdAt: row.created_at,
});

const useOwnerAvailability = () => {
  const [statusError, setStatusError] = useState<string | null>(null);
  const [lastActive, setLastActive] = useState<string | null>(null);
  const [clockTick, setClockTick] = useState(() => Date.now());

  useEffect(() => {
    const supabase = getSupabaseClient();
    let isMounted = true;

    const loadStatus = async () => {
      const { data, error } = await supabase
        .from("owner_status")
        .select("last_active")
        .eq("id", OWNER_STATUS_ID)
        .limit(1);

      if (!isMounted) {
        return;
      }

      if (error) {
        setStatusError("Could not load availability.");
        return;
      }

      const row = (data as OwnerStatusRow[] | null)?.[0] ?? null;
      setLastActive(row?.last_active ?? null);
    };

    loadStatus();

    const channel = supabase
      .channel("owner_status")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "owner_status",
          filter: `id=eq.${OWNER_STATUS_ID}`,
        },
        (payload) => {
          const next = (payload.new as OwnerStatusRow | null)?.last_active;
          if (next) {
            setLastActive(next);
          }
        },
      )
      .subscribe();

    const interval = window.setInterval(
      () => setClockTick(Date.now()),
      30_000,
    );

    return () => {
      isMounted = false;
      window.clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  const isOnline = useMemo(() => {
    if (!lastActive) {
      return false;
    }
    const lastActiveTime = new Date(lastActive).getTime();
    return clockTick - lastActiveTime < ONLINE_WINDOW_MS;
  }, [clockTick, lastActive]);

  return { isOnline, statusError };
};

const usePersistedChatState = () => {
  const [chatState, setChatState] = useState<PersistedChatState>(() =>
    safeParseState(
      typeof window === "undefined"
        ? null
        : window.sessionStorage.getItem(CHAT_STORAGE_KEY),
    ),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(chatState),
    );

    if (chatState.messages.length === 0) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [chatState]);

  return [chatState, setChatState] as const;
};

const useConversationBroadcast = (
  conversationId: string | null,
  onAdminMessage: (message: ChatMessage) => void,
) => {
  useEffect(() => {
    if (!conversationId) {
      return;
    }

    const supabase = getSupabaseClient();
    const channel = supabase.channel(`chat-${conversationId}`, {
      config: { broadcast: { ack: true } },
    });

    channel
      .on("broadcast", { event: "message" }, ({ payload }) => {
        const incoming = payload?.message as ChatMessage | undefined;
        if (!incoming || incoming.senderRole !== "admin") {
          return;
        }
        onAdminMessage(incoming);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, onAdminMessage]);
};

const useAutoScroll = (
  ref: RefObject<HTMLDivElement | null>,
  key: number,
) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [key, ref]);
};

type ChatToggleButtonProps = {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
};

function ChatToggleButton({ isOpen, onToggle }: ChatToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/90 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] backdrop-blur transition hover:border-white/30"
      aria-expanded={isOpen}
      aria-controls="chat-widget"
    >
      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
      Chat
    </button>
  );
}

type ChatHeaderProps = {
  readonly availabilityLabel: string;
  readonly availabilityBadge: string;
};

function ChatHeader({ availabilityBadge, availabilityLabel }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
      <div>
        <p className="text-sm font-semibold">Realtime chat</p>
        <p className="text-xs text-white/60">
          Ask me anything while I&apos;m online.
        </p>
      </div>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${availabilityBadge}`}
      >
        {availabilityLabel}
      </span>
    </div>
  );
}

type NamePromptProps = {
  readonly nameInput: string;
  readonly onNameChange: (value: string) => void;
  readonly onContinue: () => void;
};

function NamePrompt({ nameInput, onNameChange, onContinue }: NamePromptProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
        Start here
      </p>
      <label className="space-y-2 text-xs text-white/70">
        Your name
        <input
          value={nameInput}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Jane Recruiter"
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
        />
      </label>
      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-xl border border-emerald-400/40 bg-emerald-400/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/30"
      >
        Continue
      </button>
    </div>
  );
}

type MessageListProps = {
  readonly messages: ChatMessage[];
  readonly listRef: RefObject<HTMLDivElement | null>;
};

function MessageList({ messages, listRef }: MessageListProps) {
  return (
    <div
      ref={listRef}
      className="minimal-scrollbar max-h-72 space-y-3 overflow-y-auto"
    >
      {messages.length === 0 && (
        <p className="text-xs text-white/60">
          Messages will appear here once the chat starts.
        </p>
      )}
      {messages.map((message) => {
        const isVisitor = message.senderRole === "visitor";
        return (
          <div
            key={message.id}
            className={`flex ${isVisitor ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                isVisitor
                  ? "bg-emerald-400/20 text-emerald-50"
                  : "bg-white/10 text-white/90"
              }`}
            >
              {!isVisitor && (
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {message.senderName ?? "Ali"}
                </p>
              )}
              <p>{message.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OfflineNotice() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
      I&apos;m offline right now. Email me at{" "}
      <span className="font-semibold text-white">alissonbgs97@gmail.com</span>.
    </div>
  );
}

type ChatComposerProps = {
  readonly messageInput: string;
  readonly onMessageChange: (value: string) => void;
  readonly onSend: () => void;
  readonly statusError: string | null;
  readonly sendError: string | null;
  readonly isOnline: boolean;
  readonly isSending: boolean;
  readonly isNameReady: boolean;
};

function ChatComposer({
  messageInput,
  onMessageChange,
  onSend,
  statusError,
  sendError,
  isOnline,
  isSending,
  isNameReady,
}: ChatComposerProps) {
  return (
    <div className="border-t border-white/10 px-5 py-4">
      {statusError && <p className="mb-2 text-xs text-amber-200">{statusError}</p>}
      {sendError && <p className="mb-2 text-xs text-rose-200">{sendError}</p>}
      <div className="flex items-center gap-2">
        <input
          value={messageInput}
          onChange={(event) => onMessageChange(event.target.value)}
          placeholder={isOnline ? "Type your message..." : "Chat is offline"}
          className="flex-1 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none disabled:cursor-not-allowed"
          disabled={!isOnline || !isNameReady}
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!isOnline || isSending || !isNameReady}
          className="rounded-xl border border-emerald-400/40 bg-emerald-400/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 transition hover:border-emerald-300 hover:bg-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

type ChatPanelProps = {
  readonly availabilityLabel: string;
  readonly availabilityBadge: string;
  readonly isOnline: boolean;
  readonly chatState: PersistedChatState;
  readonly nameInput: string;
  readonly onNameChange: (value: string) => void;
  readonly onNameContinue: () => void;
  readonly messageListRef: RefObject<HTMLDivElement | null>;
  readonly messageInput: string;
  readonly onMessageChange: (value: string) => void;
  readonly onSend: () => void;
  readonly statusError: string | null;
  readonly sendError: string | null;
  readonly isSending: boolean;
  readonly isNameReady: boolean;
};

function ChatPanel({
  availabilityLabel,
  availabilityBadge,
  isOnline,
  chatState,
  nameInput,
  onNameChange,
  onNameContinue,
  messageListRef,
  messageInput,
  onMessageChange,
  onSend,
  statusError,
  sendError,
  isSending,
  isNameReady,
}: ChatPanelProps) {
  return (
    <div
      id="chat-widget"
      className="fixed bottom-20 right-6 z-40 flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur"
    >
      <ChatHeader
        availabilityBadge={availabilityBadge}
        availabilityLabel={availabilityLabel}
      />

      <div className="flex flex-1 flex-col gap-4 px-5 py-4">
        {!chatState.visitorName && (
          <NamePrompt
            nameInput={nameInput}
            onNameChange={onNameChange}
            onContinue={onNameContinue}
          />
        )}

        <MessageList messages={chatState.messages} listRef={messageListRef} />

        {!isOnline && <OfflineNotice />}
      </div>

      <ChatComposer
        messageInput={messageInput}
        onMessageChange={onMessageChange}
        onSend={onSend}
        statusError={statusError}
        sendError={sendError}
        isOnline={isOnline}
        isSending={isSending}
        isNameReady={isNameReady}
      />
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [chatState, setChatState] = usePersistedChatState();
  const [nameInput, setNameInput] = useState(chatState.visitorName ?? "");
  const [messageInput, setMessageInput] = useState("");
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const { isOnline, statusError } = useOwnerAvailability();

  const isNameReady = nameInput.trim().length > 0;

  useAutoScroll(messageListRef, chatState.messages.length);

  const handleIncomingAdminMessage = useCallback((incoming: ChatMessage) => {
    setChatState((current) => {
      if (current.messages.some((msg) => msg.id === incoming.id)) {
        return current;
      }
      return {
        ...current,
        messages: [...current.messages, incoming],
      };
    });
  }, [setChatState]);

  useConversationBroadcast(chatState.conversationId, handleIncomingAdminMessage);

  const handleNameSubmit = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      return;
    }
    setChatState((current) => ({
      ...current,
      visitorName: trimmed,
    }));
    setNameInput(trimmed);
  };

  const handleSend = async () => {
    setSendError(null);
    if (!isOnline) {
      return;
    }
    const trimmedName = nameInput.trim();
    if (!trimmedName) {
      setSendError("Please enter your name to start.");
      return;
    }
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage) {
      return;
    }
    setIsSending(true);
    const supabase = getSupabaseClient();
    let conversationId = chatState.conversationId;

    try {
      if (!conversationId) {
        const newConversationId = crypto.randomUUID();
        const { error } = await supabase.from("chat_conversations").insert({
          id: newConversationId,
          visitor_name: trimmedName,
        });
        if (error) {
          setSendError("Could not start the chat. Try again.");
          return;
        }
        conversationId = newConversationId;
        setChatState((current) => ({
          ...current,
          conversationId,
          visitorName: trimmedName,
        }));
      }

      if (!conversationId) {
        setSendError("Could not start the chat. Try again.");
        return;
      }

      const ensuredConversationId = conversationId;
      const messageId = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      const { error } = await supabase.from("chat_messages").insert({
        id: messageId,
        conversation_id: ensuredConversationId,
        sender_role: "visitor",
        sender_name: trimmedName,
        body: trimmedMessage,
        created_at: createdAt,
      });

      if (error) {
        setSendError("Message failed to send. Please try again.");
        return;
      }

      setChatState((current) => ({
        ...current,
        messages: [
          ...current.messages,
          {
            id: messageId,
            conversationId: ensuredConversationId,
            senderRole: "visitor",
            senderName: trimmedName,
            body: trimmedMessage,
            createdAt,
          },
        ],
      }));
      setMessageInput("");
    } finally {
      setIsSending(false);
    }
  };

  const availabilityLabel = isOnline ? "Online now" : "Offline";
  const availabilityBadge = isOnline
    ? "bg-emerald-400/20 text-emerald-200"
    : "bg-zinc-800 text-zinc-400";

  return (
    <>
      <ChatToggleButton
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <ChatPanel
          availabilityLabel={availabilityLabel}
          availabilityBadge={availabilityBadge}
          isOnline={isOnline}
          chatState={chatState}
          nameInput={nameInput}
          onNameChange={setNameInput}
          onNameContinue={handleNameSubmit}
          messageListRef={messageListRef}
          messageInput={messageInput}
          onMessageChange={setMessageInput}
          onSend={handleSend}
          statusError={statusError}
          sendError={sendError}
          isSending={isSending}
          isNameReady={isNameReady}
        />
      )}
    </>
  );
}
