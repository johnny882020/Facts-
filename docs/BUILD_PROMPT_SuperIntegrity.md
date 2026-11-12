# MASTER PROMPT: Build "Super Integrity" on Day 0 with Parallel Agents

> Paste everything below the line into a new Claude Code session (model: Sonnet 5.5).
> That session is the ORCHESTRATOR. It starts sub-agents with the Agent tool.
> Research basis: `reports/Super Integrity logistics AI research.md` and `research_notes/`.
> Read the report first. Its "verification register" is binding (see section 5).

---

## 0. YOUR ROLE AND HARD RULES

You are the ORCHESTRATOR. You lead specialist agents. You build one complete app that runs end to end on day 0: web UI, API, database, tests, and CI/CD.

Rules:
1. Use short sentences. Use one word for one thing.
2. Do not invent facts, numbers, laws, or dates. Every legal or market fact in the app or docs must come from the research report or be marked `needs_verification`.
3. Use synthetic demo data only. No real customer data. No secrets in git.
4. Work on the branch the session gives you. Commit often. Do not open a pull request unless asked. Never force-push.
5. Do not say "done" until you ran build, tests, and the app, and you show the real output.
6. Report failures as failures. Never delete or skip a test to get green.

## 1. THE COMPANY AND THE PRODUCT

**Name:** Super Integrity
**One line:** One evidence-backed claims engine that finds money that a large shipper can recover, proves it with documents, and logs every decision so that finance, legal, and auditors can trust it.

### 1.1 Why these three ideas are one product
The research ranks three ideas highest. They share one data model, so they form one product.

| # | Module | What it does | Why it is in the top three |
|---|---|---|---|
| 1 | **Duty Recovery** | Tariff and customs recovery. First wedge: IEEPA refund eligibility and tracking. Then Section 232/301 duty stacking and classification checks. | Largest solvable money pool in the research. Time-bound. Needs documents. |
| 2 | **Charge Validation** | Ocean demurrage/detention (D&D) and accessorial invoice validation against contract terms and the FMC billing rule (46 CFR part 541). | Direct cash loss. Clear rules. Few products focus on it. |
| 3 | **Integrity Ledger** | Shared layer: shipment events, document hashes, party and ownership links, and an append-only AI decision log. | Every claim needs proof. Fortune 500 buyers and regulators ask for audit trails. This layer makes modules 1 and 2 trustworthy. |

First expansion (build the extension points, not the features): retailer deductions/OTIF disputes. Later vertical: AI-hardware shipment custody.

### 1.2 Core design rule (do not break it)
**Models extract and propose. A deterministic rule engine decides. A human approves anything that moves money.**
- An AI model may read a document and fill fields. It must show the source text and a confidence value.
- The rule engine is plain code and data. It gives the same answer for the same input.
- No claim is sent, and no dollar is called "recovered", without a human approval record.

### 1.3 Users
- **Trade Compliance Lead:** wants a list of refunds and duty errors to claim, with deadlines.
- **Logistics / Transportation Manager:** wants wrong D&D and accessorial charges stopped before payment.
- **AP / Finance Analyst:** wants clean evidence and an export to the ERP.
- **Internal Audit / Legal:** wants to see who decided what, when, and why.
- **Executive:** wants one page: money found, claimed, recovered, still at risk.

### 1.4 Success measures (show them in the app)
- Demo tenant shows first findings within 60 seconds of opening.
- Every finding shows: amount, rule, source documents, deadline, owner, next action.
- Every dollar has an exportable evidence packet.
- A new user finishes onboarding in under 5 minutes.

## 2. THE DATA MODEL (single source of truth)

Six core entities. Every fact is **bitemporal** (`valid_from`, `valid_to`, `recorded_at`).

```
Party ──ownership edges──► Party
Consignment ──has──► Event ──supported by──► Document
Charge ──supported/contradicted by (EvidenceLink, under a Rule)──► Document / Event
Claim (groups Charges) ──has──► Decision (append-only, hash-chained)
Rule (versioned, with source_url, effective_from, effective_to, verification_status)
```

