module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        components: ['VLabel'],
        controlComponents: ['VInput'],
        required: {
          every: ['id'],
        },
        allowChildren: true,
      },
    ],
    'vuejs-accessibility/anchor-has-content': [
      'error',
      {
        components: ['Anchor'],
        accessibleDirectives: ['aria-label'],
      },
    ],
  },
};
