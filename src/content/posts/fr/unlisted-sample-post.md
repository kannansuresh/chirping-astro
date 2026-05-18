---
title: "Cet article est non listé — vous l'avez trouvé !"
description: "Un article non listé d'exemple. Accessible à cette URL mais absent de tous les listings, flux RSS et sitemap. Les moteurs de recherche sont également invités à ne pas l'indexer."
pubDate: 2026-05-18
tags: [redaction, non-liste, demo]
categories: [Référence]
translationKey: unlisted-sample-post
unlisted: true
toc: false
comments: false
---

Vous lisez un article **complètement invisible** pour quiconque navigue
normalement sur le site. Il n'apparaît pas dans :

- La page d'accueil
- Les listings paginés (`/fr/page/2/`, etc.)
- La page [Archives](/fr/archives/)
- L'index [Tags](/fr/tags/) ni aucune page de tag
- L'index [Catégories](/fr/categories/) ni aucune page de catégorie
- Le flux RSS (`/fr/rss.xml`)
- Le sitemap (`/sitemap-index.xml`)
- La navigation Précédent / Suivant sur les autres articles

Le seul moyen d'atteindre cette page est l'URL directe — c'est
précisément l'objectif de `unlisted: true`.

## Ce qu'on trouve dans le code source

Ouvrez les outils de développement de votre navigateur et regardez le
`<head>`. Vous trouverez :

```html
<meta name="robots" content="noindex, nofollow" />
```

Cette balise demande aux moteurs de recherche de ne pas indexer cette
page et de ne pas suivre ses liens sortants. Elle est ajoutée
automatiquement dès que `unlisted: true` est défini, car
`unlistedHideFromSeo` vaut `true` par défaut.

## Le frontmatter qui rend cela possible

```yaml
---
title: 'Cet article est non listé — vous l'avez trouvé !'
description: '...'
pubDate: 2026-05-18
unlisted: true
# unlistedHideFromSeo: true  ← c'est la valeur par défaut
---
```

C'est tout. Un seul champ.

## Garder l'article indexable ?

Si vous voulez que l'article soit caché de vos propres listings mais
toujours découvrable par les moteurs de recherche, ajoutez :

```yaml
unlisted: true
unlistedHideFromSeo: false
```

La balise meta `noindex` sera omise et Google pourra indexer la page
normalement.

---

Retournez au [guide des articles non listés](/fr/posts/unlisted-posts)
pour l'explication complète de toutes les options.
