module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:sonarjs/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'jest', 'compat', 'sonarjs', 'optimize-regex'],
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-warning-comments': [1, { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'sonarjs/cognitive-complexity': ['warn', 20],
    'sonarjs/no-duplicate-string': 'warn',
  },
};
