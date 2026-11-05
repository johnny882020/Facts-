import type { Adapter, CloseTarget } from '../core/types';
import { isAdapterCloseLabel } from '../core/labels';
import { getAccessibleLabel } from '../content/features';

const SKIP_SEL = '.ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern, button.ytp-ad-skip-button-container';
const OVERLAY_CLOSE_SEL = '.ytp-ad-overlay-close-button';
const FORBIDDEN = 'ytd-enforcement-message, ytd-enforcement-message-view-model';

export const youtubeAdapter: Adapter = {
  id: 'youtube',
  matches(url) {
    const h = url.hostname.toLowerCase();
    return h === 'youtube.com' || h.endsWith('.youtube.com');
  },
  find(root) {
    const out: CloseTarget[] = [];
    try {
      const seen = new Set<Element>();
      const add = (sel: string, reason: string, overlaySel: string | null): void => {
        for (const el of Array.from(root.querySelectorAll(sel))) {
          if (!(el instanceof HTMLElement) || seen.has(el) || el.closest(FORBIDDEN)) continue;
          { const l = getAccessibleLabel(el); if (l.trim() !== '' && !isAdapterCloseLabel(l)) continue; }
          seen.add(el);
          const overlay = overlaySel ? el.closest(overlaySel) : null;
          out.push({ adapter: 'youtube', trusted: true, overlay, control: el, reason });
        }
      };
      add(SKIP_SEL, 'youtube skip-ad button', null);
      add(OVERLAY_CLOSE_SEL, 'youtube ad overlay close', '.ytp-ad-overlay-container, .ytp-ad-overlay-slot');
    } catch {
      /* never throw */
    }
    return out;
  },
};
