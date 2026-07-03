# CS Train-the-Trainer — Activity Quality Audit
### Five priority tracks · 41 activities · full validation pass

**Why this audit.** The Customer Services team will run a **Train-the-Trainer** program. Trainers teach *from* these activities, so every one must survive being handed to a learner cold: concrete steps, a checkable deliverable, and genuine day-job utility. The bar: **no fill-in, hollow activities.**

**Scope.** All activities in the five CS-priority tracks: Process Automation (8), Presentation & Communication (9), Customer Intelligence (8), Research & Strategy (8), Data Analysis & Insights (8).

---

## What the audit found

| # | Defect | Prevalence | Why it matters for Train-the-Trainer |
|---|---|---|---|
| 1 | **Hollow instructions** — `detailedInstructions` merely restated the one-line description | 38 / 41 | A trainer can't teach from a restated sentence; learners stall at "then what?" |
| 2 | **No verification steps** — every activity trusted AI output blindly | 41 / 41 | Worst possible habit to institutionalize: hallucinated quotes, wrong counts, fake citations go unchallenged |
| 3 | **Unassessable deliverables** — "The script.", "The SOW.", "Working URL." | ~30 / 41 | Trainers need success criteria to assess completion quality |
| 4 | **Inconsistent data-privacy guardrails** — "anonymized" mentioned sporadically | ~25 / 41 | CS handles customer data daily; guardrails must be in the activity, not assumed |
| 5 | **Low-utility artifacts** — outputs nobody uses at work | 4 / 41 | "Animated flowchart" is demo candy; activities must anchor to real work |
| 6 | **One-shot bias** — no iteration, no human testing | ~35 / 41 | Real AI skill is the loop: draft → verify → test on a human → refine |

## What changed — systematically, in every rewritten activity

1. **Numbered steps (4–6)** with concrete inputs and decision points — teachable as-is.
2. **An explicit verification step** wherever AI produces facts, counts, quotes, citations, formulas, or classifications (e.g., hand-label 10 items before AI does; check quotes exist verbatim; re-run cohort math yourself; verify competitor claims against primary sources).
3. **A standard privacy guardrail** — "anonymize first: strip names, emails, account IDs" — in every activity touching customer data.
4. **Assessable deliverables** — each names the artifact *and* its success criterion (e.g., "an SOP a colleague followed without asking you a single question").
5. **Human-in-the-loop tests** — colleague walk-throughs, role-plays, live pilots — so outputs prove themselves.
6. **Real-work anchoring** — every activity starts from a task the learner already owns.

## Per-activity verdicts

**Legend:** KEEP+ = sound concept, instructions deepened · REBUILT = same slot, new concept/title · All IDs and counts preserved (108 total).

### Process Automation
| ID | Activity | Verdict | Key fix |
|---|---|---|---|
| PA-001 | ~~Process Flow Animation~~ → **Map It Before You Automate** | **REBUILT** | Animated flowchart = demo candy. Now: map a real process, score steps, rank automation candidates by time saved |
| PA-002 | Decision Tree | KEEP+ | Validate the tree against 5 real past cases; list human-judgement exceptions |
| PA-003 | SOP Generator | KEEP+ | AI interviews you for gaps; colleague must follow it unaided |
| PA-004 | Onboarding Checklist | KEEP+ | Pressure-tested by the newest joiner |
| PA-005 | Workflow Optimizer | KEEP+ | Forced minutes-saved estimates + an actual one-week pilot |
| PA-006 | Email Triage Rules | KEEP+ | Measured agreement rate against 20 real messages |
| PA-007 | AI Co-Worker SOP | KEEP+ | Added "what AI gets wrong here" section; teammate replication test |
| PA-008 | Form Auto-Filler | KEEP+ | Measured time-saved across 3 real uses |

### Presentation & Communication
| ID | Activity | Verdict | Key fix |
|---|---|---|---|
| PR-001 | Strategy Deck | KEEP+ | Titles must state takeaways; fact-check vs. brief |
| PR-002 | Pitch in 60 Seconds | KEEP+ | Record-listen-cut loop, 3 rounds minimum |
| PR-003 | Executive Summary | KEEP+ | Claim-by-claim source verification; "what was cut?" check |
| PR-004 | Video Script | KEEP+ | Technical correctness check; timed read-aloud |
| PR-005 | Q&A Prep | KEEP+ | Three question tiers incl. hostile; rehearse the 5 hardest aloud |
| PR-006 | Stakeholder Map | KEEP+ | Named derailment-risk engagement plan |
| PR-007 | Talking Points Generator | KEEP+ | Proof attached to every point; deliver from memory |
| PR-008 | Demo Script | KEEP+ | Failure contingency per risky step; mandatory dry-run |
| PR-009 | ~~Visual Metaphor Lab~~ → **Explain It Simply** | **REBUILT** | Vague "sketch it" → tested explanation a novice replays back correctly |

