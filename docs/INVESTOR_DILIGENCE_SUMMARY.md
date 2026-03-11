# Investor Diligence Summary

## Short version

This repository is a software-first prototype of an autonomous food system.

It is credible as a prototype.
It is not yet credible as a physically validated deployment system across all subsystems.

## What is strongest today

- coherent subsystem direction
- real backend implementation
- clear documentation surface
- explicit plausibility discipline
- improving verification coverage

## What has been corrected already

- the architecture map now matches the public story more closely
- the repo now distinguishes implemented, simulated, conceptual, and externally validated surfaces
- livestock is now framed as dairy-first in current scope instead of overclaiming generic parity
- the test suite passes cleanly and covers the documented prototype surface better than before

## What this repo can support in a diligence conversation

- architecture review
- software prototype inspection
- staged validation planning
- subsystem boundary analysis
- identification of the main technical and operational unknowns

## What this repo should not yet be used to claim

- physically validated livestock operations at scale
- certified food-safe autonomous deployment
- proven welfare outcomes from the dairy system design
- deployment-grade economics for low-intervention livestock operations

## Current risk split

### Lower relative risk

- software architecture coherence
- API and model structure
- documentation clarity
- simulation-first development path

### Higher relative risk

- livestock physical engineering
- welfare validation
- biosecurity and sanitation reality
- operational economics at scale
- regulator-facing deployment readiness

## Current best reading of subsystem maturity

| Subsystem | Reading |
|---|---|
| Recipes and URC | real prototype surface |
| Cooking | real software surface, physical execution still staged |
| Growing | real software surface plus clearer hardware abstraction direction |
| Livestock | real software surface plus explicit abstraction and simulation, but weaker physical validation surface |
| Shared resource loops | architecturally important, only partly operationalized end to end |
| Distribution | boundary to a separate project |

## What would improve diligence readiness next

1. broader route and service coverage beyond the current baseline
2. failure-mode simulation for livestock sanitation, blockage, and sensor disagreement
3. explicit dairy-first expert review package
4. incremental coverage-threshold increases tied to real subsystem testing growth
5. sharper public artifacts for external validation once expert review begins

## Next diligence-facing docs

- [CURRENT_PROOF_STATUS.md](CURRENT_PROOF_STATUS.md) for the authoritative proof split
- [PILOT_ROADMAP_DAIRY_FIRST.md](PILOT_ROADMAP_DAIRY_FIRST.md) for the next validation gate and stop or redesign conditions
- [DAIRY_FIRST_CLAIM_BOUNDARIES.md](DAIRY_FIRST_CLAIM_BOUNDARIES.md) for wording that stays inside the current evidence surface

## Bottom line

The project is now much easier to trust as a serious prototype because it is saying fewer inflated things and showing more of its real structure.

That is the right direction for investor inspection.