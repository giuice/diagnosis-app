import type { Session } from '@/lib/types/sessionTypes';
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const saveToStorage = (key: string, value: unknown): boolean => {
  if (!isLocalStorageAvailable()) return false;
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error('Storage save error:', error);
    return false;
  }
};

export const loadFromStorage = <T>(key: string): T | null => {
  if (!isLocalStorageAvailable()) return null;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Storage load error:', error);
    return null;
  }
};

export const removeFromStorage = (key: string): boolean => {
  if (!isLocalStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage remove error:', error);
    return false;
  }
};

export const serializeSession = (session: Session): string | null => {
  try {
    return JSON.stringify(session);
  } catch (error) {
    console.error('Session serialization error:', error);
    return null;
  }
};

export const deserializeSession = (data: string): Session | null => {
  try {
    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== 'object' || !parsed.meta || !parsed.messages) {
      console.warn('Invalid session data format');
      return null;
    }
    return parsed as Session;
  } catch (error) {
    console.error('Session deserialization error:', error);
    return null;
  }
};

const SESSION_PREFIX = 'session_';
const MAX_SESSIONS = 100; // adjustable limit

export const saveSession = (session: Session): boolean => {
  const serialized = serializeSession(session);
  if (!serialized) return false;
  try {
    window.localStorage.setItem(`${SESSION_PREFIX}${session.meta.id}`, serialized);
    return true;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
};

export const loadAllSessions = (): Session[] => {
  const sessions: Session[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(SESSION_PREFIX)) {
        const data = window.localStorage.getItem(key);
        if (!data) continue;
        const session = deserializeSession(data);
        if (session) sessions.push(session);
      }
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
  return sessions;
};

export const deleteSession = (sessionId: string): boolean => {
  try {
    window.localStorage.removeItem(`${SESSION_PREFIX}${sessionId}`);
    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    return false;
  }
};

export const enforceSessionLimit = (): void => {
  const sessions = loadAllSessions();
  if (sessions.length <= MAX_SESSIONS) return;
  // Sort by updatedAt ascending (oldest first)
  sessions.sort((a, b) => new Date(a.meta.updatedAt).getTime() - new Date(b.meta.updatedAt).getTime());
  const excess = sessions.length - MAX_SESSIONS;
  for (let i = 0; i < excess; i++) {
    deleteSession(sessions[i].meta.id);
  }
};

export const getStorageUsage = (): number => {
  let total = 0;
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key) continue;
      const value = window.localStorage.getItem(key);
      if (value) {
        total += key.length + value.length;
      }
    }
  } catch (error) {
    console.error('Error calculating storage usage:', error);
  }
  return total;
};

export const pruneOldSessions = (maxSessions = MAX_SESSIONS): void => {
  const sessions = loadAllSessions();
  if (sessions.length <= maxSessions) return;
  sessions.sort((a, b) => new Date(a.meta.updatedAt).getTime() - new Date(b.meta.updatedAt).getTime());
  const excess = sessions.length - maxSessions;
  for (let i = 0; i < excess; i++) {
    deleteSession(sessions[i].meta.id);
  }
};

// Placeholder for future compression implementation
export const compressSessionData = (data: string): string => {
  // TODO: Implement compression (e.g., LZ-string)
  return data;
};

export const decompressSessionData = (data: string): string => {
  // TODO: Implement decompression
  return data;
};
