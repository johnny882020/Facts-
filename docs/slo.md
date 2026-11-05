# SLIs and SLOs

All SLIs are defined over local metrics shown in the popup and over CI/e2e gates. No telemetry is collected.

| SLI | Definition | Objective |
|---|---|---|
| False-positive proxy | `reopened / closedTotal` (overlay re-appeared within REOPEN_WINDOW_MS after a close) | < 5% per user over 7 days; investigate above |
| Safety gate | negative e2e fixtures clicked | 0, always (release blocker) |
| Error rate | `errors` counter vs `closedTotal` | < 1%; circuit breaker trips are investigated |
| Adapter freshness | `lastClosedAtByAdapter` age for YouTube/Spotify while the user is active on them | informational; no close in 30 days of active use suggests selector rot |
| Build health | CI green on main (lint, types, unit, e2e) | 100% of releases |
| Perf | scan time on 5k-node fixture (e2e performance marks) | informational budget |

Error budget: any negative-fixture failure freezes releases until fixed.
