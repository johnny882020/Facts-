import type { Adapter, CloseTarget } from '../core/types';
import { isAdapterCloseLabel } from '../core/labels';
import { getAccessibleLabel } from '../content/features';

const DIALOG_SEL = '[role=dialog], [data-testid*=modal]';
const CLOSE_SEL = '[data-testid=close-button], button[aria-label=Close], button[aria-label="Close dialog"]';

export const spotifyAdapter: Adapter = {
  id: 'spotify',
  matches(url) {
    return url.hostname.toLowerCase() === 'open.spotify.com';
  },
  find(root) {
    const out: CloseTarget[] = [];
    try {
      const seen = new Set<Element>();
      for (const dialog of Array.from(root.querySelectorAll(DIALOG_SEL))) {
        for (const el of Array.from(dialog.querySelectorAll(CLOSE_SEL))) {
          if (!(el instanceof HTMLElement) || seen.has(el)) continue;
          { const l = getAccessibleLabel(el); if (l.trim() !== '' && !isAdapterCloseLabel(l)) continue; }
          seen.add(el);
          out.push({ adapter: 'spotify', trusted: true, overlay: dialog, control: el, reason: 'spotify modal close' });
        }
      }
    } catch {
      /* never throw */
    }
    return out;
  },
};
