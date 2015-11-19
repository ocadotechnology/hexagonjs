describe 'hx-preferences', ->
  describe 'api', ->
    it 'supportedLocales: setter/getter', ->
      list = ["uz", "vi", "cy"]
      expect(hx.preferences.supportedLocales(list)).toEqual(hx.preferences)
      expect(hx.preferences.supportedLocales()).toEqual(list)

    it 'locale: setter/getter', ->
      expect(hx.preferences.locale('vi')).toEqual(hx.preferences)
      expect(hx.preferences.locale()).toEqual('vi')

    it 'locale: setter/getter with alternative casing', ->
      expect(hx.preferences.locale('en-GB')).toEqual(hx.preferences)
      expect(hx.preferences.locale()).toEqual('en-GB')

    it 'locale: setter/getter should correct the casing', ->
      expect(hx.preferences.locale('en-gb')).toEqual(hx.preferences)
      expect(hx.preferences.locale()).toEqual('en-GB')

    it 'locale: dont emit when setting to the same value', ->
      hx.preferences.locale('en-GB')
      called = false
      hx.preferences.on 'localechange', -> called = true
      hx.preferences.locale('en-GB')
      expect(called).toEqual(false)

    it 'locale: dont emit when setting to the same value', ->
      hx.preferences.locale('en-GB')
      called = false
      hx.preferences.on 'localechange', -> called = true
      hx.preferences.locale('en-us')
      expect(called).toEqual(true)

    it 'locale: setting undefined should clear the locale', ->
      expect(hx.preferences.locale('vi').locale(undefined)).toEqual(hx.preferences)
      expect(hx.preferences.locale()).toEqual(undefined)

    it 'locale: setter/getter for non supported value', ->
      spyOn(hx, 'consoleWarning')
      expect(hx.preferences.locale('vi')).toEqual(hx.preferences)
      expect(hx.preferences.locale('lemon')).toEqual(hx.preferences)
      expect(hx.preferences.locale()).toEqual('vi')
      expect(hx.consoleWarning).toHaveBeenCalled()

    it 'timezone: setter/getter', ->
      expect(hx.preferences.timezone('America/Los_Angeles')).toEqual(hx.preferences)
      expect(hx.preferences.timezone()).toEqual('America/Los_Angeles')

    it 'timezone: dont emit when setting to the same value', ->
      hx.preferences.timezone('America/Los_Angeles')
      called = false
      hx.preferences.on 'timezonechange', -> called = true
      hx.preferences.timezone('America/Los_Angeles')
      expect(called).toEqual(false)

    it 'timezone: dont emit when setting to the same value', ->
      hx.preferences.timezone('America/Los_Angeles')
      called = false
      hx.preferences.on 'timezonechange', -> called = true
      hx.preferences.timezone('America/New_York')
      expect(called).toEqual(true)