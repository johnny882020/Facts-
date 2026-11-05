// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Scanner } from '../../src/content/scanner';
import { UserGestureTracker } from '../../src/content/gestures';
import type { Adapter, CloseTarget, GuardCheck, Settings } from '../../src/core/types';
import { MAX_ATTEMPTS_PER_SIGNATURE, MAX_CLICKS_PER_MINUTE_PER_FRAME, MAX_CONSECUTIVE_ERRORS, CIRCUIT_BREAKER_PAUSE_MS, REOPEN_WINDOW_MS } from '../../src/core/constants';

const settings: Settings = { enabled: true, disabledHosts: [], genericMode: true, debug: false };

function setup(opts: { find?: () => CloseTarget[]; check?: GuardCheck; trusted?: boolean; settings?: Settings } = {}) {
  let t = 1_000_000;
  const clock = { now: () => t, advance: (ms: number) => { t += ms; } };
  const buttons: HTMLElement[] = [];
  const mk = (label = 'Close'): HTMLElement => {
    const b = document.createElement('button');
    b.textContent = label;
    document.body.appendChild(b);
    buttons.push(b);
    return b;
  };
  const adapter: Adapter = {
    id: 'stub', matches: () => true,
    find: opts.find ?? (() => buttons.filter((b) => b.isConnected).map((control) => ({ adapter: 'stub', trusted: opts.trusted ?? true, overlay: null, control, reason: 'r' }))),
  };
  const deps = { onClosed: vi.fn(), onReopened: vi.fn(), onError: vi.fn() };
  const check = vi.fn<GuardCheck>(opts.check ?? (() => ({ allow: true, rule: 'ok' })));
  const gestures = new UserGestureTracker(clock.now);
  const sc = new Scanner({ adapters: [adapter], getSettings: () => opts.settings ?? settings, now: clock.now, ...deps }, { check, gestures });
  return { sc, clock, mk, deps, check, gestures, buttons };
}

beforeEach(() => { document.body.innerHTML = ''; });

