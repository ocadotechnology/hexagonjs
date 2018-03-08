var quantum = require('./quantum')

function replacer (variables, str) {
  var res = str
  variables.forEach(function (v) {
    if (typeof (v.value) === 'object') {
      var val = JSON.stringify(v.value)
    } else {
      var val = v.value
    }
    res = res.replace('{{' + v.key + '}}', val)
  })
  return res
}

function processEntity (entity, dictionary, content) {
  var res = content.slice(0)
  if (entity && entity.content) {
    entity.content.forEach(function (child) {
      var r = template(child, dictionary)
      if (Array.isArray(r)) {
        res = res.concat(r)
      } else {
        res.push(r)
      }
    })
  }

  return res
}

function template (entity, variables) {
  if (typeof (entity) === 'string') {
    return replacer(variables, entity)
  } else {
    var content = []

    if (entity.type === 'for') {
      if (entity.params.length < 3) {
        throw new Error('for loop has wrong arguments: for ' + entity.params.join(' '))
      }

      var variable1 = {
        key: entity.params[0],
        value: undefined
      }
      if (entity.params[1] !== 'in') {
        var variable2 = {
          key: entity.params[1],
          value: undefined
        }
        var source = entity.params[3]
      } else {
        var source = entity.params[2]
      }

      var items = variables.filter(function (key) {
        return key.key == source
      })[0]

      if (items) {
        items = items.value
      }

      if (Array.isArray(items)) {
        variables.push(variable1)

        items.forEach(function (value) {
          variable1.value = value
          content = processEntity(entity, variables, content)
        })

        variables.pop()

      } else if (items !== undefined) {
        variables.push(variable1)
        variables.push(variable2)

        Object.keys(items).forEach(function (key) {
          variable1.value = key
          variable2.value = items[key]
          content = processEntity(entity, variables, content)
        })

        variables.pop()
        variables.pop()
      }

      return content

    } else if (entity.type == 'if') {
      var variableName = entity.params[0]
      var variable = variables.filter(function (key) {
        return key.key == variableName
      })[0]

      if (variable && variable.value) {
        content = processEntity(entity, variables, content)
      }

      return content

    } else if (entity.type == 'ifnot') {
      var variableName = entity.params[0]
      var variable = variables.filter(function (key) {
        return key.key == variableName
      })[0]

      if (!variable || !variable.value) {
        content = processEntity(entity, variables, content)
      }

      return content

    } else {
      content = processEntity(entity, variables, content)

      if (entity.type || entity.params) {
        return {
          type: entity.type,
          params: entity.params.map(function (str) {
            return replacer(variables, str)
          }),
          content: content
        }
      } else {
        return {
          content: content
        }
      }
    }
  }
}

function prepareVariables (variables, prefix) {
  var keys = []

  var prefix = prefix || ''

  var vars = variables || {}

  Object.keys(vars).forEach(function (key) {
    var value = vars[key]
    if (value !== null && typeof (value) === 'object' && !Array.isArray(value)) {
      keys.push({
        key: prefix + key,
        value: value
      })
      keys = keys.concat(prepareVariables(value, prefix + key + '.'))
    } else {
      if (Array.isArray(value)) {
        value.forEach(function (v, i) {
          keys.push({
            key: prefix + key + '[' + i + ']',
            value: v
          })
        })
      }
      keys.push({
        key: prefix + key,
        value: value
      })
    }
  })

  return keys
}

function applyVariables (parsed, variables) {
  return template(parsed, variables)
}

function digestDefinitions (parsed) {
  var defsList = quantum.select(parsed).selectAll('define', {recursive: true})
  var definitions = {}
  defsList.forEach(function (def) {
    definitions[def.ps()] = def
  })
  return definitions
}

function applyDefinitions (parsed, definitions) {
  if (typeof parsed === 'string') {
    return parsed
  } else if (parsed.type === 'define') {
    return undefined
  } else if (definitions.hasOwnProperty(parsed.type)) {
    var selection = quantum.select(parsed)

    // XXX: add sub-entities name.ps, name.cs, age.ps, age.cs, etc
    var variables = [
      {key: 'ps', value: selection.ps()},
      {key: 'cs', value: selection.cs()}
    ]

    return template({type: '', ps: [], content: definitions[parsed.type].content}, variables).content
  } else {
    if (Array.isArray(parsed.content)) {
      var content = []
      parsed.content.forEach(function (c) {
        var res = applyDefinitions(c, definitions)
        if (res !== undefined) {
          if (Array.isArray(res)) {
            content = content.concat(res)
          } else {
            content.push(res)
          }
        }
      })
    } else {
      var content = parsed.content
    }

    if (parsed.type || parsed.params) {
      return {
        type: parsed.type,
        params: parsed.params,
        content: content
      }
    } else {
      return {
        content: content
      }
    }
  }
}

module.exports = function (options) {
  var variables = prepareVariables(options ? options.variables : {})

  return function (obj) {
    var definitions = digestDefinitions(obj.content)

    return {
      filename: obj.filename,
      content: applyVariables(applyDefinitions(obj.content, definitions), variables)
    }
  }
}

// insert the page title by wrapping the passed in object
module.exports.wrapper = function (options) {
  return function (obj) {
    return quantum.read.single(options.templateFilename)
      .then(function (template) {
        var newContent = template.content.content
        var contentEntity = quantum.select(template.content).select('content', {recursive: true})
        var position = contentEntity.parent.content.indexOf(contentEntity.original)
        var parentContent = contentEntity.parent.original.content
        parentContent.splice.apply(parentContent, [position, 1].concat(obj.content.content))
        obj.content = template.content
        return obj
      })
  }
}
