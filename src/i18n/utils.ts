/**
 * i18n utilities.
 *
 * Routing rules:
 *  - EN is the default locale and serves at the URL root with NO prefix.
 *  - FR is served under `/fr/...`.
 *
 * Source-of-truth: `src/config.ts` -> SITE.locales / SITE.defaultLocale.
 */

import { SITE, type Locale } from '../config';
import { messages, type UIKey } from './ui';

const DEFAULT_LOCALE: Locale = SITE.defaultLocale;

/** Returns the leading locale prefix or '' for the default locale. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

/**
 * Build a localized URL for the given pathname (without locale prefix).
 *
 *   localizedPath('/posts/foo', 'en') -> '/posts/foo'
 *   localizedPath('/posts/foo', 'fr') -> '/fr/posts/foo'
 *   localizedPath('/', 'fr')          -> '/fr/'
 */
export function localizedPath(path: string, locale: Locale): string {
  const cleaned = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return cleaned;
  if (cleaned === '/') return `/${locale}/`;
  return `/${locale}${cleaned}`;
}

/**
 * Detect the current locale from a URL or Astro.url.pathname.
 * Anything starting with `/fr` or `/fr/` resolves to 'fr'; otherwise
 * the default locale is returned.
 */
export function detectLocale(pathname: string): Locale {
  for (const locale of SITE.locales) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

/**
 * Strip the locale prefix from a pathname so it can be relocalized.
 *
 *   stripLocale('/fr/posts/foo')  -> '/posts/foo'
 *   stripLocale('/posts/foo')     -> '/posts/foo'
 *   stripLocale('/fr')            -> '/'
 */
export function stripLocale(pathname: string): string {
  for (const locale of SITE.locales) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}` || pathname === `/${locale}/`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(`/${locale}`.length);
  }
  return pathname;
}

/**
 * Translation helper. Returns the localized string for the given key,
 * falling back to the default locale, then to the key itself.
 *
 *   const t = useTranslations('fr');
 *   t('nav.home') // 'Accueil'
 */
export function useTranslations(locale: Locale): (key: UIKey) => string {
  return function t(key: UIKey): string {
    const dict = messages[locale] ?? messages[DEFAULT_LOCALE];
    return dict[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
  };
}

/**
 * Locale-aware date formatter.
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return '';
  if (SITE.isoDates) return d.toISOString().slice(0, 10);
  const lang = locale === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(lang, options).format(d);
}

/** Short ISO 8601 date used for <time datetime="..."> attributes. */
export function isoDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}

/**
 * Map a "logical" path through every supported locale to power
 * <link rel="alternate" hreflang="..."> SEO tags.
 *
 * `pathWithoutLocale` should be the canonical path WITHOUT locale prefix
 * (e.g. '/posts/welcome' for both EN and FR).
 */
export function alternates(pathWithoutLocale: string): Array<{
  locale: Locale | 'x-default';
  href: string;
}> {
  const list: Array<{ locale: Locale | 'x-default'; href: string }> = SITE.locales.map(
    (locale) => ({
      locale,
      href: new URL(localizedPath(pathWithoutLocale, locale), SITE.url).toString(),
    }),
  );
  list.push({
    locale: 'x-default',
    href: new URL(localizedPath(pathWithoutLocale, DEFAULT_LOCALE), SITE.url).toString(),
  });
  return list;
}

/** Compute the canonical URL for a localized path. */
export function canonicalUrl(pathname: string): string {
  return new URL(pathname, SITE.url).toString();
}

/** Pretty label for the language switcher. */
export function localeLabel(locale: Locale): string {
  switch (locale) {
    case 'fr':
      return 'Français';
    case 'en':
    default:
      return 'English';
  }
}

/** ISO BCP 47 language tag for `<html lang>` and date formatters. */
export function htmlLang(locale: Locale): string {
  switch (locale) {
    case 'fr':
      return 'fr-FR';
    case 'en':
    default:
      return 'en-US';
  }
}
