/**
 * CloseGuard shared contracts. SINGLE SOURCE OF TRUTH — change only with all module owners informed.
 * Layering: Adapters (DOM) -> extract Features (DOM->plain data) -> Guard.check (PURE) -> click.
 */

/** Plain data about the control to be clicked. Produced by src/content/features.ts (DOM layer). */
export interface ControlFeatures {
  /** Accessible name, raw (not normalized): aria-label || aria-labelledby text || title || textContent || svg <title>. Trimmed. */
  label: string;
  tag: string; // lowercase tag name
  /** For <button>/<input>: its type attribute (default 'submit' inside a form per HTML) — extractor resolves it. */
  buttonType: 'button' | 'submit' | 'reset' | null;
  hasAnchorAncestorOrSelf: boolean;
  /** Resolved href when control is/inside an <a>, else null. */
  href: string | null;
  inForm: boolean;
  visible: boolean; // non-zero rect, not visibility:hidden/display:none, opacity>0, within viewport intersection
}

/** Plain data about the overlay that contains the control. */
export interface OverlayFeatures {
  role: string | null;
  ariaModal: boolean;
  isDialogElement: boolean; // <dialog> (open)
  isFixedLike: boolean; // position fixed|sticky (self or ancestor)
  viewportCoverage: number; // 0..1 of the frame viewport
  zIndex: number; // computed, NaN->0
  hasPassword: boolean;
  hasPaymentField: boolean; // autocomplete^=cc- or name~card
  formInputCount: number; // visible input/textarea/select count inside overlay
  hasFormWithAction: boolean;
  textSnippet: string; // first 300 chars, lowercased, whitespace-collapsed
  consentFramework: boolean; // OneTrust/Cookiebot/CMP markers or id/class contains consent|cookie|gdpr
  adSignals: boolean; // ad/promo/sponsor markers: ad-network iframe/origin, class/id/aria/data matches \b(ad|ads|advert|promo|sponsor|upsell|newsletter|subscribe|popup|modal-promo)\b
  visible: boolean;
}

export interface CloseTarget {
  adapter: string; // adapter id
  /** true = adapter matched an exact, known-ad selector (trusted); false = heuristic (generic). */
  trusted: boolean;
  overlay: Element | null; // null allowed for trusted adapters (e.g. YouTube skip button)
  control: HTMLElement;
  reason: string; // short human-readable, for debug logs
}

export interface Adapter {
  readonly id: string;
  matches(url: URL): boolean;
  /** MUST NOT click. MUST be cheap and never throw (catch internally). */
  find(root: ParentNode): CloseTarget[];
}

export interface Settings {
  enabled: boolean;
  /** Lowercase hostnames; entry "example.com" also matches "*.example.com". */
  disabledHosts: string[];
  /** Heuristic generic adapter on/off (site adapters stay on). */
  genericMode: boolean;
  debug: boolean;
}

export interface GuardInput {
  target: Pick<CloseTarget, 'adapter' | 'trusted'>;
  overlay: OverlayFeatures | null;
  control: ControlFeatures;
  settings: Settings;
  hostname: string;
  now: number; // ms epoch
  /** ms epoch of the last trusted user click/keydown in this frame (0 = never). */
  lastGestureAt: number;
  /** ms epoch when the overlay/control was first observed by the Scanner. */
  firstSeenAt: number;
  /** true if the user (trusted event) interacted inside the overlay/control subtree. */
  userInteractedInOverlay: boolean;
}

export interface GuardDecision { allow: boolean; rule: string }

/** Pure. See src/core/guard.ts for the ordered rule list (documented there + tests are table-driven). */
export type GuardCheck = (input: GuardInput) => GuardDecision;

export interface ScannerDeps {
  adapters: Adapter[];
  getSettings: () => Settings;
  now?: () => number;
  /** Called after a click. */
  onClosed: (t: CloseTarget, signature: string) => void;
  /** Called when a signature that was clicked before reappears within REOPEN_WINDOW_MS. */
  onReopened: (signature: string) => void;
  onError: (e: unknown) => void;
}