- **Party:** importer, carrier, forwarder, supplier, port, customs broker. Ownership edges support multi-tier origin.
- **Consignment:** shipment or container. Holds HS codes, origin, values, Incoterms, entry numbers.
- **Event:** gate-in, discharge, available, pickup, return, entry filed, liquidated, etc. Has source and timestamp.
- **Document:** invoice, bill of lading, customs entry summary, contract, tariff page, certificate. Stores a SHA-256 hash, parse result, and storage key.
- **Charge:** one invoice line or duty line. Money is integer minor units plus currency. Never floats.
- **Rule:** versioned data with `source_url`, effective dates, and `verification_status` (`verified` | `needs_verification` | `disputed`).
- **Claim / Decision:** human and system decisions. Append-only. Each row stores the hash of the previous row (tamper evidence).

## 3. TECH STACK (fixed; do not debate)

- Monorepo: pnpm workspaces, TypeScript strict everywhere.
- `apps/web`: Next.js (App Router), React, Tailwind, Radix UI primitives, Framer Motion (small, useful motion), Recharts or visx, TanStack Table, Geist-like system font stack (use `-apple-system, SF Pro` first, then Inter).
- `apps/api`: Fastify + Zod (or Next route handlers if the Phase 0 spec says so; choose once and write it in `docs/DECISIONS.md`).
- Database: **PostgreSQL 16**, Drizzle ORM, SQL migrations in git, seed script. Row-level tenant isolation: every table has `org_id`; add Postgres RLS policies plus an app-level filter.
- Queue/jobs: Postgres-based queue (pg-boss) for ingestion and deadline alerts. No extra infra on day 0.
- File storage: S3-compatible interface; local filesystem adapter for dev and tests.
- Auth: email+password (argon2) with sessions, TOTP MFA, roles (Admin, Analyst, Approver, Auditor, Read-only). Add OIDC/SAML SSO **adapter interface** and a working OIDC dev mode. Demo mode button logs in as a seeded user.
- AI adapter: `ExtractionProvider` interface with two implementations: (a) `MockProvider` (deterministic, default, no keys needed) and (b) `ClaudeProvider` (reads `ANTHROPIC_API_KEY`, uses the current model ID from env `EXTRACTION_MODEL`). The app must be fully usable with the mock.
- PDF: pdf-lib. Excel/CSV: `xlsx` / `papaparse`. Treat all uploads as hostile (see section 8).
- Tests: Vitest (unit + integration with real Postgres), Playwright (E2E, run with `--trace off`), axe-core.
- Containers: Dockerfile (multi-stage) + `docker-compose.yml` (web, api, postgres) so `docker compose up` works on a clean machine.
- Observability: structured JSON logs (pino), `/healthz`, `/readyz`, OpenTelemetry hooks (no vendor required).

## 4. SCOPE OF THE DAY-0 PRODUCT

### 4.1 Screens (all must work)
1. **Welcome / Onboarding:** "Use demo data" or upload files. Column mapping with preview. Connect-later cards for ERP, TMS, broker feeds.
2. **Overview:** four big numbers (Found, Claimed, Recovered, At risk), a deadline timeline, top 10 opportunities, a "What needs me today" list.
3. **Duty Recovery:** entries list, refund eligibility status, deadline clock, duty-stack view per HS line, classification check flags.
4. **Charge Validation:** invoices and D&D clocks. Per diem and free-time calculator. FMC billing-rule checklist for each invoice (required fields present, 30-day timing as per the rule record, dispute window).
5. **Opportunity detail (shared):** side-by-side "what was charged" vs "what the rule says", plain-language reason, evidence timeline, source documents with highlighted text, buttons: Approve claim / Reject / Ask for info.
6. **Claims:** pipeline Draft → Approved → Sent → Carrier/CBP replied → Recovered / Lost. One-click evidence packet (PDF + CSV + JSON).
7. **Integrity Ledger:** document list with hashes, event timeline per consignment, party/ownership graph, and the decision log with a "verify chain" button.
8. **Rules Registry:** every rule with source, dates, and verification status. Admins can add a rule version. Unverified rules show a visible badge and cannot auto-approve.
9. **Reports:** monthly savings report (PDF/CSV), ROI view, audit export.
10. **Settings & Admin:** users, roles, SSO settings, API keys, retention, data-import history, subprocessor sheet page.

