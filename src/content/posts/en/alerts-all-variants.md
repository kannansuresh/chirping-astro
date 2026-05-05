---
title: 'Alert plugin: showcase of all variants'
description: 'A complete guide to the alert code block language: colors, styles, direction, icons, title, description, and custom classes in Markdown and MDX.'
pubDate: 2026-05-05
tags: [alerts, daisyui, markdown, mdx, authoring]
categories: [Authoring]
translationKey: alerts-all-variants
toc: true
---

This post demonstrates every variant supported by the custom `alert` code block language.

It works in both `.md` and `.mdx` files.

## Basic alert

```alert
description: 12 unread messages. Tap to see.
```

## Color variants

### Info

```alert
type: info
description: New software update available.
```

### Success

```alert
type: success
description: Your purchase has been confirmed!
```

### Warning

```alert
type: warning
description: Warning: Invalid email address!
```

### Error

```alert
type: error
description: Error! Task failed successfully.
```

## Style variants

### Soft style

```alert
type: info
style: soft
description: Soft info alert.
```

```alert
type: success
style: soft
description: Soft success alert.
```

```alert
type: warning
style: soft
description: Soft warning alert.
```

```alert
type: error
style: soft
description: Soft error alert.
```

### Outline style

```alert
type: info
style: outline
description: Outline info alert.
```

```alert
type: success
style: outline
description: Outline success alert.
```

```alert
type: warning
style: outline
description: Outline warning alert.
```

```alert
type: error
style: outline
description: Outline error alert.
```

### Dash style

```alert
type: info
style: dash
description: Dash info alert.
```

```alert
type: success
style: dash
description: Dash success alert.
```

```alert
type: warning
style: dash
description: Dash warning alert.
```

```alert
type: error
style: dash
description: Dash error alert.
```

## Direction variants

### Vertical

```alert
type: info
direction: vertical
title: New message!
description: You have 1 unread message.
```

### Horizontal

```alert
type: info
direction: horizontal
title: New message!
description: You have 1 unread message.
```

### Responsive (vertical on mobile, horizontal from `sm`)

```alert
type: info
direction: responsive
title: New message!
description: You have 1 unread message.
```

## Icon options

### Default icon by alert type

```alert
type: warning
description: Uses the default warning icon.
```

### Custom icon

```alert
type: info
icon: lucide:bell
description: This alert uses a custom bell icon.
```

### No icon

```alert
type: error
icon: none
description: This alert intentionally has no icon.
```

## Title and description

When `title` is provided, the alert renders with daisyUI title + description structure.

```alert
type: success
style: soft
title: Deployment complete
description: Version 2.1.0 is now live in production.
```

## Custom classes

Use `class` to append any extra utility or daisyUI classes.

```alert
type: info
class: shadow-md
description: Alert with a custom shadow utility class.
```

```alert
type: warning
class: alert-outline
description: Class can also be used to force additional alert styles.
```

## Description from plain lines

If `description` is omitted, all non-key lines become the description.

```alert
type: info
This text becomes the alert description automatically.
```

```alert
type: success
style: soft
Line one of a multi-line description.
Line two of the same description.
```

## Reference syntax

Use this pattern inside Markdown or MDX:

````markdown
```alert
type: info
style: soft
direction: responsive
icon: lucide:info
title: Optional title
description: Optional description
class: optional-extra-classes
```
````
