hx.userFacingText({
  preferences: {
    locale: 'Locale',
    preferences: 'Preferences',
    preferencesSaved: 'Preferences Saved',
    save: 'Save',
    timezone: 'Timezone'
  }
})

localeList = [
  {value:"af", full:"Afrikaans"}
  {value:"sq", full:"Albanian"}
  {value:"ar", full:"Arabic"}
  {value:"ar-MA", full:"Arabic (Morocco)"}
  {value:"ar-SA", full:"Arabic (Saudi Arabia)"}
  {value:"ar-TN", full:"Arabic (Tunisia)"}
  {value:"hy-AM", full:"Armenian"}
  {value:"az", full:"Azerbaijani"}
  {value:"id", full:"Bahasa Indonesia"}
  {value:"ms-MY", full:"Bahasa Malayu"}
  {value:"eu", full:"Basque"}
  {value:"be", full:"Belarusian"}
  {value:"bn", full:"Bengali"}
  {value:"bs", full:"Bosnian"}
  {value:"br", full:"Breton"}
  {value:"bg", full:"Bulgarian"}
  {value:"my", full:"Burmese"}
  {value:"ca", full:"Catalan"}
  {value:"zh-CN", full:"Chinese"}
  {value:"zh-TW", full:"Chinese (Traditional)"}
  {value:"cv", full:"Chuvash"}
  {value:"hr", full:"Croatian"}
  {value:"cs", full:"Czech"}
  {value:"da", full:"Danish"}
  {value:"nl", full:"Dutch"}
  {value:"en", full:"English"}
  {value:"en-US", full:"English (US)"}
  {value:"en-AU", full:"English (Australia)"}
  {value:"en-CA", full:"English (Canada)"}
  {value:"en-GB", full:"English (UK) "}
  {value:"eo", full:"Esperanto"}
  {value:"et", full:"Estonian"}
  {value:"fo", full:"Farose"}
  {value:"fi", full:"Finnish"}
  {value:"fr", full:"French"}
  {value:"fr-CA", full:"French (Canada)"}
  {value:"fy", full:"Frisian"}
  {value:"gl", full:"Galician"}
  {value:"ka", full:"Georgian"}
  {value:"de", full:"German"}
  {value:"de-AT", full:"German (Austria)"}
  {value:"el", full:"Greek"}
  {value:"he", full:"Hebrew"}
  {value:"hi", full:"Hindi"}
  {value:"hu", full:"Hungarian"}
  {value:"is", full:"Icelandic"}
  {value:"it", full:"Italian"}
  {value:"ja", full:"Japanese"}
  {value:"km", full:"Khmer (Cambodia)"}
  {value:"ko", full:"Korean"}
  {value:"lv", full:"Latvian"}
  {value:"lt", full:"Lithuanian"}
  {value:"lb", full:"Luxembourgish"}
  {value:"mk", full:"Macedonian"}
  {value:"ml", full:"Malayalam"}
  {value:"mr", full:"Marathi"}
  {value:"ne", full:"Nepalese"}
  {value:"nb", full:"Norwegian"}
  {value:"nn", full:"Norwegian Nynorsk"}
  {value:"fa", full:"Persian"}
  {value:"pl", full:"Polish"}
  {value:"pt", full:"Portuguese"}
  {value:"pt-BR", full:"Portuguese (Brazil)"}
  {value:"ro", full:"Romanian"}
  {value:"ru", full:"Russian"}
  {value:"sr", full:"Serbian"}
  {value:"sr-CYRL", full:"Serbian Cyrillic"}
  {value:"sk", full:"Slovak"}
  {value:"sl", full:"Slovenian"}
  {value:"es", full:"Spanish"}
  {value:"sv", full:"Swedish"}
  {value:"tl-PH", full:"Tagalog (Filipino)"}
  {value:"tzm", full:"Tamaziɣt"}
  {value:"tzm-LATN", full:"Tamaziɣt Latin"}
  {value:"ta", full:"Tamil"}
  {value:"th", full:"Thai"}
  {value:"bo", full:"Tibetan"}
  {value:"tr", full:"Turkish"}
  {value:"uk", full:"Ukrainian"}
  {value:"uz", full:"Uzbek"}
  {value:"vi", full:"Vietnamese"}
  {value:"cy", full:"Welsh"}
]

