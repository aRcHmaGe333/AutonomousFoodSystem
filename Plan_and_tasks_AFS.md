# Plan and Tasks — Autonomous Food System

## Purpose

This document turns the current design assessment into a correction plan.

It is meant to do four things:

1. State the current reality clearly.
2. Record the main design and presentation discrepancies.
3. Decide what story the repo should tell right now.
4. Derive concrete tasks that make the repo more credible for investors and the public.

This is not a vision rewrite. It is a truth-surface and execution plan.

## Executive Conclusion

The repo is already strong enough to be inspectable and interesting, but it is not yet presentation-disciplined enough for serious outside review.

The central judgment is:

- The livestock module can mirror the growing module at the software prototype level.
- It cannot yet mirror it honestly at the physical validation level.
- The current public framing should be dairy-first, not generic livestock-first.
- The repo needs a tighter system map, a sharper proof-status surface, and better verification hygiene.

## Current Position

### What is already real

- The repo contains a real Node/Express prototype with models, services, routes, and tests.
- Growing, cooking, and livestock all exist as software surfaces.
- The repo already contains a plausibility discipline that correctly limits physical claims.
- The livestock path is not imaginary. It already has model, service, route, and test coverage.

### What is overstated or underaligned

- The architecture surface does not represent the full public story.
- The livestock module is described too broadly relative to its implemented scope.
- The test surface is not symmetrical enough to support the public framing cleanly.
- The prototype is still simulation-first, but some docs sound closer to validated physical engineering than the repo currently proves.

## Discrepancy Log

### 1. Public Story is Broader Than the System Map

Problem:

- [README.md](README.md) presents growing, cooking, livestock, and waste loops as core system components.
- [docs/architecture.md](docs/architecture.md) mainly depicts URC, capability registry, growth optimization, pod control, and telemetry.

Why it matters:

- Investors and technical readers use the architecture diagram as the truth anchor.
- If the map is narrower than the narrative, the repo looks less coherent than it is.

Required correction:

- Expand the architecture surface so it visibly includes growing, livestock, cooking, waste/resource loops, and distribution boundaries.

### 2. Livestock is Described as Generic, But the Prototype is Dairy-First

Problem:

- [docs/LIVESTOCK_MODULE_SPEC.md](docs/LIVESTOCK_MODULE_SPEC.md) frames the module as industrial-scale dairy and meat production and lists `dairy`, `beef`, `poultry`, and `mixed` types.
- The actual implementation centers on milking cycles, lactation, milk quality, raw milk output, and dairy-oriented metrics.

Why it matters:

- Generic livestock claims imply a broader prototype than currently exists.
- That creates avoidable skepticism.

Required correction:

- Reframe the present implementation as a dairy-first livestock module.
- Keep beef/poultry/mixed as future expansion paths unless corresponding logic, workflows, and proof surfaces exist.

### 3. Software Mirroring Exists, Physical Mirroring Does Not

Problem:

- Growing already has optimization and hardware-control abstraction surfaces.
- Livestock has strong business-logic and analytics surfaces, but no equally explicit hardware abstraction for corridor control, cradle actuation, wash systems, sanitation, and biosecurity.

Why it matters:

- The repo can claim software-pattern mirroring.
- It cannot honestly claim equivalent physical prototyping maturity.

Required correction:

- State this split explicitly.
- Build livestock simulation and hardware-abstraction artifacts if the repo wants to present parallel prototyping maturity.

### 4. The Plausibility Discipline is Better Than Some of the Module Framing

Problem:

- [docs/PLAUSIBILITY_AND_VALIDATION.md](docs/PLAUSIBILITY_AND_VALIDATION.md) correctly limits current claims and establishes an evidence ladder.
- Some module framing still reads closer to asserted engineering reality than simulation-first design.

Why it matters:

- The plausibility doc builds trust.
- Any stronger unsupported wording elsewhere erodes that trust.

Required correction:

- Align module documents with the same evidence ladder language.
- Distinguish clearly between implemented, simulated, conceptual, and externally validated surfaces.

### 5. Verification is Real But Not Yet Investor-Clean

Problem:

