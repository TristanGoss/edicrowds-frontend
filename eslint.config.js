// eslint.config.js
import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Base JS rules
  js.configs.recommended,

  // App files (React + TSX)
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**'],
    ...tseslint.configs.strict[0], // this includes rules + languageOptions
    plugins: {
      ...tseslint.configs.strict[0].plugins,
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...tseslint.configs.strict[0].rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
    },
  },

  // Test files (Vitest / Testing Library)
  {
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {},
  },
];