# CloseGuard

A Chrome (Manifest V3) extension with exactly one job: press the **close** button on interrupting ads and pop-ups. It never accepts, subscribes, buys, signs in, navigates, hides content or blocks network requests. Nothing leaves your device.

## Install from dist (development)
```
npm ci
npm run build
```
Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the `dist/` folder.

## How it works
```
Adapter.find(DOM) -> features.ts (DOM -> plain data) -> guard.ts (pure rules) -> Scanner clicks
```
- Adapters (`src/adapters/`): trusted ones for YouTube (skip-ad, ad-overlay close) and Spotify Web (upsell modal close), plus a generic one for dialog-like overlays with an exact close label (`x`, `close`, `dismiss`, localized).
- Content script observes DOM changes (throttled), extracts plain features, and asks the pure guard whether a click is allowed.
- Background worker is the sole writer of local stats and the badge. The popup has toggles and counters.

## Safety model
The guard is deny-by-default with ordered rules (see `docs/design.md` section 4). Negative labels (accept, subscribe, buy, sign in, continue...) always deny. Links that leave the page, submit buttons, forms, password or payment fields, `alertdialog`, cookie-consent frameworks, and overlays the user just opened or interacted with are never touched. Per-frame rate limits, per-signature attempt caps and a circuit breaker bound behavior. Cookie banners are deliberately out of scope.

## Limitations
- **Terms of Service risk:** auto-skipping ads (for example on YouTube) may conflict with a site's terms. Use at your own risk; disable per host in the popup.
- **Synthetic clicks:** the extension uses `.click()` (`isTrusted=false`). Some sites ignore it, so coverage is partial. There is no debugger/CDP escalation.
- Site DOM drift can break adapters; closed shadow roots are unsupported.
- Requires `<all_urls>` host access (see `docs/store-listing.md`).

## Development
```
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run build       # esbuild -> dist/
```
See `CONTRIBUTING.md` for adding adapters.

## Testing
```
npm test            # unit (Vitest + jsdom)
npm run test:cov    # with coverage
npm run test:e2e    # build + Playwright (real Chromium with the extension)
npm run validate    # everything
```
E2E includes negative fixtures (login modal, alertdialog, consent banner, "Accept"-only, cross-origin link, submit button, form modal).

## Release
Bump `package.json` version and `CHANGELOG.md`, then tag `vX.Y.Z` and push the tag. `release.yml` validates, runs `npm run package`, creates a GitHub Release with the zip, and publishes to the Chrome Web Store if `CWS_*` secrets are configured. See `docs/runbook.md`.

## Docs
`docs/design.md`, `docs/slo.md`, `docs/runbook.md`, `docs/privacy.md`, `docs/store-listing.md`, `SECURITY.md`.

License: Apache-2.0.
