## Architecture overview

This file embeds the Mermaid diagram for quick preview in editors that support Mermaid (VS Code Markdown preview, GitHub pages with Mermaid plugin, etc.).

```mermaid
flowchart LR
  subgraph Inputs[Inputs & Orders]
    A1[Customer & App UI]
    A2[Order store / URC repository]
    A3[Supplier / Inventory feed]
  end

  subgraph Orchestration[Orchestration & Planning]
    B1[URC Interpreter]\n<validate · plan · execute>
    B2[Capability Registry]
    B3[GrowthOptimizationEngine]\n<scheduling · routing>
    B4[Order & Inventory Service]
  end

  subgraph Pod[Pod / Hardware & Depot]
    C1[Pod Control Plane]\n(Actuators & Sensors)
    C2[Depot Ops]\n(Wash/CIP · Return Logistics)
  end

  subgraph Infra[Data & Infrastructure]
    D1[Telemetry & Audit DB]
    D2[Analytics / KPI Dashboard]
    D3[CI & Tests]\n(mock capability_registry.json)
  end

  A2 --> B1: "URC / recipe"
  B1 --> C1: "Execution plan / commands"
  C1 --> B1: "Telemetry / readings"
  B2 <--> B1: "validate & map actions"
  B3 <--> B4: "schedule & allocate"
  C2 --> B4: "returns & inventory updates"
  C1 --> D1 --> D2: "pod telemetry → analytics"

  classDef services fill:#e7f0fb,stroke:#79a7d1;
  classDef hardware fill:#eef8f0,stroke:#7bbf8a;
  class B1,B2,B3,B4 services;
  class C1,C2 hardware;

```

Notes
- Use the companion `docs/architecture.svg` for a ready-to-embed image in presentations.
- If your editor doesn't render Mermaid automatically, install a Mermaid preview extension or open this file in VS Code's Markdown preview (Ctrl+Shift+V).
