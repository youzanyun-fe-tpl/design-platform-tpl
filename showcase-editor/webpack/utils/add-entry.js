/* eslint-disable no-undef */
const glob = require('glob');
const path = require('path');

function addEntry() {
  const files = glob.sync('src/editors/*/index.js');

  const newEntries = {};

  files.forEach(function(f) {
    const name = /editors\/([\s\S]+)\/index.js/.exec(f)[1];
    newEntries[name] = path.resolve(__dirname, `../../${f}`);
  });
  return newEntries;
}

module.exports = addEntry;
