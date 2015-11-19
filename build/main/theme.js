/*

  _   _                                     _
 | | | | _____  ____ _  __ _  ___  _ __    (_)___
 | |_| |/ _ \ \/ / _` |/ _` |/ _ \| '_ \   | / __|
 |  _  |  __/>  < (_| | (_| | (_) | | | |_ | \__ \
 |_| |_|\___/_/\_\__,_|\__, |\___/|_| |_(_)/ |___/
                       |___/             |__/

  -----------------------------------------------

  Theme
  -----

  Utilities for working with themes (and the various formats they can be written in).

  Current formats:
    - quantum / quantum ast
    - json

  There are methods for going to and from the json form for each format (although there is
  currently only one alternative json, ie quantum). To define a new format you must simply
  define how to go to and from json.

  There are also some utils for merging themes together, and applying theme variables.

  For reference here is the json from of a theme:

  {
    name: 'theme-name',
    variables: {
      variableName1: "variableValue1",
      variableName2: "variableValue2",
      ...
    },
    extra: {
      resetCss: false/true,
      resetJs: false/true,
      css: "some extra css that gets included at the end of hexagon.css",
      js: "some extra js that gets included at the end of hexagon.js"
    },
    modules: {
      moduleName1: {
        extra: {
          resetCss: false/true,
          resetScss: false/true,
          resetThemeCss: false/true,
          resetThemeScss: false/true,
          css: "optional extra css that gets included at the end of the core css for a module",
          scss: "optional extra scss that gets included at the end of the core css for a module.",
          themeCss: "optional extra css that gets included at the end of the core css for a module",
          themeScss: "optional extra scss that gets included at the end of the core css for a module - and has access to the theme variables"
        },
        override: {
          css: "optional css that overrides the core css for a module",
          scss: "optional scss that overrides the core css for a module.",
          themeCss: "optional css that overrides the theme css for a module",
          themeScss: "optional scss that overrides the core css for a module - and has access to the theme variables"
        },
        variables: {
          themeVariable1: "themeVariableValue1",
          themeVariable2: "themeVariableValue2",
          ...
        }
      },
      ...
    }
  }

*/

/*

  Theme manipulation
  ------------------

  Merging and flattening of themes

*/

// merges two module sections together in a theme
function mergeModules (module1, module2) {
  var res = {
    extra: {},
    overrides: {},
    variables: {}
  }

  // merge the extra css and scss
  if (module1.extra) {
    if (module1.extra.css) {
      res.extra.css = module1.extra.css
    }
    if (module1.extra.scss) {
      res.extra.scss = module1.extra.scss
    }
    if (module1.extra.themeCss) {
      res.extra.themeCss = module1.extra.themeCss
    }
    if (module1.extra.themeScss) {
      res.extra.themeScss = module1.extra.themeScss
    }
  }

  if (module2.extra) {
    if (module2.extra.css) {
      if (module2.extra.resetCss) {
        res.extra.css = module2.extra.css
      } else {
        res.extra.css = res.extra.css ? res.extra.css + '\n' + module2.extra.css : module2.extra.css
      }
    }
    if (module2.extra.scss) {
      if (module2.extra.resetScss) {
        res.extra.scss = module2.extra.scss
      } else {
        res.extra.scss = res.extra.scss ? res.extra.scss + '\n' + module2.extra.scss : module2.extra.scss
      }
    }
    if (module2.extra.themeCss) {
      if (module2.extra.resetThemeCss) {
        res.extra.themeCss = module2.extra.themeCss
      } else {
        res.extra.themeCss = res.extra.themeCss ? res.extra.themeCss + '\n' + module2.extra.themeCss : module2.extra.themeCss
      }
    }
    if (module2.extra.themeScss) {
      if (module2.extra.resetThemeScss) {
        res.extra.themeScss = module2.extra.themeScss
      } else {
        res.extra.themeScss = res.extra.themeScss ? res.extra.themeScss + '\n' + module2.extra.themeScss : module2.extra.themeScss
      }
    }
  }

  // merge the overrides
  if (module1.overrides) {
    if (module1.overrides.css) {
      res.overrides.css = module1.overrides.css
    }
    if (module1.overrides.scss) {
      res.overrides.scss = module1.overrides.scss
    }
    if (module1.overrides.themeCss) {
      res.overrides.themeCss = module1.overrides.themeCss
    }
    if (module1.overrides.themeScss) {
      res.overrides.themeScss = module1.overrides.themeScss
    }
  }
  if (module2.overrides) {
    if (module2.overrides.css) {
      res.overrides.css = module2.overrides.css
    }
    if (module2.overrides.scss) {
      res.overrides.scss = module2.overrides.scss
    }
    if (module2.overrides.themeCss) {
      res.overrides.themeCss = module2.overrides.themeCss
    }
    if (module2.overrides.themeScss) {
      res.overrides.themeScss = module2.overrides.themeScss
    }
  }

  // merge the variables
  if (module1.variables) {
    Object.keys(module1.variables).forEach(function (key) {
      res.variables[key] = module1.variables[key]
    })
  }
  if (module2.variables) {
    Object.keys(module2.variables).forEach(function (key) {
      res.variables[key] = module2.variables[key]
    })
  }

  return res
}

