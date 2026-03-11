## Architecture Overview

This is the current system map for the software-first prototype.

It shows the full shape the repo is trying to support now:

- growing modules
- cooking and portioning
- dairy-first livestock module
- shared resource loops
- telemetry and audit
- distribution boundary points

It does not claim that all physical subsystems are equally mature. Some parts are implemented in software, some are simulated, and some are still design-stage.

```mermaid
flowchart LR
  subgraph Inputs[Inputs]
    A1[Recipes and URC documents]
    A2[Orders and user demand]
    A3[Inventory and supplier data]
  end

  subgraph Orchestration[Orchestration and Planning]
    B1[URC Interpreter]
    B2[Capability Registry]
    B3[Recipe and Cooking Services]
    B4[Growing Optimization]
    B5[Livestock Analytics]
    B6[Order and Inventory Coordination]
  end

  subgraph Production[Production Modules]
    C1[Growing Modules]
    C2[Cooking and Portioning]
    C3[Dairy-First Livestock Module]
  end

  subgraph SharedLoops[Shared Resource Loops]
    D1[Waste and Digestate Loop]
    D2[Ingredient and Product Inventory]
    D3[Cold-chain and delivery handoff]
  end

  subgraph Hardware[Hardware and Simulation]
    E1[Pod Control Plane]
    E2[Growing Hardware Abstraction]
    E3[Livestock physical systems\ncurrently less formalized]
    E4[Simulation-first sensor and actuator paths]
  end

  subgraph Infra[Telemetry, Audit, Validation]
    F1[Telemetry and Audit DB]
    F2[Analytics and KPI reporting]
    F3[Tests and CI]
    F4[Proof-status and validation docs]
  end

  A1 --> B1
  A2 --> B6
  A3 --> B6

  B1 <--> B2
  B1 --> B3
  B3 --> C2
  B4 --> C1
  B5 --> C3
  B6 <--> D2

  C1 --> D2
  C2 --> D2
  C3 --> D2

  C3 --> D1
  D1 --> C1

  D2 --> D3

  C1 <--> E2
  C2 <--> E1
  C3 <--> E3
  E1 <--> E4
  E2 <--> E4
  E3 <--> E4

  C1 --> F1
  C2 --> F1
  C3 --> F1
  E1 --> F1
  E2 --> F1
  E3 --> F1
  F1 --> F2
  F3 --> F4

  classDef services fill:#e7f0fb,stroke:#79a7d1;
  classDef hardware fill:#eef8f0,stroke:#7bbf8a;
  classDef loops fill:#fbf7e7,stroke:#c9ac58;
  class B1,B2,B3,B4,B5,B6 services;
  class E1,E2,E3,E4 hardware;
  class D1,D2,D3 loops;
```

## How To Read This

### What is implemented now

- backend APIs and models for recipes, cooking, growing, and livestock
- optimization and analytics services
- telemetry-oriented architecture direction
- simulation-first execution framing

### What is only partially parallel today

- growing modules have a more mature hardware-control path than livestock
- livestock now has an explicit abstraction and simulation layer, but physical drivers and external validation are still less mature than on the growing side
- distribution is represented as a boundary and integration point, not a full implementation inside this repo

### What this diagram is meant to prevent

- a README that sounds broader than the system map
- a dairy-first livestock story that sounds more mature than the current proof surface
- confusion about what belongs in this repo versus what lives at a boundary such as distribution

## Notes

- Use the companion `docs/architecture.svg` if you need a static export for presentations.
- If Mermaid does not render in your editor, open the file in VS Code Markdown preview.
- For the current proof vocabulary, see `docs/CURRENT_PROOF_STATUS.md`.
