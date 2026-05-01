# Contributing to Chirping Astro

Thanks for helping improve Chirping Astro.

This project aims to be a community-driven Astro theme: approachable for first-time contributors and reliable for production users.

## Ground rules

- Be respectful and constructive in all interactions.
- Follow the standards in CODE_OF_CONDUCT.md.
- Keep pull requests focused and easy to review.

## Quick setup

1. Fork the repository and clone your fork.
1. Install dependencies:

```bash
bun install
```

1. Start development:

```bash
bun run dev
```

1. Run checks before opening a PR:

```bash
bun run typecheck
bun run lint
bun run format:check
bun run build
```

## What to contribute

- Bug fixes
- Accessibility improvements
- Performance improvements
- Documentation improvements
- New features that align with the theme's scope

If you are planning a large change, open an issue first so we can align on direction.

## Branches and commits

- Create a branch from `main`.
- Use clear commit messages.
- Squash or clean up noisy commits before merge when possible.

Suggested commit prefixes:

- `feat:` for features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for internal code changes
- `chore:` for maintenance

## Pull request expectations

Each pull request should:

- Explain the problem and solution clearly.
- Include screenshots or recordings for UI changes.
- Include test/validation notes.
- Keep unrelated changes out of scope.

## Content and i18n notes

This theme ships with bilingual content support.

- If you add user-facing strings, update i18n resources.
- If you add or change demo content, keep English and French content sets consistent where practical.

## Reporting bugs

Use the Bug Report issue template and include:

- Reproduction steps
- Expected behavior
- Actual behavior
- Environment details (OS, Bun version, browser)

## Security issues

Do not open public issues for security vulnerabilities.

See SECURITY.md for responsible disclosure instructions.

## License

By contributing, you agree that your contributions are licensed under the same license as this project.
