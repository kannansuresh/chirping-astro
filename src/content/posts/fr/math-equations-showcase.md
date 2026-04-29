---
title: 'Vitrine LaTeX : équations dans Markdown'
description: Tour d'horizon du rendu LaTeX par KaTeX dans Chirping Astro — expressions en ligne, équations affichées, matrices, intégrales, sommes et plus, le tout pré-rendu à la compilation, sans JavaScript côté client.
pubDate: 2026-04-30
tags: [maths, latex, katex, markdown, mdx]
categories: [Rédaction]
translationKey: math-equations-showcase
math: true
toc: true
heroImage: https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&auto=format&fit=crop
heroImageAlt: Un tableau noir couvert d'équations mathématiques manuscrites
---

Ce site prend en charge les **mathématiques de style LaTeX** prêtes à
l'emploi, rendues à la compilation par [KaTeX](https://katex.org/) via
`remark-math` + `rehype-katex`. La feuille de styles n'est chargée
**que sur les pages qui l'activent** avec `math: true` dans le
frontmatter — les autres pages restent légères.

> **À noter :** aucun JavaScript n'est envoyé au navigateur pour les
> formules — chaque équation est du HTML + CSS pré-rendu à la
> compilation.

## Mathématiques en ligne

Encadrez les expressions en ligne avec un seul signe dollar : `$ ... $`.

Le théorème de Pythagore énonce que $a^2 + b^2 = c^2$ pour tout
triangle rectangle de côtés $a$, $b$ et d'hypoténuse $c$. L'identité
d'Euler, $e^{i\pi} + 1 = 0$, relie cinq constantes fondamentales. La
constante de structure fine vaut environ $\alpha \approx 1/137{,}036$.

## Mathématiques en bloc

Utilisez `$$ ... $$` (sur leurs propres lignes) pour les équations
centrées en bloc.

### Formule du second degré

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### Intégrale de Gauss

$$
\int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}
$$

### Identité d'Euler

$$
e^{i\pi} + 1 = 0
$$

## Calcul & analyse

Théorème fondamental de l'analyse :

$$
\int_a^b f'(x)\, dx = f(b) - f(a)
$$

Développement en série de Taylor d'une fonction lisse $f$ autour de $a$ :

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}\,(x - a)^n
$$

Inégalité de Cauchy–Schwarz dans un espace préhilbertien :

$$
\left| \langle u, v \rangle \right|^2
\;\le\;
\langle u, u \rangle \cdot \langle v, v \rangle
$$

## Algèbre linéaire

Matrice $3 \times 3$ et son déterminant :

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

Équation aux valeurs propres :

$$
A\mathbf{v} = \lambda \mathbf{v}
\;\;\Longleftrightarrow\;\;
\det(A - \lambda I) = 0
$$

## Probabilités & statistiques

Densité de probabilité d'une loi normale $\mathcal{N}(\mu, \sigma^2)$ :

$$
f(x \mid \mu, \sigma^2) =
\frac{1}{\sigma\sqrt{2\pi}}\,
\exp\!\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)
$$

Théorème de Bayes :

$$
P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}
$$

## Physique

Équation de Schrödinger dépendante du temps :

$$
i\hbar\,\frac{\partial}{\partial t}\,\Psi(\mathbf{r}, t)
=
\hat{H}\,\Psi(\mathbf{r}, t)
$$

Équations de Maxwell sous forme différentielle (dans le vide) :

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

Équations d'Einstein (relativité générale) :

$$
R_{\mu\nu} - \tfrac{1}{2}\, g_{\mu\nu} R + \Lambda\, g_{\mu\nu}
=
\frac{8\pi G}{c^4}\, T_{\mu\nu}
$$

## Théorie des nombres

Fonction zêta de Riemann et son équation fonctionnelle :

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^{s}}
\qquad
\zeta(s) = 2^{s}\pi^{s-1}\,\sin\!\left(\tfrac{\pi s}{2}\right)\,\Gamma(1-s)\,\zeta(1-s)
$$

Le produit eulérien la relie aux nombres premiers :

$$
\zeta(s) = \prod_{p\ \text{premier}} \frac{1}{1 - p^{-s}}
$$

## Définitions par cas

$$
\operatorname{sgn}(x) =
\begin{cases}
+1 & \text{si } x > 0,\\
\phantom{+}0 & \text{si } x = 0,\\
-1 & \text{si } x < 0.
\end{cases}
$$

## Conseils de rédaction

- **Activation par billet.** Ajoutez `math: true` au frontmatter pour
  charger la feuille de styles KaTeX uniquement sur ce billet (ou cette
  page).
- **En ligne :** entourez avec `$ ... $`. **En bloc :** entourez avec
  `$$ ... $$` sur leurs propres lignes.
- **Échappement :** pour un dollar littéral hors mathématiques,
  utilisez `\$`, par ex. `\$5.00`.
- **Compatible MDX.** La même syntaxe fonctionne dans les fichiers
  `.mdx` ; vous pouvez intercaler des composants JSX.
- **Aucun coût d'exécution.** Les équations sont rendues en HTML + CSS
  à la compilation — pas de bundle MathJax/KaTeX côté client.

Bonne composition !
