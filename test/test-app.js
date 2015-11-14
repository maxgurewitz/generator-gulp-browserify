'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('gulp-browserify:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'foo bar' })
      .on('end', done);
  });

  it('renders and creates template files', function () {
    assert.file([
      'gulp/config.json',
      'package.json'
    ]);
  });

  it('correctly sets the browserify name parameters', function() {
    assert.fileContent('gulp/config.json', '"bundleName": "foo-bar"');
    assert.fileContent('gulp/config.json', '"standaloneName": "fooBar"');
  });

  it('correctly sets the package name', function() {
    assert.fileContent('package.json', '"name": "foo-bar"');
  });
});