// merges two themes together, properly applying extra css, and js
function merge (theme1, theme2) {
  var res = {
    variables: {},
    extra: {},
    modules: {}
  }

  if (theme1.name) {
    res.name = theme1.name
  }

  if (theme2.name) {
    res.name = theme2.name
  }

  // merge the global variables
  if (theme1.variables) {
    Object.keys(theme1.variables).forEach(function (key) {
      res.variables[key] = theme1.variables[key]
    })
  }

  if (theme2.variables) {
    Object.keys(theme2.variables).forEach(function (key) {
      res.variables[key] = theme2.variables[key]
    })
  }

  // merge the extra css and js
  if (theme1.extra) {
    if (theme1.extra.js) {
      res.extra.js = theme1.extra.js
    }
    if (theme1.extra.css) {
      res.extra.css = theme1.extra.css
    }
  }

  if (theme2.extra) {
    if (theme2.extra.js) {
      if (theme2.extra.resetJs) {
        res.extra.js = theme2.extra.js
      } else {
        res.extra.js = res.extra.js ? res.extra.js + '\n' + theme2.extra.js : theme2.extra.js
      }
    }
    if (theme2.extra.css) {
      if (theme2.extra.resetCss) {
        res.extra.css = theme2.extra.css
      } else {
        res.extra.css = res.extra.css ? res.extra.css + '\n' + theme2.extra.css : theme2.extra.css
      }
    }
  }

  // merge the modules together
  if (theme1.modules) {
    Object.keys(theme1.modules).forEach(function (key) {
      res.modules[key] = mergeModules(theme1.modules[key], {})
    })
  }

  if (theme2.modules) {
    Object.keys(theme2.modules).forEach(function (key) {
      res.modules[key] = mergeModules(res.modules[key] || {}, theme2.modules[key])
    })
  }

  return res
}

// flattens a theme - ie applies the theme variables. This does not modify the theme passed in - it returns a new
// theme object. The resulting theme will have no variables defined as they will have been propaged down to the
// module themes.
function flatten (theme) {
  var res = merge({}, theme)

  if (theme.variables && theme.modules) {
    Object.keys(theme.modules).forEach(function (moduleName) {
      res.modules[moduleName] = mergeModules(theme.modules[moduleName], {})
      var moduleVariables = res.modules[moduleName].variables
      Object.keys(moduleVariables).forEach(function (moduleVariableName) {
        var moduleVariableValue = moduleVariables[moduleVariableName]
        if (moduleVariableValue[0] === '$' && (moduleVariableValue.slice(1) in theme.variables)) {
          moduleVariables[moduleVariableName] = theme.variables[moduleVariableValue.slice(1)]
        }
      })
    })
  }

  res.variables = {}

  return res
}

