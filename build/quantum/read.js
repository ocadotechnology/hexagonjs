/*

     ____                    __                      _
    / __ \__  ______ _____  / /___  ______ ___      (_)____
   / / / / / / / __ `/ __ \/ __/ / / / __ `__ \    / / ___/
  / /_/ / /_/ / /_/ / / / / /_/ /_/ / / / / / /   / (__  )
  \___\_\__,_/\__,_/_/ /_/\__/\__,_/_/ /_/ /_(_)_/ /____/
                                              /___/

  Read
  ====

  Reads a file and parses it, returning the result as a promise. Reading a
  file this way also has the option of following @inline links to other files.

*/

var Promise = require('bluebird')
var merge = require('merge')
var path = require('path')
var fs = Promise.promisifyAll(require('fs'))
var glob = Promise.promisify(require('glob'))
var parse = require('./parse')
var globBase = require('glob-base')
var flatten = require('flatten')

function defaultLoader (filename) {
  return fs.readFileAsync(filename, 'utf-8')
}

function flatten (arrays) {
  return Array.prototype.concat.apply([], arrays)
}

function inline (parsed, currentDir, options, parentFile) {
  var promises = []

  parsed.content.forEach(function (entity, i) {
    if (entity.type === options.inlineEntityType) {
      var doParse = undefined

      if (!doParse && entity.params.length > 1 && entity.params[1] === 'parse') {
        doParse = true
      }

      if (!doParse && entity.params.length > 1 && entity.params[1] === 'text') {
        doParse = false
      }

      var filename = path.join(currentDir, entity.params[0])
      var promise = parseFiles(filename, doParse, options, parentFile)
        .then(function (res) {
          var newContent = flatten(res.map(function (d) { return d.content }))
          return parsed.content.splice.apply(parsed.content, [i, 1].concat(newContent))
        })
      promises.push(promise)
    } else if (entity.type !== undefined) {
      promises.push(inline(entity, currentDir, options, parentFile))
    }
  })

  return Promise.all(promises).then(function () { return parsed })
}

function parseFile (filename, doParse, options, parentFile) {
  if (doParse || doParse === undefined && path.extname(filename) === '.um') {
    var currentDir = path.dirname(filename)
    return options.loader(filename, parentFile)
      .then(function (input) { return parse(input, options) })
      .then(function (parsed) { return inline(parsed, currentDir, options, filename) })
      .catch(function (e) {
        throw new Error('quantum: ' + filename + ': ' + e)
      })
  } else {
    return options.loader(filename).then(function (input) {
      return { content: input.split('\n') }
    })
  }
}

function parseFiles (globString, doParse, options, parentFile) {
  return glob(globString).map(function (filename) {
    return parseFile(filename, doParse, options, parentFile)
  })
}

function readSingle (filename, options) {
  var options = merge({
    inlineEntityType: 'inline',
    inline: true,
    loader: defaultLoader,
    base: undefined
  }, options)

  var relativeFilename = options.base ? path.relative(options.base, filename) : filename

  if (options.inline) {
    return parseFile(filename, true, options)
      .then(function (res) {
        return {
          filename: relativeFilename,
          content: res
        }
      })
  } else {
    return options.loader(filename, undefined)
      .then(parse)
      .then(function (res) {
        return {
          filename: relativeFilename,
          content: res
        }
      })
  }
}

module.exports = function (globString, options) {
  var base = undefined

  var globDetails = globBase(globString)
  if (globDetails.isGlob) {
    base = globDetails.base
  }

  var options = merge({
    base: base
  }, options)

  return enhancePromise(glob(globString).map(function (filename) {
    return readSingle(filename, options)
  }))
}

// turns map into a flatmap
function enhancePromise (promise) {
  var oldMap = promise.map
  promise.map = function (f) {
    return enhancePromise(oldMap.call(promise, f).then(flatten))
  }
  return promise
}

module.exports.single = function (filename, options) {
  return readSingle(filename, options)
}
