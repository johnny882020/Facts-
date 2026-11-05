import { describe, expect, it } from 'vitest';
import { GESTURE_GRACE_MS } from '../../src/core/constants';
import { check } from '../../src/core/guard';
import type { ControlFeatures, GuardInput, OverlayFeatures } from '../../src/core/types';

const overlay = (o: Partial<OverlayFeatures> = {}): OverlayFeatures => ({
  role: 'dialog', ariaModal: true, isDialogElement: false, isFixedLike: true, viewportCoverage: 0.5, zIndex: 1000,
  hasPassword: false, hasPaymentField: false, formInputCount: 0, hasFormWithAction: false,
  textSnippet: 'hello', consentFramework: false, adSignals: true, visible: true, ...o,
});
const control = (c: Partial<ControlFeatures> = {}): ControlFeatures => ({
  label: 'Close', tag: 'button', buttonType: 'button', hasAnchorAncestorOrSelf: false, href: null, inForm: false,
  visible: true, ...c,
});
interface Over {
  overlay?: Partial<OverlayFeatures> | null;
  control?: Partial<ControlFeatures>;
  trusted?: boolean;
  settings?: Partial<GuardInput['settings']>;
  hostname?: string;
  lastGestureAt?: number;
  firstSeenAt?: number;
  userInteractedInOverlay?: boolean;
}
const input = (o: Over = {}): GuardInput => ({
  target: { adapter: o.trusted ? 'youtube' : 'generic', trusted: o.trusted ?? false },
  overlay: o.overlay === null ? null : overlay(o.overlay),
  control: control(o.control),
  settings: { enabled: true, disabledHosts: [], genericMode: true, debug: false, ...o.settings },
  hostname: o.hostname ?? 'www.example.com',
  now: 1_000_000,
  lastGestureAt: o.lastGestureAt ?? 0,
  firstSeenAt: o.firstSeenAt ?? 1_000_000,
  userInteractedInOverlay: o.userInteractedInOverlay ?? false,
});

const cases: [string, Over, boolean, string][] = [
  // 1 disabled
  ['disabled globally', { settings: { enabled: false } }, false, 'disabled'],
  ['host exact disabled', { settings: { disabledHosts: ['www.example.com'] } }, false, 'disabled'],
  ['parent domain disabled', { settings: { disabledHosts: ['example.com'] } }, false, 'disabled'],
  ['host case/trailing dot', { hostname: 'WWW.Example.com.', settings: { disabledHosts: ['example.com'] } }, false, 'disabled'],
  ['other host not disabled', { settings: { disabledHosts: ['ample.com', 'other.org'] } }, true, 'generic-allow'],
  ['empty entry ignored', { settings: { disabledHosts: [''] } }, true, 'generic-allow'],
  // 2 invisible
  ['control invisible', { control: { visible: false } }, false, 'invisible'],
  ['overlay invisible', { overlay: { visible: false } }, false, 'invisible'],
  ['trusted invisible', { trusted: true, overlay: null, control: { visible: false } }, false, 'invisible'],
  // 3 negative
  ['negative label', { control: { label: 'Accept' } }, false, 'negative-label'],
  ['negative localized', { control: { label: 'Aceptar' } }, false, 'negative-label'],
  ['close+negative mixed', { control: { label: 'Close and subscribe' } }, false, 'negative-label'],
  ['trusted negative', { trusted: true, control: { label: 'Skip and buy' } }, false, 'negative-label'],
  // 4 link/submit
  ['javascript href', { control: { href: 'javascript:void(0)', hasAnchorAncestorOrSelf: true } }, false, 'unsafe-link'],
  ['https href', { control: { href: 'https://evil.example/x' } }, false, 'unsafe-link'],
  ['mailto href', { control: { href: 'mailto:a@b.c' } }, false, 'unsafe-link'],
  ['hash href safe', { control: { href: '#close' } }, true, 'generic-allow'],
  ['empty href safe', { control: { href: '' } }, true, 'generic-allow'],
  ['trusted unsafe link', { trusted: true, overlay: null, control: { label: 'Skip Ad', href: 'https://x.y/' } }, false, 'unsafe-link'],
  ['submit button', { control: { buttonType: 'submit' } }, false, 'unsafe-submit'],
  ['in form w/ action', { control: { inForm: true }, overlay: { hasFormWithAction: true } }, false, 'unsafe-submit'],
  ['trusted submit', { trusted: true, overlay: null, control: { label: 'Skip Ad', buttonType: 'submit' } }, false, 'unsafe-submit'],
  ['reset button ok', { control: { buttonType: 'reset' } }, true, 'generic-allow'],
  // 5 adapter
  ['trusted skip ad', { trusted: true, overlay: null, control: { label: 'Skip Ad' } }, true, 'adapter-allow'],
  ['trusted localized', { trusted: true, overlay: null, control: { label: 'Omitir anuncio' } }, true, 'adapter-allow'],
  ['trusted no thanks', { trusted: true, control: { label: 'No thanks' } }, true, 'adapter-allow'],
  ['trusted close', { trusted: true, control: { label: '×' } }, true, 'adapter-allow'],
  ['trusted icon-only', { trusted: true, overlay: null, control: { label: '' } }, true, 'adapter-allow'],
  ['trusted ignores generic rule 7', { trusted: true, control: { label: 'Close' }, overlay: { role: 'alertdialog', adSignals: false } }, true, 'adapter-allow'],
  ['trusted odd label', { trusted: true, overlay: null, control: { label: 'Something' } }, false, 'adapter-label'],
  // 6 generic label
  ['generic ×', { control: { label: '×' } }, true, 'generic-allow'],
  ['generic localized', { control: { label: 'Schließen' } }, true, 'generic-allow'],
  ['generic skip ad denied', { control: { label: 'Skip Ad' } }, false, 'generic-label'],
  ['generic no thanks denied', { control: { label: 'No thanks' } }, false, 'generic-label'],
  ['generic not now denied', { control: { label: 'Not now' } }, false, 'generic-label'],
  ['generic empty denied', { control: { label: '' } }, false, 'generic-label'],
  ['generic arbitrary denied', { control: { label: 'Learn more' } }, false, 'generic-label'],
  // 7
  ['no overlay', { overlay: null }, false, 'no-overlay'],
  ['alertdialog', { overlay: { role: 'alertdialog' } }, false, 'alertdialog'],
  ['password', { overlay: { hasPassword: true } }, false, 'password'],
  ['payment', { overlay: { hasPaymentField: true } }, false, 'payment'],
  ['too many inputs', { overlay: { formInputCount: 2 } }, false, 'form-inputs'],
  ['one input ok', { overlay: { formInputCount: 1 } }, true, 'generic-allow'],
  ['form action', { overlay: { hasFormWithAction: true } }, false, 'form-action'],
  ['consent', { overlay: { consentFramework: true } }, false, 'consent'],
  ['user interacted', { userInteractedInOverlay: true }, false, 'user-interacted'],
  ['user-owned (gesture just before)', { lastGestureAt: 999_000, firstSeenAt: 1_000_000 }, false, 'user-owned'],
  ['gesture at boundary ok', { lastGestureAt: 1_000_000 - GESTURE_GRACE_MS, firstSeenAt: 1_000_000 }, true, 'generic-allow'],
  ['old gesture ok', { lastGestureAt: 1, firstSeenAt: 1_000_000 }, true, 'generic-allow'],
  ['gesture after first seen not owner', { lastGestureAt: 1_000_500, firstSeenAt: 1_000_000 }, true, 'generic-allow'],
  ['no ad signal / no promo', { overlay: { adSignals: false, textSnippet: 'welcome back' } }, false, 'no-ad-signal'],
  ['promo text without ad signal', { overlay: { adSignals: false, textSnippet: 'get 20% off your first order' } }, true, 'generic-allow'],
  ['promo newsletter', { overlay: { adSignals: false, textSnippet: 'join our newsletter' } }, true, 'generic-allow'],
  ['promo free trial', { overlay: { adSignals: false, textSnippet: 'start your free trial' } }, true, 'generic-allow'],
  ['ad signals only', { overlay: { adSignals: true, textSnippet: '' } }, true, 'generic-allow'],
];