- The prototype test suite mostly passes, but one URC interpreter test currently fails.
- Jest also reports open handles after test completion.
- The current test inventory is asymmetric: livestock has dedicated unit coverage, while growing does not currently have a matching unit-test artifact in the unit test folder.

Why it matters:

- Public technical credibility depends on self-verification.
- A failing test and uneven subsystem verification weaken confidence quickly.

Required correction:

- Fix the failing URC test.
- Resolve open-handle noise.
- Add missing growing-side unit coverage.

## Decisive Positioning Decisions

These are the decisions this repo should adopt now.

1. Present the project as a software-first autonomous food system prototype with an explicit evidence ladder.
2. Present livestock as dairy-first in the current implementation.
3. Treat broader livestock-family support as planned expansion, not present capability.
4. Use one consistent public proof vocabulary:
	- implemented
	- simulated
	- conceptual
	- requires external validation
5. Use the architecture view as a literal truth surface, not a partial sketch.

## External Researchers

### Not required yet

External researchers are not required to improve:

- repo presentability
- documentation coherence
- architecture clarity
- task planning
- public proof framing
- internal discrepancy cleanup

### Required before strong livestock investment claims

External subject-matter input is required before the livestock concept should be presented as physically validated beyond software-prototype scope.

Minimum expert set:

- dairy systems or milking-systems engineer
- veterinarian or animal-welfare scientist with dairy operations experience
- biosecurity and food-safety/regulatory specialist
- anaerobic digestion and manure-handling engineer
- farm operations economist focused on capex, opex, intervention rates, and staffing realism

Operational rule:

- Do not present the livestock subsystem as physically investor-ready without that expert pass.

## Primary Objective

Make the repo convincingly inspectable by two audiences at once:

- investors looking for disciplined scope, coherent architecture, and credible staging
- public readers looking for clarity, honesty, and understandable system intent

## Remediation Plan

## Phase 1 — Correct the Truth Surface

Goal:

- Remove avoidable credibility gaps without changing the project’s ambition.

Tasks:

- [x] Rewrite [docs/architecture.md](docs/architecture.md) so the system map reflects growing, livestock, cooking, waste/resource loops, orchestration, telemetry, and distribution boundary points.
- [x] Update [README.md](README.md) so its presentation language matches the evidence ladder and current implementation boundaries.
- [x] Reframe [docs/LIVESTOCK_MODULE_SPEC.md](docs/LIVESTOCK_MODULE_SPEC.md) as dairy-first for the current prototype, with explicit future-expansion boundaries for beef, poultry, and mixed systems.
- [x] Add one concise proof-status document under `docs/` that states what is implemented, what is simulated, what is conceptual, and what requires external validation.
- [x] Align [docs/STATUS.md](docs/STATUS.md) with the same proof vocabulary so the status surface is not misleadingly sparse.

Completion standard:

- A skeptical reader can move from README to architecture to subsystem docs without encountering a scope contradiction.

## Phase 2 — Fix Verification Credibility

Goal:

- Make the prototype self-verification surface clean enough for public inspection.

Tasks:

- [x] Fix the failing `tests/unit/URCInterpreter.test.js` validation case.
- [x] Resolve the Jest open-handle warning so `npm test` exits cleanly.
- [x] Add a dedicated growing model unit test file parallel to [tests/unit/LivestockUnit.test.js](tests/unit/LivestockUnit.test.js).
- [x] Add route-level integration tests for growing and livestock endpoints that reflect current documented capabilities.
- [x] Set and enforce initial Jest coverage thresholds after the new test floor is in place.

Completion standard:

- `npm test` passes cleanly.
- Growing and livestock both have visible unit and route verification surfaces.

## Phase 3 — Build the Missing Livestock Parallelism Honestly

Goal:

- Close the gap between “software mirror” and “prototype mirror” without pretending it is already closed.

Tasks:

- [x] Define a livestock hardware abstraction layer for corridor, cradle, pre-wash, sanitation, waste, and biosecurity subsystems.
- [x] Build a livestock simulation layer analogous in role to growing-side hardware simulation.
- [x] Model corridor throughput, queueing, and bottleneck behavior for dairy operations.
- [x] Model sanitation and wash-loop state transitions, not just business metrics.
- [x] Model digester output and growing-module fertilizer feedback as an actual data path, not only a stated integration point.
- [x] Create an explicit dairy product pipeline beyond `raw_milk`, including separation or downstream processing placeholders with status labels.

