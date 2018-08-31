'use strict';

const assert = require('assertthat');
const mockery = require('mockery');

const assertMongoError = require('../lib/assertMongoError');

suite('assertMongoError', () => {
  let codeUpdateCalled;
  let updateError;

  setup((done) => {
    codeUpdateCalled = 0;
    updateError = null;
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });
    mockery.registerMock('./codeMap', {
      map: { 18: true },
      update () {
        codeUpdateCalled++;

        return updateError;
      }
    });
    done();
  });

  teardown((done) => {
    mockery.deregisterAll();
    mockery.disable();
    done();
  });

  test('is an object.', (done) => {
    assert.that(assertMongoError).is.ofType('object');
    done();
  });

  test('assert is a function.', (done) => {
    assert.that(assertMongoError.assert).is.ofType('function');
    done();
  });

  test('setCodes is a function.', (done) => {
    assert.that(assertMongoError.setCodes).is.ofType('function');
    done();
  });

  test('calls exit on severe mongo error', (done) => {
    const testError = new Error('test error');

    testError.name = 'MongoError';
    testError.code = 18;

    const origExit = process.exit;

    process.exit = (code) => {
      process.exit = origExit;
      assert.that(code).is.equalTo(1);
      assert.that(codeUpdateCalled).is.equalTo(0);
      done();
    };

    assertMongoError.assert(testError);
    process.exit = origExit;
    throw new Error('X');
  });

  test('is not throwing an error if code is not in list', (done) => {
    const testError = new Error('test error');

    testError.name = 'MongoError';
    testError.code = 19;
    assert.that(() => {
      assertMongoError.assert(testError);
    }).is.not.throwing();
    assert.that(codeUpdateCalled).is.equalTo(0);
    done();
  });

  test('throws new error if message is given', (done) => {
    const origError = new Error('orig error');

    origError.name = 'MongoError';
    origError.code = 19;

    try {
      assertMongoError.assert(origError, 'Blöd gelaufen');
      throw new Error('X');
    } catch (err) {
      assert.that(codeUpdateCalled).is.equalTo(0);
      assert.that(err.message).is.equalTo('Blöd gelaufen');
      assert.that(err.metadata.cause).is.equalTo({ code: 19, message: 'orig error', metadata: {} });

      return done();
    }
  });

  test('calls update in code map', (done) => {
    const mockedAssertMongoError = require('../lib/assertMongoError');

    assert.that(mockedAssertMongoError.setCodes([42, 43, 44])).is.null();
    assert.that(codeUpdateCalled).is.equalTo(1);

    done();
  });

  test('returns the code update error', (done) => {
    const mockedAssertMongoError = require('../lib/assertMongoError');

    updateError = new Error('update error');
    const setCodesError = mockedAssertMongoError.setCodes(['hugo']);

    assert.that(setCodesError).is.ofType('object');
    assert.that(setCodesError.message).is.equalTo('update error');
    done();
  });
});
