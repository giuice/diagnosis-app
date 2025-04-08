import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from '@/lib/types/sessionTypes';
import { processAPIResponse } from '@/lib/utils/responseProcessor';
import { systemPrompt } from '@/lib/prompts/systemPrompt';

// Message types
export type MessageRole = 'user' | 'assistant' | 'system';

export interface ConversationMetadata {
  sessionId: string;
  startTime: number;
}

interface ChatStore {
  messages: Message[];
  addUserMessage: (content: string) => void;
  sendMessageToAPI: (content: string) => Promise<void>;
  clearMessages: () => void;
}

interface ChatState {
  messages: Message[];
  metadata: ConversationMetadata | null;
  addUserMessage: (content: string) => void;
  addAIMessage: (content: string) => void;
  updateMessageStatus: (id: string, status: 'loading' | 'error' | 'sent') => void;
  clearMessages: () => void;
  setMetadata: (metadata: ConversationMetadata) => void;
  // Placeholder for API call handler
  sendMessageToAPI: (content: string) => Promise<void>;
  loadSession: (sessionData: { messages: Message[]; metadata: ConversationMetadata | null }) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      metadata: null,

      addUserMessage: (content) => {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          role: 'user',
          content,
          timestamp: Date.now().toString(),
          status: 'sent',
        };
        set({ messages: [...get().messages, newMessage] });
      },

      addAIMessage: (content) => {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content,
          timestamp: Date.now().toString(),
          status: 'sent',
        };
        set({ messages: [...get().messages, newMessage] });
      },

      updateMessageStatus: (id, status) => {
        set({
          messages: get().messages.map((msg) =>
            msg.id === id ? { ...msg, status } : msg
          ),
        });
      },

      clearMessages: () => set({ messages: [] }),

      setMetadata: (metadata) => set({ metadata }),

      sendMessageToAPI: async (content) => {
        const tempId = crypto.randomUUID();
        const loadingMessage: Message = {
          id: tempId,
          role: 'assistant',
          content: '...',
          timestamp: Date.now().toString(),
          status: 'loading',
        };
        set({ messages: [...get().messages, loadingMessage] });

        try {
          const userMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content,
            timestamp: Date.now().toString(),
            status: 'sent',
          };

          const chatHistory = get().messages.filter(m => m.role && m.content);
          
          // Use the system prompt from the imported module and replace {{user_problem}} on first call
          const systemPromptContent = systemPrompt;
          const apiMessages = [
            { role: 'system', content: systemPromptContent },
            ...chatHistory.map(({ role, content }) => ({ role, content })),
            { role: 'user', content },
          ];

          const response = await fetch('/api/diagnose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: apiMessages }),
          });

          const data = await response.json();
          const processed = data?.response?.content || 'No response';

          set({
            messages: get().messages.map((msg) =>
              msg.id === tempId
                ? { ...msg, content: processed, status: 'sent' }
                : msg
            ),
          });
        } catch (error) {
          console.error('API error:', error);
          set({
            messages: get().messages.map((msg) =>
              msg.id === tempId ? { ...msg, status: 'error' } : msg
            ),
          });
        }
      },

      /**
       * Loads a previous session's messages and metadata into chat state.
       */
      loadSession: (sessionData: { messages: Message[]; metadata: ConversationMetadata | null }) => {
        set({
          messages: sessionData.messages,
          metadata: sessionData.metadata,
        });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);

export const useChat = () => {
  const {
    messages,
    metadata,
    addUserMessage,
    addAIMessage,
    updateMessageStatus,
    clearMessages,
    setMetadata,
    sendMessageToAPI,
    loadSession,
  } = useChatStore();

  return {
    messages,
    metadata,
    addUserMessage,
    addAIMessage,
    updateMessageStatus,
    clearMessages,
    setMetadata,
    sendMessageToAPI,
    loadSession,
  };
};
