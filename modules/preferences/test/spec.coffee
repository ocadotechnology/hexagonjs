describe 'hx-preferences', ->
  it 'should have user facing text defined', ->
    hx.userFacingText('preferences', 'locale').should.equal('Locale')
    hx.userFacingText('preferences', 'preferences').should.equal('Preferences')
    hx.userFacingText('preferences', 'preferencesSaved').should.equal('Preferences Saved')
    hx.userFacingText('preferences', 'save').should.equal('Save')
    hx.userFacingText('preferences', 'timezone').should.equal('Timezone')

  describe 'api', ->
    it 'supportedLocales: setter/getter', ->
      list = ["uz", "vi", "cy"]
      hx.preferences.supportedLocales(list).should.equal(hx.preferences)
      hx.preferences.supportedLocales().should.equal(list)

    describe 'locale', ->
      it 'should not be possible to explicitly clear the locale', ->
        # sanity check
        should.exist(hx.preferences.locale())
        hx.preferences.locale undefined
        should.exist(hx.preferences.locale())

      it 'setter/getter', ->
        hx.preferences.locale('vi').should.equal(hx.preferences)
        hx.preferences.locale().should.equal('vi')

      it 'setter/getter with alternative casing', ->
        hx.preferences.locale('en-GB').should.equal(hx.preferences)
        hx.preferences.locale().should.equal('en-GB')

      it 'setter/getter should correct the casing', ->
        hx.preferences.locale('en-gb').should.equal(hx.preferences)
        hx.preferences.locale().should.equal('en-GB')

      it 'dont emit when setting to the same value', ->
        hx.preferences.locale('en-GB')
        called = false
        hx.preferences.on 'localechange', -> called = true
        hx.preferences.locale('en-GB')
        called.should.equal(false)

      it 'emit when setting to new value', ->
        hx.preferences.locale('en-GB')
        called = false
        hx.preferences.on 'localechange', -> called = true
        hx.preferences.locale('en-us')
        called.should.equal(true)

      it 'setter/getter for non supported value', ->
        spy = chai.spy.on(hx, 'consoleWarning')
        hx.preferences.locale('vi').should.equal(hx.preferences)
        hx.preferences.locale('lemon').should.equal(hx.preferences)
        hx.preferences.locale().should.equal('vi')
        spy.should.have.been.called()

    describe 'timezone', ->
      it 'setter/getter', ->
        hx.preferences.timezone('UTC+01:00').should.equal(hx.preferences)
        hx.preferences.timezone().should.equal('UTC+01:00')

      it 'dont emit when setting to the same value', ->
        hx.preferences.timezone('UTC+00:00')
        called = false
        hx.preferences.on 'timezonechange', -> called = true
        hx.preferences.timezone('UTC+00:00')
        called.should.equal(false)

      it 'emit when setting to new value', ->
        hx.preferences.timezone('UTC+00:00')
        called = false
        hx.preferences.on 'timezonechange', -> called = true
        hx.preferences.timezone('UTC+01:00')
        called.should.equal(true)

      it 'should not allow the use of unsupported timezones', ->
        spy = chai.spy.on(hx, 'consoleWarning')
        hx.preferences.timezone('America').should.equal(hx.preferences)
        spy.should.have.been.called()
