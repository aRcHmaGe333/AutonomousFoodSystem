# Review Send Log

## Purpose

This log records outbound review requests and their outcomes.

Use it to track who was contacted, what packet version was sent, whether a follow-up was sent, and whether the response was normalized into an intake file.

## Status Meanings

- target_identified: fit confirmed, not yet contacted
- message_ready: target selected and outreach draft ready, but not yet sent
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
|  | Douglas Reinemann | Dairy engineering | Email | v1 | message_ready |  | First-wave target selected; send-ready draft exists |  |
|  | Ricardo C. Chebel | Welfare and behavior | Email | v1 | message_ready |  | First-wave target selected; send-ready draft exists |  |
|  | Ginger D. Fenton | Biosecurity and food safety | Email | v1 | message_ready |  | First-wave target selected; send-ready draft exists |  |
|  | Neslihan Akdeniz | Digestion and waste | Email | v1 | message_ready |  | First-wave target selected; send-ready draft exists |  |
|  | Leonard Polzin | Economics and operations | Email | v1 | message_ready |  | First-wave target selected; send-ready draft exists |  |

## Logging Rule

Every real outbound request should appear here.

If a reviewer responds by call, record the call date here and then normalize the contents using REVIEW_INTAKE_CONSOLIDATION_TEMPLATE.md.

## Public Disclosure Rule

Do not state that outreach has been sent unless at least one real outbound message has actually been sent.

Before send:

- public-safe wording is that external review targets have been identified and first-wave outreach is prepared

After first real send:

- public-safe wording is that outreach to discipline-fit external reviewers has been initiated and responses are pending

Do not publicly imply endorsement, active collaboration, or received review until those facts exist.