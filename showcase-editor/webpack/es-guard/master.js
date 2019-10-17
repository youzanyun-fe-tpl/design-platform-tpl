const cluster = require('cluster');
const path = require('path');
const fs = require('fs');
const minimatch = require('minimatch');
const { chunk, forEach } = require('lodash');
const { filter, flatMap, map, pipe } = require('lodash/fp');
const glob = require('glob');

const log = require('../utils/log');

// 读取配置文件
const config = require('./config');

setTimeout(() => {
  log.panic('5分钟仍未完成扫描，可能出现了未知问题，强制退出进程');
}, 5 * 60 * 1000);

/**
 * 子进程上报的错误的格式化方法
 */
const checkReportLogger = {
  parse: item => {
    log.error(`Error while parsing file: ${item.file},\n${item.error}`);
  },
  check: item => {
    const { result, source } = item;
    log.error(`${source} include some forbidden syntax:`);
    forEach(result, rule => {
      const { name, demo, times } = rule;
      const demoStr = demo ? `, maybe denpendency include code like '${rule.demo}'` : '';
      log.warn(`    Find syntax '${name}' ${times} times${demoStr}`);
    });
  },
  unknow: item => {
    log.error(`Unknow Error while process executing: ${item.error}`);
  },
};

// 根据配置文件中的 includes 和 excludes 获取需要检测的文件数组
const files = pipe(
  flatMap(pattern =>
    glob.sync(pattern, {
      cwd: config.cwd,
    })
  ),
  filter(f => config.excludes.every(pattern => !minimatch(f, pattern))),
  map(f => path.resolve(config.cwd, f)),
  filter(f => fs.statSync(f).isFile())
)(config.includes);

if (files.length === 0) {
  log.warn('No matching files found');
  process.exit(0);
}

// 分割成块，每块包括k个文件，每个cpu处理一块，这个算法块的个数可能小于cpu个数
// 可以优化，但是问题不大
const fileChunks = chunk(files, Math.ceil(files.length / config.parallel));

let workerHasError = false;
for (let i = 0; i < fileChunks.length; i++) {
  cluster
    .fork()
    .on('message', item => {
      workerHasError = true;
      // 打印子进程报告的错误信息
      checkReportLogger[item.type](item);
      console.log('\n');
    })
    .send({
      files: fileChunks[i],
    });
}

let finishedWorkerCount = 0;
// 子进程退出的时候会触发这个事件
cluster.on('exit', () => {
  finishedWorkerCount++;

  // 全部子进程退出后，主进程退出
  if (finishedWorkerCount === fileChunks.length) {
    if (workerHasError) {
      log.error('打包结果文件中包含禁用的 ES 语法，请检查仓库依赖是否使用了新语法\n');
    } else {
      log.success('打包结果文件中未发现禁用的 ES 语法\n');
    }
    process.exit(workerHasError ? 1 : 0);
  }
});
