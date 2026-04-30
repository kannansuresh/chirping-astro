---
title: À propos
description: Chirping Astro — un thème Astro multilingue inspiré de Chirpy, pensé pour les rédacteurs et les bricoleurs.
translationKey: about
---

**Chirping Astro** est un thème open source qui apporte l'apparence et
l'esprit du célèbre [thème Jekyll Chirpy](https://chirpy.cotes.page/)
à [Astro](https://astro.build/) — avec une internationalisation
de premier ordre, une chaîne d'outils moderne, et zéro JavaScript
requis pour lire les articles.

Il s'adresse aux blogs personnels, aux carnets techniques et aux
sites de documentation où la typographie, la recherche et une lecture
calme comptent plus que les animations et les espaces publicitaires.

## Ce qui est inclus

- **Mise en page axée sur la lecture** — barre latérale gauche fixe avec
  avatar, navigation verticale, bascule de thème et liens sociaux ;
  colonne principale centrée plafonnée à 1250 px ; rail droit avec
  « Récemment mis à jour » et « Tags populaires ».
- **Thèmes clair & sombre** — la palette Chirpy d'origine, portée sur
  les tokens daisyUI v5, avec une transition circulaire entre les modes.
- **Contenu bilingue (EN + FR)** — l'anglais à la racine, le français
  sous `/fr/`. Les articles sont appariés par `translationKey`, et un
  sélecteur de langue dans la barre latérale bascule entre les versions.
- **Markdown + MDX** — Content Collections d'Astro avec frontmatter
  typé, coloration syntaxique Shiki, GFM, notes de bas de page, table
  des matières automatique, et un composant `<Callout>` prêt à l'emploi.
- **Mathématiques LaTeX** — prise en charge KaTeX optionnelle par
  article via `math: true`.
- **Recherche instantanée** — [Pagefind](https://pagefind.app/) génère
  un index statique à la compilation ; l'overlay de recherche se
  charge à la demande.
- **Commentaires** — intégration [Giscus](https://giscus.app/) basée
  sur les Discussions GitHub, avec désactivation par article.
- **Navigation fluide** — transitions de vue Astro avec un fondu
  discret et un repli respectant `prefers-reduced-motion`.
- **SEO d'emblée** — OpenGraph, cartes Twitter, flux RSS par locale,
  hreflang, et plan du site.

## Construit avec

- [**Astro 6.x**](https://astro.build/) — Content Collections, MDX,
  RSS et view transitions
- [**Tailwind CSS v4**](https://tailwindcss.com/) via le plugin
  `@tailwindcss/vite`, avec [**daisyUI v5**](https://daisyui.com/) pour
  le théming
- [**Pagefind**](https://pagefind.app/) pour la recherche statique
- [**Giscus**](https://giscus.app/) pour les commentaires
- [**Shiki**](https://shiki.style/), [**KaTeX**](https://katex.org/),
  et les icônes [**Lucide**](https://lucide.dev/)

## Personnalisez-le

La quasi-totalité de la configuration passe par un seul fichier typé
[`src/config.ts`](https://github.com/) — titre du site, auteur,
navigation, liens sociaux, articles par page, locale par défaut,
identifiants Giscus, et indicateurs de fonctionnalités. Redémarrez
`bun run dev` après l'avoir modifié.

Les nouveaux articles vont dans `src/content/posts/<locale>/`. Appariez
les traductions en utilisant la même `translationKey` dans les deux
fichiers. La référence du frontmatter sur ce site de démo détaille
chaque champ.

## Licence & crédits

Distribué sous **licence MIT**. Le design visuel est un hommage à
[Chirpy de Cotes Chung](https://github.com/cotes2020/jekyll-theme-chirpy) ;
l'implémentation Astro, le contenu et le code sont indépendants.
