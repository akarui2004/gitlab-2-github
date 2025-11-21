// eslint.config.cjs
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      // Disable base ESLint rules that conflict with TypeScript
      'no-unused-vars': 'off',
      'no-undef': 'off',
      // TypeScript ESLint recommended rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      // Prettier integration
      // Note: Prettier options should be in .prettierrc, not here
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      // Additional stylistic rules
      'prefer-const': 'error',
      // max-len is disabled by eslint-config-prettier (Prettier handles line length)
      'eqeqeq': ['error', 'smart'],
      'curly': ['error', 'multi-line', 'consistent'],
      // consistent-return can conflict with TypeScript's type checking
      // but it's useful for ensuring all code paths return
      'consistent-return': 'error',
    },
  },
];
