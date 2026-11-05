# Chrome Web Store listing

## Short description
Automatically presses the close button on interrupting ads and pop-ups. Nothing leaves your device.

## Description
CloseGuard has one job: click the close (x / dismiss / skip) control on interrupting ads and promo pop-ups, including YouTube skip-ad and Spotify Web upsell modals.

It never accepts, subscribes, buys, signs in, navigates, hides content or blocks requests. It ignores login and payment forms, alert dialogs and cookie-consent banners. Everything runs locally; no data is collected or transmitted.

Limitations: some sites ignore programmatic clicks; auto-skipping ads may conflict with a site's terms of service. You can disable CloseGuard globally or per site from the popup.

## Single purpose
Close interrupting ads and pop-ups by clicking their close button.

## `<all_urls>` justification
Interrupting pop-ups can appear on any website, so the content script must run on all pages (and frames) to detect an overlay and its close control. Host access is used only to read the DOM and dispatch a click on a close button. No page data is stored or transmitted, and no requests are made or modified.

## Data use disclosures
No user data collected. See docs/privacy.md.
