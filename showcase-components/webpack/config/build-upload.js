const constants = require('../../constants');
const {logger, createInteractive} = require('../../utils/logger');
const build = require('../../scripts/build');
const upload = require('../../upload-cdn/index');

const { MESSAGE } = constants;

module.exports = async function () {
    const buildLogger = createInteractive({
        scope: MESSAGE.BUILD.SCOPE,
    });
    buildLogger.start(MESSAGE.BUILD.START);

    try {
        await build();
        buildLogger.success(MESSAGE.BUILD.SUCCESS);
    } catch (error) {
        buildLogger.error(MESSAGE.BUILD.FAIL);
        logger.error(error);
        process.exit(-1);
    }

    const uploadLogger = createInteractive({
        scope: `${MESSAGE.CDN.SCOPE}`,
    });
    uploadLogger.start(MESSAGE.CDN.START);

    const { getUploadFiles } = require('../info.js');
    const pageFiles = await getUploadFiles();

    uploadLogger.await(MESSAGE.CDN.UPLOADING);
    try {
        const urls = await upload(pageFiles, {
            showInfo: false
        });
        uploadLogger.success(MESSAGE.CDN.SUCCESS);
        return urls;
    } catch (error) {
        uploadLogger.error(MESSAGE.CDN.FAIL);
        logger.error(error);
        process.exit(-1);
    }
}
