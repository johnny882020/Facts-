# Venture ideation round two: AI industry as customer (date 2026-11-12)

Method notes: ~14 WebSearch calls, all in "standard" mode. WebFetch failed (resource-recycling.com not resolvable from this session; it would need to be allowed in network settings). All figures below come from search-result text, not from opened primary documents. Primary filings (10-K/10-Q) were NOT opened; anything attributed to a filing is via secondary reporting and labeled. Aggregators (enkiai, introl, algeriatech, altss, substacks) are low-reliability and excluded from sizing.

## IDEA 1: Long-lead electrical equipment "slot and shipment truth" tracker (tier-2/3 expediting)

**Problem:** Transformers, switchgear and breakers for AI sites arrive years after order, with slips discovered late, so energization dates and GPU delivery dates drift.
**Who pays:** VP/Director of Data Center Construction or Supply Chain at a neocloud or colo developer (CoreWeave-type, powered-shell developers); secondary: hyperscaler data center program managers.

**Size (FACT unless marked)**
- Lead times: power transformers averaged 128 weeks and GSUs 144 weeks in Wood Mackenzie's Q2 2025 survey; HV circuit breakers about 125 weeks (via search summary; I did not open WoodMac). Source type: trade press relaying consultancy data. https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market/ (2026-05-11) and https://powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/ . Reuters-based report of GSU >160 weeks in Q1 2026 (secondary, unverified against Reuters): https://www.kitco.com/news/off-the-wire/2026-07-09/us-power-companies-scramble-secure-equipment-surging-data-center
- Uptime Institute survey (Sep-Oct 2025, 445 owner/operators): 62% suffered supply chain delays; manufacturing issues leading cause. Primary (industry body). https://intelligence.uptimeinstitute.com/sites/default/files/2025-12/UI%20Field%20189_Supply%20chains%20show%20signs%20of%20stability.pdf (Dec 2025; the 62% figure is from Feb 2026 results as surfaced by search)
- Delay incidence: Bloomberg/Sightline Climate, via press, say about 12 GW planned for 2026 with close to half delayed or canceled. Secondary. https://www.tomshardware.com/tech-industry/artificial-intelligence/half-of-planned-us-data-center-builds-have-been-delayed-or-canceled-growth-limited-by-shortages-of-power-infrastructure-and-parts-from-china-the-ai-build-out-flips-the-breakers (2026). Sightline's is a forecast, not measured outcome.
- Single-vendor delay cost, FACT via press: CoreWeave cut 2025 revenue guidance from $5.15-5.35B to $5.05-5.15B citing a third-party powered-shell developer delay (Nov 2025). https://www.bisnow.com/national/news/data-center-capital-markets/data-center-delays-trigger-selloff-of-ai-cloud-firm-coreweave-131860 . Arithmetic (INFERENCE): midpoints 5.25B to 5.10B = about $150M revenue shifted from one delayed vendor.
- Build cost: JLL global average shell-and-core $10.7M/MW (2025), forecast $11.3M/MW (2026), excluding IT; fit-out up to $25M/MW for AI. https://www.jll.com/en-us/insights/market-outlook/data-center-outlook.html (2026, broker research). Delay carrying cost = INFERENCE: $11.3M x assumed 8% capital cost (assumption, UNVERIFIED) = about $0.9M per MW per year idle shell, before lost revenue. No published per-day delay cost found.
- Hyperscaler capex 2026 about $720-745B across four (Amazon about $220B, Alphabet $195-205B, Microsoft about $175B, Meta $130-145B) per secondary reporting that itself flags inconsistent accounting and conflicts with an earlier Microsoft figure near $190B. https://www.datacentres.com/news/ai-demand-surge-hyperscaler-capex-2026 (low-moderate reliability; verify against 10-Qs).

**Why now:** 2024-2026 lead-time blowout (above); Uptime shows 3 in 5 hit delays; CoreWeave guidance cut shows public-market consequence; ConstructionExec says a single delayed transformer can halt commissioning for months (secondary) https://constructionexec.com/article/power-people-parts-supply-and-demand-on-data-center-jobsites/ .

