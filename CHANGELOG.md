# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-02

### Changed

- **Astro v7 Upgrade**: Upgraded core framework to Astro v7.x (`^7.0.5`), including major updates for official integrations:
  - `@astrojs/mdx` upgraded to `^7.0.1`
  - `@astrojs/rss` upgraded to `^4.0.19`
- **Updated Tooling & Libraries**:
  - `astro-expressive-code` bumped to `^0.44.0`
  - `daisyui` bumped to `^5.6.10`
  - `tailwindcss` and `@tailwindcss/vite` bumped to `^4.3.2`
  - `eslint-plugin-astro` bumped to `^2.1.1`
  - `eslint` bumped to `^10.6.0`
- **Documentation & Reference Updates**:
  - Main `README.md` and `.starter/README.md` updated to reflect Astro v7.
  - `AGENTS.md` developer guide updated with Astro v7-specific details.
  - Source code comments and metadata in `src/config.ts` and `src/content.config.ts` updated to reference Astro v7.

---

## [1.0.0] - 2026-06-03

### Added

- Initial stable release of **Chirping Astro** theme.
- Multilingual i18n support for post and static page templates.
- Tailwind CSS v4 and daisyUI v5 styling integrations.
- Built-in remark/rehype plugins for alerts (`remark-alert`), raw HTML rendering (`remark-ashtml`), and math equations (KaTeX).
- Client-side interactive islands for Theme Toggle, Language Switcher, Table of Contents, Search, and Giscus comments.
