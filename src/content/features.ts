import type { ControlFeatures, OverlayFeatures } from '../core/types';

/** DOM -> plain data. No decisions here; all rules live in core/guard.ts. */

const CONSENT_RE = /onetrust|cookiebot|cookie|consent|gdpr|cmp|didomi|quantcast|usercentrics|trustarc/i;
const AD_RE = /\b(ad|ads|advert|promo|sponsor|upsell|newsletter|subscribe|popup|modal-promo)\b/i;
const AD_ORIGIN_RE = /doubleclick|googlesyndication|adservice|adnxs|taboola|outbrain|criteo|amazon-adsystem/i;

function win(el: Element): Window {
  return el.ownerDocument.defaultView ?? window;
}

function safeStyle(el: Element): CSSStyleDeclaration | null {
  try {
    return win(el).getComputedStyle(el);
  } catch {
    return null;
  }
}

function attrText(el: Element): string {
  return [el.id, el.getAttribute('class') ?? '', el.getAttribute('aria-label') ?? '', el.getAttribute('role') ?? '', ...Array.from(el.attributes)
    .filter((a) => a.name.startsWith('data-'))
    .map((a) => `${a.name} ${a.value}`)].join(' ');
}

/** Accessible name, raw: aria-label || aria-labelledby || title || textContent || svg <title>. */
export function getAccessibleLabel(el: Element): string {
  const aria = el.getAttribute('aria-label')?.trim();
  if (aria) return aria;
  const by = el.getAttribute('aria-labelledby');
  if (by) {
    const root = el.getRootNode() as Document | ShadowRoot;
    const text = by
      .split(/\s+/)
      .map((id) => (root.getElementById?.(id) ?? el.ownerDocument.getElementById(id))?.textContent?.trim() ?? '')
      .filter(Boolean)
      .join(' ');
    if (text) return text;
  }
  const title = el.getAttribute('title')?.trim();
  if (title) return title;
  const text = el.textContent?.trim();
  if (text) return text;
  const svgTitle = el.querySelector('svg title')?.textContent?.trim();
  return svgTitle ?? '';
}

export function isElementVisible(el: Element): boolean {
  const w = win(el);
  const cs = safeStyle(el);
  if (cs) {
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
    if (cs.opacity !== '' && parseFloat(cs.opacity) === 0) return false;
  }
  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return false;
  const vw = w.innerWidth || el.ownerDocument.documentElement.clientWidth;
  const vh = w.innerHeight || el.ownerDocument.documentElement.clientHeight;
  return r.right > 0 && r.bottom > 0 && r.left < vw && r.top < vh;
}

export function extractControlFeatures(el: HTMLElement): ControlFeatures {
  const tag = el.tagName.toLowerCase();
  const form = (el as HTMLButtonElement).form ?? el.closest('form');
  let buttonType: ControlFeatures['buttonType'] = null;
  if (tag === 'button' || tag === 'input') {
    const t = (el.getAttribute('type') ?? '').toLowerCase();
    if (t === 'submit' || t === 'reset' || t === 'button') buttonType = t;
    else if (tag === 'button') buttonType = form ? 'submit' : 'button';
  }
  const anchor = el.closest('a');
  let href: string | null = null;
  if (anchor && anchor.hasAttribute('href')) {
    const raw = anchor.getAttribute('href') ?? '';
    const resolved = (anchor as HTMLAnchorElement).href || raw;
    href = resolved;
    if (raw.startsWith('#')) href = raw;
    else {
      try {
        const u = new URL(resolved);
        const cur = new URL(el.ownerDocument.URL);
        if (u.hash && u.origin === cur.origin && u.pathname === cur.pathname && u.search === cur.search) href = u.hash;
      } catch { /* keep resolved */ }
    }
  }
  return {
    label: getAccessibleLabel(el),
    tag,
    buttonType,
    hasAnchorAncestorOrSelf: anchor !== null,
    href,
    inForm: form !== null,
    visible: isElementVisible(el),
  };
}

function ancestors(el: Element): Element[] {
  const out: Element[] = [];
  let cur: Element | null = el;
  while (cur) {
    out.push(cur);
    const parent: Element | null = cur.parentElement;
    cur = parent ?? ((cur.getRootNode() as ShadowRoot).host ?? null);
  }
  return out;
}

export function extractOverlayFeatures(el: Element): OverlayFeatures {
  const w = win(el);
  const chain = ancestors(el);
  const cs = safeStyle(el);
  const role = el.getAttribute('role');
  const isFixedLike = chain.some((a) => {
    const p = safeStyle(a)?.position;
    return p === 'fixed' || p === 'sticky';
  });
  let z = NaN;
  for (const a of chain) {
    const zi = parseInt(safeStyle(a)?.zIndex ?? '', 10);
    if (!Number.isNaN(zi)) { z = zi; break; }
  }
  const r = el.getBoundingClientRect();
  const vw = w.innerWidth || el.ownerDocument.documentElement.clientWidth || 0;
  const vh = w.innerHeight || el.ownerDocument.documentElement.clientHeight || 0;
  let coverage = 0;
  if (vw > 0 && vh > 0) {
    const ix = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
    const iy = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    coverage = Math.min(1, (ix * iy) / (vw * vh));
  }
  const inputs = Array.from(el.querySelectorAll('input, textarea, select')).filter((i) => {
    const t = (i.getAttribute('type') ?? '').toLowerCase();
    if (t === 'hidden' || t === 'submit' || t === 'button' || t === 'reset' || t === 'image') return false;
    return isElementVisible(i);
  });
  const hasPassword = el.querySelector('input[type="password"]') !== null;
  const hasPaymentField = el.querySelector('input[autocomplete^="cc-"], input[name*="card" i], input[name*="cvv" i]') !== null;
  const hasFormWithAction =
    Array.from(el.querySelectorAll('form')).some((f) => f.hasAttribute('action')) ||
    (el.closest('form')?.hasAttribute('action') ?? false);
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 300).toLowerCase();
  const markers = chain.slice(0, 4).map(attrText).join(' ');
  const inner = Array.from(el.querySelectorAll('[id],[class]')).slice(0, 200).map((e) => `${e.id} ${e.getAttribute('class') ?? ''}`).join(' ');
  const consentFramework =
    el.querySelector('#onetrust-banner-sdk, #CybotCookiebotDialog, [id^="onetrust"], [class*="cmp-"], .qc-cmp2-container') !== null ||
    CONSENT_RE.test(markers) || CONSENT_RE.test(inner.slice(0, 2000));
  const iframeAd = Array.from(el.querySelectorAll('iframe')).some((f) => AD_ORIGIN_RE.test(f.getAttribute('src') ?? '') || AD_RE.test(attrText(f)));
  const adSignals = iframeAd || AD_RE.test(markers) || AD_RE.test(inner);
  return {
    role,
    ariaModal: el.getAttribute('aria-modal') === 'true',
    isDialogElement: el.tagName === 'DIALOG' && (el as HTMLDialogElement).open,
    isFixedLike,
    viewportCoverage: coverage,
    zIndex: Number.isNaN(z) ? 0 : z,
    hasPassword,
    hasPaymentField,
    formInputCount: inputs.length,
    hasFormWithAction,
    textSnippet: text,
    consentFramework,
    adSignals,
    visible: cs ? isElementVisible(el) : r.width > 0 && r.height > 0,
  };
}