**Product:** Ingests PO/order-slot data, OEM factory milestone emails/ASN, and freight events to give a probabilistic delivery date per transformer/switchgear lineup and flag slips at tier-2 (core steel, bushings, breakers) before the OEM admits them. Alerts trigger expedite actions and swap-in options from a matched pool of cancelled/reserved slots. First user: a neocloud's construction procurement lead with 20-100 open electrical POs. Day-1: forward the PO log and OEM correspondence; get a ranked risk list within a week. Data access: buyers share POs with project-controls and logistics vendors already (CargoSense markets data center equipment tracking and acquired Adapt-IP wireless tracking; vendor marketing) https://www.datacenterfrontier.com/press-releases/article/55405120/cargosense-adds-wireless-3d-tracking-with-adapt-ip-acquisition-targeting-data-center-supply-chain-bottlenecks . Tier-2/3 supplier data sharing is the hard part: no evidence found.

**Why a startup wins / incumbents:** OEMs (Hitachi Energy, Siemens Energy, Eaton, Schneider) are conflicted and opaque; general visibility vendors exist (Project44-type, Loop raised $95M Series C Apr 2026 per press, GenLogs $60M Series B Feb 2026) but none found specialized on electrical long-lead; CargoSense is the closest. Project-controls incumbents (Oracle Primavera, Procore) track schedules but not factory-level truth (INFERENCE).

**Business model:** SaaS per GW-in-construction or per open PO, plus success-fee on expedited slot. No benchmark found.

**Assumptions and 30-day tests**
1. Buyers will give PO and OEM correspondence access. Test: 15 cold interviews with neocloud/colo procurement leads; need 5 willing to share a redacted PO log.
2. Slips are predictable before OEMs disclose. Test: take 3 buyers' historical POs; back-test whether public signals (shipments, import records, factory notices) flagged slips with >30 days lead.
3. Buyers can act on early warning (re-sequence, swap, expedite). Test: ask each interviewee for last 3 slips and what they would have done; need at least 2 concrete actions with dollar value.

**Confidence: Medium.** Pain is well evidenced and quantifiable; data access and actionability are unproven. Volatility: depends on equipment scarcity easing (Uptime says supply chains "show signs of stability") or AI capex pullback; a demand slowdown shortens the window.

## IDEA 2: GPU fleet residual-value and decommission orchestration (price discovery plus ITAD routing)

**Problem:** Operators carry hundreds of billions of GPU/server assets on assumed lives with no liquid price index or routed exit, so end-of-life value is left on the table and depreciation policy is guesswork.
**Who pays:** VP Asset Management / Treasury at a neocloud with GPU-backed debt, and Head of Hardware Lifecycle at a hyperscaler; lenders to neoclouds as a second payer (INFERENCE).

