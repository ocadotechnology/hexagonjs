#!/usr/bin/env node
var test = require('./test')
var bluebird = require('bluebird')
var fs = bluebird.promisifyAll(require('fs'))
var util = require('./util')
var path = require('path')
var flatten = require('flatten')
var gazeAsync = bluebird.promisify(require('gaze'))
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

function watch (files, moduleNames) {
  gazeAsync(files).then(function (watcher) {
    watcher.on('changed', function () { build(moduleNames) })
  })
}

function manualTesting (modules) {
  // No modules = all modules
  var eventualModules = modules.length
    ? Promise.resolve(modules)
    : getAllModules()
  eventualModules.then(function (moduleNames) {
    var toWatch = flatten(moduleNames.map(getGlobsForModule))
    watch(toWatch, moduleNames)
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

