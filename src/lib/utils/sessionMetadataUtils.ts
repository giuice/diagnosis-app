import { SessionMeta, Session, Message, SortOrder, SessionFilter } from '../types/sessionTypes';

// Generate a unique session ID
export function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Generate current ISO timestamp
export function generateTimestamp(): string {
  return new Date().toISOString();
}

// Generate a default session title based on timestamp
export function generateSessionTitle(): string {
  const now = new Date();
  return `Diagnosis ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

// Validate session metadata object
export function validateSessionMeta(meta: SessionMeta): boolean {
  return (
    typeof meta.id === 'string' && meta.id.length > 0 &&
    typeof meta.title === 'string' && meta.title.length > 0 &&
    typeof meta.createdAt === 'string' && !isNaN(Date.parse(meta.createdAt)) &&
    typeof meta.updatedAt === 'string' && !isNaN(Date.parse(meta.updatedAt))
  );
}

// Update session metadata timestamps and title
export function updateSessionMeta(meta: SessionMeta, updates: Partial<SessionMeta>): SessionMeta {
  return {
    ...meta,
    ...updates,
    updatedAt: generateTimestamp(),
  };
}

// Sort sessions by createdAt or updatedAt
export function sortSessions(sessions: Session[], key: 'createdAt' | 'updatedAt', order: SortOrder = 'desc'): Session[] {
  return sessions.slice().sort((a, b) => {
    const t1 = Date.parse(a.meta[key]);
    const t2 = Date.parse(b.meta[key]);
    return order === 'asc' ? t1 - t2 : t2 - t1;
  });
}

// Filter sessions by title substring and/or date range
export function filterSessions(sessions: Session[], filter: SessionFilter): Session[] {
  return sessions.filter(({ meta }) => {
    const titleMatch = filter.titleContains ? meta.title.toLowerCase().includes(filter.titleContains.toLowerCase()) : true;
    const createdAt = Date.parse(meta.createdAt);
    const fromOk = filter.dateFrom ? createdAt >= Date.parse(filter.dateFrom) : true;
    const toOk = filter.dateTo ? createdAt <= Date.parse(filter.dateTo) : true;
    return titleMatch && fromOk && toOk;
  });
}

// Search sessions by keyword in messages or title
export function searchSessions(sessions: Session[], keyword: string): Session[] {
  const lower = keyword.toLowerCase();
  return sessions.filter(({ meta, messages }) =>
    meta.title.toLowerCase().includes(lower) ||
    messages.some((msg: Message) => msg.content.toLowerCase().includes(lower))
  );
}

// Format ISO timestamp to locale string
export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

// Truncate title if too long
export function formatTitle(title: string, maxLength = 50): string {
  return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
}

// Calculate and format session duration
export function formatDuration(startIso: string, endIso: string): string {
  const diffMs = Date.parse(endIso) - Date.parse(startIso);
  const seconds = Math.floor(diffMs / 1000) % 60;
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${hours}h ${minutes}m ${seconds}s`;
}

// Format relative time (e.g., '2 days ago')
export function formatRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = Date.parse(isoString);
  const diffMs = now - then;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}
