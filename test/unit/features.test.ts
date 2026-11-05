// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { extractControlFeatures, extractOverlayFeatures } from '../../src/content/features';

function rect(el: Element, w = 100, h = 50): void {
  el.getBoundingClientRect = () => ({ x: 10, y: 10, left: 10, top: 10, right: 10 + w, bottom: 10 + h, width: w, height: h, toJSON() {} }) as DOMRect;
}

beforeEach(() => { document.body.innerHTML = ''; });

describe('extractControlFeatures', () => {
  it('label precedence aria-label > labelledby > title > text > svg title', () => {
    document.body.innerHTML = `<span id="l">Lbl</span>
      <button id="a" aria-label=" Close ">x</button>
      <button id="b" aria-labelledby="l">x</button>
      <button id="c" title="T">x</button>
      <button id="d"> Dismiss </button>
      <button id="e"><svg><title>Shut</title></svg></button>`;
    const g = (id: string) => extractControlFeatures(document.getElementById(id) as HTMLElement).label;
    expect([g('a'), g('b'), g('c'), g('d'), g('e')]).toEqual(['Close', 'Lbl', 'T', 'Dismiss', 'Shut']);
  });
  it('resolves buttonType, form and anchor info', () => {
    document.body.innerHTML = `<form action="/x"><button id="s">a</button><button id="b" type="button">b</button></form>
      <button id="o">o</button><a id="a" href="https://e.com/p"><span id="in">x</span></a><a id="n">n</a>`;
    const f = (id: string) => extractControlFeatures(document.getElementById(id) as HTMLElement);
    expect(f('s').buttonType).toBe('submit');
    expect(f('s').inForm).toBe(true);
    expect(f('b').buttonType).toBe('button');
    expect(f('o').buttonType).toBe('button');
    expect(f('o').inForm).toBe(false);
    expect(f('a').buttonType).toBeNull();
    expect(f('in').hasAnchorAncestorOrSelf).toBe(true);
    expect(f('in').href).toBe('https://e.com/p');
    expect(f('n').href).toBeNull();
  });
  it('emits raw hash for same-document links, absolute otherwise', () => {
    document.body.innerHTML = `<a id="h" href="#top">x</a><a id="e" href="#">x</a><a id="s" href="${location.href.split('#')[0]}#frag">x</a><a id="o" href="/other">x</a>`;
    const f = (id: string) => extractControlFeatures(document.getElementById(id) as HTMLElement).href;
    expect(f('h')).toBe('#top');
    expect(f('e')).toBe('#');
    expect(f('s')).toBe('#frag');
    expect(f('o')).toBe(new URL('/other', location.href).href);
  });
  it('visibility uses rect and styles', () => {
    document.body.innerHTML = '<button id="v">x</button><button id="z">x</button><button id="h" style="display:none">x</button>';
    const v = document.getElementById('v') as HTMLElement;
    rect(v);
    expect(extractControlFeatures(v).visible).toBe(true);
    expect(extractControlFeatures(document.getElementById('z') as HTMLElement).visible).toBe(false);
    const h = document.getElementById('h') as HTMLElement;
    rect(h);
    expect(extractControlFeatures(h).visible).toBe(false);
  });
});

describe('extractOverlayFeatures', () => {
  it('reads roles, forms and inputs', () => {
    document.body.innerHTML = `<div id="o" role="dialog" aria-modal="true"><form action="/s"><input type="password"><input name="cardnumber" type="text"><input type="hidden"></form> Subscribe to our newsletter</div>`;
    const o = document.getElementById('o') as HTMLElement;
    rect(o, 200, 100);
    const f = extractOverlayFeatures(o);
    expect(f.role).toBe('dialog');
    expect(f.ariaModal).toBe(true);
    expect(f.hasPassword).toBe(true);
    expect(f.hasPaymentField).toBe(true);
    expect(f.hasFormWithAction).toBe(true);
    expect(f.textSnippet).toContain('subscribe to our newsletter');
    expect(f.adSignals).toBe(false);
    expect(f.zIndex).toBe(0);
  });
  it('detects fixed, z-index, ad and consent markers', () => {
    document.body.innerHTML = `<div id="o" class="promo-popup" style="position:fixed;z-index:999">hi</div><div id="c" id2="x" class="cookie-banner">c</div>`;
    const f = extractOverlayFeatures(document.getElementById('o') as HTMLElement);
    expect(f.isFixedLike).toBe(true);
    expect(f.zIndex).toBe(999);
    expect(extractOverlayFeatures(document.getElementById('c') as HTMLElement).consentFramework).toBe(true);
    expect(document.getElementById('o')?.className).toBe('promo-popup');
  });
  it('flags <dialog open>', () => {
    document.body.innerHTML = '<dialog id="d" open>x</dialog>';
    expect(extractOverlayFeatures(document.getElementById('d') as HTMLElement).isDialogElement).toBe(true);
  });
});
