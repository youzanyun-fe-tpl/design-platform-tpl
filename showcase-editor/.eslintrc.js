const restrictedGlobals = require('confusing-browser-globals-fresh');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    commonjs: true,
  },
  globals: {
    _global: false,
    __DEBUG__: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
    'plugin:prettier/recommended',
  ],
  plugins: ['lean-imports'],
  settings: {
    react: {
      version: '16.5.0', // React version, default to the latest React stable release
    },
  },
  rules: {
    'max-len': [
      2,
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignorePattern: "^import\\s.*\\s*'.+';$",
      },
    ],
    'require-jsdoc': 0,
    'valid-jsdoc': 0,
    'no-invalid-this': 0,
    'lean-imports/import': [2, ['lodash', 'zan-utils', 'date-fns']],
    'react/no-deprecated': 0,
    'react/prop-types': [2, { skipUndeclared: true }],
    'react/display-name': 0,
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
  },
};
