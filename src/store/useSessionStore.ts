import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SessionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SessionMeta {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  meta: SessionMeta;
  messages: SessionMessage[];
}

interface SessionStore {
  currentSession: Session | null;
  sessionHistory: SessionMeta[];
  createNewSession: (title?: string) => void;
  saveCurrentSession: () => void;
  loadSession: (id: string) => void;
  deleteSession: (id: string) => void;
  updateSessionMessages: (messages: SessionMessage[]) => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      sessionHistory: [],

      createNewSession: (title = 'New Diagnosis') => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const meta = { id, title, createdAt: now, updatedAt: now };
        const newSession: Session = { meta, messages: [] };
        set((state) => ({
          currentSession: newSession,
          sessionHistory: [meta, ...state.sessionHistory],
        }));
      },

      saveCurrentSession: () => {
        const { currentSession, sessionHistory } = get();
        if (!currentSession) return;
        const updatedMeta = {
          ...currentSession.meta,
          updatedAt: new Date().toISOString(),
        };
        const updatedSession = {
          ...currentSession,
          meta: updatedMeta,
        };
        set({ currentSession: updatedSession });
        set({
          sessionHistory: [
            updatedMeta,
            ...sessionHistory.filter((s) => s.id !== updatedMeta.id),
          ],
        });
      },

      loadSession: (id) => {
        const stored = localStorage.getItem(`session_${id}`);
        if (!stored) return;
        const session: Session = JSON.parse(stored);
        set({ currentSession: session });
      },

      deleteSession: (id) => {
        localStorage.removeItem(`session_${id}`);
        set((state) => ({
          sessionHistory: state.sessionHistory.filter((s) => s.id !== id),
          currentSession:
            state.currentSession?.meta.id === id ? null : state.currentSession,
        }));
      },

      updateSessionMessages: (messages) => {
        set((state) => {
          if (!state.currentSession) return {};
          const updatedSession = {
            ...state.currentSession,
            messages,
            meta: {
              ...state.currentSession.meta,
              updatedAt: new Date().toISOString(),
            },
          };
          localStorage.setItem(
            `session_${updatedSession.meta.id}`,
            JSON.stringify(updatedSession)
          );
          return { currentSession: updatedSession };
        });
      },
    }),
    {
      name: 'diagnosis-session-store',
      partialize: (state) => ({ sessionHistory: state.sessionHistory }),
    }
  )
);
