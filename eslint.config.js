import pluginJs from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    plugins: {
      react: pluginReact,
      'react-refresh': pluginReactRefresh,
      prettier: pluginPrettier,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  },
  {
    ignores: ['node_modules/**', 'build'],
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      ...configPrettier.rules,
      'react/jsx-no-target-blank': 'off',
      'prefer-const': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'error',
      'import/no-anonymous-default-export': 'off',
      camelcase: 'off',
      'linebreak-style': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: 'multiline-const',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-let',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-var',
          next: '*',
        },
      ],
    },
  },
];
