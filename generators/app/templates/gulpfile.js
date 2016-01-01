global.__BASE = __dirname;

var gulp = require('gulp');
var taskFiles = require('./gulp/tasks');

Object.keys(taskFiles).forEach(function(taskFileName) {
  var taskFile = taskFiles[taskFileName];

  Object.keys(taskFile).forEach(function(taskKey) {
    var taskValues = taskFile[taskKey];
    var taskName = taskKey === 'default' ?
      taskFileName :
      taskFileName + ':' + taskKey;

    var dependencies = taskValues.dependencies || [];
    var task = taskValues.task ?
      function(cb) { return taskValues.task(cb, gulp); } :
      function(cb) { cb(); };


    gulp.task(taskName, dependencies, task);
  });
});

gulp.task('default', ['bundle:watch']);
