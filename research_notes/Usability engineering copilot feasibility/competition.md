# Competitive Landscape: Software and AI Tools for Medical Device Usability Engineering / Human Factors Documentation

Research method note: about 20 web searches. Direct page fetches failed for several key domains (uktech.news, emergobyul.com, openregulatory.com, greenlight.guru are not on this session's allowed network list), so many findings come from search-result snippets of those pages, not full page reads. Many sources are vendor or competitor marketing; this is flagged inline. Research date: 2026-11-05.

## Q1. Do eQMS / ALM tools offer usability engineering modules? How deep? Pricing?

### Takeaway
No eQMS/ALM vendor found offers a dedicated, AI-driven usability engineering module. Usability support comes in two forms: configurable traceability (Aligned Elements' IEC 62366 configuration, generic design-control/risk traceability in Matrix Req, Ketryx, Jama) or document templates inside the eQMS (OpenRegulatory/Formwork's IEC 62366 template pack, now "with AI assistance"). AI investment by incumbents goes to traceability, DHF assembly, risk (ISO 14971), requirements quality and gap analysis, not to HF content such as use specifications, task analysis, URRA, or formative/summative protocols and reports. Pricing ranges from €99/month (Formwork Starter) to quote-only enterprise contracts (Greenlight Guru, Ketryx).

### Cited Findings
**OpenRegulatory / Formwork (EU, aimed at lean startups)**
- Offers IEC 62366 templates (Usability Evaluation Plan, Protocol, Report), described as built into Formwork "as a live QMS pack with AI assistance and connected records." — [OpenRegulatory IEC 62366 templates](https://openregulatory.com/template-category/iec-62366-templates/); [Usability Evaluation Plan](https://openregulatory.com/usability-evaluation-plan-template-iec-62366/); [Usability Evaluation Report](https://openregulatory.com/or_template/usability-evaluation-report/); [Usability Evaluation Protocol](https://openregulatory.com/or_template/usability-evaluation-protocol/)
- Publishes a free table mapping each IEC 62366-1:2015 clause to document sections (for example, clause 5.9 summative evaluation maps to the Usability Evaluation Protocol). — [OpenRegulatory mapping](https://openregulatory.com/document_templates/iec-62366-12015-mapping-of-requirements-to-documents)
- Its SOP template merges usability engineering into risk management and integrated software development ("no separate risk management and usability engineering processes"). — [OpenRegulatory SOP Integrated Software Development](https://openregulatory.com/document_templates/sop-integrated-software-development)
- Pricing: Starter €99/month (+VAT, 5 seats, cannot release product documentation); QMS + Techdoc €499/month (list price €799, discounted to €499 for everyone as of March 2025; unlimited seats; annual €5,489). The older €49 Starter figure is outdated. — [OpenRegulatory pricing](https://openregulatory.com/pricing); [Formwork pricing article](https://openregulatory.com/articles/formwork-eqms-pricing-and-when-you-should-upgrade); [launching Formwork Starter](https://openregulatory.com/launching-formwork-starter); [Formwork pricing page (outdated €49)](https://openregulatory.com/formwork/pricing)
- A free Community Edition with 5 seats was reported by a third party. — [European Purpose](https://europeanpurpose.com/tool/openregulatory)

**Aligned Elements (Swiss ALM / design-control tool)**
- Ships a preconfigured IEC 62366-1:2015 setup that ties usability inputs, outputs and risk elements into design-control traceability. It includes 2 preconfigured traceability tables and a use-specification review checklist. The support page is about 4 years old. — [Aligned Elements IEC 62366 configuration](https://www.aligned.ch/support-center/extensions/configurations-for-med-tech-standards/443-the-aligned-elements-iec-62366-configuration)

**Ketryx (AI-native ALM overlaying Jira/GitHub/ADO)**
- Raised a $39M Series B in Sept 2025, led by Transformation Capital with Lightspeed. Total funding is over $55M. — [SiliconANGLE](https://siliconangle.com/2025/09/04/ketryx-raises-39m-help-medical-device-makers-ship-safer-products-faster/); [MedTech Dive](https://www.medtechdive.com/news/ai-ketryx-raises-39m-funding/759375/); [Ketryx blog](https://www.ketryx.com/blog/ketryx-raises-39m-series-b-from-transformation-lightspeed-to-scale-ai-in-medtech)
- "Validated AI agents" automate validation, traceability, FDA/EU MDR documentation and post-market complaint triage. The company claims a 90% cut in manual work and says 3 or 4 of the top 5 medtechs are customers (sources disagree), plus Meta Reality Labs and Flo Health. These are vendor claims. — [SiliconANGLE](https://siliconangle.com/2025/09/04/ketryx-raises-39m-help-medical-device-makers-ship-safer-products-faster/); [AI Business](https://aibusiness.com/health-care/ai-startup-raises-39m-to-speed-medical-device-compliance); [Ketryx press release](https://www.ketryx.com/press-release/momentum-as-demand-for-validated-ai-surges)
- Its traceability covers requirements, design, risk, code and tests. No usability-specific module was found. A competitor notes its traceability depends on Jira configuration (competitor claim). — [Matrix One "Ketryx alternative"](https://matrixone.health/alternatives/ketryx)

**Matrix Req (formerly Matrix Requirements)**
- Positioned for design control, risk and traceability in one validated system. Its own blog ranks it #1 for medtech traceability in 2026, which is a self-interested ranking. No usability module or AI feature details were found. — [Matrix One best traceability tools 2026](https://matrixone.health/blog/best-requirements-traceability-tools-medical-devices); [Matrix One AI features in RM tools](https://matrixone.health/blog/requirements-management-tools-ai-features)

**Jama Connect**
- Jama Connect Advisor (native) uses NLP to score requirements against INCOSE rules and EARS notation, with guided authoring and batch analysis. This is requirements quality, not HF content. — [Matrix One AI features review](https://matrixone.health/blog/requirements-management-tools-ai-features)
- Jama publishes an IEC 62366 educational guide (content marketing; no module found). — [Jama IEC 62366 guide](https://www.jamasoftware.com/requirements-management-guide/medical-devices/iec-62366/)

**Greenlight Guru**
- Risk Intelligence (launched May 2023) uses AI on real-world adverse event data to suggest hazards and harms with estimated probabilities and severities, as part of ISO 14971 Risk Solutions. — [PRWeb](https://www.prweb.com/releases/greenlight-guru-launches-ai-powered-solutions-to-enable-better-risk-management-for-the-medtech-industry-810067308.html); [Greenlight Risk Intelligence](https://greenlight.guru/risk-intelligence); [24x7 Mag](https://24x7mag.com/medical-equipment/software/greenlight-guru-launches-ai-powered-risk-solutions-for-medtech)
- Partnered with Bosch AIShield on AI risk management. — [Bosch AIShield press release](https://boschaishield.com/company/press-releases/greenlight-guru-and-aishield-join-forces-to-empower-medtech-companies-with-enhanced-ai-risk-management)
- Its usability support is educational content and free templates (use specification template, HF blog posts), not a module. — [Greenlight Use Specification Template](https://www.greenlight.guru/downloads/use-specification-template); [Greenlight HF blog](https://www.greenlight.guru/blog/human-factors-medical-device); [Greenlight usability-in-QMS blog](https://www.greenlight.guru/blog/medical-device-usability)
- Pricing is not public ("Contact vendor"; no free version or trial). — [Capterra pricing](https://www.capterra.com/p/140578/greenlight-guru/pricing/); [G2 pricing](https://g2.com/products/greenlight-guru/pricing)

**Qualio**
- Its AI feature, as described by competitor Greenlight Guru, scans a QMS clause by clause against a standard for gaps. — [Greenlight vs Qualio](https://www.greenlight.guru/greenlight-guru-vs-qualio)

### Inferences
- Across these vendors, usability engineering is treated as a sub-case of design controls plus risk management. A tool provides trace links and templates, and the HF engineer still writes the content by hand. This leaves room for an HF-content copilot (use specification, user profiles, task analysis, PCA analysis, URRA, known-use-problem research, formative/summative protocols and reports, HF/UE report per FDA's Appendix A structure).
- Incumbents are within reach, though. Greenlight's Risk Intelligence already mines adverse event data for hazards and harms, a short step from use-error and known-use-problem mining. Ketryx's agent framework and Formwork's "AI assistance" on its IEC 62366 templates show a usability-specific AI feature is cheap for them to add. A standalone product should expect that competition and make integration (export into these systems) a selling point.
- Formwork's €99–499/month anchors what startups expect to pay for a whole eQMS. A usability-only add-on probably needs to price well below that, or target consultancies and mid-size manufacturers.

### Gaps
- Polarion (Siemens), Enzyme, Qualio and Matrix Req pricing and usability features were not found in this pass. Their sites were not fetched.
- I could not read Greenlight Guru's "Greenlight Guru AI" page (https://www.greenlight.guru/greenlight-guru-ai) because the fetch was blocked, so its current AI feature list for 2025–2026 is unconfirmed. A snippet references AI for traceability, DHF assembly and audit-critical checks, and possible ISO/IEC 42001 certification (claim from a competitor source; not verified) — [Matrix One](https://matrixone.health/blog/requirements-management-tools-ai-features).
- I could not confirm the depth of the "AI assistance" on Formwork's usability templates (page not fetchable).

## Q2. Dedicated HF/usability software and AI regulatory-writing tools for medtech: funding, customers, pricing

### Takeaway
The only dedicated HFE software platform found is Emergo by UL's OPUS (launched March 2022, freemium SaaS with training, tools and templates). No AI-native, usability-specific copilot startup was found. A growing set of funded AI regulatory-documentation startups covers technical documentation broadly (Klaris, FormlyAI, i-GENTIC AI, Celegence CAPTIS, Ketryx) and could expand into HF. A low-priced template market ($99–$500 per template, about €400 per full pack) shows people will pay for HF documents.

### Cited Findings
**Emergo by UL: OPUS (Optimal Product Usability Suite)**
- Launched March 9, 2022 as a web-based SaaS HFE platform. It has a free "Core" tier (guided HFE process and productivity tools) and a "Premium" tier (training modules and document libraries). — [PR Newswire](https://www.prnewswire.com/news-releases/emergo-by-ul-launches-digital-human-factors-engineering-platform-for-medical-device-manufacturers-301499296.html); [Emergo news](https://www.emergobyul.com/news/emergo-ul-launches-digital-human-factors-engineering-platform-medical-device-manufacturers); [Today's Medical Developments](https://www.todaysmedicaldevelopments.com/news/emergo-digital-human-factors-engineering-platform-medtech/)
- Emergo's software line pairs OPUS with RAMS (regulatory affairs management software). — [Emergo software](https://www.emergobyul.com/software)
- Emergo's AI activity is advisory: a 2025 HFES Health Care Symposium session on designing custom AI tools to support HFE activities, and webinars on FDA's 2025 AI draft guidance. No named AI product launch was found. — [Emergo HFES 2025 highlights](https://www.emergobyul.com/resources/emergo-ul-hfrd-team-highlights-2025-hfes-health-care-symposium); [Emergo AI guidance Q&A](https://www.emergobyul.com/news/common-qa-emergos-human-factors-webinar-fdas-2025-ai-draft-guidance)

**AI regulatory documentation startups**
- **Klaris** (London, founded 2024 by Francesco Corazza): pre-seed of about $1M (reported as £730k, £880k or $1M; sources conflict) in Feb 2026. Meridian Health Ventures led, with Antler, Vento Ventures and Alecla7. It automates technical documentation, gap analysis and consistency checks against expert-validated requirements for EU MDR and FDA, and is ISO 27001 certified. — [UKTN](https://www.uktech.news/medtech/klaris-medical-device-pre-seed-20260217); [StartupMag](https://www.startupmag.co.uk/funding/klaris-2026-pre-seed-funding); [Seedtable](https://seedtable.com/companies/klaris/funding-rounds/pre-seed-2026-02); [Startuprise](https://startuprise.co.uk/london-based-klaris-secures-1m-funding-in-pre-seed-round/); [Village.ai](https://village.ai/company/klaris-ai)
- **FormlyAI**: AI-assisted eQMS plus regulatory experts for EU MDR/FDA, with UKCA/MDSAP reported. Raised a $2M seed in Sept 2025 (investors reportedly include Gradient Ventures, Gaingels and Heal Capital). Pricing moved to "contact sales" around mid-2025. A historic $899/month plan was reported by competitor OpenRegulatory, which also says Formly launched a second product, "Dovetail", in 2026 (unverified). — [Pulse 2.0](https://pulse2.com/formlyai-2-million-raised-for-medical-device-certification-solution); [Seedtable](https://seedtable.com/companies/formlyai/funding-rounds/seed-2025-09); [Tryfundable](https://www.tryfundable.ai/company/formlyai); [OpenRegulatory on Formly pricing](https://openregulatory.com/articles/formly-ai-pricing)
- **i-GENTIC AI**: launched "context-aware, multilingual MedTech agents" in Feb 2026 for 510(k) submission consistency. Its example: catching a late intended-use change that no longer matched the risk analysis and test results. — [AdvaMed industry update](https://www.advamed.org/industry-updates/news/i-gentic-ai-launches-context-aware-medtech-agents-to-strengthen-fda-510k-submission-consistency/)
- **Celegence CAPTIS**: supports MDR/IVDR medical writing (listed in a 2026 tool landscape). — [Superkind 2026 tool landscape](https://superkind.ai/blog/ai-medical-devices)
- **Ketryx**: see Q1 ($55M+ raised; AI agents for documentation).

**Templates sellers (price anchors)**
- Medical Device HQ: Use Specification Template (IEC 62366-1) at 99 (currency not shown) and a Hazard-Related Use Scenario template. — [MDHQ Use Spec](https://medicaldevicehq.com/?p=329016); [MDHQ HRUS template](https://medicaldevicehq.com/store/templates/premium/hazard-related-use-scenario-template-iec-62366-medical-device/)
- Payhip Usability Engineering / HF Regulatory Pack: €400. — [Payhip](https://payhip.com/b/rioLZ)
- i3C Global: UE Process SOP at $150; UEF record templates at $250 each. — [i3C Global](https://i3cglobal.com/?p=16004)
- Maven Professional Services: Usability Engineering Report Template (EU MDR) at $500. — [Maven](https://mavenprofserv.com/usability-engineering-report-template-eu-mdr/)
- The IEC 62366-1:2015 standard itself costs €845.30 (+€123.05 for Amd 1) at VDE. — [VDE Verlag](https://www.vde-verlag.de/p/normen/iec-62366-1-2015/221482-BI-PDF)

### Inferences
- No direct AI-native competitor in HF/usability documentation was found, which is a whitespace signal. The adjacent AI-regdoc startups are small (pre-seed/seed, $1–2M), however, and generalist; HF is an obvious next module for them.
- OPUS is the closest product analog: process guidance plus templates, from the dominant HF consultancy. It has no evident generative AI. If UL adds AI to OPUS, it would be the strongest threat, given its brand and installed base.
- Template prices of $100–$500 per document suggest a floor for willingness to pay, but they also show the "do-it-yourself" segment is price-sensitive.

### Gaps
- OPUS Premium pricing, user counts and customers were not found (emergobyul.com was not fetchable).
- No evidence was found of other dedicated HF SaaS tools (for example URRA/task-analysis software). A search for URRA SaaS tools returned only methodology content and an old HF-PFMEA patent ([USPTO 7263510](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7263510)).
- Revenue and customer counts for Klaris, FormlyAI and i-GENTIC were not found.

## Q3. How HF consultancies use or sell tools: partners or competitors?

### Takeaway
The HF consultancy market is consolidating through acquisitions (ClariMed acquired UserWise in 2023 and We Are Human in 2025; Core Human Factors joined Rimkus). Apart from Emergo's OPUS, consultancies sell services, not software. They are likely both a channel (they need productivity tooling for their own document-heavy work) and competitors (Emergo's OPUS, plus custom in-house AI tools such as those Emergo discussed at HFES 2025).

### Cited Findings
- Emergo by UL runs OPUS (freemium SaaS) and RAMS alongside its HF Research & Design consulting. — [PR Newswire](https://www.prnewswire.com/news-releases/emergo-by-ul-launches-digital-human-factors-engineering-platform-for-medical-device-manufacturers-301499296.html); [Emergo HFR&D services](https://emergobyul.com/services/human-factors-research-design)
- Emergo's HFR&D team presented on designing custom AI tools to support HFE activities at the 2025 HFES Health Care Symposium, so it is building internal AI tooling. — [Emergo HFES 2025](https://www.emergobyul.com/resources/emergo-ul-hfrd-team-highlights-2025-hfes-health-care-symposium)
- Core Human Factors (PA) is a usability consultancy (testing, validation, regulatory guidance) and is part of the Rimkus Family of Companies. — [ONdrugDelivery](https://ondrugdelivery.com/?p=2135); [Core HF about](https://sites.google.com/corehf.com/core/about-us/about-us-overview)
- ClariMed acquired UserWise in January 2023 and We Are Human (UK/US HF testing consultancy) in August 2025. — [PrivSource](https://www.privsource.com/acquisitions/deal/KLXSvN); [MTEC UserWise](https://mtec-sc.org/life-sciences/userwise-a-clarimed-company)
- Agilis Consulting Group is a full-service medical HF firm that announced an expansion. — [Newswire](https://www.newswire.com/news/agilis-consulting-group-announces-expansion-19593337)

### Inferences
- Mid-size consultancies (ClariMed/UserWise, Core, Agilis) have no software of their own and could be early design partners or resellers. Their incentive to buy a copilot is margin on fixed-fee projects.
- Emergo/UL is the only consultancy-software hybrid and is building custom AI tools, so it is a potential competitor rather than a partner.
- A copilot sold directly to manufacturers could be seen as cutting into consultancy billable hours. Positioning it as "HF engineer leverage" rather than "replace the consultant" is likely the safer route.

### Gaps
- I found no data on what tools consultancies use internally (beyond Emergo) or on their willingness to license third-party AI.

## Q4. User-reported gaps and complaints (forums, Reddit, G2/Capterra)

### Takeaway
Reddit/forum evidence specifically about HF documentation tooling could not be retrieved. Review-site evidence for the main eQMS (Greenlight Guru) is positive overall (G2 4.5/5 across 411 reviews; Capterra 4.4 across 80). Complaints centre on price, inflexibility, costly extra projects and limited analytics, not on usability engineering, because no vendor offers a real usability module.

### Cited Findings
- Greenlight Guru: G2 average 4.5/5 (411 reviews); Capterra 4.4 (80 reviews); Capterra value-for-money 4.3. — [G2 reviews](https://www.g2.com/products/greenlight-guru-quality-management-software/reviews); [Capterra reviews](https://capterra.com/p/140578/greenlight-guru/reviews/)
- One verified G2 mid-market reviewer said "Biggest complaint is pricing." G2 summaries cite feature limitations, inflexibility, costly extra projects and limited analytics. — [G2 pricing](https://g2.com/products/greenlight-guru/pricing); [rfp.wiki summary](https://www.rfp.wiki/vendors/greenlight-guru)
- OpenRegulatory (a competitor) criticises FormlyAI for removing transparent pricing ("Not Good For Startups"). — [OpenRegulatory](https://openregulatory.com/formly-ai-pricing)
- Practitioner guides describe UEF work as manual cross-document alignment: keeping hazard-related use scenarios consistent with the risk management file and URRA, and building matrices that link each scenario to a risk-table row and a summative test case. — [Johner Institute](https://blog.johner-institute.com/iec-62366-usability/use-scenario-user-story-user-task/); [Kelsey QMS guide](https://kelseyqms.com/guides/iec-62366-usability-engineering)
- i-GENTIC's example (an intended-use change not carried through to risk analysis, past internal checks) shows the cross-document consistency failure mode in submissions. — [AdvaMed](https://www.advamed.org/industry-updates/news/i-gentic-ai-launches-context-aware-medtech-agents-to-strengthen-fda-510k-submission-consistency/)

### Inferences
- The clearest pain point a copilot could address is consistency and traceability across UEF documents and the risk file, which vendors and guides describe as manual. Pure drafting is a weaker pitch.
- eQMS pricing complaints, together with startups' preference for transparent pricing, support a transparent, self-serve price point.

### Gaps
- No Reddit r/MedicalDevices, LinkedIn or Elsines forum threads on HF tooling were retrieved; searches returned none. This is a significant evidence gap, and primary customer interviews are needed.
- No G2/Capterra reviews of Ketryx, Matrix Req, Aligned Elements or OPUS were gathered.

## Q5. Evidence of big incumbents adding AI features (2025–2026)

### Takeaway
Yes. Incumbents and well-funded challengers added AI in 2025–2026, but aimed at traceability, validation, risk, DHF and gap analysis rather than HF/usability content. Regulatory pressure on HF is rising: FDA finalized its HF submission-content guidance in May 2026 and updated its HF/UE guidance in August 2026 (secondary sources only), and AI-enabled devices bring new HF expectations. This raises demand and the odds that incumbents build HF features.

### Cited Findings
- Ketryx: $39M Series B (Sept 2025) to scale "validated AI agents" for documentation and compliance. — [MedTech Dive](https://www.medtechdive.com/news/ai-ketryx-raises-39m-funding/759375/)
- Greenlight Guru: AI Risk Intelligence (2023), the Halo change-management aid, and a current "Greenlight Guru AI" offering (page not fetchable). — [24x7 Mag Halo](https://24x7mag.com/medical-equipment/software/ai/greenlight-guru-launches-halo-change-management-aid-medical-device-manufacturing); [Greenlight Guru AI](https://www.greenlight.guru/greenlight-guru-ai)
- Jama Connect Advisor: NLP requirements-quality scoring. — [Matrix One](https://matrixone.health/blog/requirements-management-tools-ai-features)
- Qualio: AI clause-by-clause gap analysis (per competitor). — [Greenlight vs Qualio](https://www.greenlight.guru/greenlight-guru-vs-qualio)
- Formwork: IEC 62366 templates "with AI assistance". — [OpenRegulatory](https://openregulatory.com/template-category/iec-62366-templates/)
- i-GENTIC AI 510(k) agents (Feb 2026); Klaris pre-seed (Feb 2026); FormlyAI seed (Sept 2025). — [AdvaMed](https://www.advamed.org/industry-updates/news/i-gentic-ai-launches-context-aware-medtech-agents-to-strengthen-fda-510k-submission-consistency/); [Seedtable Klaris](https://seedtable.com/companies/klaris/funding-rounds/pre-seed-2026-02); [Seedtable Formly](https://seedtable.com/companies/formlyai/funding-rounds/seed-2025-09)
- Regulatory demand: FDA reportedly finalized "Content of Human Factors Information in Medical Device Marketing Submissions" (May 2026) and an updated "Applying Human Factors and Usability Engineering" guidance (Aug 2026). Only secondary sources confirm this. — [Lexology / Intelacia](https://www.intelacia.com/2026/08/26/medical-device-usability-fda-human-factors-guidance); [Koji](https://www.koji.so/docs/medical-device-usability-testing)
- AI-enabled device HF expectations (cognitive load, transparency, override, automation bias). A NEJM AI practical guide (Mar 2026) lists 7 HF risks. — [Maven RS](https://www.mavenrs.com/blog/fda-ai-enabled-medical-device-human-factors-2026); [NEJM AI](https://ai.nejm.org/doi/full/10.1056/AIpc2501297)

### Inferences
- Incumbents have not prioritized HF-specific AI yet, which leaves a window, likely 12–24 months, before eQMS/ALM vendors add "draft URRA / use spec" features.
- The new FDA HF guidances (if confirmed) are a timely wedge: a copilot that maps outputs to the new submission-content tiers, and to AI-device HF expectations, would differentiate from generalist AI regdoc tools.

### Gaps
- The FDA 2026 HF guidance finalizations need confirmation on fda.gov.
- No 2025–2026 AI announcements were found for Polarion, Enzyme or Matrix Req.
- Whether an IEC 62366-3 (AI usability) technical specification is in progress was mentioned only by a secondary source ([Koji](https://www.koji.so/docs/medical-device-usability-testing)) and is unconfirmed.
