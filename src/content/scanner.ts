import type { CloseTarget, GuardCheck, ScannerDeps } from '../core/types';
import {
  CIRCUIT_BREAKER_PAUSE_MS, MAX_ATTEMPTS_PER_SIGNATURE, MAX_CLICKS_PER_MINUTE_PER_FRAME,
  MAX_CONSECUTIVE_ERRORS, REOPEN_WINDOW_MS, SCAN_THROTTLE_MS,
} from '../core/constants';
import { normalizeLabel } from '../core/labels';
import { check as defaultCheck } from '../core/guard';
import { extractControlFeatures, extractOverlayFeatures } from './features';
import { UserGestureTracker } from './gestures';

export interface ScannerOptions {
  check?: GuardCheck;
  gestures?: UserGestureTracker;
}

const MAX_SHADOW_PROBE = 5000;

export class Scanner {
  private readonly check: GuardCheck;
  private readonly gestures: UserGestureTracker;
  private readonly ownsGestures: boolean;
  private readonly now: () => number;
  private root: Document | ShadowRoot = document;
  private observer: MutationObserver | null = null;
  private observedRoots = new WeakSet<Node>();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private running = false;

  private attempted = new WeakSet<Element>();
  private firstSeen = new WeakMap<Element, number>();
  private attempts = new Map<string, number>();
  private lastClickedAt = new Map<string, number>();
  private clickTimes: number[] = [];
  private consecutiveErrors = 0;
  private pausedUntil = 0;

  constructor(private readonly deps: ScannerDeps, opts: ScannerOptions = {}) {
    this.check = opts.check ?? defaultCheck;
    this.now = deps.now ?? Date.now;
    this.ownsGestures = !opts.gestures;
    this.gestures = opts.gestures ?? new UserGestureTracker(this.now);
  }

  start(root: Document | ShadowRoot = document): void {
    if (this.running) return;
    this.running = true;
    this.root = root;
    if (this.ownsGestures) this.gestures.start(root instanceof Document ? root : root.ownerDocument);
    this.observer = new MutationObserver(() => this.schedule());
    this.observe(root);
    this.schedule();
  }

  stop(): void {
    this.running = false;
    this.observer?.disconnect();
    this.observer = null;
    this.observedRoots = new WeakSet();
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null;
    if (this.ownsGestures) this.gestures.stop();
  }

  private observe(node: Node): void {
    if (!this.observer || this.observedRoots.has(node)) return;
    this.observedRoots.add(node);
    this.observer.observe(node, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ['class', 'style', 'aria-hidden', 'open', 'hidden'],
    });
  }

  private schedule(): void {
    if (!this.running || this.timer !== null) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.scan();
    }, SCAN_THROTTLE_MS);
  }

  private fail(e: unknown): void {
    try { this.deps.onError(e); } catch { /* ignore */ }
    if (++this.consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
      this.pausedUntil = this.now() + CIRCUIT_BREAKER_PAUSE_MS;
      this.consecutiveErrors = 0;
    }
  }

  private collectRoots(): ParentNode[] {
    const roots: ParentNode[] = [this.root];
    try {
      const els = this.root.querySelectorAll('*');
      const n = Math.min(els.length, MAX_SHADOW_PROBE);
      for (let i = 0; i < n; i++) {
        const sr = els[i]?.shadowRoot;
        if (sr) { roots.push(sr); this.observe(sr); }
      }
    } catch { /* ignore */ }
    return roots;
  }

  scan(): void {
    try {
      if (typeof document !== 'undefined' && document.hidden) return;
      const now = this.now();
      if (now < this.pausedUntil) return;
      const settings = this.deps.getSettings();
      if (!settings.enabled) return;
      const url = new URL(location.href);
      const adapters = this.deps.adapters.filter((a) => {
        try { return a.matches(url); } catch { return false; }
      });
      if (adapters.length === 0) return;
      for (const root of this.collectRoots()) {
        for (const adapter of adapters) {
          let targets: CloseTarget[] = [];
          try { targets = adapter.find(root); } catch (e) { this.fail(e); continue; }
          for (const t of targets) {
            if (!t.trusted && !settings.genericMode) continue;
            if (this.handle(t, url.hostname) === 'stop') return;
          }
        }
      }
    } catch (e) {
      this.fail(e);
    }
  }

  private handle(t: CloseTarget, hostname: string): 'ok' | 'stop' {
    try {
      const now = this.now();
      const c = t.control;
      if (this.attempted.has(c) || !c.isConnected) return 'ok';
      if (!this.firstSeen.has(c)) this.firstSeen.set(c, now);
      let firstSeenAt = this.firstSeen.get(c) ?? now;
      if (t.overlay) {
        if (!this.firstSeen.has(t.overlay)) this.firstSeen.set(t.overlay, now);
        firstSeenAt = Math.min(firstSeenAt, this.firstSeen.get(t.overlay) ?? now);
      }
      const control = extractControlFeatures(c);
      const overlay = t.overlay ? extractOverlayFeatures(t.overlay) : null;
      const signature = [t.adapter, c.getAttribute('role') ?? '', normalizeLabel(control.label), control.tag].join('|');
      if ((this.attempts.get(signature) ?? 0) >= MAX_ATTEMPTS_PER_SIGNATURE) return 'ok';
      const decision = this.check({
        target: { adapter: t.adapter, trusted: t.trusted },
        overlay, control, settings: this.deps.getSettings(), hostname, now,
        lastGestureAt: this.gestures.lastGestureAt,
        firstSeenAt,
        userInteractedInOverlay: this.gestures.interactedWithin(c) || this.gestures.interactedWithin(t.overlay),
      });
      if (!decision.allow) return 'ok';

      this.clickTimes = this.clickTimes.filter((x) => now - x < 60_000);
      if (this.clickTimes.length >= MAX_CLICKS_PER_MINUTE_PER_FRAME) return 'stop';

      const prev = this.lastClickedAt.get(signature);
      if (prev !== undefined && now - prev <= REOPEN_WINDOW_MS) {
        this.lastClickedAt.delete(signature);
        this.deps.onReopened(signature);
      }
      this.attempted.add(c);
      this.attempts.set(signature, (this.attempts.get(signature) ?? 0) + 1);
      this.clickTimes.push(now);
      c.click();
      this.lastClickedAt.set(signature, now);
      this.consecutiveErrors = 0;
      this.deps.onClosed(t, signature);
      return 'ok';
    } catch (e) {
      this.fail(e);
      return this.now() < this.pausedUntil ? 'stop' : 'ok';
    }
  }
}
