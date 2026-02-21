# Plausibility & Validation Plan (Software-First)

This repo is a software prototype of an ambitious “autonomous food system” concept. To keep the project credible, the goal is to make **clear, testable claims** and build an **evidence ladder** from simulation → pilot → scaled deployment.

## What This Prototype Can Claim (Today)

- The system defines **interfaces** for food production (growing), cooking automation, and distribution/consumption tracking.
- The backend can run **without hardware** and supports **simulation-first scaffolding** for sensors/actuators/robots.
- The project can be evaluated on software criteria: correctness, observability, safety logic structure, and testability.

## What This Prototype Cannot Claim (Yet)

These require real-world validation and should be treated as aspirational targets until backed by data:

- “100% uptime” or equivalent claims of perfect availability.
- “Zero waste / zero net loss” as a physical guarantee.
- Yield, energy, water, and quality performance claims at scale.
- Safety certification or real hazard containment.

## Core Plausibility Risks (and How to Address Them)

### 1) Uptime vs. Safety (Hard Tradeoff)
**Risk:** “Always on” conflicts with safe shutdowns, contamination events, or component degradation.

**Make it plausible by:**
- Defining uptime as a metric with a scope and exclusions (e.g., “service availability of API endpoints” vs “biological subsystem uptime”).
- Publishing an explicit safety model: safe states, emergency stop semantics, and recovery procedures.

### 2) Biological Variability (Plants Aren’t Deterministic)
**Risk:** Crop growth, pests/pathogens, and quality outcomes vary by genotype, environment, and handling.

**Make it plausible by:**
- Treating agronomy as a probabilistic control problem (ranges + confidence) rather than fixed “optimal” constants.
- Building simulation datasets that encode uncertainty and disturbances.

### 3) Energy Economics (Often the Biggest Real Constraint)
**Risk:** Indoor farming can be energy-dominated; “global scale” claims will be challenged on kWh/kg and capex/opex.

**Make it plausible by:**
- Adding explicit energy accounting to the model (lighting/HVAC/pumps) and tracking kWh/kg targets per crop.
- Publishing “energy envelope” assumptions per module type.

### 4) Closed-Loop Nutrients / “Zero Waste”
**Risk:** Closed loops leak: losses via cleaning, filtration, spoilage, packaging, contamination, and maintenance.

**Make it plausible by:**
- Replacing absolutes with measurable targets (e.g., “reduce waste by X% vs baseline”, “nutrient recovery rate Y%”).
- Modeling contamination events explicitly (what gets discarded and why).

### 5) Sensing & Actuation Reality Gap
**Risk:** Software that “works” in simulation can fail with noise, drift, latency, and actuator constraints.

**Make it plausible by:**
- Defining a sensor/actuator contract: sampling rates, noise distributions, calibration drift assumptions.
- Running “hardware-in-the-loop later” as a planned validation rung, not implied today.

### 6) Distribution & Demand Forecasting
**Risk:** Predicting consumption is messy; privacy, consent, and bias become central if using household data.

**Make it plausible by:**
- Treating demand prediction as opt-in, privacy-preserving, and auditable.
- Tracking error distributions and harm scenarios (under-delivery vs over-production).

## Evidence Ladder (What “Validated” Means)

### Level 0 — Code Correctness
- Deterministic tests for models/services/routes.
- Smoke tests proving the system runs end-to-end.

### Level 1 — Simulation Credibility
- Simulated sensor streams with noise/drift.
- Scenario tests: pump failure, HVAC failure, contamination event, power budget changes.
- Metrics: constraint violations, recovery time, waste estimate, energy estimate.

### Level 2 — Bench Model Calibration
- Match published ranges (literature/data) for growth rates, yields, and resource usage envelopes.
- Track deviations and justify assumptions.

### Level 3 — Small Pilot (Physical)
- Single module: real sensors, real crops, real failure events.
- Publish measured yield/water/energy and downtime causes.

### Level 4 — Multi-Module Pilot
- Shared scheduling, maintenance, and distribution logic.
- Demonstrate graceful degradation and safe fallback behaviors.

## Suggested Measurable Targets (Replace Absolutes)

Use targets that can be validated incrementally:

- Availability: “API availability ≥ 99.9%” (software), “module operational availability ≥ 95%” (hardware pilot).
- Waste: “reduce edible waste ≥ 50% vs baseline grocery flow” (measured).
- Nutrients: “nutrient solution recovery ≥ 90% under normal operation” (measured).
- Energy: “kWh/kg within published envelope for crop X under constraint set Y” (measured).

## How to Present This to a Skeptical Reader

- Lead with: “software prototype + evidence plan”.
- Keep visionary claims as “design goals”, and link them to measurable targets.
- Show a short list of current capabilities and next validation steps.

