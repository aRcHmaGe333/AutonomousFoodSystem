# Failure Recovery Procedures (ARME Core + Prototype API)

This repo is a software-only prototype. “Recovery” here means restoring a working dev/test environment and quickly diagnosing failures; it does not claim production-grade uptime.

## Definitions

- **Healthy (Node API):** `GET /health` returns `200` and `status: "healthy"`.
- **Healthy (Monitoring/Self-healing libs):** background threads run; component statuses are `HEALTHY` (self-healing) / `healthy` (monitoring).
- **Primary verification:** `npm run smoke` (no server required).

## Incident Workflow (Minimal)

1. **Triage:** identify what’s broken (API down, errors, tests failing, high resource usage).
2. **Recover:** restart the failing process or fix the underlying config/dependency issue.
3. **Verify:** confirm `/health` and `npm run smoke`; re-check logs for new errors.
4. **Record:** note root cause + exact fix so it can be automated later.

## Node/Express API Recovery (`src/backend/`)

### Quick Triage

- Check health: `curl http://localhost:3000/health`
- Smoke-check (no server): `npm run smoke`
- Check logs:
  - `logs/error.log`
  - `logs/combined.log`

### Restart Procedure

- Dev: stop the current terminal and run `npm run dev`
- Non-dev: run `npm start`

If the process is stuck/crashed and you need to free the port (Windows):

- Find PID: `netstat -ano | findstr :3000`
- Kill it: `taskkill /PID <PID> /F`

### Common Failures → Fix

- **Port already in use**
  - Use the `netstat`/`taskkill` steps above, or change `PORT` in `.env`.
- **Broken/missing environment**
  - Ensure `.env` exists: `cp .env.example .env`
  - If requests fail due to CORS, set `FRONTEND_URL` appropriately.
- **Corrupted dependencies / odd runtime errors**
  - Clean reinstall (PowerShell):
    - `Remove-Item -Recurse -Force node_modules`
    - `npm install`
- **“Works yesterday, fails today”**
  - Run `npm test` to pinpoint regressions.
  - Check `logs/error.log` for stack traces.

### Data Loss / Reset Expectations (Prototype)

Most state is in-memory (Maps/arrays). Restarting the server resets runtime data and may change API responses (especially if sample data is enabled/disabled).

## ARME Library Recovery (Python: `autonomous_food_system/`)

These modules are currently standalone libraries with example scripts in `examples/`. They are not wired into the Node server by default.

### Monitoring (`autonomous_food_system/monitoring/`)

- Run example: `python examples/monitoring_example.py`
  - If it fails with `ModuleNotFoundError: psutil`, install `psutil` in your environment.
- Recovery steps when monitoring misbehaves:
  1. Verify the process is still running (no exceptions printed).
  2. Validate each component `health_check()` is fast and exception-safe.
  3. Disable/trim expensive metric collectors; keep metrics cheap and non-blocking.

### Self-Healing (`autonomous_food_system/self_healing/`)

- Run example: `python examples/self_healing_example.py`
- If a component becomes `CRITICAL`:
  1. Inspect the component’s `health_check()` implementation (is it flaky or failing deterministically?).
  2. Inspect the `recovery_action()` (does it return `True` only when the component is actually recovered?).
  3. Increase `max_retries` or `check_interval` only after fixing the underlying failure mode (otherwise you just delay the same failure).

## “Recovered” Checklist

- `npm run smoke` passes
- `GET /health` returns `200` when the server is running
- No repeating errors in `logs/error.log` after restart

