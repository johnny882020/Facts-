import type { Adapter, CloseTarget } from '../core/types';
import { MIN_VIEWPORT_COVERAGE, MIN_Z_INDEX } from '../core/constants';
import { isExactCloseLabel } from '../core/labels';
import { extractOverlayFeatures, getAccessibleLabel } from '../content/features';

const EXPLICIT_SEL = '[role=dialog], [role=alertdialog], [aria-modal=true], dialog[open]';
const FIXED_CANDIDATE_SEL = 'div, section, aside, form';
const MAX_FIXED_CANDIDATES = 1500;
const CONTROL_SEL = 'button, [role=button], a';

function isFixed(el: Element): boolean {
  try {
    const p = (el.ownerDocument.defaultView ?? window).getComputedStyle(el).position;
    return p === 'fixed' || p === 'sticky';
  } catch {
    return false;
  }
}

export const genericAdapter: Adapter = {
  id: 'generic',
  matches() {
    return true;
  },
  find(root) {
    const out: CloseTarget[] = [];
    try {
      const overlays = new Set<Element>(Array.from(root.querySelectorAll(EXPLICIT_SEL)));
      const cands = Array.from(root.querySelectorAll(FIXED_CANDIDATE_SEL)).slice(0, MAX_FIXED_CANDIDATES);
      for (const el of cands) {
        if (!overlays.has(el) && isFixed(el)) overlays.add(el);
      }
      const seenControls = new Set<Element>();
      for (const overlay of overlays) {
        try {
          const f = extractOverlayFeatures(overlay);
          const qualifies =
            f.role === 'dialog' || f.role === 'alertdialog' || f.ariaModal || f.isDialogElement ||
            (f.isFixedLike && f.viewportCoverage >= MIN_VIEWPORT_COVERAGE && f.zIndex >= MIN_Z_INDEX);
          if (!qualifies) continue;
          for (const c of Array.from(overlay.querySelectorAll(CONTROL_SEL))) {
            if (!(c instanceof HTMLElement) || seenControls.has(c)) continue;
            if (!isExactCloseLabel(getAccessibleLabel(c))) continue;
            seenControls.add(c);
            out.push({ adapter: 'generic', trusted: false, overlay, control: c, reason: 'generic overlay with exact close label' });
          }
        } catch {
          /* skip this overlay */
        }
      }
    } catch {
      /* never throw */
    }
    return out;
  },
};
