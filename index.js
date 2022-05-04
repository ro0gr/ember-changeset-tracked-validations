'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: require('./package').name,

  init() {
    if (this._super.init) { this._super.init.apply(this, arguments); }

    var checker = new VersionChecker(this);
    checker.for('@eflexsystems/ember-tracked-validations', 'npm').assertAbove('5.0.0', 'ember-changeset-tracked-validations requires @eflexsystems/ember-tracked-validations v5.0.0 and above');
  }
};
