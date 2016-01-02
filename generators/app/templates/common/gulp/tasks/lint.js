var eslint = require('gulp-eslint');
var gulp = require('gulp');

module.exports.js = {
  task: function task() {
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  }
};
