---
title: 'Référence du frontmatter : tous les champs reconnus par ce thème'
description: 'Référence complète du schéma de frontmatter pour les articles et les pages — champs requis et optionnels, valeurs par défaut, règles de validation et rôle de chacun.'
pubDate: 2026-04-29
tags: [redaction, frontmatter, schema, reference]
categories: [Référence]
translationKey: frontmatter-reference
toc: true
---

Ce thème utilise les **Content Collections d'Astro** avec un schéma
[Zod](https://zod.dev) strict. Chaque article et chaque page sont
typés à la compilation : un champ requis manquant ou une faute de
frappe dans `pubDate` fait échouer le build au lieu de casser
silencieusement le site.

Le schéma complet vit dans
[src/content.config.ts](src/content.config.ts). Voici à quoi sert
chaque champ, quand l'utiliser, et sa valeur par défaut.

## Champs requis

| Champ         | Type   | Notes                                              |
| ------------- | ------ | -------------------------------------------------- |
| `title`       | string | 1–140 caractères. Utilisé comme `<title>`, OG, H1. |
| `description` | string | 1–280 caractères. Méta description, OG, RSS.       |
| `pubDate`     | date   | Coercé depuis toute chaîne ISO valide.             |

Pour les pages (`src/content/pages/**`), `pubDate` est **optionnel** —
les pages ne sont ni paginées ni archivées.

## Champs optionnels, en clair

### `updatedDate`

```yaml
updatedDate: 2026-05-12
```

À renseigner à chaque modification significative. Cela alimente la
ligne « Mis à jour » de l'en-tête de l'article, la balise RSS
`<updated>`, le meta OG `article:modified_time` et l'entrée du sitemap.

### `tags` et `categories`

```yaml
tags: [typescript, astro, accessibilite]
categories: [Tutoriels]
```

Les deux ont pour défaut `[]`. Les tags alimentent l'index `/fr/tags/...`,
les catégories alimentent `/fr/categories/...`. Aucune casse n'est
imposée — choisissez une convention et tenez-la.

### `draft`

```yaml
draft: true
```

Défaut `false`. Quand vrai, l'article est inclus en mode dev mais
**exclu** des builds de production, du sitemap et du flux RSS.

### `heroImage` et `heroImageAlt`

```yaml
heroImage: ../../../assets/coastline.jpg
heroImageAlt: 'Une longue exposition de vagues sur une côte rocheuse'
```

Trois formes sont acceptées :

- Un chemin **relatif au fichier markdown** vers `src/assets/` —
  résolu via le helper `image()` d'Astro, entièrement optimisé
  (WebP + `srcset` responsive). Recommandé.
- Un chemin absolu sous `/public/...` — servi tel quel, sans
  optimisation.
- Une URL externe `https://...` — optimisée au build si l'hôte est
  autorisé dans `image.remotePatterns` (voir
  [`astro.config.mjs`](astro.config.mjs)).

L'image est utilisée comme vignette de carte sur les listings et
comme bannière sur la page d'article. `heroImageAlt` devient
l'attribut `alt` — remplissez-le toujours.

L'article compagnon
[Images à la une & médias](/fr/posts/featured-images-and-media) entre
dans le détail de l'auteur d'images.

### `showFeaturedImage`

```yaml
showFeaturedImage: false
```

Override par article de `SITE.showFeaturedImages`
([src/config.ts](src/config.ts)). Mettre `false` pour supprimer la
bannière sur un article malgré la valeur par défaut.

Pour le comportement de hauteur des cartes de listing (fixe vs
dynamique), utilisez `SITE.dynamicPostCardHeight` dans
[src/config.ts](src/config.ts) comme défaut global, ou
`dynamicPostCardHeight` dans le frontmatter pour un override par
article.

### `dynamicPostCardHeight`

```yaml
dynamicPostCardHeight: true
```

Override optionnel par article de `SITE.dynamicPostCardHeight`. Cela
agit uniquement sur le comportement de la carte de l'article dans les
listings horizontaux :

- `true` : la carte peut s'étendre (hauteur dynamique).
- `false` : la carte garde une hauteur fixe style Chirpy.
- omis : retour au réglage global `SITE.dynamicPostCardHeight`.

### `canonicalURL`

```yaml
canonicalURL: https://exemple.com/url/canonique/
```

Override optionnel pour `<link rel="canonical">`. Utile lorsque
l'article est republié et existe ailleurs en version officielle.

### `comments`

```yaml
comments: false
```

Bascule par article pour Giscus. Si omis, suit le réglage global
`GISCUS.enabled`. Mettre explicitement `false` pour désactiver les
commentaires sur un article (par exemple cette page de référence).

### `toc`

```yaml
toc: false
```

Défaut `true`. La table des matières flottante de droite est construite
à partir des H2–H4 avec scroll-spy. Certains articles (un essai photo,
une annonce courte) se lisent mieux sans — mettez `toc: false`.

### `pinned`

```yaml
pinned: true
```

Les articles épinglés se classent toujours en tête des listings et
de la page d'accueil. À utiliser avec parcimonie.

### `math`

```yaml
math: true
```

Active KaTeX sur l'article. La feuille de style (`katex.min.css`,
~29 ko) n'est chargée **que** sur les pages qui activent ce drapeau.
Voir l'[article sur les mathématiques](/fr/posts/latex-math-with-katex).

### `lang`

```yaml
lang: fr
```

Override de locale. Le thème **infère** normalement la locale depuis
le chemin du fichier (`posts/en/...` → `en`, `posts/fr/...` → `fr`),
donc rarement utile.

### `translationKey`

```yaml
translationKey: welcome
```

Le pont entre les versions EN et FR du même article. Deux articles
qui partagent la même `translationKey` sont considérés comme
traductions l'un de l'autre ; le sélecteur de langue s'en sert pour
emmener le lecteur sur la version équivalente plutôt que vers la
page d'accueil de la locale. Si omis, le thème retombe sur le slug
du fichier. L'[article sur l'i18n](/fr/posts/i18n-bilingual-content)
détaille tout cela.

## Champ exclusif aux pages : `showInNav`

Les pages (`src/content/pages/**`) acceptent tout ce que les articles
acceptent (avec `pubDate` optionnel) plus :

```yaml
showInNav: true
```

Réservé pour usage futur ; la navigation est actuellement pilotée par
le tableau `NAV` de [src/config.ts](src/config.ts).

## Un exemple complet

```yaml title="src/content/posts/fr/exemple.md" frame="code"
---
title: Un exemple complet
description: Démontre tous les champs en un seul fichier.
pubDate: 2026-05-01
updatedDate: 2026-05-03
tags: [exemple, reference]
categories: [Référence]
draft: false
heroImage: ../../../assets/coastline.jpg
heroImageAlt: Une longue exposition d'une côte rocheuse
showFeaturedImage: true
canonicalURL: https://exemple.com/exemple/
comments: true
toc: true
pinned: false
math: false
translationKey: exemple
---
```

## Erreurs de validation possibles

| Erreur                            | Signification                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `pubDate: Required`               | `pubDate` oublié (ou mal orthographié).                                            |
| `description: Too long (max 280)` | Description supérieure à 280 caractères.                                           |
| `heroImage: Invalid URL`          | (URL externe qui échoue au parse Zod.)                                             |
| `Cannot find module '...'`        | Chemin d'import MDX incorrect — vérifier le chemin relatif vers `src/components/`. |

Les commentaires sont volontairement **désactivés** sur cet article
via `comments: false` — c'est une référence, pas une discussion.