describe('guard.check rule table', () => {
  it.each(cases)('%s', (_n, o, allow, rule) => {
    expect(check(input(o))).toEqual({ allow, rule });
  });
});

describe('guard.check precedence', () => {
  const precedence: [string, Over, string][] = [
    ['disabled beats invisible', { settings: { enabled: false }, control: { visible: false } }, 'disabled'],
    ['invisible beats negative', { control: { visible: false, label: 'Accept' } }, 'invisible'],
    ['negative beats unsafe link', { control: { label: 'Accept', href: 'https://x.y' } }, 'negative-label'],
    ['unsafe link beats submit', { control: { href: 'https://x.y', buttonType: 'submit' } }, 'unsafe-link'],
    ['rule 4 beats adapter allow', { trusted: true, control: { label: 'Skip Ad', buttonType: 'submit' } }, 'unsafe-submit'],
    ['generic label beats alertdialog', { control: { label: 'Learn more' }, overlay: { role: 'alertdialog' } }, 'generic-label'],
    ['alertdialog beats password', { overlay: { role: 'alertdialog', hasPassword: true } }, 'alertdialog'],
    ['password beats payment', { overlay: { hasPassword: true, hasPaymentField: true } }, 'password'],
    ['payment beats form-inputs', { overlay: { hasPaymentField: true, formInputCount: 5 } }, 'payment'],
    ['form-inputs beats form-action', { overlay: { formInputCount: 5, hasFormWithAction: true } }, 'form-inputs'],
    ['form-action beats consent', { overlay: { hasFormWithAction: true, consentFramework: true } }, 'form-action'],
    ['consent beats user-interacted', { overlay: { consentFramework: true }, userInteractedInOverlay: true }, 'consent'],
    ['user-interacted beats user-owned', { userInteractedInOverlay: true, lastGestureAt: 999_999 }, 'user-interacted'],
    ['user-owned beats no-ad-signal', { lastGestureAt: 999_999, overlay: { adSignals: false, textSnippet: '' } }, 'user-owned'],
  ];
  it.each(precedence)('%s', (_n, o, rule) => {
    const d = check(input(o));
    expect(d.allow).toBe(false);
    expect(d.rule).toBe(rule);
  });

  it('exact close label wins over negative token (rule 3 exception)', () => {
    // "close" alone contains no negative token; ensure exact labels never trip rule 3
    for (const label of ['×', '✕', 'x', 'close', 'dismiss', '关闭', 'Закрыть']) {
      expect(check(input({ control: { label } })).rule).toBe('generic-allow');
    }
  });
});
