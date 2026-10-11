import js from '@eslint/js';

export default [
  { ignores: ['node_modules/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'tests/**/*.js', '*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { document: 'readonly', localStorage: 'readonly', fetch: 'readonly', FormData: 'readonly', crypto: 'readonly', Intl: 'readonly', Date: 'readonly', Number: 'readonly', JSON: 'readonly', Error: 'readonly', String: 'readonly', Array: 'readonly', console: 'readonly' } },
  },
];
