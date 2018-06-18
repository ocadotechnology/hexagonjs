/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Compile
  -------

  This file contains the code for building hexagon.

*/

var path = require('path')
var Promise = require('bluebird')
var quantum = require('quantum-js')
var fs = Promise.promisifyAll(require('fs-extra'))
var util = require('./util')
var flatten = require('flatten')
var dependencyTree = require('./dependency-tree')
var cache = require('./cache')
var version = require(path.join(util.rootDir, 'package.json')).version
var cleanCss = new (require('clean-css'))({advanced: false})
var uglifyJs = require('uglify-js')

/*

    Module Building
    ---------------

    This part contains the code for building a single module.

    In this section moduleName is a string and moduleTheme is a flat object
    which contains the theme variables for the module.

*/

// Given a module theme and the name of the module, will build the module and will output
// an object which looks like: {js, css, themeCss, theme: {json, scss, stylus, less, um}}
function buildModule (moduleObj, moduleTheme) {
  // XXX: support the extra and overrides from moduleTheme

  // XXX: allow finer grained caching (so that just the theme parts can be recompiled for a theme change)
  // if (cache.has(moduleName)) {
  //   return cache.get(moduleName)
  // }

  var theme = moduleTheme || {}

  var overrides = theme.overrides || {}

  var prefix = 'hx-' + moduleObj.name + '-'
  var themePromise = resolveModuleTheme(moduleObj, (theme.variables || {}))
  var themeObjPromise = Promise.all([
    themePromise,
    prefix
  ])

  var coreCss = overrides.scss ?
    Promise.resolve(overrides.scss).then(util.scss) : overrides.css ?
      Promise.resolve(overrides.css) : buildModuleCoreCss(moduleObj)

  var themeCss = overrides.themeScss ? Promise.all([themePromise, '']).spread(objToScss).then(function (variables) {
    return variables + '\n' + overrides.themeScss
  }).then(util.scss) : overrides.themeCss ?
    Promise.resolve(overrides.themeCss) : Promise.all([moduleObj, themePromise]).spread(buildModuleThemeCss)

  var promise = Promise.props({
    moduleName: moduleObj.name,
    coreJs: buildModuleCoreJs(moduleObj),
    themeJson: themePromise.then(buildModuleThemeJson),
    coreCss: coreCss,
    themeCss: themeCss,
    variables: Promise.props({
      json: themeObjPromise.spread(objToJson),
      scss: themeObjPromise.spread(objToScss),
      stylus: themeObjPromise.spread(objToStylus),
      less: themeObjPromise.spread(objToLess),
      css: themeObjPromise.spread(objToCssVariables),
      quantum: Promise.all([moduleObj, themePromise]).spread(objToQuantum)
    })
  }).catch(function (error) {
    return Promise.reject(new Error("Error building module '" + moduleObj.name + "': " + error.message + '\n'))
  })

  cache.set(moduleObj.name, promise)

  return promise
}

// Loads the default theme variables for a module, returning a flat object containing the variables.
function loadModuleThemeDefaults (moduleObj) {
  var filename = path.join(moduleObj.directory, 'main', 'theme.um')
  return util.doesExist(filename).then(function (exists) {
    if (exists) {
      return quantum.read(filename)
        .then(function (array) {
          var res = {}
          quantum.select(array[0].content)
            .select('module')
            .selectAll('option')
            .forEach(function (option) {
              if (option.select('type').params[1] === 'list') {
                res[option.ps()] = option.select('default').params
              } else {
                res[option.ps()] = option.select('default').ps() || option.select('default').cs()
              }
            })
          return res
        })
    }
  })
}

// Merges the moduleTheme provided with the defaults, thus filling in any missing theme
// values with the defaults.
function resolveModuleTheme (moduleObj, moduleTheme) {
  return loadModuleThemeDefaults(moduleObj).then(function (defaults) {
    var merged = {}
    if (defaults) {
      Object.keys(defaults).forEach(function (key) {
        merged[key] = defaults[key]
      })
    }
    if (moduleTheme) {
      Object.keys(moduleTheme).forEach(function (key) {
        merged[key] = moduleTheme[key]
      })
    }
    return merged
  })
}

