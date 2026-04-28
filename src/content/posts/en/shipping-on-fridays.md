---
title: On shipping software on Fridays
description: A short manifesto for teams who want to deploy on Fridays without breaking the weekend — and why that's a good engineering goal.
pubDate: 2026-04-08
tags: [engineering, deployment, culture]
categories: [Essays]
translationKey: shipping-on-fridays
heroImage: https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80&auto=format&fit=crop
heroImageAlt: Stacked shipping containers in late-afternoon sun
toc: true
---

"Don't ship on Fridays" is shorthand for an unhealthy pipeline. The day of
the week is a symptom, not the disease. If a deploy on Friday afternoon is
risky, a deploy on Monday morning is also risky — you just notice it less.

## What "ship on Fridays" actually demands

Every safe Friday deploy depends on the same boring things:

- Small, reversible changes.
- Feature flags that can be flipped without a deploy.
- Tested rollback paths, not just plans.
- Real observability — not dashboards nobody reads.

If you have these in place, the day of the week stops mattering.

## The cost of cargo-culted "no Fridays"

When the team agrees not to ship on Fridays:

- Mondays accumulate two days of changes — risk goes up, not down.
- Hot fixes during weekends violate the rule anyway.
- Engineers learn that the system is fragile and act conservatively
  every other day too.

## A better policy

Replace "no Fridays" with two simpler rules:

1. **No deploy without a one-click rollback.**
2. **No deploy without telemetry that catches the rollout in five minutes.**

Then ship whenever you want. Including Friday afternoon, twenty minutes
before the all-hands.
