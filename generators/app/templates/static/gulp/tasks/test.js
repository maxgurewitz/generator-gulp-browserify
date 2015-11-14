var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = require('path');

module.exports.unit = {
  task: function task() {
    return gulp.src(path.join(__BASE, 'test', '**', '*.spec.js'), {read: false})
      .pipe(mocha({reporter: 'spec', timeout: 15000}));
  }
};
