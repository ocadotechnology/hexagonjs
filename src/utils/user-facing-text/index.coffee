import logger from 'utils/logger'
import { clone, isPlainObject, isString, isArray } from 'utils/utils'
import { detached, Selection } from 'utils/selection'

export state =
  initialValues: {}
  localisedText: {}

setWholeObject = (object) ->
  # Setter - set multiple module/key values
  if isPlainObject(object)
    for module of object
      for key of object[module]
        setValue(module, key, object[module][key])
  else
    logger.warn "userFacingText: Expected a plain object but was instead passed: #{object}"
  return undefined

isStringWithLength = (value) -> isString(value) and value.length

defaultReplacer = (str, key, params) -> str.replace(new RegExp("\\\$#{key}", 'g'), params[key])

format = (string, params, replacer = defaultReplacer) ->
  replaceStringValues = (str, key) => replacer(str, key, params)
  return Object.keys(params).sort().reverse().reduce(replaceStringValues, string)


toMultilineSelection = (string, textElement = 'span', dontAddBreak) ->
  elements = string.split('\n')
    .reduce(((prev, curr, i) -> [
      prev...,
      (if not dontAddBreak and i > 0 then detached('br').node() else null),
      detached(textElement).text(curr).node()
    ]), [])

  return new Selection(elements)

lookupPlural = (valueToGet, n) ->
  a = valueToGet.filter(([min, max]) -> n >= min and (n <= max or max is null))
  [min, max, string] = a[0]
  return string

# Getter - get the localised text for a module/key
paramRegex = /\$\D/g
getValue = (module, key, parseLater, params) ->
  valueToGet = state.localisedText[module]?[key]

  if not valueToGet
    logger.warn "userFacingText: No text was found for key: #{key} in module: #{module}"
    return undefined

  val = if isArray(valueToGet)
    n = if not params or isNaN(params.n) then 1 else params.n
    lookupPlural(valueToGet, n)
  else
    valueToGet


  if parseLater isnt true and val.match(paramRegex)
    if params
      return format(val, params)

    logger.warn "userFacingText: Parameterised string was returned without parsing parameters: #{val}.\nCall userFacingText(module, key, parameters) to replace the parameters or userFacingText(module, key, true) if you are handling this externally."

  return val

isNullOrNumber = (val) -> val is null or not isNaN(val)

isCorrectlyFormattedArray = (valueToSet) ->
  return (isArray(valueToSet) and valueToSet.every((item) -> isArray(item) and item.length is 3) and
    valueToSet.every(([min, max, value]) -> isNullOrNumber(min) and isNullOrNumber(max) and isStringWithLength(value))
  ) or false


# Setter - set the localised text for a module/key
setValue = (module, key, valueToSet) ->
  if not isCorrectlyFormattedArray(valueToSet) and not isStringWithLength(valueToSet)
    logger.warn "userFacingText: The value provided must be a string but was passed value: #{valueToSet}"
    return undefined

  state.localisedText[module] ?= {}
  state.localisedText[module][key] = valueToSet

  state.initialValues[module] ?= {}
  # Set the initial value, don't update it
  state.initialValues[module][key] ?= valueToSet
  undefined

# Interface
# interface UserFacingTextData {
#   [module: string]: {
#     [key: string]: value
#   }
# }
#
# API
#
# userFacingText() => UserFacingTextData
#
# userFacingText(textObject: UserFacingTextData)
#
#
# userFacingText(module: string, key: string) => string
# userFacingText(module: string, key: string, parseLater: boolean) => string // Throws a warning when parseLater = false and there is a parameter in string
# userFacingText(module: string, key: string, parameters: { [key: string]: string }) => string
#
# userFacingText(module: string, key: string, value: string)
userFacingText = ->
  if not arguments.length
    # Get the current localised text
    return clone state.localisedText

  if arguments.length is 1
    # Set the entire localised text
    return setWholeObject(arguments[0])

  module = arguments[0]
  key = arguments[1]

  if not isStringWithLength(module) or not isStringWithLength(key)
    logger.warn "userFacingText: A module and key are expected as strings but was passed module: #{module} and key: #{key}"
    return undefined

  if arguments.length is 2
    # Get the value for a key
    return getValue(module, key, false)

  if arguments[2] is true
    # Get the parameterised value for a key but inject the value later
    parseLater = arguments[2]
    return getValue(module, key, parseLater)

  if isPlainObject(arguments[2])
    # Get the parameterised value for a key with the values to inject
    paramsToParse = arguments[2]
    return getValue(module, key, false, paramsToParse)

  # Set the value for a key
  valueToSet = arguments[2]
  return setValue(module, key, valueToSet)


userFacingTextDefaults = -> clone state.initialValues

# XXX Deprecated: Remove in next major
userFacingText.format = format
userFacingText.defaults = userFacingTextDefaults
userFacingText.toMultilineSelection = toMultilineSelection

export {
  userFacingText,
  userFacingTextDefaults,
  toMultilineSelection,
  format
}
