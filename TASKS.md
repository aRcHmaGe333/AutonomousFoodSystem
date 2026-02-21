# Autonomous Food System - Development Tasks

## Pre-Publication Blockers

These must be resolved before the repo goes public on GitHub.

### Repository Setup

- [ ] **Initialize git repo and push to GitHub** - Create initial commit and push.
- [ ] **Fix `package.json` repository URL** - Update to the actual GitHub repository URL for this project.
- [x] **Add a `LICENSE` file** - APC-VF v2.0 license added with cryptographic timestamp workflow.
- [x] **Configure `.gitignore`** - Done.

### Documentation Polish

- [ ] **Ensure `.env.example` comments clearly state placeholders must be replaced** - Make the warning more prominent (e.g., a comment block at the top).

---

## High Priority - Core Functionality

### Database Persistence

- [ ] **Replace in-memory storage with a real database** - All data (recipes, cooking sessions, growing modules, consumption profiles) is stored in JavaScript `Map` objects and lost on restart. Integrate MongoDB (already in dependencies) or PostgreSQL.
- [ ] **Add database migration/seed scripts** - Create scripts under `scripts/` for initial schema setup and sample data seeding.
- [ ] **Add data validation at the persistence layer** - The Joi validation is at the API layer only; add schema-level constraints in the database.

### Authentication & Authorization

- [ ] **Implement user authentication** - `bcryptjs` and `jsonwebtoken` are in dependencies but unused. Add registration, login, and JWT-based session management.
- [ ] **Add role-based access control** - Define roles (admin, operator, viewer) and protect routes accordingly.
- [ ] **Secure API endpoints** - Currently all endpoints are unauthenticated. At minimum, protect write operations.

### Test Coverage

- [ ] **Add tests for GrowingModule model** - Only Recipe has unit tests. Add equivalent coverage for GrowingModule, ConsumptionProfile, and services.
- [ ] **Add integration/API tests** - Use `supertest` (already in devDependencies) to test route handlers end-to-end.
- [ ] **Add tests for Python modules** - The `autonomous_food_system/` Python package has no tests. Add pytest-based tests for self_healing and monitoring.
- [ ] **Enable and configure coverage thresholds** - Currently commented out in `jest.config.js`. Set a baseline (e.g., 60%) and increase over time.
- [ ] **Set up CI/CD pipeline** - Add GitHub Actions workflow for lint, test, and build on push/PR.

---

## Medium Priority - Feature Extensions

### Livestock Module (NEW)

Core infrastructure is in place (model, service, routes, tests, spec). The following tasks extend and harden it:

