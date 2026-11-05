import type { Settings } from '../core/types';
import { DEFAULT_SETTINGS, EMPTY_STATS, STORAGE_KEYS, type Stats } from './schema';
import { normalizeHost } from './hosts';

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : 0);
const numMap = (v: unknown): Record<string, number> => {
  const out: Record<string, number> = {};
  if (isRecord(v)) for (const [k, x] of Object.entries(v)) if (typeof x === 'number' && Number.isFinite(x)) out[k] = x;
  return out;
};

/** Defensive: coerces any stored value into a valid Settings. */
export function sanitizeSettings(v: unknown): Settings {
  const s = isRecord(v) ? v : {};
  return {
    enabled: typeof s.enabled === 'boolean' ? s.enabled : DEFAULT_SETTINGS.enabled,
    genericMode: typeof s.genericMode === 'boolean' ? s.genericMode : DEFAULT_SETTINGS.genericMode,
    debug: typeof s.debug === 'boolean' ? s.debug : DEFAULT_SETTINGS.debug,
    disabledHosts: Array.isArray(s.disabledHosts)
      ? [...new Set(s.disabledHosts.filter((h): h is string => typeof h === 'string').map(normalizeHost).filter(Boolean))]
      : [],
  };
}

export function sanitizeStats(v: unknown): Stats {
  const s = isRecord(v) ? v : {};
  const stats: Stats = {
    closedTotal: num(s.closedTotal),
    byDay: numMap(s.byDay),
    byAdapter: numMap(s.byAdapter),
    lastClosedAtByAdapter: numMap(s.lastClosedAtByAdapter),
    reopened: num(s.reopened),
    errors: num(s.errors),
  };
  if (typeof s.lastError === 'string') stats.lastError = s.lastError;
  return stats;
}

export async function getSettings(): Promise<Settings> {
  const r = await chrome.storage.local.get(STORAGE_KEYS.settings);
  return sanitizeSettings(r[STORAGE_KEYS.settings]);
}

export async function setSettings(s: Settings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.settings]: sanitizeSettings(s) });
}

export async function getStats(): Promise<Stats> {
  const r = await chrome.storage.local.get(STORAGE_KEYS.stats);
  return sanitizeStats(r[STORAGE_KEYS.stats] ?? EMPTY_STATS);
}

/** Local-time yyyy-mm-dd. */
export function dayKey(ms: number): string {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function todayCount(stats: Stats, now = Date.now()): number {
  return stats.byDay[dayKey(now)] ?? 0;
}
