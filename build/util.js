var Promise = require('bluebird')
var path = require('path')
var fs = Promise.promisifyAll(require('fs-extra'))

var root = path.join(__dirname, '..')

// checks if the path supplied is a directory
function isFolder (filename) {
  return fs.statAsync(filename)
    .then(function (res) {
      return {filename: filename, isDirectory: res.isDirectory()}
    })
}

// gets a list of directories within the base directory given
function directoryList (baseFolder, excludes) {
  excludes = excludes !== undefined ? excludes : []
  return fs.readdirAsync(baseFolder)
    .map(function (filename) { return path.join(baseFolder, filename) })
    .map(isFolder)
    .filter(function (f) { return f.isDirectory && excludes.indexOf(f.filename) === -1})
    .map(function (f) { return f.filename})
}

function moduleList () {
  return directoryList(path.join(root, 'content', 'modules')).map(toModuleName)
}

function exampleList () {
  return directoryList(path.join(root, 'content', 'examples')).map(toExampleName)
}

function appList () {
  return directoryList(path.join(root, 'content', 'apps')).map(toAppName)
}

function toModuleName (moduleDir) {
  return path.basename(moduleDir)
}

function toModuleDir (moduleName) {
  return path.join(root, 'content', 'modules', moduleName)
}

function toExampleName (exampleDir) {
  return path.basename(exampleDir)
}

function toExampleDir (exampleName) {
  return path.join(root, 'content', 'examples', exampleName)
}

function toAppName (appDir) {
  return path.basename(appDir)
}

function toAppDir (appName) {
  return path.join(root, 'content', 'apps', appName)
}

module.exports = {
  root: root,
  moduleList: moduleList,
  exampleList: exampleList,
  appList: appList,
  toModuleName: toModuleName,
  toModuleDir: toModuleDir,
  toExampleName: toExampleName,
  toExampleDir: toExampleDir,
  toAppName: toAppName,
  toAppDir: toAppDir
}
