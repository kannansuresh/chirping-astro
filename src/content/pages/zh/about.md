---
title: 关于
description: Chirping Astro — 一个受 Chirpy 启发的多语言 Astro 主题，专为作家和折腾者打造。
translationKey: about
---

**Chirping Astro** 是一个开源主题，将流行的 [Chirpy Jekyll 主题](https://chirpy.cotes.page/) 的外观和体验带到了 [Astro](https://astro.build/) —— 拥有一流的国际化、现代工具链，默认零 JavaScript 阅读体验。

它适用于个人博客、技术日志和文档站点，在这些场景中排版、搜索和安静的专注阅读比动画和广告位更重要。

## 包含内容

- **阅读优先布局** — 左侧固定侧边栏，包含头像、垂直导航、主题切换和社会化链接；居中的主栏最大宽度 1250px；右侧栏显示"最近更新"和"热门标签"。
- **浅色和深色主题** — 原创 Chirpy 配色方案，移植到 daisyUI v5 令牌，模式切换有圆形揭示过渡效果。
- **多语言内容（英语 + 法语）** — 英语在根路径，法语在 `/fr/`。文章通过 `translationKey` 配对，顶部栏的语言切换器可在翻译之间跳转。在 `src/config.ts` 中设置 `multilingual: false` 可发布单语言站点。
- **Markdown + MDX** — Astro Content Collections，带类型化 frontmatter、Shiki 语法高亮、GFM、脚注、自动目录和内置的 `<Callout>` 组件。
- **LaTeX 数学** — 通过 `math: true` 可为每篇文章选择启用 KaTeX 支持。
- **即时搜索** — [Pagefind](https://pagefind.app/) 在构建时生成静态搜索索引；搜索浮层按需加载。
- **评论** — [Giscus](https://giscus.app/) 集成，由 GitHub Discussions 支持，支持每篇文章选择退出。
- **流畅导航** — Astro 视图过渡，带微妙的淡入淡出和减少动画的备用方案以提高无障碍性。
- **开箱即用的 SEO** — OpenGraph、Twitter 卡片、每种语言 locale 的 RSS feeds、hreflang 和 sitemap。

## 技术栈

- [**Astro 6.x**](https://astro.build/) — Content Collections、MDX、RSS 和视图过渡
- [**Tailwind CSS v4**](https://tailwindcss.com/) 通过 `@tailwindcss/vite` 插件，配合 [**daisyUI v5**](https://daisyui.com/) 主题
- [**Pagefind**](https://pagefind.app/) 静态搜索
- [**Giscus**](https://giscus.app/) 评论
- [**Shiki**](https://shiki.style/)、[**KaTeX**](https://katex.org/) 和 [**Lucide**](https://lucide.dev/) 图标

## 自定义

几乎所有内容都通过 [`src/config.ts`](https://github.com/) 中的单个类型化配置文件连接 — 站点标题、作者、导航、社交链接、每页文章数、默认语言、Giscus 凭证和功能标志。编辑后重启 `bun run dev`。

新文章放在 `src/content/posts/<locale>/`。通过在两个文件中设置相同的 `translationKey` 来配对翻译。

## 许可证与致谢

基于 **MIT 许可证**发布。视觉设计是对 [Cotes Chung 的 Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) 的致敬；Astro 实现、内容和代码是独立的。
