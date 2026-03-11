# Contributing Guidelines

Thank you for your interest in contributing to the Autonomous Food System project! This project is a Node.js/Express prototype focused on recipe management, cooking coordination, ingredient/nutrition tracking, analytics, and sensor integration. 

## Before You Start

- **Review Project Docs:** Please read [docs/OVERVIEW.md](./OVERVIEW.md), [docs/TECH_STACK.md](./TECH_STACK.md), and [docs/STATUS.md](./STATUS.md) for context.
- **Understand Priorities:** Check [docs/PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md](./PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md) and [docs/IMPLEMENTATION_APPROACH.md](./IMPLEMENTATION_APPROACH.md) to align with current goals.
- **Coordinate First:** For major changes or external contributions, contact the repository owner first so work does not drift from the active build direction.

## How to Contribute

- **Project Structure:** Follow the established layout:
    - Models: `src/backend/models`
    - Services: `src/backend/services`
    - Routes: `src/backend/routes`
    - Middleware: `src/backend/middleware`
    - Utilities: `src/backend/utils`
    - Tests: `tests/unit` (see `tests/setup.js`)
- **Feature Workflow:** Add features by updating model → service → route → tests.
- **Testing:** Use Jest for unit tests. New code should include relevant tests.
- **Linting & Formatting:** Use existing npm scripts for linting and formatting.
- **Docker:** If updating Docker-related files, ensure `docker build -t autonomous-food-system .` works.

## Pull Requests

- External pull requests should be coordinated in advance with the repository owner.
- Keep PRs focused and well-described.
- Include tests for new or changed behavior.
- Use the project logger (`src/backend/utils/logger.js`) for logging.

## Licensing & Intellectual Property

- Only submit code and data you have rights to.
- For large contributions or licensing questions, contact the repository owner before submitting.

---

For contribution or licensing questions, contact the repository owner before investing work.
