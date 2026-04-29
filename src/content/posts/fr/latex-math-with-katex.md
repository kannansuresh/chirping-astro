---
title: 'Mathématiques LaTeX avec KaTeX, pré-rendues à la compilation'
description: 'Math en ligne et en bloc, matrices, intégrales, sommes, équations de Maxwell et plus — toutes rendues à la compilation, avec la feuille de style KaTeX chargée uniquement sur les pages opt-in.'
pubDate: 2026-04-26
tags: [math, latex, katex, markdown]
categories: [Rédaction]
translationKey: latex-math-with-katex
math: true
toc: true
heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&auto=format&fit=crop'
heroImageAlt: "Un tableau noir couvert d'équations mathématiques manuscrites"
---

Ce site supporte les **mathématiques de style LaTeX** prêtes à
l'emploi. Les équations sont parsées par
[`remark-math`](https://github.com/remarkjs/remark-math) et rendues
en HTML + CSS pur à la compilation par
[`rehype-katex`](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex).

> **Zéro JavaScript côté client.** Toutes les équations ci-dessous sont
> du markup statique rendu côté serveur. KaTeX ne tourne que sur le
> serveur de build.

## Activer math sur une page

Ajoutez `math: true` au frontmatter de l'article (ou de la page) :

```yaml
---
title: Mon article maths
math: true
---
```

Le composant
[`MathStyles.astro`](src/components/MathStyles.astro) n'est rendu que
quand `math: true`, et le bundling CSS par page d'Astro garantit que
`katex.min.css` (~29 ko) et ses fontes `woff2` sont émis **uniquement
sur les pages qui les utilisent**. Les pages sans maths ne téléchargent
jamais la feuille de style.

## Math en ligne

Encadrez avec un dollar simple : `$ ... $`.

Le théorème de Pythagore énonce que $a^2 + b^2 = c^2$ pour tout
triangle rectangle de côtés $a$, $b$ et hypoténuse $c$. L'identité
d'Euler $e^{i\pi} + 1 = 0$ relie cinq constantes fondamentales. La
constante de structure fine vaut environ $\alpha \approx 1/137{,}036$.

Pour **échapper un dollar littéral** hors maths, écrivez `\$`,
ex. \$5,00.

## Math en bloc

Utilisez `$$ ... $$` sur leurs propres lignes pour des équations
centrées.

### Formule quadratique

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

### Intégrale gaussienne

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

Développement en série de Taylor :

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x - a)^n
$$

## Algèbre linéaire

Une matrice $2 \times 2$ et son déterminant :

$$
A = \begin{pmatrix} a & b \\ c & d \end{pmatrix},\quad \det(A) = ad - bc
$$

Un système linéaire écrit de façon compacte :

$$
\begin{cases}
2x + 3y = 5 \\
4x - y = 1
\end{cases}
$$

## Probabilités & statistiques

Densité de probabilité gaussienne :

$$
f(x \mid \mu, \sigma^2) = \frac{1}{\sigma \sqrt{2\pi}}\, e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

Théorème de Bayes :

$$
P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}
$$

## Physique

Équations de Maxwell en unités SI :

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

Équation de Schrödinger dépendante du temps :

$$
i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H}\, \Psi(\mathbf{r}, t)
$$

## Pièges fréquents

- **Une ligne vide est requise** avant et après un bloc `$$`, sinon
  Markdown peut absorber les délimiteurs.
- La même syntaxe fonctionne en `.md` et en `.mdx`.
- En MDX, ne mettez pas `{` immédiatement après `$` sauf intention de
  faire une expression JSX — échappez avec `\{` au besoin.
- Oubli de `math: true` ? Vous verrez le texte brut `$x^2$` au lieu
  d'une formule. Ajoutez le drapeau et reconstruisez.

## Pour aller plus loin

Associez ceci à l'[article sur les blocs de code](/fr/posts/code-blocks-and-syntax-highlighting)
— les deux ensemble couvrent tout ce qu'il faut pour écrire du
contenu technique sur ce thème.
