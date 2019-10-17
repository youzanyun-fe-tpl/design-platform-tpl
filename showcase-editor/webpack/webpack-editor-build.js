// 编译插件

const rimraf = require('rimraf');
const webpack = require('webpack');

const pageWebPackConfig = require('./editor-build-config');

// 清空打包目标路径
rimraf.sync(pageWebPackConfig.output.path);

// 打包业务代码
webpack(pageWebPackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 错误处理
  }
});
