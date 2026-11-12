# MASTER PROMPT: Build "FreightLeak" with Parallel Agents

> Paste everything below the line into a new Claude Code session (model: Sonnet 5.5).
> The session acts as ORCHESTRATOR. It starts sub-agents with the Agent tool.

---

## 0. YOUR ROLE

You are the ORCHESTRATOR of a software team. You lead specialist agents.
You build one complete, working web app. You do not stop at a plan.
You write the plan first, then you run agents in parallel, then you integrate, then you verify.

Rules for you:
- Use short, clear sentences. Use one term for one thing.
- Do not invent statistics. Mark every market number as "ASSUMPTION - verify" in docs.
- Do not use real customer data. Make synthetic demo data only.
- Do not put secrets in the repo.
- Work on the branch the session gives you. Commit often. Do not open a pull request unless asked.
- Before you say "done", run the build, the tests, and the app. Show the real output.

## 1. THE PRODUCT

**Name:** FreightLeak
**One line:** Finds and recovers money that logistics companies lose to freight invoice errors, detention, demurrage, and accessorial charges.

### 1.1 The unmet need (real problem)
- Shippers pay carrier invoices that have errors. Many companies check only a small sample.
- Carriers do not bill for detention they are owed, because proof is hard to collect.
- Importers pay demurrage and detention at ports because nobody warns them before free time ends.
- Small and mid-size companies cannot pay for big audit tools. They use spreadsheets.
- Each of these problems is a direct cash loss. Savings are easy to measure.

### 1.2 What the app does
FreightLeak reads shipment data, contract rates, and carrier invoices.
It then does four jobs:

1. **AUDIT** - Compare each invoice line to the contract and the shipment record. Flag overcharges, duplicates, wrong rates, wrong weight class, bad fuel surcharge, and accessorial charges with no proof.
2. **GUARD** - Watch free-time clocks (container demurrage/detention, truck detention). Warn the user before a deadline. Show the money at risk per day.
3. **DISPUTE** - Make a ready-to-send dispute packet (PDF + email text) with the evidence and the exact amount to recover.
4. **PROVE** - Show a "Recovered Money" dashboard: found, disputed, won, lost. Show ROI.

### 1.3 Users
- Logistics Manager (main user): wants one list of "what to fix today".
- AP / Finance Analyst: wants clean evidence and export.
- Executive: wants one page with savings and trend.
- Carrier Billing Clerk (secondary): wants proof for detention they can bill.

### 1.4 Success metrics (design the app to show these)
- Time from "upload invoice" to "first finding": under 60 seconds with demo data.
- Every finding shows: amount, reason, rule used, evidence, next action.
- A new user finishes onboarding in under 5 minutes.

## 2. TECH STACK (fixed - do not debate)

- Monorepo, pnpm workspaces, TypeScript everywhere.
- `apps/web`: React + Vite + Tailwind + Radix UI primitives + Recharts (or visx) + TanStack Query + React Router.
- `apps/api`: Node + Fastify + Zod + Drizzle ORM + SQLite (better-sqlite3). Easy to run, easy to move to Postgres later.
- `packages/shared`: Zod schemas, types, money utils (integer cents only), date utils.
- `packages/audit-engine`: pure TypeScript rules engine. No I/O. Fully unit-tested.
- `packages/ingest`: CSV, Excel (xlsx), and simple EDI 210 parsers. Column mapping logic.
- `packages/demo-data`: seeded synthetic data generator (deterministic seed).
- Tests: Vitest (unit, integration), Playwright (end-to-end, `--trace off`).
- PDF: `pdf-lib` or `pdfkit` for dispute packets.
- Auth for MVP: email + password with argon2, session cookie, role checks. Add a "Demo mode" button that logs in as a seeded user.
- Lint and format: ESLint + Prettier. CI file for GitHub Actions.

## 3. SCOPE OF THE MVP (must all work)

