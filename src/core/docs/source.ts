// .source folder will be generated when you run `next dev`
import { createElement } from 'react';
import { pages } from '@/.source';
import type { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';

export const i18n: I18nConfig = {
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
};

const iconHelper = (icon: string | undefined) => {
  if (!icon) {
    // You may set a default icon
    return;
  }
  if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
};

// Pages source (privacy-policy, terms-of-service)
export const pagesSource = loader({
  baseUrl: '/',
  source: pages.toFumadocsSource(),
  i18n,
  icon: iconHelper,
});
