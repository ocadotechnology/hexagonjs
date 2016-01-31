#!/usr/bin/env node
var test = require('./test')
var bluebird = require('bluebird')
var fs = bluebird.promisifyAll(require('fs'))
var util = require('./util')
var path = require('path')
var gaze = require('gaze')
var liveServer = require('live-server')

var Promise = bluebird

var modulesFolder = path.join(util.rootDir, 'modules')
var outputDirectory = path.join(util.rootDir, 'target', 'manual-testing')

function getAllModules () {
  return fs.readdirAsync(modulesFolder)
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

function manualTesting (modules) {
  // No modules = all modules
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
  manualTesting(process.argv.slice(2))
}

