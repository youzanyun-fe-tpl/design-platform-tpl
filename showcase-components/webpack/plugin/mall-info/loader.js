const esprima = require('esprima');
const path = require('path');
const MallInfoPlugin = require('./index');
const constants = require('../../../constants');

const { GLOBAL_COMPONENTS_FOLDER } = constants;

/**
 * 提取组件文件中的信息
 *
 * @param {string} source
 * @this {import('webpack').loader.LoaderContext}
 * @returns
 */
module.exports = function MallInfoLoader(source) {
  let resourcePath = this.resourcePath;
  resourcePath = resourcePath.split(path.sep).join('/');
  const fileName = resourcePath.split('/').pop().split('.');
  const name = fileName.shift();
  const type = fileName.pop();

  // vue
  if (type === 'vue' && name === 'App') {
    /*
     * 解析语法树
     * [{
     *    type: 'ExportDefaultDeclaration',
     *    declaration: [{
     *      type: 'ObjectExpression',
     *      properties: [{
     *      type: 'Property',
     *      key: [{type: 'Identifier', name: ''}],
     *      computed: false,
     *      value: [{type: 'Literal', value: ''}],
     *      kind: 'init',
     *      method: false,
     *      shorthand: false
     *    }]
     * }]
     */
    const ast = esprima.parseModule(source).body;
    const exportDefaultAst = ast.filter(astItem => astItem.type === 'ExportDefaultDeclaration');
    const componentProperties = {};
    exportDefaultAst.map(astItem => {
      if (astItem.declaration.type === 'ObjectExpression') {
        const propAst = astItem.declaration.properties;

        propAst.map(item => {
          if (item.key.type === 'Identifier' && item.value.type === 'Literal' && (item.key.name === 'name' || item.key.name === 'title')) {
            componentProperties[item.key.name] = item.value.value;
          }
        });
      }
    });
    if (!componentProperties.name) {
      throw new Error(`${resourcePath} 没有导出组件属性:name`);
    }
    MallInfoPlugin.addComponentsInfo({
      resourcePath: this.resourcePath, 
      nodeName, 
      templeteName: moduleName, 
      info: componentProperties
    });
  }

  return source;
};
