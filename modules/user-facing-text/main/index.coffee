_ =
  initialValues: {}
  localisedText: {}

{ detached, Selection } = hx

setWholeObject = (object) ->
  # Setter - set multiple module/key values
  if hx.isPlainObject(object)
    for module of object
      for key of object[module]
        setValue(module, key, object[module][key])
  else
    hx.consoleWarning "hx.userFacingText: Expected a plain object but was instead passed: #{object}"
  return undefined

isStringWithLength = (value) -> hx.isString(value) and value.length

defaultReplacer = (str, key, params) -> str.replace(new RegExp("\\\$#{key}", 'g'), params[key])

format = (string, params, replacer = defaultReplacer) ->
  replaceStringValues = (str, key) => replacer(str, key, params)
  return Object.keys(params).sort().reverse().reduce(replaceStringValues, string)


toMultilineSelection = (string, textElement = 'span', dontAddBreak) ->
  return new Selection(string.split('\n')
    .reduce(((prev, curr, i) -> [
      prev...,
      (if not dontAddBreak and i > 0 then detached('br').node() else null),
      detached(textElement).text(curr).node()
    ]), [])
  )


# Getter - get the localised text for a module/key
paramRegex = /\$\D/g
getValue = (module, key, parseLater, params) ->
  valueToGet = _.localisedText[module]?[key]

  if not valueToGet
    hx.consoleWarning "hx.userFacingText: No text was found for key: #{key} in module: #{module}"
    return undefined

  if parseLater isnt true and valueToGet.match(paramRegex)
    if params
      return format(valueToGet, params)

    hx.consoleWarning "hx.userFacingText: Parameterised string was returned without parsing parameters: #{valueToGet}.\nCall userFacingText(module, key, parameters) to replace the parameters or userFacingText(module, key, true) if you are handling this externally."

  return valueToGet

# Setter - set the localised text for a module/key
setValue = (module, key, valueToSet) ->
  if not isStringWithLength(valueToSet)
    hx.consoleWarning "hx.userFacingText: The value provided must be a string but was passed value: #{valueToSet}"
    return undefined

  _.localisedText[module] ?= {}
  _.localisedText[module][key] = valueToSet

  _.initialValues[module] ?= {}
  # Set the initial value, don't update it
  _.initialValues[module][key] ?= valueToSet
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
    return hx.clone _.localisedText

  if arguments.length is 1
    # Set the entire localised text
    return setWholeObject(arguments[0])

  module = arguments[0]
  key = arguments[1]

  if not isStringWithLength(module) or not isStringWithLength(key)
    hx.consoleWarning "hx.userFacingText: A module and key are expected as strings but was passed module: #{module} and key: #{key}"
    return undefined

  if arguments.length is 2
    # Get the value for a key
    return getValue(module, key, false)

  if arguments[2] is true
    # Get the parameterised value for a key but inject the value later
    parseLater = arguments[2]
    return getValue(module, key, parseLater)

  if hx.isPlainObject(arguments[2])
    # Get the parameterised value for a key with the values to inject
    paramsToParse = arguments[2]
    return getValue(module, key, false, paramsToParse)

  # Set the value for a key
  valueToSet = arguments[2]
  return setValue(module, key, valueToSet)


userFacingTextDefaults = -> hx.clone _.initialValues

hx.userFacingText = userFacingText
hx.userFacingText.format = format
hx.userFacingText.defaults = userFacingTextDefaults
hx.userFacingText.toMultilineSelection = toMultilineSelection

# For tests
hx._.userFacingText = _
