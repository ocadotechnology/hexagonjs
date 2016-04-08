class UserFacingText extends hx.EventEmitter
  constructor: ->
    super
    @_ =
      localisedText: {}

  localisedText: (stringPath, locales) ->
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

        @_.localisedText = hx.merge.defined(@_.localisedText, newText)
        @emit 'change'
        this
      else
        localisedText = undefined
        tmp = @_.localisedText
        for string, i in strings
          if i is strings.length - 1
            localisedText = tmp[string]
          else if tmp?
            tmp = tmp[string]
          else
            break
        if not localisedText
          hx.consoleWarning 'hx.userFacingText.localisedText: No text was found for locale for the path ' + stringPath
        else
          localisedText[hx.preferences.locale()] || localisedText['en'] # There must be a fallback in english.
    else
      @_.localisedText


globalUserFacingText = new UserFacingText

userFacingText = (stringPath, locales) ->
  globalUserFacingText.localisedText.apply(globalUserFacingText, arguments)

hx.userFacingText = userFacingText

# For tests
hx.userFacingText._ = globalUserFacingText._