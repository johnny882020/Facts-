# Cost-leakage pools in logistics and supply chain at Fortune 500 companies (as of Nov 2026)

Method note: WebFetch could not resolve any host (www.cato.org, www.fmc.gov, www.freightwaves.com all failed with ENOTFOUND, i.e. not on the session network allowlist). All figures below come from web-search result summaries, not from reading the full pages. Every figure should be re-verified against the primary document before it goes in a final report. Some search summaries referenced items dated after today (2026-11-12) or inconsistent totals; these are flagged.

## Freight invoice errors, audit recovery, accessorials, detention/demurrage, fuel surcharge

### Takeaway
Freight audit is a real but modest pool: roughly 3-10% of invoices carry errors and about 1-5% of freight spend is recoverable on independent-ish figures; 5-12% claims are vendor marketing. Accessorial/detention is a better-evidenced leak on the carrier side (carriers under-bill it) and ocean D&D is a very large, regulated pool (about $15.4B collected by 9 carriers in 5 years). Fuel surcharge error evidence was not found.

### Cited Findings
- Typical freight bill audit finds 3-6% of invoices contain errors; 1-5% of total freight spend recoverable. Vendor source (Transportation Insight, an audit/3PL vendor) — [Transportation Insight](https://transportationinsight.com/resources/freight-audit-payment-protect-profit-soft-rates/)
- Tompkins Ventures figure (cited by GingerControl, a vendor): 5-10% of freight/parcel invoices contain errors; 3-10% of annual spend. GingerControl itself says "up to 20%" claims lack a traceable primary source and suggests budgeting 5-10% — [GingerControl](https://gingercontrol.com/blog/freight-invoice-audit-guide)
- StealthAgents (staffing/BPO vendor): 2-5% of audited spend for standard audits, 3-8% for recovery-focused audits; warns many commercial savings percentages have no disclosed invoice-level dataset — [StealthAgents](https://stealthagents.com/research/freight-invoice-audit-workload-statistics-2026)
- Vendor claim: recover 5-12% of transport spend (Roado) — [Roado](https://www.roado.tech/blog/freight-bill-audit-and-reconciliation-the-enterprise-guide-to-recovering-5-12-of-transport-spend/) ; basic error correction typically 1-3% (NuvoCargo, vendor) — [NuvoCargo](https://www.nuvocargo.com/blog-posts/the-cfos-freight-spend-audit-12-kpis-that-expose-where-your-50m-budget-is-bleeding)
- A 2020 survey of 77 shippers reported 20.8% average invoice inaccuracy; self-reported, small sample (as relayed by search summary; original not identified) — see [GingerControl](https://gingercontrol.com/blog/freight-invoice-audit-guide) results page
- Vendor claim: Loop says 2-7% savings on $100M transportation spend via audit recovery — [Supply Chain 24/7 on Loop](https://www.supplychain247.com/article/freight-audit-2.0-the-cfos-guide-to-unlocking-7-savings-in-transportation-spend)
- Vendor claim: Trax advertises 5-7% annual transportation savings — [Trax](https://www.traxtech.com/traxpays)
- Vendor case studies (Intelligent Audit): $15.4M annualized savings / 1,906% ROI for a global manufacturer; $1.9M / 897% ROI for a North American manufacturer; neither states payback months — [case 1](https://www.intelligentaudit.com/case-studies/large-global-manufacturer-achieves-15-4m-in-annualized-savings-and-an-roi-of-1-906), [case 2](https://www.intelligentaudit.com/case-studies/how-a-high-volume-north-american-manufacturer-unlocked-1-9m-in-freight-savings-and-897-roi)
- Truck detention (ATRI, via trade press): trucking industry lost $3.6B direct expense and $11.5B lost productivity from detention in 2023; drivers detained at 39.3% of stops; carriers invoiced only ~75% of detention incidents and were paid on ~55% of invoices (i.e. detention is under-billed, not over-billed) — [Supply Chain 24/7](https://www.supplychain247.com/article/truck-driver-detention-productivity-loss-ATRI-survey/lcl), [TT News](https://ttnews.com/articles/atri-driver-detention-2023), [Heavy Duty Trucking](https://www.truckinginfo.com/news/truck-driver-detention-study-shows-some-improvement). Note the shipper-side view: these are costs shippers are avoiding paying; relevant for shippers contesting detention invoices.
- DOT OIG 2018: detention reduced truckload driver earnings by $1.1-1.3B/yr; FMCSA 2014 study found detention at ~1 in 10 stops, avg ~1.4h, later called small-sample by FMCSA — [Northeast Biz Alliance summary](https://northeastbizalliance.org/evidence/fmcsa-studies/)
- Ocean D&D: FMC rule preamble says nine large carriers charged ~$8.9B D&D in 2020-2022; FMC data page says ~$15.4B collected Apr 1 2020 - Mar 31 2025 (different measures/periods) — [FMC](https://www.fmc.gov/?p=4790), [FreightWaves](https://www.freightwaves.com/news/fmc-tightens-rules-on-charging-container-late-fees)
- FMC D&D billing rule published Feb 26, 2024, effective May 28, 2024; D.C. Circuit vacated 46 CFR 541.4 (who may be billed) in 2025; rest of rule remains; a Federal Register final rule (2025-23920) removes the vacated section. Reported requirement: invoices issued within 30 days of last charge incurred (effective date not confirmed) — [Benesch](https://www.beneschlaw.com/insight/demurrage-and-detention-billing-after-wsc-v-fmc/pdf/), [Thompson Hine](https://admin.thompsonhine.com/wp-content/uploads/2025/09/Court-Sets-Aside-Part-of-FMCs-Demurrage-and-Detention-Billing-Rule.pdf), [Federal Register](https://public-inspection.federalregister.gov/2025-23920.pdf)

### Inferences
- Freight audit is largely an incumbent-served market (Trax, Cass, Loop, Intelligent Audit etc.), so the greenfield opportunity is narrower: contract-vs-invoice rule engines for accessorials, ocean D&D dispute automation, and un-audited modes.
- Ocean D&D is large (order of $3B/yr across 9 carriers by simple division of $15.4B/5yrs; my arithmetic, not a sourced figure), and FMC billing-compliance rules (invoice content, 30-day window, dispute process) create a concrete, rule-based dispute basis, which suits software. Share that is disputable/recoverable by a shipper is unknown.

### Gaps
- No independent (non-vendor) transaction-level study of freight invoice error rates or Fortune 500 recovery rates found.
- No source on fuel surcharge error rates found; not searched beyond the first round.
- No reliable figure for what share of ocean D&D is erroneous/waived/disputable; FMC pages could not be fetched.
- Effective date of the 30-day invoice requirement unconfirmed.

## Retailer chargebacks, OTIF fines, stockouts, inventory, returns

### Takeaway
Retailer deductions are a large pool for CPG/consumer suppliers (estimates 2-10% of revenue, vendor/SPS-sourced, includes non-OTIF items). Inventory distortion is a trillion-dollar global figure from a retail-industry analyst (IHL) and is vendor-sponsored. Returns are about $850B (NRF), with fraud estimated at 9% of returns.

### Cited Findings
- Walmart OTIF fine: 3% of COGS of non-compliant cases; Target 5% of cost of goods; Kroger $500 per order >2 days late. Sources are vendor/consultancy — [Enterra](https://www.enterrasolutions.com/insights/chargebacks-walmart-raises-otif-stakes), [SPS Commerce](https://www.spscommerce.com/community/articles/retailer-deductions-in-q4-how-walmart-and-kroger-compare)
- SPS Commerce estimate: suppliers lose 2-10% of annual revenue to deductions (about 5.8% for Walmart suppliers); broader than OTIF fines (includes trade spend, overages) — [SPS Commerce](https://www.spscommerce.com/community/articles/your-retailer-compliance-scorecard-is-a-tool-not-just-a-grade)
- Cleo-based estimate: late/short deliveries cost food and CPG makers about $100B, with $10-11B direct costs (chargebacks, expedited freight, dispute management); ~90% of the cost falls outside tracked chargebacks. Vendor-commissioned; methodology not verified — [FreightWaves](https://www.freightwaves.com/?p=583805)
- IHL Group: inventory distortion about $1.73T/yr globally in 2025 (6.5% of retail sales), about $1.16T out-of-stocks and $572B overstocks; earlier IHL estimates $1.77T (2023). IHL studies are commissioned by software vendors — [IHL Services](https://www.ihlservices.com/news/analyst-corner/2025/09/retail-inventory-crisis-persists-despite-172-billion-in-improvements), [Board infographic](https://www.board.com/wp-content/uploads/2025/10/Board-Infographic_IHL-Distortion-Study.pdf)
- NRF/Happy Returns 2025: returns $849.9B, 15.8% rate (2024: $890B, 16.9%); 9% of returns fraudulent; secondary source puts fraud at $77-80B (unverified against NRF report) — [NRF](https://www.nrf.com/research/2025-retail-returns-landscape), [Supply Chain 24/7](https://www.supplychain247.com/article/2025-retail-returns-hit-850-billion), [Robin Report](https://therobinreport.com/?p=146327)
- Inventory carrying cost rule of thumb 20-30% of inventory value per year, and E&O write-downs about 0.5-2% of COGS (non-perishable) to 2-5% (fashion/electronics): unsourced vendor/blog heuristics. Stanley Black & Decker E&O 1.7% of sales in 2007 falling to 0.5% by 2009 (documented company case) — [Cleverence](https://www.cleverence.com/articles/for-business/excess-obsolete-inventory-3846/), [Umbrex](https://umbrex.com/resources/company-analysis/finance/inventory-obsolescence-rate/), [Logistics Viewpoints](https://logisticsviewpoints.com/2010/10/12/stanley-black-decker-effectively-manages-excess-and-obsolete-inventory/)

### Inferences
- Chargeback/deduction management applies mainly to suppliers selling into big retailers; for a Fortune 500 CPG, 1% of revenue recovered would be large, but the recoverable share of deductions (as opposed to legitimately earned fines) is not established.
- Global retail inventory distortion figures are not addressable at a single company level without conversion; treat as context only.

### Gaps
- No independent study of the recoverable share of retailer deductions (e.g., invalid deduction rate) found.
- No sourced Fortune 500 E&O or carrying-cost benchmark; APQC benchmark page exists but wasn't read.
- Expedited/premium freight as share of transport spend: no credible source found (only a vendor note that expedited LTL carries a 20-40% premium over standard rates, [ParcelPath](https://parcelpath.com/freight-ltl/freight-ltl-freight/expedited-ltl/)).
- Stockout cost at company level not found beyond IHL.

## Cargo claims, theft, freight fraud, double brokering

### Takeaway
Cargo theft is about $725M in 2025 by CargoNet (reported incidents only), with larger estimates of $6B+ (and up to $35B per NICB) being weakly supported extrapolations. Freight fraud estimates run from $500-700M (double brokering, DAT) to $6.6B (ATRI via secondary report). Cargo damage claim totals were not found.

### Cited Findings
- CargoNet/Verisk 2025: estimated theft losses about $725M (up 60% from 2024); average theft value $273,990 (up 36% from $202,364); 3,594 supply chain crime events (flat vs 3,607); confirmed thefts 2,646 (up 18%) — [Verisk](https://www.verisk.com/company/newsroom/cargo-theft-losses-surge-to-estimated-%24725-million-in-2025-verisk-cargonet-analysis-reveals/), [CCJ](https://www.ccjdigital.com/regulations/article/15815405/cargo-theft-activity-flat-losses-surged-in-2025-cargonet)
- Interim 2026: a Work Truck Online item reports a 72% YTD rise in average theft value in 2026 (interim data, not independently verified) — [Work Truck Online](https://www.worktruckonline.com/10254502/cargo-theft-losses-surged-to-an-estimated-725-million-in-2025)
- NICB estimates annual cargo theft losses up to $35B; industry commonly cites ~$6B; FreightWaves has an article questioning the $60B figure — [FreightWaves](https://www.freightwaves.com/news/is-cargo-theft-costing-60-billion-annually-what-that-number-actually-represents) (content not read; flagged weak evidence)
- DAT: double brokering costs industry est. $500-700M/yr — [DAT](https://www.dat.com/blog/fraud-on-the-rise-and-how-to-stay-protected); ATRI-cited $6.6B/yr for freight fraud — [Supply Chain 24/7](https://www.supplychain247.com/article/nmfta_acts_to_slow_6.6_billion_a_year_fraud_industry_in_trucking/6) (older article; date unverified)
- TIA State of Fraud April 2025: 22% of respondents lost more than $200,000 to fraud in the prior six months — [TIA](https://member.tianet.org/TIAnetOrg/Member%20Resources/White-Papers/State-of-Fraud-in-the-Industry-April-2025.aspx)

### Inferences
- Theft and fraud are largely insurable/carrier-vetting problems; dollar size for a typical shipper is small relative to freight spend, but tail risk per event is high (avg $274K). Software play is carrier identity/vetting (exists: Highway, RMIS, etc. - not researched).

### Gaps
- No cargo damage/claims total (e.g., ATA, claims-rate benchmarks) found.
- TAPA data not found.

## Tariffs, customs classification, drawback, IEEPA/232/301

### Takeaway
2025-26 tariff turmoil created the largest single near-term pool: IEEPA tariffs (about $166B collected per one source) were held unlawful by the Supreme Court on Feb 20, 2026, and refunds are flowing via CBP's CAPE system, with disputes on finally liquidated entries. Section 232/301 expanded as the replacement. Classification error rates are poorly documented; drawback "$15B unclaimed" is a vendor claim.

### Cited Findings
- Supreme Court held IEEPA does not authorize tariffs on Feb 20, 2026; Section 122 10% surcharge took effect Feb 24, expired July 24, 2026 (CRS); one source says CIT found Section 122 tariffs unlawful in May 2026 — [Baker Donelson](https://www.bakerdonelson.com/trade-policy-shifts-ieepa-tariffs-end-section-122-begins-and-sections-301-and-232-activity-grows), [Miller Nash](https://www.millernash.com/firm-news/news/tariffs-in-flux-ieepa-and-section-122-struck-down-section-232-duties-expand), [CRS fact sheet](https://www.everycrsreport.com/reports/R49481.html)
- Section 232 metals regime reworked April 2026 (reports conflict: 50% primary/25% derivatives/15% temporary equipment rate vs IBISWorld 25%/10%, <15% metal content exempt); adjusted again June 1, 2026. Verify against proclamations — [IBISWorld](https://www.ibisworld.com/blog/tariff-policy-update-2026), [Miller Nash](https://www.millernash.com/firm-news/news/tariffs-in-flux-ieepa-and-section-122-struck-down-section-232-duties-expand)
- Section 301: 25% tariff on Brazil imports imposed July 22, 2026; Section 301 used more heavily after Section 122 expiry — [CRS](https://www.everycrsreport.com/reports/R49481.html), [IBISWorld](https://www.ibisworld.com/blog/tariff-policy-update-2026)
- IEEPA refunds: about $166B in IEEPA duties collected (one source); CAPE Phase 1 opened April 20, 2026; CBP said $20.6B sent by May and acknowledged a ~$10B overstated earlier estimate; later reports of about $40B disbursed and about $100B refunded (supplychain247); Phase 3 opened Oct 6, 2026; finally liquidated entries (~$30B+ / $11.4B needing lawsuit per different sources) contested. Sources inconsistent — [Passport Global](https://passportglobal.com/blog/ieepa-tariffs-the-supreme-court-an-ongoing-guide-for-importers/), [Law360](https://www.law360.co.uk/articles/2481661), [Supply Chain 24/7](https://www.supplychain247.com/article/trump-tariff-refunds-100-billion-supreme-court/sensors), [Cato](https://www.cato.org/blog/ieepa-refunds-update-good-progress-still-ways-go), [Shopappy](https://shopappy.com/trade/tariffs-customs/cape-phase-3-october-6-ieepa-refunds), [Thomson Reuters](https://www.thomsonreuters.com/en-us/help/onesource-global-trade/regulatory-insights/2026/august-12th/ieepa-duty-refund-processing-update.html), [ISM](https://www.ismworld.org/supply-management-news-and-reports/news-publications/inside-supply-management-magazine/blog/2026/2026-06/tariff-refunds-are-flowing-but-uncertainty-remains-for-importers/)
- Manufacturers article claims $175B in refunds coming and many may never see money — [Instrumental](https://instrumental.com/resources/build-better-news/175b-in-tariff-refunds-are-coming-many-manufacturers-may-never-see-the-money/) (vendor blog)
- Drawback: Consyn (vendor) estimates ~$15B eligible drawback goes unclaimed annually — [Consyn](https://consyn.substack.com/p/how-consyn-has-delivered-millions); weak evidence, no primary source
- Classification accuracy: USITC study found mismatches in ~15% of sampled import line items, mostly classification/quantity errors; dated (publication date not confirmed) — [USITC](https://usitc.gov/publications/332/pub861.pdf). Canada Auditor General 2017: ~20% misclassified (unverified from truncated snippet) — [Air Cargo Week](https://aircargoweek.com/hs-code-roulette-what-tariff-misclassification-really-costs-air-cargo/)
- Vendor claims: post-entry audit found $1.7M overcharges from tariff stacking (Klearnow case study) — [Klearnow](https://klearnow.ai/case-studies/post-entry-audit-finds-1-7m-in-duty-overcharges-hidden-by-tariff-stacking/)

### Inferences
- IEEPA refund recovery is a time-limited, very large, one-off pool (tens of billions to about $166B total depending on source) with strong ROI for importers and clear deadlines; it is also being served by brokers, law firms and tariff-tech vendors, and it will fade by 2027.
- Recurring pools after IEEPA: Section 232/301 stacking, country of origin, metal content declaration, and classification, which are rule-heavy and suited to software.

### Gaps
- Official CBP IEEPA refund page and totals were not accessible; totals conflict across secondary sources.
- No independent rate of overpayment from misclassification for U.S. importers.
- Drawback utilization rate from CBP not found.

## Under-served areas and quick ROI (payback under 6 months); vendor claims versus independent evidence

### Takeaway
No independent (Gartner/Hackett) payback evidence was found; all ROI/payback numbers located are vendor case studies. Based on what was found, the candidate top three for software are provisional (see Inferences).

### Cited Findings
- All payback/ROI claims found came from vendors (Intelligent Audit, Loop, Trax, a $1.2M-in-six-months retail anecdote on blogs) and are unverified — [Intelligent Audit](https://www.intelligentaudit.com/blog/40-hours-saved-weekly-inside-three-companies-logistics-audit-results), [Supply Chain 24/7 Loop case](https://www.supplychain247.com/article/how-clemens-food-group-saved-1.2m-with-loops-ai-transportation-compliance-solution/loop)
- StealthAgents and GingerControl both caution that headline audit percentages lack disclosed datasets — see links above.

### Inferences
Provisional ranking by size of evidence-supported pool times software-solvability (my judgment, not sourced):
1. Tariff/customs: IEEPA refund recovery now (largest, time-limited) plus 232/301 duty-stack and classification checking afterward. Fastest ROI where refunds exist; weak evidence on recurring classification error dollars.
2. Retailer deductions/OTIF chargebacks (2-10% of revenue for affected suppliers, vendor-sourced; dispute workflows are document-matching tasks) — well suited to AI but SPS, Enterra, Cleo-type vendors already exist.
3. Freight invoice/accessorial and ocean D&D dispute automation (1-5% of freight spend; ocean D&D about $3B/yr by carriers for 9 carriers; FMC billing rules give leverage) — crowded for parcel/LTL audit, less crowded for ocean D&D.
Lower priority for software: cargo theft/fraud (small total vs spend, vetting tools exist), returns (retail-focused), inventory carrying/E&O (planning-software heavy, long payback).

### Gaps
- No independent evidence of payback under 6 months for any category.
- Competitive landscape per pool (who serves ocean D&D, deductions, tariff refund) not researched here beyond incidental mentions.
- Ardent Partners AP exception rate (about 14%) came via a search summary without a URL; not included as cited.
