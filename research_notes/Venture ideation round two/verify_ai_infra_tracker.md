# Verification: Long-lead equipment and schedule-risk intelligence for AI data-center builders (2026-11-12)

Method: ~16 WebSearch calls (standard mode). WebFetch FAILED (DNS ENOTFOUND) for intelligence.uptimeinstitute.com and constructiondive.com; these hosts must be allowed in session network settings. No primary document (10-Q, 8-K, transcript, Uptime PDF, WoodMac report) was opened. Everything below is search-result summaries of secondary coverage unless stated. Nothing here is a primary-source read.

## 1. Lead times

### Takeaway
Large-transformer lead times are flat-to-rising, not falling, through Q1 2026. The 128/144 figures are Q2 2025 and were a brief dip. No late-2026 data point found. Switchgear numbers are inconsistent by definition.

### Cited Findings
- 128 wks power transformers, 144 wks GSU: Wood Mackenzie Q2 2025 survey; 128 was a 10-week fall. CONFIRMED as a Q2 2025 figure (snippet, not primary) — [Power Magazine](https://powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/); [pv-magazine USA 2026-05-11](https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market/)
- GSU >160 weeks in Q1 2026 vs 143 weeks avg 2024: Reuters piece (2026-07-09) citing WoodMac analyst Ben Boucher. CONFIRMED as reported (secondary syndication, Reuters original not read) — [Kitco/Reuters](https://www.kitco.com/news/off-the-wire/2026-07-09/us-power-companies-scramble-secure-equipment-surging-data-center)
- Large US substation transformers >3 years, ~30% longer than start of 2024 (WoodMac via secondary) — [pv-magazine](https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market/)
- Distribution transformers ~30 weeks, down from >100 weeks peak in 2023; pad-mount expected to worsen through 2026-27 (WoodMac via Reuters syndication).
- Switchgear avg 44 weeks (Q2 2025 survey). Other quotes: ~52 wks standard, >84 wks power breaker switchboards (Terrapin via Industrial Sage, June 2026, vendor/blog); "2-3 years" for MV switchgear at peak-demand makers (market report). Definitions differ, so no single number is reliable — [Industrial Sage](https://www.industrialsage.com/switchgear-lead-times-2026/)
- HV breakers ~125 wks vs 77 in 2023: previously noted; not re-verified this session (STILL UNVERIFIED).

### Inferences
- Direction: rising at the large end (GSU, substation), improving at the small end (distribution). Procurement pain is concentrated in exactly the items the thesis targets, but the "lead time" itself is publicly known; the product must add value beyond knowing nominal lead time.

### Gaps
- No Q3/Q4 2026 WoodMac number found. No primary WoodMac document opened.

## 2. Uptime Institute

### Takeaway
Report title is real. The headline is "signs of stability, delays persist": supply chains improving post-COVID but delays still common. 62% figure is attributed to a Feb 2026 three-page summary, not seen directly. This cuts against the thesis in direction (stability) but supports it in incidence.

### Cited Findings
- Report: UII Data Report 189, Dec 2025, "Supply chains show signs of stability, but delays persist"; online survey Sep-Oct 2025, >400 owner/operators; manufacturing issues leading cause of delays (section heading). CONFIRMED via search summary — [Uptime](https://intelligence.uptimeinstitute.com/resource/supply-chains-show-signs-stability-delays-persist)
- 62% reported delays: attributed to Feb 2026 3-pager summary (snippet only). The exact wording (delays in what? any delay vs project delay) is UNVERIFIED.
- Uptime 2026 survey (n>1,600, Apr-May 2026): 72% concerned about supply chain disruptions, 76% capacity forecasting, 64% power availability — [Data Center Knowledge](https://www.datacenterknowledge.com/ai-data-centers/ai-drives-data-center-uncertainty-in-uptime-s-2026-survey) (from existing notes, not re-checked)
- Caveat: Uptime sample is mostly enterprise and colo operators, not neocloud/hyperscale builders; relevance to the buyer is partial (inference).

### Gaps
- PDF not opened (host blocked).

## 3. Cost of delay (company statements only)

### Takeaway
Two clean company-level data points: CoreWeave 2025 and Microsoft Oct 2026. Neither is a dollar cost of delay in the sense the product would claim, and neither attributes cause to power gear specifically.

### Cited Findings
- CoreWeave (Nov 10, 2025 call): FY2025 revenue guidance cut to $5.05-5.15B from $5.15-5.35B; cause a single third-party data center developer's powered-shell delay; capex FY25 cut to $12-14B; Intrator said the "overwhelming majority" resolves in Q1 2026; contract value and duration preserved. CONFIRMED in several secondary write-ups; 10-Q/transcript not opened — [Alphaspread transcript page](https://www.alphaspread.com/security/nasdaq/crwv/investor-relations/earnings-call/q3-2025); [StreetInsider](https://www.streetinsider.com/Earnings/CoreWeave+flags+hit+from+data+center+delay%2C+shares+fall/25585703.html). Note: delay was in the building shell, not stated as electrical gear.
- Microsoft FQ1 FY27 (Oct 28, 2026 call): capex incl. finance leases $45.2B vs own ">$50B" outlook because some third-party capacity deliveries slipped; calendar-2026 capex ~ $170B; lease reclassification complicates comparison. CFO quote reported by Newsquawk. Secondary only — [Newsquawk](https://www.newsquawk.com/headlines/microsoft-msft-cfo-says-capital-expenditures-were-lower-than-guidance-in-q1-as-some-third-party-capacity-deliveries-we-expected-in-q1-were-delayed); [Let's Data Science](https://letsdatascience.com/news/microsoft-cuts-2026-capex-forecast-to-170b-on-delayed-741510fe). Cause is "third-party capacity" (one source says GPU-as-a-Service contracts), not electrical gear.
- Oracle: force majeure notice to Blue Owl over Project Jupiter (New Mexico 2.5 GW) tied to power delays, Sept 2026, ~1 yr delay per one source; Oracle says schedule unchanged. Press, not filing — [Baxtel](https://baxtel.com/news/oracle-issues-force-majeure-notice-to-blue-owl-over-project-jupiter-data-center-setbacks); [RuntimeWire](https://runtimewire.com/article/oracle-project-jupiter-force-majeure-power-delay). Cause is grid power, which a procurement tool does not fix.
- Delay-cost modeled figures (QTS $55.1M to accelerate 4 months; Occam ~$150M per GW-month revenue at risk): Substack/modeled, low reliability (from prior notes). A "$14.2M per month" figure repeated by ThinkSet/Archdesk is tied to a specific 60 MW facility, vendor content.

### Gaps
- No 10-Q/8-K opened. No company filing found tying a dollar impact to transformers, switchgear, generators or chillers specifically. CoreWeave Q3 2026 (reported ~Nov 10, 2026): one snippet (finanzen.at) gave revenue $8.314B vs $3.559B prior year, which conflicts with Q3 2025 revenue of ~$1.36B found elsewhere; treat as UNVERIFIED and do not use. Meta, Alphabet, Amazon delay statements: not found.

## 4. Buyer spend

### Takeaway
2026 big-four capex about $700-725B on aggregated press, but individual figures conflict across sources and Microsoft's was restated by lease accounting. Electrical/mechanical share: only the IBEW "45-70% of construction cost" claim (prior notes), not a share of total capex.

### Cited Findings
- Microsoft ~$170B CY2026 (trimmed from ~$190B/$175B, partly lease reclassification); Amazon ~ $220B (reported company statement, "approximately $220 billion"); Alphabet $195-205B in one report vs $180-190B in another (conflict, unresolved); Meta $135-145B in one report. Sources: [Let's Data Science](https://letsdatascience.com/news/microsoft-cuts-2026-capex-forecast-to-170b-on-delayed-741510fe); [Tom's Hardware](https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion); [Fortune 2026-10-30](https://fortune.com/2026/10/30/why-big-tech-earnings-are-a-crucial-report-card-for-the-ai-boom-and-its-future/). Aggregator-level, not filings.
- Microsoft CFO reportedly attributed ~$25B of capex to rising memory/component prices (secondary), i.e. a big slice of capex is chips, not electrical gear.
- JLL shell-and-core ~$11.3M/MW 2026 (from prior notes, not re-checked).

### Inferences
- Most capex is IT silicon and memory; electrical and mechanical gear is a minority share (no sourced split found). Addressable software spend is a tiny fraction of equipment spend.

### Gaps
- No 10-K/10-Q capex lines read. No sourced share of capex on electrical/mechanical gear.

## 5. Competition (most important)

### Takeaway
No vendor found that does factory-level, multi-OEM probabilistic delivery forecasting of electrical long-lead gear for data centers. But the adjacent space is crowded and well funded: Buildots ($297M total), Procore, Trimble/Document Crunch, nPlan, CargoSense, plus equipment makers that sell their own tracking. The gap is narrow and thin, and several incumbents are one product release away.

### Cited Findings
- Buildots: $130M raise Sept 14, 2026 (led by O.G. Venture Partners), total $297M; says >100 customers incl. Intel and Digital Realty (company claims); data center focus; site-capture progress vs schedule — [Construction Dive](https://www.constructiondive.com/news/buildots-raises-130m-data-center-projects-surge/830222/) (snippet via search; fetch blocked). Targets on-site progress, not factory/procurement.
- Procore: Groundbreak 2026 closed-beta NVIDIA Omniverse digital twin linking 3D models to procurement and schedule data; Switch cited as early customer (vendor claim) — [ENR](https://www.enr.com/articles/62706-procore-partners-with-nvidia-on-data-center-digital-twins-kewazo-nets-35m-funding-round). Closest incumbent threat on "procurement + schedule" linkage.
- Document Crunch: launched project-level AI risk platform June 2026; >10,000 projects; described as Trimble-owned in the snippet (ownership UNVERIFIED); contract risk focus, not equipment.
- nPlan: sells AI schedule forecasting with a dedicated data-center page and "Data Center Delivery Problem" briefing; claims 88% of data center projects hit setbacks pre-foundation (vendor marketing) — [nPlan](https://www.nplan.io/solutions/data-centers). Funding/customers not retrieved.
- CargoSense: Adapt-IP acquisition (wireless 3D asset tracking for transformers, generators, AI hardware in yards); Google named as data-center customer; funding totals disagree by aggregator ($17M to $28M; Series A $8M June 2024); MegaChips strategic investment (undisclosed) — [Data Center Frontier](https://www.datacenterfrontier.com/press-releases/article/55405120/cargosense-adds-wireless-3d-tracking-with-adapt-ip-acquisition-targeting-data-center-supply-chain-bottlenecks); [PYMNTS](https://pymnts.com/news/investment-tracker/2024/cargosense-raises-8-million-to-enhance-supply-chain-automation). Closest direct competitor. Customer claims are secondary.
- Applied Kinetics: sells transformers via manufacturing network plus software agents that track orders; quotes 7-week build-and-test for pad-mount (company claim); no funding/customers found — [Fondo, 2026-10-30](https://fondo.com/blog/applied-kinetics-targets-the-equipment-delays-holding-up-data-centers). Illustrates the alternative approach: sell the supply, not the visibility.
- Hexagon, Trimble: only sponsored/vendor content found; no schedule-risk specifics. Oracle Primavera/Aconex, Autodesk, Ecosys, Prolog: NOT searched with results this session, UNVERIFIED either way.
- Hardware startups raising on the same pain (Amperesand $80M Series A Nov 2025; DG Matrix $60M Feb 2026) attack the lead time itself with solid-state transformers (vendor claims) — [BusinessWire](https://www.businesswire.com/news/home/20251118244299/en/Amperesand-Raises-$80M-Series-A-Co-led-by-Walden-Catalyst-Ventures-and-Temasek-to-Redefine-Power-Infrastructure-for-AI-Data-Centers).

### Inferences
- Real gap: independent multi-vendor electrical-gear delivery forecasting appears unoccupied. But absence of a vendor may mean buyers solve it with a spreadsheet, OEM account managers, and EPC/procurement staff. Gap evidence is "I found none", not proof of a market.

### Gaps
- Did not verify Primavera, Autodesk, Ecosys, Prolog, Hexagon capabilities, nPlan funding, or any named data-center-specific schedule-risk startup beyond those above. Search is US-only and thin.

## 6. Do tier-2/3 manufacturers share production-status data?

### Takeaway
No evidence found. This is the core unproven assumption.

### Cited Findings
- Only indirect: a consultancy (via search summary) advises suppliers to "strengthen supply chain visibility" to be reliable hyperscaler partners; switchgear specs are locked early, making switching hard; Powell notes customers can delay or cancel backlog — [Utility Dive/ Manufacturing Dive coverage](https://www.utilitydive.com/news/reshore-electrical-equipment-backlogs-transformer-breaker-nema/749265/); Powell backlog $2.4B June 2026 (press release aggregator).
- No case study of an OEM (Eaton, Schneider, Hitachi Energy, Siemens Energy, Vertiv) giving a third-party vendor factory milestone feeds.

### Inferences
- OEMs in a seller's market have little incentive to expose slot or milestone data; a tracker would depend on buyer-side data (POs, emails, freight, import records) and would be a lagging rather than predictive source.

### Gaps
- No evidence either way on data sharing. Must be tested.

## 7. Durability

### Takeaway
Capex still rising in 2026 and guided higher for 2027 (Amazon, Alphabet per reports), but the financing market is visibly tightening at the neocloud end. That is the buyer segment of this thesis.

### Cited Findings
- Spreads widened; ~80% of data center securities sold since early 2025 quote wider than at issuance (Bloomberg via outlet); CoreWeave 2031 bond yield >16%, CDS ~1,000 bp (Reuters-sourced coverage); >=18 data center high-yield/leveraged financings at double-digit yields; Volta $5B loan >11%; PIMCO says neocloud debt has the most utilization/obsolescence/refinancing risk. Dates not confirmed as Nov 2026; one source notes a $2.5T Nasdaq 100 selloff — [Finimize](https://finimize.com/content/ai-debt-deals-face-a-tougher-crowd-on-wall-street); [PIMCO](https://www.pimco.com/ae/en/insights/the-credit-market-lens-one-ai-trade-for-now-many-trades-later); [CRE Daily](https://www.credaily.com/?p=224674)
- Blue Owl exited Oracle's ~$10B Michigan financing (FT, early 2026); Oracle/OpenAI shelved 800 MW Abilene expansion (Bloomberg via secondary) — [Yahoo/FT](https://finance.yahoo.com/news/funding-stalls-oracle-8217-michigan-155238542.html)
- Alphabet and Amazon CFOs reportedly guided 2027 capex meaningfully higher (secondary).

### Inferences
- A slowdown cuts both ways: fewer builds means less demand for expediting, but canceled slots also create the swap market. The first casualties would be small neocloud buyers who are the easiest to sell to.

### Gaps
- No filing-level cancellation count. No sourced AI capex cut by a hyperscaler other than Microsoft's lease-related trim.

## Verdict (3 sentences)
Medium-weak as a standalone business: pain is real and documented (lead times at 3+ years for large gear, Microsoft and CoreWeave citing third-party delays), but no filing ties a dollar cost to electrical gear, tier-2/3 data access is unproven, and well-funded adjacents (Buildots $297M, Procore, nPlan, CargoSense) can bolt on the feature. Best first wedge: a service-led, not software-led, expediting and slot-intelligence product for 3-5 neocloud/colo developers with 20-100 open electrical POs, built from buyer-side data (POs, OEM emails, import/freight records) and monetized per expedited slot. 30-day test: get 5 buyers to hand over redacted PO logs and back-test whether public signals flagged at least 3 historical slips 30+ days before the OEM admitted them, and confirm that at least 2 buyers can name a dollar-valued action they would have taken; kill it if fewer than 3 of 15 buyers share data or the back-test fails.

Customers: mostly NOT Fortune 500 in the buyer-of-record sense. Hyperscalers (Microsoft, Amazon, Alphabet, Meta, Oracle) are F500 but have internal procurement teams and OEM frame agreements; CoreWeave and similar neoclouds, colo developers (Switch, QTS) and powered-shell developers are non-F500 (CoreWeave's FY2025 revenue guide ~$5B, below F500 cutoff is UNVERIFIED but plausible; I did not look up the cutoff). The segment easiest to sell to is the one under the most financing stress.
