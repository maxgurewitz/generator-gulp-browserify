'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var self = this;
    var done = this.async();

    this.log(yosay(
      'Welcome to the fine ' + chalk.red('gulp-browserify') + ' generator!'
    ));

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : path.basename(self.destinationRoot())
    }];

    this.devDependencies = [
      'browserify@>=12.0.1 <13.0.0',
      'chai@>=3.4.1 <4.0.0',
      'eslint@>=1.10.3 <2.0.0',
      'eslint-plugin-mocha@>=1.1.0 <2.0.0',
      'gulp@>=3.9.0 <4.0.0',
      'gulp-eslint@>=1.1.1 <2.0.0',
      'gulp-istanbul',
      'gulp-mocha@>=2.2.0 <3.0.0',
      'gulp-rename@>=1.2.2 <2.0.0',
      'gulp-util@>=3.0.7 <4.0.0',
      'require-directory@>=2.1.1 <3.0.0',
      'vinyl-source-stream@>=1.1.0 <2.0.0',
      'watchify@>=3.6.1 <4.0.0'
    ];

    this.dependencies = [];

    this.prompt(prompts, function (props) {
      self.props = props;
      self.paramCaseName = changeCase.paramCase(props.name);
      self.camelCaseName = changeCase.camelCase(props.name);
      done();
    });
  },

  writing: {
    templates: function () {
      this.fs.copyTpl(this.templatePath('common'), this.destinationPath(), this);
      this.fs.copyTpl(this.templatePath('common/.*'), this.destinationPath(), this);
    }
  },

  install: function () {
    this.npmInstall(this.devDependencies, { 'saveDev': true });

    if (this.dependencies.length) {
      this.npmInstall(this.dependencies, { 'save': true });
    }
  }
});
