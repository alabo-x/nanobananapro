import { getTranslations } from 'next-intl/server';

import { SignIn } from '@/shared/blocks/sign/sign-in';
import { getConfigs } from '@/shared/models/config';
import { getAlternateLanguages, getCanonicalUrl } from '@/shared/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations('common');

  return {
    title: `${t('sign.sign_in_title')} - ${t('metadata.title')}`,
    alternates: {
      canonical: await getCanonicalUrl('/sign-in', locale),
      languages: getAlternateLanguages('/sign-in'),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const configs = await getConfigs();

  return <SignIn configs={configs} callbackUrl={callbackUrl || '/'} />;
}
