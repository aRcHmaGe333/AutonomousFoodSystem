# Monetary breakeven (stakeholder-facing notes)

Purpose
-------
A short, stakeholder-friendly explanation of monetary breakeven for reusable packaging. This file is intentionally separate from the main design docs; it provides quick financial context for procurement or investor reviews.

Definition
----------
Monetary breakeven means the point (number of reuses) at which the cumulative costs of a reusable item are equal to the cumulative costs of equivalent single-use packaging.

Simple formula
--------------
breakeven_reuses = cost_of_reusable / (cost_of_single_use - per_use_maintenance_cost)

Notes & adjustments
-------------------
- If per-use maintenance (washing, handling) ≥ cost_of_single_use then monetary breakeven is not achievable.
- Include replacement/loss rates: if items are lost or retired, the effective number of uses per purchased item drops; increase the required reuse count accordingly.
- Account for return logistics (transport, handling) and capital depreciation where relevant.

Quick example
-------------
- Reusable container purchase cost: $10
- Equivalent single-use packaging per use: $0.50
- Per-use washing/handling cost: $0.10

breakeven_reuses = 10 / (0.50 - 0.10) = 25 uses

If you expect ~5% loss per use (naive adjustment), required uses ≈ 25 / (1 - 0.05) ≈ 26.3 → round up to 27 uses.

Where to find the calculator
----------------------------
A tiny Node.js calculator lives in `docs/tools/monetary_breakeven.js`. Run it with Node to compute breakeven given parameters. Example:

node docs/tools/monetary_breakeven.js 10 0.5 0.1 0.05

Arguments: <costReusable> <costSingleUse> <perUseMaintenance> <lossRate>

Why this is separate
--------------------
You requested non-monetary focus. This file exists solely for stakeholders who need the $$$ view; it won't be merged into the approved design docs unless you say so.
