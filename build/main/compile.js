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

/*

    Module Building
    ---------------

    This part contains the code for building a single module.

    In this section moduleName is a string and moduleTheme is a flat object
    which contains the theme variables for the module.

*/

// Given a module theme and the name of the module, will build the module and will output
// an object which looks like: {js, css, themeCss, theme: {json, scss, stylus, less, um}}
function buildModule (moduleName, moduleTheme) {
  // XXX: support the extra and overrides from moduleTheme

  // XXX: allow finer grained caching (so that just the theme parts can be recompiled for a theme change)
  // if (cache.has(moduleName)) {
  //   return cache.get(moduleName)
  // }

  var theme = moduleTheme || {}

  var overrides = theme.overrides || {}

  var prefix = 'hx-' + moduleName + '-'
  var themePromise = resolveModuleTheme(moduleName, (theme.variables || {}))
  var themeObjPromise = Promise.all([
    themePromise,
    prefix
  ])

  var coreCss = overrides.scss ?
    Promise.resolve(overrides.scss).then(util.scss) : overrides.css ?
      Promise.resolve(overrides.css) : buildModuleCoreCss(moduleName)

  var themeCss = overrides.themeScss ? Promise.all([themePromise, '']).spread(objToScss).then(function (variables) {
    return variables + '\n' + overrides.themeScss
  }).then(util.scss) : overrides.themeCss ?
    Promise.resolve(overrides.themeCss) : Promise.all([moduleName, themePromise]).spread(buildModuleThemeCss)

  var promise = Promise.props({
    moduleName: moduleName,
    coreJs: buildModuleCoreJs(moduleName),
    themeJson: themePromise.then(buildModuleThemeJson),
    coreCss: coreCss,
    themeCss: themeCss,
    variables: Promise.props({
      json: themeObjPromise.spread(objToJson),
      scss: themeObjPromise.spread(objToScss),
      stylus: themeObjPromise.spread(objToStylus),
      less: themeObjPromise.spread(objToLess),
      css: themeObjPromise.spread(objToCssVariables),
      quantum: Promise.all([moduleName, themePromise]).spread(objToQuantum)
    })
  }).catch(function (error) {
    return Promise.reject(new Error("Error building module '" + moduleName + "': " + error.message + '\n'))
  })

  cache.set(moduleName, promise)

  return promise

}

// Loads the default theme variables for a module, returning a flat object containing the variables.
function loadModuleThemeDefaults (moduleName) {
  var filename = path.join(util.moduleDir(moduleName), 'main', 'theme.um')
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
function resolveModuleTheme (moduleName, moduleTheme) {
  return loadModuleThemeDefaults(moduleName).then(function (defaults) {
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
function buildModuleCoreJs (moduleName) {
  var orderFilename = path.join(util.moduleDir(moduleName), 'main', 'order.json')
  return util.doesExist(orderFilename)
    .then(function (exists) {
      if (exists) { // handle order.json case
        return fs.readFileAsync(orderFilename)
          .then(JSON.parse)
          .then(function (order) {
            return Promise.all(order.coffee.map(function (filename) {
              var filename = path.join(util.moduleDir(moduleName), 'main', filename)
              return fs.readFileAsync(filename, 'utf8').then(function (src) {
                return util.coffee(src, filename)
              })
            }))
          })
          .then(function (srcs) {
            return srcs.join('\n')
          }).then(util.iife)

      } else { // handle standard index.coffee case
        var filename = path.join(util.moduleDir(moduleName), 'main', 'index.coffee')
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
function buildModuleCoreCss (moduleName) {
  var filename = path.join(util.moduleDir(moduleName), 'main', 'index.scss')
  return util.doesExist(filename)
    .then(function (exists) {
      if (exists) {
        return fs.readFileAsync(filename, 'utf8').then(util.scss)
      }
    })
}

// Builds the module's theme css (currently only supports scss as the input)
function buildModuleThemeCss (moduleName, moduleTheme) {
  var filename = path.join(util.moduleDir(moduleName), 'main', 'theme.scss')
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
    var module = quantum.create(moduleName)
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

// gets the entire list of dependencies for a module
function getModuleDependencies (moduleName) {
  return fs.readJsonAsync(path.join(util.moduleDir(moduleName), 'module.json'))
    .then(function (module) {
      var dependencies = module.dependencies
      if (dependencies != undefined && dependencies.length > 0) {
        return computeDependencyList(dependencies)
      } else if (dependencies != undefined) {
        return Promise.resolve(dependencies)
      } else {
        throw new Error('Module "' + moduleName + '" either has no dependencies or is included as an incorrect dependency.')
      }
    })
}

function computeDependencyList (modules) {
  return Promise.all(modules.map(getModuleDependencies))
    .then(function (list) {
      return Promise.resolve(flatten(modules.concat(list)))
    })
}

// calculate the order that all modules should go in - then this can be referred to when building subsets of hexagon
var moduleOrderCache = undefined
function getAllModulesOrder () {
  if (moduleOrderCache) {
    return new Promise.resolve(moduleOrderCache)
  }

  return util.moduleList()
    .map(function (name) {
      return fs.readJsonAsync(path.join(util.moduleDir(name), 'module.json'))
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
function getModulesOrder (modules) {
  return getAllModulesOrder()
    .filter(function (m) {
      return modules.indexOf(m) > -1
    })
}

function getModuleList (options) {
  if (options.modules) {
    return Promise.resolve(options.modules)
  } else if (options.excludedModules) {
    return util.moduleList().filter(function (moduleName) {
      return options.excludedModules.indexOf(moduleName) === -1
    })
  } else {
    return util.moduleList()
  }
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
    modules: options.modules || util.moduleList(),
    theme: options.theme || {
        extra: {}
    },
    prefix: options.prefix || 'hx',
    headerMode: 'full'
  }).then(function (options) {
    var themeModules = options.theme.modules || {}
    return getModuleList(options).then(getModulesOrder).map(function (moduleName) {
      return buildModule(moduleName, themeModules[moduleName])
    }).then(function (builtModules) {
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
      var build = {
        js: util.jsBlockComment(headerComment) + replacePrefix(js, options),
        css: util.cssBlockComment(headerComment) + replacePrefix(css, options),
        coreCss: util.cssBlockComment(headerComment) + replacePrefix(coreCss, options),
        themeCss: util.cssBlockComment(headerComment) + replacePrefix(themeCss, options),
        variables: {
          json: replacePrefix(JSON.stringify(themeJson, undefined, 2), options),
          scss: replacePrefix(variablesScss, options),
          stylus: replacePrefix(variablesStylus, options),
          less: replacePrefix(variablesLess, options),
          css: replacePrefix(variablesCss, options),
          quantum: replacePrefix(variablesQuantum, options)
        }
      }

      return build
    })

  })
}

// export everything for testing and use in index.js
exports.buildModule = buildModule
exports.buildLibrary = buildLibrary
exports.getModuleDependencies = getModuleDependencies