// Builds the module's core javascript (currently only supports coffeescript as the input)
function buildModuleCoreJs (moduleObj) {
  var orderFilename = path.join(moduleObj.directory, 'main', 'order.json')
  return util.doesExist(orderFilename)
    .then(function (exists) {
      if (exists) { // handle order.json case
        return fs.readFileAsync(orderFilename)
          .then(JSON.parse)
          .then(function (order) {
            return Promise.all(order.coffee.map(function (filename) {
              var filename = path.join(moduleObj.directory, 'main', filename)
              return fs.readFileAsync(filename, 'utf8').then(function (src) {
                return util.coffee(src, filename)
              })
            }))
          })
          .then(function (srcs) {
            return srcs.join('\n')
          }).then(util.iife)

      } else { // handle standard index.coffee case
        var filename = path.join(moduleObj.directory, 'main', 'index.coffee')
        return util.doesExist(filename)
          .then(function (exists) {
            if (exists) {
              return fs.readFileAsync(filename, 'utf8').then(util.coffee).then(util.iife)
            }
          })
      }
    })
}

// Builds the module's theme json
function buildModuleThemeJson (moduleTheme) {
  // XXX: only include the values that should be included in the javascript
  return moduleTheme
}

// Builds the module's css (currently only supports scss as the input)
function buildModuleCoreCss (moduleObj) {
  var filename = path.join(moduleObj.directory, 'main', 'index.scss')
  return util.doesExist(filename)
    .then(function (exists) {
      if (exists) {
        return fs.readFileAsync(filename, 'utf8').then(util.scss)
      }
    })
}

// Builds the module's theme css (currently only supports scss as the input)
function buildModuleThemeCss (moduleObj, moduleTheme) {
  var filename = path.join(moduleObj.directory, 'main', 'theme.scss')
  return util.doesExist(filename)
    .then(function (exists) {
      if (exists) {
        return fs.readFileAsync(filename, 'utf8').then(function (scssSource) {
          return util.scss(objToScss(moduleTheme, '') + '\n' + scssSource)
        })
      }
    })
}

// Builds the theme variables in json format for this module
function objToJson (theme) {
  return theme
}

// Builds the theme variables in scss format for this module
function objToScss (theme, prefix) {
  return Object.keys(theme).map(function (key) {
    if (Array.isArray(theme[key])) {
      return '$' + prefix + key + ': ' + theme[key].join(', ') + ';'
    } else {
      return '$' + prefix + key + ': ' + theme[key] + ';'
    }
  }).join('\n')
}

// Builds the theme variables in stylus format for this module
function objToStylus (theme, prefix) {
  return Object.keys(theme).map(function (key) {
    if (Array.isArray(theme[key])) {
      return prefix + key + ' = ( ' + theme[key].join(' ') + ' )'
    } else {
      return prefix + key + ' = ' + theme[key]
    }
  }).join('\n')
}

// Builds the theme variables in less format for this module
function objToLess (theme, prefix) {
  return Object.keys(theme).map(function (key) {
    if (Array.isArray(theme[key])) {
      return '@' + prefix + key + ': ' + theme[key].join(' ') + ';'
    } else {
      return '@' + prefix + key + ': ' + theme[key] + ';'
    }
  }).join('\n')
}

// Builds the theme variables in css format for this module
function objToCssVariables (theme, prefix) {
  return Object.keys(theme).map(function (key) {
    if (Array.isArray(theme[key])) {
      return theme[key].map(function (value, i) {
        return '--' + prefix + key + '-' + i + ': ' + value + ';'
      }).join('\n')
    } else {
      return '--' + prefix + key + ': ' + theme[key] + ';'
    }
  }).join('\n')
}

// Builds the theme variables in um format for this module
function objToQuantum (moduleName, theme) {
  var keys = Object.keys(theme)
  if (keys.length > 0) {
    var module = quantum.create(moduleName.name)
    keys.map(function (key) {
      module.add(quantum.create(key).add(theme[key]))
    })
    return module
  }
}

/*

    Bundle Building
    ---------------

    This part contains the code for bundling multiple modules together.

*/

const moduleJsonCache = {}

function readModulesFile (modules, name) {
  return moduleJsonCache[name]
    ? Promise.resolve(moduleJsonCache[name])
    : fs.readJsonAsync(path.join(modules[name].directory, 'module.json'))
        .then(json => {
          moduleJsonCache[name] = json
          return json
        })
}

