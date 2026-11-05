import { describe, expect, it } from 'vitest';
import { addHost, hostFromUrl, isHostDisabled, normalizeHost, removeHost } from '../../src/shared/hosts';

describe('hosts', () => {
  it('normalizes', () => expect(normalizeHost(' .Example.COM. ')).toBe('example.com'));
  it('matches exact and subdomains only', () => {
    expect(isHostDisabled('example.com', ['example.com'])).toBe(true);
    expect(isHostDisabled('a.b.example.com', ['example.com'])).toBe(true);
    expect(isHostDisabled('notexample.com', ['example.com'])).toBe(false);
    expect(isHostDisabled('example.com', ['www.example.com'])).toBe(false);
    expect(isHostDisabled('', ['example.com'])).toBe(false);
    expect(isHostDisabled('example.com', ['', ' '])).toBe(false);
  });
  it('adds without duplicates and removes', () => {
    expect(addHost(['a.com'], 'A.com')).toEqual(['a.com']);
    expect(addHost(['a.com'], 'b.com')).toEqual(['a.com', 'b.com']);
    expect(addHost([], '')).toEqual([]);
    expect(removeHost(['a.com', 'b.com'], 'A.COM')).toEqual(['b.com']);
  });
  it('hostFromUrl only http(s)', () => {
    expect(hostFromUrl('https://Foo.com/x')).toBe('foo.com');
    expect(hostFromUrl('chrome://extensions')).toBeNull();
    expect(hostFromUrl('garbage')).toBeNull();
    expect(hostFromUrl(undefined)).toBeNull();
  });
});