defaultTimezoneList = [
  'UTC-12:00'
  'UTC-11:00'
  'UTC-10:00'
  'UTC-09:30'
  'UTC-09:00'
  'UTC-08:00'
  'UTC-07:00'
  'UTC-06:00'
  'UTC-05:00'
  'UTC-04:30'
  'UTC-04:00'
  'UTC-03:30'
  'UTC-03:00'
  'UTC-02:00'
  'UTC-01:00'
  'UTC+00:00'
  'UTC+01:00'
  'UTC+02:00'
  'UTC+03:00'
  'UTC+03:30'
  'UTC+04:00'
  'UTC+04:30'
  'UTC+05:00'
  'UTC+05:30'
  'UTC+05:45'
  'UTC+06:00'
  'UTC+06:30'
  'UTC+07:00'
  'UTC+08:00'
  'UTC+08:30'
  'UTC+08:45'
  'UTC+09:00'
  'UTC+09:30'
  'UTC+10:00'
  'UTC+10:30'
  'UTC+11:00'
  'UTC+12:00'
  'UTC+12:45'
  'UTC+13:00'
  'UTC+14:00'
]

LocalStoragePreferencesStore = {
  save: (prefs, cb) -> localStorage.setItem('hx_preferences', prefs); cb()
  load: (cb) -> cb(undefined, localStorage.getItem('hx_preferences'))
}

lookupLocale = (locale) -> localeList.filter((l) -> l.value.toLowerCase() is locale.toLowerCase())[0]

defaultTimezoneLookup = (offset) ->
  modifier = if offset > 0 then '-' else '+'
  absOffset = Math.abs(offset)
  minutes = absOffset % 60
  hours = (absOffset - minutes) / 60
  "UTC#{modifier}#{hx.zeroPad(hours)}:#{hx.zeroPad(minutes)}"

