---
title: 'Contenu bilingue avec une i18n de premier ordre'
description: 'Comment fonctionne le routage anglais-à-la-racine + français-sous-/fr, comment apparier les articles traduits avec translationKey, et comment ajouter une troisième locale.'
pubDate: 2026-04-24
tags: [i18n, internationalisation, locales, francais, anglais]
categories: [Tutoriels]
translationKey: i18n-bilingual-content
heroImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80&auto=format&fit=crop'
heroImageAlt: "Pages d'un dictionnaire ouvert avec des annotations manuscrites"
toc: true
---

Ce site est bilingue. L'**anglais** est servi à la racine de l'URL, et
le **français** vit sous `/fr`. Le sélecteur de langue dans la barre
de navigation supérieure est contextuel : sur une page d'article, il
vous emmène sur l'article traduit équivalent ; sur une page de
listing, il échange le préfixe de locale en préservant le reste du
chemin.

Vous lisez cet article en français. Cliquez sur le sélecteur de langue
en haut de la page pour le lire en anglais — ce trajet fonctionne
parce que les deux fichiers partagent la même `translationKey`.

## Désactiver l'i18n

Si vous ne publiez qu'en une seule langue, définissez
`multilingual: false` dans [`src/config.ts`](src/config.ts). Le
sélecteur de langue disparaît de la barre supérieure et les balises
`<link rel="alternate" hreflang>` ne sont plus émises. Pour retirer
également les routes de l'autre locale du build, supprimez ses
dossiers de contenu (`src/content/posts/<lang>/`,
`src/content/pages/<lang>/`), son miroir `src/pages/<lang>/`, et
retirez-la de `SITE.locales`.

## Règles de routage

| Locale | Racine | Articles           | Tags           |
| ------ | ------ | ------------------ | -------------- |
| `en`   | `/`    | `/posts/<slug>`    | `/tags/...`    |
| `fr`   | `/fr/` | `/fr/posts/<slug>` | `/fr/tags/...` |

La locale par défaut (anglais) **n'a jamais de préfixe**. C'est
appliqué à trois endroits qui s'accordent :

1. [`astro.config.mjs`](astro.config.mjs) →
   `i18n.routing.prefixDefaultLocale: false`
2. [`src/config.ts`](src/config.ts) → `defaultLocale: 'en'`
3. [`src/i18n/utils.ts`](src/i18n/utils.ts) → `localePrefix()` retourne
   `''` pour la locale par défaut.

## Rédiger des articles par locale

Les articles vivent dans des **dossiers par locale** :

```text frame="code"
src/content/posts/
├── en/
│   ├── welcome.md
│   ├── i18n-bilingual-content.md
│   └── ...
└── fr/
    ├── welcome.md
    ├── i18n-bilingual-content.md
    └── ...
```

Le champ `lang` est **inféré depuis le chemin du fichier** — vous
n'avez pas à le définir dans le frontmatter. Override uniquement dans
des cas inhabituels.

## Apparier les traductions avec `translationKey`

Deux articles qui partagent la même `translationKey` sont considérés
comme traductions l'un de l'autre. Le sélecteur de langue s'en sert
pour atterrir sur l'article équivalent au lieu de rebondir vers la
page d'accueil de la locale.

```yaml title="src/content/posts/en/welcome.md"
translationKey: welcome
```

```yaml title="src/content/posts/fr/welcome.md"
translationKey: welcome
```

Si la traduction correspondante n'existe pas pour la page active
(article anglais sans version française), le sélecteur retombe sur
la page d'accueil de la locale (`/` ou `/fr/`) au lieu de servir
une 404 au lecteur.

Le fallback de slug fonctionne aussi : si vous omettez
`translationKey`, le thème utilise le slug du fichier. Donc des slugs
identiques entre `en/` et `fr/` sont auto-appariés sans métadonnée
supplémentaire.

## Chaînes d'interface

Chaque libellé d'interface — navigation, boutons, messages d'erreur,
labels d'accessibilité — vit dans
[`src/i18n/ui.ts`](src/i18n/ui.ts), indexé par locale. TypeScript
garantit que toutes les clés sont présentes dans toutes les locales :
en oublier une fait échouer le build.

```ts title="src/i18n/utils.ts"
const t = useTranslations('fr');
t('nav.home'); // 'Accueil'
formatDate(d, 'fr'); // '24 avril 2026'
```

Le helper `formatDate` utilise `Intl.DateTimeFormat` pour que dates,
nombres et chaînes de temps de lecture s'affichent dans la locale
active.

## RSS, sitemap et SEO

- Un **flux RSS distinct** est généré par locale : `/rss.xml` (EN) et
  `/fr/rss.xml` (FR). Le lien est dans la rangée des liens sociaux
  de la barre latérale.
- Le sitemap (intégration `@astrojs/sitemap`) émet des **alternates
  hreflang** pour chaque page traduite. Les moteurs de recherche
  s'en servent pour servir la bonne langue au bon lecteur.
- Les balises `<link rel="alternate" hreflang="...">` sont aussi
  injectées dans le `<head>` par
  [`SEO.astro`](src/components/SEO.astro).

## Ajouter une troisième locale (ex. allemand)

Le code-base est conçu pour que ce soit une tâche en cinq étapes.
Pour ajouter `de` :

1. **Ajouter `'de'` à `SITE.locales`** dans
   [`src/config.ts`](src/config.ts).
2. **Ajouter un bloc `de` dans `src/i18n/ui.ts`** — TypeScript se
   plaindra tant que toutes les clés ne sont pas présentes, c'est
   voulu.
3. **Mettre à jour les switches conscients de la locale** dans
   [`src/i18n/utils.ts`](src/i18n/utils.ts) — `htmlLang`, `localeLabel`,
   `formatDate`. Chacun a un fallback, donc le site continue de
   compiler avant que vous n'ayez tout rempli.
4. **Refléter les dossiers de routes** sous `src/pages/de/...` (copier
   depuis `src/pages/fr/...` — chaque fichier appelle essentiellement
   `getPosts('de')`).
5. **Ajouter des articles** sous `src/content/posts/de/...` et des
   pages sous `src/content/pages/de/...`. Définissez `translationKey`
   pour les apparier avec leurs frères EN/FR.

C'est tout le cérémonial. Le sitemap, le RSS, la recherche, les
widgets de la barre latérale et le sélecteur de langue captent la
nouvelle locale automatiquement.

## Pagefind à travers les locales

Pagefind respecte l'attribut `lang` sur `<html>`, que le thème
définit par page depuis la locale inférée. La modale de recherche
filtre les résultats à la **locale courante**, donc les lecteurs
français n'ont pas accidentellement de résultats anglais.

## Dépannage i18n

| Symptôme                               | Solution                                                       |
| -------------------------------------- | -------------------------------------------------------------- |
| Le sélecteur tombe toujours sur `/`    | La traduction de la page active n'est pas encore écrite.       |
| Format de date erroné                  | Mettez à jour le switch `formatDate` dans `src/i18n/utils.ts`. |
| Le build se plaint d'une clé manquante | Ajoutez la clé à **chaque** bloc de locale dans `ui.ts`.       |
| Article FR avec UI anglaise            | Le chemin doit être `posts/fr/...` (pas `posts/fr-FR/...`).    |
