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

    this.prompt(prompts, function (props) {
      self.props = props;
      self.paramCaseName = changeCase.paramCase(props.name);
      self.camelCaseName = changeCase.camelCase(props.name);

      done();
    });
  },

  writing: {
    static: function () {
      this.fs.copy(this.templatePath('static'), this.destinationPath());
    },

    templates: function () {
      this.fs.copyTpl(this.templatePath('package.ejs.json'), this.destinationPath('package.json'), this);
      this.fs.copyTpl(this.templatePath('gulp-config.ejs.json'), this.destinationPath('gulp/config.json'), this);
    }
  },

  install: function () {
    this.npmInstall();
  }
});
