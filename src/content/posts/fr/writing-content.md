---
title: Rédiger du contenu
description: Champs frontmatter, organisation des articles par locale et conseils d'écriture en Markdown et MDX.
pubDate: 2026-03-30
tags: [writing, markdown, mdx]
categories: [Guides]
translationKey: writing-content
toc: true
comments: false
---

Cet article est volontairement court. Il sert à montrer que le drapeau
**`comments: false`** dans le frontmatter désactive Giscus sur un article
en particulier.

## Convention de dossiers

Les articles vivent sous `src/content/posts/<locale>/` :

```
src/content/posts/
├── en/
│   ├── welcome.md
│   ├── astro-mdx-demo.mdx
│   └── writing-content.md
└── fr/
    ├── welcome.md
    ├── astro-mdx-demo.mdx
    └── writing-content.md
```

Deux articles qui partagent le même `translationKey` sont considérés comme
des traductions l'un de l'autre, et le sélecteur de langue les relie.

## Frontmatter requis

| Champ            | Type     | Notes                              |
| ---------------- | -------- | ---------------------------------- |
| `title`          | string   | Titre de l'article                 |
| `description`    | string   | Utilisé par le SEO et les cartes   |
| `pubDate`        | date     | Obligatoire                        |
| `tags`           | string[] | Optionnel, défaut `[]`             |
| `categories`     | string[] | Optionnel                          |
| `translationKey` | string   | Lie les traductions                |
| `comments`       | boolean  | Forcer Giscus on/off               |
| `toc`            | boolean  | Masquer la TDM pour un récit court |
| `math`           | boolean  | Activer le rendu LaTeX (KaTeX)     |

Et c'est tout — le reste vous appartient.

## Mathématiques (LaTeX)

Définissez `math: true` dans le frontmatter pour activer le rendu LaTeX
sur ce billet (ou cette page). Les équations sont pré-rendues à la
compilation par KaTeX — la feuille de styles n'est chargée que sur les
pages qui l'activent, donc les autres billets ne paient rien pour cette
fonctionnalité.

- En ligne : `$E = mc^2$`
- En bloc : encadrer avec `$$ ... $$` sur leurs propres lignes
- Échapper un dollar littéral avec `\$`
