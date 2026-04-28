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

    'code.copy': 'Copy',
    'code.copied': 'Copied',

    '404.title': 'Page not found',
    '404.description': 'The page you are looking for has flown away.',
    '404.cta': 'Back to home',

    'footer.poweredBy': 'Powered by',
    'footer.theme': 'Theme',
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

    'code.copy': 'Copier',
    'code.copied': 'Copié',

    '404.title': 'Page introuvable',
    '404.description': 'La page que vous cherchez s\u2019est envolée.',
    '404.cta': 'Retour à l\u2019accueil',

    'footer.poweredBy': 'Propulsé par',
    'footer.theme': 'Thème',
    'footer.copyright': 'Tous droits réservés.',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof messages)['en'];
