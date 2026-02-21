Capability Registry — Usage and contract (for URC Interpreter)

Overview
- The Capability Registry declares available logical capabilities (sensors, actuators, robotics) on a per‑pod basis.
- The Interpreter uses the registry to:
  1. Validate a URC document can be executed on the target cooking cell (all required actions map to available capabilities).
  2. Resolve requiredSensors → sensor IDs and steps' supported_actions → actuator IDs.
  3. Obtain control interfaces (protocol & address) so command translators can emit low level commands.

Where to put it
- docs/capability_registry.json is approved for each pod type / deployment image.
- Pods expose a dynamic /api/capabilities endpoint returning the pod's live registry (discoveryEndpoint in the file).
- CI and unit tests use a mocked registry file (this doc) to run interpreter tests offline.

Key fields (quick)
- id: unique capability identifier (string)
- category: sensor | actuator | logical
- type: commodity type (temperature, colorimeter, heater, robotic_arm)
- interface / control_interface: protocol and address/endpoint the interpreter uses
- supported_actions: approved URC actions this capability supports
- safety_limits & safety_flags: interpreter must honor these and never exceed them
- calibration info: last_calibrated + method; interpreter may insist on calibration pass before critical steps

Interpreter contract (pseudo)
- validate(urc, registry):
    - for each step in urc.steps:
        - for each requiredSensor in step.requiredSensors: ensure registry contains sensor with matching type
        - translate action → registry.action_map[action] (list of capability ids). If no mapping → FAIL (missing capability)
        - check capability safety_limits against step.parameters (e.g., target_temp <= capability.safety_limits.max_temp_c)
- plan(urc, registry):
    - build execution plan mapping step → capability instance + low level command template
    - schedule calibration jobs for capabilities that require it
- execute(plan):
    - send control commands according to capability.control_interface
    - subscribe to sensor streams; evaluate step.checks and contingency in real-time
    - maintain audit logs (timestamp, command, sensor readings, check outcomes)
    - respect safety: if any safety flag triggers, run emergency procedures (stop, cooldown, alert)

Example: resolving 'sear' in URC
- URC step: action sear, requiredSensors [internal_temperature, surface_color]
- action_map["sear"] → ["actuator.heater.pan_1","sensor.temp.internal_probe_1","sensor.color.colorimeter_vis_1","actuator.robot.arm_1"]
- Interpreter picks actuator.heater.pan_1 to set target_temp, monitors sensor.temp.internal_probe_1 until target reached, observes surface_color for browning, and uses arm_1 for placement/flip.

Best practices
- approved units: Interpreter should sanction units to URC schema (metric by default). Reject URC with ambiguous units.
- Versioning: registry.schemaVersion must match Interpreter's supported registry schema version; otherwise require migration.
- Safety-first: implement hardware watchdogs independent of interpreter; the registry flags are not a substitute for hardware safety layers.

Testing
- Unit tests: mock capability_registry.json and verify interpreter.validate fails for missing capabilities and passes for correct mappings.
- Integration: mock actuator endpoints to assert correct control messages and that contingency branches are invoked on simulated sensor failures.

Next steps (after saving these files)
- Implement src/backend/services/urcInterpreter.js that loads docs/capability_registry.json in tests and performs validate/plan/execute stubs.
- Add tests/tests/unit/URCInterpreter.test.js using docs/urc_example_recipe.json to assert mapping behavior and contingency handling.

Notes
- Keep registry entries small and deliberately explicit (avoid dynamic discovery magic until MVP).
- Expand registry with growing_module capabilities (pumps, dosing valves, spectrometer) after cooking cell interpreter is validated.
