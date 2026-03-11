# Dairy-First External Research Requirements

Status: Draft

## Purpose

This document defines the external research and expert-review requirements for a dairy-first livestock concept built around passive mechanical positioning, staged automation, sanitation control, waste-loop handling, and low-stress handling assumptions.

This is not a promotional document.
It is a validation requirements document.

## External Review Standard

The external review must be possible without access to any internal workspace, repository, codebase, or document tree.

The external package must stand on its own.

An external reviewer should be able to read the package, understand the concept, identify weak assumptions, and return decisive findings without needing any internal navigation or technical onboarding.

## What Requires External Research

The following areas require external subject-matter review before stronger real-world claims should be made:

- dairy-system physical engineering
- animal welfare and handling realism
- hygiene, sanitation, and biosecurity viability
- manure handling and digestion realism
- deployment economics and intervention-rate plausibility

## Review Goal

The goal is not blanket approval.

The goal is to determine:

1. Which parts are physically plausible as currently framed?
2. Which parts are directionally interesting but under-specified?
3. Which parts are likely wrong, unsafe, uneconomic, or misleading?
4. What evidence would be required to move from concept confidence to physical credibility?
5. Which outward-facing claims should be softened, removed, or deferred until evidence exists?

## Required Reviewer Types

### 1. Dairy Systems Engineer

Needed to review:

- passive-cradle milking geometry
- corridor throughput assumptions
- milking-cycle timing and actuator realism
- maintenance burden and component wear expectations
- likely physical failure points

Desired profile:

- experience with dairy parlors, automated milking systems, rotary or robotic milking environments, or dairy process equipment design

### 2. Veterinary Welfare Or Animal-Behavior Expert

Needed to review:

- low-stress handling assumptions
- voluntary entry and calm-indexing claims
- likely animal response to corridor narrowing, hoof indexing, misting, and cradle contact
- welfare-risk points that are being underestimated

Desired profile:

- dairy welfare, bovine behavior, herd-health operations, or applied livestock handling systems

### 3. Biosecurity And Food-Safety Specialist

Needed to review:

- zone-separation assumptions
- wash-loop and sanitation logic
- contamination risk across animal, milk, waste, and clean-control surfaces
- pathogen-control expectations
- whether the current framing unintentionally understates sanitation difficulty

Desired profile:

- dairy hygiene, food-safety systems, farm biosecurity, HACCP-adjacent livestock operations, or sanitary process design

### 4. Manure, Digestion, And Waste-Handling Engineer

Needed to review:

- digester assumptions
- slurry and scraping realism
- methane and digestate estimates
- fertilizer-loop plausibility toward controlled crop production
- likely process constraints that the current loop framing may simplify too aggressively

Desired profile:

- anaerobic digestion, manure systems, slurry processing, or agricultural waste engineering

### 5. Farm Economics Or Operations Expert

Needed to review:

- intervention-rate assumptions
- staffing and maintenance realism
- capex and opex implications of the proposed subsystem layout
- whether the concept becomes uneconomic before it becomes technically viable

Desired profile:

- dairy operations economics, agricultural systems cost modeling, or automation economics in livestock-heavy environments

## Required External Packet

Every reviewer should receive a self-contained packet containing:

- a one-page system summary
- a one-page proof-status summary stating what is implemented physically, what is simulated, what is conceptual, and what remains externally unvalidated
- one architecture diagram with short subsystem notes
- one dairy-first subsystem brief explaining corridor, cradle, pre-wash, sanitation, waste loop, and intended operating sequence
- one assumptions sheet listing the main physical, operational, welfare, sanitation, and economic assumptions currently being made
- one question sheet containing the discipline-specific questions relevant to that reviewer
- one response template so reviewers can return structured findings quickly

The packet must be readable without reference to any internal artifact.

## Optional Follow-Up Material

Only if a reviewer explicitly requests deeper inspection, additional technical material may be supplied, such as:

