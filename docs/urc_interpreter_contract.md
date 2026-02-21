URC Interpreter Contract � Validation / Planning / Execution

Purpose
- Define the expected behavior and interfaces of the URC Interpreter so implementations and stakeholders have a clear contract.

API
- validate(urcDoc, registry): returns { ok: boolean, errors: [string] }
- plan(urcDoc, registry): returns { plan: [ { stepId, action, capabilities, parameters } ] }
- execute(plan, executor): returns Promise<log[]>; executor must implement sendCommand(capabilityId, command)

Validation rules (must enforce)
1. Schema conformance: required top-level fields present and correct types.
2. Capability presence: each step.action must map to at least one capability via registry.action_map.
3. Sensor availability: each step.requiredSensors must be resolvable to sensor types or IDs in registry.capabilities.
4. Safety limits: numeric parameters (e.g., target_temp_c, rpm) must not exceed capability.safety_limits or global safety constraints.
5. Units approvedization: interpreter must convert units to approved metric units; ambiguous units cause validation failure.

Planning requirements
- Map steps to capability instances. If multiple capabilities can satisfy the action, the planner selects based on location proximity, load balancing, and safety flags.
- Produce ordered plan with optional parallelizable groups.
- Schedule calibration steps for sensors if last_calibrated is older than registry.policy.calibration_interval (if present).

Execution contract
- Executor interface: sendCommand(capabilityId, command) -> Promise resolving to {status, details}
- The interpreter must subscribe to sensor streams via executor when available and evaluate step.checks in real time.
- On check failure, follow step.contingency using defined fallback actions; if none, transition to safe state and raise alert.
- Produce audit logs for every command and sensor read with timestamps, requestId, and stepId.

Safety & watchdogs
- Interpreter must never bypass capability.safety_limits � actuators must receive commands within hardware limits.
- Critical safety actions (e.g., emergency shutdown) must be sent to dedicated safety endpoints (hardware relays) where available.

Testing contract
- Unit test: validate should reject URC missing capabilities.
- Unit test: plan should map example recipe steps to known capability IDs.
- Integration test: execute should perform dry-run logs when executor absent and interact with mocked executor when provided.

