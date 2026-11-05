/**
 * Pure guard. Ordered rules (first match wins; deny by default):
 *  1 disabled            settings.enabled false / hostname disabled
 *  2 invisible           control or overlay not visible
 *  3 negative-label      negative whole word in label, unless label is an exact close label
 *  4 unsafe-link / unsafe-submit
 *  5 adapter-allow       trusted adapter + adapter label (or icon-only selector match)
 *  6 generic-label       generic: label must be an exact close label
 *  7 generic-only denies: alertdialog, password, payment, form-inputs, form-action, consent,
 *    user-interacted, user-owned, no-ad-signal; else generic-allow
 */
import { GESTURE_GRACE_MS, MAX_FORM_INPUTS } from './constants';
import { hasNegativeToken, isAdapterCloseLabel, isExactCloseLabel } from './labels';
import type { GuardCheck, GuardDecision, GuardInput } from './types';

const PROMO = /\b(subscribe|newsletter|offers?|discounts?|\d+\s?% off|% off|sign up for|premium|upgrade|free trial)\b/;

function hostDisabled(hostname: string, hosts: string[]): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, '');
  return hosts.some((raw) => {
    const e = raw.toLowerCase().trim().replace(/^\*\./, '').replace(/\.$/, '');
    return e !== '' && (h === e || h.endsWith('.' + e));
  });
}

function unsafeHref(href: string | null): boolean {
  if (href === null) return false;
  const t = href.trim();
  return !(t === '' || t.startsWith('#'));
}

const deny = (rule: string): GuardDecision => ({ allow: false, rule });
const allow = (rule: string): GuardDecision => ({ allow: true, rule });

export const check: GuardCheck = (input: GuardInput): GuardDecision => {
  const { control, overlay, settings, target } = input;

  // 1
  if (!settings.enabled || hostDisabled(input.hostname, settings.disabledHosts)) return deny('disabled');
  // 2
  if (!control.visible || (overlay !== null && !overlay.visible)) return deny('invisible');
  // 3
  if (hasNegativeToken(control.label) && !isExactCloseLabel(control.label)) return deny('negative-label');
  // 4
  if (unsafeHref(control.href)) return deny('unsafe-link');
  if (control.buttonType === 'submit' || (control.inForm && overlay?.hasFormWithAction === true)) {
    return deny('unsafe-submit');
  }
  // 5
  if (target.trusted) {
    if (isAdapterCloseLabel(control.label) || control.label.trim() === '') return allow('adapter-allow');
    return deny('adapter-label');
  }
  // 6
  if (!isExactCloseLabel(control.label)) return deny('generic-label');
  // 7
  if (overlay === null) return deny('no-overlay');
  if (overlay.role === 'alertdialog') return deny('alertdialog');
  if (overlay.hasPassword) return deny('password');
  if (overlay.hasPaymentField) return deny('payment');
  if (overlay.formInputCount > MAX_FORM_INPUTS) return deny('form-inputs');
  if (overlay.hasFormWithAction) return deny('form-action');
  if (overlay.consentFramework) return deny('consent');
  if (input.userInteractedInOverlay) return deny('user-interacted');
  const sinceGesture = input.firstSeenAt - input.lastGestureAt;
  if (input.lastGestureAt > 0 && sinceGesture >= 0 && sinceGesture < GESTURE_GRACE_MS) return deny('user-owned');
  if (!overlay.adSignals && !PROMO.test(overlay.textSnippet.toLowerCase())) return deny('no-ad-signal');
  return allow('generic-allow');
};
