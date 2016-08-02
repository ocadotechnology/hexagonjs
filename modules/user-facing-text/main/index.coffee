utils = require('modules/util/main/utils')

state = require('./state.coffee')

completeGetterSetter = (object) ->
  if arguments.length > 0
    # Setter - set multiple module/key values
    if utils.isPlainObject(object)
      for moduleName of object
        for key of object[moduleName]
          partialGetterSetter(moduleName, key, object[moduleName][key])
    else
      utils.consoleWarning('hx.userFacingText: Expected a plain object but was instead passed:', object)
    return
  else
    # Getter - get the entire set of localised text
    utils.clone(state.localisedText)

partialGetterSetter = (moduleName, key, value) ->
  if utils.isString(moduleName) and utils.isString(key)
    if arguments.length > 2
      if utils.isString(value)
        # Setter - set the localised text for a moduleName/key
        state.localisedText[moduleName] ?= {}
        state.localisedText[moduleName][key] = value
        state.initialValues[moduleName] ?= {}
        state.initialValues[moduleName][key] ?= value
        return
      else
        utils.consoleWarning("hx.userFacingText: The value provided must be a string but was passed value: #{value}")
    else
      # Getter - get the localised text for a module/key
      text = state.localisedText[moduleName]?[key]
      if text
        return text
      else
        utils.consoleWarning("hx.userFacingText: No text was found for key: #{key} in module: #{moduleName}")
  else
    utils.consoleWarning("hx.userFacingText: A module and key are expected as strings but was passed module: #{moduleName} and key: #{key}")

userFacingText = ->
  if arguments.length <= 1
    return completeGetterSetter.apply(this, arguments)
  else
    return partialGetterSetter.apply(this, arguments)

defaults = -> utils.clone(state.initialValues)
userFacingText.defaults = defaults

module.exports = userFacingText
module.exports.hx = {
  userFacingText: userFacingText
}
