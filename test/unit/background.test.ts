import { beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS, DEFAULT_SETTINGS, EMPTY_STATS, type Stats } from '../../src/shared/schema';
import { installChromeMock, type ChromeMock } from './chromeMock';

const now = new Date(2026, 5, 15, 12).getTime();
let mock: ChromeMock;
let bg: typeof import('../../src/background/index');

beforeEach(async () => {
  vi.resetModules();
  mock = installChromeMock();
  bg = await import('../../src/background/index');
});

const stats = () => mock.data[STORAGE_KEYS.stats] as Stats;

describe('applyMessage', () => {
  it('counts closed, reopened, errors', () => {
    let s = bg.applyMessage(EMPTY_STATS, { type: 'closed', adapter: 'yt', host: 'h', signature: 's' }, now);
    s = bg.applyMessage(s, { type: 'reopened', host: 'h', signature: 's' }, now);
    s = bg.applyMessage(s, { type: 'error', message: 'x'.repeat(500) }, now);
    expect(s.closedTotal).toBe(1);
    expect(s.byAdapter).toEqual({ yt: 1 });
    expect(s.lastClosedAtByAdapter.yt).toBe(now);
    expect(s.reopened).toBe(1);
    expect(s.errors).toBe(1);
    expect(s.lastError?.length).toBe(200);
    expect(EMPTY_STATS.closedTotal).toBe(0); // not mutated
  });
  it('prunes byDay to 30 days', () => {
    const old = { ...EMPTY_STATS, byDay: { '2026-01-01': 5, '2026-05-17': 2, '2026-05-16': 1 } };
    const s = bg.applyMessage(old, { type: 'reopened', host: 'h', signature: 's' }, now);
    expect(Object.keys(s.byDay).sort()).toEqual(['2026-05-17']);
  });
});

describe('listeners', () => {
  it('sets default settings on install, keeps existing', async () => {
    await (mock.listeners.installed[0] as () => unknown)();
    await new Promise((r) => setTimeout(r, 20));
    expect(mock.data[STORAGE_KEYS.settings]).toEqual(DEFAULT_SETTINGS);
    mock.data[STORAGE_KEYS.settings] = { ...DEFAULT_SETTINGS, enabled: false };
    (mock.listeners.installed[0] as () => unknown)();
    await new Promise((r) => setTimeout(r, 20));
    expect((mock.data[STORAGE_KEYS.settings] as { enabled: boolean }).enabled).toBe(false);
  });

  it('serializes concurrent messages without losing updates and sets badge', async () => {
    const onMsg = mock.listeners.message[0] as (m: unknown, s: unknown) => boolean;
    for (let i = 0; i < 25; i++) onMsg({ type: 'closed', adapter: 'a', host: 'h', signature: 's' }, { id: 'self' });
    await bg.recordMessage({ type: 'reopened', host: 'h', signature: 's' });
    expect(stats().closedTotal).toBe(25);
    expect(stats().reopened).toBe(1);
    expect(mock.badge.text).toBe('25');
  });

  it('ignores invalid messages and foreign senders', async () => {
    const onMsg = mock.listeners.message[0] as (m: unknown, s: unknown) => boolean;
    onMsg({ type: 'nope' }, { id: 'self' });
    onMsg(null, { id: 'self' });
    onMsg({ type: 'closed', adapter: 'a', host: 'h', signature: 's' }, { id: 'other' });
    await bg.recordMessage({ type: 'reopened', host: 'h', signature: 's' });
    expect(stats().closedTotal).toBe(0);
  });
});
