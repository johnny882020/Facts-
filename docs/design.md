# CloseGuard — Design (Chrome MV3 extension)

## 1. Problem and scope
Users are interrupted by ads and pop-ups (YouTube ad overlays / "Skip ad", Spotify Web upsell modals, newsletter/cookie/promo modals). CloseGuard runs automatically on every page and has exactly ONE action: click a "close" control on an interrupting overlay. It never accepts, subscribes, purchases, signs in, navigates, blocks network requests, or hides content.

Non-goals: network ad blocking, content hiding, video-ad muting/speed-up, filter lists, accounts, remote config/remote code, analytics leaving the device.

## 2. Architecture
```
manifest.json (MV3, minimal permissions: storage; host: <all_urls> content script only)
src/
  core/        pure, DOM-agnostic where possible; fully unit-tested
    types.ts       shared contracts (below)
    closeLabels.ts multilingual close/dismiss label matching + negative (accept/buy/sign in) labels
    scoring.ts     scoreOverlay(el) / scoreCloseControl(el)
    safety.ts      Guard: deny rules (password/payment fields, user-initiated, attempt caps, rate limit)
    scanner.ts     Scanner: finds candidates, asks adapters, clicks via Guard
  adapters/    site-specific Adapter implementations (youtube, spotify) + generic
  content/     content entry: wires Scanner to MutationObserver + settings + stats
  background/  service worker: default settings on install, badge, stats aggregation
  popup/       toggle global / per-site, today's count, last error
  options/     allowlist (sites where disabled), diagnostics export
  shared/      storage wrapper (typed), logger (ring buffer), messaging
test/unit, test/e2e (Playwright loads the built extension; local fixture pages)
```

### Contracts (src/core/types.ts)
```ts
export interface CloseTarget { overlay: Element; control: HTMLElement; reason: string; score: number; adapter: string }
export interface Adapter { id: string; matches(url: URL): boolean; find(root: ParentNode): CloseTarget[] }
export interface Settings { enabled: boolean; disabledHosts: string[]; debug: boolean }
export interface Stats { closedTotal: number; closedByAdapter: Record<string, number>; errors: number; lastError?: string }
export interface GuardDecision { allow: boolean; why: string }
```

## 3. Detection strategy
1. Site adapters first (high precision): YouTube (`.ytp-skip-ad-button`, `.ytp-ad-skip-button-modern`, `.ytp-ad-overlay-close-button`, `ytd-enforcement-message` is NOT touched), Spotify Web (`[data-testid="modal-close"]`-style dialogs with close buttons).
2. Generic heuristic: candidate overlays = elements with `role=dialog|alertdialog`, `aria-modal=true`, or computed `position:fixed|sticky` + high z-index covering >= 15% of viewport (or a top/bottom banner). Within an overlay find a close control: `button|[role=button]|a` whose accessible name (aria-label, title, text, svg `<title>`) matches a close label list ("close","dismiss","skip ad","no thanks","not now","×","✕"), or a small icon-only control in the overlay's top-right corner.
3. Score = overlay confidence * control confidence; click only if >= threshold (default 0.6).
4. Observation: one `MutationObserver` on `document` (childList+subtree+attributes `class/style/aria-hidden`), coalesced with `requestAnimationFrame` + 250 ms throttle; plus a 2 s low-frequency interval fallback for sites that mutate inside shadow DOM / iframes (open shadow roots are traversed; same-origin iframes handled by `all_frames: true`).

## 4. Safety (the Guard) — the main risk is closing something the user wants
Deny when any holds:
- overlay contains `input[type=password]`, payment fields (`autocomplete^=cc-`), or `<form>` with >2 inputs (login/checkout) — never auto-dismiss;
- overlay appeared within 1500 ms after a trusted user click/keypress (user opened it);
- the control's label matches negative labels (accept, agree, subscribe, buy, sign in, continue, ok, yes) and not a close label;
- same element already attempted >= 3 times (loop guard) or > 10 clicks/min per page (rate limit);
- host in `disabledHosts` or `enabled=false`;
- element not visible / not in top-layer rendering (zero size, `visibility:hidden`).
All clicks are synthetic `HTMLElement.click()`; no navigation: if control is an `<a href>` with a different origin/non-hash href, deny.
Cookie-consent banners are treated as ordinary overlays only when a pure close ("×"/"Close") exists; never click "Accept all"/"Reject all".

## 5. Reliability / SRE
- Fail-safe: every scan wrapped in try/catch; errors counted, ring-buffer logged (max 50), never thrown into the page. Content script has a circuit breaker: 5 consecutive scan errors -> pause 60 s.
- Performance budget: scan <= 5 ms p95 on a 5k-node page; observer coalescing; no scanning when tab hidden; selectors cached per adapter.
- Selector rot detection: per-adapter hit counters in `Stats`; diagnostics page shows adapters with 0 hits for 14 days.
- SLOs (documented in docs/slo.md): false-positive rate (user-reported re-opens) < 0.5%; scan p95 < 5 ms; crash-free content-script sessions 99.9%.
- Privacy: nothing leaves the device; no remote code; permissions minimal (`storage` only). Store listing privacy statement in docs/privacy.md.
- Release: tag `vX.Y.Z` -> CI builds, tests, zips; optional Chrome Web Store publish (secrets-gated) with staged rollout; rollback = republish previous zip (docs/runbook.md).

## 6. Testing / validation
- Unit (Vitest + jsdom): label matching (i18n), scoring, Guard rules, adapters against HTML fixtures, scanner click behavior, storage wrapper.
- E2E (Playwright, real Chromium with extension loaded via `--load-extension`, local fixture server): YouTube-like skip button after countdown, ad-overlay close, Spotify-like upsell modal, generic newsletter modal, negative cases (login modal with password, user-opened dialog, "Accept cookies" only banner, cross-origin link) must NOT be clicked, popup toggle disables, per-site disable, iframe + shadow DOM modal, perf check.
- CI gates: lint, typecheck, unit coverage >= 85% on src/core, e2e, build, manifest validation, size budget (< 150 KB zipped).

## 7. CI/CD
GitHub Actions: `ci.yml` (lint, typecheck, unit, build, e2e with Playwright chromium, upload artifact), `release.yml` (tag -> zip + GitHub Release + optional CWS publish), `codeql.yml`, Dependabot, CODEOWNERS, PR template.

## 8. Open risks
- Closing a modal the user wanted (mitigated by Guard + disable controls). Honest limitation: cannot be 100% — documented.
- Sites may treat auto-clicks as ToS violation (YouTube "Skip ad" automation). Documented in README; adapters per-site toggle.
- Real YouTube/Spotify DOM changes: we cannot validate against live sites from this sandbox; validated against faithful fixtures only.
