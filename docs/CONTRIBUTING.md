# Contributing Guidelines

Thank you for your interest in contributing to the Autonomous Food System project! This project is a Node.js/Express prototype focused on recipe management, cooking coordination, ingredient/nutrition tracking, analytics, and sensor integration. 

## Before You Start

- **Review Project Docs:** Please read [docs/OVERVIEW.md](./OVERVIEW.md), [docs/TECH_STACK.md](./TECH_STACK.md), and [docs/STATUS.md](./STATUS.md) for context.
- **Understand Priorities:** Check [docs/PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md](./PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md) and [docs/IMPLEMENTATION_APPROACH.md](./IMPLEMENTATION_APPROACH.md) to align with current goals.
- **Open Issues:** For major changes or new features, open an issue first to discuss with maintainers.

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

- Fork the repository and use feature branches.
- Keep PRs focused and well-described. Link related issues.
- Include tests for new or changed behavior.
- Use the project logger (`src/backend/utils/logger.js`) for logging.

## Code of Conduct

- Please review [docs/CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) and adhere to it.

## Licensing & Intellectual Property

- Only submit code and data you have rights to.
- For large contributions or licensing questions, contact the repository owner before submitting.

---

For questions or help, open an issue or start a discussion. We appreciate your contributions!
