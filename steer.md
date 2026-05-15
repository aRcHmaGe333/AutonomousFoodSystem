# Autonomous Food System Steer: Review & Roadmap

## Executive Review

**Current Status:** A high-ambition, multi-subsystem architecture that has successfully moved from "Vision" to "Modular Prototype." The repository is a rare example of a "software-first" approach to complex physical systems, with well-defined APIs for growing, cooking, and livestock.

**Strengths:**
- **System-of-Systems Thinking:** Excellent integration between growing (nutrients), livestock (waste/dairy), and cooking (processing).
- **Livestock Innovation:** The "Passive-Cradle" milking concept is a brilliant departure from high-cost 6-axis robotics, focusing on environmental geometry rather than active force.
- **Documentation Depth:** The `LIVESTOCK_MODULE_SPEC.md` and `PILOT_ROADMAP_DAIRY_FIRST.md` are professional-grade and ready for engineering review.

**Constructive Criticism & Priorities:**

1.  **Parity in Prototype Maturity:**
    The Growing modules have a clearer "GrowthOptimizationEngine," while the Livestock module is still largely "data-model heavy." 
    - *Action:* Mirror the logic-driven approach of the growing modules in the livestock subsystem (e.g., implement the actual "Corridor Flow" and "Welfare Scoring" algorithms instead of just their data structures).

2.  **The Persistence & Auth Wall:**
    Like many high-level prototypes, the project relies on in-memory storage. For an "Autonomous System" that claims "100% uptime," the software itself needs to survive a `Ctrl+C`.
    - *Action:* Execute the MongoDB migration (already in dependencies) and implement the JWT auth flow to protect the "Actuator Control" routes.

3.  **Livestock Hardware Abstraction (The "Digital Twin" Gap):**
    The growing modules have a better path toward hardware simulation. The livestock module needs a dedicated simulation layer that models "Animal Throughput" to test the `/api/livestock/milking/cycle` logic without real cows.
    - *Action:* Build a "Livestock Simulator" service that generates mock animal-flow data and sensor triggers.

4.  **Hardware Abstraction Layer (HAL) Formalization:**
    The `README.md` mentions a "simulation-first path," but there is no formal "HAL" directory or interface contract.
    - *Action:* Define the standard interface for `src/backend/services/HardwareIntegrationService.js` so physical drivers can be "plugged in" later.

---

## Roadmap: Sequence of Autonomy

1. **Sequence 1: Persistence & Parity:** Database migration and full Livestock logic implementation.
2. **Sequence 2: Digital Twin & Simulation:** Hardening the simulation for all three modules (Growing, Cooking, Livestock).
3. **Sequence 3: Hardware Interface & [HIRE/PARTNER] Recruitment:** Defining the HAL and prepping for physical pilot integration.

---

## Detailed Task Backlog

### [AFS-1] Core Software Hardening (Solo-Leverage)
*   - [ ] **AFS-1.1: MongoDB/Mongoose Migration:** Replace `Map` objects in `src/backend/models/` with Mongoose schemas for Recipes, Sessions, and Units.
*   - [ ] **AFS-1.2: Authentication Implementation:** Implement JWT auth flow for actuator-sim control routes; protect all `POST/PUT/DELETE` operations.
*   - [ ] **AFS-1.3: API Versioning (v1):** Prefix all routes with `/api/v1/` and update `app.js` to handle versioned routing.
*   - [ ] **AFS-1.4: Multi-Node Logging:** Enhance `winston` logging to support a "Global Audit Trail" that tracks events across Growing, Cooking, and Livestock.

### [AFS-2] Livestock Logic Alignment (Mirroring Growing)
*   - [ ] **AFS-2.1: Livestock Flow Algorithm:** Implement the `calculateThroughput()` and `detectBottleneck()` logic in `LivestockAnalyticsService.js`.
*   - [ ] **AFS-2.2: Welfare Scoring Engine:** Create a service that aggregates `sensorData` (cortisol, movement, yield) into a real-time `WelfareScore`.
*   - [ ] **AFS-2.3: Feed-to-Growing Integration:** Link the "Harvest" event in growing modules to automatically update the "Feed Inventory" in livestock units.
*   - [ ] **AFS-2.4: Anaerobic Digester Logic:** Implement the "Manure → Digestate → Fertilizer" mass-balance calculation for closed-loop validation.

### [AFS-3] Hardware Abstraction Layer (HAL)
*   - [ ] **AFS-3.1: HAL Interface Spec:** Create `src/backend/specs/HAL_CONTRACT.md` defining the required methods for any sensor/actuator driver.
*   - [ ] **AFS-3.2: Unified Simulation Engine:** Merge fragmented simulation logic into a single `SystemSimulationService.js` toggled via `.env`.
*   - [ ] **AFS-3.3: MQTT Connector Placeholder:** Add a service for ingesting MQTT telemetry from external (simulated) IoT sensors.

### [AFS-4] Presentation & Team Preparation
*   - [ ] **AFS-4.1: The "Digital Pilot" Brief:** Generate a simulation-backed report (PDF/Markdown) for investors showing predicted loop performance.
*   - [ ] **AFS-4.2: [HIRE/PARTNER] Researcher Outreach:** Contact 2-3 named researchers to review the `LIVESTOCK_MODULE_SPEC.md` and `PILOT_ROADMAP_DAIRY_FIRST.md`.
*   - [ ] **AFS-4.3: Visual Dashboard MVP:** Build a simple web-based dashboard (React or CLI) that aggregates the health of all three subsystems.

---

**Steer Summary:** The "software-first" strategy is working. To move to the next level, the livestock module must achieve "logic parity" with the growing modules, and the entire system must be "hardened" with real persistence.