### Customer Intelligence
| ID | Activity | Verdict | Key fix |
|---|---|---|---|
| CI-001 | Persona Builder | KEEP+ | Evidence rule: every trait traces to real material; "serve differently" section |
| CI-002 | Sentiment Scanner | KEEP+ | Hand-label 10 items *first* — calibration before trust |
| CI-003 | Journey Mapper | KEEP+ | Evidence-grounded stages; frequency × severity scoring; one owner-ready fix |
| CI-004 | Objection Handler | KEEP+ | CS framing (escalations, churn threats); role-play battle-testing |
| CI-005 | Win/Loss Analyzer | KEEP+ | Case counts per pattern; disconfirming analysis |
| CI-006 | NPS Narrative | KEEP+ | Verbatim quote verification — AI invents quotes if you let it |
| CI-007 | Churn Autopsy | KEEP+ | Prevention play tested against a live at-risk account |
| CI-008 | Voice of Customer Digest | KEEP+ | The reusable prompt IS the deliverable — 10-minute weekly repeatability |

### Research & Strategy
| ID | Activity | Verdict | Key fix |
|---|---|---|---|
| RS-001 | Sparring Session | KEEP+ | Specific skeptic persona; hardest objection goes in the one-pager |
| RS-002 | Competitive Landscape | KEEP+ | Verify 5+ claims vs. primary sources; mark the rest ASSUMPTION |
| RS-003 | ~~SWOT Generator~~ → **Evidence-Based SWOT** | **REBUILT** | The classic hollow template. Now: every bullet needs evidence or dies; ends in 3 owned decisions |
| RS-004 | Trend Spotter | KEEP+ | 2 real sources per trend or the trend is killed |
| RS-005 | Business Case Builder | KEEP+ | Labeled estimates with ranges; half-benefits sensitivity test |
| RS-006 | ~~5-Year Vision Sketch~~ → **Three Futures** | **REBUILT** | One fluffy utopia → 3 scenarios with 18-month signposts + no-regrets moves |
| RS-007 | Hypothesis Tree | KEEP+ | Actually run the cheapest test, not just design it |
| RS-008 | Red Team Critique | KEEP+ | Fix / accept / rebut log per attack — decisions, not vibes |

### Data Analysis & Insights
| ID | Activity | Verdict | Key fix |
|---|---|---|---|
| DA-001 | Make the Data Real | KEEP+ | Reframed as trainer asset: safe practice dataset with planted edge cases |
| DA-002 | Data Detective | KEEP+ | Manually verify the top 2 findings — AI miscounts |
| DA-003 | Chart from Chaos | KEEP+ | "Which chart misleads?" critique; 12-word insight captions |
| DA-004 | Formula Wizard | KEEP+ | Test every formula against known-good rows |
| DA-005 | Dashboard Builder | KEEP+ | 3 named questions; 30-second colleague validation |
| DA-006 | Survey Analyzer | KEEP+ | 10-answer spot-check of AI's theme assignments |
| DA-007 | KPI Storyteller | KEEP+ | Line-by-line number fact-check; 90-second spoken length |
| DA-008 | Cohort Carver | KEEP+ | Verify cohort math; name the decision it changes |

---

## Validation method

- **Data integrity**: parsed programmatically — 108 activities total (unchanged), per-track counts unchanged, all IDs unique and preserved, all required fields present, valid difficulty values.
- **Render check**: verified in the running app (activities catalog) — numbered instructions, deliverables, skills, and tags all display correctly in the expanded detail view.
- **Compatibility**: no schema changes, no app-code changes — data file only. Saved plans referencing these IDs continue to work (they pick up the improved content automatically).

## Not in scope (flagged for a future pass)

The other seven tracks (Prompt Engineering, Content Generation, Visual Creation, Application Building, Creative & Storytelling, Learning & Training Design, Code & Technical) have the same defect pattern and would benefit from the same treatment — recommended before any program that draws heavily on them.
