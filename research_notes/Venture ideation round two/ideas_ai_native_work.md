# AI-native logistics work: venture ideas, round two (as of 2026-11-12)

Method notes
- WebFetch to www.bls.gov failed (host not in the session's allowed network domains; it would have to be allowed in network settings). All BLS numbers below come from WebSearch result text citing BLS pages. The vintage is May 2023 because the May 2024 national tables could not be retrieved. Wages are therefore 2023 dollars (understated for 2026).
- Many search answers were summaries of vendor pages. Vendor claims are tagged (vendor). Anything with no source is UNVERIFIED and excluded from sizing.
- Honest headline: after probing 10 task areas, no idea cleared "High". Most candidate tasks are already served by funded startups. Four ideas survive as Low or Low-Medium; six are rejected.

## Sourced labor inputs (BLS OEWS, May 2023, via search text)
- 43-5011 Cargo and Freight Agents: employment 105,220; mean annual wage $52,460. https://www.bls.gov/oes/2023/May/oes435011.htm. (O*NET, using BLS 2024 data, lists a median of $49,900: https://www.onetonline.org/link/localwages/43-5011.00)
- 43-5032 Dispatchers, except police/fire/ambulance: employment 206,090; mean $50,830. https://www.bls.gov/oes/2023/May/oes435032.htm. Caveat: this includes taxi, tow and other dispatchers, not just freight. The freight share is UNVERIFIED.
- 13-1081 Logisticians: employment 228,470; mean $84,640. https://www.bls.gov/oes/2023/may/oes131081.htm. In Freight Transportation Arrangement (NAICS 488500) the mean is $59,350 (https://www.bls.gov/oes/2023/may/naics4_488500.htm).
- 13-1031 Claims Adjusters/Examiners/Investigators: national 293,780 employed, mean $75,770 (https://www.bls.gov/oes/2023/May/oes131031.htm). In Truck Transportation (NAICS 484000): 420 employed, mean $53,950 (https://www.bls.gov/oes/2023/May/naics3_484000.htm). In NAICS 488500: 160 employed, mean $53,460. The search tool matched columns by position, not from headers, so treat the 420 and 160 as medium-reliability.
- 43-5061 Production/Planning/Expediting Clerks: median $53,900 (May 2023), but no employment count was retrieved, so the pool is UNVERIFIED. https://www.bls.gov/oes/2023/May/oes435061.htm
- CBP licensed customs brokers: about 14,454 active (CBP page cited in search; counts entities as well as individuals, so inflated by roughly 9% per one analysis). https://www.cbp.gov/node/77830 and https://www.gaiadynamics.ai/blog/the-customs-broker-job-market-in-2026

Arithmetic (all inputs above)
- Cargo/freight agents: 105,220 x $52,460 = $5.52B/yr.
- Dispatchers (upper bound, all industries): 206,090 x $50,830 = $10.48B/yr.
- Logisticians: 228,470 x $84,640 = $19.34B/yr.
- Claims adjusters in trucking: 420 x $53,950 = $22.7M. In freight arrangement: 160 x $53,460 = $8.6M. Combined about $31M.

---

## SURVIVING IDEAS

### Idea 1: Supplier-origin and metal-content evidence agent for tariff preference and Section 232 claims (importer-side)
1. Task and people. Importers must collect supplier declarations, bills of materials, melt-and-pour and smelt-and-cast records, and metal-content values, then keep a file to back each claim.
   - FACT: Importers must report country of melt and pour for steel derivatives and "work back through their supply chain". If metal value or origin is unknown, the 25% duty is assessed on full product value. Sources: https://www.ghy.com/trade-compliance/us-duties-on-steel-and-aluminum-derivatives-key-reporting-and-compliance-updates/ and https://www.valexander.com/2024/10/21/cbp-clarifies-section-232-melt-and-pour-requirements (via search text). Practitioners note metal-content value is often unavailable from suppliers.
   - FACT: USMCA claim rates jumped in 2025; a Dallas Fed analysis puts duty-free qualification at about 80% of imports by July 2025 (https://www.dallasfed.org/research/economics/2026/0804). A Fed note estimates added compliance costs at 1.4-2.5% of goods value, but I saw it only in secondary reporting (https://cfodive.com/news/cfos-face-surging-trade-compliance-costs-trump-high-tariffs-fed-GM-Stellantis/754136, https://www.federalreserve.gov/econres/notes/feds-notes/trade-compliance-at-what-cost-lessons-from-usmca-automotive-trade-20250718.html).
   - Labor pool: UNVERIFIED. No BLS occupation matches (trade compliance staff sit inside 13-1041 Compliance Officers, which I did not size). The Fed percentage cannot be turned into dollars without a sourced trade value, which I did not retrieve. No sizing is given.
2. Buyer: Director/VP Global Trade Compliance or Customs at a Fortune 500 manufacturer (auto, machinery, appliances). Trust driver: penalty exposure and the full-value duty fallback; every extracted field must link to the source document page (audit trail). Five-year recordkeeping tail per a vendor blog (https://www.gingercontrol.com/blog/usmca-rules-of-origin-importers; vendor).
3. AI evidence. No benchmark found for extracting melt-and-pour or origin data from mill certificates or supplier declarations. Adjacent evidence is weak: invoice-extraction benchmarks (https://arxiv.org/html/2509.04469v1, invoices only), and the ATLAS study shows LLMs are poor at full 10-digit HTS classification (best general model GPT-5-Thinking about 25%, fine-tuned 40%; https://arxiv.org/abs/2509.18400). So the product must avoid classification judgments and stick to extraction plus chasing. UNVERIFIED for this task.
4. Product. An agent emails and portal-chases tier-1 suppliers for origin and content documents, extracts fields with page-level citations, and builds a claim-support file per part number. First user: a mid-cap importer of steel derivatives (e.g., fabricated metal parts), starting with one HTS family. Day 1: upload the part list plus last 12 months of entries; the agent identifies parts lacking melt-and-pour or content data and sends the supplier requests; a compliance analyst approves each file. Integration: ERP item master (SAP/Oracle) read-only, ACE/broker entry data export, shared mailbox.
5. Incumbents. Gaia Dynamics: $7M seed, Sept 2026, covers classification, tariff calc, entry audit across 48 countries (https://pulse2.com/gaia-dynamics-raises-7-million-seed-round-led-by-corazon-capital/). Altana, Sayari, Resilinc (UFLPA tracing; vendor). Assent, Zonos, Descartes (not checked for funding). A startup wins only if it owns the supplier-chasing workflow; mapping and screening tools do not.
6. Business model. No benchmark found. Plausible: per-part-number or per-supplier annual fee.
7. Assumptions and 30-day tests.
   - A1: Suppliers respond to AI-originated requests at a useful rate. Test: send 200 requests for 5 importers and measure response and complete-document rate versus the importers' manual baseline.
   - A2: Extraction of melt-and-pour country and content value from real mill certs reaches at least 95% field accuracy. Test: label 300 real documents and score.
   - A3: Importers pay for a workflow, not just data, as 232 and USMCA rules may change. Test: 10 compliance-director interviews and 3 signed pilot LOIs; check the pending USMCA review (started July 1, 2026 per https://blogs.tradlinx.com/usmca-review-starts-july-1-here-is-what-is-already-changing-for-cross-border-supply-chains/).
8. Confidence: Low. Pool unsized, no task-specific AI evidence, rules volatile, funded neighbors.

### Idea 2: AI-native licensed customs brokerage (broker of record, not a tool vendor)
1. Task and people. Entry preparation by broker staff. Proxy pool: cargo and freight agents 105,220 x $52,460 = $5.52B/yr (inference: 43-5011 covers forwarders and brokers' clerks, but also air-cargo agents and others; share doing entry work is UNVERIFIED). About 14,454 licensed brokers (CBP count above).
   - FACT (via search text, verify): a CBP ruling dated Jan 16, 2026 says an AI tool that derives classifications beyond six digits generally requires a customs broker license when output may be used for an entry. That favors an owner that is itself licensed. Source: search summary only; primary CBP ruling not retrieved (UNVERIFIED).
2. Buyer: VP Customs/Trade Compliance at a Fortune 500 importer currently using a broker. Trust: the broker carries legal responsibility (reasonable care), so the licensed firm eats errors; the audit trail is the entry file.
3. AI evidence. ATLAS (NeurIPS 2025): 10-digit HTS accuracy 25% for GPT-5-Thinking, 40% for a fine-tuned 70B model, 57.5% at 6 digits on 200 held-out CBP rulings (https://arxiv.org/abs/2509.18400). That is independent and says full automation of classification is not ready. A vendor (GingerControl) claims 96% 6-digit on production traffic (vendor, unverifiable: https://gingercontrol.com/blog/hts-classification-accuracy). Evidence supports human-in-the-loop only.
4. Product. A brokerage where AI pre-fills entries and licensed brokers review exceptions only. First user: an importer with repetitive SKUs (retail or CPG). Day 1: take over the entry flow for one port or one importer. Integration: ACE ABI via a filer code or a software partner; importer ERP and docs.
5. Incumbents and entrants. Amari AI: $4.5M seed (Pear VC post, March 2026), serves 30+ brokerages incl. GHY and JAAK (vendor, via search). Digicust: EUR 2.3M pre-Series A, 500k+ declarations (https://www.pulse.bot/ai/deals/digicust-secures-23m-pre-series-a-funding-led-by-jet-investment-ddc3352c-0033-4a8f-a5c7-41dae2703a02/). Nabu: about EUR 3M (Maersk Growth). Caspian: $5.4M seed. iCustoms: $2.2M. Gaia: $7M. Incumbent brokers (GHY etc.) are adopting these tools. Crowded in tooling; the unoccupied slot is an AI-native broker owning the licence, but acquiring licensed brokerages is capital-heavy.
6. Business model. Per-entry fee: no benchmark found.
7. Assumptions and tests.
   - A1: Broker review time per entry falls by at least 50% without more post-summary corrections. Test: 500 historical entries, AI pre-fill versus the filed entry, scored by a licensed broker.
   - A2: Importers will move volume to an AI-native broker. Test: 15 importer interviews; 2 sample-entry pilots.
   - A3: Licensing and regulatory path is feasible within 12 months. Test: counsel opinion on the CBP ruling plus a list of 5 acquirable brokerages with asking prices.
8. Confidence: Low. Crowded, and the sizing pool is a proxy.

### Idea 3: Freight loss-and-damage claim evidence and filing agent for shippers and 3PLs
1. Task and people. BLS shows the dedicated labor pool is tiny: claims adjusters in trucking 420 x $53,950 = $22.7M plus 160 x $53,460 = $8.6M (about $31M). Most shipper claim work sits in logistics and customer-service roles not isolated by BLS. So this is an outcome-recovery play, not a labor-pool play. Non-BLS (vendor/blog) inputs, not used for sizing: processing cost $200-400 per claim, 0.35% of freight spend paid as claims, $1,796 average claim, from https://www.wearewarp.com/research/ltl-claims-calculator (vendor, unsourced).
2. Buyer: Director Transportation or Logistics Claims at a Fortune 500 shipper or retailer. Trust: payout is the carrier's money; AI only assembles evidence (BOL, POD notations, photos, invoices) and a human signs.
3. AI evidence. No independent evaluation found. Production example: Loadsure deployed Five Sigma's Clive for freight-insurance claims, Feb 2026 (vendor/press: https://coverager.com/loadsure-deploys-five-sigmas-ai-claims-platform-and-clive-to-accelerate-freight-claims/). Opereit pilot recovery of about $218K is a secondary-source vendor claim.
4. Product. An agent ingests POD, BOL, photos and invoices, builds the claim package with carrier-specific filing rules, files via carrier portals/email and chases. First user: a shipper with 1,000+ LTL claims a year. Day 1: connect the shared claims inbox; produce draft packages for human approval. Integration: TMS or email, carrier portals (computer-use).
5. Competitors. Opereit: $2.5M pre-seed/seed led by Seedcamp and Yellow (https://pulse2.com/opereit-raises-2-5-million-to-automate-logistics-claims-with-ai-agents/; round type and amount vary by source, one says EUR 2.15M). Freehand, Arvist, StackAI, Kognitos, Datamatics (all vendor pages, funding not verified). TMS vendors such as MercuryGate publish claims modules (not verified). Adjacent to the excluded freight-audit idea.
6. Business model. Contingency on recovered dollars is common in this space, but I found no cited benchmark percentage.
7. Assumptions and tests.
   - A1: Meaningful recoverable claim dollars are being left unfiled (carrier denial rate "95%" is a vendor claim from CTSI-Global). Test: audit 90 days of one shipper's damage and shortage records for unfiled or time-barred claims.
   - A2: Carrier portals can be driven reliably by computer-use agents. Test: file 50 live claims across 5 carriers, measure the success rate.
   - A3: Shippers will pay on contingency, not wait for analytics budget. Test: 3 signed contingency pilots.
8. Confidence: Low. Tiny BLS pool, no independent AI evidence, existing seed-stage competitor.

### Idea 4: Dangerous-goods paperwork agent (SDS to UN number, packing group, shipping papers)
1. Task and people. Hazmat shippers reconcile SDS section 14 data to shipping descriptions and declarations. Labor pool: UNVERIFIED (no BLS occupation or headcount found). Penalty exposure: PHMSA maximum civil penalty sources conflict ($99,756 per violation in a PHMSA NOPV vs $102,348 in a blog; https://www.phmsa.dot.gov/sites/phmsa.dot.gov/files/2026-02/NOPV%20-%2025-0069-IIA-EA%20-%20Authorized%20Testing%20Inc.pdf, https://www.lion.com/lion-news/december-2024/new-maximum-hazmat-civil-penalties-for-2025). Penalty exposure is not a labor pool, so not sized.
2. Buyer: Director of EHS/Dangerous Goods compliance at a chemical, consumer-goods or e-commerce Fortune 500. Trust: strict liability for a misdeclaration; classification must be reproducible and reviewed by a certified DG person.
3. AI evidence. None independent found. The World Shipping Council has launched a Cargo Safety Program for misdeclared goods (https://www.maritimeprofessional.com/news/launches-tool-detecting-misdeclared-goods-409993). Vendor deployments: Rail-Flow AI DG entry validated against master data (vendor).
4. Product. Ingest SDS PDFs, propose proper shipping name, class and packing group per mode with the cited SDS text, diff against the item master, queue mismatches for a certified reviewer. First user: an e-commerce or 3PL operator with thousands of SKUs. Integration: item master, WMS/TMS DG fields.
5. Competitors. 3E (3eco.com, agent classification), Agistix, DGeo, DGXprt, SafSheets, Super.ai, Rail-Flow (all vendor pages; funding not verified). Likely crowded.
6. Business model: per-SKU review; no benchmark found.
7. Assumptions and tests.
   - A1: SDS-to-transport-description mismatch rate in real item masters is high enough to pay for. Test: audit 1,000 SKUs for a friendly shipper.
   - A2: LLM classification agrees with certified DG specialists at least 95% with citations. Test: 300 SKUs double-labelled.
   - A3: Buyers will pay beyond incumbent bundles. Test: 10 EHS interviews on current tooling spend.
8. Confidence: Low. No pool sizing, no AI evidence, incumbents exist.

---

## REJECTED IDEAS (with reason)
- Carrier appointment scheduling and check calls by voice agent (DC side or broker side). Crowded and funded: HappyRobot raised $15.6M Series A (Dec 2024, a16z) and $44M Series B (Sept 2025, Base10; about $500M valuation per an unconfirmed source), customers incl. DHL, Ryder, Flexport (https://pulse2.com/happyrobot-ai-based-voice-solutions-company-raises-15-6-million-series-a/, https://evertiq.com/news/2025-09-05-happyrobot-raises-44m-to-build-ai-workforce-for-the-real-economy). Dock scheduling: Opendock (MCP server launched June 2026 per its blog, vendor), Oracle OTM 26C Dock Scheduling Assistant (https://docs.oracle.com/en/cloud/saas/readiness/logistics/26c/otm26c/26C-otm-wn-f46361.htm), Shipsy appointment agent at Adani Ports (vendor docs). Pool exists (dispatchers $10.48B upper bound) but incumbents and platform owners already ship it.
- PO expediting and supplier follow-up. Didero $30M Series A (Feb 2026; https://siliconangle.com/2026/02/12/didero-raises-30m-series-expand-agentic-ai-enterprise-procurement/), Lio $30M led by a16z (https://techcrunch.com/2026/03/05/lio-ai-series-a-a16z-30m-raise-automate-enterprise-procurement/), Aron $8M (Sept 2026), Traza $2.1M, Kavida, SourceDay Open Order Chaser. Also the clerk headcount (43-5061) was not retrieved, so the pool is UNVERIFIED.
- EDI trading-partner onboarding and mapping. Orderful $35M Series C and AI product Mosaic (Dec 2025), TrueCommerce agentic mapping, Boomi, CData (vendor claims: 90% faster onboarding at NFI, 50% faster). Crowded.
- Retail vendor-compliance chargeback defense. Cleo, Osa Commerce, RetailReady (YC), RetailPath/Orderful, Vendormint. Crowded, and too close to the excluded invoice-defense idea.
- UFLPA/forced-labor evidence packs. Sayari, Resilinc, Altana, Certivo, Visual Compliance already sell this (vendor claims, e.g. 60% faster response, unverified). No independent evidence that AI-built packs are accepted by CBP.
- Letter-of-credit document checking. Real pain: ICC says 65-80% of documentary credits are refused on first presentation (https://academy.iccwbo.org/11-questions-that-will-help-you-master-documentary-credits/). But the buyer is a bank trade-ops team (not shipper, outside the brief), the AI evidence is only vendor blog claims, and the root causes are drafting and process, not reading speed. Not pursued.
- Pure-play HTS classification. ATLAS shows 10-digit accuracy of 25-40%; Zonos, Tarifflo, Avalara, Gaia and others compete (https://arxiv.org/abs/2412.14179 benchmarks commercial tools).

## Cross-cutting observations (INFERENCE)
- The only well-sourced labor pools in BLS (cargo agents $5.5B, dispatchers up to $10.5B, logisticians $19.3B) coincide with the most crowded tasks. Tasks with no crowd (claims, DG, origin evidence) have either tiny or unsourced pools.
- Independent evidence that LLMs can do logistics-specific document tasks is thin: no BOL or commercial-invoice benchmark was found, only invoice-only academic work (arXiv 2509.04469) and a vendor test (Hyperscience: Claude 3.7 Sonnet 75 vs its own model 98 on bills of lading; vendor).
- Next steps for the caller: allow bls.gov in network settings and re-pull May 2024 tables; pull CBP ruling text; pull a sourced USMCA import value to size Idea 1 from the Fed 1.4-2.5% rate.
