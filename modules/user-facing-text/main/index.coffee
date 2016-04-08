_ =
  localisedText: {}

userFacingText = (stringPath, locales) ->
  if arguments.length
    strings = if hx.isString(stringPath)
      [stringPath]
    else stringPath

    if locales?
      newText = tmp = {}
      for string, i in strings
        if i is strings.length - 1
          # Merge the locales to prevent mutation
          tmp[string] = hx.merge locales
        else
          tmp[string] = {}
          tmp = tmp[string]
      _.localisedText = hx.merge.defined(_.localisedText, newText)
      this
    else
      textObject = undefined
      tmp = _.localisedText
      for string, i in strings
        if i is strings.length - 1
          textObject = tmp[string]
        else if tmp?
          tmp = tmp[string]
        else
          break
      if not textObject
        hx.consoleWarning 'hx.userFacingText.localisedText: No text was found for locale for the path ' + stringPath
      else
        textObject[hx.preferences.locale()] || textObject['en'] # There must be a fallback in english.
  else
    _.localisedText

hx.userFacingText = userFacingText
hx.userFacingText.emitter = userFacingTextEmitter

# For tests
hx.userFacingText._ = _