// gets the entire list of dependencies for a module
function getModuleDependencies (modules, moduleName) {
  return readModulesFile(modules, moduleName)
    .then(function (module) {
      var dependencies = module.dependencies
      if (dependencies != undefined && dependencies.length > 0) {
        return computeDependencyList(modules, dependencies)
      } else if (dependencies != undefined) {
        return Promise.resolve(dependencies)
      } else {
        throw new Error('Module "' + moduleName + '" either has no dependencies or is included as an incorrect dependency.')
      }
    })
}

function computeDependencyList (moduleObjects, modules) {
  return Promise.all(modules.map(m => getModuleDependencies(moduleObjects, m)))
    .then(function (list) {
      return Promise.resolve(flatten(modules.concat(list)))
    })
}

// calculate the order that all modules should go in - then this can be referred to when building subsets of hexagon
var moduleOrderCache = undefined
function getAllModulesOrder (modules) {
  if (moduleOrderCache) {
    return new Promise.resolve(moduleOrderCache)
  }
  return Promise.resolve(Object.keys(modules))
    .map(function (name) {
      return fs.readJsonAsync(path.join(modules[name].directory, 'module.json'))
        .then(function (module) {
          return {name: name, dependencies: module.dependencies}
        })
    })
    .then(dependencyTree)
    .then(function (res) {
      moduleOrderCache = res
      return res
    })
}

// works out which order the modules should be included
function getModulesOrder (modules, allModules) {
  return getAllModulesOrder(allModules)
    .filter(function (m) {
      return !!modules[m]
    })
}

function getModuleList (options) {
  var moduleList
  var allModules = Object.keys(options.allModules)
  if (options.modules) {
    moduleList = allModules.filter(function (moduleName) {
      return options.modules.indexOf(moduleName) !== -1
    })
  } else if (options.excludedModules) {
    moduleList = allModules.filter(function (moduleName) {
      return options.excludedModules.indexOf(moduleName) === -1
    })
  } else {
    moduleList = allModules
  }
  return Promise.resolve(moduleList)
    .then(m => computeDependencyList(options.allModules, m))
    .then(function (moduleList) {
      var modules = {}
      for (i in moduleList) {
        var moduleName = moduleList[i]
        modules[moduleName] = options.allModules[moduleName]
      }
      return modules
    })
}

function buildHeaderComment (headerMode, version, themeName, moduleList) {
  if (headerMode === 'full') {
    var banner = [
      ' _   _                                     _',
      '| | | | _____  ____ _  __ _  ___  _ __    (_)___',
      "| |_| |/ _ \\ \\/ / _` |/ _` |/ _ \\| '_ \\   | / __|",
      '|  _  |  __/>  < (_| | (_| | (_) | | | |_ | \\__ \\',
      '|_| |_|\\___/_/\\_\\__,_|\\__, |\\___/|_| |_(_)/ |___/',
      '                       |___/             |__/',
      '',
      '----------------------------------------------------',
      ''
    ]

    var details = [
      'Version: ' + version,
      'Theme: ' + themeName
    ]

    var modules = [
      'Modules:'
    ].concat(moduleList.map(function (moduleName) {
      return '  ' + moduleName
    }))

    return banner.concat(details).concat(modules).map(function (line) {
      return ' ' + line
    }).join('\n')
  } else {
    return 'Hexagon.js ' + version + ' (theme: ' + themeName + ')'
  }

}

