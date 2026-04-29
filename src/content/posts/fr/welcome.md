---
title: Bienvenue sur Chirping Astro
description: Une visite guidée de ce thème Astro v6 + Tailwind v4 + daisyUI — i18n, MDX, Pagefind et Giscus, tout est inclus.
pubDate: 2026-04-12
updatedDate: 2026-04-22
tags: [astro, tailwind, daisyui, theme]
categories: [Annonces]
translationKey: welcome
heroImage: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop
heroImageAlt: Un clavier MacBook photographié en gros plan
pinned: true
toc: true
---

Bonjour ! Voici le premier article de **Chirping Astro**, un thème distribuable
au format unique, inspiré de [Chirpy](https://chirpy.cotes.page/) et écrit
de zéro de manière idiomatique avec [Astro](https://astro.build).

## Le contenu de la boîte

Le thème embarque tout ce que vous attendez d'un blog technique moderne :

- Une mise en page éditoriale familière à trois colonnes, façon Chirpy.
- Internationalisation **EN + FR** prête à l'emploi, avec l'anglais à la racine.
- Pages de tags, catégories et archives annuelles.
- Temps de lecture et **table des matières** par article avec scroll-spy.
- Recherche embarquée alimentée par **Pagefind** à la compilation.
- Commentaires **Giscus** synchronisés avec le thème et la langue du site.

## Un exemple de code

L'écriture de code est une priorité. Chaque bloc clos est rendu avec
[Expressive Code](https://expressive-code.com) : coloration syntaxique,
cadres avec titre, bouton « copier » et marqueurs de lignes inclus.

```ts title="src/content.config.ts"
import { defineCollection, z } from 'astro:content';

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
    }),
  }),
};
```

## Encadrés (callouts)

Vous pouvez ajouter des encadrés réutilisables en MDX via le composant
`<Callout>`. En Markdown classique, il suffit d'envelopper un paragraphe
dans un `div.callout` :

<div class="callout callout-info">
  <strong>Astuce :</strong> définissez <code>toc: false</code> dans le
  frontmatter pour masquer la table des matières d'un article.
</div>

## Et les images ?

Les images peuvent être référencées via un chemin public ou importées via le
pipeline d'assets d'Astro (recommandé pour les articles écrits en MDX).

## La suite ?

Explorez la [démo Astro & MDX](/fr/posts/astro-mdx-demo) pour voir les
fonctionnalités exclusives à MDX, ou utilisez le [sélecteur de langue](#)
pour lire ce même article en anglais.
