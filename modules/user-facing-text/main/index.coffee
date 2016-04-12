_ =
  initialValues: {}
  localisedText: {}

completeGetterSetter = (object) ->
  if arguments.length
    for module of object
      for key of object[module]
        partialGetterSetter(module, key, object[module][key])
  else
    hx.clone _.localisedText

partialGetterSetter = (module, key, value) ->
  if module and module.length and key and key.length
    if hx.isString(value) and value.length
      _.localisedText[module] ?= {}
      _.localisedText[module][key] = value
      _.initialValues[module] ?= {}
      _.initialValues[module][key] ?= value
      true
    else if not value?
      text = _.localisedText[module]?[key]
      unless text
        hx.consoleWarning "hx.userFacingText: No text was found for key: #{key} in module: #{module}"
      text
    else
      hx.consoleWarning "hx.userFacingText: The value provided must be a string but was passed value: #{value}"
  else
    hx.consoleWarning "hx.userFacingText: A module and key are expected as strings but was passed module: #{module} and key: #{key}"

userFacingText = ->
  if hx.isObject(arguments[0]) or arguments.length is 0
    completeGetterSetter.apply(this, arguments)
  else
    partialGetterSetter.apply(this, arguments)

userFacingTextDefaults = -> hx.clone _.initialValues

hx.userFacingText = userFacingText
hx.userFacingText.defaults = userFacingTextDefaults

# For tests
hx.userFacingText._ = _