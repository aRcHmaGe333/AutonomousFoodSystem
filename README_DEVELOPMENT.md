# Autonomous Food System - Development Guide

This repository is a software prototype of an “autonomous food system” idea: it’s the place to run and iterate on the backend logic, simulations, and APIs before any real hardware exists.

## What This Repo Contains (Today)

- A Node.js/Express backend in `src/backend/` (recipes, cooking sessions, analytics, growing modules, distribution/consumption tracking).
- Simulation-first hardware scaffolding (physical sensor/actuator/robot connections are not implemented yet).
- Jest tests in `tests/`.

Not currently included in this repo:

- `src/frontend/` (no React/web UI in this repository right now)
- Hardware device drivers / firmware / robotics code

## Project Structure

This section shows (1) what exists in this repo today and (2) a possible target layout for future expansion.

```
AutonomousFoodSystem/
+-- docs/                         # API documentation
+-- examples/                     # Example scripts
+-- src/
|   `-- backend/                  # Node.js/Express server
|       +-- middleware/
|       +-- models/
|       +-- routes/
|       +-- services/
|       `-- utils/
+-- tests/                        # Jest tests
+-- README.md
`-- README_DEVELOPMENT.md
```

## Planned / Target Structure (Future)

This is a planning sketch (not all directories exist in this repo today):

```
AutonomousFoodSystem/
+-- docs/
+-- src/
|   +-- backend/
|   +-- frontend/                 # React/web UI (planned)
|   +-- hardware/                 # IoT + device integrations (planned)
|   +-- ai/                       # ML training/inference tooling (planned)
+-- tests/
`-- ...
```

## Quick Start

### Prerequisites

- Node.js 16+
- npm 8+

### Install

```bash
npm install
cp .env.example .env
```

### Run

```bash
npm run dev
```

### Test

```bash
npm test
```

## Failure Recovery / Runbook

See `docs/FAILURE_RECOVERY.md` for practical “what to do when things break” procedures (restart, logs, smoke checks, and common failure fixes).

## Simulation Mode (Hardware)

The backend can run in a simulation-first mode for sensors/actuators/robots:

- Set `ENABLE_SENSOR_SIMULATION=true` in `.env`

If simulation is disabled, the placeholder physical-connection methods will throw "not implemented" errors.

## Sample Data

By default, the API routes seed some sample in-memory data on startup (useful for demos). To start empty, set `ENABLE_SAMPLE_DATA=false`.

## Notes on Persistence

Most data is currently stored in-memory for prototyping. For anything beyond local dev runs (restarts, multi-instance, auditability), database persistence needs to be added.
