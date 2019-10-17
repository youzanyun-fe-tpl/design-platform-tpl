const path = require('path');

module.exports = {
  GLOBAL_OBJECT: 'yunComps',
  DIST_FOLDER: path.resolve(__dirname, '../../dist'),
  TEMP_FOLDER: path.resolve(__dirname, '../../node_modules/.showcase-temp'),
  COMPONENT_INFO_FILE: 'info.json',
};