- more detailed diagrams
- simulation summaries
- process sequences
- selected technical notes

These are optional follow-up materials, not first-pass requirements.

## Questions Every Reviewer Should Be Asked

1. Which assumptions look physically or operationally credible?
2. Which assumptions are missing key constraints?
3. Which assumptions are likely to fail in practice?
4. Which risks are currently under-described?
5. What evidence would you require before stronger public or investment-facing claims are justified?

## Discipline-Specific Research Questions

### Dairy Engineering Questions

- Is passive positioning by corridor geometry and hoof indexing plausible enough to reduce sensing and actuation complexity materially?
- Which tolerances in udder positioning, lift alignment, and vacuum coupling are likely unrealistic as currently framed?
- Which components are most likely to dominate maintenance cost or failure rate?
- What prototype sequence would you require before calling this direction credible?

### Welfare And Animal-Behavior Questions

- How likely is voluntary entry under the proposed geometry and handling assumptions?
- Which elements are most likely to trigger avoidance, agitation, injury, or stress?
- Are the current lower-stress handling claims directionally reasonable, overstated, or underspecified?
- Which welfare metrics would have to be instrumented in a pilot?

### Biosecurity And Food-Safety Questions

- Is the clean-zone versus biological-zone separation described here practically meaningful?
- Where are the highest contamination risks in the corridor, pre-wash, cradle, and milk-handling flow?
- Which sanitation transitions or wash assumptions are currently too idealized?
- What minimum sanitation and verification instrumentation would a real pilot need?

### Digestion And Waste Questions

- Are the slurry, methane, digestate, and dispatch assumptions even directionally reasonable?
- Which physical constraints are missing from the current resource-loop framing?
- How realistic is it to connect digestate output meaningfully to controlled crop-production nutrient demand?
- Which measurements would be mandatory in a pilot before loop-efficiency claims are credible?

### Economics And Operations Questions

- What staffing, service, and maintenance model would you assume for a first pilot?
- Which assumptions around anomaly-driven intervention are most likely too optimistic?
- Where is the likely cost cliff in the concept?
- Under what conditions would this design be economically interesting enough to continue validating?

## Required Reviewer Output Format

Each reviewer should be asked to return findings in this structure:

1. Credible as stated
2. Credible only with major caveats
3. Not credible or not yet supportable
4. Missing information needed for judgment
5. Recommended pilot measurements
6. Public claims that should be avoided for now

Short bullet answers are acceptable.
What matters is decisiveness, not polish.

If the reviewer prefers a call instead of written notes, these same six headings should be used to structure the conversation and the notes captured afterward.

## Expected Outputs From The External Review Phase

The external-review phase should produce:

- a marked-up objection list by discipline
- a consolidated risk register
- a claim-restriction list for public and investor-facing language
- a pilot-measurement list
- a design-change queue

## Decision Rules After Review

Once findings come back:

- objections that invalidate a public claim must change the outward-facing material
- objections that reveal a model or simulation gap must become tracked design work
- disagreements among reviewers must be recorded explicitly rather than averaged into vague language
- unresolved high-risk objections must remain visible in the public proof-status framing

## Entities To Approach

Useful targets include:

- university dairy engineering or agricultural systems departments
- veterinary schools with dairy-welfare expertise
- agricultural extension programs
- dairy automation vendors or former engineering leads
- consultants in farm biosecurity, milk hygiene, or anaerobic digestion
- agricultural economists with dairy operations experience

Priority is not prestige.
Priority is direct operational or engineering relevance.

## What Not To Ask For

Do not ask whether the overall vision is inspiring.
Do not ask for generic innovation feedback.
Do not ask for blanket endorsement.

Ask where the concept breaks, what evidence is missing, and what would materially change the reviewer’s judgment.

## Immediate Next Step

Assemble the external packet and contact list.

The first success condition is not praise.
The first success condition is a hard, evidence-oriented critique that makes the concept more truthful and more robust.