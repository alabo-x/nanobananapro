import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getLocalPage } from '@/shared/models/post';
import { getAlternateLanguages, getCanonicalUrl } from '@/shared/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations('common.metadata');

  const canonicalPath = `/${slug}`;
  const canonicalUrl = await getCanonicalUrl(canonicalPath, locale);
  const alternateLanguages = getAlternateLanguages(canonicalPath);

  const page = await getLocalPage({ slug, locale });
  if (!page) {
    return {
      title: `${slug} | ${t('title')}`,
      description: t('description'),
      alternates: {
        canonical: canonicalUrl,
        languages: alternateLanguages,
      },
    };
  }

  return {
    title: `${page.title} | ${t('title')}`,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Get the page from pagesSource
  const page = await getLocalPage({ slug, locale });
  if (!page) {
    return notFound();
  }

  const Page = await getThemePage('page-detail');

  return <Page locale={locale} post={page} />;
}
