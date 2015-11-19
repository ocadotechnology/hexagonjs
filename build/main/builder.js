/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Builder
  -------

  This file contains the code for defining custom builds/themes of hexagon.
  The Builder prototype in this file is what should be exposed when creating a theme.

*/

var Promise = require('bluebird')
var quantum = require('quantum-js')
var gaze = require('gaze')
var path = require('path')
var build = require('./compile')
var theme = require('./theme')
var cache = require('./cache')
var util = require('./util')
var fs = Promise.promisifyAll(require('fs-extra'))

function resolveTheme (themeResources) {
  return Promise.all(themeResources.map(function (resource) {
    if (resource.type === 'theme') {
      if (typeof resource.theme === 'string') {
        if (resource.theme.lastIndexOf('.um') === resource.theme.length - 3) {
          return quantum.read(resource.theme)
            .then(function (read) { return read[0].content})
            .then(theme.formats.quantumAST.toJson)
            .then(function (jsonTheme) {
              return {type: 'theme', theme: jsonTheme}
            })
        } else if (resource.theme.lastIndexOf('.json') === resource.theme.length - 4) {
          return fs.readJsonAsync(resource.theme)
            .then(function (jsonTheme) {
              return {type: 'theme', theme: jsonTheme}
            })
        }
      } else {
        return resource
      }
    } else if (resource.type === 'flatten') {
      return resource
    }
  })).then(function (resources) {
    var resolved = undefined

    resources.forEach(function (resource) {
      if (resource.type === 'theme') {
        if (resolved) {
          resolved = theme.merge(resolved, resource.theme)
        } else {
          resolved = resource.theme
        }

      } else if (resource.type === 'flatten') {
        resolved = theme.flatten(resolved)
      }
    })

    return theme.flatten(resolved || {})

  })
}


function exportAssets (builder, options) {
  return Promise.all(Object.keys(builder._assetFiles).map(function (exportFilename) {
    var asset = builder._assetFiles[exportFilename]
    // Don't export files if they have been embedded as part of build
    if (!options.embedAssets || (options.embedAssets && !asset.allowEmbed)) {
      return fs.copyAsync(asset.filepath, path.join(options.dest, exportFilename))
    }
  })).then(function () { return build })
}


function replaceAssets (data, embeddableAssets) {
  if (embeddableAssets && embeddableAssets.length > 0) {
    return Promise.all(embeddableAssets.map(function (encodedAsset) {
      if (data.indexOf(encodedAsset.filename) > -1) {
        data = data.split('"' + encodedAsset.filename + '"').join(encodedAsset.file) // Replace "filename" (speechmarks)
        data = data.split("'" + encodedAsset.filename + "'").join(encodedAsset.file) // Replace 'filename' (quotes)
      }
    }))
    .then(function () {
      return data
    })
  } else {
    return Promise.resolve(data)
  }
}


function outputFile (directory, filename, data) {
  return fs.outputFileAsync(path.join(directory, filename), data)
}

function getEmbeddableAssets (options, assetFiles) {
  if (options.embedAssets) {
    var contentTypes = {
      ttf: "application/x-font-ttf",
      svg: "image/svg+xml",
      eot: "application/vnd.ms-fontobject",
      woff: "application/font-woff",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      png: "image/png"
    }

    return Promise.all(Object.keys(assetFiles).filter(function (assetName) {
      return assetFiles[assetName].allowEmbed
    }))
    .map(function (assetName) {
      var type = contentTypes[path.extname(assetName).replace('.','')]
      var asset = assetFiles[assetName]
      return util.doesExist(asset.filepath)
        .then(function (exists){
          if (exists) {
            return fs.readFileAsync(asset.filepath, {encoding: 'base64'})
              .then(function (encodedFile) {
                return {
                  filename: path.basename(asset.filepath),
                  file: "data:" + (type || asset.contentType) + ";base64," + encodedFile
                }
              })
          } else {
            console.warn('Asset file not found: ' + asset.filepath)
          }
        })
    })
    .then(function (embeddableAssets) {
      return embeddableAssets.filter(function (d) { return !!d && d.filename && d.file })
    })
  } else {
    return Promise.resolve([])
  }
}

