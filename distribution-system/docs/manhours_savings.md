Status: approved

# Man-hours savings model — estimate human time saved by the system

Purpose
-------
Provide a lightweight method to estimate the person-hours saved when the system replaces shopping, cooking, and delivery work for households and small businesses. This is intended for planners and social-impact assessments (not financial accounting).

High-level approach
-------------------
- Break the system into replacement domains: shopping (time to buy food), cooking/prep, cleaning, and transit time related to those activities.
- Estimate per-household baseline time per day/week for each domain.
- Model the system's delivered time savings as the difference between baseline and the residual time needed for interacting with the system (unpacking, reheating, returns).
- Scale by number of households and expected adoption patterns to estimate aggregate savings.

Default example assumptions (editable)
---------------------------------------
- Baseline per-person weekly times:
  - Shopping (grocery run): 1.5 hours
  - Meal preparation & cooking: 6 hours
  - Cleaning (dishes/cleanup): 2 hours
  - Travel/transport related errands: 1 hour
- System residual weekly per-person interaction: 0.75 hours (unpack, reheat, returns)

Simple calculation
------------------
- Baseline total = 1.5 + 6 + 2 + 1 = 10.5 hours/week
- Residual with system = 0.75 hours/week
- Savings per person = 9.75 hours/week (~507 hours/year)

Scaling
-------
- Multiply per-person savings by households and adoption rate to estimate regional man-hour impact.

Social policy notes
-------------------
- Redistribution: saved time isn't evenly distributed; design choices (pricing, subscription models) affect who benefits.
- Non-monetary value: time saved maps to quality-of-life, caregiving availability, and productive labor; include these in impact assessments.

Next steps / tools
------------------
- Potential addition: `docs/tools/manhours_savings.js` (Node script) that accepts baseline inputs and adoption rates and prints results.
- Potential addition: example scenarios (single-household, 1,000-household pilot, city-scale at 1% adoption).

Workers, displacement & transition
----------------------------------
Automating shopping, cooking, cleaning, and delivery will reduce demand for many existing roles (cashiers, stockers, delivery drivers, kitchen staff, packing labor). This is a social outcome to measure and plan for, not an engineering failure. Key points and actions:

- Measure impact: track full-time-equivalent (FTE) reductions by role and region as adoption grows. Use the man-hours savings model to estimate hours freed and translate into FTEs (e.g., 1 FTE = 40 hrs/week).
- Downstream effects: reduced demand for supporting roles (logistics sorting, recycling operators) and increased demand for depot operators, maintenance technicians, and logistics coordinators.
- Transition strategies:
  - Retraining & redeployment programs focused on depot operations, cleaning/CIP technicians, repair/maintenance, and customer success roles.
  - Hiring guarantees or phased reductions with severance and retraining budgets built into pilot financing.
  - Community-owned depot/co-op models where workers have equity and decision rights, reducing extractive job losses.
- Policy levers: local hiring quotas, tax incentives for redeployment, subsidy for retraining, and support for worker-owned platforms.
- Ethical design: measure who benefits (household demographics) and ensure pricing/subscription models don't favor only high-income households.

Metrics to track
----------------
- Weekly person-hours reduced by role
- Net FTE change by job category (drivers, stockers, kitchen staff, packers, depot techs)
- New FTEs created (depot techs, maintenance)
- Reemployment rate and average time-to-retrain for displaced workers
- Distributional impact (which income groups gained/lost time)

Policy & operational checklist
-----------------------------
- Include a workforce transition budget in pilot planning (training, placement services).
- Design job pathways from displaced roles into depot/maintenance/operations roles.
- Track metrics regularly and publish an annual social impact report for pilot communities.

