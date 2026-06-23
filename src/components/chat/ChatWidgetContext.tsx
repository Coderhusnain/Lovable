/**
 * =========================================================
 * LEGALGRAM 2.0 - ChatWidget Context
 * =========================================================
 * Lets ANY component (navbar button, floating button, a
 * "Need help?" link, etc.) open/close the same chat panel
 * instead of each one managing its own isOpen state.
 *
 * Wrap your app once in <ChatWidgetProvider>, then:
 *   - ChatWidget reads { isOpen, closeChat } to render itself
 *   - Navbar button calls { openChat } / { toggleChat }
 * =========================================================
 */

import React, { createContext, useContext, useState, useCallback } from "react";

interface ChatWidgetContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatWidgetContext = createContext<ChatWidgetContextValue | undefined>(undefined);

export function ChatWidgetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <ChatWidgetContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget(): ChatWidgetContextValue {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) {
    throw new Error("useChatWidget must be used within a <ChatWidgetProvider>");
  }
  return ctx;
}