import logger from 'logger/main'
import { clone, isPlainObject, isString } from 'utils/main'

# exported for tests
export state = {
  initialValues: {}
  localisedText: {}
}

completeGetterSetter = (object) ->
  if arguments.length > 0
    # Setter - set multiple module/key values
    if isPlainObject(object)
      for moduleName of object
        for key of object[moduleName]
          partialGetterSetter(moduleName, key, object[moduleName][key])
    else
      logger.warn('hx.userFacingText: Expected a plain object but was instead passed:', object)
    return
  else
    # Getter - get the entire set of localised text
    clone(state.localisedText)

partialGetterSetter = (moduleName, key, value) ->
  if isString(moduleName) and isString(key)
    if arguments.length > 2
      if isString(value)
        # Setter - set the localised text for a moduleName/key
        state.localisedText[moduleName] ?= {}
        state.localisedText[moduleName][key] = value
        state.initialValues[moduleName] ?= {}
        state.initialValues[moduleName][key] ?= value
        return
      else
        logger.warn("hx.userFacingText: The value provided must be a string but was passed value: #{value}")
    else
      # Getter - get the localised text for a module/key
      text = state.localisedText[moduleName]?[key]
      if text
        return text
      else
        logger.warn("hx.userFacingText: No text was found for key: #{key} in module: #{moduleName}")
  else
    logger.warn("hx.userFacingText: A module and key are expected as strings but was passed module: #{moduleName} and key: #{key}")

export userFacingText = ->
  if arguments.length <= 1
    return completeGetterSetter.apply(this, arguments)
  else
    return partialGetterSetter.apply(this, arguments)

export userFacingTextDefaults = ->
  clone(state.initialValues)
