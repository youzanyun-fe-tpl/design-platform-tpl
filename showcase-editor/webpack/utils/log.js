const chalk = require('chalk');

module.exports = {
  success(msg) {
    console.log(chalk.green(msg));
  },

  info(msg) {
    console.log(chalk.grey(msg));
  },

  warn(msg) {
    console.warn(chalk.yellow(msg));
  },

  error(msg) {
    console.error(chalk.red(msg));
  },

  panic(msg = '', exitCode = 1) {
    if (msg) {
      console.error(chalk.red(msg));
    }
    process.exit(exitCode);
  },
};
