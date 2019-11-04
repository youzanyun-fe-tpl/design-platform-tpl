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
    components.forEach(function(compPath) {
      const name = /showcase-components\/src\/([a-zA-Z0-9-]+)\/App.vue/.exec(compPath)[1];
      const output = `${TEMP_FOLDER}/${name}.js`;
      fs.writeFileSync(output, template(name, compPath), 'utf-8');
      entrys[name] = output;
    });
  }

  // console.log('entrys', entrys);
  return entrys;
};

/**
 * 创建一个页面模板入口文件
 *
 * @param {string} pageName
 * @param {EntryItem[]} components
 * @returns
 */
function template(name, compPath) {
  const compName = name.replace(/[^\w]+(\w)/g, (input, arg1) => arg1.toUpperCase());
  return `
    import ${compName} from '${compPath}';
    const root = typeof window === 'undefined' ? global : window;
    if (!root.${GLOBAL_OBJECT}) {
      root.${GLOBAL_OBJECT} = {
        components: {}
      };
    } else if (!root.${GLOBAL_OBJECT}.components) {
      root.${GLOBAL_OBJECT}.components = {}
    }

    root.${GLOBAL_OBJECT}.components['${name}'] = ${compName};
  `;
}
