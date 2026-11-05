/** Tracks TRUSTED user input in this frame (capture phase). Synthetic events are ignored. */
export class UserGestureTracker {
  lastGestureAt = 0;
  private touched = new WeakSet<object>();
  private started = false;
  private target: Document | null = null;
  private readonly events = ['click', 'keydown', 'pointerdown'] as const;

  constructor(private readonly now: () => number = Date.now) {}

  private handler = (e: Event): void => {
    if (!e.isTrusted) return;
    this.lastGestureAt = this.now();
    try {
      for (const n of e.composedPath()) this.touched.add(n);
    } catch {
      /* ignore */
    }
  };

  start(doc: Document = document): void {
    if (this.started) return;
    this.started = true;
    this.target = doc;
    for (const t of this.events) doc.addEventListener(t, this.handler, { capture: true, passive: true });
  }

  stop(): void {
    if (!this.started || !this.target) return;
    for (const t of this.events) this.target.removeEventListener(t, this.handler, { capture: true });
    this.started = false;
    this.target = null;
  }

  /** True if a trusted event's path ever included `el` (i.e. the user interacted in its subtree). */
  interactedWithin(el: Element | null): boolean {
    return el !== null && this.touched.has(el);
  }
}
