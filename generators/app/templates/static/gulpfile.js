global.__BASE = __dirname;

var gulp = require('gulp');
var taskFiles = require('./gulp/tasks');

Object.keys(taskFiles).forEach(function(taskFileName) {
  var taskFile = taskFiles[taskFileName];

  Object.keys(taskFile).forEach(function(taskKey) {
    var taskValues = taskFile[taskKey];
    var taskName = taskFileName + ':' + taskKey;
    var dependencies = taskValues.dependencies || [];

    gulp.task(taskName, dependencies, function(cb) {
      return taskValues.task(cb, gulp);
    });
  });
});

gulp.task('default', ['bundle:watch']);
