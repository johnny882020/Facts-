import type { Settings } from '../core/types';

export const DEFAULT_SETTINGS: Settings = { enabled: true, disabledHosts: [], genericMode: true, debug: false };

/** chrome.storage.local keys. Settings: written by popup only. Stats: written ONLY by the background worker. */
export const STORAGE_KEYS = { settings: 'settings', stats: 'stats' } as const;

export interface Stats {
  closedTotal: number;
  byDay: Record<string, number>; // yyyy-mm-dd (local time) -> count, pruned to last 30 days
  byAdapter: Record<string, number>;
  lastClosedAtByAdapter: Record<string, number>;
  reopened: number; // local-only false-positive proxy
  errors: number;
  lastError?: string;
}
export const EMPTY_STATS: Stats = { closedTotal: 0, byDay: {}, byAdapter: {}, lastClosedAtByAdapter: {}, reopened: 0, errors: 0 };

/** content -> background messages (chrome.runtime.sendMessage). Fire-and-forget; never block the page. */
export type Message =
  | { type: 'closed'; adapter: string; host: string; signature: string }
  | { type: 'reopened'; host: string; signature: string }
  | { type: 'error'; message: string };
