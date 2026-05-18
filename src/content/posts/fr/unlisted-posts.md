---
title: 'Articles non listés : partager sans publier'
description: 'Comment rendre un article accessible par lien direct tout en le gardant hors des listings, du RSS, du sitemap et des moteurs de recherche — et quand utiliser chaque option.'
pubDate: 2026-05-18
tags: [redaction, frontmatter, non-liste, confidentialite]
categories: [Référence]
translationKey: unlisted-posts
toc: true
comments: false
---

Parfois, vous voulez qu'un article existe à une URL sans le diffuser à
tous les visiteurs. Quelques cas concrets :

- Partager un brouillon avec un relecteur avant qu'il soit prêt à publier
- Une note de version que vous voulez lier depuis une release, mais pas
  faire remonter dans le flux du blog
- De la documentation interne qui vit sur le site public mais n'est pas
  destinée à la découverte générale
- Un article retiré que vous devez conserver pour les liens existants

Le champ de frontmatter `unlisted` gère tous ces cas.

## Comment ça fonctionne

Ajoutez `unlisted: true` dans le frontmatter d'un article :

```yaml
---
title: Mon article non listé
description: Visible uniquement via lien direct.
pubDate: 2026-05-18
unlisted: true
---
```

Ce seul drapeau produit les effets suivants :

| Surface                                     | Effet                                                      |
| ------------------------------------------- | ---------------------------------------------------------- |
| Listing de la page d'accueil                | Masqué                                                     |
| Listing paginé (`/fr/page/2/`, etc.)        | Masqué                                                     |
| Page des archives                           | Masqué                                                     |
| Index des tags et pages de tags             | Masqué (les compteurs excluent cet article)                |
| Index des catégories et pages de catégories | Masqué (les compteurs excluent cet article)                |
| Flux RSS                                    | Exclu                                                      |
| Sitemap                                     | Exclu                                                      |
| Navigation Précédent / Suivant              | Non lié                                                    |
| L'URL de l'article lui-même                 | **Fonctionne toujours** — quiconque a le lien peut le lire |

L'article est compilé et déployé normalement. Seule la découverte est
supprimée.

## SEO : le champ `unlistedHideFromSeo`

Par défaut, un article non listé reçoit également :

```html
<meta name="robots" content="noindex, nofollow" />
```

Cela indique aux moteurs de recherche de ne pas indexer la page et de
ne pas suivre ses liens sortants. C'est le bon défaut — si vous cachez
un article de vos propres listings, vous ne voulez probablement pas que
Google le remonte non plus.

Vous pouvez contrôler cela indépendamment avec `unlistedHideFromSeo` :

```yaml
# Non listé ET caché des moteurs de recherche (comportement par défaut)
unlisted: true
# unlistedHideFromSeo vaut true par défaut — inutile de l'écrire
```

```yaml
# Non listé, mais toujours indexable par les moteurs de recherche
# (ex. : vous voulez que Google le trouve, juste pas votre propre nav)
unlisted: true
unlistedHideFromSeo: false
```

```yaml
# Listé normalement sur votre site, mais caché des moteurs de recherche
# (ex. : une page que vous voulez que les lecteurs trouvent via votre nav,
# pas via Google)
unlisted: false
unlistedHideFromSeo: true
```

Les deux champs sont indépendants. Combinez-les selon votre cas d'usage.

## Non listé vs brouillon

Ces deux champs résolvent des problèmes différents :

|                                          | `draft: true`   | `unlisted: true`    |
| ---------------------------------------- | --------------- | ------------------- |
| Visible dans `bun run dev`               | ✅ Oui          | ✅ Oui              |
| URL générée en production                | ❌ Non          | ✅ Oui              |
| Accessible par lien direct en production | ❌ Non          | ✅ Oui              |
| Masqué des listings / RSS / sitemap      | ✅ Oui          | ✅ Oui              |
| Meta robots `noindex`                    | N/A (pas d'URL) | ✅ Oui (par défaut) |

Utilisez `draft` quand l'article n'est pas encore prêt à exister.
Utilisez `unlisted` quand l'article est prêt mais que vous voulez
contrôler qui le trouve.

## Le voir en action

Ce thème inclut un article non listé d'exemple pour que vous puissiez
vérifier le comportement vous-même. Il n'apparaît **nulle part** dans
la navigation, les listings ou le RSS du site — mais il est en ligne à
cette URL :

👉 [/fr/posts/unlisted-sample-post](/fr/posts/unlisted-sample-post)

Ouvrez ce lien, puis vérifiez :

- La page d'accueil — l'article n'y est pas
- Les [Archives](/fr/archives/) — pas là non plus
- Le flux RSS (`/fr/rss.xml`) — pas là non plus
- Le code source de la page — vous verrez `<meta name="robots" content="noindex, nofollow">`

## Une note sur le contenu vraiment privé

`unlisted` repose sur **la sécurité par l'obscurité**, pas sur le
contrôle d'accès. L'article est public — quiconque découvre l'URL peut
le lire. Si vous avez besoin d'un contenu véritablement privé, gardez-le
hors du dépôt ou utilisez une plateforme qui prend en charge
l'authentification.
