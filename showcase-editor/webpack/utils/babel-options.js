const merge = require('webpack-merge');

function getBabelOptions() {
  return merge({
    presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
    plugins: [
      [require.resolve('@babel/plugin-proposal-decorators'), { decoratorsBeforeExport: true }],
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
    ],
    babelrc: false,
  });
}

module.exports = getBabelOptions;
