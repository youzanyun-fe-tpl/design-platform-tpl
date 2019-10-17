const fs = require('fs');

/**
 * @param {string} filename
 * @return {Promise<string>}
 */
const readFile = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};

/**
 * @param {() => (Promise | null)} runner
 * @return {Promise}
 */
const consumePromiseProducer = async runner => {
  const nextPromise = runner();
  if (!nextPromise) {
    return Promise.resolve();
  }
  await nextPromise;
  return await consumePromiseProducer(runner);
};

module.exports = {
  readFile,
  consumePromiseProducer,
};
