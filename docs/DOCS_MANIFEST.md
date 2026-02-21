# Docs Manifest — Docs-first project policy

This repository treats documentation as the primary product. The code and scripts are supporting artifacts used to prototype and validate the designs described here. The goal of the docs-first approach is to make the plans, inventions, and operational designs authoritative, reproducible, and stakeholder-ready.

File status categories
----------------------

- approved: Finalized and stakeholder-ready documents. These are the primary artifacts for external sharing.
- Draft: Work-in-progress documents that may change frequently. Good candidates for collaboration and review.
- Action-needed: Docs that require a short follow-up (add metrics, add owner, verify sources) before moving to approved.
- Archived: Historical or generated artifacts kept for provenance; not used as a source of truth.

Current suggested assignments (quick pass)
-----------------------------------------

- approved:
  - `docs/UNIFIED_DIRECTION_SNAPSHOT.md` (generated, approved snapshot)
  - `docs/packaging_guidance.md`
  - `docs/vehicle_modularity.md`
  - `docs/manhours_savings.md`
  - `docs/NAMING_AND_NOTES.md`

- Draft:
  - `docs/delivery_decision_checklist.md` (plain-language draft; review and finalize)
  - `docs/NEW_BEARINGS.md` (working note; keep as draft or deprecate to Archived once merged)

- Action-needed:
  - `docs/ORIGINAL_CHAT_COMPARISON.md` (verify personal data and provenance; remove sensitive links)
  - `docs/monetary_breakeven.md` (add sample scenarios / CSV template)
  - `docs/telemetry_api_openapi.yaml` (confirm endpoints and required fields)

- Archived:
  - `not_public/archived_docs/*` (generated books, tools, prior chat exports)

Migration & governance plan
---------------------------

1. Short audit: Review each doc and assign one of the status categories above. (This file is the first pass.)
2. Non-destructive moves: Move generated and redundant artifacts into `not_public/archived_docs/` and replace them with pointer files referencing approved sources (already applied in part).
3. Add a one-line status header to each markdown file (e.g., `Status: approved`) for quick scanning. Do not change content during this step.
4. For Action-needed docs, create short TODO sections at the top describing required edits and owners.
5. Periodic snapshot: regenerate `docs/UNIFIED_DIRECTION_SNAPSHOT.md` after major doc updates using `npm run gen-book` or the Actions workflow.

Ownership & approvals
---------------------

Each doc should list a single editor/owner at the top (name or team). Approvals for approved promotion require the lead's sign-off (issue or PR comment).

Privacy & provenance
--------------------

Sensitive provenance artifacts (chat exports, extension snapshots) should be kept in `not_public/` and not be published externally without redaction and explicit permission.

Planned next steps:

- Add one-line status headers to the files listed as approved and Draft (non-destructive edit).
- Finalize `docs/GOVERNANCE.md` with the promotion checklist (Draft → Action-needed → approved).
