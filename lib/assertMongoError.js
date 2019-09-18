'use strict';

const log = require('@sealsystems/log').getLogger();
const SealError = require('@sealsystems/error');

const codeMap = require('./codeMap');

const assertMongoError = {
  assert(err, message, code, metadata) {
    if (err && err.name === 'MongoError' && err.code in codeMap.map) {
      const sealError = new SealError('Severe MongoDB error, exiting process.').chain(err);

      log.fatal(sealError.message, sealError.metadata);
      /* eslint-disable no-process-exit */
      process.exit(1);
      /* eslint-enable no-process-exit */
    }
    if (message) {
      throw new SealError(message, code, metadata).chain(err);
    }
  },
  setCodes(codeList) {
    return codeMap.update(codeList);
  }
};

module.exports = assertMongoError;
