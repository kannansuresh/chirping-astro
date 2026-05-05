---
title: 'Plugin alert : démonstration de toutes les variantes'
description: 'Guide complet du bloc de code alert : couleurs, styles, direction, icônes, titre, description et classes personnalisées en Markdown et MDX.'
pubDate: 2026-05-05
tags: [alertes, daisyui, markdown, mdx, redaction]
categories: [Rédaction]
translationKey: alerts-all-variants
toc: true
---

Cet article montre toutes les variantes prises en charge par le langage de bloc `alert`.

Il fonctionne dans les fichiers `.md` et `.mdx`.

## Alerte de base

```alert
description: 12 messages non lus. Touchez pour les voir.
```

## Variantes de couleur

### Info

```alert
type: info
description: Une nouvelle mise a jour logicielle est disponible.
```

### Succes

```alert
type: success
description: Votre achat a ete confirme !
```

### Avertissement

```alert
type: warning
description: Attention : adresse e-mail invalide !
```

### Erreur

```alert
type: error
description: Erreur ! La tache a echoue avec succes.
```

## Variantes de style

### Style soft

```alert
type: info
style: soft
description: Alerte info en style soft.
```

```alert
type: success
style: soft
description: Alerte succes en style soft.
```

```alert
type: warning
style: soft
description: Alerte avertissement en style soft.
```

```alert
type: error
style: soft
description: Alerte erreur en style soft.
```

### Style outline

```alert
type: info
style: outline
description: Alerte info en style outline.
```

```alert
type: success
style: outline
description: Alerte succes en style outline.
```

```alert
type: warning
style: outline
description: Alerte avertissement en style outline.
```

```alert
type: error
style: outline
description: Alerte erreur en style outline.
```

### Style dash

```alert
type: info
style: dash
description: Alerte info en style dash.
```

```alert
type: success
style: dash
description: Alerte succes en style dash.
```

```alert
type: warning
style: dash
description: Alerte avertissement en style dash.
```

```alert
type: error
style: dash
description: Alerte erreur en style dash.
```

## Variantes de direction

### Verticale

```alert
type: info
direction: vertical
title: Nouveau message !
description: Vous avez 1 message non lu.
```

### Horizontale

```alert
type: info
direction: horizontal
title: Nouveau message !
description: Vous avez 1 message non lu.
```

### Responsive (verticale sur mobile, horizontale a partir de `sm`)

```alert
type: info
direction: responsive
title: Nouveau message !
description: Vous avez 1 message non lu.
```

## Options d'icone

### Icone par defaut selon le type

```alert
type: warning
description: Cette alerte utilise l'icone warning par defaut.
```

### Icone personnalisee

```alert
type: info
icon: lucide:bell
description: Cette alerte utilise une icone cloche personnalisee.
```

### Sans icone

```alert
type: error
icon: none
description: Cette alerte n'affiche volontairement aucune icone.
```

## Titre et description

Quand `title` est present, l'alerte rend la structure titre + description de daisyUI.

```alert
type: success
style: soft
title: Deploiement termine
description: La version 2.1.0 est maintenant en production.
```

## Classes personnalisees

Utilisez `class` pour ajouter des classes utilitaires ou daisyUI supplementaires.

```alert
type: info
class: shadow-md
description: Alerte avec une classe utilitaire d'ombre personnalisee.
```

```alert
type: warning
class: alert-outline
description: La cle class peut aussi forcer des styles d'alerte additionnels.
```

## Description via lignes libres

Si `description` est absente, les lignes non-cle deviennent automatiquement la description.

```alert
type: info
Ce texte devient automatiquement la description de l'alerte.
```

```alert
type: success
style: soft
Ligne un d'une description multi-lignes.
Ligne deux de la meme description.
```

## Syntaxe de reference

Utilisez ce modele dans Markdown ou MDX :

````markdown
```alert
type: info
style: soft
direction: responsive
icon: lucide:info
title: Titre optionnel
description: Description optionnelle
class: classes-supplementaires-optionnelles
```
````
