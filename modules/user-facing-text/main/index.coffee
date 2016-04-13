_ =
  initialValues: {}
  localisedText: {}

completeGetterSetter = (object) ->
  if arguments.length
    if hx.isPlainObject(object)
      for module of object
        for key of object[module]
          partialGetterSetter(module, key, object[module][key])
    else
      hx.consoleWarning "hx.userFacingText: Expected a plain object but was instead passed: #{object}"
  else
    hx.clone _.localisedText

partialGetterSetter = (module, key, value) ->
  if hx.isString(module) and module.length and hx.isString(key) and key.length
    if hx.isString(value) and value.length
      _.localisedText[module] ?= {}
      _.localisedText[module][key] = value
      _.initialValues[module] ?= {}
      _.initialValues[module][key] ?= value
      true
    else if not value?
      text = _.localisedText[module]?[key]
      if text
        text
      else
        hx.consoleWarning "hx.userFacingText: No text was found for key: #{key} in module: #{module}"
    else
      hx.consoleWarning "hx.userFacingText: The value provided must be a string but was passed value: #{value}"
  else
    hx.consoleWarning "hx.userFacingText: A module and key are expected as strings but was passed module: #{module} and key: #{key}"

userFacingText = ->
  if arguments.length <= 1
    completeGetterSetter.apply(this, arguments)
  else
    partialGetterSetter.apply(this, arguments)

userFacingTextDefaults = -> hx.clone _.initialValues

hx.userFacingText = userFacingText
hx.userFacingText.defaults = userFacingTextDefaults

# For tests
hx.userFacingText._ = _