### 4.2 Rule engine (build at least these; each has table-driven tests)
**Charge Validation**
1. Duplicate invoice or line.
2. Rate differs from contract.
3. Charge inside contract free time.
4. Per diem rounding or day-count error.
5. Days counted when the terminal/port was closed (holiday table is data).
6. Invoice missing required billing-rule fields (rule fields come from the Rules Registry).
7. Invoice sent outside the billing window (window comes from the Rules Registry, with its verification status).
8. Charge not in the contract.
9. Currency/unit error and total does not equal sum of lines.

**Duty Recovery**
10. Entry appears in IEEPA-affected scope (scope definition is a data rule; refund process steps are data, marked `needs_verification` until verified).
11. Refund deadline / liquidation status check (data-driven).
12. Duty stack calculation per HS line (base + 232/301 layers as data rules; stacking order is a rule record).
13. HS code vs description mismatch flag (heuristic; always "review", never "wrong").
14. Duplicate or inconsistent entry values across documents.

**Integrity Ledger**
15. Document hash changed after approval.
16. Event timestamp conflicts across sources.
17. Decision chain broken (hash mismatch).

Each rule returns: `rule_id`, `rule_version`, `amount_minor`, `currency`, `confidence` (0-1), `explanation` (plain words), `evidence_links[]`, `suggested_action`, `needs_human` (always true when money moves).

### 4.3 Out of scope on day 0 (build adapter interfaces and "Coming next" cards)
Live ERP/TMS connectors (SAP, Oracle), live carrier or port APIs, direct CBP ACE filing, payment execution, retailer-deduction module, AI-hardware custody module, mobile apps.

## 5. VERIFICATION GATE (binding)

The research report lists facts that are unconfirmed or in conflict. The product must not hard-code them as true.

- Put each one in the Rules Registry with `verification_status = needs_verification` and show a badge in the UI.
- Items to include: BIS 50% Affiliates Rule status after 9 Nov 2026; EUDR application date; FMC 30-day invoice trigger and effective date, and which parts of 46 CFR 541 remain after the 2025 vacatur of 541.4; IEEPA refund process and treatment of finally liquidated entries; de minimis status; Section 122 legality; Section 232 rates; UFLPA entity-list dates; CBAM and EU AI Act dates.
- In Phase 0, the ORCHESTRATOR (or a research agent with web access) tries to verify each item from primary sources (Federal Register, CBP, FMC, EUR-Lex). Record the result, source URL, and date in `docs/VERIFICATION.md`. If it cannot verify, it stays `needs_verification`.
- Rules that are not `verified` can produce a finding with a "Verify first" label. They cannot be auto-approved or put into a claim packet without an Approver confirming the rule.
- The marketing and docs must not state recovery percentages. Show only measured numbers from the user's own data.

## 6. DESIGN: "APPLE STYLE"

Apple style means: calm, clear, focused, and made with care. Do not copy Apple logos or assets.

**Principles**
- **Clarity:** one main job per screen. Large type. Much white space. Remove anything that does not help the decision.
- **Deference:** content first. UI chrome is quiet. Money and deadlines are the hero numbers.
- **Depth:** subtle layers (soft shadows, blur on sheets and the nav bar), not heavy borders.

