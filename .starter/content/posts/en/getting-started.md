---
title: 'Getting Started'
description: 'Your first post with Chirping Astro. Learn how to configure your site, write posts, and deploy.'
pubDate: 2026-05-03
tags: [getting-started, tutorial]
categories: [Guide]
translationKey: getting-started
pinned: true
toc: true
---

Welcome to your new blog! This sample post walks you through the basics of using **Chirping Astro**.

## Configure your site

Open `src/config.ts` and update:

- **title** — your site/blog name
- **description** — shown in search engines and RSS
- **author.name** — displayed in the sidebar and footer
- **url** — your production URL (set via `SITE_URL` env var for deploys)

## Environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Key variables:

| Variable               | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `SITE_URL`             | Your production URL (e.g., `https://myblog.com`)           |
| `BASE_PATH`            | Set to `/<repo-name>` for GitHub Pages, blank otherwise    |
| `PUBLIC_GITHUB_HANDLE` | Shows GitHub icon in sidebar                               |
| `PUBLIC_GISCUS_*`      | Enable Giscus comments ([setup guide](https://giscus.app)) |

## Writing posts

Create Markdown files in `src/content/posts/en/`:

```markdown
---
title: 'My Post Title'
description: 'A brief description for SEO and listings.'
pubDate: 2026-05-03
tags: [tag1, tag2]
categories: [Category]
---

Write your content here using standard Markdown.
```

### Available frontmatter fields

| Field         | Required | Description                    |
| ------------- | -------- | ------------------------------ |
| `title`       | Yes      | Post title (1–140 chars)       |
| `description` | Yes      | Meta description (1–280 chars) |
| `pubDate`     | Yes      | Publication date (ISO format)  |
| `tags`        | No       | Array of tags                  |
| `categories`  | No       | Array of categories            |
| `heroImage`   | No       | Path to featured image         |
| `pinned`      | No       | Pin to top of listings         |
| `toc`         | No       | Show table of contents         |
| `draft`       | No       | Hide from production           |

## Using MDX

For richer content, use `.mdx` files to include components:

```mdx
---
title: 'MDX Example'
description: 'Using components in posts.'
pubDate: 2026-05-03
tags: [mdx]
categories: [Guide]
---

import Callout from '../../components/Callout.astro';

<Callout type="tip">You can embed Astro components directly in your posts!</Callout>
```

## Deploy

Push to `main` on GitHub. The included workflow builds and deploys to GitHub Pages automatically.

For custom domains, set `SITE_URL` in your repository's environment variables under **Settings → Environments → github-pages**.

## Learn more

- [Full documentation](https://github.com/kannansuresh/chirping-astro)
- [Live demo](https://kannansuresh.github.io/chirping-astro)
- [Astro docs](https://docs.astro.build)

---

Happy blogging! Delete this post when you're ready to publish your own content.
