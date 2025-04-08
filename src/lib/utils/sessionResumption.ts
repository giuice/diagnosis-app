// Session Resumption Utilities

import type { Session } from '@/lib/types/sessionTypes';
import type { ConversationMetadata } from '@/store/useChatStore';

/**
 * Extracts session data from stored session object.
 */
export function extractSessionData(session: Session) {
  return {
    messages: session.messages,
    metadata: session.meta,
  };
}

/**
 * Transforms stored session data into chat-compatible format.
 */
export function transformSessionForChat(sessionData: ReturnType<typeof extractSessionData>) {
  const meta = sessionData.metadata;
  const convertedMeta: ConversationMetadata = {
    sessionId: meta.id ?? '',
    startTime: new Date(meta.createdAt).getTime(),
  };
  return {
    messages: sessionData.messages,
    metadata: convertedMeta,
  };
}

/**
 * Validates if a session is resumable.
 */
export function isSessionResumable(session: Session): boolean {
  return Array.isArray(session.messages) && session.messages.length > 0;
}

/**
 * Resumes a saved session by validating, transforming, and loading it into chat state.
 */
export async function resumeSession(params: {
    session: Session;
    loadSession: (data: { messages: any[]; metadata: ConversationMetadata | null }) => void;
    hasActiveSessionContent: boolean;
  }): Promise<void> {
    const { session, loadSession, hasActiveSessionContent } = params;
  
    if (hasActiveSessionContent) {
      const confirm = window.confirm('You have an active session. Resume will overwrite current chat. Continue?');
      if (!confirm) return;
    }
  
    if (!isSessionResumable(session)) {
      alert('This session cannot be resumed.');
      return;
    }
  
    try {
      const extracted = extractSessionData(session);
      const transformed = transformSessionForChat(extracted);
      loadSession(transformed);
  
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-scroll-container');
        if (chatContainer) {
          chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
        }
        const input = document.querySelector('textarea, input[type="text"]');
        if (input) {
          (input as HTMLElement).focus();
        }
      }, 50);
    } catch (error) {
      console.error('Failed to resume session:', error);
      alert('Error resuming session. See console for details.');
    }
  }