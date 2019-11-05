/* eslint-disable no-console */
/* eslint-disable no-undef */
const chokidar = require('chokidar');
const express = require('express');
const glob = require('fast-glob');
const _ = require('lodash');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const devWebpackConfig = require('./config/webpack.config.dev');
const buildEntries = require('./config/build-entry');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));


async function start() {
  const getCurrentComps = () => {
    const files = glob.sync(path.resolve(__dirname, '../src/*/App.vue'));
    const currentComps = [];
    files.forEach(function(f) {
      const name = /src\/([a-zA-Z0-9-]+)\/App.vue/.exec(f)[1];
      if (name) {
        currentComps.push(name);
      }
    });
    return currentComps;
  };

  let watching;
  // 打包编辑器代码
  const runWebpackWatch = () => {
    // 清空打包目标路径
    rimraf.sync(devWebpackConfig.output.path);
    devWebpackConfig.entry = buildEntries('src');

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
  };

  let currentComps = getCurrentComps();
  runWebpackWatch();

  chokidar.watch(path.resolve(__dirname, '../src')).on('all', (event, path) => {
    const pathReg = /showcase-components\/src\/extension-[a-zA-Z0-9-]+\/App.vue$/;
    if ((event === 'add' || event === 'unlink') && pathReg.test(path)) {
      const newComps = getCurrentComps();
      if (newComps.length === currentComps.length && _.isEqual(newComps, currentComps)) {
        return;
      }
      watching.close(() => {
        currentComps = newComps;
        runWebpackWatch();
      });
    }
  });
}

start();
