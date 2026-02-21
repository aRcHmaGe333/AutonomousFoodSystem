Safety & Certification Plan — Overview

Purpose
- Document immediate safety requirements and certification roadmap for pilot deployment of cooking and growing pods.
- Provide checklist for hardware, software, and operational safety to make the project credible to stakeholders and regulators.

Principles
- Safety-first: design assumes software can fail; hardware watchdogs and physical interlocks must prevent harm.
- Incremental certification: move in stages from lab to supervised pilot to wider deployment.
- Traceability & auditability: every safety-critical action is logged and auditable.

Key Safety Layers
1. Hardware safety
   - Physical E?stop accessible at pod and rack level.
   - Power cut circuits for heaters, motors, pumps with hardware relays.
   - Overtemp sensors with independent hardware thresholds that trigger relay shutdown.
   - Collision detection and mechanical guards for robotic arms.

2. Watchdog & watchdog-independent shutdown
   - Local hardware watchdog that forces safe state on software hang or comms loss.
   - Network partition handling: pods enter safe mode if central control unreachable for configured timeout.

3. Software safety
   - Input validation and strict parameter limits (never trust URC parameters without validation).
   - Safety limits enforced at interpreter and at actuator driver levels (double-check enforcement).
   - Graceful degradation policies for non-critical subsystems (lighting, non-essential fans).

4. Human-in-the-loop policies
   - Critical recipe changes, firmware updates, and safety flag overrides require authenticated human approval.
   - Operators must have emergency training and clear procedures for remediation.

5. Food safety
   - HACCP-aligned procedures for food contact surfaces, sanitization cycles, and traceability of batches.
   - Sensor logs (temperature, pH) retained for regulatory review windows.

Certification Roadmap (pilot ? production)
- Lab validation: run HIL tests, failure injection, and verify watchdogs and E?stop functions.
- Supervised pilot: deploy a single pod in a controlled environment with human supervisors, record incidents, iterate.
- Third?party audit: engage a safety engineering firm to audit hardware and software safety mechanisms.
- Food safety compliance: align with local regulation (e.g., FDA, EU food hygiene) and obtain certifications for equipment and processes.

Immediate deliverables
- docs/safety.md (this file)
- scripts/check_hardware_safety.sh (recommended): run automated checks for safety wiring and sensor presence
- docs/safety_test_plan.md: step?by?step tests for E?stop, watchdog, overtemp, collision detection

Minimum acceptance criteria for public pilot
- Hardware E?stop and watchdog demonstrated in lab testing.
- Interpreter enforces safety limits for all URC steps (no step can request actuator beyond hardware safety limits).
- Operator training material and emergency procedures documented and available.

