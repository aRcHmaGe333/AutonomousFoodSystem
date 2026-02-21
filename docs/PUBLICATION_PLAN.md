Publication plan � public files vs archived drafts

Goal
- Prepare the repository for public release with clear boundaries between validated, public-ready artifacts and draft/speculative materials that should be archived until validated.

Public (should remain in repo root/docs)
- README.md (high-level project summary, revised to remove absolute claims)
- docs/PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md (assessment and prioritized work)
- docs/URC_spec.md, docs/urc_schema.json, docs/urc_example_recipe.json (URC spec + example)
- docs/capability_registry.json, docs/capability_registry.md (capability registry)
- docs/safety.md (safety & certification plan)
- docs/urc_interpreter_contract.md (interpreter contract)
- docs/telemetry_db_schema.sql (telemetry schema)
- docs/kpi_template.md (KPI templates)
- src/backend/services/urcInterpreter.js and tests/unit/URCInterpreter.test.js (interpreter skeleton + tests)
- .github/workflows/ci.yml (CI pipeline for tests)
- docs/IMPLEMENTATION_APPROACH.md (this implementation approach)

Archive / not_public (move to not_public/ or mark with DRAFT header)
- Original chat transcripts with speculative content (Original chat� Food .md) � move to not_public/Original_chat.md
- Any files claiming full global autonomy / 100% uptime without staged caveats � move to not_public/ (or add DRAFT prefix)
- Raw research notes, motion-capture data drafts, and early ML research materials � move to not_public/

Staging tasks before push
1. Update README.md to remove absolute claims and include staged goals/assumptions.
2. Add a short PUBLIC_NOTE at top of each archived file indicating reason for archiving.
3. Run tests locally and ensure CI passes; fix any failing tests.
4. Create a release checklist in docs/RELEASE_CHECKLIST.md documenting steps to publish.

Action taken
- .gitignore updated to exclude /data/ to prevent sensitive runtime data from being pushed. Archival materials live in `not_public/`.
- Original chat transcript moved to not_public/Original_chat_archived.md and an ARCHIVE header added.

Remaining task: move specified files into `not_public/` and add a short header explaining archive status. No files will be deleted � only move them to not_public/ and add a short header explaining archive status.
