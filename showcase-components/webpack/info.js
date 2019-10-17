const fs = require('fs-extra');
const path = require('path');
const mapValues = require('lodash/mapValues');
const merge = require('lodash/merge');
const constants = require('../constants');

const { DIST_FOLDER, COMPONENT_INFO_FILE } = constants;

module.exports.getUploadFiles = async function() {
  const pageFileNames = await getPageNames();
  const pageFiles = pageFileNames.map(file => path.join(DIST_FOLDER, file));
  return pageFiles;
};

module.exports.getInfo = async function(urls) {
  const componentInfo = getComponentInfo();

  const uploadInfo = {};
  const pageFileNames = await getPageNames();
  pageFileNames.map((fileName, i) => {
    const pageName = fileName.split('.').shift();
    uploadInfo[pageName] = {
      pageName,
      url: urls[i]
    };
  })

  const finalInfo = Object.values(merge({}, componentInfo, uploadInfo));
  const pages = Object.values(finalInfo);

  // 后端接口要求非空
  pages.forEach(item => {
    if (!item.methods) {
      item.methods = [];
    }
    if (!item.components) {
      item.components = [];
    }
  })

  return pages;
};

async function getPageNames() {
  // let distDir = path.resolve(__dirname, '../dist');
  const result = await fs.readdir(DIST_FOLDER)
  const pageFileNames = result.filter((v) => v !== COMPONENT_INFO_FILE);
  return pageFileNames;
}

/**
 * 获取各个页面vue组件的信息
 * @returns
 */
function getComponentInfo() {
  const pagesInfo = fs.readJSONSync(path.join(DIST_FOLDER, COMPONENT_INFO_FILE));
  mapValues(pagesInfo, (pages) => {
    pages.components = JSON.stringify(pages.components);
    pages.methods = JSON.stringify(pages.methods);
  });
  return pagesInfo;
}
