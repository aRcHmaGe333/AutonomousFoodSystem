Release checklist � public publication steps

Purpose
- Ensure repository content is curated, documented, and safe before publishing to a public GitHub repository for stakeholders.

Pre-publish checks
1. Documentation
   - README.md updated to reflect staged goals and links to public docs.
   - docs/README_PUBLIC.md prepared (stakeholder-facing summary).
   - docs/PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md present.
   - docs/PUBLICATION_PLAN.md lists public vs archived files.
2. Archival
   - Archive speculative raw transcripts and research materials into `not_public/`.
   - Use `not_public/` for archival materials (do not publish without explicit review).
3. Safety & Compliance
   - docs/safety.md included and concise pilot safety acceptance criteria are present.
   - docs/LEGAL_NOTICE.md included with IP and usage notes.
4. Contribution surface
   - docs/CONTRIBUTING.md present if external contributions are being invited.
5. Tests & CI
   - .github/workflows/ci.yml present and runs `npm test`.
   - Unit tests for critical components included (URC interpreter skeleton).
6. Secrets & data
   - .env.example present, real .env excluded via .gitignore.
   - /data and /old directories ignored.
7. Release metadata
   - docs/RELEASE_NOTES_TEMPLATE.md added for future release notes.

Final steps
- Run `npm ci` and `npm test` locally and fix any failing tests.
- Create a release branch (e.g., `release/publication`) and push the branch.
- Create a GitHub release with links to documentation and the publication plan.

Notes
- This checklist is intentionally conservative: aim for transparency and clear limits on claims. Keep speculative material archived and clearly labelled.
