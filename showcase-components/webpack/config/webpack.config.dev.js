const webpack = require('webpack');
const merge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const entry = require('./build-entry-dev');

module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool: 'source-map',
  entry: entry('src'),
  output: {
    jsonpFunction: 'mallCloudJsonp',
    publicPath: '/',
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin(),
    new FriendlyErrorsPlugin(),
  ]
});
