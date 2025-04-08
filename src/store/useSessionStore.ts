import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session, Message } from '@/lib/types/sessionTypes';

import {
  saveSession as saveSessionToStorage,
  loadAllSessions as loadAllSessionsFromStorage,
  deleteSession as deleteSessionFromStorage,
  enforceSessionLimit,
} from '@/lib/services/storageService';
import {
  generateSessionId,
  generateTimestamp,
  generateSessionTitle,
  updateSessionMeta,
} from '@/lib/utils/sessionMetadataUtils';

interface SessionStore {
  currentSession: Session | null;
  sessionHistory: Session['meta'][];
  createNewSession: (title?: string) => string; // Return the new session ID
  saveCurrentSession: (messages: Message[]) => void; // Accept messages
  loadSession: (id: string) => void;
  deleteSession: (id: string) => void;
  updateSessionMessages: (messages: Message[]) => void;
}


export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessionHistory: [],

      createNewSession: (title) => {
        const id = generateSessionId(); // Generate ID
        const now = generateTimestamp();
        const meta = {
          id,
          title: title || generateSessionTitle(),
          createdAt: now,
          updatedAt: now,
        };
        const newSession: Session = { meta, messages: [] };
        set((state) => ({
          currentSession: newSession,
          sessionHistory: [meta, ...state.sessionHistory],
        }));
        saveSessionToStorage(newSession);
        enforceSessionLimit();
        return id; // Return the generated ID
      },

      saveCurrentSession: (messages) => { // Accept messages
        const { currentSession, sessionHistory } = get();
        if (!currentSession) return;
        // Ensure messages are in the correct format (using the existing utility if needed)
        // Note: Assuming 'messages' passed in are already in the correct 'Message[]' format.
        // If they come directly from useChatStore, they might need conversion first.
        const updatedMeta = updateSessionMeta(currentSession.meta, {}); // Just update timestamp
        const updatedSession = {
          ...currentSession,
          messages: messages, // Use passed messages
          meta: updatedMeta,
        };
        console.log('Saving session with latest messages:', updatedSession); // DEBUG
        set({ currentSession: updatedSession });
        set({
          sessionHistory: [
            updatedMeta,
            ...sessionHistory.filter((s) => s.id !== updatedMeta.id),
          ],
        });
        saveSessionToStorage(updatedSession);
        enforceSessionLimit();
      },

      loadSession: (id) => {
        const stored = window.localStorage.getItem(`session_${id}`);
        if (!stored) return;
        const session = JSON.parse(stored);
        console.log('Loaded session:', session); // DEBUG
        set({ currentSession: session });
      },

      deleteSession: (id) => {
        deleteSessionFromStorage(id);
        set((state) => ({
          sessionHistory: state.sessionHistory.filter((s) => s.id !== id),
          currentSession:
            state.currentSession?.meta.id === id ? null : state.currentSession,
        }));
      },

      // This function now only updates the zustand state. Saving should be triggered explicitly elsewhere (e.g., via saveCurrentSession).
      updateSessionMessages: (messages) => {
        set((state) => {
          if (!state.currentSession) return {};
          const updatedSession = {
            ...state.currentSession,
            messages, // Update messages in the store state
            meta: updateSessionMeta(state.currentSession.meta, {}), // Just update timestamp
          };
          // Removed direct saveSessionToStorage call here.
          // console.log('Updating session messages in store:', updatedSession); // DEBUG
          return { currentSession: updatedSession };
        });
        // Removed enforceSessionLimit() here - should likely be coupled with explicit saves.
      },
    }),
    {
      name: 'diagnosis-session-store',
      partialize: (state) => ({ sessionHistory: state.sessionHistory }),
    }
  )
);
