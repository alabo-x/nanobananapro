import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import {
  getSoftwareApplicationSchema,
  getFAQPageSchema,
  generateJsonLd,
} from '@/shared/lib/structured-data';
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

  // 获取 FAQ 数据用于结构化数据
  const faqData = t.raw('faq') as {
    items?: { question: string; answer: string }[];
  };
  const faqItems = faqData.items || [];

  // 生成首页专属结构化数据 (SoftwareApplication + FAQPage)
  const structuredData = generateJsonLd([
    getSoftwareApplicationSchema(),
    getFAQPageSchema(faqItems),
  ]);

  // load page component
  const Page = await getThemePage('landing');

  return (
    <>
      {/* 首页结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <Page locale={locale} page={page} />
    </>
  );
}
