---
title: 'Mermaid Diagrams'
description: 'A showcase of complex Mermaid diagrams natively rendered with Sätteri.'
pubDate: 2026-07-14
tags: ['mermaid', 'markdown', 'charts', 'diagrams']
mermaid: true
---

This post demonstrates how to write and render **Mermaid** diagrams directly within your Markdown and MDX files. Since we use `mermaid: true` in the frontmatter, the Mermaid client library is loaded only on this page, keeping the rest of the site lightweight and zero-JS.

Below are several examples of complex diagrams, ranging from flowcharts to Gantt charts!

## State Diagram

To render a diagram, wrap your Mermaid code in a fenced code block with the `mermaid` language identifier:

````markdown
```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```
````

Which automatically renders as:

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts<br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

## Gantt Chart

```mermaid
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task     : 24d
```

## Class Diagram

```mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
```

## Git Graph

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
