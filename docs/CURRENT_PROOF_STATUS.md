# Current Proof Status

This file states what the repo can honestly claim today.

It exists to separate four different things that are often blurred together in ambitious technical projects:

- implemented
- simulated
- conceptual
- requires external validation

## Summary

This repository is a software-first prototype of an autonomous food system.

It already contains real code, real routes, real models, and real subsystem logic.
It does not yet prove equal physical maturity across all subsystems.

The current investor-safe and public-safe reading is:

- the software prototype is real
- the architecture direction is coherent
- the evidence ladder is explicit
- physical validation is still staged and incomplete

## Proof Matrix

| Area | Current status | Notes |
|---|---|---|
| Recipe management | implemented | Real backend model, routes, tests, and execution scaffolding exist. |
| Cooking coordination | implemented | Real software surface exists, but hardware execution remains simulation-first. |
| Growing module software | implemented | Models, routes, and optimization exist. |
| Growing physical control path | partially simulated | Hardware abstraction exists, but physical deployment proof is not established. |
| Livestock software | implemented | Model, service, routes, analytics, and tests exist. |
| Livestock subsystem abstraction and simulation | implemented plus simulated | Subsystem contracts, route access, throughput modeling, sanitation states, and dairy pipeline stages now exist at the software prototype level. |
| Livestock physical system | conceptual plus partial simulation direction | The dairy-first concept is defined and simulated, but physical drivers and validation are not yet at parity with growing. |
| Shared resource loops | partially implemented conceptually | Integration intent and simulated digestate feedback are present; full end-to-end operational flow is not yet proven. |
| Distribution | external boundary | PrecisionDelivery is a separate project; this repo hands off to that interface. |
| Telemetry and analytics | implemented in prototype form | Telemetry direction is real, but not yet production-grade end-to-end infrastructure. |
| Safety and certification | requires external validation | No current basis for claiming certified physical safety. |
| Livestock welfare and operational economics | requires external validation | These require domain experts and real-world pilot evidence. |

## What The Repo Can Claim Today

- It contains a working software prototype.
- It defines a coherent subsystem architecture for growing, cooking, and dairy-first livestock management.
- It supports simulation-first development.
- It contains an explicit plausibility and validation framework.

## What The Repo Cannot Claim Yet

- investor-grade proof of physical livestock viability
- validated dairy welfare outcomes at system scale
- validated uptime, zero-waste, or zero-intervention performance in real deployment
- full parity between growing and livestock physical prototyping maturity

## Current Position On Livestock

The current implementation should be described as dairy-first.

Why:

- the existing software logic is centered on milking, milk quality, lactation, herd health, and dairy inventory
- broader livestock-family language currently exceeds the implementation surface

Future expansion into beef, poultry, or mixed livestock systems is still compatible with the architecture. It is just not the right claim for the current proof surface.

## Validation Gates Still Ahead

## External Review Status

- the dairy-first external review packet exists and is ready to send as a standalone package
- the repo has already processed cited generic research and cited synthetic multi-discipline critique as internal pressure-testing input
- those materials have been used to tighten assumptions, reviewer questions, task queues, and claim boundaries
- no named dairy engineering, veterinary welfare, biosecurity, waste-handling, or farm-economics expert review has been completed yet
- therefore the livestock proof surface does not currently upgrade beyond externally unvalidated

### Internal gates

- keep the test suite clean as subsystem coverage expands
- normalize subsystem terminology across the canonical docs
- reduce duplicated strategic wording around proof status and ambition
- extend livestock simulation beyond nominal flow into failure-mode cases

### External gates

- dairy engineering review
- veterinary welfare review
- food safety and biosecurity review
- manure and digestion engineering review
- farm economics review

### Immediate validation surfaces

- [PILOT_ROADMAP_DAIRY_FIRST.md](PILOT_ROADMAP_DAIRY_FIRST.md): turns objections into pilot gates and evidence requirements
- [DAIRY_FIRST_CLAIM_BOUNDARIES.md](DAIRY_FIRST_CLAIM_BOUNDARIES.md): keeps outward wording inside the current proof surface

## Reader Guidance

If you are reading this repo as an investor, collaborator, or skeptic:

- treat the codebase as a serious prototype
- treat the physical system claims as staged, not finished
- use the plausibility and validation documents as the main constraint surface
- do not treat conceptual breadth as equal to validated subsystem breadth