/**
 * UI dictionaries.
 * Add new locales by adding a key to `messages` and to `SITE.locales` in
 * src/config.ts. All keys must exist for every locale (TypeScript enforces it).
 */

import type { Locale } from '../config';

export const messages = {
  en: {
    'site.skipToContent': 'Skip to content',
    'nav.home': 'Home',
    'nav.posts': 'Posts',
    'nav.tags': 'Tags',
    'nav.categories': 'Categories',
    'nav.archives': 'Archives',
    'nav.about': 'About',
    'nav.search': 'Search',
    'nav.toggleMenu': 'Toggle menu',

    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    'lang.switcher': 'Language',
    'lang.en': 'English',
    'lang.fr': 'French',

    'post.publishedOn': 'Published on',
    'post.updatedOn': 'Updated on',
    'post.readingTime': 'min read',
    'post.toc': 'Table of contents',
    'post.tags': 'Tags',
    'post.categories': 'Categories',
    'post.previous': 'Previous',
    'post.next': 'Next',
    'post.comments': 'Comments',
    'post.commentsDisabled': 'Comments are disabled for this post.',
    'post.commentsSetupTitle': 'Comments need configuration',
    'post.commentsSetupBody':
      'Giscus is enabled but not yet configured. Add the repository details below to start collecting comments.',
    'post.commentsSetupStep1':
      'Visit `giscus.app` and select your public GitHub repository (Discussions must be enabled).',
    'post.commentsSetupStep2':
      'Copy the generated `data-repo-id`, `data-category` and `data-category-id` values.',
    'post.commentsSetupStep3':
      'Set the `PUBLIC_GISCUS_ENABLED`, `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY` and `PUBLIC_GISCUS_CATEGORY_ID` env vars in your `.env` file.',
    'post.commentsSetupStep4':
      'Rebuild the site — this notice will be replaced by the live comments thread.',
    'post.commentsSetupDocs': 'Open giscus.app',
    'post.share': 'Share',
    'post.copyLink': 'Copy link',
    'post.copied': 'Copied!',
    'post.author': 'Author',

    'list.allPosts': 'All posts',
    'list.empty': 'No posts found.',
    'list.tagPosts': 'Posts tagged',
    'list.categoryPosts': 'Posts in',
    'list.totalPosts': 'posts',
    'list.totalPostsOne': 'post',

    'pagination.previous': 'Previous page',
    'pagination.next': 'Next page',
    'pagination.page': 'Page',
    'pagination.of': 'of',

    'archives.title': 'Archives',
    'archives.empty': 'No posts yet.',

    'tags.title': 'Tags',
    'tags.empty': 'No tags yet.',

    'categories.title': 'Categories',
    'categories.empty': 'No categories yet.',

    'search.title': 'Search',
    'search.placeholder': 'Search the site',
    'search.openLabel': 'Open search',
    'search.closeLabel': 'Close search',
    'search.empty': 'No results.',
    'search.loading': 'Loading search…',
    'search.typeToStart': 'Type to search…',
    'search.hintShortcut': 'Press / anywhere to open search',
    'search.searching': 'Searching…',
    'search.noResultsFor': 'No results for',
    'search.resultsCount': 'results',
    'search.resultsCountOne': 'result',
    'search.hintNavigate': 'to navigate',
    'search.hintSelect': 'to open',
    'search.clearLabel': 'Clear',

    'code.copy': 'Copy',
    'code.copied': 'Copied',

    '404.title': 'Page not found',
    '404.description': 'The page you are looking for has flown away.',
    '404.cta': 'Back to home',

    'footer.poweredBy': 'Powered by',
    'footer.theme': 'Theme',
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': 'All rights reserved.',
  },

  fr: {
    'site.skipToContent': 'Aller au contenu',
    'nav.home': 'Accueil',
    'nav.posts': 'Articles',
    'nav.tags': 'Étiquettes',
    'nav.categories': 'Catégories',
    'nav.archives': 'Archives',
    'nav.about': 'À propos',
    'nav.search': 'Rechercher',
    'nav.toggleMenu': 'Basculer le menu',

    'theme.toggle': 'Changer de thème',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'theme.system': 'Système',

    'lang.switcher': 'Langue',
    'lang.en': 'Anglais',
    'lang.fr': 'Français',

    'post.publishedOn': 'Publié le',
    'post.updatedOn': 'Mis à jour le',
    'post.readingTime': 'min de lecture',
    'post.toc': 'Sommaire',
    'post.tags': 'Étiquettes',
    'post.categories': 'Catégories',
    'post.previous': 'Précédent',
    'post.next': 'Suivant',
    'post.comments': 'Commentaires',
    'post.commentsDisabled': 'Les commentaires sont désactivés pour cet article.',
    'post.commentsSetupTitle': 'Les commentaires doivent être configurés',
    'post.commentsSetupBody':
      'Giscus est activé mais pas encore configuré. Renseignez les informations du dépôt ci-dessous pour activer les commentaires.',
    'post.commentsSetupStep1':
      'Rendez-vous sur `giscus.app` et sélectionnez votre dépôt GitHub public (les Discussions doivent être activées).',
    'post.commentsSetupStep2':
      'Copiez les valeurs générées de `data-repo-id`, `data-category` et `data-category-id`.',
    'post.commentsSetupStep3':
      'Définissez les variables d\u2019environnement `PUBLIC_GISCUS_ENABLED`, `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY` et `PUBLIC_GISCUS_CATEGORY_ID` dans votre fichier `.env`.',
    'post.commentsSetupStep4':
      'Reconstruisez le site — cet avis sera remplacé par le fil de commentaires en direct.',
    'post.commentsSetupDocs': 'Ouvrir giscus.app',
    'post.share': 'Partager',
    'post.copyLink': 'Copier le lien',
    'post.copied': 'Copié !',
    'post.author': 'Auteur',

    'list.allPosts': 'Tous les articles',
    'list.empty': 'Aucun article.',
    'list.tagPosts': 'Articles étiquetés',
    'list.categoryPosts': 'Articles dans',
    'list.totalPosts': 'articles',
    'list.totalPostsOne': 'article',

    'pagination.previous': 'Page précédente',
    'pagination.next': 'Page suivante',
    'pagination.page': 'Page',
    'pagination.of': 'sur',

    'archives.title': 'Archives',
    'archives.empty': 'Aucun article pour le moment.',

    'tags.title': 'Étiquettes',
    'tags.empty': 'Aucune étiquette.',

    'categories.title': 'Catégories',
    'categories.empty': 'Aucune catégorie.',

    'search.title': 'Recherche',
    'search.placeholder': 'Rechercher sur le site',
    'search.openLabel': 'Ouvrir la recherche',
    'search.closeLabel': 'Fermer la recherche',
    'search.empty': 'Aucun résultat.',
    'search.loading': 'Chargement de la recherche…',
    'search.typeToStart': 'Tapez pour rechercher…',
    'search.hintShortcut': 'Appuyez sur / pour ouvrir la recherche',
    'search.searching': 'Recherche…',
    'search.noResultsFor': 'Aucun résultat pour',
    'search.resultsCount': 'résultats',
    'search.resultsCountOne': 'résultat',
    'search.hintNavigate': 'pour naviguer',
    'search.hintSelect': 'pour ouvrir',
    'search.clearLabel': 'Effacer',

    'code.copy': 'Copier',
    'code.copied': 'Copié',

    '404.title': 'Page introuvable',
    '404.description': 'La page que vous cherchez s\u2019est envolée.',
    '404.cta': 'Retour à l\u2019accueil',

    'footer.poweredBy': 'Propulsé par',
    'footer.theme': 'Thème',
    'footer.privacy': 'Politique de confidentialité',
    'footer.copyright': 'Tous droits réservés.',
  },

  zh: {
    'site.skipToContent': '跳到内容',
    'nav.home': '首页',
    'nav.posts': '文章',
    'nav.tags': '标签',
    'nav.categories': '分类',
    'nav.archives': '归档',
    'nav.about': '关于',
    'nav.search': '搜索',
    'nav.toggleMenu': '切换菜单',

    'theme.toggle': '切换主题',
    'theme.light': '浅色',
    'theme.dark': '深色',
    'theme.system': '跟随系统',

    'lang.switcher': '语言',
    'lang.en': '英语',
    'lang.fr': '法语',
    'lang.zh': '中文',

    'post.publishedOn': '发布于',
    'post.updatedOn': '更新于',
    'post.readingTime': '分钟阅读',
    'post.toc': '目录',
    'post.tags': '标签',
    'post.categories': '分类',
    'post.previous': '上一篇',
    'post.next': '下一篇',
    'post.comments': '评论',
    'post.commentsDisabled': '此文章已关闭评论功能。',
    'post.commentsSetupTitle': '评论需要配置',
    'post.commentsSetupBody': 'Giscus 已启用但尚未配置。请在下方添加仓库信息以开始收集评论。',
    'post.commentsSetupStep1': '访问 `giscus.app` 并选择您的公开 GitHub 仓库（必须启用 Discussions）。',
    'post.commentsSetupStep2': '复制生成的 `data-repo-id`、`data-category` 和 `data-category-id` 值。',
    'post.commentsSetupStep3': '在您的 `.env` 文件中设置 `PUBLIC_GISCUS_ENABLED`、`PUBLIC_GISCUS_REPO`、`PUBLIC_GISCUS_REPO_ID`、`PUBLIC_GISCUS_CATEGORY` 和 `PUBLIC_GISCUS_CATEGORY_ID` 环境变量。',
    'post.commentsSetupStep4': '重新构建站点 — 此提示将被实时评论线程替换。',
    'post.commentsSetupDocs': '打开 giscus.app',
    'post.share': '分享',
    'post.copyLink': '复制链接',
    'post.copied': '已复制！',
    'post.author': '作者',

    'list.allPosts': '所有文章',
    'list.empty': '暂无文章。',
    'list.tagPosts': '标签为',
    'list.categoryPosts': '分类为',
    'list.totalPosts': '篇文章',
    'list.totalPostsOne': '篇文章',

    'pagination.previous': '上一页',
    'pagination.next': '下一页',
    'pagination.page': '第',
    'pagination.of': '页，共',

    'archives.title': '归档',
    'archives.empty': '暂无文章。',

    'tags.title': '标签',
    'tags.empty': '暂无标签。',

    'categories.title': '分类',
    'categories.empty': '暂无分类。',

    'search.title': '搜索',
    'search.placeholder': '搜索本站',
    'search.openLabel': '打开搜索',
    'search.closeLabel': '关闭搜索',
    'search.empty': '无结果。',
    'search.loading': '加载中…',
    'search.typeToStart': '输入以开始搜索…',
    'search.hintShortcut': '按 / 键打开搜索',
    'search.searching': '搜索中…',
    'search.noResultsFor': '无结果：',
    'search.resultsCount': '条结果',
    'search.resultsCountOne': '条结果',
    'search.hintNavigate': '导航',
    'search.hintSelect': '打开',
    'search.clearLabel': '清除',

    'code.copy': '复制',
    'code.copied': '已复制',

    '404.title': '页面未找到',
    '404.description': '您访问的页面已消失。',
    '404.cta': '返回首页',

    'footer.poweredBy': '由',
    'footer.theme': '主题',
    'footer.privacy': '隐私政策',
    'footer.copyright': '版权所有',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof messages)['en'];
