---
title: 'LaTeX Math Showcase: Equations in Markdown'
description: A tour of KaTeX-powered LaTeX math in Chirping Astro — inline expressions, display equations, matrices, integrals, sums and more, all rendered at build time with zero client JavaScript.
pubDate: 2026-04-30
tags: [math, latex, katex, markdown, mdx]
categories: [Authoring]
translationKey: math-equations-showcase
math: true
toc: true
heroImage: https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&auto=format&fit=crop
heroImageAlt: A blackboard covered in handwritten mathematical equations
---

This site supports **LaTeX-style math** out of the box, rendered at build
time by [KaTeX](https://katex.org/) via `remark-math` + `rehype-katex`.
The math stylesheet is loaded **only on pages that opt in** with
`math: true` in frontmatter, so non-math pages stay lean.

> **Heads up:** No JavaScript is shipped to the browser for math — every
> equation below is pre-rendered HTML + CSS at build time.

## Inline math

Wrap inline expressions with single dollar signs: `$ ... $`.

The Pythagorean theorem states that $a^2 + b^2 = c^2$ for any right
triangle with legs $a$, $b$ and hypotenuse $c$. Euler's identity,
$e^{i\pi} + 1 = 0$, ties together five fundamental constants. The
fine-structure constant is approximately $\alpha \approx 1/137.036$.

## Display math

Use `$$ ... $$` (on its own lines) for centred display equations.

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

Taylor series expansion of a smooth function $f$ around $a$:

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}\,(x - a)^n
$$

The Cauchy–Schwarz inequality in an inner-product space:

$$
\left| \langle u, v \rangle \right|^2
\;\le\;
\langle u, u \rangle \cdot \langle v, v \rangle
$$

## Linear algebra

A $3 \times 3$ matrix and its determinant:

$$
A =
\begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
\qquad
\det(A) = \sum_{\sigma \in S_3} \operatorname{sgn}(\sigma) \prod_{i=1}^{3} a_{i,\sigma(i)}
$$

The eigenvalue equation:

$$
A\mathbf{v} = \lambda \mathbf{v}
\;\;\Longleftrightarrow\;\;
\det(A - \lambda I) = 0
$$

## Probability & statistics

The probability density function of a normal distribution
$\mathcal{N}(\mu, \sigma^2)$:

$$
f(x \mid \mu, \sigma^2) =
\frac{1}{\sigma\sqrt{2\pi}}\,
\exp\!\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)
$$

Bayes' theorem:

$$
P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}
$$

## Physics

The time-dependent Schrödinger equation:

$$
i\hbar\,\frac{\partial}{\partial t}\,\Psi(\mathbf{r}, t)
=
\hat{H}\,\Psi(\mathbf{r}, t)
$$

Maxwell's equations in differential form (vacuum):

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

The Einstein field equations (general relativity):

$$
R_{\mu\nu} - \tfrac{1}{2}\, g_{\mu\nu} R + \Lambda\, g_{\mu\nu}
=
\frac{8\pi G}{c^4}\, T_{\mu\nu}
$$

## Number theory

The Riemann zeta function and its functional equation:

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^{s}}
\qquad
\zeta(s) = 2^{s}\pi^{s-1}\,\sin\!\left(\tfrac{\pi s}{2}\right)\,\Gamma(1-s)\,\zeta(1-s)
$$

Euler's product formula links it to the primes:

$$
\zeta(s) = \prod_{p\ \text{prime}} \frac{1}{1 - p^{-s}}
$$

## Cases & piecewise

$$
\operatorname{sgn}(x) =
\begin{cases}
+1 & \text{if } x > 0,\\
\phantom{+}0 & \text{if } x = 0,\\
-1 & \text{if } x < 0.
\end{cases}
$$

## Authoring tips

- **Opt in per post.** Add `math: true` to frontmatter to load the KaTeX
  stylesheet for that single post (or page).
- **Inline:** wrap with `$ ... $`. **Display:** wrap with `$$ ... $$` on
  their own lines.
- **Escape literal dollars** that are not math with `\$`, e.g. `\$5.00`.
- **MDX-friendly.** The same syntax works in `.mdx` files; you can also
  drop in JSX components alongside equations.
- **No runtime cost.** Equations are rendered to HTML + CSS at build
  time — there is no MathJax/KaTeX bundle on the client.

Happy typesetting!
