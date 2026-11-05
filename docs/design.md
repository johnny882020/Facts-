# CloseGuard — Design v2 (post-Goldfish review)

## 1. Purpose and scope
Chrome MV3 extension with ONE action: click a close control on an interrupting ad/pop-up. Never accepts, subscribes, buys, signs in, navigates, hides content or blocks requests. Nothing leaves the device.
v1 definition of done: builds to `dist/`, loads in Chromium, passes unit + e2e suites (positive AND negative fixtures), CI green.

## 2. Architecture (layers enforced)
```
Adapter.find(DOM)  ->  features.ts (DOM -> plain data)  ->  guard.ts (PURE rules)  ->  Scanner clicks
```
- `src/core/types.ts` contracts; `constants.ts` tunables; `labels.ts` label matching (pure); `guard.ts` ordered rules (pure).
- `src/adapters/`: `youtube.ts`, `spotify.ts`, `generic.ts` (each implements `Adapter`; Scanner only iterates adapters).
- `src/content/`: `features.ts` (DOM->Features), `scanner.ts`, `gestures.ts` (UserGestureTracker), `index.ts` (wiring).
- `src/background/index.ts`: sole writer of `Stats`; badge; defaults on install. `src/popup/`: toggles + counters. No options page in v1.
- Build: esbuild bundles each entry to a single IIFE in `dist/`; manifest copied; `scripts/build.mjs`.

## 3. Detection
- Trusted adapters (exact known selectors, `trusted:true`): YouTube skip-ad button and ad-overlay close; Spotify Web upsell/modal close buttons.
- Generic (`trusted:false`, `genericMode` setting, default on): overlay = `role=dialog|alertdialog`, `aria-modal`, open `<dialog>`, or fixed-like element with coverage >= MIN_VIEWPORT_COVERAGE and z-index >= MIN_Z_INDEX. Control must be inside overlay and have an exact close label. No geometry/icon-corner guessing in v1 (deferred).
- Observation: one MutationObserver (childList+subtree; attributes only `class|style|aria-hidden|open|hidden`), throttled SCAN_THROTTLE_MS via rAF/timer; skip while `document.hidden`; open shadow roots found during scan get their own observer; closed shadow roots unsupported (documented). `all_frames:true`, `match_about_blank:true`, `run_at:document_idle`.

## 4. Guard — ordered rules (first match wins; deny by default)
1. settings.enabled false / host disabled -> deny. 2. control or overlay not visible -> deny.
3. NEGATIVE labels (accept, agree, allow, subscribe, buy, purchase, sign in/up, log in, continue, confirm, yes, ok, pay, upgrade, try, get, start, install, download, reject) matched on the control label OR overlay text snippet "primary CTA" -> hmm: only the CONTROL label for trusted adapters; control label for generic. Any negative token in the control label -> deny.
4. Control link/submit safety: ancestor/self `<a>` with href not http(s)/hash-only or cross-origin; `buttonType==='submit'`/inForm with action; -> deny.
5. Trusted adapter + exact adapter-allowed label or selector -> allow (still subject to rules 1-4 and rate/attempt limits in Scanner).
6. Generic only: label must be an EXACT whole-string close label (`×`, `✕`, `x`, `close`, `dismiss` + localized equivalents; NOT "no thanks"/"not now"/"skip" which are adapter-only).
7. Generic only deny: `role=alertdialog`; `hasPassword`; `hasPaymentField`; `formInputCount > MAX_FORM_INPUTS`; `hasFormWithAction`; `consentFramework`; `userInteractedInOverlay`; `firstSeenAt - lastGestureAt < GESTURE_GRACE_MS` (user-owned); and require `adSignals || isDialogElement|ariaModal|role=dialog with promo text` — concretely: allow only if `adSignals` is true OR overlay text matches promo keywords (subscribe, newsletter, offer, discount, % off, sign up for, premium, upgrade, free trial).
Scanner-level (per frame): WeakSet + signature attempts <= MAX_ATTEMPTS_PER_SIGNATURE (signature = adapter|role|normalized label|tag), <= MAX_CLICKS_PER_MINUTE_PER_FRAME, circuit breaker after MAX_CONSECUTIVE_ERRORS, `reopened` detection within REOPEN_WINDOW_MS (local false-positive proxy).
Cookie-consent banners: explicitly OUT of scope (excluded via consentFramework) — an × there can imply consent.

## 5. Known limitations (accepted, documented)
Synthetic `.click()` (isTrusted=false) may be ignored by some sites -> partial coverage accepted; no CDP/debugger escalation. YouTube/Spotify DOM drift: adapters validated on dated fixtures; scheduled non-blocking canary job documented. Auto-skipping may conflict with site ToS. `<all_urls>` needs Web Store justification (docs/store-listing.md).

## 6. SRE (right-sized)
Measurable locally: `reopened`/`closedTotal` ratio (FP proxy), `errors`, per-adapter `lastClosedAtByAdapter` (selector-rot signal). Popup shows them. Circuit breaker + try/catch; never throws into page. Docs: docs/slo.md (SLIs defined only over local metrics + e2e gates), docs/runbook.md (rollback, selector-rot response), docs/privacy.md.

## 7. Testing
Unit (Vitest/jsdom): labels i18n table, guard rule table (every rule + precedence), scanner behavior with stubbed features. E2E (Playwright, real Chromium + extension): positives (YouTube-like skip, ad overlay close, Spotify-like modal, newsletter modal, iframe modal) and NEGATIVES (login/password modal, alertdialog, user-opened dialog, consent banner, "Accept"-only, cross-origin link close, submit-button close, form modal); popup toggles; per-host disable. Layout-dependent rules tested ONLY in e2e. Perf: scan time measured via performance marks in e2e on a 5k-node fixture (informational budget).

## 8. CI/CD
`ci.yml`: lint, typecheck, unit+coverage, build, e2e, zip artifact; actions pinned by tag, Dependabot (npm+actions). `release.yml`: tag v* -> validate -> package -> GitHub Release; Chrome Web Store publish step secrets-gated. CodeQL kept (cheap).

## Review disposition
Accepted: boolean rules; features layer; negative-first guard; consent out of scope; signature-keyed attempts; per-frame limits; background-only stats; popup undo-less reopen metric; right-sized SRE. Declined: removing CI/SRE entirely (explicitly requested), dropping YouTube skip (in scope, ToS risk documented).
