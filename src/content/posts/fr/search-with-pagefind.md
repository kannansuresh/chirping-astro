---
title: 'Recherche avec Pagefind : instantanée, statique et entièrement hors-ligne'
description: "Comment fonctionne la recherche Pagefind embarquée — modale vs page complète, règles d'indexation, raccourcis clavier, filtrage par locale et personnalisation."
pubDate: 2026-04-23
tags: [recherche, pagefind, performance]
categories: [Tutoriels]
translationKey: search-with-pagefind

toc: true
---

Ce site dispose d'une **recherche instantanée, totalement statique**
propulsée par [Pagefind](https://pagefind.app/). Pas de service tiers,
pas de serveur, pas de clé API — Pagefind parcourt le dossier `dist/`
construit après `astro build` et écrit un petit index plus un bundle
client minuscule dans `dist/_pagefind/`.

Essayez maintenant : appuyez sur <kbd>/</kbd> ou
<kbd>Cmd</kbd>+<kbd>K</kbd> (<kbd>Ctrl</kbd>+<kbd>K</kbd> sur
Windows/Linux) pour ouvrir la modale.

## Deux façons de rechercher

### 1. La modale d'en-tête

Un bouton vit dans la barre du haut (et sur mobile dans la barre
latérale). L'ouvrir charge à la demande
[`/_pagefind/pagefind.js`](public/) — tant que vous n'ouvrez pas la
modale, **zéro code de recherche n'est livré**.

Points forts :

- Champ de saisie auto-focus
- Flèches pour naviguer, <kbd>Entrée</kbd> pour ouvrir, <kbd>Échap</kbd>
  pour fermer
- Liste de résultats avec titre, fil d'Ariane et extrait
- Filtrée à la **locale courante**

### 2. La page dédiée `/fr/search/`

Pour le partage profond, la liaison ou la navigation paginée, le thème
fournit aussi une recherche pleine page sur [`/fr/search/`](/fr/search/)
(et `/search/`). Identique à la modale mais occupant toute la colonne
de prose.

## Comment fonctionne l'indexation

`bun run build` exécute Astro, puis :

```bash frame="terminal"
pagefind --site dist --output-subdir _pagefind
```

Pagefind parcourt chaque page `.html` statique émise par Astro et lit
le contenu de l'élément `<main>` par défaut. Le
[`BaseLayout.astro`](src/layouts/BaseLayout.astro) du thème enveloppe
la zone de contenu dans `<main id="main">`, donc tout fonctionne.

### Exclure du contenu

Pour exclure une région de l'index, marquez-la avec
`data-pagefind-ignore` :

```astro
<aside data-pagefind-ignore>
  <p>Bandeau marketing — inutile dans les résultats.</p>
</aside>
```

Le thème exclut déjà la barre latérale, le pied et le panneau de
droite pour qu'ils ne polluent pas les résultats avec du texte de
navigation.

### Choisir un autre tronc de contenu

Si `<main>` est trop large, marquez le **vrai** contenu avec
`data-pagefind-body` :

```astro
<article data-pagefind-body>
  <!-- seul ceci est indexé -->
</article>
```

### Ajouter des filtres

Pagefind supporte aussi les filtres (par tag, catégorie, locale) via
`data-pagefind-filter` :

```astro
<article data-pagefind-filter="category:Tutoriels"></article>
```

L'UI par défaut n'affiche pas de chips de filtre, mais l'API headless
les expose — voir « Personnalisation » plus bas.

## Raccourcis clavier

| Touche                                                     | Action                 |
| ---------------------------------------------------------- | ---------------------- |
| <kbd>/</kbd>                                               | Ouvrir la modale       |
| <kbd>Cmd</kbd>+<kbd>K</kbd> / <kbd>Ctrl</kbd>+<kbd>K</kbd> | Ouvrir la modale       |
| <kbd>↑</kbd> / <kbd>↓</kbd>                                | Naviguer les résultats |
| <kbd>Entrée</kbd>                                          | Ouvrir le résultat     |
| <kbd>Échap</kbd>                                           | Fermer la modale       |

Les raccourcis sont câblés dans
[`src/components/islands/SearchButton.astro`](src/components/islands/SearchButton.astro).

## Internationalisation

La recherche est consciente de la locale. Le thème lit la locale active
depuis l'attribut `<html lang>` puis contraint la requête Pagefind à
l'index de cette locale. Les lecteurs français ne voient pas de hits
anglais et vice-versa.

Les chaînes de traduction (placeholder, « pas de résultats », astuces
clavier) vivent dans [`src/i18n/ui.ts`](src/i18n/ui.ts) sous les clés
`search.*`.

## Performance

Pagefind est conçu pour les sites statiques. Pour un blog bilingue
typique de 50 articles, attendez-vous à :

- **~50 ko** de JS compressé livré au client (uniquement à l'ouverture
  de la modale)
- **~150 ko** de données d'index compressées, récupérées à la demande
  et mises en cache
- **~5–20 ms** de latence moyenne par requête (en navigateur, sans
  aller-retour réseau)

La modale ne charge rien tant qu'on ne clique pas dessus, donc le
coût sur la page d'accueil est de **zéro**.

## Personnaliser la recherche

Ouvrez
[`src/components/islands/SearchButton.astro`](src/components/islands/SearchButton.astro)
pour :

- Changer le raccourci clavier.
- Activer/désactiver l'affichage des images / sous-résultats.
- Ajouter une UI de filtres (l'API headless expose
  `pagefind.filters()`).
- Remplacer le markup de ligne de résultat par votre propre template.

Le composant utilise l'API **headless** de Pagefind (`pagefind.js`) —
pas le bundle `pagefind-ui.js` — donc vous avez le contrôle total de
la mise en page et du style. Aucun CSS Pagefind supplémentaire n'est
livré ; tout est stylé en Tailwind.

## Dépannage

| Symptôme                                           | Solution                                                                    |
| -------------------------------------------------- | --------------------------------------------------------------------------- |
| « Search index not available »                     | Lancez `bun run build` une fois. L'index vit dans `dist/_pagefind/`.        |
| La recherche marche en `preview` mais pas en `dev` | Normal — Pagefind ne tourne qu'après `astro build`.                         |
| D'anciens contenus apparaissent encore             | Relancez `bun run build`. Ou `bun run pagefind` seul si `dist/` est récent. |
| Texte de la barre latérale dans les résultats      | Vérifiez les attributs `data-pagefind-ignore`.                              |