// Builds a version of the library for the modules supplied and the theme supplied.
// options is an object: {modules, theme, minify}
//   modules: Optional. A list of modules to include in the build
//     theme: Optional. An object whos keys are the modules names, and values are moduleThemes
//            it can be undefined - in this case the defaults will be used.
//    minify: Optional. Whether or not to minify. The default is false
function buildLibrary (options) {
  // TODO:
  // - support minification
  // - make it possible to turn off exporting variables (one by one)
  // - change to use the proper theme json (as defined in theme.js)

  return Promise.props({
    modules: options.modules,
    theme: options.theme || {
        extra: {}
    },
    prefix: options.prefix || 'hx',
    headerMode: 'full',
    allModules: options.allModules,
    minify: options.minify
  }).then(function (options) {
    var themeModules = options.theme.modules || {}
    return getModuleList(options)
      .then(function (modules) {
        return getModulesOrder(modules, options.allModules)
      })
      .map(function (moduleName) {
        return buildModule(options.allModules[moduleName], themeModules[moduleName])
      })
      .then(function (builtModules) {
        var coreJs = builtModules.map(function (m) {
          return m.coreJs
        }).join('\n')

        var jsThemeJson = {}
        builtModules.forEach(function (m) {
          jsThemeJson[util.convertSpinalToCamel(m.moduleName)] = util.convertSpinalKeysToCamel(m.themeJson)
        })

        var bootstrapJs = 'var hx = {"_": {}};\nwindow.hx=hx;\n'

        // XXX: this should only include the variables that should be included with js
        var themeJs = 'hx.theme = ' + JSON.stringify(jsThemeJson, undefined, 2) + ';\n'

        var js = util.iife(bootstrapJs + themeJs + coreJs + '\n\n' + (options.theme.extra.js || ''))

        var coreCss = builtModules.map(function (m) {
          return m.coreCss
        }).join('\n')

        var themeCss = builtModules.map(function (m) {
          return m.themeCss
        }).join('\n')

        var css = coreCss + '\n\n' + themeCss + '\n\n' + (options.theme.extra.css || '')

        // XXX: make it possible to turn these on/off in the options ?
        var themeJson = {}
        builtModules.forEach(function (m) {
          themeJson[util.convertSpinalToCamel(m.moduleName)] = util.convertSpinalKeysToCamel(m.variables.json)
        })

        var variablesScss = builtModules.map(function (m) {
          return m.variables.scss
        }).filter(function (line) { return line }).join('\n\n')

        var variablesStylus = builtModules.map(function (m) {
          return m.variables.stylus
        }).filter(function (line) { return line }).join('\n\n')

        var variablesLess = builtModules.map(function (m) {
          return m.variables.less
        }).filter(function (line) { return line }).join('\n\n')

        var variablesCss = ':root {\n  ' + builtModules.map(function (m) { return m.variables.css})
            .filter(function (line) { return line })
            .join('\n\n')
            .split('\n')
            .join('\n  ') + '\n}'

        var modulesBuilder = quantum.create('modules')
        builtModules.forEach(function (m) {
          if (m.variables.quantum) {
            modulesBuilder.add(m.variables.quantum)
          }
        })
        var variablesQuantum = quantum.stringify(quantum.create('theme').add(modulesBuilder).build())

        function replacePrefix (thing, options) {
          return thing.split('hx').join(options.prefix)
        }

        var headerComment = buildHeaderComment(options.headerMode, version, options.theme.name, builtModules.map(function (m) { return m.moduleName }))

        // TODO: add add minified resources in if the flags are set
        js = replacePrefix(js, options)
        css = replacePrefix(css, options)
        coreCss = replacePrefix(coreCss, options)
        themeCss = replacePrefix(themeCss, options)

        var build = {
          js: util.jsBlockComment(headerComment) + js,
          css: util.cssBlockComment(headerComment) + css,
          coreCss: util.cssBlockComment(headerComment) + coreCss,
          themeCss: util.cssBlockComment(headerComment) + themeCss,
          variables: {
            json: replacePrefix(JSON.stringify(themeJson, undefined, 2), options),
            scss: replacePrefix(variablesScss, options),
            stylus: replacePrefix(variablesStylus, options),
            less: replacePrefix(variablesLess, options),
            css: replacePrefix(variablesCss, options),
            quantum: replacePrefix(variablesQuantum, options)
          }
        }

        if (options.minify) {
          build.jsMin = util.jsBlockComment(headerComment) + uglifyJs.minify(js, {fromString: true}).code
          build.cssMin = util.jsBlockComment(headerComment) + cleanCss.minify(css).styles
          build.coreCssMin = util.jsBlockComment(headerComment) + cleanCss.minify(coreCss).styles
          build.themeCssMin = util.jsBlockComment(headerComment) + cleanCss.minify(themeCss).styles
        }

        return build
      })

  })
}

// export everything for testing and use in index.js
exports.buildModule = buildModule
exports.buildLibrary = buildLibrary
exports.getModuleDependencies = getModuleDependencies
