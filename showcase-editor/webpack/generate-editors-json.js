/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const editors = require('./utils/get-editor')();

function generateEditorsJson() {
  if (!editors || !editors.length) {
    return;
  }

  const editorList = editors.map(
    (name, index) => `  "${name}": {
    "js": "dist/${name}.js"
  }${index < editors.length - 1 ? ',' : ''}`
  );

  // This file is auto gererated by build/generateEditorsJson.js`;
  const content = `
{
${editorList.join('\n')}
}`;
  fs.writeFileSync(path.join(__dirname, '../src/editors.json'), content);
}

generateEditorsJson();
