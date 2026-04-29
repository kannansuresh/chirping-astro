---
title: Design systems 101
description: A practical introduction to design systems — what they are, what they're not, and how to start one without going on a six-month detour.
pubDate: 2026-04-18
tags: [design, design-systems, frontend]
categories: [Guides]
translationKey: design-systems-101
heroImage: https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1600&q=80&auto=format&fit=crop
heroImageAlt: A designer's desk with colour swatches and a sketchpad
toc: true
---

A design system is not a Figma file. It's not a component library either.
It's the set of decisions that make those artifacts coherent.

## Start with tokens

Tokens are the smallest, most opinionated atoms of your visual language.

- **Color tokens** — `primary`, `surface`, `text`, semantic states.
- **Spacing tokens** — a multiplier scale (`4 / 8 / 12 / 16…`).
- **Typography tokens** — a small set of named sizes (`xs / sm / base / lg / xl…`).
- **Radius tokens** — typically two or three values, no more.

Pick the smallest set that lets you express the screens you have today.

## Promote slowly

Every component you publish to your library is a contract. Promote things
out of the product surface only when they meet three criteria:

1. They appear in **at least three** screens.
2. They have an **owner** who'll maintain them.
3. They have **at least two themes** worth of states (light, dark).

## A worked example

Here's a tiny token file in TypeScript:

```ts title="src/design/tokens.ts" {3-5}
export const tokens = {
  color: {
    primary: 'oklch(45% 0.135 264)',
    surface: 'oklch(100% 0 0)',
    text: 'oklch(20% 0.012 264)',
    'text-muted': 'oklch(50% 0.012 264)',
  },
  space: { 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 6: '1.5rem' },
  font: { sans: '"Source Sans 3", system-ui, sans-serif' },
  radius: { sm: '0.25rem', md: '0.5rem', lg: '1rem' },
} as const;
```

Wire it through your CSS layer (Tailwind v4, Vanilla Extract, plain CSS
variables — your call) and resist the urge to grow the set until it hurts.

## The single rule

Cohesion beats completeness. A small, consistent system always wins over
a sprawling, half-finished one.
