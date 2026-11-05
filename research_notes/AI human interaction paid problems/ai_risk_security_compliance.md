# AI risk, security, compliance, and data-quality problems companies pay to solve

Method note: WebFetch could not reach ibm.com/newsroom or gartner.com (host not in session network allowlist), so every figure below comes from WebSearch result summaries and secondary pages, not from primary documents. Primary-source URLs are given where the search returned them. Treat all figures as "reported by", and verify before quoting.

## Shadow AI, data leakage, and AI governance gaps (what incidents and costs quantify it)

### Takeaway
IBM's 2025 Cost of a Data Breach report is the anchor stat: high shadow-AI use added about $670K per breach, and about 1 in 5 organizations reported a shadow-AI breach. Gartner forecasts more than 40% of organizations will have shadow-AI security or compliance incidents by 2030. Governance is thin: only about 37% have AI policies or shadow-AI detection.

### Cited Findings
- Organizations with high shadow AI paid about $670,000 more per breach than those with low or none; roughly 1 in 5 organizations reported a breach due to shadow AI; shadow-AI incidents exposed customer PII in 65% of cases and IP in 40%; only about 37% of organizations have policies to manage AI or detect shadow AI; mature security AI/automation cut breach costs by nearly 40% — [Technology Magazine on IBM report](https://technologymagazine.com/news/ibms-cost-of-a-data-breach-report-on-risks-of-ai-breaches); [TechRepublic](https://www.techrepublic.com/article/news-ai-breach-risks-rise-as-governance-lags/); [Baker Donelson summary](https://www.bakerdonelson.com/ten-key-insights-from-ibms-cost-of-a-data-breach-report-2025)
- Baseline breach-cost figures conflict between secondary sources ($4.63M vs $3.96M in one; $4.74M vs $4.07M in another). Only the $670K premium matched across sources — [Aryaka](https://www.aryaka.com/blog/ibm-2025-cost-of-a-data-breach-how-ai-and-shadow-ai-shape-cybersecurity/); [Kiteworks](https://www.kiteworks.com/?p=153950)
- Gartner (published Nov 2025): more than 40% of global organizations will face security or compliance incidents from unauthorized shadow AI by 2030, with IP loss and data exposure the main concerns; also predicts 50% of enterprises will face delayed AI upgrades or rising maintenance costs by 2030 from GenAI-driven technical debt — [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/gartner-40-firms-hit-shadow-ai/); [ITPro](https://www.itpro.com/technology/artificial-intelligence/gartner-says-40-percent-of-enterprises-will-experience-shadow-ai-breaches-by-2030-educating-staff-is-the-key-to-avoiding-disaster)
- Buyer spend on data-security-for-AI: Veeam agreed to acquire Securiti AI (DSPM) for about $1.7B, announced Oct 21, 2025 — [Bloomberg](https://www.bloomberg.com/news/articles/2025-10-21/insight-owned-veeam-agrees-to-buy-securiti-ai-for-1-7-billion); [CyberScoop](https://cyberscoop.com/veeam-securiti-ai-acquisition/)
- Cyera (data security/DSPM) valuation path: $3B (Series D, Nov 2024), $6B (June 2025), $9B (Jan 2026, $400M), $12B ($600M, reported June 2026; total raised above $2B) — [SecurityWeek $12B](https://www.securityweek.com/cyera-raises-600-million-at-12-billion-valuation/); [SecurityWeek $9B](https://www.securityweek.com/cyera-raises-400-million-at-9-billion-valuation/); [BusinessWire Nov 2024](https://businesswire.com/news/home/20241120065588/en)

### Inferences
- Shadow AI is the most self-reported, quantifiable "AI risk" pain; the $670K premium and Gartner 40% give a ready ROI argument for discovery/DLP/governance tools.
- Data-security vendors tied to AI (Cyera, Securiti) command the largest valuations in this scope, suggesting buyers fund "know where sensitive data is before AI touches it."

### Gaps
- Primary IBM and Gartner documents not read (network blocked). Shadow-AI-specific average breach cost unreconciled.
- No per-company shadow-AI spend or named contract values found.

## Prompt injection and agent security

### Takeaway
Surveys (mostly vendor-run) report high agent-incident rates and low security budgets; prompt-injection-type manipulation is among the top reported incident types. Vendors are being acquired at hundreds of millions to billions.

### Cited Findings
- AvePoint State of AI 2026 (750 enterprise leaders): top incident types were data leakage (50.1%) and manipulation via malicious/untrusted inputs, essentially prompt injection (49.6%) — [Help Net Security](https://helpnetsecurity.com/2026/06/11/owasp-prompt-injection-ai-security-failures); [ai2.work on AvePoint](https://ai2.work/blog/avepoint-88-of-firms-hit-an-ai-agent-security-incident)
- Gravitee 2026 survey (919 executives): 88% reported AI agent security incidents in prior 12 months, while 82% of executives believed policies protect them. Arkose Labs: 97% of security leaders expect a material AI-agent incident within 12 months; only 6% of security budgets go to agentic AI risk — [Axis Intelligence compilation](https://axis-intelligence.com/agentic-ai-security-statistics/); [NeuralTrust](https://neuraltrust.ai/guides/the-state-of-ai-agent-security-2026). Conflict: some sources attribute the 88% figure to different surveys (AvePoint vs Gravitee).
- CSA survey: 82% of enterprises have unknown AI agents in their environments — [The Paypers](https://thepaypers.com/fraud-and-fincrime/news/csa-survey-finds-82-of-enterprises-have-unknown-ai-agents-in-their-environments)
- Gartner (April 2026): by 2028, 25% of enterprise GenAI apps will see at least five minor security incidents per year; 40% of enterprise apps will feature AI agents by end of 2026; agentic AI oversight named the top 2026 cybersecurity trend (secondary-source reports, unverified against Gartner) — [Axis Intelligence](https://axis-intelligence.com/agentic-ai-security-statistics/)
- M&A: Google-Wiz $32B all-cash, announced March 2025, closed around March 2026 (cloud security broadly, AI-security angle) — [Futuriom](https://www.futuriom.com/articles/news/google-to-pay-32-billion-for-wiz/2025/03); [Business Today](https://www.businesstoday.in/technology/news/story/google-finalises-32-billion-deal-to-acquire-cybersecurity-startup-wiz-520273-2026-03-12)
- SentinelOne announced acquisition of Prompt Security Aug 2025, price undisclosed; Globes reported $250-300M — [SecurityWeek acquisitions](https://www.securityweek.com/topics/acquires/)
- Protect AI: sources conflict on buyer and price (one says Palo Alto Networks, >$500M; another cites ~$300M). Unconfirmed — same search result set as Wiz above, e.g. [SiliconANGLE](https://siliconangle.com/?p=706164)
- NeuralTrust announced a $20M raise (page banner) — [NeuralTrust](https://neuraltrust.ai/guides/the-state-of-ai-agent-security-2026)

### Inferences
- Gap between executive confidence (82%) and incident rate (88%) plus 6% budget share indicates unfunded demand.

### Gaps
- Most survey numbers are vendor-run with unclear methodology. A claimed CISA/NSA April 2026 advisory was not verified. No named, dollar-quantified real-world prompt-injection breach found.

## EU AI Act and regulatory compliance costs

### Takeaway
EU high-risk obligations were delayed via the Digital Omnibus; per-system compliance cost estimates exist but come from secondary citations of Bruegel.

### Cited Findings
- Digital Omnibus on AI reportedly got final Council approval June 29, 2026: Annex III high-risk obligations pushed to Dec 2, 2027, AI embedded in regulated products to Aug 2, 2028; one source cites Regulation (EU) 2026/1744. Article 5 prohibitions apply since Feb 2025; Art. 50 transparency duties reportedly from Aug 2026 — [JD Supra](https://www.jdsupra.com/legalnews/eu-legislators-agree-to-delay-for-high-5617765/); [Pulse](https://www.pulse.bot/ai/news/eu-deal-delays-high-risk-ai-rules-under-digital-omnibus-0f1745ef-9826-447d-84eb-2492ea76fa93/); [Mobile World Live](https://www.mobileworldlive.com/europe/eu-delays-ai-rules-after-big-tech-pressure/)
- Compliance cost per AI system reportedly EUR 14,623-29,277, about 9-17% of an average EUR 170,000 development cost (secondary citation of Bruegel, unverified) — [Verdantix](https://www.verdantix.com/client-portal/blog/the-eu-ai-act-omnibus--quiet-changes-and-hidden-risks) (search result set; figure not traced to Bruegel)
- Commission staff document cites at least EUR 5B administrative cost savings for businesses from the omnibus — [CADE Project](https://cadeproject.org/updates/eus-digital-omnibus-proposes-major-delay-to-ai-act-high-risk-rules/)
- Advisers warn the delay is not a reprieve — [Pranoti/Science Talk](https://pranoti.thesciencetalk.com/perspectives/eu-ai-act-omnibus-delay-relief-or-trap/)

### Gaps
- Legal status and delay length conflict across sources (12 vs 16 months; one stale source says not enacted). No data found on NIST, SEC, or US state-law compliance costs, or on vendor revenue from AI Act compliance (e.g., Credo AI, Holistic AI).

## AI evaluation, monitoring, observability

### Takeaway
Funding is concentrated in eval/observability platforms; rounds are modest relative to security.

### Cited Findings
- Braintrust $80M Series B led by Iconiq (a16z, Greylock, Elad Gil), Feb 2026 — [Pulse](https://www.pulse.bot/ai/deals/braintrust-raises-80m-series-b-to-become-ai-observability-layer-6595f521-47a8-4413-bf58-77adeb77d694/)
- Arize AI $70M Series C, Feb 2025 (about $131M total per aggregator) — [Arize](https://arize.com/blog/arize-ai-raises-70m-series-c-to-build-the-gold-standard-for-ai-evaluation-observability.md); [TechCrunch](https://techcrunch.com/2025/02/20/arize-ai-hopes-it-has-first-mover-advantage-in-ai-observability)
- Galileo $45M Series B (Oct 2024), about $68M total; Fiddler $30M Series C (Jan 2026) and Patronus AI $50M Series B (June 2026) per an aggregator only — [Signalbase on Galileo](https://www.trysignalbase.com/news/funding/galileo-ai-raises-68m-in-series-b-accelerating-the-future-of-enterprise-genai-evaluation-and-observability); [AI governance funding roundup](https://newmarketpitch.com/blogs/news/ai-governance-top-startups-fundraising)

### Gaps
- No market-size estimate, no Gartner/Forrester observability data, no earnings-call mentions (Datadog, etc.) found. Fiddler/Patronus rounds unverified.

## Deepfakes, voice-cloning fraud, and verification

### Takeaway
Estimates of 2025 deepfake fraud losses range roughly $0.9B to $1.65B depending on methodology; all show strong growth. Detection vendors are funded but mostly with 2024 rounds in what I found.

### Cited Findings
- Surfshark: 2025 deepfake losses about $1.1B, roughly triple 2024 (about 80% from celebrity-impersonation investment scams); later analysis cited $1.65B; cumulative since 2019 about $3.7B — [Surfshark](https://surfshark.com/research/chart/deepfake-social-media-fraud); [KnowBe4](https://blog.knowbe4.com/report-deepfake-fraud-causes-billions-in-losses); [TechRadar](https://www.techradar.com/vpn/vpn-privacy-security/usd3-7b-lost-to-deepfakes-why-social-media-is-the-perfect-launchpad-for-ai-fraud)
- Resemble AI: $1.28B in 2025 fraud losses — [Resemble AI](https://resemble.ai/2025-deepfake-threat-report)
- FBI IC3 2025 report: about $893M in "AI-related" fraud, first year tracked, likely an undercount (via secondary) — [Veriff](https://www.veriff.com/fraud/deepfake-fraud-cost-2026)
- Pindrop: $100M debt financing from Hercules Capital (July 2024), on $218.3M prior equity — [Nasdaq press release](https://www.nasdaq.com/press-release/pindrop-secures-100-million-financing-accelerate-fraud-and-deepfake-detection)
- Reality Defender: Series A extended to $33M (Oct 2024); named Market Shaper in a Gartner deepfake-detection report, June 2026; est. $5B contact-center voice-fraud risk cited — [AIM Research](https://aimresearch.co/?p=12231); [Reality Defender](https://www.realitydefender.com/insights/reality-defender-playai-partnership-voice-deepfakes-fraud)

### Gaps
- Figures are not comparable across sources. Arup $25M and other named corporate cases not searched. No 2026 funding for Pindrop/Reality Defender found; no detection market-size figure.

## AI-ready data quality

### Takeaway
Gartner's headline: through 2026, 60% of AI projects without AI-ready data will be abandoned (a forecast, not an observed outcome).

### Cited Findings
- Gartner (Feb 26, 2025, analyst Roxane Edjlali): organizations will abandon 60% of AI projects unsupported by AI-ready data; survey found 63% lack confidence in their AI data management — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk); [Freevacy](https://www.freevacy.com/news/gartner/gartner-reveals-60-of-ai-projects-with-data-issues-will-fail/6155)
- Gartner: 30% of GenAI projects abandoned after proof of concept by end of 2025 due to poor data quality, inadequate risk controls, escalating costs or unclear value (secondary, via the same search)
- S&P Global (not Gartner): 42% of companies abandoned at least one AI initiative in 2025, up from 17% — secondary repetition, see [Noqta](https://www.noqta.tn/en/blog/ai-data-strategy-enterprise-readiness-2026)
- Unverified blog figures ($7.2M per failed initiative, 47% success with readiness assessments) could not be traced; excluded as evidence.

### Gaps
- No follow-up measurement of the 60% prediction; no data-quality vendor funding/M&A (e.g., Informatica-Salesforce, Monte Carlo) searched.

## Most frequently self-reported problems (cross-cutting)
- Data leakage (50.1%) and malicious-input manipulation (49.6%) lead AvePoint's incident list; shadow AI affects about 1 in 5 breached orgs (IBM); 82% have unknown agents (CSA); 63% distrust their AI data practices (Gartner). Citations above. Caveat: vendor-run surveys; no unified ranking found.
