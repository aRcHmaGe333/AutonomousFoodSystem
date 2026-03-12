# Internal Review Coordination

Folder visibility rule

- This folder is public for auditability, but not every file in it is part of the outward reviewer packet.
- Send only the outward packet files listed in `README.md` in this folder unless a reviewer explicitly asks for more.

## Purpose

This document is for internal coordination of the external dairy-first review process.

It is not part of the external packet.

## Operating Rule

- send the standalone packet first
- do not send internal project material unless explicitly requested
- do not ask for broad endorsement
- ask for decisive critique, missing constraints, and required measurements

## Packet Contents To Send

Send these external-facing files together:

- SYSTEM_SUMMARY.md
- PROOF_STATUS_SUMMARY.md
- ARCHITECTURE_SUMMARY.md
- DAIRY_SUBSYSTEM_BRIEF.md
- ASSUMPTIONS_SHEET.md
- QUESTION_SHEET.md
- REVIEW_RESPONSE_TEMPLATE.md

## Outreach Surfaces

Use these internal files to run the outbound review process:

- REVIEWER_TARGET_PIPELINE.md
- OUTREACH_MESSAGE_TEMPLATES.md
- REVIEW_SEND_LOG.md

## Reviewer Priority Order

1. dairy systems engineer
2. veterinary welfare or animal-behavior expert
3. biosecurity and food-safety specialist
4. manure, digestion, and waste-handling engineer
5. farm economics or operations expert

Reason for this order:

- dairy engineering and welfare review are the fastest way to invalidate or strengthen the core concept
- sanitation and waste reviews pressure-test the system realism next
- economics should evaluate a version of the concept that has already survived the first physical plausibility pass

## Internal Send Checklist

- confirm packet language makes no stronger claim than the concept can support
- confirm terminology is stable across all packet files
- confirm no file refers the reviewer into internal materials
- confirm the target actually matches one of the required reviewer disciplines
- choose the discipline-specific questions to emphasize for the recipient
- record when the packet was sent and to whom
- record whether any follow-up material was requested

## Follow-Up Rules

- if a reviewer requests deeper material, send only what answers the request
- if a reviewer objects to a claim, record the objection before debating it
- if multiple reviewers disagree, preserve the disagreement explicitly
- if a reviewer gives vague approval but no concrete judgment, treat that as low-value signal

## Output Capture Rule

Every external response should be converted internally into:

- claim impact
- design impact
- validation impact
- public-language impact

Use REVIEW_INTAKE_CONSOLIDATION_TEMPLATE.md for that step.

## Report Classification Rule

Not every incoming report counts as external validation of the dairy-first concept.

Classify each incoming report before using it in proof-status language:

- discipline-specific expert review that answers the packet questions counts as external validation input
- generic research synthesis or assessment-program guidance counts as supporting context only
- model-generated or simulated expert personas count as structured adversarial critique, not verified external expert review
- unnamed or weakly attributable commentary does not strengthen physical plausibility claims by itself

If a report does not directly evaluate dairy engineering, welfare, sanitation, waste handling, or operations economics, do not treat it as evidence that those claims survived external review.

If a report does cover those disciplines but the reviewer identity is not independently verifiable, use it to sharpen assumptions, packet wording, and task queues, but do not represent it as completed external validation.

If a model-generated or anonymous report includes traceable citations to relevant literature, standards, or benchmarks, raise its internal signal strength for assumption checking and task derivation, but do not upgrade it to verified external expert review on citations alone.