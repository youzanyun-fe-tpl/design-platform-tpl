const webpack = require('webpack');
const merge = require('webpack-merge');
const entry = require('./build-entry');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: entry('src'),
  output: {
    filename: '[name].js',
    publicPath: 'https://file.yzcdn.cn/mall-cloud/',
    chunkFilename: '[id].js'
  },
  performance: {
    hints: false
  },
  plugins: [
    new ProgressBarPlugin(),
  ]
});
