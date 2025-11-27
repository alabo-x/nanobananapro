import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';
import { locales, defaultLocale } from '@/config/locale';

// Public pages that should be indexed
// Note: hreflang is handled in HTML <head> via generateMetadata, not in sitemap
const PUBLIC_PAGES = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = envConfigs.app_url || 'https://nano-banana2.pro';
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PUBLIC_PAGES) {
    for (const locale of locales) {
      // Build URL with locale prefix
      const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

      // Normalize path (no trailing slash except for consistency)
      let url: string;
      if (page.path === '/') {
        // Root path: https://domain.com or https://domain.com/es
        url = `${baseUrl}${localePrefix}`;
      } else {
        // Other paths: https://domain.com/pricing or https://domain.com/es/pricing
        url = `${baseUrl}${localePrefix}${page.path}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
