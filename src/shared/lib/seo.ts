import { getTranslations, setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { locales, defaultLocale } from '@/config/locale';

// get metadata for page component
export function getMetadata(
  options: {
    title?: string;
    description?: string;
    keywords?: string;
    metadataKey?: string;
    canonicalUrl?: string; // relative path or full url
    imageUrl?: string;
    appName?: string;
    noIndex?: boolean;
  } = {}
) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    setRequestLocale(locale);

    // passed metadata
    const passedMetadata = {
      title: options.title,
      description: options.description,
      keywords: options.keywords,
    };

    // default metadata
    const defaultMetadata = await getTranslatedMetadata(
      defaultMetadataKey,
      locale
    );

    // translated metadata
    let translatedMetadata: any = {};
    if (options.metadataKey) {
      translatedMetadata = await getTranslatedMetadata(
        options.metadataKey,
        locale
      );
    }

    // canonical url and hreflang
    const canonicalPath = options.canonicalUrl || '/';
    const canonicalUrl = await getCanonicalUrl(canonicalPath, locale || '');
    const alternateLanguages = getAlternateLanguages(canonicalPath);

    const title =
      passedMetadata.title || translatedMetadata.title || defaultMetadata.title;
    const description =
      passedMetadata.description ||
      translatedMetadata.description ||
      defaultMetadata.description;

    // image url
    let imageUrl = options.imageUrl || '/logo.png';
    if (imageUrl.startsWith('http')) {
      imageUrl = imageUrl;
    } else {
      imageUrl = `${envConfigs.app_url}${imageUrl}`;
    }

    // app name
    let appName = options.appName;
    if (!appName) {
      appName = envConfigs.app_name || '';
    }

    return {
      title:
        passedMetadata.title ||
        translatedMetadata.title ||
        defaultMetadata.title,
      description:
        passedMetadata.description ||
        translatedMetadata.description ||
        defaultMetadata.description,
      keywords:
        passedMetadata.keywords ||
        translatedMetadata.keywords ||
        defaultMetadata.keywords,
      alternates: {
        canonical: canonicalUrl,
        languages: alternateLanguages,
      },

      openGraph: {
        type: 'website',
        locale: locale,
        url: canonicalUrl,
        title,
        description,
        siteName: appName,
        images: [imageUrl.toString()],
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl.toString()],
        site: envConfigs.app_url,
      },

      robots: {
        index: options.noIndex ? false : true,
        follow: options.noIndex ? false : true,
      },
    };
  };
}

const defaultMetadataKey = 'common.metadata';

async function getTranslatedMetadata(metadataKey: string, locale: string) {
  setRequestLocale(locale);
  const t = await getTranslations(metadataKey);

  return {
    title: t.has('title') ? t('title') : '',
    description: t.has('description') ? t('description') : '',
    keywords: t.has('keywords') ? t('keywords') : '',
  };
}

// Get base URL with a production check
function getBaseUrl(): string {
  const baseUrl = envConfigs.app_url;

  if (
    process.env.NODE_ENV === 'production' &&
    (!baseUrl || baseUrl === 'http://localhost:3000')
  ) {
    console.error(
      '[SEO Warning] NEXT_PUBLIC_APP_URL not configured properly for production. Canonical and hreflang URLs will be incorrect.'
    );
  }

  return baseUrl || 'http://localhost:3000';
}

async function getCanonicalUrl(canonicalPath: string, locale: string) {
  // Handle full URLs
  if (canonicalPath.startsWith('http')) {
    return canonicalPath;
  }

  const baseUrl = getBaseUrl();

  // Normalize path: ensure starts with /, remove trailing slash (except for root)
  let path = canonicalPath;
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Build full URL with locale prefix
  const localePrefix = !locale || locale === defaultLocale ? '' : `/${locale}`;

  // For root path, don't add extra slash
  if (path === '/') {
    return `${baseUrl}${localePrefix}`;
  }

  return `${baseUrl}${localePrefix}${path}`;
}

// Generate alternate language URLs for hreflang
function getAlternateLanguages(canonicalPath: string): Record<string, string> {
  const baseUrl = getBaseUrl();

  // Normalize path
  let path = canonicalPath;
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  const languages: Record<string, string> = {};

  // Add each locale
  for (const locale of locales) {
    const localePrefix = locale === defaultLocale ? '' : `/${locale}`;
    if (path === '/') {
      languages[locale] = `${baseUrl}${localePrefix}`;
    } else {
      languages[locale] = `${baseUrl}${localePrefix}${path}`;
    }
  }

  // Add x-default pointing to default locale version
  if (path === '/') {
    languages['x-default'] = `${baseUrl}`;
  } else {
    languages['x-default'] = `${baseUrl}${path}`;
  }

  return languages;
}

export { getCanonicalUrl, getAlternateLanguages };
