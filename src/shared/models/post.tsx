import { ReactNode } from 'react';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import moment from 'moment';

import { pagesSource } from '@/core/docs/source';

// Page content type (for privacy-policy, terms-of-service)
export interface PageContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  body?: ReactNode;
  toc?: any;
  created_at?: string;
  author_name?: string;
  author_image?: string;
  author_role?: string;
  url: string;
}

// get local page from: content/pages/*.md
export async function getLocalPage({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}): Promise<PageContent | null> {
  const localPage = await pagesSource.getPage([slug], locale);
  if (!localPage) {
    return null;
  }

  const MDXContent = localPage.data.body;
  const body = (
    <MDXContent
      components={getMDXComponents({
        // this allows you to link to other pages with relative file paths
        a: createRelativeLink(pagesSource, localPage),
      })}
    />
  );

  const frontmatter = localPage.data as any;

  const page: PageContent = {
    id: localPage.path,
    slug: slug,
    title: localPage.data.title || '',
    description: localPage.data.description || '',
    content: '',
    body: body,
    toc: localPage.data.toc, // Use fumadocs auto-generated TOC
    created_at: frontmatter.created_at
      ? getPostDate({
          created_at: frontmatter.created_at,
          locale,
        })
      : '',
    author_name: frontmatter.author_name || '',
    author_image: frontmatter.author_image || '',
    author_role: '',
    url: `/${locale}/${slug}`,
  };

  return page;
}

// Helper function to format date
export function getPostDate({
  created_at,
  locale,
}: {
  created_at: string;
  locale?: string;
}) {
  return moment(created_at)
    .locale(locale || 'en')
    .format(locale === 'zh' ? 'YYYY/MM/DD' : 'MMM D, YYYY');
}
