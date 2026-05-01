---
title: 'Blocs de code & coloration syntaxique avec Expressive Code'
description: 'Titres de cadre, boutons de copie, marqueurs de lignes, diffs, cadres terminal, retour à la ligne et sections repliables — toutes les fonctionnalités Expressive Code exposées par ce thème.'
pubDate: 2026-04-27
tags: [code, coloration-syntaxique, expressive-code, shiki, markdown]
categories: [Rédaction]
translationKey: code-blocks-and-syntax-highlighting
toc: true
---

Tous les blocs de code de ce site sont rendus à la compilation par
[Expressive Code](https://expressive-code.com), propulsé par
[Shiki](https://shiki.style). Cela signifie un **HTML accessible,
copiable, rendu côté serveur** sans coloriseur côté client — seulement
un petit script pour le bouton de copie.

L'intégration est configurée dans
[astro.config.mjs](astro.config.mjs) avec deux thèmes :
`github-light` pour `chirpy-light`, et `github-dark-dimmed` pour
`chirpy-dark`. Basculer le thème du site bascule instantanément la
palette du code.

## Un bloc simple

Trois backticks plus un identifiant de langage :

```ts
function saluer(nom: string) {
  return `Bonjour, ${nom} !`;
}
```

## Titre de cadre

Ajoutez `title="..."` pour étiqueter le bloc — il apparaît dans une
barre de titre style fenêtre :

```ts title="src/utils/saluer.ts"
function saluer(nom: string) {
  return `Bonjour, ${nom} !`;
}
```

## Cadre terminal

Utilisez `frame="terminal"` pour les snippets shell — Expressive Code
bascule sur un chrome de type terminal :

```bash title="Terminal" frame="terminal"
bun install
bun run dev
```

Pour forcer le cadre **code** sur quelque chose qu'Expressive Code
détecterait comme un terminal :

```bash frame="code"
echo "traité comme un fichier code, pas un terminal"
```

## Marqueurs de lignes

Surlignez, marquez, insérez ou supprimez des lignes spécifiques.

### Surligner une plage

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

### Suppressions

```ts del={2}
const ancien = 'à supprimer';
const obsolete = 'moi aussi';
const conserve = 'survit';
```

### Marquer par chaîne

Surligner chaque occurrence d'un littéral :

```ts mark="useTranslations"
import { useTranslations } from '../i18n/utils';

const t = useTranslations(locale);
const titre = t('post.comments');
```

## Diffs

Le langage `diff` est supporté nativement. Les lignes commençant par
`+` et `-` sont colorées automatiquement.

```diff title="Refactor : source d'image hero"
- const heroSrc = typeof img === 'string' ? img : img?.src;
+ const heroSrc = heroImageSrc(post);
+ const showHero = shouldShowHero(post);
```

## Sections repliables

Long fichier ? Repliez les parties non pertinentes pour focaliser le
lecteur. Utilisez `collapse={start-end}` :

```ts collapse={1-6} title="src/utils/posts.ts"
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, type Locale } from '../config';

// utilitaires d'aide au-dessus
function detectLocale(id: string): Locale {
  return id.startsWith('fr/') ? 'fr' : 'en';
}

export async function getPosts(locale: Locale) {
  const all = await getCollection('posts');
  return all.filter((p) => detectLocale(p.id) === locale);
}
```

Cliquez sur l'indicateur de lignes repliées pour développer le bloc.

## Retour à la ligne

Les longues lignes défilent normalement à l'horizontale. Pour les
faire passer à la ligne, ajoutez `wrap` :

```ts wrap
const valeurTresLongue =
  'une chaîne qui causerait normalement un défilement horizontal mais qui passe à la ligne sur les viewports étroits';
```

## Bouton de copie

Chaque bloc dispose d'un bouton de copie en haut à droite. L'icône
passe à une coche quand la copie réussit, puis se réinitialise. Les
chaînes de traduction proviennent de
[src/i18n/ui.ts](src/i18n/ui.ts) (`code.copy`, `code.copied`), donc
le build français affiche un libellé français.

## Numéros de ligne

Expressive Code ne montre pas les numéros de ligne par défaut — Chirpy
non plus. Si vous les voulez, ajoutez le plugin
[`@expressive-code/plugin-line-numbers`](https://expressive-code.com/plugins/line-numbers/)
à `astro.config.mjs` et activez-le par bloc avec `showLineNumbers`.

## Tout combiner

Un bloc réaliste combine plusieurs modificateurs :

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

## Personnaliser la palette

Ouvrez [astro.config.mjs](astro.config.mjs) et modifiez les options
`expressiveCode` pour changer de thèmes :

```js title="astro.config.mjs" frame="code"
expressiveCode({
  themes: ['github-light', 'github-dark-dimmed'],
  themeCssSelector: (theme) =>
    theme.name === 'github-light' ? '[data-theme="chirpy-light"]' : '[data-theme="chirpy-dark"]',
  styleOverrides: { borderRadius: '0.5rem' },
});
```

Choisissez n'importe quel [thème Shiki](https://shiki.style/themes) —
les deux thèmes doivent être listés pour que le CSS double mode soit
émis.
