/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Karma
  -----

  This file contains all the boring setup to get the tests to run with karma.

*/

var Promise = require('bluebird')
var karma = require('karma')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))
var flatten = require('flatten')

// runs a set of testPackages in karma (a test package is an object
// that looks like: { name, css, dependencesJs, moduleJs, specJs }
// destDir is a directory where the results should be written to
module.exports = function (testPackages, destDir, phantomOnly) {
  return Promise.all(testPackages.map(function (testPackage) {
    var moduleDir = path.join(destDir, 'lib', testPackage.moduleName)
    return Promise.all([
      fs.outputFileAsync(path.join(moduleDir, 'dependencies.js'), testPackage.dependenciesJs || ''),
      fs.outputFileAsync(path.join(moduleDir, 'dependencies.css'), testPackage.dependenciesCss || ''),
      fs.outputFileAsync(path.join(moduleDir, 'module.js'), testPackage.moduleJs || ''),
      fs.outputFileAsync(path.join(moduleDir, 'module.css'), testPackage.moduleCss || ''),
      fs.outputFileAsync(path.join(moduleDir, 'spec.js'), testPackage.specJs ? bootstrapSpec(testPackage.moduleName, testPackage.specJs) : ''),
      fs.outputFileAsync(path.join(moduleDir, 'bootstrap.js'), testPackage.specJs ? generateBootstrapJs(testPackage.moduleName) : '')
    ]).then(function () {
      return [
        path.join(moduleDir, 'dependencies.js'),
        path.join(moduleDir, 'dependencies.css'),
        path.join(moduleDir, 'module.js'),
        path.join(moduleDir, 'module.css'),
        path.join(moduleDir, 'bootstrap.js'),
        path.join(moduleDir, 'spec.js')
      ]
    })
  })).then(function (files) {
    return runKarma(flatten(files), destDir, phantomOnly)
  })
}

function generateBootstrapJs (moduleName) {
  return [
    'window.hxs = window.hxs || {}',
    'window.hxs["' + moduleName + '"] = window.hx'
  ].join('\n')
}

function createBeforeAllScript (moduleName) {
  return [
    "window.hx = window.hxs['" + moduleName + "'];",
    "var head = document.getElementsByTagName('head').item(0);",
    "var link = document.createElement('link');",
    "link.setAttribute('rel', 'stylesheet');",
    "link.setAttribute('href', '/base/target/test-library/lib/" + moduleName + "/dependencies.css');",
    "link.setAttribute('id', '" + moduleName + "-dependencies-css');",
    'head.appendChild(link);',
    "link = document.createElement('link');",
    "link.setAttribute('rel', 'stylesheet');",
    "link.setAttribute('href', '/base/target/test-library/lib/" + moduleName + "/module.css');",
    "link.setAttribute('id', '" + moduleName + "-module-css');",
    'head.appendChild(link);',
    "document.body.innerHTML = '';"
  ].join('\n')
}

function createAfterAllScript (moduleName) {
  return [
    "var head = document.getElementsByTagName('head').item(0)",
    "head.removeChild(document.getElementById('" + moduleName + "-dependencies-css'));",
    "head.removeChild(document.getElementById('" + moduleName + "-module-css'));"
  ].join('\n')
}

function bootstrapSpec (moduleName, js) {
  return [
    'describe("' + moduleName + '", function() {',
    'beforeAll(function() {' + createBeforeAllScript(moduleName) + '})',
    'afterAll(function() {' + createAfterAllScript(moduleName) + '})',
    js,
    '})'
  ].join('\n')
}

function runKarma (files, destDir, phantomOnly) {
  var coverageDir = path.join(destDir, 'coverage')
  var coverageReporter = {
    reporters: [
      { type: 'html', dir: coverageDir, file: 'coverage.html' },
      { type: 'json', dir: coverageDir, file: 'coverage.json' },
      { type: 'json', dir: coverageDir, file: 'coverage-summary.json' }
    ]
  }

  var htmlReporter = {
    outputDir: path.join(destDir, 'result'),
    // reportName: 'hexagon',
    focusOnFailures: true,
    urlFriendlyName: true
  }

  var jsonReporter = {
    outputFile: path.join(destDir, 'result', 'index.json'),
    stdout: false
  }

  var cfg = {
    basePath: '',
    loggers: [],
    exclude: [],
    port: 9876,
    colors: true,
    files: files,
    preprocessors: {},
    coverageReporter: coverageReporter,
    htmlReporter: htmlReporter,
    jsonReporter: jsonReporter,
    singleRun: true,
    browsers: null,
    frameworks: ['jasmine-ajax', 'jasmine', 'sinon', 'chai'],
    autoWatch: false,
    reporters: ['coverage', 'html', 'json', 'mocha']
  }

  cfg.preprocessors[path.join(destDir, 'lib', '*', 'module.js')] = ['coverage']

  if (phantomOnly) {
    cfg.browsers = ['PhantomJS']
  } else {
    cfg.frameworks.push('detectBrowsers')
  }

  return new Promise(function (resolve, reject) {
    karma.server.start(cfg, function (exitStatus) {
      resolve(exitStatus);
    })
  })
}
