import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import { Landing } from '@/shared/types/blocks/landing';

// Generate metadata with hreflang for homepage
export const generateMetadata = getMetadata({
  canonicalUrl: '/',
});

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // load page data
  const t = await getTranslations('landing');

  // build page params
  const page: Landing = {
    hero: t.raw('hero'),
    generator: t.raw('generator'),
    features: t.raw('features'),
    testimonials: t.raw('testimonials'),
    showcase: t.raw('showcase'),
    faq: t.raw('faq'),
  };

  // load page component
  const Page = await getThemePage('landing');

  return <Page locale={locale} page={page} />;
}
