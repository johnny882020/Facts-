import type { Adapter, Settings } from '../core/types';
import { allAdapters } from '../adapters/index';
import { DEFAULT_SETTINGS, STORAGE_KEYS, type Message } from '../shared/schema';
import { sanitizeSettings } from '../shared/storage';
import { Scanner } from './scanner';

function send(msg: Message): void {
  try {
    const p = chrome.runtime.sendMessage(msg) as unknown;
    if (p && typeof (p as Promise<unknown>).catch === 'function') (p as Promise<unknown>).catch(() => undefined);
  } catch {
    /* extension context invalidated or no receiver */
  }
}

function describe(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function main(): void {
  // Popup asks the top frame for its hostname (the popup has no "tabs" permission to read tab.url).
  if (window === window.top) {
    try {
      chrome.runtime.onMessage.addListener((m: unknown, _s, reply) => {
        if (typeof m === 'object' && m !== null && (m as { type?: unknown }).type === 'getHost') reply({ host: location.hostname });
        return false;
      });
    } catch {
      /* ignore */
    }
  }
  let settings: Settings = { ...DEFAULT_SETTINGS };
  let scanner: Scanner | null = null;
  let url: URL;
  try {
    url = new URL(location.href);
  } catch {
    return;
  }
  // about:blank / srcdoc frames inherit the parent's origin; use the parent's URL when we can't read our own host.
  if (!url.hostname) {
    try {
      url = new URL(document.referrer || (window.parent !== window ? window.parent.location.href : location.href));
    } catch {
      /* keep url */
    }
  }
  const adapters: Adapter[] = allAdapters.filter((a) => {
    try {
      return a.matches(url);
    } catch {
      return false;
    }
  });
  if (adapters.length === 0) return;
  const host = url.hostname || location.hostname;

  const start = () => {
    if (scanner) return;
    scanner = new Scanner({
      adapters,
      getSettings: () => settings,
      onClosed: (t, signature) => send({ type: 'closed', adapter: t.adapter, host, signature }),
      onReopened: (signature) => send({ type: 'reopened', host, signature }),
      onError: (e) => send({ type: 'error', message: describe(e) }),
    });
    scanner.start();
  };

  try {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes[STORAGE_KEYS.settings]) return;
      settings = sanitizeSettings(changes[STORAGE_KEYS.settings]?.newValue);
    });
    chrome.storage.local
      .get(STORAGE_KEYS.settings)
      .then((r) => {
        settings = sanitizeSettings(r[STORAGE_KEYS.settings]);
        start();
      })
      .catch((e) => send({ type: 'error', message: describe(e) }));
  } catch (e) {
    send({ type: 'error', message: describe(e) });
  }
}

try {
  main();
} catch (e) {
  send({ type: 'error', message: describe(e) });
}