function manipulateBuildAndWrite (build, options, assetFiles) {
  // Map of build key values to real file names
  var fileMap = {
    'js': 'hexagon.js',
    'jsMin': 'hexagon.min.js',
    'css': 'hexagon.css',
    'cssMin': 'hexagon.min.css',
    'coreCss': 'hexagon.core.css',
    'coreCssMin': 'hexagon.core.min.css',
    'themeCss': 'hexagon.theme.css',
    'themeCssMin': 'hexagon.theme.min.css',
    'variables.json': 'hexagon.variables.json',
    'variables.scss': 'hexagon.variables.scss',
    'variables.less': 'hexagon.variables.less',
    'variables.stylus': 'hexagon.variables.styl',
    'variables.css': 'hexagon.variables.css',
    'variables.quantum': 'hexagon.variables.um'
  }

  var newBuild = {}
  // Map over build keys. If a key doesn't exist, ignore it.
  return getEmbeddableAssets(options, assetFiles)
    .then(function (embeddableAssets) {
      return Promise.all(Object.keys(build).map(function (key) {
        if (build[key]) {
          if (typeof build[key] === 'string') {
            // Object is file, if we need to replace it's contents, we do it then we write it to file if a dest is provided.
            return replaceAssets(build[key], embeddableAssets)
              .then(function (replacedKeyElement) {
                newBuild[key] = replacedKeyElement
                if (options.dest){
                  return outputFile(options.dest, fileMap[key], replacedKeyElement)
                }
              })
          } else {
            // This deals with the 'variables' key and similar
            newBuild[key] = {}
            return Promise.all(Object.keys(build[key]).map(function (subkey) {
              return replaceAssets(build[key][subkey], embeddableAssets)
                .then(function (replacedKeyElement) {
                  newBuild[key][subkey] = replacedKeyElement
                  if (options.dest){
                    return outputFile(options.dest, fileMap[key + '.' + subkey], replacedKeyElement)
                  }
                })
            }))
          }
        }
    }))
  }).then(function (){
    // Return the modified build. Should be a modified version of the build with undefined keys removed.
    return newBuild
  })
}


function mergeAssets (a, b) {
  var merged = {}
  if (a) {
    Object.keys(a).forEach(function (key) {
      merged[key] = a[key]
    })
  }
  if (b) {
    Object.keys(b).forEach(function (key) {
      merged[key] = b[key]
    })
  }
  return merged
}

function Builder (themeResources, assetFiles) {
  this._themeResources = themeResources || []
  this._assetFiles = assetFiles || {}
}

Builder.prototype = {
  // add a theme to the stack of themes to be used. (they all get squished down
  // into a single theme, where the theme that was supplied latest overrides ones
  // set before)
  theme: function (themeResource) {
    return new Builder(this._themeResources.concat([{ type: 'theme', theme: themeResource }]), this._assetFiles)
  },
  // used to create a multi-theme build of hexagon
  // themes: function (themeResources) {
  //   // XXX: implement
  //   return this
  // },
  // this applies any variables in the themes and removes the variables, so that new variables can be
  // set up without old ones hanging around
  flatten: function () {
    return new Builder(this._themeResources.concat([{ type: 'flatten' }]), this._assetFiles)
  },
  // sets the assets that should be exported when building. an object of the form {exportFilenameRelativeToHexagonJs: filename}
  assets: function (assets, reset) {
    //XXX: add the option for inlinable assets
    if (reset) {
      return new Builder(this._themeResources, assets)
    } else {
      return new Builder(this._themeResources, mergeAssets(this._assetFiles, assets))
    }
  },
  // builds the library into the directory specified
  build: function (options) {
    var self = this
    return resolveTheme(this._themeResources)
      .then(function (resolvedTheme) {
        return build.buildLibrary({
          modules: options.modules,
          theme: resolvedTheme,
          minify: options.minify,
          prefix: options.prefix
        })
      }).then(function (build) {
        return manipulateBuildAndWrite(build, options, self._assetFiles)
      }).then(function (build) {
        if (options.dest) {
          return exportAssets(self, options)
            .then(function () {
              return build
            })
        } else {
          return build
        }
      })
  },
  // builds the library into the directory specified, and then watches for changes. options it expects are the same as build()
  watch: function (options) {
    var self = this

    function triggerRebuild (full) {
      var start = Date.now()
      if (full) {
        cache.clear()
      }
      return self.build(options).then(function (res) {
        console.log('built in ' + (Date.now() - start) + 'ms')
        return res
      })
    }

    /* Watch for theme changes */

    var themeFilenames = this._themeResources.filter(function (resource) {
      return resource.type === 'theme' && typeof resource.theme === 'string'
    }).map(function (resource) {
      return resource.theme
    })

    gaze(themeFilenames, function (err, watcher) {
      if (err) {
        console.error(err)
      } else {
        watcher.on('changed', function (files) {
          // XXX: this triggers a full rebuild - but it doesn't have to - it just has to rebuild
          // the parts of hexagon that depend on the theme - ie the theme json and the theme css
          triggerRebuild(true)
        })
      }
    })

    /* Watch for asset changes */

    var assetFiles = Object.keys(self._assetFiles).map(function (key) {
      return self._assetFiles[key].filepath
    })

    gaze(assetFiles, function (err, watcher) {
      if (err) {
        console.error(err)
      } else {
        watcher.on('changed', function (files) {
          exportAssets(self, options)
        })
      }
    })

    /* Watch for library changes */

    util.moduleList().then(function (modules) {
      modules.forEach(function (moduleName) {
        gaze(path.join(util.moduleDir(moduleName), 'main', '**', '*'), function (err, watcher) {
          if (err) {
            console.error(err)
          } else {
            watcher.on('changed', function (files) {
              cache.delete(moduleName)
              triggerRebuild(false)
            })
          }
        })
      })
    })

    // return the rebuild triggerer for doing extra watches on things if wanted
    return triggerRebuild(true).then(function () {
      return triggerRebuild
    })
  }
}

module.exports = new Builder
