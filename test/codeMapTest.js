'use strict';

const assert = require('assertthat');
const mockery = require('mockery');

const codeMap = require('../lib/codeMap');

suite('codeMap', () => {
  setup((done) => {
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });
    done();
  });

  teardown((done) => {
    mockery.deregisterAll();
    mockery.disable();
    done();
  });

  test('is an object.', (done) => {
    assert.that(codeMap).is.ofType('object');
    done();
  });

  test('update is a function.', (done) => {
    assert.that(codeMap.update).is.ofType('function');
    done();
  });

  test('updates map with new error code list', (done) => {
    // eslint-disable-next-line global-require
    const mockedCodeMap = require('../lib/codeMap');

    assert.that(mockedCodeMap.update([99, 42])).is.null();
    assert.that(mockedCodeMap.map).is.equalTo({ 42: true, 99: true });
    done();
  });

  test('returns an error if code list constains a non number', (done) => {
    const updateError = codeMap.update(['hugo']);

    assert.that(updateError).is.ofType('object');
    assert.that(updateError.message).is.equalTo("Not a number: 'hugo'");
    done();
  });
});
