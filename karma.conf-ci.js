'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
  path.join(conf.paths.src, '/**/*.html')
];

function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.tmp, '/serve/app/index.module.js'),
    ])
    .concat(pathSrcHtml);
}

module.exports = function(config) {
  if (!process.env.SAUCE_USERNAME) {
    console.log('Expected credentials setup');
    process.exit(1);
  }

  var customLaunchers = {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '45'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '39'
      },
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      }
  };

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/',
      moduleName: 'disclosurePanel'
    },

    logLevel: 'WARN',

    frameworks: ['jasmine'],

    browserNoActivityTimeout: 3600000,
    browserDisconnectTimeout: 3600000,

    plugins : [
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-sauce-launcher'
    ],


    sauceLabs: {
      testName: 'Angular disclosure panel'
    },

    captureTimeout: 3600000,
    customLaunchers: customLaunchers,

    browsers: Object.keys(customLaunchers),

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    reporters: ['dots', 'saucelabs']
  };

  // This is the default preprocessors configuration for a usage with Karma cli
  // The coverage preprocessor in added in gulp/unit-test.js only for single tests
  // It was not possible to do it there because karma doesn't let us now if we are
  // running a single test or not
  configuration.preprocessors = {};
  pathSrcHtml.forEach(function(path) {
    configuration.preprocessors[path] = ['ng-html2js'];
  });

  config.set(configuration);
};