Completion standard:

- The repo can show a real livestock prototype path with simulation and subsystem contracts, not only a concept spec plus data model.

## Phase 4 — Prepare the Public and Investor Reading Experience

Goal:

- Make the repo easier to ingest without softening the technical seriousness.

Tasks:

- [x] Add a one-page “read this first” public summary for non-technical readers.
- [x] Add a one-page investor/technical diligence summary focused on current proof status, system boundaries, and next validation gates.
- [x] Normalize terminology across core docs so the same subsystem is not described three different ways.
- [x] Add a simple document map showing which docs are canonical, which are working notes, and which are archival or exploratory.
- [x] Reduce duplicated or near-duplicated strategic language where it obscures the canonical message.

Completion standard:

- A new reader can determine the repo’s current state, ambition, and evidence level within a few minutes.

## Phase 5 — External Validation Gate for Livestock Claims

Goal:

- Separate internal design confidence from externally supported physical credibility.

Tasks:

- [x] Prepare a dairy-first expert review brief with the current architecture, operating assumptions, and validation questions.
- [x] Build an internal reviewer-target pipeline so outreach starts from named, discipline-fit targets instead of generic search.
- [x] Prepare short outreach message templates for email, DM, follow-up, and call framing.
- [x] Add a send log so outbound review requests and normalization status stay explicit.
- [ ] Request review from dairy engineering, veterinary welfare, biosecurity, waste/digestion, and farm economics experts.
- [ ] Record expert objections and convert them into tracked design changes or explicit risk acceptances.
- [x] Add quantitative corridor, hoof-indexing, teat-alignment, cradle-pressure, and pinch-point constraints to the dairy review packet.
- [x] Add reward-feed, training, refusal-rate, and welfare-threshold assumptions to the outward livestock review material.
- [x] Add sanitation chemistry, contact-time, rinse, ATP or CFU verification, and contamination-transfer measurement expectations to the packet.
- [x] Add waste-loop mass-balance, methane-yield, pathogen-reduction, and nutrient-polishing assumptions to the packet and design notes.
- [x] Add pilot-envelope assumptions for anomaly rate, maintenance hours, staffing, throughput, and opex per liter.
- [x] Add a dairy-first pilot roadmap that converts objections into measurement gates and stop or redesign criteria.
- [x] Add a claim-boundary guide so outward wording stays inside the current proof surface.
- [ ] Add an external-validation section to the public proof-status document once reviews exist.

Completion standard:

- Livestock claims that remain in public docs have either internal prototype support or named external validation intent.

## Priority Sequence

Do these in this order:

1. Truth-surface correction
2. Verification cleanup
3. Livestock parallelism artifacts
4. Public/investor reading experience
5. External livestock review gate

## Immediate Next Actions

These are the next concrete actions to execute now.

- [x] Rewrite [docs/architecture.md](docs/architecture.md).
- [x] Add `docs/CURRENT_PROOF_STATUS.md` with the implemented/simulated/conceptual/external-validation matrix.
- [x] Update [README.md](README.md) to match that proof-status surface.
- [x] Reframe [docs/LIVESTOCK_MODULE_SPEC.md](docs/LIVESTOCK_MODULE_SPEC.md) to dairy-first scope.
- [x] Fix URC interpreter validation failure.
- [x] Add [tests/unit/GrowingModule.test.js](tests/unit/GrowingModule.test.js).
- [x] Add a livestock-side hardware abstraction and simulation surface with route access.
- [x] Add a dairy-first external review brief that defines the expert disciplines, research questions, and expected outputs.

## Non-Negotiable Messaging Rules

These rules should govern future edits:

- Do not present conceptual livestock breadth as implemented subsystem breadth.
- Do not claim physical validation when the current surface is software-first or simulated.
- Do not let the architecture diagram lag behind the README.
- Do not describe the repo as “ready” without a proof-status qualifier.
- Do not collapse implemented, simulated, and aspirational claims into one bucket.

## Final Standard

This repo becomes presentable when it is clearly ambitious, clearly bounded, and clearly honest.

The goal is not to sound smaller.

The goal is to sound true, organized, and under control.
