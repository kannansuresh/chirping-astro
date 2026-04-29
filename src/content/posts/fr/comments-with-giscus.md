---
title: 'Commentaires avec Giscus, synchronisés avec le thème et la locale'
description: "Brancher Giscus de bout en bout — installer l'App GitHub, générer les IDs, définir les variables d'environnement, synchroniser thème + locale, et basculer les commentaires par article."
pubDate: 2026-04-22
tags: [giscus, commentaires, github, discussions]
categories: [Tutoriels]
translationKey: comments-with-giscus
heroImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80&auto=format&fit=crop'
heroImageAlt: 'Bulles de dialogue dessinées sur un tableau noir'
toc: true
---

Les commentaires de ce thème sont propulsés par
[Giscus](https://giscus.app), qui utilise les **GitHub Discussions**
comme backend. Pas de base de données, pas de panneau de modération
distinct — chaque commentaire est une discussion gérable depuis
l'interface GitHub que vous utilisez déjà.

Si vous descendez en bas de cet article (et que Giscus est configuré),
vous verrez l'embed en direct. Sinon, vous verrez un **guide
d'installation** amical — le thème détecte les valeurs placeholder et
vous invite à les remplir.

## Installation, de bout en bout

### 1. Installer l'App GitHub Giscus

Visitez <https://github.com/apps/giscus> et accordez à l'app l'accès au
dépôt qui hébergera vos discussions. C'est **le** dépôt où chaque
commentaire vivra comme une Discussion.

> **Attention :** le dépôt doit être **public**, et les Discussions
> doivent être activées dans _Settings → General → Features_.

### 2. Générer les IDs

Ouvrez <https://giscus.app> et répondez aux questions :

- **Repository** — celui où vous avez installé l'app.
- **Page → Discussions Mapping** — choisissez **`pathname`**. Ainsi
  les traductions EN et FR du même article ont des fils
  **distincts**, ce que vous voulez.
- **Discussion Category** — choisissez ou créez-en une (ex.
  `Announcements`, `Comments`). Veillez à ce qu'elle soit de type
  **annonce** pour que les lecteurs ne puissent pas ouvrir des
  discussions de premier niveau.
- La page génère quatre valeurs : `repo`, `repoId`, `category`,
  `categoryId`. Copiez-les.

### 3. Définir les variables d'environnement

Copiez `.env.example` en `.env` et remplissez :

```env title=".env"
PUBLIC_GISCUS_ENABLED=true
PUBLIC_GISCUS_REPO=votre-handle/votre-repo
PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxx
PUBLIC_GISCUS_CATEGORY=Announcements
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxx
```

Redémarrez `bun run dev`. La notice d'installation devrait disparaître
et un véritable embed se monter à sa place.

Vous pouvez aussi contourner `.env` et éditer
[`src/config.ts`](src/config.ts) directement — `GISCUS` est un objet
typé avec les mêmes champs.

## Comportement

- Giscus n'est rendu **que sur les pages d'articles** (pas listings,
  page d'accueil, page about ou 404).
- Il n'est rendu **que si** `GISCUS.enabled` vaut `true` **et** que
  l'article ne se désinscrit pas.
- L'attribut `data-lang` de l'iframe est défini depuis la locale
  courante — les articles français reçoivent l'UI Giscus française,
  les anglais l'UI anglaise.
- Le thème de l'iframe suit le thème daisyUI actif. Quand le
  [`ThemeToggle`](src/components/islands/ThemeToggle.astro) bascule,
  l'island Giscus envoie un message `setConfig` à l'iframe pour que
  les commentaires basculent instantanément.

## Override par article

Mettez `comments: false` dans le frontmatter de tout article pour
faire taire Giscus dessus :

```yaml
---
title: Mon article silencieux
comments: false
---
```

Utile pour les pages de référence (comme la
[référence du frontmatter](/fr/posts/frontmatter-reference)) où les
commentaires n'attireraient que du bruit.

Pour **activer explicitement** les commentaires sur un article — au
cas où vous les auriez désactivés ailleurs — mettez `comments: true`.
Si le champ est omis, l'article hérite du réglage global.

## Désactiver globalement les commentaires

Mettez `PUBLIC_GISCUS_ENABLED=false` (ou supprimez la variable). Tous
les articles afficheront alors la simple ligne italique « commentaires
désactivés » à la place de l'embed.

## Comment fonctionne le montage paresseux

Le script client Giscus n'est **pas chargé** tant que la section
commentaires n'est pas montée. L'island concerné est
[`src/components/islands/Giscus.astro`](src/components/islands/Giscus.astro).
Il a trois états :

- **`live`** → activés, configurés, et l'iframe se monte.
- **`setup`** → activés mais non configurés (placeholders détectés).
  Affiche une carte d'installation amicale au lieu du silence.
- **`disabled`** → globalement désactivé ou désinscription par article.
  Affiche une ligne italique unique.

La détection de placeholder cherche des chaînes témoins comme `xxx`
ou `your-handle/your-repo`, donc même un oubli de mise à jour dans
`.env` n'enferme pas les lecteurs — ils verront une notice claire.

## Personnalisation

La configuration complète Giscus est exposée dans
[`src/config.ts`](src/config.ts) :

```ts title="src/config.ts"
export const GISCUS: GiscusConfig = {
  enabled: import.meta.env.PUBLIC_GISCUS_ENABLED === 'true',
  repo: import.meta.env.PUBLIC_GISCUS_REPO ?? 'your-handle/your-repo',
  // ...
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  loading: 'lazy',
};
```

Modifiez librement n'importe quel champ — ils correspondent
exactement aux
[options avancées de Giscus](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md).
