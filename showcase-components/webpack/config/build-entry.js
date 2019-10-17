/**
 * auto generate entry file
 */
const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');
const constants = require('./constants');

const { TEMP_FOLDER, GLOBAL_OBJECT } = constants;
/**
 * 构建所有组件的入口对象
 * @param {string} pagesEntry
 */
module.exports = function buildEntries(pagesEntry) {
  const entrys = {};

  fs.ensureDirSync(TEMP_FOLDER);

  // 组件
  const components = glob.sync(path.resolve(`${pagesEntry}/*/App.vue`));
  if (components.length > 0) {
    const output = `${TEMP_FOLDER}/showcase.js`;
    fs.writeFileSync(output, template(components), 'utf-8');
    entrys.showcase = output;
  }

  console.log('entrys', entrys);
  return entrys;
};

/**
 * 获取文件名称
 *
 * @param {string} dir
 * @returns
 */
function transformFileNameToCompoentName(dir) {
  const dirPathArr = dir.split('/');
  const fileName = dirPathArr.pop();
  const compName = dirPathArr.pop();
  const name = fileName.split('.').pop() === 'vue' ? compName : fileName.replace(/\.(vue|js)$/, '');
  return name.replace(/[^\w]+(\w)/g, (input, arg1) => arg1.toUpperCase());
}

/**
 * 将某个文件对象转化为对应的 import 语句
 *
 * @param {EntryItem[]} items
 * @returns
 */
function transformToImport(items) {
  console.log('items', items)
  return items.map((item) => {
    const filePath = item.toString();
    const importPath = path.relative(TEMP_FOLDER, filePath).split(path.sep).join('/');
    console.log('transformToImport', path.relative(TEMP_FOLDER, filePath))
    return `import ${transformFileNameToCompoentName(filePath)} from '${importPath}';`;
  });
}

/**
 * 创建一个页面模板入口文件
 *
 * @param {string} pageName
 * @param {EntryItem[]} globalComponents
 * @param {EntryItem[]} commonComponents
 * @param {EntryItem[]} components
 * @returns
 */
function template(components) {
  const imports = [...transformToImport(components)];

  return `${imports.join('\n')}
  const root = typeof window === 'undefined' ? global : window;
  root.${GLOBAL_OBJECT} = {
    components: { ${components.map(transformFileNameToCompoentName).join(',')} },
  };`;
}
