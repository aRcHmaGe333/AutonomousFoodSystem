# Deprecated: New Bearings consolidated

This chat-derived working note has been consolidated into the approved book and modular reference docs.

Approved artifacts:

- `docs/NEW_BEARINGS_BOOK_FULL.md` — full generated book (stakeholder-ready snapshot)
- `docs/NEW_BEARINGS_BOOK.md` — shorter approved summary

Primary source modules (editable):

- `docs/packaging_guidance.md`
- `docs/vehicle_modularity.md`
- `docs/manhours_savings.md`

Original chat provenance: `not_public/NEW_BEARINGS_CHAT_ORIGIN.md` (archived)

To regenerate the full book from sources, run:

```bash
node tools/generate_book.js
```

# New Bearings: Delivery & Optimization — internal mapping

Purpose
-------
This document records a merge plan and approved cross-reference for the project's strategic directions (delivery, production, telemetry, and optimization). It maps possible delivery approaches and cross-cutting design principles to concrete artifacts in this repository (services, telemetry, simulators) and lists actionable integration steps.

Why this matters
-----------------
- This workspace explores multiple delivery and logistics approaches (gravity-based tubes as one candidate, electric or unmanned vehicles, micro-depots, conveyor/pneumatic options, or mixed-mode networks) and focuses on systems that reduce waste, lower human burden, and maximize resource efficiency.
- The repository contains prototypes and scaffolds (recipe models, hardware simulation, telemetry schema) that can be combined to evaluate different delivery/execution strategies and produce runnable simulations and a minimal execution stack.

Design principles & delivery options
-----------------------------------
This project should be delivery-mode neutral by design. The system must be able to evaluate and select the best approach for a given context. The following principles guide that evaluation and the architecture:

- Delivery-mode neutrality: treat gravity tubes as one possible conveyance. Provide abstractions (hardware/simulation interfaces, URC targets) so the same recipe and execution plans can run on vehicles, robots, conveyors, or tubes.

- Decision criteria for selecting delivery mode:
   - Infrastructure cost and buildability (capex/opex)
   - Urban density and routing constraints
   - Regulatory and safety considerations
   - Energy efficiency and emissions
   - Latency and user convenience needs

- Anti-waste and circularity:
   - Portion-accurate preparation and demand-driven production to minimize overproduction
   - Reusable container and packaging strategies to avoid single-use waste
   - Ingredient reuse and multi-use formulations where safe and feasible
   - Telemetry-driven forecasting and spoilage detection to reduce losses

- Free-time and human impact:
   - Automate repetitive, low-value steps and surface only decision points that matter to users
   - Optimize workflows to maximize user free-time while preserving choice

- Reusability / no-bulk logic:
   - Favor modular, small-batch distribution patterns vs. bulk shipments where it reduces waste and storage overhead
   - Design interfaces and containers for ease of cleaning, tracking, and reuse

- Optimization-first design:
   - Use multi-objective optimization (energy, cost, time, nutritional quality) across recipe → production → distribution
   - Allow runtime selection of delivery/execution mode based on current telemetry, cost targets, and user preferences

- Mixed-mode recommendation:
   - In most deployments a hybrid approach (vehicles + micro-depots + last-meter robots or tubes where available) will be optimal. The architecture should make it easy to plug in new conveyance modules and benchmark them.


Status: Draft (deprecated)

````markdown
# Deprecated: New Bearings consolidated

This chat-derived working note has been consolidated into the approved snapshot and modular reference docs.

Approved artifact (shareable snapshot):

- `docs/UNIFIED_DIRECTION_SNAPSHOT.md` — full stakeholder-ready snapshot (approved)

Primary source modules (editable):

- `docs/packaging_guidance.md`
- `docs/vehicle_modularity.md`
- `docs/manhours_savings.md`

Original chat provenance: `not_public/NEW_BEARINGS_CHAT_ORIGIN.md` (archived)

For editable sources, update the module files listed above. Ask a maintainer to refresh the approved snapshot when ready.