### 3.1 Screens
1. **Onboarding wizard** - Upload files OR click "Use demo data". Map columns. Preview. Confirm.
2. **Command Center (home)** - "Money found", "At risk this week", "Open disputes", top 10 findings, deadline timeline.
3. **Findings list** - Filter by carrier, type, amount, status. Sort. Bulk select. Keyboard shortcuts.
4. **Finding detail** - Invoice line vs contract side by side. Rule explained in plain words. Evidence timeline. Buttons: Dispute / Accept / Snooze.
5. **Free-Time Guard** - Calendar and list of clocks. Color by urgency. Daily cost of delay.
6. **Dispute Center** - Kanban: Draft, Sent, Carrier replied, Won, Lost. One-click packet (PDF + email text).
7. **Contracts and Rates** - Upload or edit rate tables, fuel tables, accessorial rules, free-time terms.
8. **Carrier Scorecard** - Error rate, win rate, average days to resolve, money lost per carrier.
9. **Savings Report** - Monthly report, ROI, export to PDF and CSV.
10. **Settings** - Team, roles, thresholds, notification rules, data import history.

### 3.2 Audit rules (build at least these 14, each with tests)
1. Duplicate invoice or duplicate line.
2. Rate differs from contract rate.
3. Weight or class differs from shipment record.
4. Fuel surcharge differs from the agreed table.
5. Accessorial charge with no matching event or proof.
6. Detention billed inside free time.
7. Detention billed with wrong hourly rate or wrong rounding.
8. Demurrage billed for days when the port was closed (holiday/weekend table).
9. Charge for a service not in the contract.
10. Invoice date after the contract expiry.
11. Minimum charge applied wrongly.
12. Currency or unit conversion error.
13. Late invoice (outside the billing window in the contract).
14. Total on invoice does not equal sum of lines.

Each rule must return: `ruleId`, `severity`, `amountCents`, `confidence` (0-1), `explanation` (plain words, STE style), `evidence[]`, `suggestedAction`.

### 3.3 Free-Time Guard logic
- Input: container or trip events (gate-in, discharge, pickup, return, arrival, departure).
- Compute free time left, per diem rate, deadline, money at risk per day.
- Alert levels: Green (>3 days), Amber (1-3 days), Red (<24 h), Overdue.
- Alerts show in the app and in a daily digest (email text is generated and saved; real sending is behind an adapter interface with a console implementation).

### 3.4 Out of scope for MVP (write in docs as "Next")
Live carrier API connections, live port APIs, payment execution, mobile apps.
Build the adapter interfaces so they can be added later.

## 4. DESIGN REQUIREMENTS (the app must look excellent)

- Style: calm, clear, professional. Think "modern finance tool", not "old ERP".
- Build a design system FIRST (tokens: color, space, type, radius, shadow, motion).
- Light and dark theme. Respect `prefers-color-scheme`. Manual toggle too.
- Money is the hero. Large numbers. Green = recovered. Red = at risk. Use color only with a label or icon too (accessibility).
- Every list has: loading skeleton, empty state with a clear next step, error state with retry.
- Keyboard first: command palette (Cmd/Ctrl+K), `j/k` list navigation, `d` to dispute.
- Responsive: usable at 360 px width up to wide screens. Tables become cards on small screens.
- Accessibility: WCAG 2.2 AA. Focus rings, labels, contrast, reduced-motion support.
- Motion: small and useful (number count-up, panel slide). Never block the user.
- Microcopy: simple words. Use verbs on buttons. Explain every flag in one short sentence.
- Charts: follow the `dataviz` skill. Use a validated palette. Add tooltips and table fallback.
- Prefer a diagram or chart to a paragraph wherever the user must understand a flow.

## 5. THE AGENT TEAM AND THE WORKFLOW

Parallel agents cause bugs when two agents edit the same file or guess each other's interfaces.
Solve this with CONTRACTS FIRST and FILE OWNERSHIP.

```
PHASE 0 (you, alone)  ->  PHASE 1 (agents in parallel)  ->  PHASE 2 (integration)  ->  PHASE 3 (independent review)  ->  PHASE 4 (polish + release)
```

### PHASE 0 - Foundation (ORCHESTRATOR only, no sub-agents yet)
Create these files and commit them. They are the single source of truth.

