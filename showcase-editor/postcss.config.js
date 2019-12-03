/* eslint-disable global-require */

const config = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css', 'scss'],
    }),
    require('autoprefixer')(),
    require('precss')(),
  ],
};

module.exports = config;
