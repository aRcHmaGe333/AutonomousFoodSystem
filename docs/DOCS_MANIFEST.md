# Docs Manifest

Status: Draft

Purpose

- Show new readers which documents are canonical, which are support references, and which should not be treated as the main truth surface.
- Prevent the repo from presenting exploratory or historical artifacts as equal in authority to the current proof-status and architecture docs.

Read in this order

1. [README.md](../README.md)
2. [CURRENT_PROOF_STATUS.md](CURRENT_PROOF_STATUS.md)
3. [architecture.md](architecture.md)
4. [STATUS.md](STATUS.md)
5. [LIVESTOCK_MODULE_SPEC.md](LIVESTOCK_MODULE_SPEC.md)
6. [LIVESTOCK_HARDWARE_AND_SIMULATION.md](LIVESTOCK_HARDWARE_AND_SIMULATION.md)

Canonical external-facing docs

- [README.md](../README.md): primary repository entry point.
- [CURRENT_PROOF_STATUS.md](CURRENT_PROOF_STATUS.md): source of truth for implemented, simulated, conceptual, and externally validated boundaries.
- [architecture.md](architecture.md): system map and subsystem boundary view.
- [STATUS.md](STATUS.md): concise current-state summary.
- [README_PUBLIC.md](README_PUBLIC.md): short public-facing orientation page.
- [INVESTOR_DILIGENCE_SUMMARY.md](INVESTOR_DILIGENCE_SUMMARY.md): concise diligence-facing summary.

Canonical subsystem and validation docs

- [LIVESTOCK_MODULE_SPEC.md](LIVESTOCK_MODULE_SPEC.md): dairy-first livestock subsystem scope and assumptions.
- [LIVESTOCK_HARDWARE_AND_SIMULATION.md](LIVESTOCK_HARDWARE_AND_SIMULATION.md): livestock abstraction and simulation contract.
- [PILOT_ROADMAP_DAIRY_FIRST.md](PILOT_ROADMAP_DAIRY_FIRST.md): pilot gates, measurement expectations, and stop or redesign conditions for the dairy-first concept.
- [DAIRY_FIRST_CLAIM_BOUNDARIES.md](DAIRY_FIRST_CLAIM_BOUNDARIES.md): safe outward wording and claim-upgrade rules for the dairy-first subsystem.
- [DAIRY_FIRST_EXTERNAL_REVIEW_BRIEF.md](DAIRY_FIRST_EXTERNAL_REVIEW_BRIEF.md): external validation and research requirements for dairy-first review.
- [PLAUSIBILITY_AND_VALIDATION.md](PLAUSIBILITY_AND_VALIDATION.md): validation discipline and plausibility framing.
- [PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md](PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md): assessment context and recommendation history.
- [IMPLEMENTATION_APPROACH.md](IMPLEMENTATION_APPROACH.md): prototype implementation framing.

Reference docs

- [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- [capability_registry.md](capability_registry.md)
- [urc_interpreter_contract.md](urc_interpreter_contract.md)
- [URC_spec.md](URC_spec.md)
- [telemetry_api_openapi.yaml](telemetry_api_openapi.yaml)
- [telemetry_db_schema.sql](telemetry_db_schema.sql)
- [FAILURE_RECOVERY.md](FAILURE_RECOVERY.md)
- [safety.md](safety.md)
- [GOVERNANCE.md](GOVERNANCE.md)

Working or planning docs

- [Plan_and_tasks_AFS.md](../Plan_and_tasks_AFS.md): active remediation plan.
- [PUBLICATION_PLAN.md](PUBLICATION_PLAN.md)
- [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md)
- [REVIEW_SUMMARY.md](REVIEW_SUMMARY.md)
- [external_review_packet/INTERNAL_REVIEW_COORDINATION.md](external_review_packet/INTERNAL_REVIEW_COORDINATION.md): internal operating rules for outbound review and response handling.
- [external_review_packet/REVIEWER_TARGET_PIPELINE.md](external_review_packet/REVIEWER_TARGET_PIPELINE.md): internal target qualification and contact-pipeline surface for named reviewer outreach.
- [external_review_packet/OUTREACH_MESSAGE_TEMPLATES.md](external_review_packet/OUTREACH_MESSAGE_TEMPLATES.md): ready-to-send outreach language for email, DM, follow-up, and call setup.
- [external_review_packet/REVIEW_SEND_LOG.md](external_review_packet/REVIEW_SEND_LOG.md): running log of outbound requests, follow-ups, and intake normalization status.
- [external_review_packet/REVIEW_INTAKE_CONSOLIDATION_TEMPLATE.md](external_review_packet/REVIEW_INTAKE_CONSOLIDATION_TEMPLATE.md): normalization template for each incoming report.
- [external_review_packet/received_reports/2026-03-10_report_01_intake.md](external_review_packet/received_reports/2026-03-10_report_01_intake.md): first received-report intake, classified as supporting context rather than domain validation.
- [external_review_packet/received_reports/2026-03-10_report_02_intake.md](external_review_packet/received_reports/2026-03-10_report_02_intake.md): structured synthetic multi-discipline critique, useful for internal pressure-testing but not counted as verified external review.
- [external_review_packet/received_reports/2026-03-10_report_03_intake.md](external_review_packet/received_reports/2026-03-10_report_03_intake.md): updated generic assessment-framework report, kept as process guidance only.
- [delivery_decision_checklist.md](delivery_decision_checklist.md)
- [kpi_template.md](kpi_template.md)
- [monetary_breakeven.md](monetary_breakeven.md)

Exploratory, historical, or generated artifacts

- [UNIFIED_DIRECTION_SNAPSHOT.md](UNIFIED_DIRECTION_SNAPSHOT.md)
- [NEW_BEARINGS_BOOK_FULL.md](NEW_BEARINGS_BOOK_FULL.md)
- [ORIGINAL_CHAT_COMPARISON.md](ORIGINAL_CHAT_COMPARISON.md)
- [citations.md](citations.md): normalized wrapper around a raw citation-search export; useful for source triage, not a canonical bibliography.
- [deep-research-report.md](deep-research-report.md): preserved imported research export; use the normalized intake file instead for operational conclusions.
- [deep-research-report (1).md](deep-research-report%20(1).md): preserved imported research export; use the normalized intake file instead for operational conclusions.
- [idk.md](idk.md)
- [Name talk and perhaps a few other useful bits.md](Name%20talk%20and%20perhaps%20a%20few%20other%20useful%20bits.md)
- generated diagrams and data files such as [architecture.svg](architecture.svg), [architecture.mmd](architecture.mmd), and [kpi_dashboard_mock.json](kpi_dashboard_mock.json)

Interpretation rules

- If a claim conflicts with [CURRENT_PROOF_STATUS.md](CURRENT_PROOF_STATUS.md), trust the proof-status document.
- If a scope description conflicts with [README.md](../README.md) and [architecture.md](architecture.md), update the outlying document rather than broadening the claim.
- Treat historical and exploratory files as context, not current authority.

Next cleanup targets

- Normalize repeated subsystem terminology across README, architecture, and subsystem specs.
- Add short status headers to remaining high-value docs that do not yet have one.
- Move or clearly mark documents that are exploratory but currently look canonical at a glance.
