/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const buildWebpackConfig = require('./config/webpack.config.build');
const { TEMP_FOLDER } = require('./config/constants');

const app = express();

// 清空打包目标路径
rimraf.sync(buildWebpackConfig.output.path);

app.use(express.static(path.join(__dirname, 'dist')));

// 打包代码
webpack(buildWebpackConfig, async (err, stats) => {
  // 打包错误处理
  if (err) {
    throw new Error(err)
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    throw new Error(info.errors.join('\n'))
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
    return;
  }

  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n',
  );

  fs.removeSync(TEMP_FOLDER);
});
