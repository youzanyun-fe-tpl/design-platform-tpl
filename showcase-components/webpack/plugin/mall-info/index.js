const path = require('path');
const merge = require('lodash/merge');
const constants = require('../../../constants');
const {logger} = require('../../../utils/logger');

const { GLOBAL_COMPONENTS_FOLDER, COMMON_COMPONENTS_FOLDER } = constants;

// 保存nodeName --> pageName --> compPath 的映射关系
const compsPathInfo = {};
// 保存compPath --> 组件name信息的映射关系
const mallCompsInfo = {};
// 保存pageName --> methods的映射关系
// const methodsInfo = {}

// 最终生成info文件信息
const finalInfo = {};

class MallInfoPlugin {
  constructor(options) {
    this.options = options;
  }

  static loader() {
    return {
      loader: path.resolve(__dirname, './loader')
    };
  }

  static addComponentsInfo({ resourcePath, nodeName, templeteName, info }) {
    if (nodeName) {
      compsPathInfo[nodeName] = compsPathInfo[nodeName] || {};
      compsPathInfo[nodeName][templeteName] = compsPathInfo[nodeName][templeteName] || [];

      const index = compsPathInfo[nodeName][templeteName].indexOf(resourcePath);
       // 新增
      if (index === -1) {
        compsPathInfo[nodeName][templeteName].push(resourcePath);
      } else { // 修改
        compsPathInfo[nodeName][templeteName][index] = resourcePath;
      }
    } else {
      compsPathInfo[templeteName] = compsPathInfo[templeteName] || [];
      const index = compsPathInfo[templeteName].indexOf(resourcePath);
       // 新增
      if (index === -1) {
        compsPathInfo[templeteName].push(resourcePath);
      } else { // 修改
        compsPathInfo[templeteName][index] = resourcePath;
      }
    }
    mallCompsInfo[resourcePath] = info;
  }

  apply(complier) {
    complier.hooks.compilation.tap(MallInfoPlugin.name, (compilation) => {
      compilation.assets[this.options.filename] = {
        source: () => {
          let pathInfo = {};
          const globalPathInfo = compsPathInfo[GLOBAL_COMPONENTS_FOLDER] || [];
          if (globalPathInfo.length > 0) {
            pathInfo[GLOBAL_COMPONENTS_FOLDER] = globalPathInfo;
          }

          const nodeNames = Object.keys(compsPathInfo).filter(item => item !== GLOBAL_COMPONENTS_FOLDER && item !== 'assets' && item.startsWith('node_'));
          nodeNames.map(node => {
            const nodePathInfo = compsPathInfo[node][COMMON_COMPONENTS_FOLDER] || [];
            if (nodePathInfo.length > 0) {
              pathInfo[node] = [...globalPathInfo, ...nodePathInfo];
            }

            const pageNames = Object.keys(compsPathInfo[node]).filter(item => item !== COMMON_COMPONENTS_FOLDER) || [];
            pageNames.map(page => {
              pathInfo[page] = [...globalPathInfo, ...nodePathInfo, ...compsPathInfo[node][page]];
            });
          });

          Object.keys(pathInfo).forEach(pageName => {
            const comps = pathInfo[pageName].map(item => mallCompsInfo[item]);
            if (comps.length > 0) {
              if (!finalInfo[pageName]) {
                finalInfo[pageName] = {};
              }
              finalInfo[pageName].components = comps;

              const compNames = comps.map(item => item.name);
              // 相同组件name校验
              for (let i = 0; i < compNames.length; i++) {
                // 存在相同的name
                if (compNames.slice(i + 1).indexOf(compNames[i]) !== -1) {
                  // console.error(`\n存在相同的组件name: ${compNames[i].slice(6)}`);
                  console.log('\n')
                  logger.error(`存在相同的组件name: ${compNames[i].slice(6)}`)
                  process.exit(-1);
                }
              }
            }
          })
          return JSON.stringify(finalInfo);
        },
        size() {
          return JSON.stringify(finalInfo).length;
        }
      };
    });
  }
};

module.exports = MallInfoPlugin;