class Preferences extends hx.EventEmitter
  constructor: ->
    super

    setupModal = (element) =>
      locale = @locale()
      timezone = @timezone()

      localeAutocompleteElement = hx.detached('input')
      localeAutocompleteElement.value(lookupLocale(locale)?.full)

      supportedLocales = localeList.map (l) =>
        {
          value: l.value,
          full: l.full,
          disabled: not (l.value in @_.supportedLocales)
        }

      new hx.AutoComplete(localeAutocompleteElement.node(), supportedLocales, {
        renderer: (element, datum) -> hx.select(element).text(datum.full)
        inputMap: (item) -> item.full
        showOtherResults: true
        mustMatch: true
      }).on 'change', (item) -> locale = item.value

      localeSection = hx.detached('div')
        .add(hx.detached('label').text(hx.userFacingText('preferences','locale')))
        .add(localeAutocompleteElement)

      # Timezone Stuff
      timezoneAutocompleteElement = hx.detached('input')
      timezoneAutocompleteElement.value(timezone)

      new hx.AutoComplete(timezoneAutocompleteElement.node(), @_.supportedTimezones, {
        showOtherResults: true
        mustMatch: true
      }).on 'change', (value) -> timezone = value

      timezoneSection = hx.detached('div')
        .add(hx.detached('label').text(hx.userFacingText('preferences','timezone')))
        .add(timezoneAutocompleteElement)

      saveButton = hx.detached('button').class('hx-btn hx-positive')
        .add(hx.detached('i').class('hx-icon hx-icon-check'))
        .add(hx.detached('span').text(' ' + hx.userFacingText('preferences','save')))
        .on 'click', =>
          @locale(locale)
          @timezone(timezone)
          @save (err) ->
            if err
              hx.notify.negative(err)
            else
              hx.notify.positive(hx.userFacingText('preferences','preferencesSaved'))
              modal.hide()

      hx.select(element)
        .append('div').class('hx-form')
        .add(localeSection)
        .add(timezoneSection)
        .add(saveButton)

    modal = new hx.Modal(hx.userFacingText('preferences','preferences'), setupModal)

    @_ = {
      backingStore: LocalStoragePreferencesStore
      supportedTimezones: defaultTimezoneList
      supportedLocales: localeList.map (v) -> v.value
      timezoneOffsetLookup: (timezone, datestamp) ->
        stampParts = timezone.replace('UTC','').replace('+','').replace('-0','-').split(':').map(Number)
        stampParts[0] + (if stampParts[0] >= 0 then (stampParts[1]/60) else -(stampParts[1]/60))
      preferences: {}
      modal: modal
    }

    defaultLocaleId = navigator.languages?[0] or navigator.language

    if not (hx.isString(defaultLocaleId) and lookupLocale(defaultLocaleId))
      defaultLocaleId = 'en'
    @locale defaultLocaleId

    guessedMomentTimezone = moment?.tz?.guess()
    if guessedMomentTimezone?
      @supportedTimezones moment.tz.names()
      @timezoneOffsetLookup (timezone, timestamp) ->
        -(moment.tz.zone(timezone).offset(timestamp) / 60)
      @timezone guessedMomentTimezone
    else
      @timezone defaultTimezoneLookup((new Date()).getTimezoneOffset())

  timezone: (timezone) ->
    if arguments.length > 0
      if @isTimezoneSupported(timezone)
        if @_.preferences['timezone'] isnt timezone
          @_.preferences['timezone'] = timezone
          @emit('timezonechange', timezone)
      else
        hx.consoleWarning('preferences.timezone:',
          timezone + ' is not a valid timezone')
      this
    else
      @_.preferences['timezone']

  locale: (locale) ->
    if arguments.length > 0
      # check that the locale being set is supported
      if @isLocaleSupported(locale)
        localeObject = lookupLocale(locale)
        if @_.preferences['locale'] isnt localeObject.value
          @_.preferences['locale'] = localeObject.value

          # moment doesn't look up the 'default' locale so we set it here
          # Moment issue: https://github.com/moment/moment/issues/2621
          moment?.locale(localeObject.value)
          @emit('localechange', localeObject.value)
      else
        hx.consoleWarning('preferences.locale',
          locale + ' is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon')
      this
    else
      @_.preferences['locale']

  option = (name) ->
    (value) ->
      if arguments.length > 0
        @_[name] = value
        this
      else
        @_[name]

  # sets the locales this app supports
  supportedLocales: option 'supportedLocales'
  supportedTimezones: option 'supportedTimezones'
  timezoneOffsetLookup: option 'timezoneOffsetLookup'

  isTimezoneSupported: (timezone) ->
    hx.isString(timezone) and @_.supportedTimezones.indexOf(timezone) isnt -1

  isLocaleSupported: (locale) ->
    hx.isString(locale) and lookupLocale(locale)

  applyTimezoneOffset: (date, timezoneOrOffset) ->
    offset =  if isNaN(timezoneOrOffset)
      @_.timezoneOffsetLookup(timezoneOrOffset || @timezone(), date.getTime()) || 0
    else
      offset || @_.timezoneOffsetLookup(@timezone(), date.getTime()) || 0
    utc = date.getTime() + (date.getTimezoneOffset() * 60000)
    new Date(utc + offset * 60 * 60 * 1000)

  # sets the backingStore to use - currently the only one available is hx.preferences.localStorage
  # getting the backingStore should not be possible
  backingStore: (backingStore) ->
    if backingStore?
      @_.backingStore = backingStore
    this

  # saves the preferences
  save: (cb) ->
    try
      @_.backingStore.save(JSON.stringify(@_.preferences), (err) -> cb?(err))
    catch e
      cb?(e)

  # loads the preferences
  load: (cb) ->
    try
      @_.backingStore.load (err, prefs) =>
        if prefs?
          @_.preferences = JSON.parse(prefs)
        cb?(err)
    catch e
      cb?(e)

  # shows the standard preferences modal
  show: ->
    @_.modal.show()
    this

hx.preferences = new Preferences
hx.preferences.localStorageStore = LocalStoragePreferencesStore

hx._.preferences = {
  defaultTimezoneLookup: defaultTimezoneLookup
}
