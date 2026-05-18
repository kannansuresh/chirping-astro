---
title: 'This post is unlisted — you found it!'
description: 'A sample unlisted post. It is accessible at this URL but does not appear in any listing, RSS feed, or sitemap. Search engines are also asked not to index it.'
pubDate: 2026-05-18
tags: [authoring, unlisted, demo]
categories: [Reference]
translationKey: unlisted-sample-post
unlisted: true
toc: false
comments: false
---

You're reading a post that is **completely invisible** to anyone browsing
the site normally. It doesn't appear on:

- The home page
- Any paginated listing (`/page/2/`, etc.)
- The [Archives](/archives/) page
- The [Tags](/tags/) index or any tag page
- The [Categories](/categories/) index or any category page
- The RSS feed (`/rss.xml`)
- The sitemap (`/sitemap-index.xml`)
- Prev / Next navigation on other posts

The only way to reach this page is with the direct URL — which is exactly
the point of `unlisted: true`.

## What's in the page source

Open your browser's developer tools and look at the `<head>`. You'll find:

```html
<meta name="robots" content="noindex, nofollow" />
```

That tag asks search engines not to index this page and not to follow its
outbound links. It's added automatically whenever `unlisted: true` is set,
because `unlistedHideFromSeo` defaults to `true`.

## The frontmatter that makes this work

```yaml
---
title: 'This post is unlisted — you found it!'
description: '...'
pubDate: 2026-05-18
unlisted: true
# unlistedHideFromSeo: true  ← this is the default, no need to write it
---
```

That's it. One field.

## Want to keep it indexable?

If you want the post hidden from your own listings but still discoverable
by search engines, add:

```yaml
unlisted: true
unlistedHideFromSeo: false
```

The `noindex` meta tag will be omitted and Google can index the page
normally.

---

Head back to the [Unlisted posts guide](/posts/unlisted-posts) for the
full explanation of every option.
