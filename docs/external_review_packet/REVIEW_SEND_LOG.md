# Review Send Log

## Purpose

This log records outbound review requests and their outcomes.

Use it to track who was contacted, what packet version was sent, whether a follow-up was sent, and whether the response was normalized into an intake file.

## Status Meanings

- target_identified: fit confirmed, not yet contacted
- sent: packet sent
- follow_up_sent: at least one follow-up sent
- declined: target explicitly declined
- no_response: closed after follow-up window
- call_scheduled: reviewer agreed to speak
- written_review_received: reviewer returned written findings
- call_notes_captured: call completed and structured notes captured
- intake_normalized: response converted into a received-report intake file

## Log

| Date | Reviewer or target | Discipline | Channel | Packet version | Status | Follow-up date | Result or note | Intake file |
|---|---|---|---|---|---|---|---|---|
|  |  |  |  | v1 | target_identified |  |  |  |

## Logging Rule

Every real outbound request should appear here.

If a reviewer responds by call, record the call date here and then normalize the contents using REVIEW_INTAKE_CONSOLIDATION_TEMPLATE.md.