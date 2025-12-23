// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config({
  files: ['**/*.ts'],
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    globals: globals.node,
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    prettier: prettierPlugin,
  },
  extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
});