**Spec**
- Design tokens first: color (neutral grays + one accent blue + semantic green/amber/red), 4-pt spacing scale, type scale (SF Pro / system), radius 12-20 px, soft shadow levels, motion durations (150-300 ms, spring easing).
- Light and dark themes. Follow `prefers-color-scheme`. Manual toggle.
- Layout: left sidebar (collapsible) + large content area + right-side "sheet" for details. Translucent top bar. Command palette (Cmd/Ctrl+K). Keyboard: `j/k` move, `Enter` open, `a` approve, `?` help.
- Components: Button, Input, Select, Segmented control, Switch, Table (virtualized), Card, Stat, Badge, Dialog, Sheet, Popover, Toast, Tabs, Skeleton, EmptyState, Timeline, Stepper, Hash chip with copy.
- Numbers: tabular figures, animated count-up (respect reduced motion). Always show currency.
- Never use color alone for meaning. Add icon or label.
- Every list has loading skeleton, empty state with next step, and error state with retry.
- Responsive from 360 px to 2560 px. Tables become cards on small screens.
- WCAG 2.2 AA. Visible focus. Reduced-motion support. Screen-reader labels.
- Microcopy: plain words, verbs on buttons, one sentence per explanation.
- Diagrams over paragraphs where a user must understand a flow (for example, the ownership graph and the claim pipeline).
- Charts follow the `dataviz` skill.

## 7. CI/CD (must work on day 0)

`.github/workflows/ci.yml` runs on every push and PR:
1. Install (pnpm, cached).
2. Lint, typecheck.
3. Unit tests.
4. Integration tests with a **Postgres service container** and real migrations.
5. Build web and api.
6. Playwright E2E against `docker compose` stack (`--trace off`; upload report on failure).
7. axe accessibility checks on all screens.
8. Security: `pnpm audit` (fail on high), secret scan (gitleaks), CodeQL.
9. Build Docker image; push to GHCR on the default branch (token from `GITHUB_TOKEN`).

`.github/workflows/deploy.yml`:
- Runs only on the default branch after CI passes, and only if deploy secrets exist (otherwise it prints "skipped: no secrets" and exits 0).
- Deploy target for day 0: **Render** via `render.yaml` Blueprint (web service + Postgres). Include the Blueprint and a `docs/DEPLOY.md` with exact steps. Run migrations in a pre-deploy command. Health check on `/readyz`.
- Never put secrets in the repo. List required env vars in `.env.example`.

Also: Dependabot config, PR template, CODEOWNERS, conventional commits, `CHANGELOG.md`.

## 8. SECURITY AND ENTERPRISE READINESS

- Tenant isolation: RLS + filter + a test that proves org A cannot read org B (on every table).
- Uploads: size limits, type sniffing, no macros, CSV/XLSX formula-injection defense on export, zip-bomb protection, virus-scan adapter interface.
- Prompt injection: document text is **data**. The extraction prompt must treat it as untrusted. Extracted values never trigger actions. Test with injected instructions in sample documents.
- Auth: argon2, rate limits, session rotation, CSRF protection, secure cookies, MFA.
- Audit log: every login, export, approval, and rule change. Append-only. Hash-chained.
- Data: encryption in transit (TLS) and at rest (document the DB and storage settings). Configurable retention. Export-my-data and delete-my-data endpoints.
- Docs: `SECURITY.md`, threat model (with diagram), subprocessor sheet template, SOC 2 readiness checklist (controls mapped to code and CI), data-flow diagram, DPA outline. Do not claim any certification.

## 9. AGENT TEAM AND WORKFLOW

Parallel agents fail when two agents edit the same file or guess each other's interfaces. Fix this with **contracts first** and **file ownership**.

```
PHASE 0 (orchestrator) ─► PHASE 1 (11 agents in parallel) ─► PHASE 2 (integrate + fix)
        ─► PHASE 3 (independent reviewers in parallel) ─► PHASE 4 (polish + release)
```

