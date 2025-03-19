import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsESLintPlugin from '@typescript-eslint/eslint-plugin';
import tsESLintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'], // Aplicar estas reglas solo a archivos TypeScript
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Variables globales del navegador
      parser: tsESLintParser, // Usar el parser de TypeScript
      parserOptions: {
        project: './tsconfig.json', // Usar el archivo tsconfig.json
      },
    },
    plugins: {
      '@typescript-eslint': tsESLintPlugin, // Plugin de TypeScript
      'react-hooks': reactHooks, // Plugin de React Hooks
      'react-refresh': reactRefresh, // Plugin de React Refresh
      prettier: prettierPlugin, // Plugin de Prettier
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Advertir sobre variables no usadas
      'react-hooks/rules-of-hooks': 'error', // Error en reglas de Hooks
      'react-hooks/exhaustive-deps': 'warn', // Advertir sobre dependencias de Hooks
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Advertir sobre exportaciones no válidas
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // Integración con Prettier
    },
  },
];