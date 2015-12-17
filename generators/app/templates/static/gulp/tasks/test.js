var gulp = require('gulp');
var mocha = require('gulp-mocha');
var path = require('path');
var istanbul = require('gulp-istanbul');

function generateUnitTestStream() {
  return gulp.src(path.join(__BASE, 'test', 'unit', '**', '*.spec.js'), {read: false})
    .pipe(mocha({reporter: 'spec', timeout: 15000}));
}

module.exports.prepareCoverage = {
  task: function task() {
    return gulp.src(path.join(__BASE, 'src', '**', '*.js'))
      .pipe(istanbul())
      .pipe(istanbul.hookRequire());
  }
};

module.exports.unitWithCoverage = {
  task: function task() {
    return generateUnitTestStream()
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
  },
  dependencies: ['test:prepareCoverage']
};

module.exports.unit = {
  task: function task() {
    return generateUnitTestStream();
  }
};

module.exports.default = {
  dependencies: ['lint:js', 'test:unitWithCoverage']
};
