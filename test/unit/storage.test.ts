import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from '../../src/shared/schema';
import { dayKey, getSettings, getStats, sanitizeSettings, sanitizeStats, setSettings, todayCount } from '../../src/shared/storage';
import { installChromeMock } from './chromeMock';

describe('storage', () => {
  beforeEach(() => { installChromeMock(); });

  it('returns defaults when empty', async () => {
    expect(await getSettings()).toEqual(DEFAULT_SETTINGS);
    expect((await getStats()).closedTotal).toBe(0);
  });
  it('round-trips settings', async () => {
    await setSettings({ ...DEFAULT_SETTINGS, enabled: false, disabledHosts: ['A.com'] });
    expect(await getSettings()).toEqual({ ...DEFAULT_SETTINGS, enabled: false, disabledHosts: ['a.com'] });
  });
  it('sanitizes garbage', () => {
    expect(sanitizeSettings('x')).toEqual(DEFAULT_SETTINGS);
    expect(sanitizeSettings({ enabled: 'no', disabledHosts: [1, 'B.com', 'b.com', ''], genericMode: false }))
      .toEqual({ ...DEFAULT_SETTINGS, disabledHosts: ['b.com'], genericMode: false });
    const s = sanitizeStats({ closedTotal: -1, byDay: { a: 1, b: 'x' }, errors: 2, lastError: 5 });
    expect(s).toMatchObject({ closedTotal: 0, byDay: { a: 1 }, errors: 2 });
    expect(s.lastError).toBeUndefined();
  });
  it('dayKey is local yyyy-mm-dd and todayCount reads it', () => {
    const t = new Date(2026, 0, 5, 12).getTime();
    expect(dayKey(t)).toBe('2026-01-05');
    expect(todayCount(sanitizeStats({ byDay: { '2026-01-05': 4 } }), t)).toBe(4);
    expect(todayCount(sanitizeStats({}), t)).toBe(0);
  });
});
