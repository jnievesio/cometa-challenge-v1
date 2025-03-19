import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsESLintPlugin from '@typescript-eslint/eslint-plugin';
const { configs } = tsESLintPlugin;
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  { ignores: ['dist'] },  // Ignorar la carpeta dist
  js.configs.recommended,
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': tsESLintPlugin,
      reactHooks,
      reactRefresh,
      prettier: prettierPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': ['error', { endOfLine: 'auto' }]
    },
  },
];