# Chirping Astro Starter

A minimal starter template for [Chirping Astro](https://github.com/kannansuresh/chirping-astro) — a Chirpy-inspired, multilingual **Astro v6** blog theme with **Tailwind CSS v4**, **daisyUI v5**, **Pagefind** search, **Giscus** comments, and **KaTeX** math.

> **Live demo:** [https://kannansuresh.github.io/chirping-astro](https://kannansuresh.github.io/chirping-astro)

## Quick Start

### Option 1: Astro CLI (recommended)

```bash
bunx create-astro@latest --template kannansuresh/chirping-astro-starter
```

The wizard will prompt you for a project name, install dependencies, and initialize git.

### Option 2: Clone directly

```bash
git clone https://github.com/kannansuresh/chirping-astro-starter.git my-blog
cd my-blog
bun install
```

### Start dev server

```bash
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

The included `.github/workflows/deploy.yml` builds and deploys your site automatically on every push to `main`. To set it up:

### 1. Enable GitHub Pages

Go to your repo **Settings → Pages → Source** and select **GitHub Actions**.

### 2. Set environment variables (optional)

Go to **Settings → Environments → github-pages → Environment variables** and add any of:

| Variable                    | Purpose                               | Default                        |
| --------------------------- | ------------------------------------- | ------------------------------ |
| `SITE_URL`                  | Your production URL                   | `https://<username>.github.io` |
| `BASE_PATH`                 | Sub-path for the site                 | `/<repo-name>`                 |
| `PUBLIC_GITHUB_HANDLE`      | GitHub profile link in sidebar        | Your GitHub username           |
| `PUBLIC_TWITTER_HANDLE`     | Twitter/X link in sidebar             | _(none)_                       |
| `PUBLIC_CONTACT_EMAIL`      | Email link in sidebar                 | _(none)_                       |
| `PUBLIC_GISCUS_ENABLED`     | Enable comments (`true`/`false`)      | _(none)_                       |
| `PUBLIC_GISCUS_REPO`        | `owner/repo` for Giscus               | _(none)_                       |
| `PUBLIC_GISCUS_REPO_ID`     | From [giscus.app](https://giscus.app) | _(none)_                       |
| `PUBLIC_GISCUS_CATEGORY`    | Discussion category name              | _(none)_                       |
| `PUBLIC_GISCUS_CATEGORY_ID` | From [giscus.app](https://giscus.app) | _(none)_                       |

> **Note:** All variables are optional. The site builds and deploys with zero configuration — variables just enable extra features.

### 3. Customize the Privacy Policy (optional)

Edit the bilingual privacy policy templates:

```text
src/content/pages/en/privacy.md
src/content/pages/fr/privacy.md
```

Replace placeholder values in `[BRACKETS]` (site name, contact email, etc.).
The privacy policy appears in the footer with a link — disable it by setting
`showPrivacyPolicy: false` in `src/config.ts`.

### 4. Push to `main`

That's it. The workflow will build and deploy your site. Your site will be available at `https://<username>.github.io/<repo-name>/`.

## Custom Domain

### Dedicated domain for this site

To use your own domain (e.g., `https://blog.example.com`) exclusively for this site:

1. Set `SITE_URL` = `https://blog.example.com`
2. Set `BASE_PATH` to empty (or `/`).
3. Configure your DNS — see [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

### Using a custom domain on your GitHub user site

If your GitHub user site (`<username>.github.io`) already points to a custom domain (e.g., `example.com`), then **all project sites** under that account are automatically served under that domain:

```text
username.github.io        → example.com          (user site)
username.github.io/blog   → example.com/blog     (this repo)
```

In this case, you don't need any extra DNS setup. Just set:

- `SITE_URL` = `https://example.com`
- `BASE_PATH` = `/<repo-name>` (e.g., `/blog`)

The deploy workflow already defaults `BASE_PATH` to `/<repo-name>`, so if you're happy with `example.com/<repo-name>/` as your blog URL, **no configuration is needed at all** — it works out of the box.

## Giscus Comments

To enable GitHub Discussions-powered comments on posts:

1. Install the [Giscus app](https://github.com/apps/giscus) on your repo.
2. Go to [giscus.app](https://giscus.app), fill in your repo details, and copy the generated values.
3. Add these environment variables in **Settings → Environments → github-pages**:
   - `PUBLIC_GISCUS_ENABLED` = `true`
   - `PUBLIC_GISCUS_REPO` = `your-username/your-repo`
   - `PUBLIC_GISCUS_REPO_ID` = _(from giscus.app)_
   - `PUBLIC_GISCUS_CATEGORY` = `Announcements` _(or your chosen category)_
   - `PUBLIC_GISCUS_CATEGORY_ID` = _(from giscus.app)_

## Single Language Mode

This starter ships with English + French (i18n). To run a single-language site:

1. Open `src/config.ts` and set `multilingual: false`.
2. Delete the `src/content/posts/fr/` folder (and `src/content/pages/fr/` if present).
3. Remove the `src/pages/fr/` directory.

The language switcher will disappear and all `hreflang` tags are omitted.

## Customization

| What                            | Where                                |
| ------------------------------- | ------------------------------------ |
| Site title, description, author | `src/config.ts` → `SITE`             |
| Navigation links                | `src/config.ts` → `NAV`              |
| Social links                    | `src/config.ts` → `SOCIAL`           |
| Avatar image                    | `public/images/avatar.svg`           |
| Default OG image                | `public/images/og-default.svg`       |
| Global styles                   | `src/styles/global.css`              |
| Theme colors                    | daisyUI theme tokens in `global.css` |

## Commands

| Command          | Action                               |
| ---------------- | ------------------------------------ |
| `bun dev`        | Start dev server at `localhost:4321` |
| `bun run build`  | Build production site to `./dist/`   |
| `bun preview`    | Preview production build locally     |
| `bun run lint`   | Run ESLint                           |
| `bun run format` | Format with Prettier                 |

## Documentation

For full documentation on all features (i18n, dark mode, math, comments, OG images, etc.), see the [main repository README](https://github.com/kannansuresh/chirping-astro#readme).

## Contributing & Issues

> **This starter repository is automatically synced from the [main Chirping Astro repository](https://github.com/kannansuresh/chirping-astro).** Please do not open pull requests here — changes will be overwritten on the next sync.

- **Found a bug?** [Open an issue](https://github.com/kannansuresh/chirping-astro/issues) on the main repository.
- **Want to contribute?** See the [contributing guide](https://github.com/kannansuresh/chirping-astro/blob/main/CONTRIBUTING.md) on the main repository.
- **Have a question?** Use [Discussions](https://github.com/kannansuresh/chirping-astro/discussions) on the main repository.

## License

MIT — see [LICENSE](./LICENSE).
