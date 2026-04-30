---
title: 'Bienvenue sur Chirping Astro'
description: "Commencez ici. Une visite guidée de toutes les fonctionnalités de ce thème Astro v6 + Tailwind v4 + daisyUI — et la liste des articles dédiés qui détaillent chacune d'entre elles."
pubDate: 2026-04-30
updatedDate: 2026-04-30
tags: [astro, tailwind, daisyui, theme, demarrage]
categories: [Annonces]
translationKey: welcome
heroImage: ../../../assets/devices-mockup.png
heroImageAlt: 'Rendu adaptatif du thème Astro Chirping sur plusieurs appareils.'
pinned: true
toc: true
---

Bonjour, et bienvenue. **Chirping Astro** est un thème mono-template
multilingue inspiré de [Chirpy](https://chirpy.cotes.page/), réécrit
intégralement en TypeScript strict, avec Tailwind v4, daisyUI v5, MDX,
Pagefind et Giscus.

Cet article est la porte d'entrée. Tous les autres articles de ce site
sont des tutoriels ciblés sur une seule fonctionnalité — commencez par
celui qui correspond à ce que vous voulez apprendre en premier.

## Ce que ce thème vous offre

- **Mise en page Chirpy à trois colonnes** — barre latérale avec avatar
  et navigation, colonne de lecture centrale, et panneau de droite
  affichant la table des matières sur les articles ou « Récemment mis
  à jour / Tags populaires » sur les listings.
- **i18n de premier ordre** — anglais à la racine de l'URL, français
  sous `/fr`, avec un sélecteur de langue intelligent qui retombe sur
  l'article traduit équivalent quand il existe.
- **Markdown + MDX** avec [Expressive Code](https://expressive-code.com)
  pour la coloration syntaxique, les boutons de copie, les titres de
  cadre, les marqueurs de lignes, les diffs et les sections repliables.
- **Mathématiques LaTeX** via KaTeX, pré-rendues à la compilation avec
  **zéro JavaScript côté client** — la feuille de style ne se charge
  que sur les pages qui en font la demande.
- **Recherche Pagefind** — une modale dans l'en-tête avec les
  raccourcis `/` et `Cmd/Ctrl+K`, plus une page dédiée `/fr/search/`.
- **Commentaires Giscus** branchés sur GitHub Discussions, synchronisés
  avec le thème et la locale, avec un override par article.
- **Deux thèmes daisyUI** (`chirpy-light` / `chirpy-dark`) avec un
  bouton de bascule animé qui utilise l'API View Transitions quand
  elle est disponible.
- **Temps de lecture, table des matières flottante avec scroll-spy,
  RSS par locale, sitemap hreflang, gestion accessible du focus** —
  les détails ennuyeux faits correctement.

## Découvrez les fonctionnalités, un article à la fois

Chacun des articles ci-dessous est dédié à une seule fonctionnalité.
Ils servent aussi de démos : l'article qui parle de mathématiques
active lui-même `math: true`, celui qui parle d'images à la une
arbore une image à la une, etc.

| Fonctionnalité         | Lisez cet article                                                           |
| ---------------------- | --------------------------------------------------------------------------- |
| Frontmatter & schéma   | [Référence du frontmatter](/fr/posts/frontmatter-reference)                 |
| Typographie & Markdown | [Typographie & Markdown](/fr/posts/typography-and-markdown)                 |
| Blocs de code          | [Blocs de code & coloration](/fr/posts/code-blocks-and-syntax-highlighting) |
| Mathématiques LaTeX    | [Mathématiques LaTeX avec KaTeX](/fr/posts/latex-math-with-katex)           |
| Composants MDX         | [Composants MDX & callouts](/fr/posts/mdx-components-and-callouts)          |
| i18n                   | [Contenu bilingue & i18n](/fr/posts/i18n-bilingual-content)                 |
| Recherche              | [Recherche avec Pagefind](/fr/posts/search-with-pagefind)                   |
| Commentaires           | [Commentaires avec Giscus](/fr/posts/comments-with-giscus)                  |
| Thème                  | [Thème & mode sombre](/fr/posts/theming-and-dark-mode)                      |
| Images à la une        | [Images à la une & médias](/fr/posts/featured-images-and-media)             |

## Épinglé ou non

Cet article est épinglé — c'est le drapeau `pinned: true` du
frontmatter qui s'en charge. Les articles épinglés se classent toujours
en tête des listings et de la page d'accueil, même si des articles
plus récents existent.

## À propos du code idiomatique

Tout dans ce projet est conçu pour se lire comme un projet Astro
normal, pas comme un magma de configuration. Pour l'étendre :

- Les composants vivent dans [src/components/](src/components/) et
  [src/components/islands/](src/components/islands/).
- Les layouts vivent dans [src/layouts/](src/layouts/).
- Tous les boutons du site sont dans [src/config.ts](src/config.ts).
- Les traductions sont dans [src/i18n/ui.ts](src/i18n/ui.ts).

L'installation du thème depuis un clone vierge est documentée en
détail dans le **`README.md`** à la racine du dépôt — ouvrez-le dans
votre éditeur, ou cliquez sur le lien **Chirping Astro** du pied de
page pour rejoindre le dépôt GitHub configuré (renseignez
`PUBLIC_GITHUB_HANDLE` et `PUBLIC_GITHUB_REPO` dans `.env`).

Bonne écriture. ✨
