import { envConfigs } from '@/config';

const BASE_URL = envConfigs.app_url || 'https://nano-banana2.pro';
const SITE_NAME = envConfigs.app_name || 'Nano Banana 2';

/**
 * Organization 结构化数据（全局）
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@nano-banana2.pro',
      contactType: 'customer service',
    },
  };
}

/**
 * WebSite 结构化数据（全局）
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    inLanguage: ['en', 'es'],
  };
}

/**
 * SoftwareApplication 结构化数据（首页）
 * 价格：月付 $19.90，年付 $15.92/月
 */
export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    description:
      'AI-powered image editor with natural language editing. Transform your images instantly with simple text prompts.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '15.92',
      highPrice: '19.90',
      offerCount: '2',
    },
  };
}

/**
 * FAQPage 结构化数据（首页）
 */
export function getFAQPageSchema(
  faqItems: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * 生成 JSON-LD script 标签内容
 */
export function generateJsonLd(schemas: object | object[]) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  return JSON.stringify(
    schemaArray.length === 1 ? schemaArray[0] : schemaArray
  );
}
