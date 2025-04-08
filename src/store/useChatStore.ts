import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message } from '@/lib/types/sessionTypes';

// Message types
export type MessageRole = 'user' | 'assistant' | 'system';

// export interface ChatMessage {
//   id: string;
//   role: MessageRole;
//   content: string;
//   timestamp: number;
//   status?: 'loading' | 'error' | 'sent';
// }

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
        // Placeholder for API integration
        // Set loading message
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
          // TODO: Replace with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Simulate AI response
          const aiResponse = 'This is a simulated AI response.';
          set({
            messages: get().messages.map((msg) =>
              msg.id === tempId
                ? { ...msg, content: aiResponse, status: 'sent' }
                : msg
            ),
          });
        } catch (error) {
          set({
            messages: get().messages.map((msg) =>
              msg.id === tempId ? { ...msg, status: 'error' } : msg
            ),
          });
        }
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
  };
};
