/** @format */

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@antfu', 'plugin:vue/recommended', 'eslint:recommended'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debuger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
