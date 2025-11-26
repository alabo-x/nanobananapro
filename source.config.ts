import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

// Pages source (privacy-policy, terms-of-service)
export const pages = defineDocs({
  dir: 'content/pages',
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultLanguage: 'plaintext',
    },
  },
});
