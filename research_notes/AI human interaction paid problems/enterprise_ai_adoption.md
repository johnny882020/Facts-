# Enterprise AI deployment pain points and evidence of willingness to pay

Note on method: figures come from search-result summaries plus a few headline pages; most were not re-verified on primary pages (no page fetches). Items flagged "unverified" or "secondary" should be checked before publication.

## 1. What do surveys report as top blockers and cost of failure (ROI shortfall, pilot failure, adoption)?

### Takeaway
Across MIT, McKinsey, BCG, Deloitte, Gartner and S&P Global, the consistent finding is a wide gap between AI experimentation and measurable P&L value. Only a small minority (roughly 5-6%) report significant value, and a large share of pilots/projects are abandoned. Cited causes are integration/workflow redesign, skills, unclear value, cost and weak risk controls, rather than model quality alone.

### Cited Findings
- MIT NANDA "GenAI Divide: State of AI in Business 2025": 95% of enterprise gen-AI pilots deliver no measurable P&L impact, about 5% achieve rapid revenue acceleration. Based on 150 leader interviews, a 350-employee survey, and 300 public deployments. Authors blame integration and a "learning gap" rather than model quality. — [Fortune](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/); [Computing](https://computing.co.uk/news/2025/ai/mit-report-95pc-corporate-generative-ai-pilots-fail)
- MIT NANDA: externally purchased/partnered tools succeed about two-thirds of the time vs about one-third for internal builds (relevant to willingness to buy vendor solutions). — [Fortune](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- Caveat on MIT: coverage differs on whether 95% applies to all firms or to the dataset/larger companies; headline is a simplification of "no measurable P&L impact". — [Computing](https://computing.co.uk/news/2025/ai/mit-report-95pc-corporate-generative-ai-pilots-fail)
- McKinsey State of AI 2025: only 39% of respondents report any EBIT impact from AI, most of them under 5% of EBIT; 62% at least experimenting with agents, 23% scaling agents in one or two functions, no more than 10% scaling agents in any single function; ~6% are "high performers" (5%+ EBIT from AI). — [McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025)
- BCG (Sept/Oct 2025, "The Widening AI Value Gap"): only ~5% of companies are "future-built" and capture substantial value; ~60% report minimal revenue/cost gains despite investment; future-built firms show 1.7x revenue growth, 3.6x three-year TSR, 1.6x EBIT margin vs laggards; agents ~17% of AI value in 2025, expected ~29% by 2028. — [BCG press](https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings); [BCG PDF](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-October-2025.pdf); [SDCExec](https://www.sdcexec.com/software-technology/ai-ar/news/22951486/boston-consulting-group-bcg-60-of-organizations-report-minimal-revenue-cost-gains-from-scaling-ai-report)
- BCG-cited rule of thumb: ~10% of AI value from algorithms, ~20% from technology, ~70% from people/process (secondary summary, one source). — [Gloat summary](https://gloat.com/blog/ai-augmented-workforce/) (lower confidence); a later BCG item "AI is starting to pay off" is dated 30 Sept 2026 at [BCG press](https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value) (contents not read; a search summary says ~41% of firms are scaling and outperforming).
- Deloitte State of AI in the Enterprise 2026 (survey Aug-Sep 2025, 3,000+ senior leaders, 24 countries): only 25% have moved 40%+ of pilots into production; 84% have not redesigned roles/ways of working; insufficient worker skills named the biggest barrier. — [Deloitte US press](https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026); figures via summary of [Deloitte Global](https://www.deloitte.com/global/en/issues/ai/state-of-ai-in-enterprise.html)
- S&P Global Market Intelligence: 42% of companies abandoned most AI initiatives (up from 17% prior year); average firm scrapped 46% of proofs of concept before production; ~1,000+ respondents in North America/Europe. Caveat: base is the subset using AI/running POCs. — [CIO Dive](https://www.ciodive.com/news/ai-project-fail-data-spglobal/742590/)
- Gartner (June 2025): over 40% of agentic AI projects will be canceled by end of 2027 due to escalating costs, unclear business value or inadequate risk controls; "agent washing" - only ~130 of thousands of agentic vendors are real; Jan 2025 poll: 19% had made significant agentic investment. Note this is a prediction, not a measured outcome. — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- Stanford AI Index 2026 (April 2026): 88% of organizations report using AI in 2025; 70% use gen-AI in at least one function; agentic deployment still limited in most functions. (Secondary summaries; verify on primary.) — [Burges Salmon](https://www.burges-salmon.com/articles/102mpq6/ai-in-2026-what-does-stanfords-ai-index-tell-us/); [Stanford HAI Responsible AI chapter](https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai)
- Workday/Hanover Research "Beyond Productivity" (3,200 employees and leaders): ~37% of time saved by AI is lost to rework (correcting/rewriting low-quality AI output), about 4 of every 10 hours gained; only 14% consistently get net-positive outcomes; highly engaged users lose ~1.5 weeks/year to fixing AI output. HR Dive notes a wording correction (37% of time saved vs "nearly 40% of gains"). — [HR Dive](https://www.hrdive.com/news/ai-output-reduced-rework-low-quality-workday/810075/); [Quartz](https://qz.com/ai-mistakes-limit-time-savings-workday-finds)
- Microsoft 365 Copilot adoption signal: 15M paid seats (Jan 2026), 20M (Apr 2026), 30M (late Jul 2026); analyst estimate ~6.6% of 450M+ paid commercial seats, i.e. most seats still unpurchased 2+ years after launch. Mostly secondary reporting. — [No Jitter](https://www.nojitter.com/digital-workplace/microsoft-365-copilot-adoption-jumps-50-percent-over-prior-quarter); [UC Today](https://uctoday.com/microsoft-365-copilot-passes-30-million-paid-seats-as-cloud-and-ai-growth-power-record-quarter); [Neowin](https://www.neowin.net/news/microsoft-q2-2026-key-figures-include-copilot-windows-11-and-record-xbox-growth/)

### Inferences
- The "value gap" is widely documented but the headline 95%/42%/40% numbers have different definitions (no P&L impact vs abandoned vs forecast cancellation) and should not be added or compared directly.
- Rework (Workday) is a concrete, quantifiable mechanism by which nominal productivity gains evaporate, which supports demand for verification/quality tooling.

### Gaps
- No primary-page verification of Deloitte, Stanford AI Index or BCG 2026 figures in this pass.
- No dollar-denominated aggregate cost of failed pilots found from a reliable source.
- Did not locate Gartner's gen-AI POC abandonment (30% by end of 2025) figure or IBM CEO study in this pass.

## 2. Reliability, hallucination and trust/verification: documented incidents and costs

### Takeaway
Hallucination has produced real, named financial and reputational costs (refunds, reversals), and Workday data suggests persistent verification burden. Public incident counts are rising.

### Cited Findings
- Deloitte Australia partially refunded the final instalment of an A$440,000 (~US$290,000) government contract after a 237-page welfare-compliance report contained fabricated citations and a non-existent court quote; revised version disclosed Azure OpenAI use. — [Fortune](https://fortune.com/2025/10/07/deloitte-ai-australia-government-report-hallucinations-technology-290000-refund); [Fast Company](https://www.fastcompany.com/91417492/deloitte-ai-report-australian-government); [Storyboard18](https://www.storyboard18.com/amp/digital/deloitte-to-repay-australian-govt-over-flawed-440000-report-aided-by-ai-82083.htm)
- Klarna: in 2024 claimed its AI assistant did work of ~700 agents and handled two-thirds of chats; in May 2025 CEO said over-weighting cost reduced quality and the company is hiring human agents again (dual-track approach). — [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396); [Maginative](https://www.maginative.com/article/klarna-dials-back-its-ai-customer-service-strategy-now-its-hiring-humans-again/)
- Stanford AI Index 2026: documented AI incidents rose to 362 in 2025 from 233 in 2024; Foundation Model Transparency Index average fell from 58 to 40 (secondary summary; incident data limited). — [Burges Salmon](https://www.burges-salmon.com/articles/102mpq6/ai-in-2026-what-does-stanfords-ai-index-tell-us/)
- Workday: see section 1 (rework ~37% of time saved; 14% net-positive).

### Inferences
- Verification cost is a recurring tax on AI productivity; professional-services and customer-service are the most exposed visible cases.

### Gaps
- Air Canada chatbot ruling, legal-brief sanctions databases, and hallucination-rate benchmarks were not searched in this pass.
- No survey with a clean "% of enterprises that experienced a harmful hallucination" figure found.

## 3. Governance and oversight of AI agents

### Takeaway
Governance maturity is low relative to agent rollout, and this gap is the most clearly monetized: AI/agent security and governance startups raised large rounds in 2026.

### Cited Findings
- Gartner: only 13% of IT application leaders say they have appropriate governance structures for AI agents; only 15% are considering/piloting/deploying fully autonomous agents (Oct 2025 survey); forecast of ~150,000 agents at Fortune 500 firms by 2028 (secondary report). — [IDM](https://www.idm.net.au/node/15402); [IT Brief](https://itbrief.co.uk/story/survey-finds-slow-adoption-of-autonomous-ai-agents-in-enterprises)
- Gartner 2026 AI Leaders survey (via aggregator): 34% of organizations have well-defined AI governance. Low confidence, aggregator only. — [Software Strategies Blog](https://softwarestrategiesblog.com/category/ai-governance/)
- Funding of agent security/governance vendors (all from one search-result summary of aggregator/news pages; verify each on primary sources before use): Onyx Security $113M Series B, 30 Jul 2026 (total $153M; agent control plane); HiddenLayer $100M Series B, 2 Sep 2026; Rein Security $25M Series A, 8 Oct 2026 (total $35M); Obsidian Security $85M Series D, Aug 2026; Zenity reportedly $125M, Aug 2026 (headline only); Noma Security $132M growth round (Apr 2026); WitnessAI $58M Series B (Jan 2026); Surf AI $57M (Mar 2026). — [SecurityWeek Onyx topic](https://www.securityweek.com/topics/onyx-security/); [Rein/KuCoin flash](https://www.kucoin.com/news/flash/rein-security-completes-25m-series-a-funding-to-secure-enterprise-ai-agents); [Noma/Pulse](https://www.pulse.bot/ai/news/12-agentic-ai-startups-to-watch-in-2026-b9e1556f-8947-4c7c-80ab-1a88e62767e4); [Software Strategies roundup](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/); [Axios Pro Surf](https://axios.com/pro/enterprise-software-deals/2026/03/17/cybersecurity-surf-ai-agents-57m)
- Roundup headline claims "$3.6 Billion in Crunchbase funding, $96 Billion in M&A" across agentic AI security (title only; unverified). — [Software Strategies Blog](https://softwarestrategiesblog.com/2026/03/28/agentic-ai-security-startups-funding-mna-rsac-2026/)
- OutSystems research headline: 94% concerned about agent sprawl (headline only). — [Pulse](https://www.pulse.bot/ai/news/agentic-ai-goes-mainstream-in-the-enterprise-but-94-raise-concern-about-sprawl-outsystems-research-f-b8d0f8a4-c9cc-43fc-a2dd-dd1e19c5c583/)
- Stanford AI Index 2026: responsible-AI practice not keeping pace with capability; organizations formalizing RAI but face knowledge/budget gaps. — [Stanford HAI](https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai)

### Inferences
- Investor capital concentrating in agent security/control-plane vendors suggests buyers are paying (or expected to pay) for runtime oversight, not only model access.

### Gaps
- Round sizes/dates above need primary confirmation; no named enterprise customers or contract values found for these vendors.
- No procurement/budget-line survey data (e.g., % of AI budget on governance) found.

## 4. Evidence of spending: vendor revenue, funding, named customers

### Takeaway
Spending is real and growing at platform and application layers (Copilot, Agentforce, Glean, Sierra), but penetration remains modest relative to installed bases, and the strongest spending evidence is for vendor-supplied (not internally built) solutions.

### Cited Findings
- Salesforce Agentforce (Q3 FY2026, quarter ended 31 Oct 2025): ARR ~$540M, +330% YoY; Agentforce + Data 360 ~ $1.4B ARR; 18,500+ deals, 9,500+ paid. — [Constellation Research](https://www.constellationr.com/insights/news/salesforce-delivers-strong-q3-agentforce-data-360-surge); [Nojitter](https://www.nojitter.com/ai-automation/salesforce-highlights-agentforce-momentum). Newer FY2027 quarters not retrieved.
- Microsoft 365 Copilot paid seats 30M by late Jul 2026 (see section 1); list price $30/user/month implies roughly $7.2B annualized if all at list (third-party arithmetic, not Microsoft disclosure). — [UC Today](https://uctoday.com/microsoft-365-copilot-passes-30-million-paid-seats-as-cloud-and-ai-growth-power-record-quarter)
- Sierra (customer-service agents): $350M raise at $10B valuation, Sept 2025, led by Greenoaks (valuation up from $4.5B Oct 2024); says used by hundreds of companies, over half with >$1B revenue. — [TechCrunch](https://techcrunch.com/2025/09/04/bret-taylors-sierra-raises-350m-at-a-10b-valuation); [Bloomberg](https://www.bloomberg.com/news/articles/2025-09-04/bret-taylor-s-ai-startup-sierra-reaches-10-billion-valuation)
- Glean (enterprise search/assistant): reportedly $7.2B valuation (June 2025 Series F, ~$150M) and ~$300M ARR by May 2026; a $12B valuation claim is unconfirmed. Sources are aggregators. — [KuCoin flash](https://www.kucoin.com/news/flash/glean-hits-300m-arr-amid-ai-budget-cuts-valued-at-7-2b); [CallSphere](https://callsphere.ai/blog/td30-rp-glean-round-april-2026)
- Verification/workflow cost tie-in: MIT finds bought solutions about 2x as likely to succeed as internal builds. — [Fortune](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)

### Inferences
- Willingness to pay is strongest where outcomes are measurable (customer service resolution, search, seat-based copilots) and for security/governance; a reliability/verification layer as a standalone category is not directly evidenced here.

### Gaps
- No hallucination-detection/evals vendor funding (e.g., observability/eval startups) or revenue found in this pass.
- No SEC filing text read directly; no named-customer ROI case studies with dollar savings retrieved.
- Harvey and other vertical (legal) vendors were not found by the search.