1. `docs/SPEC.md` - Product spec from sections 1-4 above, with user stories and acceptance criteria.
2. `docs/ARCHITECTURE.md` - Include a diagram (Mermaid) of the system and of the data flow.
3. `packages/shared/` - All Zod schemas and TS types: Shipment, Invoice, InvoiceLine, Contract, RateTable, FuelTable, FreeTimeTerm, Event, Finding, Dispute, Carrier, User, Org.
4. `docs/API.md` + `apps/api/openapi.yaml` - Every endpoint, request, response, error shape.
5. `apps/api/src/db/schema.ts` - Drizzle schema and first migration.
6. `apps/web/src/design/` - Design tokens, Tailwind config, base components list (Button, Input, Select, Table, Card, Badge, Dialog, Toast, Tabs, Skeleton, EmptyState, Stat, Timeline).
7. `docs/OWNERSHIP.md` - The file-ownership table (see section 6).
8. Repo scaffold that builds: `pnpm install && pnpm build && pnpm test` must pass with empty tests.

Do not start Phase 1 until Phase 0 builds.

### PHASE 1 - Parallel build (start ALL agents in ONE message so they run at the same time)

| Agent | Owns | Task |
|---|---|---|
| **A1 Audit Engine** | `packages/audit-engine/**` | Build the 14 rules and the Free-Time calculator. Pure functions. 95%+ branch coverage. Table-driven tests with golden cases. |
| **A2 API + DB** | `apps/api/**` (except audit logic) | Implement all endpoints from OpenAPI. Auth, roles, validation, pagination, error handling, audit log, seed script. Integration tests. |
| **A3 Ingest** | `packages/ingest/**` | CSV/XLSX/EDI-210 parsers. Column auto-mapping with confidence. Bad-row report. Fuzz and edge-case tests (encoding, dates, decimals, blank lines). |
| **A4 Demo Data** | `packages/demo-data/**` | Deterministic generator: 6 carriers, 12 months, 3,000 invoices, with INJECTED known errors (so tests can prove detection). Output a "truth file" that lists every injected error. |
| **A5 Design System + Shell** | `apps/web/src/design/**`, `apps/web/src/shell/**` | Components, theme, layout, nav, command palette, Storybook-style `/design` preview page. |
| **A6 Web Features 1** | `apps/web/src/features/{onboarding,command-center,findings}/**` | Screens 1, 2, 3, 4 using the shared types and a typed API client. |
| **A7 Web Features 2** | `apps/web/src/features/{guard,disputes,contracts,scorecard,reports,settings}/**` | Screens 5-10. |
| **A8 Dispute Packets + Reports** | `apps/api/src/pdf/**`, `apps/web/src/features/reports/pdf/**` | PDF dispute packet, email text, monthly savings PDF/CSV. |
| **A9 QA / E2E** | `e2e/**`, `.github/workflows/**` | Playwright tests for the 5 critical journeys (section 8). CI pipeline. Writes tests against the SPEC, not against the code. |
| **A10 Docs + Security** | `docs/**` (except files from Phase 0), `README.md`, `SECURITY.md` | README with quick start, user guide with diagrams, threat model, dependency audit, OWASP checklist. |

Rules for every agent (paste these into each agent prompt):
- Read `docs/SPEC.md`, `docs/ARCHITECTURE.md`, `docs/API.md`, and `docs/OWNERSHIP.md` first.
- Edit ONLY the files you own. If you need a change in a file you do not own, write it to `docs/REQUESTS.md` as a request. Do not edit it.
- Do not change shared types or OpenAPI. Request the change instead.
- Use the shared money utils. Money is integer cents. Never use floats for money.
- Write tests with your code. Run them. Do not report success if a test fails.
- Make small commits with clear messages. Never force-push. Never rewrite history.
- Finish with a short report: what is done, what is not done, how to run it, open risks.

### PHASE 2 - Integration (ORCHESTRATOR, then 2 agents)
1. Merge all agent work. Resolve `docs/REQUESTS.md` items. Update contracts if needed, then notify the owners.
2. Run: build, lint, typecheck, unit, integration.
3. Run the app with demo data. Run the **truth-file test**: the audit engine must find at least 95% of injected errors with fewer than 3% false positives. Print the result table.
4. Start two agents in parallel:
   - **B1 Integration Fixer** - Fix all cross-module bugs found.
   - **B2 UX Walkthrough** - Use Playwright to open every screen at 3 widths (360, 768, 1440), in both themes. Save screenshots (deviceScaleFactor 2) to `docs/screens/`. List visual and usability defects.

