const path = require('path');
const acorn = require('acorn');

const config = require('./config');
const utils = require('./utils');
const check = require('./check-walker');

/**
 * 错误信息上报给主进程
 */
const reportToMaster = item => {
  process.send(item);
};

// 将文件解析成AST
const parseFileToAST = async filename => {
  const source = await utils.readFile(filename);
  const ast = acorn.parse(
    source,
    Object.assign(
      {
        sourceFile: path.resolve(filename),
      },
      config.parserOptions
    )
  );
  return ast;
};

const generateGuardPromiseProducer = files => {
  let i = 0;
  const fileCount = files.length;

  const checkFile = async file => {
    try {
      const ast = await parseFileToAST(file);
      const checkResult = check(ast);
      // 存在检测结果，需要上报
      if (checkResult) {
        reportToMaster({
          type: 'check',
          source: file,
          result: checkResult,
        });
      }
    } catch (error) {
      reportToMaster({
        type: 'parse',
        file,
        error: error.stack,
      });
    }
  };

  return () => {
    if (i < fileCount) {
      return checkFile(files[i++]);
    }

    return null;
  };
};

process.on('message', ({ files }) => {
  const guardPromiseProducer = generateGuardPromiseProducer(files);

  utils
    .consumePromiseProducer(guardPromiseProducer)
    .then(() => process.exit(0))
    .catch(error =>
      reportToMaster({
        type: 'unknow',
        error: error.stack,
      })
    );
});
