---
title: 'Thème, mode sombre et personnalisation visuelle'
description: 'Comment les thèmes daisyUI chirpy-light / chirpy-dark sont câblés, où changer les couleurs, le bouton de thème sans FOUC, et View Transitions pour des bascules animées.'
pubDate: 2026-04-21
tags: [theme, daisyui, tailwind, mode-sombre, personnalisation]
categories: [Tutoriels]
translationKey: theming-and-dark-mode
heroImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1600&q=80&auto=format&fit=crop'
heroImageAlt: 'Deux échantillons de peinture, un foncé et un clair, côte à côte'
toc: true
---

Le thème embarque deux thèmes daisyUI v5 — `chirpy-light` (par défaut)
et `chirpy-dark` — tous deux écrits en OKLCH pour que la palette reste
perceptuellement équilibrée. Basculer de thème utilise l'**API View
Transitions** quand elle est disponible, donnant un effet circulaire
qui part du bouton.

Ouvrez le bouton dans la barre latérale (icône soleil/lune) pour
essayer. Puis lisez la suite pour la personnalisation.

## Tailwind v4 + daisyUI, version courte

`src/styles/global.css` est l'unique point d'entrée. Il importe Tailwind
v4 en une ligne et enregistre daisyUI plus les deux thèmes :

```css title="src/styles/global.css"
@import 'tailwindcss';

@plugin "daisyui" {
  themes: false;
  logs: false;
}

@plugin "daisyui/theme" {
  name: 'chirpy-light';
  default: true;
  --color-base-100: oklch(100% 0 0);
  --color-primary: oklch(45% 0.135 264);
  /* ... */
}

@plugin "daisyui/theme" {
  name: 'chirpy-dark';
  prefersdark: true;
  --color-base-100: oklch(22% 0.005 264);
  --color-primary: oklch(72% 0.11 264);
  /* ... */
}
```

Le plugin Vite `@tailwindcss/vite` est enregistré dans
[`astro.config.mjs`](astro.config.mjs).

## Personnaliser les couleurs

Ouvrez [`src/styles/global.css`](src/styles/global.css) et modifiez
les valeurs OKLCH dans chaque bloc `@plugin "daisyui/theme"`. Les noms
de tokens (`--color-primary`, `--color-base-100`, …) sont les
variables canoniques de daisyUI v5 — vous pouvez aussi ajouter vos
propres tokens, comme les `--color-sidebar-from`,
`--color-sidebar-to`, `--width-sidebar` du thème.

Pourquoi OKLCH ? C'est perceptuellement uniforme — un changement de
luminosité de 10 % se sent comme 10 %, pas « beaucoup plus sombre pour
l'orange mais à peine visible pour le bleu ». Des outils comme
[oklch.com](https://oklch.com/) rendent l'écriture indolore.

## Le bouton de thème

[`src/components/islands/ThemeToggle.astro`](src/components/islands/ThemeToggle.astro)
est petit mais fait plusieurs choses à la fois :

- **Stocke le choix** dans `localStorage` sous la clé `theme`.
- **Retombe** sur `prefers-color-scheme: dark` si aucun choix n'est
  fixé.
- **Émet un `CustomEvent` `theme-change`** pour que d'autres islands
  (Giscus, par exemple) réagissent.
- **Anime la bascule** avec l'API View Transitions : un dévoilement
  circulaire centré sur le curseur qui respecte
  `prefers-reduced-motion: reduce`.

## Pas de FOUC (« Flash of Unstyled Content »)

Le bouton persiste la préférence, mais les lectures `localStorage`
arrivent en JavaScript — et le JS s'exécute **après** le paint CSS.
Pour empêcher un flash du mauvais thème au premier chargement,
[`BaseLayout.astro`](src/layouts/BaseLayout.astro) embarque un petit
bloc `<script is:inline>` qui :

1. Lit `localStorage.theme`.
2. Retombe sur `matchMedia('(prefers-color-scheme: dark)')`.
3. Définit `document.documentElement.dataset.theme` **avant tout
   paint CSS**.

Résultat : la page se rend dans le bon thème dès la frame zéro, même
sur les connexions lentes.

## Les blocs de code suivent le thème

Expressive Code est configuré avec deux thèmes (`github-light` et
`github-dark-dimmed`) et lié à l'attribut `data-theme` du site via
`themeCssSelector`. Quand l'utilisateur bascule, **tous** les blocs
de code de la page changent de palette **instantanément** sans
re-rendu JS. Voir l'[article sur les blocs de code](/fr/posts/code-blocks-and-syntax-highlighting).

## Tokens personnalisés utilisés par le thème

Au-delà de la palette daisyUI standard, le thème définit quelques
tokens de mise en page — modifiez-les dans `global.css` pour
re-calibrer le dimensionnement :

| Token                   | Défaut       | Utilisé pour                    |
| ----------------------- | ------------ | ------------------------------- |
| `--width-sidebar`       | `18rem`      | Largeur de la barre latérale    |
| `--width-panel`         | `14rem`      | Panneau « Tags populaires »     |
| `--height-topbar`       | `3.25rem`    | Hauteur de la barre du haut     |
| `--width-prose`         | `50rem`      | Largeur max de la prose         |
| `--color-sidebar-from`  | OKLCH        | Début du dégradé sidebar        |
| `--color-sidebar-to`    | OKLCH        | Fin du dégradé sidebar          |
| `--color-sidebar-text`  | OKLCH        | Couleur du texte de la sidebar  |

## Renommer ou remplacer les thèmes

Si vous préférez les appeler `dawn` et `dusk`, renommez à deux
endroits :

1. `@plugin "daisyui/theme" { name: "dawn"; ... }` dans `global.css`.
2. Les chaînes `"chirpy-light"` et `"chirpy-dark"` dans
   [`ThemeToggle.astro`](src/components/islands/ThemeToggle.astro),
   [`BaseLayout.astro`](src/layouts/BaseLayout.astro) (script no-FOUC),
   et [`Giscus.astro`](src/components/islands/Giscus.astro) (sync de
   thème).

Recherchez `chirpy-` dans le workspace — vous trouverez chaque
occurrence en moins d'une douzaine d'endroits.

## Ajouter un troisième thème

daisyUI accepte sans peine autant de thèmes que vous voulez. Ajoutez
un autre bloc `@plugin "daisyui/theme"` et étendez le bouton pour
cycler entre trois états (ou créez un dropdown séparé). L'événement
`theme-change` reste émis et Giscus / Expressive Code s'adaptent
sans autre travail.

## Désactiver les transitions animées

Si vous préférez une coupure nette :

```ts title="src/components/islands/ThemeToggle.astro"
// Retirez le wrapper document.startViewTransition :
- if (document.startViewTransition) {
-   document.startViewTransition(applyTheme);
- } else {
-   applyTheme();
- }
+ applyTheme();
```

Ou laissez tel quel — les utilisateurs avec
`prefers-reduced-motion: reduce` ont déjà une coupure nette.