- [ ] **Add database persistence for livestock data** — Currently uses in-memory Map storage like all other modules. Migrate to the chosen database alongside the rest of the system.
- [ ] **Build Digital Twin simulation layer** — Implement a corridor/milking physics simulation mode (parallel to HardwareIntegrationService's sensor simulation) so the livestock system can be tested without physical hardware.
- [ ] **Implement feed-crop integration** — Connect growing module harvest data (silage crops, hay, grain) to livestock unit feed resource tracking. When growing modules harvest feed crops, auto-update livestock feed reserves.
- [ ] **Build anaerobic digester → growing module fertilizer loop** — Implement the waste-to-fertilizer data pipeline: digestate output from livestock units feeds back as nutrient input for growing modules.
- [ ] **Add dairy product processing pipeline** — Extend beyond raw milk: model separation (cream, skim), pasteurization, and cheese/yoghurt production stages. Connect to the cooking system's ingredient inventory.
- [ ] **Implement RFID-based individual animal tracking** — The model has `rfidTag` fields but no route/service logic for RFID scan events. Add endpoints for scan-in/scan-out at corridor entry, milking station, and health checkpoints.
- [ ] **Add corridor flow simulation** — Model animal throughput through the narrowing corridor: queue times, flow rates, and bottleneck detection. Use crowd-flow algorithms adapted for bovine gait.
- [ ] **Implement modular component swap tracking** — The model tracks component lifespans but has no workflow for scheduling and recording module swaps (e.g., worn corridor walls, milking cradle replacement).
- [ ] **Add cold-chain integration for distribution** — Dairy products require temperature-controlled distribution. Extend the distribution system to handle cold-chain constraints for livestock-sourced products.
- [ ] **Build stress/welfare scoring algorithm** — Go beyond simple cortisol thresholds: aggregate multiple indicators (movement patterns, feeding frequency, milk yield trends, health events) into a composite welfare score per animal.
- [ ] **Add veterinary event management** — Track vaccinations, treatments, quarantine periods, and veterinary visit scheduling. Integrate with health alerting.

### Growing System Enhancements

- [ ] **Implement growing module API routes** - The `GrowingModule` model and `GrowthOptimizationEngine` service exist but have no HTTP route handlers exposing them.
- [ ] **Add crop variety database** - Currently hardcoded in `GrowthOptimizationEngine` (lettuce, tomato, herbs, spinach). Extract into a configurable crop database with growth parameters, nutritional profiles, and optimal conditions.
- [ ] **Implement growth stage tracking** - The model has a `growthStage` field but no state machine to advance it (seedling -> vegetative -> flowering -> fruiting -> harvest-ready).
- [ ] **Add harvest-to-inventory pipeline** - When a growing cycle completes harvest, automatically update an ingredient inventory that the cooking system can query.

### Distribution System Enhancements

- [ ] **Implement distribution API routes** - `PrecisionDistributionService` and `ConsumptionProfile` exist but have no HTTP endpoints.
- [ ] **Build real user consultation mechanism** - `consultUser()` currently auto-approves simulated responses. Implement a notification/approval flow (could be WebSocket-based or polling).
- [ ] **Add household/group consumption** - The `householdId` field exists but group-level aggregation and shared-meal scheduling is not implemented.

### Cooking System Improvements

- [ ] **Connect cooking sessions to actual recipe data** - The `/api/cooking/start` handler creates a hardcoded mock recipe instead of fetching from the recipe store.
- [ ] **Add recipe-to-growing-system integration** - When a cooking session starts, check ingredient availability against the growing module inventory.
- [ ] **Implement real automation control hooks** - `processAutomation()` is a placeholder. Design the interface for actual actuator control (even if backed by simulation).

### Cross-System Integration

- [ ] **Build the system-wide dashboard API** - Aggregate metrics from growing, cooking, and distribution into a single status endpoint.
- [ ] **Implement event bus / message queue** - Currently systems communicate via direct method calls. Add an event-driven architecture (e.g., EventEmitter-based, or Redis pub/sub) so growing harvest events automatically trigger distribution schedule updates and cooking inventory refreshes.

---

## Lower Priority - Platform & Infrastructure

### Frontend

- [ ] **Build a web-based monitoring dashboard** - Real-time view of growing module status, active cooking sessions, distribution schedules, and system health.
- [ ] **Add recipe management UI** - CRUD interface for recipes with ingredient search, scaling controls, and automation assessment visualization.
- [ ] **Add growing module control panel** - Environmental parameter adjustment, growth cycle monitoring, and harvest scheduling interface.

### Hardware Abstraction

- [ ] **Define a formal hardware abstraction layer (HAL) interface** - Document the contract that physical sensor/actuator/robot drivers must implement to plug into `HardwareIntegrationService`.
- [ ] **Add MQTT or similar IoT protocol support** - Enable real sensor devices to push readings via standard IoT protocols rather than requiring direct API calls.
- [ ] **Implement hardware health monitoring** - Track sensor drift, calibration age, and actuator response times. Alert when hardware needs maintenance.

### AI/ML Integration

- [ ] **Replace placeholder optimization methods** - `Recipe.optimizeNutrition()`, `optimizeCost()`, `optimizeTime()`, and `optimizeWaste()` all just log a message. Implement actual optimization logic (even rule-based).
- [ ] **Add real demand forecasting** - `ConsumptionProfile.predictDemand()` uses a simple moving average. Integrate a time-series model (e.g., Prophet, ARIMA, or a lightweight neural net).
- [ ] **Implement computer vision quality assessment** - Add an interface for image-based crop health and food quality evaluation (initially as a stub for future ML model integration).
- [ ] **Connect `GrowthOptimizationEngine.updateAlgorithms()` to real learning** - Currently just logs. Build a feedback loop where actual harvest results improve future optimization recommendations.

### Python Module Expansion

- [ ] **Unify Python and Node.js systems** - The Python `autonomous_food_system/` package (self-healing, monitoring) and the Node.js backend run independently with no communication layer. Add a bridge (REST calls, shared message queue, or gRPC).
- [ ] **Add Python `requirements.txt` or `pyproject.toml`** - The Python modules import `psutil` but there is no Python dependency manifest. Add one so contributors can install requirements.
- [ ] **Add alerting/notification to monitoring** - `MonitoringSystem` collects metrics but has no alerting thresholds or notification channels (email, Slack, webhook).

### DevOps & Deployment

- [ ] **Create Docker configuration** - Add `Dockerfile` and `docker-compose.yml` for reproducible local development and eventual deployment.
- [ ] **Add environment-specific configurations** - Currently all config is in `.env`. Add support for development, staging, and production profiles.
- [ ] **Add API versioning** - Prefix routes with `/api/v1/` to allow future breaking changes without disrupting consumers.
- [ ] **Add request logging and audit trail** - Winston logging exists but there is no structured audit log for data mutations (who changed what, when).

---

## Research & Exploration Tasks

These are longer-term investigations that inform future development direction.

- [ ] **Benchmark real vertical farm energy/water/yield data** - Validate the hardcoded benchmarks in `GrowthOptimizationEngine.globalBenchmarks` against published research and commercial vertical farm data.
- [ ] **Evaluate real-world crop growth models** - Research existing crop simulation models (e.g., DSSAT, AquaCrop) and evaluate whether their growth equations could replace the simplified `calculateHarvestDate()` lookup table.
- [ ] **Research reusable container logistics** - The distribution service assumes 95% container return rate. Investigate real-world reusable packaging systems for realistic targets.
- [ ] **Study regulatory requirements** - Investigate food safety regulations (HACCP, FDA, EU food law) that would apply to an automated food production and distribution system.
- [ ] **Evaluate edge computing for sensor processing** - Determine whether sensor data processing should happen locally (on-module) vs centrally, and what latency requirements exist for actuator control loops.
