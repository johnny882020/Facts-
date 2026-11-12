# Venture ideation round two: structural physical waste in freight (date: 2026-11-12)

Method notes. All numbers came from WebSearch result text. WebFetch failed (www.stb.gov and www.freightwaves.com did not resolve in this session), so no page was read in full; every figure is from search-result snippets and many are secondary reporting of a primary source. "UNVERIFIED" = not found, excluded from sizing. Excluded as already considered: freight invoice audit, IEEPA refunds, ocean demurrage/detention defense, cargo theft vetting.

Summary: 3 ideas survive (all Low to Medium confidence), 3 are rejected (driver detention, empty container repositioning, parcel packaging "air").

---

## SURVIVING IDEAS

### Idea 1. Private-fleet empty-mile monetization (backhaul desk for shipper-owned fleets)

1. Problem and payer. Large shippers that run their own trucks (private fleets) drive a large share of miles empty and have no scalable way to sell the return leg; the payer is the Fortune 500 private-fleet operator (retail, food, beverage, building products). Buyer: VP Transportation / Private Fleet Director.
2. Size.
   - FACT: Average trucking cost was $2.336 per mile in 2025, record high (ATRI 2026 edition, via FleetOwner, trade press; https://www.fleetowner.com/operations/article/55392569/atri-report-breaks-down-class-8-truck-operating-costs-by-region-and-expense-category).
   - FACT: Industry-wide empty miles 16.7% in ATRI's 2025 edition (2024 data) (https://truckingresearch.org/2025/07/new-atri-report-shows-trucking-profitability-severly-squeezed-by-high-costs-low-rates/, trade body; the 16.7% was surfaced via secondary reporting, not read in the ATRI report itself).
   - FACT (government survey, old): Census VIUS 2002 self-reported empty miles 22% for private fleets (reached via FreightWaves/search summary, URL https://www.freightwaves.com/news/what-you-need-to-know-about-empty-miles-in-trucking; I did not open the Census table).
   - FACT (trade body, undated): NPTC survey: about 75% of private carriers hold for-hire authority and report about 25% empty miles, and about half of those empty miles are not available to haul loads (https://www.freightwaves.com/news/equipment-proving-the-value-of-private-fleets; date not shown in result).
   - FACT: NPTC 2026 survey: average heavy-duty tractor mileage 80,750 in 2025; survey drew on 104 companies (https://www.fleetowner.com/operations/article/55406770/private-fleets-lock-in-supply-chain-control-nptc-benchmarking-report, trade press, Aug 2026).
   - UNVERIFIED: a claim of "31% empty miles in the NPTC 2026 report" came from one search summary but could not be confirmed in any result; not used.
   - UNVERIFIED: total number of US private-fleet tractors; therefore no national dollar total is computed.
   - INFERENCE (per truck): 80,750 mi x 25% empty = about 20,200 empty mi; x $2.336 = about $47k of cost carried by empty running per tractor-year; if only half is addressable (NPTC), about $23k per tractor-year. Fleet-level: a 500-tractor fleet implies roughly $11M/yr addressable empty-running cost, before the revenue haircut from selling backhaul at a discount. This is a ceiling, not an expected capture.
3. Why now. INFERENCE plus FACT: the freight market has been soft with ATRI reporting record cost per mile and squeezed margins in 2025 (ATRI link above), which pushes private fleets to justify owned trucks; trade press says private fleets increasingly use telematics to justify ownership (https://carrieratlas.com/news/private-fleets-double-down-on-telematics-to-justify-truck-ownership, trade press, undated). Contradiction: one NPTC summary says private fleets used spare capacity to reduce empty miles by hauling for hire, another says less emphasis on backhaul; sources not reconciled.
4. Product. A software desk that ingests a private fleet's dispatch plan and telematics, finds the empty legs the fleet will run in the next 3 to 10 days, and offers each leg as a priced, pre-vetted capacity slot to outside shippers and brokers. First user: private-fleet transportation manager at a retailer/food company with for-hire authority. Day 1: connect TMS/ELD feed, see a list of next-week empty legs with a modeled backhaul revenue per leg, approve auto-posting of 5 lanes.
5. Why software can win. Data advantage: proprietary forward-looking empty-leg data across many private fleets (hard for brokers to see); network effect: more fleets = denser lane coverage. Switching cost modest (integration). Incumbents (verified to exist in results): RXO runs a private-fleet backhaul/utilization offering (https://rxo.com/resources/case-study/private-fleet-case-study/, vendor), Penske Truck Leasing publishes empty-mile matching content (https://www.pensketruckleasing.com/resources/resource-library/fill-empty-miles/, vendor). Brokerage digital freight networks also exist but I did not verify specific ones in this round. Uber Freight's claim that 20-35% of 175B US truck miles run empty (June 2023) is vendor marketing (https://www.marketscale.com/industries/transportation/empty-miles-still-account-for-20-to-35-of-us-truck-miles) and is not used in sizing.
6. Business model. Take rate on backhaul revenue, or SaaS per tractor. Benchmark: no benchmark found.
7. Assumptions and 30-day tests.
   - A: Private fleets can legally and operationally sell backhaul. Test: interview 15 NPTC-member fleet managers; falsified if fewer than 5 hold for-hire authority or have contracts barring third-party freight.
   - B: Empty legs are predictable days ahead. Test: take 90 days of dispatch/ELD data from 2 fleets and measure what share of realized empty legs were visible 72 hours earlier; falsified if under 50%.
   - C: Buyers of backhaul pay enough to beat the fleet's own cost. Test: price 20 sample empty lanes with 3 brokers; falsified if bids average below about 60% of $2.336/mi.
8. Confidence: Low to Medium. Cost per mile is solid, but the private-fleet empty percentage is dated or secondary, tractor count is unverified, and RXO already sells into this niche.

---

### Idea 2. Idle private-railcar fleet right-sizing for chemical/ag shippers

1. Problem and payer. Roughly one in five North American railcars sits in storage, while shippers and lessors keep paying lease or storage costs; payer is the Fortune 500 chemical, plastics, food-ingredient shipper holding leased tank/hopper cars (also lessors). Buyer: railcar fleet / logistics manager at the shipper.
2. Size.
   - FACT (trade body, primary AAR report): as of Feb 1, 2026, about 356,000 railcars, 21.8% of the 1.63M-car fleet, were in storage; AAR defines stored as not moved loaded in 60 days (https://www.aar.org/wp-content/uploads/2026/02/AAR-RIO-FEB-6-2026-FINAL.pdf; figure via search summary of that PDF).
   - FACT (trade press commentary, undated in result): 330,085 cars in storage, 35% (about 110,000) tank cars (https://www.railwayage.com/news/anemic-railcar-orders-an-industry-travesty/).
   - FACT: more than 60% of North American freight cars are leased or owned by others than railroads (FreightWaves commentary, https://www.freightwaves.com/?p=145930, undated).
   - FACT (vendor/market-data): IBISWorld 2026 benchmark for tank car leasing about $1,300 per month (https://www.ibisworld.com/united-states/procurement/rail-tank-car-leasing-services/52869484/, vendor); Commtrex marketplace quotes $500 to $1,200 per month for tank cars (https://www.commtrex.com/leasing, vendor).
   - INFERENCE: 110,000 stored tank cars x $500-$1,200/month x 12 = about $0.66B to $1.58B per year of lease value sitting idle. Caveats: stored cars are not all paying full lease (many are lessor inventory or railroad-owned), the 110,000 count is undated, and the two rates are vendor numbers. Treat as an upper bound for the whole market, not what shippers specifically pay.
   - CONFLICT: Railway Age/RSI (Q3 2026) reports lessor fleet utilization at 97% and cars returning from storage from storage, apparently inconsistent with 21.8% stored; probably different fleets and definitions (https://www.railwayage.com/financeleasing/for-gatx-strong-2q26-results/ and the FreightWaves 2026 outlook https://www.freightwaves.com/news/railcar-market-fleet-shrinks-as-demand-rises-2026-outlook). Shipper-owned/shipper-leased idle share is UNVERIFIED.
3. Why now. FACT: RailPulse (consortium of railroads, shippers, lessors) says it will apply a binding data standard for demurrage and storage disputes from Oct 1, 2026, and Nucor joined in July 2026 (https://railpulse.com/about/ and railwayage.com RailPulse coverage; trade press). STB's permanent weekly metrics rule (EP 787) set initial reporting July 8, 2026 (another source says July 1; unresolved) (https://www.stb.gov/news-communications/latest-news/pr-26-10/). STB launched a beta open-data portal with EP 724 data (railfanning.org summary). These make car-level location and dwell data available for the first time to build fleet models.
4. Product. Software that joins a shipper's lease list with RailPulse/telematics and public STB metrics to tell them which cars are idle, where, and which to return, sublease, or swap, then drafts the lessor return/sublease notice. First user: a chemical shipper's railcar fleet manager. Day 1: upload the lease schedule, see per-car idle days and a ranked list of 20 cars to release before the next lease anniversary.
5. Why software can win. Data advantage if it becomes the layer joining lease terms (not in any public dataset) with movement data; switching cost from embedded lease and contract data. Incumbents (found in results): Commtrex (leasing marketplace), RailPulse (data consortium that could expand into this), Railinc and lessors GATX/Trinity/TTX (conflicted counterparties). Telegraph-Watco railcar visibility initiative exists (FreightWaves). Risk: RailPulse owners may bundle this.
6. Business model. SaaS per car under management or share of sublease/early-return savings. Benchmark: no benchmark found.
7. Assumptions and tests.
   - A: A meaningful share of shipper-leased cars is truly idle and returnable. Test: get lease + movement history for one shipper (about 200 cars); falsified if idle-and-returnable cars under 5%.
   - B: Lessors permit early return or sublease at low penalty. Test: read 5 lease templates/ask 3 lessors; falsified if early-termination penalties exceed 6 months of rent.
   - C: Car-level data is accessible to the shipper. Test: request RailPulse/telematics access for 20 cars; falsified if data licensing cost or delay exceeds 30 days.
8. Confidence: Low. The 21.8% stored figure is credible (AAR), but conflicting utilization data, vendor lease rates and an unverified shipper-owned share mean the addressable loss is unproven.

---

### Idea 3. Idle trailer-pool utilization for shippers and carriers (assets sitting between loads)

1. Problem and payer. Trailers sit idle for large parts of their life because shipper yards, drop pools and carriers do not share location and availability data; payer is the carrier or shipper owning/leasing the trailers (Fortune 500 shippers with dedicated trailer pools, large carriers). Buyer: Director of Equipment / Fleet at the shipper or private fleet.
2. Size.
   - FACT (government audit, narrow): USPS OIG found 13.9% (1,076 of 7,746) of leased trailers on average were not used monthly, and 81 of 441 facilities missed the 40% utilization goal in FY2022 (reported in search summary of FreightWaves/USPS OIG; USPS only).
   - FACT (vendor): REPOWR's CEO figure is that trailers sit empty about 40% of their life; vHub estimate up to 20% of North American trailers unused; FleetOwner cites industry estimates of 20-30% idle for LTL (https://www.freightwaves.com/news/maximizing-trailer-utilization-why-is-it-so-hard; https://www.fleetowner.com/equipment/trucks-trailers/article/21248689/tips-and-tricks-for-keeping-track-of-your-trailer-fleet). Vendor estimates, not audited.
   - UNVERIFIED: national trailer population and per-trailer annual cost/lease rate; no dollar total can be computed. The REPOWR rental-rate article (https://www.freightwaves.com/?p=568938) was surfaced but its rates were not in the snippet.
3. Why now. FACT: only about 24% of US trailers had tracking in 2019 (FreightWaves, vendor-sourced); INFERENCE: tracking adoption has presumably grown since but I found no current figure.
4. Product. A pool optimizer that reads trailer-tracker and yard data, computes the right trailer-to-tractor ratio per facility, and lists surplus trailers for sharing or return. First user: private-fleet or dedicated-contract manager. Day 1: connect tracker feed, see idle days per trailer and a recommended pool size per site.
5. Why software can win. Network effect across pools, but weak: incumbents already own the idea. REPOWR (raised $8M Series A in April 2023, UP.Partners-led, total $12.8M per PitchBook via FreightWaves; https://www.freightwaves.com/news/trailer-pooling-gains-more-interest-in-repowrs-8m-series-a-raise), vHub, Powerfleet (vendors, named in the FreightWaves article above).
6. Business model. SaaS per trailer or marketplace fee. Benchmark: no benchmark found.
7. Assumptions and tests.
   - A: Idle share is as high as vendors claim in modern fleets. Test: analyze ping data for 500 trailers over 60 days; falsified if idle over 5 days under 10%.
   - B: Shippers will let outsiders use pool trailers. Test: ask 10 shippers; falsified if fewer than 3 would.
   - C: Savings exceed the incumbents' offering. Test: compare to REPOWR pricing on a 100-trailer pilot.
8. Confidence: Low. Sources are vendor claims, no dollar total, and an incumbent with funding exists.

---

## REJECTED IDEAS

### R1. Driver detention / dock dwell (reject)
- FACT: ATRI reported detention costs the industry over $15B annually and 135M hours lost in 2023; drivers were detained at 39.3% of stops (https://truckingresearch.org/wp-content/uploads/2024/09/ATRI-Costs-and-Consequences-of-Truck-Driver-Detention-09-2024.pdf, trade body, Sept 2024; read via search summary). Older government estimate: DOT OIG 2018 put driver earnings loss at $1.1-1.3B/yr and carrier loss $250.6-302.9M/yr (https://www.overdriveonline.com/business/article/14893834/report-detention-sucks-over-1-billion-from-truckers-wages-annually-boosts-crash-risk, news summary of a government report).
- Reason: the loss is real and large, but (a) the monetization route (billing and collecting detention) overlaps the already-considered invoice audit/demurrage-defense ideas; (b) the prevention route (dock scheduling) is crowded: Opendock (owned by Loadsmart per search text; vendor claim of 70,000 carriers, 7M appointments, 3,000 warehouses), Descartes and MacroPoint dock scheduling, and an Oct 2026 "Open Logistics API" push on dock-scheduling interoperability (https://logisticsviewpoints.com/2026/10/19/open-logistics-api-dock-scheduling-interoperability/).

### R2. Empty container repositioning (reject)
- FACT: BCG (2015) estimated $15-20B/yr industry-wide, 5-8% of a typical carrier's operating cost; Drewry (Oct 2023) at least $16B/yr (https://gcaptain.com/empty-container-repositioning-costs-shipping-industry-up-to-20-billion-per-year; https://www.scdigest.com/ONTARGET/23-10-11_DREWY_ON_CONTAINER_IMBALANCES.PHP?CID=21014).
- Reason: payer is the ocean carrier, not a Fortune 500 shipper, and carriers solve it with global network planning in-house. Street-turn/one-way matching is already served: Container xChange (marketplace, vendor claim 100,000+ containers at 2,500+ locations), Avantida/E2open running Maersk's automated street turns (vendor claim up to 90% approval). The size is old (2015) for the BCG number and the shipper-side buyer is unclear.

### R3. Parcel packaging "air" and dimensional-weight waste (reject for lack of data)
- I found no study quantifying the share of parcels with excess empty space (search summary said so explicitly). Only vendor illustrations (e.g., PackWire: 6 lb item in oversized box about 1 lb billed air, about 14% of charge, vendor) and a 2016 DC Velocity survey (https://www.dcvelocity.com/articles/20160815-dim-weight-pricingone-year-on/, trade press, dated).
- Why-now exists: USPS moved its dim divisor from 166 to 139 and began rounding up each dimension on July 12, 2026 (several vendor/blog sources, e.g., https://www.shopifreaks.com/usps-to-round-up-package-dimensions-to-whole-inches-and-change-dimensional-weight-divisor-on-july-12-to-align-pricing-with-fedex-and-ups/). Carrier divisors: UPS 139 daily / 166 retail, FedEx 139 (vendor blogs; verify against rate guides).
- Reason: size UNVERIFIED, so no defensible loss figure; also a crowded space of cartonization/right-size packaging vendors (Packsize appeared in results, others not verified). Worth revisiting only if a primary dataset (carrier DIM audit data, a shipper's own) is obtained.

---

## Cross-cutting data caveats
- Truck empty-mile figures conflict by method: 16.7% (ATRI, 2024 data), about 19% overall and 22% private (Census VIUS 2002), 20.7% (ATRI 2018 report on 2017), 20-35% (Uber Freight, vendor). BTS/FHWA hosted no national empty-mile percentage in the search results.
- Flock Freight/Drive Research survey (vendor, self-reported): 58% of truckloads moved partially empty in 2024, up from 43% in 2023, average 34 linear feet unused (https://www.flockfreight.com/company/press-releases/new-study-finds-58-of-truckloads-moved-over-half-empty-in-2024). Not used for sizing; Flock sells shared truckload, so shared-truckload consolidation is an incumbent-occupied niche.
- Rail service data: STB letter dated Aug 3, 2026 says Clearing Yard (Chicago) dwell rose 72% from about 18 to 31 hours (https://www.stb.gov/wp-content/uploads/8-3-26-Letter-from-STB-to-BRC.pdf, government). Considered as an idea (rail service-failure evidence for intermodal shippers) but no loss figure found, so parked.
- Not found / gaps: private-fleet tractor count; trailer population and idle cost; shipper-held share of stored railcars; any BTS/FHWA primary empty-mile statistic; inventory-in-transit carrying-cost data (not searched in depth).
