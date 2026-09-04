# Autonomous Food System

I want food production to need dramatically less routine human babysitting.

Not "AI suggests when to water basil." I mean the whole ugly chain: growing, monitoring, harvesting, preparing, portioning, handling waste/byproducts, and keeping the machinery itself running as much as possible.

That is the direction of AFS.

The current repo is a **software-first prototype**. The physical system is not built yet, and I am keeping that distinction explicit because pretending otherwise helps nobody.

## What this is trying to become

A distributed food-production system with local modules for:

- growing
- cooking and portioning
- dairy-first livestock management
- shared resource loops
- monitoring, analytics and increasingly autonomous operation

Food produced here can hand off into [AllDone](https://github.com/aRcHmaGe333/AllDone) for distribution.

The long-term target is not survival-food minimalism. The point is to produce normal, good food with as little repeated human work and avoidable waste as possible.

## What actually exists right now

The software side is real.

The repo already includes working backend surfaces for:

- recipe and ingredient management
- cooking-session coordination
- growing-module models/routes
- dairy-first livestock management
- animal-health / milking analytics
- telemetry and performance monitoring
- simulation-first sensor/hardware paths
- tests and smoke checks

The physical side is at a very different maturity level.

There are no finished robotic farms hiding behind the README. Hardware integration is still simulation-first. Physical safety, animal welfare, biosecurity, economics and real closed-loop performance all need domain experts and real-world validation.

Current stage: **software-first prototype; physical validation required**.

The proof split is documented here: [CURRENT_PROOF_STATUS.md](docs/CURRENT_PROOF_STATUS.md).

## Why this belongs in a sustainability discussion

Because agriculture and food processing waste absurd amounts of inputs when systems are fragmented, badly timed or manually operated by default.

AFS is trying to make the resource loops tighter:

- grow locally where that makes sense
- use water and nutrients more precisely
- portion food according to actual need
- reduce spoilage and overproduction
- turn useful byproducts back into inputs where possible
- automate repetitive work that currently requires people, transport and constant intervention

"Zero waste" and "100% uptime" are long-term directions, not current claims.

The useful question is how far toward those targets a real system can move once we stop designing every step as a separate human-operated island.

## Dairy-first, because the implementation has to mean something

The livestock side is currently dairy-first.

That is not branding. It is simply where the actual software and design work is concentrated: milking, milk quality, lactation, herd health, sanitation states and the current passive-cradle milking concept.

The physical concept deliberately tries to avoid unnecessarily complicated robotic manipulation where simpler geometry/sensing can do the job. Animal welfare has to be treated as an engineering constraint, not an inspirational paragraph.

Useful documents:

- [Livestock module spec](docs/LIVESTOCK_MODULE_SPEC.md)
- [Dairy pilot roadmap](docs/PILOT_ROADMAP_DAIRY_FIRST.md)
- [Dairy claim boundaries](docs/DAIRY_FIRST_CLAIM_BOUNDARIES.md)
- [Plausibility and validation](docs/PLAUSIBILITY_AND_VALIDATION.md)

## What needs to happen next

The next useful work is physical validation in small pieces, not "build autonomous agriculture globally."

That means:

1. connect one bounded subsystem to real sensors/actuators
2. test failure handling and safety properly
3. bring in the domain people the repo cannot substitute for
4. measure resource use, reliability, welfare/safety and operating cost
5. keep expanding only where the previous piece survives reality

The repo already has software structure to support that progression. What it needs now is backing, hardware access and serious domain review.

## Run the prototype

Requirements: Node.js 16+, npm 8+

```bash
npm install
cp .env.example .env
npm run dev
npm test
npm run smoke
```

## Useful starting points

- [Architecture](docs/architecture.md)
- [Current proof status](docs/CURRENT_PROOF_STATUS.md)
- [Plausibility and validation](docs/PLAUSIBILITY_AND_VALIDATION.md)
- [Current priorities](steer.md)

## Funding / collaboration

If you work in controlled-environment agriculture, food automation, dairy engineering, veterinary welfare, biosecurity, robotics, waste/resource systems, food safety, farm economics or physical prototyping, there is useful work here that software alone cannot finish.

Likewise, if you fund systems that need real-world validation instead of another pitch deck, I am interested.

## IP / verification

Published under the **APC-VF License v2.0**. Authorship is cryptographically timestamped.

- [LICENSE](LICENSE)
- [VERIFY.md](VERIFY.md)

Contact: stojnicslavko@gmail.com

[Support the work](https://ko-fi.com/earthcraft)
