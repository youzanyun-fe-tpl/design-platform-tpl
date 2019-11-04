/* eslint-disable no-console */
/* eslint-disable no-undef */
const glob = require('glob');
const chokidar = require('chokidar');
const watch = require('glob-watcher');
const _ = require('lodash');
const rimraf = require('rimraf');
const webpack = require('webpack');
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
const editorsJson = require('../src/editors.json');

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });
const root = path.resolve(__dirname, '..');

const pageWebPackConfig = require('./editor-dev-config');
const addEntry = require('./utils/add-entry');

app.use(express.static(path.join(__dirname, 'dist')));

// server.listen(3000, () => console.log('Example app listening on port 3000!'));

let latestClient;
ws.on('connection', function(socket, request) {
  latestClient = socket;
});

// 如果插件文件变动，通知浏览器重新加载插件
function clientReload() {
  if (latestClient) {
    latestClient.send('reload');
  }
}

const watcher = watch(['dist/plugin/*.js', 'dist/plugin/*.css']);

watcher.on('change', function(path, stat) {
  clientReload();
});

app.get('/editor/js', (req, res) => {
  const name = req.query.name;
  res.set('Content-Type', 'application/javascript; charset=utf-8');
  res.sendFile(editorsJson[name].js, {
    root: root,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  });
});

async function start() {
  const getCurrentEditors = () => {
    const files = glob.sync(path.resolve(__dirname, '../src/editors/*/index.js'));
    const currentEditors = [];
    files.forEach(function(f) {
      const name = /editors\/([a-zA-Z0-9-]+)\/index.js/.exec(f)[1];
      if (name) {
        currentEditors.push(name);
      }
    });
    return currentEditors;
  };

  let watching;
  // 打包编辑器代码
  const runWebpackWatch = () => {
    // 清空打包目标路径
    rimraf.sync(pageWebPackConfig.output.path);
    pageWebPackConfig.entry = addEntry();

    watching = webpack(pageWebPackConfig).watch(
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
        isBuilding = false;
      }
    );
  };

  let currentEditors = getCurrentEditors();
  runWebpackWatch();

  chokidar.watch(path.resolve(__dirname, '../src')).on('all', (event, path) => {
    const pathReg = /showcase-editor\/src\/editors\/extension-[a-zA-Z0-9-]+\/index.js$/;
    if ((event === 'add' || event === 'unlink') && pathReg.test(path)) {
      const newEditors = getCurrentEditors();
      if (newEditors.length === currentEditors.length && _.isEqual(newEditors, currentEditors)) {
        return;
      }
      watching.close(() => {
        currentEditors = newEditors;
        runWebpackWatch();
      });
    }
  });
}

start();
