# Chirping Astro Starter

A minimal starter template for [Chirping Astro](https://github.com/kannansuresh/chirping-astro) — a Chirpy-inspired, multilingual **Astro v6** blog theme with **Tailwind CSS v4**, **daisyUI v5**, **Pagefind** search, **Giscus** comments, and **KaTeX** math.

> **Live demo:** [https://kannansuresh.github.io/chirping-astro](https://kannansuresh.github.io/chirping-astro)

## Quick Start

```bash
# Clone this starter
git clone https://github.com/kannansuresh/chirping-astro-starter.git my-blog
cd my-blog

# Install dependencies
bun install

# Start dev server
bun dev
```

Open [http://localhost:4321](http://localhost:4321) to see your site.

## Configuration

1. Edit `src/config.ts` to set your site title, author name, and social links.
2. Copy `.env.example` to `.env` and fill in your values.
3. Replace the avatar in `public/images/` with your own.
4. Start writing posts in `src/content/posts/en/`.

## Writing Posts

Create a new `.md` or `.mdx` file in `src/content/posts/en/`:

```markdown
---
title: 'My First Post'
description: 'A short summary of this post.'
pubDate: 2026-01-01
tags: [hello, world]
categories: [General]
---

Your content here...
```

See the included sample post for all available frontmatter fields.

## Deploy to GitHub Pages

1. Go to **Settings → Pages → Source → GitHub Actions**.
2. Push to `main` — the included deploy workflow handles the rest.

## Commands

| Command          | Action                               |
| ---------------- | ------------------------------------ |
| `bun dev`        | Start dev server at `localhost:4321` |
| `bun run build`  | Build production site to `./dist/`   |
| `bun preview`    | Preview production build locally     |
| `bun run lint`   | Run ESLint                           |
| `bun run format` | Format with Prettier                 |

## Documentation

For full documentation on all features (i18n, dark mode, math, comments, OG images, etc.), see the [main repository](https://github.com/kannansuresh/chirping-astro).

## License

MIT — see [LICENSE](./LICENSE).
