// Storage Utilities for Diagnosis App

// Type definitions
export interface SessionData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: any[];
  metadata?: Record<string, any>;
}

// Check if localStorage is available
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// In-memory fallback storage
const memoryStorage = new Map<string, string>();

function getStorage(): Storage | Map<string, string> {
  if (isLocalStorageAvailable()) {
    return window.localStorage;
  } else {
    return memoryStorage;
  }
}

// Enhanced safe get item
export function safeGetItem<T = unknown>(key: string): T | null {
  try {
    const storage = getStorage();
    const item = storage instanceof Map ? storage.get(key) : storage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

// Enhanced safe set item
export function safeSetItem<T = unknown>(key: string, value: T): boolean {
  try {
    const storage = getStorage();
    const serialized = JSON.stringify(value);
    if (storage instanceof Map) {
      storage.set(key, serialized);
    } else {
      storage.setItem(key, serialized);
    }
    return true;
  } catch {
    return false;
  }
}

// Enhanced safe remove item
export function safeRemoveItem(key: string): boolean {
  try {
    const storage = getStorage();
    if (storage instanceof Map) {
      storage.delete(key);
    } else {
      storage.removeItem(key);
    }
    return true;
  } catch {
    return false;
  }
}

// Safe get item
export function getItem<T = unknown>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}

// Safe set item
export function setItem<T = unknown>(key: string, value: T): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// Safe remove item
export function removeItem(key: string): boolean {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

// Storage size calculation (approximate)
export function getStorageUsage(): number {
  try {
    const storage = getStorage();
    let total = 0;
    if (storage instanceof Map) {
      for (const value of storage.values()) {
        total += value.length;
      }
    } else {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;
        const value = storage.getItem(key);
        if (value) total += value.length;
      }
    }
    return total;
  } catch {
    return 0;
  }
}

// Quota monitoring (basic heuristic)
export function isQuotaExceeded(thresholdBytes = 4 * 1024 * 1024): boolean {
  const usage = getStorageUsage();
  return usage >= thresholdBytes;
}

// Minimal compression using Base64 (placeholder for real compression)
export function compressData(data: any): string {
  try {
    const json = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(json)));
  } catch {
    return '';
  }
}

export function decompressData(data: string): any {
  try {
    const json = decodeURIComponent(escape(atob(data)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Simple checksum for data integrity
function simpleChecksum(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function validateData(data: any, checksum?: number): boolean {
  try {
    const json = JSON.stringify(data);
    if (checksum === undefined) return true;
    return simpleChecksum(json) === checksum;
  } catch {
    return false;
  }
}

export function generateChecksum(data: any): number {
  try {
    const json = JSON.stringify(data);
    return simpleChecksum(json);
  } catch {
    return 0;
  }
}

// Placeholder: Batch operations
export function batchSet(items: Record<string, any>): void {
  Object.entries(items).forEach(([key, value]) => {
    setItem(key, value);
  });
}

const CURRENT_DATA_VERSION = '1.0';

export function getDataVersion(): string {
  try {
    const version = window.localStorage.getItem('__data_version__');
    return version || '0.0';
  } catch {
    return '0.0';
  }
}

export function setDataVersion(version: string): void {
  try {
    window.localStorage.setItem('__data_version__', version);
  } catch {
    // ignore
  }
}

export function migrateDataIfNeeded(): void {
  const currentVersion = getDataVersion();
  if (currentVersion === CURRENT_DATA_VERSION) return;

  // Example migration logic
  if (currentVersion === '0.0') {
    // Perform migration from initial version
    // e.g., transform old data formats
  }

  // Future migrations can be chained here

  setDataVersion(CURRENT_DATA_VERSION);
}

export function migrateData(version: string): void {
  // TODO: Implement migration logic
}

export function repairData(): void {
  // Attempt to fix corrupted or partial data
  // Placeholder: implement repair logic as needed
}

// Placeholder: Storage cleanup
export function clearAllStorage(): void {
  window.localStorage.clear();
}

// Placeholder: Prioritized data pruning
export function pruneOldSessions(): void {
  // TODO: Implement pruning logic
}

export function exportData(): string {
  try {
    const storage = getStorage();
    const exportObj: Record<string, any> = {};
    if (storage instanceof Map) {
      for (const [key, value] of storage.entries()) {
        exportObj[key] = value;
      }
    } else {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key) continue;
        const value = storage.getItem(key);
        exportObj[key] = value;
      }
    }
    return JSON.stringify(exportObj);
  } catch {
    return '';
  }
}

export function importData(dataString: string): void {
  try {
    const data = JSON.parse(dataString);
    Object.entries(data).forEach(([key, value]) => {
      const storage = getStorage();
      if (storage instanceof Map) {
        storage.set(key, value as string);
      } else {
        storage.setItem(key, value as string);
      }
    });
  } catch {
    // ignore errors
  }
}

export function archiveSession(sessionId: string): void {
  // Placeholder: implement archiving logic (e.g., move to separate storage key)
}
