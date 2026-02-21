# Docs governance and promotion checklist

Purpose
-------
This file describes the lightweight process for promoting docs from Draft → Action-needed → approved and clarifies ownership, approvals, and publication rules.

Promotion checklist
-------------------

Draft → Action-needed (fast checks)
- Document has a listed owner at the top.
- Basic structure is present (Purpose, Scope, Next steps).
- No sensitive or private data that must be removed before public sharing.

Action-needed → approved (approval requirements)
- Add required metrics, examples, or templates called out in the Action-needed note.
- Include a short testing/validation note if the doc references runnable code or experimental results.
- Owner files a PR with changes and a short approval comment listing reviewers.
- At least one second-party reviewer signs off in PR comments.

approved maintenance
- Every approved doc should have a date-stamped changelog in its front-matter.
- Major changes (content or claims) must include a short 'Evidence' section describing data or tests supporting the change.

Ownership
---------
- Each doc must include an 'Owner' line at the top. Owners can be individuals or teams. Owners are responsible for the doc's accuracy and for shepherding promotions.

Publication and provenance
-------------------------
- Never publish raw chat transcripts or unredacted external provenance without explicit consent and redaction.
- Keep a separate `not_public/` archive for provenance artifacts.

Next step: run a non-destructive sweep adding a one-line `Status:` header to approved and Draft files as listed in `docs/DOCS_MANIFEST.md`.