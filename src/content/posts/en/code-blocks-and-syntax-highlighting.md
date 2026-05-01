---
title: 'Code blocks & syntax highlighting with Expressive Code'
description: 'Frame titles, copy buttons, line markers, diffs, terminal frames, word wrap and collapsible sections — every Expressive Code feature this theme exposes.'
pubDate: 2026-04-27
tags: [code, syntax-highlighting, expressive-code, shiki, markdown]
categories: [Authoring]
translationKey: code-blocks-and-syntax-highlighting
toc: true
---

Every fenced code block on this site is rendered at build time by
[Expressive Code](https://expressive-code.com), powered by
[Shiki](https://shiki.style). That means **server-rendered, accessible,
copy-pasteable HTML** with no client-side highlighter — only a tiny
script for the copy button.

The integration is configured in
[astro.config.mjs](astro.config.mjs) with two themes:
`github-light` for `chirpy-light`, and `github-dark-dimmed` for
`chirpy-dark`. Switching the site theme instantly flips the code
palette too.

## A plain block

Three backticks plus a language identifier:

```ts
function greet(name: string) {
  return `Hello, ${name}!`;
}
```

## Frame title

Add `title="..."` to label the block — it shows in a window-style
title bar:

```ts title="src/utils/greet.ts"
function greet(name: string) {
  return `Hello, ${name}!`;
}
```

## Terminal frame

Use `frame="terminal"` for shell snippets — Expressive Code switches
to a terminal-style chrome:

```bash title="Terminal" frame="terminal"
bun install
bun run dev
```

To force the **code** frame on something Expressive Code might
auto-detect as a terminal:

```bash frame="code"
echo "this is treated as a code file, not a terminal"
```

## Line markers

Highlight, mark, insert, or delete specific lines.

### Highlight a range

```ts {3-5}
import { defineCollection, z } from 'astro:content';

export const collections = {
  posts: defineCollection({ schema: z.object({ title: z.string() }) }),
};
```

### Insertions

```ts ins={4-6}
import { defineCollection, z } from 'astro:content';

export const collections = {
  posts: defineCollection({
    schema: z.object({ title: z.string() }),
  }),
};
```

### Deletions

```ts del={2}
const old = 'remove me';
const stale = 'and me too';
const keeper = 'survive';
```

### Mark by string

Highlight every occurrence of a literal:

```ts mark="useTranslations"
import { useTranslations } from '../i18n/utils';

const t = useTranslations(locale);
const heading = t('post.comments');
```

## Diffs

The `diff` language is supported natively. Lines starting with `+` and
`-` are coloured automatically.

```diff title="Refactor: hero image source"
- const heroSrc = typeof img === 'string' ? img : img?.src;
+ const heroSrc = heroImageSrc(post);
+ const showHero = shouldShowHero(post);
```

## Collapsible sections

Long files? Collapse parts of the snippet so readers focus on the
relevant bit. Use `collapse={start-end}`:

```ts collapse={1-6} title="src/utils/posts.ts"
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, type Locale } from '../config';

// helper utilities live above
function detectLocale(id: string): Locale {
  return id.startsWith('fr/') ? 'fr' : 'en';
}

export async function getPosts(locale: Locale) {
  const all = await getCollection('posts');
  return all.filter((p) => detectLocale(p.id) === locale);
}
```

Click the collapsed lines indicator to expand the hidden block.

## Word wrap

Long lines are normally horizontal-scrolled. To wrap them instead, use
the `wrap` modifier:

```ts wrap
const veryLongValue =
  'a string that would normally cause a horizontal scrollbar but is now soft-wrapped onto multiple lines for narrow viewports';
```

Add `preserveIndent` to keep wrapped lines aligned with the opening
indentation, or set it once globally in the
[`expressiveCode` block of astro.config.mjs](astro.config.mjs).

## Copy button

Every block has a copy-to-clipboard button in its top-right corner.
The icon switches to a check mark when the copy succeeds, then resets
after a couple of seconds. Translation strings are read from
[src/i18n/ui.ts](src/i18n/ui.ts) (`code.copy`, `code.copied`) so the
French build shows a French label.

## Line numbers

Expressive Code does not show line numbers by default — Chirpy doesn't
either. If you want them, add the
[`@expressive-code/plugin-line-numbers`](https://expressive-code.com/plugins/line-numbers/)
plugin to `astro.config.mjs` and enable it per-block with `showLineNumbers`.

## Putting it together

A realistic block uses several modifiers at once:

```ts title="src/utils/seo.ts" ins={5-7} mark="locale" {2}
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../config';

export function buildSeo(entry: CollectionEntry<'posts'>, locale: Locale) {
  const canonical = entry.data.canonicalURL ?? defaultCanonical(entry, locale);
  const ogImage = entry.data.heroImage ?? '/images/og-default.svg';
  const lang = entry.data.lang ?? locale;
  return { canonical, ogImage, lang };
}
```

## Theme palette tweaks

Open
[astro.config.mjs](astro.config.mjs)
and edit the `expressiveCode` options to swap themes:

```js title="astro.config.mjs" frame="code"
expressiveCode({
  themes: ['github-light', 'github-dark-dimmed'],
  themeCssSelector: (theme) =>
    theme.name === 'github-light' ? '[data-theme="chirpy-light"]' : '[data-theme="chirpy-dark"]',
  styleOverrides: { borderRadius: '0.5rem' },
});
```

Pick any [Shiki bundled theme](https://shiki.style/themes) — both
themes must be listed for the dual-mode CSS to be emitted.
