---
title: 'LaTeX math with KaTeX, pre-rendered at build time'
description: "Inline and display math, matrices, integrals, sums, Maxwell's equations and more — all rendered at build time, with the KaTeX stylesheet loaded only on opt-in pages."
pubDate: 2026-04-26
tags: [math, latex, katex, markdown]
categories: [Authoring]
translationKey: latex-math-with-katex
math: true
toc: true
---

This site supports **LaTeX-style math** out of the box. Equations are
parsed by [`remark-math`](https://github.com/remarkjs/remark-math) and
rendered to plain HTML + CSS at build time by
[`rehype-katex`](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex).

> **Zero client JavaScript.** Every equation below is server-rendered
> static markup. KaTeX runs only on the build server.

## Opting a page into math

Add `math: true` to the post (or page) frontmatter:

```yaml
---
title: My math-heavy post
math: true
---
```

The theme component
[`MathStyles.astro`](src/components/MathStyles.astro) is rendered only
when `math: true`, and Astro's per-page CSS bundling guarantees that
`katex.min.css` (~29 kB) and its `woff2` font assets are emitted **only
on pages that include them**. Non-math pages never download the
stylesheet.

## Inline math

Wrap inline expressions with single dollar signs: `$ ... $`.

The Pythagorean theorem states that $a^2 + b^2 = c^2$ for any right
triangle with legs $a$, $b$ and hypotenuse $c$. Euler's identity,
$e^{i\pi} + 1 = 0$, ties together five fundamental constants. The
fine-structure constant is approximately $\alpha \approx 1/137.036$.

To **escape a literal dollar sign** outside math, write `\$`, e.g. \$5.00.

## Display math

Use `$$ ... $$` on their own lines for centred display equations.

### Quadratic formula

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### Gaussian integral

$$
\int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}
$$

### Euler's identity

$$
e^{i\pi} + 1 = 0
$$

## Calculus & analysis

The fundamental theorem of calculus:

$$
\int_a^b f'(x)\, dx = f(b) - f(a)
$$

Taylor series expansion:

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n
$$

## Linear algebra

A $2 \times 2$ matrix and its determinant:

$$
A = \begin{pmatrix} a & b \\ c & d \end{pmatrix},\quad \det(A) = ad - bc
$$

A linear system written compactly:

$$
\begin{cases}
2x + 3y = 5 \\
4x - y = 1
\end{cases}
$$

## Probability & statistics

The Gaussian probability density function:

$$
f(x \mid \mu, \sigma^2) = \frac{1}{\sigma \sqrt{2\pi}}\, e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

Bayes' theorem:

$$
P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}
$$

## Physics

Maxwell's equations in SI units:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

Schrödinger's time-dependent equation:

$$
i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H}\, \Psi(\mathbf{r}, t)
$$

## Common pitfalls

- **A blank line is required** before and after a `$$` block, otherwise
  Markdown can swallow the delimiters.
- The same syntax works in both `.md` and `.mdx`.
- Inside MDX, do not put `{` immediately after `$` unless you intend a
  JSX expression — escape with `\{` if needed.
- Forgot `math: true`? You'll see raw `$x^2$` text instead of a
  rendered formula. Add the flag and rebuild.

## Where to next?

Pair this with the
[code blocks post](/posts/code-blocks-and-syntax-highlighting) — the
two together cover everything you need to write technical content on
this theme.
