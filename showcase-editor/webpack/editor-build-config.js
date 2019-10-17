/* eslint-disable no-undef */
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const getBabelOptions = require('./utils/babel-options');
const addEntry = require('./utils/add-entry');

module.exports = {
  mode: 'production',
  entry: addEntry(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'amd',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: getBabelOptions(),
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  externals: {
    react: 'react',
    zent: 'zent',
    'editor-common': 'editor-common',
    editorSelectors: 'editorSelectors',
    'zan-pc-ajax': 'zan-pc-ajax',
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  devtool: 'none',
};
