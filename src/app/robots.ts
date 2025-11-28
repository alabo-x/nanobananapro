import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';

export default function robots(): MetadataRoute.Robots {
  const configuredUrl = envConfigs.app_url;

  // Check if running in actual cloud deployment (not local build)
  const isCloudDeployment = !!(
    process.env.VERCEL ||
    process.env.CF_PAGES ||
    process.env.NETLIFY ||
    process.env.AWS_LAMBDA_FUNCTION_NAME
  );

  // Production deployment requires a configured domain
  if (process.env.NODE_ENV === 'production') {
    if (!configuredUrl || configuredUrl === 'http://localhost:3000') {
      if (isCloudDeployment) {
        throw new Error(
          'NEXT_PUBLIC_APP_URL is required for production robots.txt generation. Please set it in your environment variables.'
        );
      } else {
        console.warn(
          '[SEO Warning] NEXT_PUBLIC_APP_URL not configured. Using localhost fallback for local build.'
        );
      }
    }
  }

  const baseUrl = configuredUrl || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*?*q=',
        '/privacy-policy',
        '/terms-of-service',
        '/settings/*',
        '/activity/*',
        '/admin/*',
        '/api/*',
        '/sign-in',
        '/sign-up',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
