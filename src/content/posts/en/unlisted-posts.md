---
title: 'Unlisted posts: share without publishing'
description: 'How to make a post accessible by direct link while keeping it out of listings, RSS, the sitemap, and search engine indexes — and when to use each option.'
pubDate: 2026-05-18
tags: [authoring, frontmatter, unlisted, privacy]
categories: [Reference]
translationKey: unlisted-posts
toc: true
comments: false
---

Sometimes you want a post to exist at a URL without broadcasting it to
every visitor. A few real scenarios:

- Sharing a draft with a reviewer before it's ready to publish
- A changelog entry you want to link to from a release note, but not
  surface in the blog feed
- Internal documentation that lives on the public site but isn't meant
  for general discovery
- A post you've retired but still need to keep alive for existing links

The `unlisted` frontmatter field handles all of these.

## How it works

Set `unlisted: true` in a post's frontmatter:

```yaml
---
title: My unlisted post
description: Only visible via direct link.
pubDate: 2026-05-18
unlisted: true
---
```

That single flag does the following:

| Surface                              | Effect                                             |
| ------------------------------------ | -------------------------------------------------- |
| Home page listing                    | Hidden                                             |
| Paginated listing (`/page/2/`, etc.) | Hidden                                             |
| Archives page                        | Hidden                                             |
| Tags index and tag pages             | Hidden (tag counts exclude this post)              |
| Categories index and category pages  | Hidden (category counts exclude this post)         |
| RSS feed                             | Excluded                                           |
| Sitemap                              | Excluded                                           |
| Prev / Next post navigation          | Not linked                                         |
| The post URL itself                  | **Still works** — anyone with the link can read it |

The post is built and deployed normally. Only discovery is suppressed.

## SEO: the `unlistedHideFromSeo` field

By default, an unlisted post also gets:

```html
<meta name="robots" content="noindex, nofollow" />
```

This tells search engines not to index the page and not to follow its
outbound links. It's the right default — if you're hiding a post from
your own listings, you probably don't want Google surfacing it either.

You can control this independently with `unlistedHideFromSeo`:

```yaml
# Unlisted from all listings, AND hidden from search engines (default)
unlisted: true
# unlistedHideFromSeo defaults to true — no need to write it explicitly
```

```yaml
# Unlisted from listings, but still indexable by search engines
# (e.g. you want Google to find it, just not your own nav)
unlisted: true
unlistedHideFromSeo: false
```

```yaml
# Fully listed in your site, but hidden from search engines
# (e.g. a page you want readers to find via your nav, not via Google)
unlisted: false
unlistedHideFromSeo: true
```

The two fields are independent. Mix them however your use case requires.

## Unlisted vs draft

These two fields solve different problems:

|                                         | `draft: true` | `unlisted: true`    |
| --------------------------------------- | ------------- | ------------------- |
| Visible in `bun run dev`                | ✅ Yes        | ✅ Yes              |
| URL generated in production build       | ❌ No         | ✅ Yes              |
| Accessible by direct link in production | ❌ No         | ✅ Yes              |
| Hidden from listings / RSS / sitemap    | ✅ Yes        | ✅ Yes              |
| `noindex` robots meta                   | N/A (no URL)  | ✅ Yes (by default) |

Use `draft` when the post isn't ready to exist at all. Use `unlisted`
when the post is ready but you want to control who finds it.

## Seeing it in action

This theme ships with a sample unlisted post so you can verify the
behaviour yourself. It does **not** appear anywhere in the site
navigation, listings, or RSS — but it is live at this URL:

👉 [/posts/unlisted-sample-post](/posts/unlisted-sample-post)

Open that link, then check:

- The home page — the post is not there
- The [Archives](/archives/) — not there
- The RSS feed (`/rss.xml`) — not there
- The page source — you'll see `<meta name="robots" content="noindex, nofollow">`

## A note on truly private content

`unlisted` is **security through obscurity**, not access control. The
post is public — anyone who discovers the URL can read it. If you need
genuinely private content, keep it out of the repository entirely or
use a platform that supports authentication.
