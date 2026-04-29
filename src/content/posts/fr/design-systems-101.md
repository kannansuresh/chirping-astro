---
title: Les design systems en 101
description: Une introduction pratique aux design systems — ce qu'ils sont, ce qu'ils ne sont pas, et comment en démarrer un sans partir six mois en aparté.
pubDate: 2026-04-18
tags: [design, design-systems, frontend]
categories: [Guides]
translationKey: design-systems-101
heroImage: https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1600&q=80&auto=format&fit=crop
heroImageAlt: Un bureau de designer avec des nuanciers et un carnet de croquis
toc: true
---

Un design system, ce n'est pas un fichier Figma. Ce n'est pas non plus une
librairie de composants. C'est l'ensemble des décisions qui rendent ces
artefacts cohérents.

## Commencez par les tokens

Les tokens sont les atomes les plus petits et les plus opinionnés de votre
langage visuel.

- **Couleurs** — `primary`, `surface`, `text`, états sémantiques.
- **Espacement** — une échelle multiplicative (`4 / 8 / 12 / 16…`).
- **Typographie** — un petit jeu de tailles nommées (`xs / sm / base / lg / xl…`).
- **Radius** — deux ou trois valeurs maximum.

Prenez le plus petit ensemble qui décrit vos écrans actuels.

## Promouvoir doucement

Chaque composant publié dans votre librairie est un contrat. Faites-les
sortir du produit uniquement quand ils remplissent trois critères :

1. Ils apparaissent dans **au moins trois** écrans.
2. Ils ont un **propriétaire** qui les maintiendra.
3. Ils ont **au moins deux thèmes** d'états (clair, sombre).

## Un exemple concret

Un fichier de tokens minimal en TypeScript :

```ts title="src/design/tokens.ts" {3-5}
export const tokens = {
  color: {
    primary: 'oklch(45% 0.135 264)',
    surface: 'oklch(100% 0 0)',
    text: 'oklch(20% 0.012 264)',
    'text-muted': 'oklch(50% 0.012 264)',
  },
  space: { 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 6: '1.5rem' },
  font: { sans: '"Source Sans 3", system-ui, sans-serif' },
  radius: { sm: '0.25rem', md: '0.5rem', lg: '1rem' },
} as const;
```

Branchez-le sur votre couche CSS (Tailwind v4, Vanilla Extract, simples
variables CSS — c'est votre choix) et résistez à la tentation d'élargir
l'ensemble tant que la douleur ne se fait pas sentir.

## La règle unique

La cohérence l'emporte sur l'exhaustivité. Un petit système cohérent vaut
toujours mieux qu'un système tentaculaire à moitié fini.
