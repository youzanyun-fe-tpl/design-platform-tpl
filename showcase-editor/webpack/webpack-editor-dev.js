/* eslint-disable no-console */
/* eslint-disable no-undef */
const watch = require('glob-watcher');
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

// 清空打包目标路径
rimraf.sync(pageWebPackConfig.output.path);

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

// 打包编辑器代码
webpack(pageWebPackConfig).watch(
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