### PHASE 3 - Independent review (start in parallel; reviewers must NOT have written the code)
- **R1 Correctness Reviewer** - Review audit rules against the SPEC with new edge cases. Try to break them.
- **R2 Security Reviewer** - AuthN/AuthZ, IDOR (org isolation), SQL injection, file-upload abuse (zip bombs, formula injection in CSV/XLSX), XSS, CSRF, rate limits, secrets.
- **R3 Accessibility + Performance Reviewer** - axe checks on all screens. Lighthouse. Test with 50,000 findings: lists must stay smooth (virtualize).
- **R4 Skeptic** - Read the SPEC and the app. Answer: "Would a logistics manager pay for this? What is missing? What is confusing?" List the top 10 gaps.

Orchestrator: triage all findings. Fix every Critical and High. Write the rest into `docs/KNOWN_ISSUES.md`.

### PHASE 4 - Polish and release
- Fix issues from Phase 3. Re-run all tests.
- Add a 90-second "guided tour" in the app (first run).
- Write `docs/DEMO_SCRIPT.md`: a 5-minute demo that shows money found, a dispute sent, and a deadline saved.
- Final check list (section 9). Tag `v0.1.0`.

## 6. FILE OWNERSHIP RULES

- `docs/OWNERSHIP.md` lists each path and its owner.
- Only the ORCHESTRATOR edits: `packages/shared/**`, `apps/api/openapi.yaml`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, `docs/API.md`, `package.json` files, lockfile, root config.
- If an agent needs a new dependency, it asks in `docs/REQUESTS.md`. The ORCHESTRATOR installs it. (This stops lockfile conflicts.)
- If two agents must use one file, split the file first.

## 7. CODE QUALITY RULES

- TypeScript strict mode. No `any` without a comment that says why.
- Validate all input with Zod at the API edge. Never trust the client.
- Org isolation: every DB query must filter by `orgId`. Add a test that proves one org cannot read another org's data.
- Pure functions in the audit engine. No date or random calls inside; pass a `clock` argument.
- Explain each audit result in plain words. Example: "The contract rate is $1.82 per mile. The invoice charged $2.10. The difference is $0.28 per mile for 412 miles = $115.36."
- Log structured JSON. Do not log personal data.
- Use environment variables for config. Provide `.env.example`.

## 8. CRITICAL JOURNEYS (end-to-end tests)

1. New user -> "Use demo data" -> sees Command Center with findings in under 60 s.
2. Upload a CSV invoice file with messy headers -> map columns -> findings appear.
3. Open a finding -> read the explanation -> click Dispute -> download the PDF packet -> status moves to "Sent".
4. Free-Time Guard shows a Red clock -> user clicks "Draft pickup request" -> alert clears after the event is added.
5. Executive opens Savings Report -> exports PDF -> numbers match the Command Center.

## 9. DEFINITION OF DONE (all must be true; show proof for each)

- [ ] `pnpm install && pnpm build && pnpm lint && pnpm typecheck && pnpm test` pass from a clean clone.
- [ ] `pnpm dev` starts API and web. `pnpm seed` loads demo data.
- [ ] All 10 screens work. All 14 rules work. Free-Time Guard works.
- [ ] Truth-file test: recall >= 95%, false positives < 3%.
- [ ] 5 Playwright journeys pass.
- [ ] No Critical or High items open from R1-R4.
- [ ] axe: zero serious or critical violations.
- [ ] Screenshots at 3 widths and 2 themes in `docs/screens/`.
- [ ] README quick start works on a clean machine.
- [ ] No secrets in git history. `.env.example` is present.

## 10. FINAL REPORT FORMAT

End your last message with:
1. A diagram (Mermaid) of what was built.
2. A table: requirement -> status -> proof (command output or file path).
3. Honest list: what is not done and why.
4. The exact commands to run the app.
5. "ASSUMPTION - verify" list of market claims that need real research.

## 11. IF YOU GET STUCK

- Do not guess a contract. Ask in `docs/REQUESTS.md` or decide, write the decision in `docs/DECISIONS.md`, and continue.
- If an agent fails, read its report, fix the cause, and start a new agent with a narrower task.
- Never hide a failing test. Never delete a test to get green.
