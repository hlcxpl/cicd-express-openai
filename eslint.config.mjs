// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';

export default [
  // 1) Ignorados (sustituye lo que tenías en .eslintignore)
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.next/**',
      'out/**',
      '.turbo/**',
      // añade aquí lo que necesites ignorar
    ],
  },

  // 2) Reglas recomendadas
  js.configs.recommended,

  // 3) CommonJS
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },

  // 4) ESM (.mjs)
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // 5) Tests (Jest)
  {
    files: ['**/*.test.js', '**/__tests__/**/*.js'],
    languageOptions: {
      globals: { ...globals.jest },
    },
  },
];
