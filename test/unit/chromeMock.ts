import { vi } from 'vitest';

type Listener = (...a: never[]) => unknown;
export interface ChromeMock {
  data: Record<string, unknown>;
  listeners: { installed: Listener[]; message: Listener[] };
  badge: { text: string };
}

export function installChromeMock(initial: Record<string, unknown> = {}): ChromeMock {
  const m: ChromeMock = { data: { ...initial }, listeners: { installed: [], message: [] }, badge: { text: '' } };
  const delay = () => new Promise((r) => setTimeout(r, 0));
  (globalThis as unknown as { chrome: unknown }).chrome = {
    runtime: {
      id: 'self',
      onInstalled: { addListener: (f: Listener) => m.listeners.installed.push(f) },
      onStartup: { addListener: vi.fn() },
      onMessage: { addListener: (f: Listener) => m.listeners.message.push(f) },
    },
    storage: {
      local: {
        async get(key: string) { await delay(); return key in m.data ? { [key]: structuredClone(m.data[key]) } : {}; },
        async set(o: Record<string, unknown>) { await delay(); for (const [k, v] of Object.entries(o)) m.data[k] = structuredClone(v); },
      },
    },
    action: {
      async setBadgeText({ text }: { text: string }) { m.badge.text = text; },
      async setBadgeBackgroundColor() {},
    },
  };
  return m;
}
