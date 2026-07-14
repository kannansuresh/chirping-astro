---
title: 'Diagrammes Mermaid'
description: 'Une vitrine de diagrammes Mermaid complexes rendus nativement avec Sätteri.'
pubDate: 2026-07-14
tags: ['mermaid', 'markdown', 'graphiques', 'diagrammes']
mermaid: true
translationKey: 'mermaid-diagrams'
---

Cet article montre comment écrire et afficher des diagrammes **Mermaid** directement dans vos fichiers Markdown et MDX. Puisque nous utilisons `mermaid: true` dans le frontmatter, la bibliothèque client Mermaid n'est chargée que sur cette page, gardant le reste du site léger et sans JavaScript.

Voici plusieurs exemples de diagrammes complexes, allant des organigrammes aux diagrammes de Gantt !

## Diagramme d'état

Pour afficher un diagramme, placez votre code Mermaid dans un bloc de code avec l'identifiant de langage `mermaid` :

````markdown
```mermaid
stateDiagram-v2
    [*] --> Immobile
    Immobile --> [*]

    Immobile --> EnMouvement
    EnMouvement --> Immobile
    EnMouvement --> Accident
    Accident --> [*]
```
````

Ce qui s'affiche automatiquement ainsi :

```mermaid
stateDiagram-v2
    [*] --> Immobile
    Immobile --> [*]

    Immobile --> EnMouvement
    EnMouvement --> Immobile
    EnMouvement --> Accident
    Accident --> [*]
```

## Diagramme de Séquence

```mermaid
sequenceDiagram
    autonumber
    Alice->>Jean: Bonjour Jean, comment vas-tu ?
    loop Bilan de santé
        Jean->>Jean: Lutter contre l'hypocondrie
    end
    Note right of Jean: Les pensées rationnelles<br/>l'emportent !
    Jean-->>Alice: Super !
    Jean->>Bob: Et toi ?
    Bob-->>Jean: Très bien !
```

## Diagramme de Gantt

```mermaid
gantt
    title Un Diagramme de Gantt
    dateFormat  YYYY-MM-DD
    section Première section
    Une tâche        :a1, 2014-01-01, 30d
    Une autre tâche  :after a1  , 20d
    section Deuxième section
    Tâche en sec     :2014-01-12  , 12d
    dernière tâche   : 24d
```

## Diagramme de Classes

```mermaid
classDiagram
    Animal <|-- Canard
    Animal <|-- Poisson
    Animal <|-- Zèbre
    Animal : +int age
    Animal : +String genre
    Animal: +estMammifere()
    Animal: +accouplement()
    class Canard{
        +String couleurBec
        +nager()
        +cancaner()
    }
    class Poisson{
        -int tailleEnCm
        -peutManger()
    }
    class Zèbre{
        +bool est_sauvage
        +courir()
    }
```

## Graphe Git

```mermaid
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
```
