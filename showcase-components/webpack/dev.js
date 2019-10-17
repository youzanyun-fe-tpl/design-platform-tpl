/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const devWebpackConfig = require('./config/webpack.config.dev');

const app = express();

// 清空打包目标路径
rimraf.sync(devWebpackConfig.output.path);

app.use(express.static(path.join(__dirname, 'dist')));

// 打包代码
webpack(devWebpackConfig).watch(
  {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000,
    'info-verbosity': 'verbose',
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      // 错误处理
    }
  }
);
