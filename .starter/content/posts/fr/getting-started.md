---
title: 'Premiers pas'
description: 'Votre premier article avec Chirping Astro. Apprenez à configurer votre site, rédiger des articles et déployer.'
pubDate: 2026-05-03
tags: [premiers-pas, tutoriel]
categories: [Guide]
translationKey: getting-started
pinned: true
toc: true
---

Bienvenue sur votre nouveau blog ! Cet article vous guide à travers les bases de **Chirping Astro**.

## Configurer votre site

Ouvrez `src/config.ts` et modifiez :

- **title** — le nom de votre site/blog
- **description** — affiché dans les moteurs de recherche et le RSS
- **author.name** — affiché dans la barre latérale et le pied de page
- **url** — votre URL de production (via la variable `SITE_URL` pour le déploiement)

## Variables d'environnement

Copiez `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Variables importantes :

| Variable               | Rôle                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `SITE_URL`             | Votre URL de production (ex. `https://monblog.com`)          |
| `BASE_PATH`            | `/<nom-du-repo>` pour GitHub Pages, vide sinon               |
| `PUBLIC_GITHUB_HANDLE` | Affiche l'icône GitHub dans la barre latérale                |
| `PUBLIC_GISCUS_*`      | Active les commentaires Giscus ([guide](https://giscus.app)) |

## Rédiger des articles

Créez des fichiers Markdown dans `src/content/posts/fr/` :

```markdown
---
title: 'Mon premier article'
description: 'Une brève description pour le SEO et les listes.'
pubDate: 2026-05-03
tags: [tag1, tag2]
categories: [Catégorie]
translationKey: mon-article
---

Écrivez votre contenu ici en Markdown standard.
```

### Champs frontmatter disponibles

| Champ            | Requis | Description                           |
| ---------------- | ------ | ------------------------------------- |
| `title`          | Oui    | Titre de l'article (1–140 car.)       |
| `description`    | Oui    | Meta description (1–280 car.)         |
| `pubDate`        | Oui    | Date de publication (format ISO)      |
| `tags`           | Non    | Tableau de tags                       |
| `categories`     | Non    | Tableau de catégories                 |
| `heroImage`      | Non    | Chemin vers l'image à la une          |
| `pinned`         | Non    | Épingler en haut des listes           |
| `toc`            | Non    | Afficher la table des matières        |
| `draft`          | Non    | Masquer en production                 |
| `translationKey` | Non    | Clé partagée avec la version anglaise |

## Internationalisation

Les articles sont liés entre langues via le champ `translationKey`. Créez un fichier dans `src/content/posts/en/` et un autre dans `src/content/posts/fr/` avec la même clé pour activer le sélecteur de langue.

## Déployer

Poussez sur `main` sur GitHub. Le workflow inclus construit et déploie sur GitHub Pages automatiquement.

Pour un domaine personnalisé, définissez `SITE_URL` dans les variables de votre dépôt sous **Settings → Environments → github-pages**.

## En savoir plus

- [Documentation complète](https://github.com/kannansuresh/chirping-astro)
- [Démo en ligne](https://kannansuresh.github.io/chirping-astro)
- [Documentation Astro](https://docs.astro.build)

---

Bon blogging ! Supprimez cet article quand vous êtes prêt à publier votre propre contenu.
