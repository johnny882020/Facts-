// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { allAdapters } from '../../src/adapters';
import { youtubeAdapter } from '../../src/adapters/youtube';
import { spotifyAdapter } from '../../src/adapters/spotify';
import { genericAdapter } from '../../src/adapters/generic';

beforeEach(() => { document.body.innerHTML = ''; });

describe('registry', () => {
  it('orders trusted first, generic last', () => {
    expect(allAdapters.map((a) => a.id)).toEqual(['youtube', 'spotify', 'generic']);
  });
});

describe('youtube', () => {
  it('matches hosts', () => {
    expect(youtubeAdapter.matches(new URL('https://www.youtube.com/watch'))).toBe(true);
    expect(youtubeAdapter.matches(new URL('https://youtube.com/'))).toBe(true);
    expect(youtubeAdapter.matches(new URL('https://notyoutube.com/'))).toBe(false);
  });
  it('finds skip and overlay close but never enforcement message', () => {
    document.body.innerHTML = `<div class="ytp-ad-overlay-container"><button class="ytp-ad-overlay-close-button">x</button></div>
      <button class="ytp-skip-ad-button">Skip</button><button class="ytp-ad-skip-button-modern">Skip</button><button class="ytp-ad-skip-button">Buy now</button>
      <ytd-enforcement-message><button class="ytp-ad-skip-button">no</button></ytd-enforcement-message>`;
    const t = youtubeAdapter.find(document);
    expect(t).toHaveLength(3);
    expect(t.every((x) => x.trusted && x.adapter === 'youtube')).toBe(true);
    expect(t.find((x) => x.control.className.includes('overlay-close'))?.overlay).not.toBeNull();
  });
});

describe('spotify', () => {
  it('matches and finds modal close buttons', () => {
    expect(spotifyAdapter.matches(new URL('https://open.spotify.com/x'))).toBe(true);
    expect(spotifyAdapter.matches(new URL('https://spotify.com/x'))).toBe(false);
    document.body.innerHTML = `<div role="dialog"><button aria-label="Close">x</button><button data-testid="close-button"></button><button>Upgrade</button></div>
      <button aria-label="Close">outside</button>`;
    const t = spotifyAdapter.find(document);
    expect(t).toHaveLength(2);
    expect(t[0]?.overlay).toBe(document.querySelector('[role=dialog]'));
  });
});

describe('generic', () => {
  it('finds exact close label inside dialog only', () => {
    document.body.innerHTML = `<div role="dialog"><button aria-label="Close">x</button><button>Accept</button><a href="#">×</a></div>
      <button>Close</button>`;
    const t = genericAdapter.find(document);
    expect(t).toHaveLength(2);
    expect(t.every((x) => !x.trusted && x.adapter === 'generic')).toBe(true);
  });
  it('finds fixed overlay when coverage and z-index qualify', () => {
    document.body.innerHTML = `<div id="o" style="position:fixed;z-index:1000"><button>Dismiss</button></div>`;
    const o = document.getElementById('o') as HTMLElement;
    o.getBoundingClientRect = () => ({ left: 0, top: 0, right: 1024, bottom: 768, width: 1024, height: 768 }) as DOMRect;
    expect(genericAdapter.find(document)).toHaveLength(1);
    o.style.zIndex = '1';
    expect(genericAdapter.find(document)).toHaveLength(0);
  });
  it('never throws', () => {
    const bad = { querySelectorAll() { throw new Error('boom'); } } as unknown as ParentNode;
    expect(genericAdapter.find(bad)).toEqual([]);
    expect(youtubeAdapter.find(bad)).toEqual([]);
    expect(spotifyAdapter.find(bad)).toEqual([]);
  });
});
