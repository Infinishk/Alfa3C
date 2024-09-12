import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  // Primero aplicas las configuraciones recomendadas por Prettier
  pluginJs.configs.recommended,

  // Luego aplicas tus reglas personalizadas
  {
    ignores: ['public/js/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      semi: ['error', 'always'], // Asegura el uso de punto y coma
      quotes: ['error', 'single'], // Fuerza el uso de comillas simples
      'no-unused-vars': ['error', {
        'vars': 'all',
        'args': 'none'
      }],
      curly: ['error', 'all'], 
      'no-var': 'error', 
      'prefer-const': 'error', 
      'no-console': ['warn', {
        allow: ['warn', 'error']
      }]
    },
  },
  {
    files: ['public/js/**/*.js'], // Ajusta esta ruta según tu proyecto
    languageOptions: {
      globals: {
        ...globals.browser,
        $: 'readonly', // Si utilizas jQuery
        moment: 'readonly', // Moment.js
      },
    },
    rules: {
      'no-console': ['warn', {
        allow: ['warn', 'error']
      }], 
      'no-unused-expressions': 'error',
      'no-extra-semi': 'error', 
      'no-alert': 'warn',
      'camelcase': ['error', {
        properties: 'always'
      }], 
      'strict': ['error', 'function'],
      'no-script-url': 'error',
      'no-implied-eval': 'error',
    },
  },
];