exports.mergeModules = mergeModules
exports.merge = merge
exports.flatten = flatten

/*

  Theme conversions
  ------------------

  Converting themes from one format to another

*/

var qm = require('quantum-js')

// parsed form of quantum
var quantumAST = {
  toJson: function (input) {
    var theme = qm.select(input).select('theme')

    var name = theme.ps()

    var variables = {}
    theme.select('variables').entityContent().content.forEach(function (entity) {
      variables[entity.type] = qm.select(entity).cs()
    })

    var extra = {}
    if (theme.has('extra')) {
      var extraEntity = theme.select('extra')
      extra = {
        resetCss: extraEntity.has('resetCss') ? extraEntity.select('resetCss').ps() === 'true' : false,
        resetJs: extraEntity.has('resetJs') ? extraEntity.select('resetJs').ps() === 'true' : false,
        css: extraEntity.has('css') ? extraEntity.select('css').cs() : undefined,
        js: extraEntity.has('js') ? extraEntity.select('js').cs() : undefined
      }
    }

    var modules = {}
    theme.select('modules').entityContent().content.forEach(function (entity) {
      var moduleEntity = qm.select(entity)

      var moduleExtra = {}
      if (moduleEntity.has('extra')) {
        var extraEntity = moduleEntity.select('extra')
        moduleExtra = {
          resetCss: extraEntity.has('resetCss') ? extraEntity.select('resetCss').ps() === 'true' : false,
          resetScss: extraEntity.has('resetScss') ? extraEntity.select('resetScss').ps() === 'true' : false,
          resetThemeCss: extraEntity.has('resetThemeCss') ? extraEntity.select('resetThemeCss').ps() === 'true' : false,
          resetThemeScss: extraEntity.has('resetThemeScss') ? extraEntity.select('resetThemeScss').ps() === 'true' : false,
          css: extraEntity.has('css') ? extraEntity.select('css').cs() : undefined,
          scss: extraEntity.has('scss') ? extraEntity.select('scss').cs() : undefined,
          themeCss: extraEntity.has('themeCss') ? extraEntity.select('themeCss').cs() : undefined,
          themeScss: extraEntity.has('themeScss') ? extraEntity.select('themeScss').cs() : undefined
        }
      }

      var moduleOverrides = {}
      if (moduleEntity.has('overrides')) {
        var overridesEntity = moduleEntity.select('overrides')
        moduleOverrides = {
          css: overridesEntity.has('css') ? overridesEntity.select('css').cs() : undefined,
          scss: overridesEntity.has('scss') ? overridesEntity.select('scss').cs() : undefined,
          themeCss: overridesEntity.has('themeCss') ? overridesEntity.select('themeCss').cs() : undefined,
          themeScss: overridesEntity.has('themeScss') ? overridesEntity.select('themeScss').cs() : undefined
        }
      }

      var moduleVariables = {}
      moduleEntity.select('variables').entityContent().content.forEach(function (entity) {
        moduleVariables[entity.type] = qm.select(entity).cs()
      })

      modules[moduleEntity.type] = {
        extra: moduleExtra,
        overrides: moduleOverrides,
        variables: moduleVariables
      }

    })

    return {
      name: name,
      variables: variables,
      extra: extra,
      modules: modules
    }
  },
  fromJson: function (json) {
    // XXX: TODO
  }
}

// string form of quantum
var quantum = {
  toJson: function (quantumString) {
    return quantumAST.toJson(qm.parse(quantumString))
  },
  fromJson: function (json) {
    return qm.stringify(quantumAST.convertJsonToQuantumAst(json))
  }
}

exports.formats = {
  quantum: quantum,
  quantumAST: quantumAST
}
