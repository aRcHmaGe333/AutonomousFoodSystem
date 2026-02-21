Pod Simulator

A lightweight simulator to estimate how many instrumented pods are required to replace a target number of person-hours. Inputs and assumptions are simplified and intended for rapid iteration.

Inputs:
- yield_per_cycle_kg
- cycles_per_week
- person_hours_per_kg_manual
- downtime_fraction
- maintenance_person_hours_per_week

Outputs:
- kg_per_week_per_pod
- person_hours_saved_per_pod
- pods_needed_for_target_person_hours

Implementation plan:
- Node.js script that accepts JSON inputs and prints results
- Extendable to include stochastic downtime and variable yields

Next: implement simulator.js in this directory when you want the first version.
