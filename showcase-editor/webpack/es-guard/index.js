const cluster = require('cluster');

function main() {
  if (cluster.isMaster) {
    require('./master');
  } else {
    require('./worker');
  }
}

main();
