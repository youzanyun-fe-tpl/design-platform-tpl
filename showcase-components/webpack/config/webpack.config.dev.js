const webpack = require('webpack');
const merge = require('webpack-merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const entry = require('./build-entry');
// const MallInfoPlugin = require('../plugin/mall-info');
// const constants = require('./constants');
// const { COMPONENT_INFO_FILE } = constants;

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: entry('src'),
  output: {
    jsonpFunction: 'mallCloudJsonp',
    publicPath: '/',
  },
  /* module: {
    rules: [
      {
        test: /\.js$/,
        resourceQuery: /^\?vue&type=script&lang=js/,
        use: MallInfoPlugin.loader
      }
    ]
  }, */

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin(),
    new FriendlyErrorsPlugin(),
    // new MallInfoPlugin({
    //   filename: COMPONENT_INFO_FILE
    // })
  ]
});
