'use strict';
const assert = require('chai').assert;
const validation = require('../../lib/validation');

describe('The validation function', () => {
  it('throws an error when an invalid configName is passed in', () => {
    let errorFn = () => {
      validation.checkConfig('not-valid-config')
    }
    assert.throws(errorFn, 'Invalid configuration')
  });

  it('does not throw when an valid configName is passed in', () => {
    let errorFn = () => {
      validation.checkConfig('critical')
    }
    assert.doesNotThrow(errorFn)
  });
});
