/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const excludes = [
  // 'index.ts',
  // 'index.css',
  // 'style',
  // 'mixins',
  // 'utils',
  // '.DS_Store'
];

module.exports = function() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../../src/editors'));
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1);
};
