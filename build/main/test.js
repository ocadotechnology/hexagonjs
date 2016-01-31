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
var fs = require('fs-extra')
var path = require('path')
var util = require('./util')
var compile = require('./compile')
var builder = require('./builder')
var jade = require('jade')

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
      .then(function (exitStatus) {
        process.exitCode = exitStatus
      })
  })
}

function build (rootDir, testPackage, key) {
  var rootName = key.split(/Css$|Js$/)[0]
  var ext = key.endsWith('Css') ? 'css' : 'js'
  var result = path.join(testPackage.moduleName, ext, rootName + '.' + ext)
  var fileName = path.join(rootDir, result)
  return fs.outputFileAsync(fileName, testPackage[key]).then(function () {
    return '/' + result.split(path.sep).join('/')
  })
}

function getOutputFileNames (rootDir, testPackage) {
  var keys = [
    'dependenciesCss',
    'moduleCss',
    'dependenciesJs',
    'moduleJs',
    'specJs'
  ]
  return Promise.all(keys.filter(function (key) {
    return testPackage[key]
  }).map(function (key) {
    return build(rootDir, testPackage, key)
  }))
}

function buildRunnerForFiles (fileNames) {
  var cssFiles = fileNames.filter(function (fileName) {
    return /css$/.test(fileName)
  })
  var jsFiles = fileNames.filter(function (fileName) {
    return /js$/.test(fileName)
  })
  return eventualSpecrunnerTemplate.then(function (specrunnerTemplate) {
    return specrunnerTemplate({
      cssFiles: cssFiles,
      jsFiles: jsFiles
    })
  })
}

var eventualSpecrunnerTemplate = fs.readFileAsync(path.join(util.rootDir, 'specrunner.jade'))
  .then(function (jadeText) { return jade.compile(jadeText, {pretty: true}) })

// builds a html page that may be opened in the browser to run the tests for the modules given
function buildTestPage (moduleNames, destDir) {
  var jasmineDir = path.join(
    util.rootDir,
    'node_modules',
    'jasmine-core',
    'lib',
    'jasmine-core'
  )
  var chaiPath = path.join(
    util.rootDir,
    'node_modules',
    'chai',
    'chai.js'
  )
  var chaiSpiesPath = path.join(
    util.rootDir,
    'node_modules',
    'chai-spies',
    'chai-spies.js'
  )
  var jasmine = fs.copyAsync(jasmineDir, path.join(destDir, 'jasmine'))
  var chai = fs.copyAsync(chaiPath, path.join(destDir, 'chai', 'chai.js'))
  var chaiSpies = fs.copyAsync(chaiSpiesPath, path.join(
    destDir,
    'chai',
    'chai-spies.js'
  ))
  var dependencies = Promise.all([jasmine, chai, chaiSpies])
  return buildTestPackages(moduleNames)
    .then(function (testPackages) {
      var promises = testPackages.map(function (testPackage) {
        return getOutputFileNames(destDir, testPackage)
      })
      // XXX zip here
      var individualRunners = Promise.all(promises).then(function (tp) {
        return Promise.all(tp.map(function (x, i) {
          buildRunnerForFiles(x).then(function (html) {
            var indexFileName = path.join(
              destDir,
              testPackages[i].moduleName,
              'index.html')
            return fs.outputFileAsync(indexFileName, html)
          })
        }))
      })
      return Promise.all([individualRunners, dependencies])
    })
}

if (require.main === module) {
  var moduleList = process.argv.slice(2)

  if (moduleList.length === 0) {
    fs.readdirAsync(path.join(util.rootDir, 'modules')).then(function (moduleList) {
      return runTests(moduleList, path.join('target', 'test-library'), true)
    })
  } else {
    runTests(moduleList, path.join('target', 'test-library'), true)
  }
} else {
  module.exports = {
    runTests: runTests,
    buildTestPage: buildTestPage
  }
}
