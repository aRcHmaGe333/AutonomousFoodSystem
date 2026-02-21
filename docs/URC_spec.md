Universal Recipe Compiler (URC) — Specification

Purpose
- Provide a machine-readable recipe specification for precision culinary automation.
- Enable standardized/consistent encoding of ingredients, process steps, sensory goals, safety constraints, and machine-executable commands.
- URC spec for AgroBotGrid / Precision Culinary Automation.

Files
- docs/urc_schema.json — JSON Schema for URC documents
- docs/urc_example_recipe.json — Example recipe encoded using the URC schema

Design principles
- Atomic steps: each instruction is an atomic, parameterized action (heat, mix, rest, cut, measure, move, preserve).
- Units and types: explicit units for time, temperature, mass, volume, speed.
- Sensors and checks: explicit required sensors and quality checks for each step.
- Safety envelope: min/maxs and abort conditions.
- Metadata: versioning, provenance, author, tag set for cuisine/style.

Core top-level structure (summary)
- schemaVersion: URC version
- id, name, description, tags
- servings: nominal servings
- ingredients: list with id, name, forms (e.g., chopped, whole), default_quantity (value+unit)
- equipment: list of required equipment identifiers
- steps: ordered list of step objects (see step schema)
- sensoryGoals: optional target descriptions (texture, color, moisture)
- nutrition: optional expected nutrition per serving
- safety: global safety constraints

Step object (summary)
- id: step id
- action: one of predefined actions (heat, mix, chop, rest, vacuum_seal, fry, bake, steam, sous_vide, freeze, ferment, plate, package, preserve)
- parameters: action-specific parameters (e.g., temperature, duration, speed)
- inputs: references to ingredients/equipment and quantities
- outputs: what this step produces (e.g., intermediate product id)
- requiredSensors: list of sensors this step depends on (temperature, moisture, colorimeter, pressure, pH, etc.)
- checks: pass/fail checks to validate the step (e.g., target_temp within tolerance)
- contingency: alternate steps or branches if checks fail
- parallelizable: boolean (can be executed in parallel with other steps)

Example usage
- URC documents are consumed by the Recipe Interpreter which translates steps into low-level machine commands for the cooking cell (actuator sequences, motion trajectories, PID setpoints).
- The Interpreter maps requiredSensors to the actual sensor IDs available in the cooking cell and schedules calibration/validation before the step.

Notes on machine mapping
- Each action maps to a capability in the cooking cell capability registry. The interpreter fails if required capabilities are missing.
- Timing & synchronization: steps support earliestStart/earliestEnd and can express relative timing constraints (e.g., start step B within 2 minutes of step A finishing).

Next: example schema and a concrete recipe example are included in docs/urc_schema.json and docs/urc_example_recipe.json.

