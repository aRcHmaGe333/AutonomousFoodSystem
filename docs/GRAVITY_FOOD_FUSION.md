# Fusion: Gravity Food Delivery System — internal mapping

Purpose
-------
This document records a merge plan and approved cross-reference for the Gravity Food Delivery System (GFDS) content in this workspace. It focuses on mapping the gravity-driven logistics concepts to concrete artifacts in this repository (services, telemetry, simulators) and listing actionable integration steps.


# Deprecated: moved to NEW_BEARINGS.md

This document has been superseded by `docs/NEW_BEARINGS.md`, which should be treated as the approved "new bearings" fusion document for this repository.

Important clarification: gravity-based delivery is presented in the historical notes as one possible logistics approach, not a required or exclusive solution. Delivering food and supplies can equally be achieved with electric or unmanned vehicles, micro-depots, pneumatic tubes, conveyor networks, or other conveyance methods depending on local constraints, cost, and regulatory considerations.

Key principles to preserve (regardless of delivery mode):

- Anti-waste: design for minimal spoilage, portion-accurate preparation, flexible menus that use variable inputs, and telemetry-driven demand forecasting to reduce overproduction.
- Free-time & human impact: maximize user free-time by optimizing preparation workflows, automating repetitive tasks, and designing interfaces that reduce cognitive load.
- Reusability & no-bulk logic: favor reusable containers, modular packaging, and low-bulk distribution patterns to reduce material waste and storage needs.
- Optimization-first design: prioritize multi-objective optimization (energy, time, cost, nutritional value) across the recipe→production→distribution pipeline so the system can choose the best delivery and execution mode per context.

For the current approved guidance, see `docs/NEW_BEARINGS.md`. Future task: merge key anti-waste and optimization sections from this note into `docs/NEW_BEARINGS.md` so the approved document explicitly calls out non-gravity delivery options and these cross-cutting design principles.

Provenance: this file is retained as a deprecated note for history. Use `docs/NEW_BEARINGS.md` as the single source of truth.


