'use strict';

const codeMap = require('./codeMap');

const assertMongoError = {
  assert (err) {
    if (err && err.name === 'MongoError' && (err.code in codeMap.map)) {
      throw err;
    }
  },
  setCodes (codeList) {
    return codeMap.update(codeList);
  }
};

module.exports = assertMongoError;
