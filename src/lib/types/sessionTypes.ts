export interface SessionMeta {
  id: string;
  title: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string; // ISO string
  status?: 'loading' | 'error' | 'sent';
  isLoading?: boolean;
}

export interface Session {
  meta: SessionMeta;
  messages: Message[];
}

// Optional: Metadata operation types
export type SortOrder = 'asc' | 'desc';

export interface SessionFilter {
  titleContains?: string;
  dateFrom?: string; // ISO timestamp
  dateTo?: string;   // ISO timestamp
}
