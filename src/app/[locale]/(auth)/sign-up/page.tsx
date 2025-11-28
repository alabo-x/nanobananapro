import { getTranslations } from 'next-intl/server';

import { SignUp } from '@/shared/blocks/sign/sign-up';
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
    title: `${t('sign.sign_up_title')} - ${t('metadata.title')}`,
    alternates: {
      canonical: await getCanonicalUrl('/sign-up', locale),
      languages: getAlternateLanguages('/sign-up'),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const configs = await getConfigs();

  return <SignUp configs={configs} callbackUrl={callbackUrl || '/'} />;
}
