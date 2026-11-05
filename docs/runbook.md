# Runbook

## Rollback
1. Chrome Web Store: republish the previous release zip (download it from the prior GitHub Release) as a new version number higher than the bad one; the Store does not allow reusing version numbers.
2. If the harm is active: set the item to unpublished in the Developer Dashboard, or ship a build with the master `enabled` default false.
3. Users can disable instantly via the popup toggle or per-host disable, or by disabling the extension.
4. Delete or mark the bad GitHub Release as pre-release; add a CHANGELOG note.

## Selector rot (adapter stops closing)
Signals: `lastClosedAtByAdapter` stale for an adapter, user reports, weekly CI canary failing.
1. Reproduce on the live site; save the new DOM as a dated fixture under `test/e2e/fixtures/` (and a negative variant).
2. Update the adapter selectors/labels only; keep guard rules unchanged.
3. Run `npm run validate`, bump patch version, release.
4. Until fixed, the generic adapter and manual closing remain; no user-facing breakage beyond ads not being skipped.

## False positive (a click that should not have happened)
Signals: high `reopened / closedTotal` in the popup, or a user report.
1. Collect: site, what was clicked, the control label and overlay HTML (user supplies; nothing is sent automatically).
2. Immediate mitigation: tell the user to disable the host in the popup or turn off generic mode.
3. Add a negative fixture reproducing it plus a guard unit test row; fix the rule (prefer tightening: deny more).
4. If the click could have had a consequence (accept/subscribe/navigation), treat as a security-class incident: patch release same day, consider unpublishing until fixed.
