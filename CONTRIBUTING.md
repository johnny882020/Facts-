# Contributing

Run `npm ci` then `npm run validate` before opening a PR. Safety beats coverage: when in doubt, deny.

## Adding an adapter
1. Create `src/adapters/<site>.ts` implementing `Adapter` (`src/core/types.ts`); mark `trusted: true` only for exact, known selectors.
2. Register it in the adapter list; the Scanner only iterates adapters.
3. Adapters find candidates only. They must not click or decide; the guard decides.
4. Fixtures are required, dated (`<site>-YYYY-MM-DD`) under `test/e2e/fixtures/`:
   - at least one **positive** fixture (ad close/skip is clicked), and
   - at least one **negative** fixture (a lookalike accept/subscribe/login control that must NOT be clicked).
5. Add unit tests for any new labels (including localized forms) and guard rows if rules change.
6. Update README limitations and CHANGELOG. New permissions need justification in `docs/store-listing.md` and `docs/privacy.md`.
