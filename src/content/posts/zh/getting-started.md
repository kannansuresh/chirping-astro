---
title: '入门指南'
description: '使用 Chirping Astro 的第一篇文章。了解如何配置站点、编写文章和部署。'
pubDate: 2026-05-03
tags: [入门, 教程]
categories: [指南]
translationKey: getting-started
pinned: true
toc: true
---

欢迎使用您的新博客！本文将带您了解使用 **Chirping Astro** 的基础知识。

## 配置您的站点

打开 `src/config.ts` 并更新：

- **title** — 您的站点/博客名称
- **description** — 显示在搜索引擎和 RSS 中
- **author.name** — 显示在侧边栏和页脚中
- **url** — 您的生产环境 URL（通过 `SITE_URL` 环境变量设置以进行部署）

## 环境变量

将 `.env.example` 复制到 `.env`：

```bash
cp .env.example .env
```

关键变量：

| 变量 | 用途 |
| ---------------------- | ---------------------------------------------------------- |
| `SITE_URL` | 您的生产环境 URL（例如 `https://myblog.com`） |
| `BASE_PATH` | 对于 GitHub Pages 设置为 `/<repo-name>`，否则留空 |
| `PUBLIC_GITHUB_HANDLE` | 在侧边栏显示 GitHub 图标 |
| `PUBLIC_GISCUS_*` | 启用 Giscus 评论（[设置指南](https://giscus.app)） |

## 编写文章

在 `src/content/posts/<locale>/` 中创建 Markdown 文件：

```markdown
---
title: '我的文章标题'
description: '用于 SEO 和列表显示的简短描述。'
pubDate: 2026-05-03
tags: [标签1, 标签2]
categories: [分类]
---

使用标准 Markdown 在此编写您的内容。
```

### 可用的 frontmatter 字段

| 字段 | 必填 | 描述 |
| ------------- | -------- | ------------------------------ |
| `title` | 是 | 文章标题（1-140 个字符） |
| `description` | 是 | 元描述（1-280 个字符） |
| `pubDate` | 是 | 发布日期（ISO 格式） |
| `tags` | 否 | 标签数组 |
| `categories` | 否 | 分类数组 |
| `heroImage` | 否 | 封面图片路径 |
| `pinned` | 否 | 固定在列表顶部 |
| `toc` | 否 | 显示目录 |
| `draft` | 否 | 在生产环境隐藏 |

## 使用 MDX

对于更丰富的内容，使用 `.mdx` 文件来包含组件：

```mdx
---
title: 'MDX 示例'
description: '在文章中使用组件。'
pubDate: 2026-05-03
tags: [mdx]
categories: [指南]
---

import Callout from '../../components/Callout.astro';

<Callout type="tip">您可以直接在文章中嵌入 Astro 组件！</Callout>
```

## 部署

推送到 GitHub 的 `main` 分支。包含的工作流会自动构建并部署到 GitHub Pages。

对于自定义域名，请在您的仓库的 **Settings → Environments → github-pages** 下的环境变量中设置 `SITE_URL`。

## 了解更多

- [完整文档](https://github.com/kannansuresh/chirping-astro)
- [在线演示](https://kannansuresh.github.io/chirping-astro)
- [Astro 文档](https://docs.astro.build)

---

祝您博客愉快！准备好发布自己的内容时删除这篇文章。
