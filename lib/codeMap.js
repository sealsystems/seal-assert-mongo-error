'use strict';

const codeMap = {
  map: {
    1: true,
    6: true,
    7: true,
    8: true,
    11: true,
    13: true,
    17: true,
    18: true,
    89: true,
    140: true,
    141: true,
    223: true,
    9001: true,
    14031: true
  },
  update (codeList) {
    const newMap = {};

    for (let i = 0; i < codeList.length; i++) {
      if (isNaN(Number(codeList[i]))) {
        return new Error(`Not a number: '${codeList[i]}'`);
      }
      newMap[Number(codeList[i])] = true;
    }
    this.map = newMap;
    return null;
  }
};

module.exports = codeMap;
