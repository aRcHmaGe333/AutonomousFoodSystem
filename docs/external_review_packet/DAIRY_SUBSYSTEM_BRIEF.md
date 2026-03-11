# Dairy-First Subsystem Brief

## Core concept

This concept proposes a dairy-first handling and milking system that tries to reduce some of the complexity of robotic livestock systems by using more deterministic geometry, explicit subsystem separation, and staged validation.

## Key design directions

### Corridor

- narrowing geometry intended to reduce animal positional variance
- calmer entry assumptions rather than force-heavy handling
- queueing and throughput treated as design constraints
- corridor angle, width, hoof-indexing geometry, and positional tolerance requirements are not yet validated and should be treated as open design constraints

### Cradle and milking interaction

- passive or semi-passive positioning before milking
- reduced reliance on high-complexity robotic manipulation
- simpler sensing assumptions than a full computer-vision robotic arm approach
- teat-positioning tolerance, cradle pressure limits, and pinch-point control remain unresolved engineering constraints

### Pre-wash stage

- cleaning and stimulation before milking
- intended contribution to hygiene and milking readiness
- warm-water or misting assumptions need real-world scrutiny
- reward-feed and training assumptions should be treated as part of the handling design, not as free behavioral slack

### Sanitation stage

- explicit wash and verification sequence
- not assumed to be trivial
- treated as a critical constraint on throughput and safety
- sanitation chemistry, contact time, rinse behavior, and ATP or CFU verification expectations are still underdefined

### Waste and digestion stage

- manure handling is part of the concept, not a separate afterthought
- digestion and nutrient-loop use are treated as design goals
- actual process realism is still an open question
- digester sizing, mass balance, pathogen reduction, and nutrient polishing requirements remain open and should not be implied as solved

### Biosecurity and zone separation

- intended separation between cleaner control surfaces and dirtier biological surfaces
- claims of practical viability depend on specialist review

## Claims that should be treated as hypotheses

- lower-stress handling improves operational performance
- passive positioning materially simplifies the system without creating new failure modes
- sanitation can be integrated without destroying throughput
- waste-loop integration can be made operationally meaningful
- intervention rates can be reduced enough to matter economically
- anomaly rates, maintenance burden, and staffing needs remain within a range that keeps the concept interesting to pilot

## Quantitative gaps reviewers should attack

- corridor and teat-alignment tolerances
- refusal and agitation rates under the proposed handling model
- sanitation verification threshold and contamination transfer risk
- waste-loop mass balance and digestate usefulness conditions
- intervention-rate, maintenance-hour, staffing, and opex assumptions

## What this brief is asking reviewers to do

Identify which of these directions look physically credible, which require major qualification, and which should not be publicly claimed without more evidence.