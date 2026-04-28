---
title: Déployer le vendredi
description: Un court manifeste pour les équipes qui veulent déployer le vendredi sans gâcher leur week-end — et pourquoi c'est un bon objectif d'ingénierie.
pubDate: 2026-04-08
tags: [engineering, deployment, culture]
categories: [Essais]
translationKey: shipping-on-fridays
heroImage: https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80&auto=format&fit=crop
heroImageAlt: Conteneurs maritimes empilés sous une lumière de fin d'après-midi
toc: true
---

« On ne déploie pas le vendredi » est le raccourci d'un pipeline malsain.
Le jour de la semaine est un symptôme, pas la maladie. Si déployer un
vendredi après-midi est risqué, déployer un lundi matin l'est tout autant
— vous le remarquez juste moins.

## Ce que « déployer le vendredi » exige réellement

Chaque déploiement du vendredi en toute sécurité repose sur les mêmes
fondamentaux ennuyeux :

- Des changements petits et réversibles.
- Des feature flags qu'on peut basculer sans déployer.
- Des chemins de rollback testés, pas seulement planifiés.
- De l'observabilité réelle — pas des dashboards que personne ne lit.

Avec ça en place, le jour de la semaine cesse d'avoir de l'importance.

## Le coût du « jamais le vendredi »

Quand l'équipe décide de ne pas déployer le vendredi :

- Le lundi accumule deux jours de changements — le risque monte, ne baisse pas.
- Les correctifs urgents en week-end violent la règle de toute façon.
- L'équipe apprend que le système est fragile et agit prudemment les
  autres jours aussi.

## Une meilleure politique

Remplacez « pas le vendredi » par deux règles plus simples :

1. **Pas de déploiement sans rollback en un clic.**
2. **Pas de déploiement sans télémétrie qui capte le rollout en cinq minutes.**

Ensuite, déployez quand vous voulez. Y compris le vendredi à 17h, vingt
minutes avant la réunion d'équipe.
