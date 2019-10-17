const webpack = require('webpack');
const merge = require('webpack-merge');
const entry = require('./build-entry');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MallInfoPlugin = require('../plugin/mall-info');
const baseConfig = require('./webpack.config.base');
const constants = require('./constants');
const { COMPONENT_INFO_FILE } = constants;

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: entry('src'),
  output: {
    filename: '[name].[chunkhash:8].js',
    publicPath: 'https://file.yzcdn.cn/mall-cloud/',
    chunkFilename: '[id].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('src')],
        use: MallInfoPlugin.loader
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new ProgressBarPlugin(),
    new MallInfoPlugin({
      filename: COMPONENT_INFO_FILE
    })
  ]
});
