/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Test
  ----

  This file contains the code for compiling the specs and for running them.
  When required, it will return the api for building/running the tests.
  When run with node directly, this file will run the karma tests.

*/

var Promise = require('bluebird')
var karma = require('./karma')
var fs = require('fs')
var path = require('path')
var util = require('./util')
var compile = require('./compile')
var builder = require('./builder')

/*

    Module Test Building
    --------------------

    This part contains the code for building the specs for a single module.

*/

// retuns a promise yielding a javascript string containing the tests for this module
function buildSingleModuleSpecs (moduleName) {
  var specFilename = path.join(util.rootDir, 'modules', moduleName, 'test', 'spec.coffee')
  return util.doesExist(specFilename).then(function (exists) {
    if (exists) {
      return fs.readFileAsync(specFilename, 'utf8').then(function (src) {
        return util.coffee(src, specFilename)
      })
    }
  })
}

// extra step for getting the module in the right shape for the tests
function prepareModuleForTest (moduleBuild) {
  console.log(moduleBuild.moduleName)
  var themeJs = 'hx.theme["' + util.convertSpinalToCamel(moduleBuild.moduleName) + '"] = ' + JSON.stringify(util.convertSpinalKeysToCamel(moduleBuild.themeJson)) + ';\n'
  return Promise.resolve({
    js: themeJs + moduleBuild.coreJs,
    css: moduleBuild.coreCss + '\n' + moduleBuild.themeCss
  })
}

// returns an object with moduleName, dependenciesCss, dependenciesJs, moduleJs, moduleCss, specJs
function buildSingleModuleTestPackage (moduleName) {
  return buildSingleModuleSpecs(moduleName)
    .then(function (specJs) {
      if (specJs) { // only do the rest of the building of the spec existed
        return builder.getModuleList([])
          .then(function (allModules) {
            return compile.getModuleDependencies(moduleName)
              .then(function (modules) {
                return Promise.props({
                  dependencies: compile.buildLibrary({modules: modules, allModules: allModules}),
                  module: compile.buildModule(allModules[moduleName]).then(prepareModuleForTest)
                })
              })
              .then(function (b) {
                return {
                  moduleName: moduleName,
                  dependenciesJs: b.dependencies.js,
                  dependenciesCss: b.dependencies.css,
                  moduleJs: b.module.js,
                  moduleCss: b.module.css,
                  specJs: specJs
                }
              })
          })

      }
    })
}

/*

    Module Test Running
    --------------------

    This part contains the code for running the tests for a module (or multiple modules).

*/

function buildTestPackages (moduleNames) {
  return Promise.all(moduleNames.map(buildSingleModuleTestPackage)).filter(function (d) { return d !== undefined })
}

// runs the test for the modules provided. phantomOnly is a boolean that should
// be true to just run the tests in phantomJS
function runTests (moduleNames, destDir, phantomOnly) {
  return buildTestPackages(moduleNames).then(function (testPackages) {
    return karma(testPackages, destDir, phantomOnly)
  })
}

// builds a html page that may be opened in the browser to run the tests for the modules given
// XXX: not strictly needed, but would be a nice feature
function buildTestPage (moduleNames, destFilename) {
  return buildTestPackages(moduleNames)
    .then(function (testPackages) {
      // XXX: build a html page with test embedded + write to the destFilename
    })
}

if (require.main === module) {
  var moduleList = process.argv.slice(2)

  if (moduleList.length === 0) {
    fs.readdirAsync(path.join(util.rootDir, 'modules')).then(function (moduleList) {
      return runTests(moduleList, path.join('target', 'test-library'), true)
    })
  } else {
    return runTests(moduleList, path.join('target', 'test-library'), true)
  }

} else {
  module.exports = {
    runTests: runTests,
    buildTestPage: buildTestPage
  }
}