### PHASE 0: Foundation (orchestrator alone; no sub-agents for writing code)
Create and commit:
1. `docs/SPEC.md`: product spec with user stories and acceptance criteria.
2. `docs/ARCHITECTURE.md`: Mermaid diagrams (system, data model, claim flow, CI/CD flow).
3. `packages/shared/`: Zod schemas and types for all entities in section 2, money utils (integer minor units), date utils, hash utils.
4. `docs/API.md` + `apps/api/openapi.yaml`: every endpoint, request, response, error shape.
5. DB: Drizzle schema, first migration, RLS policies, seed interface.
6. `apps/web/src/design/`: tokens + Tailwind config + component list.
7. `docs/OWNERSHIP.md`: path → owner table (section 10).
8. `docs/VERIFICATION.md`: verification attempts for the section 5 items.
9. `docs/DECISIONS.md`: all choices made.
10. Repo scaffold. **`pnpm install && pnpm build && pnpm test` must pass.** `docker compose up` must start empty services.

Do not start Phase 1 until Phase 0 passes.

### PHASE 1: Parallel build (start ALL agents in ONE message)

| Agent | Owns | Task |
|---|---|---|
| **A1 Rule Engine** | `packages/rules/**` | Pure-function rules (section 4.2), D&D calculator, duty-stack calculator, Rules Registry loader. Injectable clock. 95%+ branch coverage. Golden-case tests. |
| **A2 Ledger + Crypto** | `packages/ledger/**` | Hash-chain, bitemporal helpers, document hashing, chain verification, tamper tests. |
| **A3 API + DB** | `apps/api/**` (except pdf, ingest wiring) | All endpoints, auth, MFA, RBAC, RLS, audit log, jobs, health, pagination, errors. Integration tests with real Postgres. |
| **A4 Ingest + Extraction** | `packages/ingest/**` | CSV/XLSX/PDF-text parsers, column mapping, `ExtractionProvider` (Mock + Claude), source-span highlighting, injection tests. |
| **A5 Demo Data** | `packages/demo-data/**` | Deterministic generator: 3 orgs, 8 carriers, 12 months, ~2,000 invoices, ~1,500 customs entries, with **injected known errors** and a `truth.json`. All fake. |
| **A6 Design System + Shell** | `apps/web/src/design/**`, `apps/web/src/shell/**` | Components, themes, layout, nav, command palette, `/design` preview page. |
| **A7 Web: Core** | `apps/web/src/features/{onboarding,overview,opportunity,claims}/**` | Screens 1, 2, 5, 6. |
| **A8 Web: Modules** | `apps/web/src/features/{duty,charges,ledger,rules}/**` | Screens 3, 4, 7, 8. |
| **A9 Web: Admin + Reports + PDF** | `apps/web/src/features/{reports,settings}/**`, `apps/api/src/pdf/**` | Screens 9, 10. Evidence packet PDF/CSV/JSON. Monthly report. |
| **A10 DevOps + QA** | `.github/**`, `Dockerfile`, `docker-compose.yml`, `render.yaml`, `e2e/**` | Section 7 in full. Playwright for the 6 critical journeys (section 11). Writes tests from the SPEC, not from the code. |
| **A11 Docs + Security** | `docs/**` (not Phase 0 files), `README.md`, `SECURITY.md` | README quick start, user guide with diagrams, threat model, SOC 2 checklist, subprocessor sheet, deploy guide. |

Rules for every agent (paste into each agent prompt):
- Read `docs/SPEC.md`, `ARCHITECTURE.md`, `API.md`, `OWNERSHIP.md`, `VERIFICATION.md`, and this prompt's sections 1.2, 5, 6 first.
- Edit only the files you own. Need a change elsewhere? Add it to `docs/REQUESTS.md`. Do not edit the file.
- Do not change shared types, OpenAPI, the DB schema, or dependencies. Request the change.
- Money is integer minor units. Never use floats for money.
- Write tests with the code. Run them. Do not report success if a test fails.
- Small commits. Clear messages. Never force-push.
- Final report: what is done, what is not, how to run it, open risks.

### PHASE 2: Integration (orchestrator, then 2 agents in parallel)
1. Merge work. Resolve `REQUESTS.md`. Update contracts, tell owners.
2. Run lint, typecheck, unit, integration, build, `docker compose up`.
3. Run the **truth test**: rules must find at least 95% of injected errors with under 3% false positives. Print the table.
4. Start in parallel:
   - **B1 Integration Fixer:** fixes cross-module bugs.
   - **B2 UX Walkthrough:** uses Playwright to visit every screen at 360, 768, 1440 px in both themes. Saves screenshots (deviceScaleFactor 2) to `docs/screens/`. Lists defects.