describe('Scanner', () => {
  it('clicks once when allowed and never re-clicks the same element', () => {
    const s = setup();
    const b = s.mk();
    const click = vi.fn();
    b.addEventListener('click', click);
    s.sc.scan(); s.sc.scan();
    expect(click).toHaveBeenCalledTimes(1);
    expect(s.deps.onClosed).toHaveBeenCalledTimes(1);
    expect(s.deps.onClosed.mock.calls[0]?.[1]).toBe('stub||close|button');
  });
  it('does not click when guard denies', () => {
    const s = setup({ check: () => ({ allow: false, rule: 'x' }) });
    const click = vi.fn();
    s.mk().addEventListener('click', click);
    s.sc.scan();
    expect(click).not.toHaveBeenCalled();
  });
  it('passes gesture, firstSeen and interaction to guard', () => {
    const s = setup();
    s.mk();
    s.sc.scan();
    const input = s.check.mock.calls[0]?.[0];
    expect(input?.firstSeenAt).toBe(1_000_000);
    expect(input?.lastGestureAt).toBe(0);
    expect(input?.userInteractedInOverlay).toBe(false);
    expect(input?.hostname).toBe(location.hostname);
  });
  it('skips when document hidden or disabled; generic skipped when genericMode off', () => {
    const s = setup();
    s.mk();
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    s.sc.scan();
    expect(s.check).not.toHaveBeenCalled();
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    const d = setup({ settings: { ...settings, enabled: false } });
    d.mk(); d.sc.scan();
    expect(d.check).not.toHaveBeenCalled();
    const g = setup({ trusted: false, settings: { ...settings, genericMode: false } });
    g.mk(); g.sc.scan();
    expect(g.check).not.toHaveBeenCalled();
  });
  it('caps attempts per signature', () => {
    const s = setup();
    for (let i = 0; i < MAX_ATTEMPTS_PER_SIGNATURE + 2; i++) { s.mk(); s.sc.scan(); }
    expect(s.deps.onClosed).toHaveBeenCalledTimes(MAX_ATTEMPTS_PER_SIGNATURE);
  });
  it('caps clicks per minute and recovers after a minute', () => {
    const s = setup();
    for (let i = 0; i < MAX_CLICKS_PER_MINUTE_PER_FRAME + 3; i++) s.mk(`Close ${i}`);
    s.sc.scan();
    expect(s.deps.onClosed).toHaveBeenCalledTimes(MAX_CLICKS_PER_MINUTE_PER_FRAME);
    s.clock.advance(61_000);
    s.sc.scan();
    expect(s.deps.onClosed).toHaveBeenCalledTimes(MAX_CLICKS_PER_MINUTE_PER_FRAME + 3);
  });
  it('detects reopened signatures within the window only', () => {
    const s = setup();
    s.mk(); s.sc.scan();
    s.clock.advance(1000);
    s.mk(); s.sc.scan();
    expect(s.deps.onReopened).toHaveBeenCalledWith('stub||close|button');
    const s2 = setup();
    s2.mk(); s2.sc.scan();
    s2.clock.advance(REOPEN_WINDOW_MS + 1);
    s2.mk(); s2.sc.scan();
    expect(s2.deps.onReopened).not.toHaveBeenCalled();
  });
  it('circuit breaker pauses after consecutive errors', () => {
    const s = setup({ check: () => { throw new Error('x'); } });
    for (let i = 0; i < MAX_CONSECUTIVE_ERRORS + 3; i++) s.mk(`c${i}`);
    s.sc.scan();
    expect(s.deps.onError).toHaveBeenCalledTimes(MAX_CONSECUTIVE_ERRORS);
    s.sc.scan();
    expect(s.deps.onError).toHaveBeenCalledTimes(MAX_CONSECUTIVE_ERRORS);
    s.clock.advance(CIRCUIT_BREAKER_PAUSE_MS + 1);
    s.sc.scan();
    expect(s.deps.onError.mock.calls.length).toBeGreaterThan(MAX_CONSECUTIVE_ERRORS);
  });
  it('adapter find errors are reported not thrown', () => {
    const s = setup({ find: () => { throw new Error('f'); } });
    expect(() => s.sc.scan()).not.toThrow();
    expect(s.deps.onError).toHaveBeenCalled();
  });
  it('rescans on mutation (throttled) and finds open shadow roots', async () => {
    vi.useFakeTimers();
    try {
      const host = document.createElement('div');
      document.body.appendChild(host);
      const sr = host.attachShadow({ mode: 'open' });
      const seen: ParentNode[] = [];
      const adapter: Adapter = { id: 'a', matches: () => true, find: (r) => { seen.push(r); return []; } };
      const sc = new Scanner({ adapters: [adapter], getSettings: () => settings, onClosed: vi.fn(), onReopened: vi.fn(), onError: vi.fn() }, { check: () => ({ allow: false, rule: 'x' }) });
      sc.start();
      await vi.advanceTimersByTimeAsync(300);
      expect(seen).toContain(sr);
      const before = seen.length;
      document.body.appendChild(document.createElement('p'));
      document.body.appendChild(document.createElement('p'));
      await vi.advanceTimersByTimeAsync(300);
      expect(seen.length).toBeGreaterThan(before);
      sc.stop();
      const after = seen.length;
      document.body.appendChild(document.createElement('p'));
      await vi.advanceTimersByTimeAsync(600);
      expect(seen.length).toBe(after);
    } finally { vi.useRealTimers(); }
  });
});

describe('UserGestureTracker', () => {
  it('records only trusted events and subtree interaction', () => {
    const g = new UserGestureTracker(() => 42);
    g.start(document);
    const el = document.createElement('div');
    document.body.appendChild(el);
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(g.lastGestureAt).toBe(0);
    expect(g.interactedWithin(el)).toBe(false);
    // jsdom cannot create trusted events; invoke handler path via a forged isTrusted
    (g as unknown as { handler: (e: unknown) => void }).handler({ isTrusted: true, composedPath: () => [el, document.body, document] });
    expect(g.lastGestureAt).toBe(42);
    expect(g.interactedWithin(el)).toBe(true);
    expect(g.interactedWithin(document.body)).toBe(true);
    g.stop();
  });
});
