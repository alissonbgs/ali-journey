export type ChatMessage = {
  id: string;
  conversationId: string;
  senderRole: "visitor" | "admin";
  senderName: string | null;
  body: string;
  createdAt: string;
};

export type ConversationSummary = {
  id: string;
  visitorName: string;
  createdAt: string;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
};

export type PersistedChatState = {
  conversationId: string | null;
  visitorName: string | null;
  messages: ChatMessage[];
};