**Size**
- Depreciation sensitivity (FACT via secondary reporting of filings): Meta lengthened server life to 5.5 years from Jan 1, 2025, cutting 2025 depreciation by about $2.9B; Amazon shortened a subset from 6 to 5 years, raising 2025 D&A by $1.4B (net income down $1.0B). https://www.accountingtoday.com/articles/metas-accounting-move-on-ai-servers-to-boost-profit ; https://behindthebalancesheet.substack.com/p/amazons-ai-reality-check (Substack, low-reliability; confirm in 10-K). Inference: one year of life assumption swings billions, so residual-value evidence has direct P&L value.
- Price opacity (FACT, low-reliability vendor/marketplace blogs): used H100 quotes range from $12,500-15,000 (Feb 2026) to $25,000-35,000 (Spheron) with peak near $50,000 in mid-2024; 2x dispersion partly from mixing SXM/PCIe and condition. https://hashrateindex.com/blog/used-gpu-market-pricing-deprecation-secondary-ai/ ; https://www.morphllm.com/nvidia-h100 ; https://www.spheron.network/blog/nvidia-h100-news-2026/ . Inference: no trusted benchmark exists.
- ITAD demand: Iron Mountain Q2 2026 ALM revenue $288M (+88% y/y), data center decommissioning more than doubled, about $30M timing benefit; ALM expected near $1B in 2026; management warned of lumpiness. Source: earnings call coverage (secondary) https://www.nasdaq.com/articles/iron-mountain-q2-earnings-call-highlights
- Volume outlook: Resource Recycling headline "$60 billion in AI servers will create an ITAD challenge" (article body not read; fetch blocked) https://resource-recycling.com/e-scrap/2026/06/03/60-billion-in-ai-servers-will-create-an-itad-challenge/ . Global Market Insights data center ITAD $13.1B (2025) to $33.6B (2035) is a market-research forecast, low reliability.
- Failure/refresh: Meta Llama 3 405B run, 16,384 H100s, 54 days: 419 unexpected interruptions, 148 (30.1%) GPU-related, 72 (17.2%) HBM3 (Meta paper via Tom's Hardware) https://www.tomshardware.com/tech-industry/artificial-intelligence/faulty-nvidia-h100-gpus-and-hbm3-memory-caused-half-of-the-failures-during-llama-3-training-one-failure-every-three-hours-for-metas-16384-gpu-training-cluster . Relevance: condition data affects resale grade.

**Why now:** first Blackwell-era refresh pressure; trade press expects first GPU-dense decommission wave 2026-2029 (secondary); Iron Mountain results show hyperscaler decommissioning is real now; accounting-life debate is public.

**Product:** A grading and pricing layer that ingests fleet telemetry (ECC/XID errors, hours, thermal history, firmware), produces a certified condition grade and expected resale price band, and routes lots to the best of resale, redeploy, parts harvest or recycle, with data-wipe and chain-of-custody records. First user: neocloud finance/asset team with a debt covenant tied to collateral value. Day-1: upload a fleet inventory plus telemetry export; receive a mark-to-market range per SKU cohort. Data access: operators already hand hardware to ITAD firms (Iron Mountain, SK tes, Securis per search) so inventory sharing is normal; telemetry sharing is untested.

**Why a startup wins / incumbents:** Iron Mountain ALM, SK tes, Sims Lifecycle Services (confirmed named in query; no 2026 data found), Securis, ROC Telecom exist and sell service, not neutral pricing. Marketplaces (Compute Exchange per a search summary, BuySellRAM) exist. Gap (INFERENCE): independent, telemetry-based grading usable by lenders and auditors.

**Business model:** Subscription per fleet valuation plus 1-3% take rate on transacted lots (take rate is an assumption; no benchmark found).

**Assumptions and tests**
1. Operators will release telemetry for grading. Test: ask 10 operators/ITAD firms; need 3 to share sample logs.
2. Telemetry predicts resale price/buyer acceptance. Test: pair 30 graded units with broker bids from 2 brokers; check bid spread versus grade.
3. Lenders or auditors will pay for independent marks. Test: 8 calls with GPU-backed lenders and auditors; need 2 stating budget.

**Confidence: Low-Medium.** Cleanly sized spend only via depreciation sensitivity (inference). Highly volatile: resale prices swing with the AI boom, rental rates and Blackwell supply; a bust lowers residual values but raises need for marks, a boom shrinks urgency. Core Weakness: used-GPU price evidence is entirely low-reliability.

## IDEA 3: Shipment-level export-control and custody assurance for AI servers (neoclouds, OEMs, distributors, resellers)

**Problem:** High-value GPU servers are diverted via false end-users and third countries, and sellers face criminal and licensing exposure with only paperwork-based checks.
**Who pays:** Head of Trade Compliance at server OEMs/ODMs, distributors and neoclouds operating in or selling into Southeast Asia and the Gulf.

**Size**
- Enforcement (FACT via press): DOJ charged four people (Nov 2025) over 400 A100s exported to China via Malaysia Oct 2024-Jan 2025, plus attempted shipment of 10 HP supercomputers with H100s and 50 H200s via Thailand. https://investinglive.com/news/us-charges-four-in-nvidia-chip-smuggling-case-revives-calls-for-chip-tracking-20251121/amp ; Reuters-sourced.
- 2026 (single analytic source, treat with caution): Super Micro-linked diversion prosecution via Thailand and a $2.5B figure, BIS guidance May 31, 2026 requiring licenses for entities whose ultimate parent is in China/Macau; Singapore prosecution (Alan Wei, 11 charges, plea July 6, 2026); Malaysian customs seized 72 server units June 26, 2026. https://asiatimes.com/2026/03/super-micro-bust-signals-tighter-us-curbs/ ; https://asiatimes.com/2026/06/nvidia-gpu-crackdown-hits-china-linked-southeast-asia-data-centers/ ; https://modeldiplomat.com/story/singapores-390m-nvidia-chip-case-explained ; https://www.khaleejtimes.com/world/asia/malaysian-customs-foil-13-million-ai-chip-smuggling
- Nvidia opt-in location verification software (Dec 10, 2025 statement) reduces need for pure paperwork but resolves country-level only. https://www.pcgamer.com/hardware/graphics-cards/nvidia-has-built-location-tracking-tech-that-uses-the-confidential-computing-capabilities-of-its-ai-chips-to-prevent-smuggling-according-to-a-reuters-report
- Spend: NO figure found for compliance spend or fines per firm. UNVERIFIED, excluded from sizing. $1.2M per violation penalty claim from a practitioner blog is unconfirmed.

**Why now:** DOJ cases, BIS subsidiary rule, Chip Security Act proposed (status in 2026 not confirmed).

**Product:** Per-shipment risk file: serial-number-to-order-to-consignee graph, end-user verification (ownership trace, site imagery, power-draw plausibility), custody events from carriers, and post-delivery attestation tied to Nvidia telemetry where installed. First user: a mid-size distributor/reseller ahead of a BIS audit. Day-1: upload last 6 months of serials and consignees; get flagged consignees. Data access: serials and consignee data are the seller's own; carriers' data via integrations. Evidence of vendor use by buyers: not found beyond general sanctions-screening norms.

**Incumbents:** Descartes, Thomson Reuters ONESOURCE-type trade compliance suites (not verified in this session), plus supply-chain risk graph vendors. Startup angle is serial-level post-delivery assurance (INFERENCE).

**Business model:** Per-shipment or per-1,000-serials fee. No benchmark found.

**Assumptions and tests**
1. Budget exists beyond legal counsel. Test: 10 compliance-head interviews; need 3 with identifiable line item.
2. Post-delivery verification is feasible without customer cooperation. Test: pilot on 100 serials in a friendly reseller; measure fraction confirmable.
3. Policy stays tightening. Test: track BIS rules and bill status weekly for 30 days; falsified if a loosening rule (e.g., licensed China sales framework per a search snippet on H200/MI325X with 25% US cut, unverified) dominates.

**Confidence: Low.** Enforcement trend is documented but spend is not; policy can flip; buyers may rely on counsel. Highly policy-volatile.

## REJECTED OR DEMOTED

- **Site-level material logistics and staging tracker:** rejected as standalone. CargoSense (acquired Adapt-IP; MegaChips investment April per press) already targets this https://www.datacenterfrontier.com/press-releases/article/55405120/cargosense-adds-wireless-3d-tracking-with-adapt-ip-acquisition-targeting-data-center-supply-chain-bottlenecks ; folded into Idea 1 as a data source.
- **Commissioning/construction delay-cost quantification product:** no published per-day delay cost from JLL, CBRE or others; delay cost would be self-derived. Kept only as Idea 1 feature.
- **Spare-parts and RMA logistics for large fleets:** Llama 3 failure data shows volume (419 interruptions in 54 days) but no source on RMA terms, warranty or replacement lead times was found; OEMs control RMA. Insufficient evidence, rejected for now.
- **Energy-aware scheduling of heavy freight:** no evidence found of a measurable cost; not researched further (budget).

## Gaps
- No primary filings opened (10-K/10-Q capex, useful-life). Verify Meta/Amazon lines and 2026 capex before external use.
- No Wood Mackenzie primary document opened.
- No evidence of tier-2/3 supplier data sharing; no pricing benchmarks for any idea.
- Resource Recycling and several other trade sites were not fetchable.
