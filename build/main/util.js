/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Utils
  -----

  General purpose utils used throughout the build code.

*/

var path = require('path')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var coffeescript = require('coffee-script')
var sass = Promise.promisifyAll(require('node-sass'))
var postcss = require('postcss')
var autoprefixer = require('autoprefixer')

var rootDir = path.join(__dirname, '..', '..')
exports.rootDir = rootDir

exports.doesExist = function (filename) {
  return fs.accessAsync(filename, fs.F_OK)
    .then(function () { return true })
    .catch(function () { return false })
}

exports.moduleList = function (moduleDirectory) {
  return fs.readdirAsync(moduleDirectory || path.join(rootDir, 'modules'))
}

// compiles a coffeescript string to javascript. wrap in a promise for nicer error handling
exports.coffee = function (src, filename) {
  return new Promise(function (resolve, reject) {
    resolve(coffeescript.compile(src, {bare: true}))
  }).catch(function (err) {
    // give the error more context
    if (filename) {
      err.message = 'Error compiling ' + filename + ': ' + err.message
    }
    throw err
  })
}

exports.iife = function (src) {
  return '(function(){\n' + src + '\n})();'
}

// compiles a scss string to css
var prefixer = postcss([autoprefixer({ browsers: ['last 2 versions', 'iOS > 7'] })])
exports.scss = function (src) {
  return sass.renderAsync({data: src})
    .then(function (res) {
      return prefixer.process(res.css.toString('utf8'))
        .then(function (res) {
          return res.css
        })
    })
}

function convertSpinalToCamel (value) {
  if (value) {
    var pascalCase = value.split('-').map(function (d) {
      return d[0].toUpperCase() + d.slice(1)
    }).join('')
    return pascalCase[0].toLowerCase() + pascalCase.slice(1)
  }
}

exports.convertSpinalToCamel = convertSpinalToCamel

exports.convertSpinalKeysToCamel = function (obj) {
  var res = {}
  Object.keys(obj).forEach(function (k) {
    res[convertSpinalToCamel(k)] = obj[k]
  })
  return res
}

exports.cssBlockComment = function (text) {
  return '/*\n' + text + '\n*/' + '\n'
}

exports.jsBlockComment = function (text) {
  return '/*\n' + text + '\n*/' + '\n'
}
