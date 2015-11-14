var gulp = require('gulp');
var util = require('gulp-util');
var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var config = require('../config');

var bundlePath = path.join(__BASE, 'src', 'index.js');

function bundle(bundler) {
  return bundler
    .bundle()
    .on('error', function handleError(err) {
      util.log('Bundle error: ' + String(err));
    })
    .pipe(source(bundlePath))
    .pipe(rename(config.bundleName + '.js'))
    .pipe(gulp.dest(path.join(__BASE, 'lib')));
}

module.exports.watch = {
  task: function task() {
    var browserifyOpts = {
      cache: {},
      packageCache: {},
      debug: true,
      standalone: config.standaloneName
    };

    var bundler = browserify(bundlePath, browserifyOpts);

    watchify(bundler, { delay: 10 })
      .on('update', function updateBundle() {
        bundle(bundler);
      })
      .on('log', function logUpdate(msg) {
        util.log(msg);
      });

    return bundle(bundler);
  }
};
