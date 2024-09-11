import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  // Primero aplicas las configuraciones recomendadas por Prettier
  pluginJs.configs.recommended,

  // Luego aplicas tus reglas personalizadas
  {
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
];