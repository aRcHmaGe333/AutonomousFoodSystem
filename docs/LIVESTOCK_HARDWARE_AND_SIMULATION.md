# Livestock Hardware And Simulation

Status: Working subsystem-contract document

Purpose

- Define the livestock-side subsystem contract that was previously implied in the concept docs but not exposed in the software prototype.
- Make the current livestock prototype path legible: what is already represented in code, what is simulated, and what remains conceptual.

Current scope

- This document is dairy-first.
- It does not claim physical validation of the livestock subsystem stack.
- It defines the software-side abstraction and simulation surface needed to parallel the growing-side hardware abstraction role.

Subsystem contract

The livestock hardware abstraction currently defines six subsystem surfaces:

- Corridor: queue shaping, animal indexing, lane release, and bottleneck tracking.
- Cradle: passive alignment, lift profile, vacuum regulation, and pulsation controls.
- Pre-wash: beam-triggered cleaning, warm-water stimulation, and dosing controls.
- Sanitation: post-cycle rinse, wash, disinfect, and verification state transitions.
- Waste: scraping, digestate generation, methane output, and fertilizer dispatch targeting.
- Biosecurity: entry hygiene, quarantine occupancy, and zone isolation controls.

Simulation role

- The simulation layer is not a visual demo. It is a contract and state model.
- It currently tracks:
  - corridor queue depth and hourly capacity
  - bottleneck attribution
  - sanitation state transitions
  - quarantine occupancy and entry sanitation pass rate
  - manure, digestate, methane, and fertilizer-equivalent output
  - dairy pipeline stages from raw milk through downstream placeholders

What is implemented versus simulated versus conceptual

- Implemented:
  - livestock unit data model
  - milking-cycle recording
  - raw milk accumulation in the dairy pipeline
  - route-accessible hardware abstraction and simulation endpoints
- Simulated:
  - corridor throughput and queueing behavior
  - sanitation cycle transitions
  - digester and fertilizer-loop flow estimates
  - chilled milk buffer stage
- Conceptual:
  - cream separation
  - skim-milk routing
  - cultured-base downstream processing
  - real hardware drivers for corridor, wash, and cradle control

Biosecurity and sanitation validation status

- Implemented at the software-prototype level:
  - sanitation state transitions
  - quarantine occupancy tracking
  - entry sanitation pass-rate tracking
- Simulated:
  - how those states and counters move through the livestock subsystem contract
- Not yet physically validated:
  - contamination-control effectiveness
  - pathogen-reduction performance
  - clean-zone versus biological-zone separation under repeated real operation
  - verification instrumentation sufficiency for a real pilot

This means the current biosecurity and sanitation surface is useful for software contract definition and pilot planning, but it does not yet justify real-world efficacy claims.

Why this matters

- Before this layer existed, the repo had livestock concept coverage and livestock business objects, but not a clear prototype-parallel path.
- With this layer, the repo can show how livestock moves from concept spec toward a testable subsystem contract without pretending the physical side is already validated.

Next validation gates

- Replace fixed coefficients with expert-reviewed dairy engineering assumptions.
- Tie digestate dispatch to actual growing-module nutrient demand models.
- Add failure-mode simulation for sanitation interruption, sensor disagreement, and corridor blockage.
- Introduce a physical-driver interface once a real prototype control stack exists.