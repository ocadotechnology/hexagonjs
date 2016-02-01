#!/usr/bin/env node
var test = require('./test')
var bluebird = require('bluebird')
var fs = bluebird.promisifyAll(require('fs-extra'))
var util = require('./util')
var path = require('path')
var gaze = require('gaze')
var liveServer = require('live-server')

var Promise = bluebird

var modulesFolder = path.join(util.rootDir, 'modules')
var outputDirectory = path.join(util.rootDir, 'target', 'specrunner')

function getAllModules () {
  return fs.readdirAsync(modulesFolder)
}

function dependencies (destDir) {
  var jasmineDir = path.join(
    util.rootDir,
    'node_modules',
    'jasmine-core',
    'lib',
    'jasmine-core'
  )
  var jasmineAjaxFile = path.join(
    util.rootDir,
    'node_modules',
    'jasmine-ajax',
    'lib',
    'mock-ajax.js'
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
  var jasmineAjax = fs.copyAsync(jasmineAjaxFile, path.join(
    destDir,
    'jasmine',
    'mock-ajax.js'
  ))
  var chai = fs.copyAsync(chaiPath, path.join(destDir, 'chai', 'chai.js'))
  var chaiSpies = fs.copyAsync(chaiSpiesPath, path.join(
    destDir,
    'chai',
    'chai-spies.js'
  ))
  return Promise.all([jasmine, jasmineAjax, chai, chaiSpies])
}

function getGlobsForModule (module) {
  return ['um', 'json', 'coffee', 'scss'].map(function (fileType) {
    return path.join('modules', module, '**', '*.' + fileType)
  })
}

function build (moduleNames) {
  test.buildTestPage(moduleNames, outputDirectory)
}

function watch (files, moduleName) {
  gaze(files, function (error, watcher) {
    if (error) {
      throw error
    }
    watcher.on('changed', function () {
      console.log('Rebuilding ' + moduleName)
      build([moduleName])
    })
  })
}

function specrunner (modules) {
  // No modules = all modules
  dependencies(outputDirectory)
  var eventualModules = modules.length
    ? Promise.resolve(modules)
    : getAllModules()
  eventualModules.then(function (moduleNames) {
    moduleNames.forEach(function (moduleName) {
      var toWatch = getGlobsForModule(moduleName)
      watch(toWatch, moduleName)
    })
    build(moduleNames)
  })
  liveServer.start({
    port: process.env.MANUAL_TESTING_PORT || 4567,
    root: outputDirectory,
    open: false
  })
}

if (require.main === module) {
  specrunner(process.argv.slice(2))
} else {
  module.exports = specrunner
}

