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


timezoneList = [
  {name: 'UTC−12:00', offset: -12}
  {name: 'UTC−11:00', offset: -11}
  {name: 'UTC−10:00', offset: -10}
  {name: 'UTC−09:30', offset: -9.5}
  {name: 'UTC−09:00', offset: -9}
  {name: 'UTC−08:00', offset: -8}
  {name: 'UTC−07:00', offset: -7}
  {name: 'UTC−06:00', offset: -6}
  {name: 'UTC−05:00', offset: -5}
  {name: 'UTC−04:30', offset: -4.5}
  {name: 'UTC−04:00', offset: -4}
  {name: 'UTC−03:30', offset: -3.5}
  {name: 'UTC−03:00', offset: -3}
  {name: 'UTC−02:00', offset: -2}
  {name: 'UTC−01:00', offset: -1}
  {name: 'UTC', offset: 0}
  {name: 'UTC+01:00', offset: 1}
  {name: 'UTC+02:00', offset: 2}
  {name: 'UTC+03:00', offset: 3}
  {name: 'UTC+03:30', offset: 3.5}
  {name: 'UTC+04:00', offset: 4}
  {name: 'UTC+04:30', offset: 4.5}
  {name: 'UTC+05:00', offset: 5}
  {name: 'UTC+05:30', offset: 5.5}
  {name: 'UTC+05:45', offset: 5.75}
  {name: 'UTC+06:00', offset: 6}
  {name: 'UTC+06:30', offset: 6.5}
  {name: 'UTC+07:00', offset: 7}
  {name: 'UTC+08:00', offset: 8}
  {name: 'UTC+08:30', offset: 8.5}
  {name: 'UTC+08:45', offset: 8.75}
  {name: 'UTC+09:00', offset: 9}
  {name: 'UTC+09:30', offset: 9.5}
  {name: 'UTC+10:00', offset: 10}
  {name: 'UTC+10:30', offset: 10.5}
  {name: 'UTC+11:00', offset: 11}
  {name: 'UTC+12:00', offset: 12}
  {name: 'UTC+12:45', offset: 12.75}
  {name: 'UTC+13:00', offset: 13}
  {name: 'UTC+14:00', offset: 14}
]

lookupTimezone = (timezone) ->
  if timezone?
    if not timezone.name
      timezoneList.filter((v) -> v.name is timezone or v.offset is timezone)[0]
    else
      timezone

lookupLocale = (locale) ->
  if locale?
    if not locale.full
      localeList.filter((l) -> l.value.toLowerCase() is locale.toLowerCase())[0]
    else
      locale


LocalStoragePreferencesStore = {
  save: (prefs, cb) -> localStorage.setItem('hx_preferences', prefs); cb()
  load: (cb) -> cb(undefined, localStorage.getItem('hx_preferences'))
}

class Preferences extends hx.EventEmitter
  constructor: ->
    super

    if moment?.tz?.names().length
      timezoneList = moment.tz.names().map (tz) ->
        {
          name: tz
          offset: - moment.tz.zone(tz).offset(Date.now()) / 60
        }

    setupModal = (element) =>
      locale = @locale()
      timezone = @timezone()

      localeAutocompleteElement = hx.detached('input')
      localeAutocompleteElement.value(lookupLocale(locale)?.full)

      supportedLocales = if @_.supportedLocales?
        localeList.map (l) =>
          {
            value: l.value,
            full: l.full,
            disabled: not (l.value in @_.supportedLocales)
          }
      else localeList

      new hx.AutoComplete(localeAutocompleteElement.node(), supportedLocales, {
        renderer: (element, datum) -> hx.select(element).text(datum.full)
        inputMap: (item) -> item.full
        showOtherResults: true
        mustMatch: true
      }).on 'change', (item) -> locale = item.value

      localeSection = hx.detached('div')
        .add(hx.detached('label').text('Locale'))
        .add(localeAutocompleteElement)

      timezoneAutocompleteElement = hx.detached('input')
      timezoneAutocompleteElement.value(timezone.name)

      supportedTimezones = if @_.supportedTimezones?
        localeList.map (l) =>
          {
            offset: l.offset,
            name: l.name,
            disabled: not (l.name in @_.supportedLocales)
          }
      else timezoneList

      # work out how to add support for tz.names
      new hx.AutoComplete(timezoneAutocompleteElement.node(), supportedTimezones, {
        renderer: (element, datum) -> hx.select(element).text(datum.name)
        inputMap: (item) -> item.name
        showOtherResults: true
        mustMatch: true
      }).on 'change', (value) -> timezone = value

      timezoneSection = hx.detached('div')
        .add(hx.detached('label').text('Time Zone'))
        .add(timezoneAutocompleteElement)

      saveButton = hx.detached('button').class('hx-btn hx-positive')
        .add(hx.detached('i').class('hx-icon hx-icon-check'))
        .add(hx.detached('span').text(' Save'))
        .on 'click', =>
          @locale(locale)
          @timezone(timezone)
          @save (err) ->
            if err
              hx.notify.negative(err)
            else
              hx.notify.positive("Preferences Saved")
              modal.hide()

      hx.select(element)
        .append('div').class('hx-form')
        .add(localeSection)
        .add(timezoneSection)
        .add(saveButton)

    modal = new hx.Modal('Preferences', setupModal)

    @_ = {
      backingStore: LocalStoragePreferencesStore
      preferences: {}
      modal: modal
    }

    @locale moment?.locale() or navigator.language or 'en'
    @timezone moment?.tz?.guess() or (new Date().getTimezonevalue?()) or 0

  timezone: (tz) ->
    if arguments.length > 0
      timezone = lookupTimezone(tz)
      if not timezone?
        hx.consoleWarning('preferences.timezone', tz + ' is not a valid timezone.')
      else if @_.preferences['timezone']?.name isnt timezone?.name
        @_.preferences['timezone'] = timezone
        @emit('timezonechange', timezone)
      this
    else
      @_.preferences['timezone']

  locale: (locale) ->
    if arguments.length > 0
      # check that the local being set is supported
      if hx.isString(locale) and (localeObject = lookupLocale(locale))
        if @_.preferences['locale'] isnt localeObject.value
          @_.preferences['locale'] = localeObject.value
          @emit('localechange', localeObject.value)
      else
        hx.consoleWarning('preferences.locale',
          locale + ' is not a valid locale. If you think the locale should be added to the list contact the maintainers of hexagon')
      this
    else
      @_.preferences['locale']

  # sets the locales this app supports
  supportedLocales: (locales) ->
    if arguments.length > 0
      @_.supportedLocales = locales
      this
    else
      @_.supportedLocales || localeList.map((v) -> v.value)

  supportedTimezones: (timezones) ->
    if arguments.length > 0
      @_.supportedTimezones = timezones
      this
    else
      @_.supportedTimezones || timezoneList.map((v) -> v.name)

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

