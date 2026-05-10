---
title: '欢迎使用 Chirping Astro'
description: '从这里开始。本指南将带您了解这个 Astro v6 + Tailwind v4 + daisyUI 主题的所有功能，以及展示每个功能的专业演示文章地图。'
pubDate: 2026-04-30
updatedDate: 2026-04-30
tags: [astro, tailwind, daisyui, 主题, 入门]
categories: [公告]
translationKey: welcome
heroImage: ../../../assets/images/posts/welcome/devices-mockup.png
heroImageAlt: 'Chirping Astro 主题在多种设备上的响应式渲染。'
pinned: true
toc: true
---

你好，欢迎使用 **Chirping Astro**。这是一个受 [Chirpy](https://chirpy.cotes.page/) 启发，从头构建的单模板多语言 Astro v6 主题，采用严格的 TypeScript 代码库、Tailwind v4、daisyUI v5、MDX、Pagefind 和 Giscus。

这篇文章是前门。本站的其他每篇文章都是专注于单个功能的具体教程——从您想先了解的功能开始阅读即可。

## 这个主题给您带来什么

- **Chirpy 风格的三栏布局** — 带头像和导航的侧边栏，阅读栏，以及文章目录或列表页右侧的"最近更新/热门标签"面板。
- **一流的 i18n** — 英语在 URL 根路径，法语在 `/fr`，配有智能语言切换器，可以跳转到等效的翻译文章（当存在时）。
- **Markdown + MDX**，配合 [Expressive Code](https://expressive-code.com) 实现语法高亮、复制按钮、框架标题、行标记、diff 和可折叠部分。
- **LaTeX 数学**通过 KaTeX 实现，在构建时预渲染，**零客户端 JavaScript** — 并且样式表仅在选择加入的页面加载。
- **Pagefind 搜索** — 使用 `/` 和 `Cmd/Ctrl+K` 快捷键的头部模态框，加上专用的 `/search/` 页面。
- **Giscus 评论**连接到 GitHub Discussions，与主题和语言环境同步，支持每篇文章覆盖设置。
- **两个 daisyUI 主题**（`chirpy-light` / `chirpy-dark`），配有动画切换，在支持的浏览器使用 View Transitions API。
- **隐私政策** — 带可切换页脚链接的双语可定制模板（在 `src/config.ts` 中设置 `showPrivacyPolicy: true/false`）。
- **阅读时间、粘性目录（带滚动监听）、每种语言的 RSS、hreflang sitemap、无障碍焦点管理** — 把细节做好。

## 通过文章逐一体验功能

下面的每篇文章都专注于一个功能。它们同时也是演示：某篇文章谈论数学，它本身就设置了 `math: true`；某篇文章谈论封面图片，它本身就有一张 hero 图片；以此类推。

| 功能 | 阅读这篇文章 |
| --------------------- | ------------------------------------------------------------------------------- |
| Frontmatter 和 schema | [Frontmatter 参考](/zh/posts/frontmatter-reference) |
| 排版和 Markdown | [排版与 Markdown](/zh/posts/typography-and-markdown) |
| 代码块 | [代码块与语法高亮](/zh/posts/code-blocks-and-syntax-highlighting) |
| Alert 代码块 | [Alert 插件：所有变体](/zh/posts/alerts-all-variants) |
| LaTeX 数学 | [使用 KaTeX 的 LaTeX 数学](/zh/posts/latex-math-with-katex) |
| MDX 组件 | [MDX 组件和 Callouts](/zh/posts/mdx-components-and-callouts) |
| i18n | [双语内容与 i18n](/zh/posts/i18n-bilingual-content) |
| 搜索 | [使用 Pagefind 搜索](/zh/posts/search-with-pagefind) |
| 评论 | [使用 Giscus 评论](/zh/posts/comments-with-giscus) |
| 主题 | [主题与深色模式](/zh/posts/theming-and-dark-mode) |
| 封面图片 | [封面图片和媒体](/zh/posts/featured-images-and-media) |

## 什么是置顶的，什么是列出的

这篇文章是置顶的——这就是 frontmatter 中 `pinned: true` 标志的效果。置顶文章始终排在列表和首页顶部，即使存在更新的文章。

## 关于惯用代码的一句话

这个代码库中的所有内容都旨在像正常的 Astro 项目一样阅读，而不是配置大杂烩。如果您想扩展它：

- 组件位于 [src/components/](src/components/) 和 [src/components/islands/](src/components/islands/)。
- 布局位于 [src/layouts/](src/layouts/)。
- 所有站点/主题旋钮位于 [src/config.ts](src/config.ts)。
- 翻译位于 [src/i18n/ui.ts](src/i18n/ui.ts)。

从全新的克隆设置主题的详细文档在仓库根目录的项目 **`README.md`** 中——在您的编辑器中打开它，或点击网站页脚中的 **Chirping Astro** 链接跳转到上游主题仓库。您可以在 `src/config.ts` 内的 `SITE.footer.themeUrl` 中自定义该链接。

## 起始模板

想跳过演示内容重新开始？使用 [**Chirping Astro Starter**](https://github.com/kannansuresh/chirping-astro-starter)
— 一个最小的、可直接部署的版本，会自动与此主题保持同步：

```bash
bunx create-astro@latest --template kannansuresh/chirping-astro-starter
```

启用 GitHub Pages、推送，您就上线了。

愉快的博客之旅。 ✨
