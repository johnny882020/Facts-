import type { Settings } from '../core/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS, type Message, type Stats } from '../shared/schema';
import { dayKey, getStats, sanitizeSettings, sanitizeStats, todayCount } from '../shared/storage';

const KEEP_DAYS = 30;
const MAX_STR = 200;

export function pruneByDay(byDay: Record<string, number>, now: number): Record<string, number> {
  const d = new Date(now);
  d.setDate(d.getDate() - (KEEP_DAYS - 1));
  const cutoff = dayKey(d.getTime());
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(byDay)) if (k >= cutoff) out[k] = v;
  return out;
}

/** Pure reducer: applies one message to stats. */
export function applyMessage(stats: Stats, msg: Message, now: number): Stats {
  const next: Stats = { ...stats, byDay: { ...stats.byDay }, byAdapter: { ...stats.byAdapter }, lastClosedAtByAdapter: { ...stats.lastClosedAtByAdapter } };
  switch (msg.type) {
    case 'closed': {
      const a = String(msg.adapter).slice(0, 50);
      const k = dayKey(now);
      next.closedTotal += 1;
      next.byDay[k] = (next.byDay[k] ?? 0) + 1;
      next.byAdapter[a] = (next.byAdapter[a] ?? 0) + 1;
      next.lastClosedAtByAdapter[a] = now;
      break;
    }
    case 'reopened':
      next.reopened += 1;
      break;
    case 'error':
      next.errors += 1;
      next.lastError = String(msg.message).slice(0, MAX_STR);
      break;
  }
  next.byDay = pruneByDay(next.byDay, now);
  return next;
}

export function isMessage(m: unknown): m is Message {
  if (typeof m !== 'object' || m === null) return false;
  const t = (m as { type?: unknown }).type;
  return t === 'closed' || t === 'reopened' || t === 'error';
}

let queue: Promise<void> = Promise.resolve();

/** Serialized read-modify-write; never rejects. */
export function recordMessage(msg: Message, now = Date.now()): Promise<void> {
  const run = async () => {
    const stats = await getStats();
    const next = applyMessage(stats, msg, now);
    await chrome.storage.local.set({ [STORAGE_KEYS.stats]: next });
    await updateBadge(next, now);
  };
  queue = queue.then(run).catch(() => undefined);
  return queue;
}

export async function updateBadge(stats: Stats, now = Date.now()): Promise<void> {
  try {
    const n = todayCount(stats, now);
    await chrome.action.setBadgeText({ text: n > 0 ? (n > 999 ? '999+' : String(n)) : '' });
    await chrome.action.setBadgeBackgroundColor({ color: '#3b5bdb' });
  } catch {
    /* badge is cosmetic */
  }
}

async function refreshBadge(): Promise<void> {
  try {
    await updateBadge(sanitizeStats((await chrome.storage.local.get(STORAGE_KEYS.stats))[STORAGE_KEYS.stats]));
  } catch {
    /* ignore */
  }
}

async function onInstalled(): Promise<void> {
  try {
    const r = await chrome.storage.local.get(STORAGE_KEYS.settings);
    const existing = r[STORAGE_KEYS.settings];
    const settings: Settings = existing === undefined ? { ...DEFAULT_SETTINGS } : sanitizeSettings(existing);
    await chrome.storage.local.set({ [STORAGE_KEYS.settings]: settings });
  } catch {
    /* ignore */
  }
  await refreshBadge();
}

export function register(): void {
  chrome.runtime.onInstalled.addListener(() => void onInstalled());
  chrome.runtime.onStartup?.addListener(() => void refreshBadge());
  chrome.runtime.onMessage.addListener((msg: unknown, sender) => {
    // Only accept messages from our own content scripts / pages.
    if (sender?.id !== undefined && sender.id !== chrome.runtime.id) return false;
    if (isMessage(msg)) void recordMessage(msg);
    return false;
  });
}

register();
