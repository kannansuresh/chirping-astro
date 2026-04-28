import { SITE, type Locale } from '../config';
import { alternates } from '../i18n/utils';

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  type: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  locale: Locale;
  hreflangs: ReturnType<typeof alternates>;
}

interface BuildSeoArgs {
  title?: string;
  description?: string;
  pathWithoutLocale: string;
  fullPath: string;
  locale: Locale;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: Date;
  modifiedTime?: Date;
  tags?: string[];
}

/** Build the SEO data block consumed by `<SEO />`. */
export function buildSeo(args: BuildSeoArgs): SeoMeta {
  return {
    title:
      args.title && args.title !== SITE.title ? `${args.title} — ${SITE.title}` : SITE.title,
    description: args.description ?? SITE.description,
    canonical: new URL(args.fullPath, SITE.url).toString(),
    ogImage: new URL(args.ogImage ?? SITE.defaultOgImage, SITE.url).toString(),
    type: args.type ?? 'website',
    publishedTime: args.publishedTime?.toISOString(),
    modifiedTime: args.modifiedTime?.toISOString(),
    tags: args.tags,
    locale: args.locale,
    hreflangs: alternates(args.pathWithoutLocale),
  };
}
