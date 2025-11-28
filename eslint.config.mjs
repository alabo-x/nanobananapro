import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Global ignores
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      '.source/**',
      'public/**',
    ],
  },
  // Base JS config
  js.configs.recommended,
  // TypeScript config
  ...tseslint.configs.recommended,
  // React & Next.js config
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // React Hooks rules
      // rules-of-hooks 已修复，设为 error 防止新违规
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Next.js rules
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      // TypeScript rules - 宽松配置
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      // JS rules - 宽松配置（项目原有代码问题，暂时放宽）
      'prefer-const': 'off',
      'no-unused-vars': 'off', // 使用 TypeScript 版本
      'no-useless-catch': 'warn',
      'no-self-assign': 'warn',
      'no-constant-condition': 'warn',
      'no-constant-binary-expression': 'warn',
      // TypeScript 额外规则
      '@typescript-eslint/ban-ts-comment': 'warn'
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default eslintConfig;