### PHASE 3: Independent review (start in parallel; reviewers did not write the code)
- **R1 Correctness:** attacks the rules with new edge cases; checks money math and time zones.
- **R2 Security:** tenant isolation, authN/authZ, injection, prompt injection, upload abuse, CSRF, secrets, dependency risks.
- **R3 Accessibility and performance:** axe, Lighthouse, 50,000-row lists stay smooth.
- **R4 Legal-fact checker:** checks every legal or market statement in UI, docs, and seed rules against `VERIFICATION.md` and the research report. Finds unsupported claims.
- **R5 Skeptic:** "Would a Fortune 500 logistics or trade-compliance lead pay for this? What is missing? What is confusing?" Lists the top 10 gaps.

Orchestrator fixes every Critical and High finding. Write the rest to `docs/KNOWN_ISSUES.md`.

### PHASE 4: Polish and release
- Fix review items; re-run everything.
- First-run guided tour (under 90 seconds).
- `docs/DEMO_SCRIPT.md`: a 5-minute demo: open demo tenant → see refund opportunities → open a wrong D&D charge → approve a claim → download the evidence packet → verify the ledger chain.
- Tag `v0.1.0`.

## 10. FILE OWNERSHIP

- `docs/OWNERSHIP.md` maps every path to one owner.
- Only the orchestrator edits: `packages/shared/**`, `apps/api/openapi.yaml`, DB schema and migrations, root `package.json`, lockfile, root configs, Phase 0 docs.
- New dependency? The agent asks in `REQUESTS.md`. The orchestrator installs it (this stops lockfile conflicts).
- If two agents need one file, split it first.

## 11. CRITICAL JOURNEYS (Playwright)

1. Open app → "Use demo data" → Overview shows found/at-risk numbers in under 60 s.
2. Upload a messy CSV of D&D invoices → map columns → findings appear.
3. Open a D&D finding → read the reason and evidence → Approve → download the evidence packet → status becomes "Sent".
4. Duty Recovery: open an entry with a `needs_verification` rule → UI shows "Verify first" → Approver confirms the rule → claim can proceed.
5. Ledger: change a document after approval → hash-mismatch alert appears → "Verify chain" shows the break.
6. Tenant isolation: user from org B cannot see org A data (UI and API).

## 12. DEFINITION OF DONE (show proof for each)

- [ ] From a clean clone: `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass.
- [ ] `docker compose up` starts web, api, Postgres. `pnpm db:migrate && pnpm seed` work.
- [ ] All 10 screens work with demo data. All rules in 4.2 work.
- [ ] Truth test: recall ≥ 95%, false positives < 3%.
- [ ] 6 Playwright journeys pass in CI.
- [ ] CI is green on GitHub Actions. The Docker image builds. `render.yaml` validates. Deploy workflow skips cleanly without secrets.
- [ ] RLS isolation test passes for every table.
- [ ] Prompt-injection test passes.
- [ ] axe: zero serious/critical violations.
- [ ] Screenshots at 3 widths × 2 themes in `docs/screens/`.
- [ ] No unverified legal fact is shown as verified. R4 reports zero open items.
- [ ] No secrets in git history. `.env.example` is present.
- [ ] No open Critical/High findings.

## 13. FINAL REPORT FORMAT

End with:
1. A Mermaid diagram of what was built.
2. A table: requirement → status → proof (command output or path).
3. An honest list of what is not done and why.
4. Exact commands to run, test, and deploy.
5. The list of facts still `needs_verification`.

## 14. IF YOU GET STUCK

- Do not guess a contract. Decide, write it in `docs/DECISIONS.md`, continue.
- If an agent fails, read its report, fix the cause, start a new agent with a narrower task.
- Do not hide failing tests. Do not weaken a rule to pass a test.
