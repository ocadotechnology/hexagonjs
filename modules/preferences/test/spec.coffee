preferences = require('modules/preferences/main')
userFacingText = require('modules/user-facing-text/main')
utils = require('modules/util/main/utils')
chai = require('chai')
should = chai.should()

describe 'hx-preferences', ->
  it 'should have user facing text defined', ->
    userFacingText('preferences', 'locale').should.equal('Locale')
    userFacingText('preferences', 'preferences').should.equal('Preferences')
    userFacingText('preferences', 'preferencesSaved').should.equal('Preferences Saved')
    userFacingText('preferences', 'save').should.equal('Save')
    userFacingText('preferences', 'timezone').should.equal('Timezone')

  describe 'api', ->
    it 'supportedLocales: setter/getter', ->
      list = ["uz", "vi", "cy"]
      preferences.supportedLocales(list).should.equal(preferences)
      preferences.supportedLocales().should.equal(list)

    describe 'locale', ->
      it 'should not be possible to explicitly clear the locale', ->
        # sanity check
        should.exist(preferences.locale())
        preferences.locale undefined
        should.exist(preferences.locale())

      it 'setter/getter', ->
        preferences.locale('vi').should.equal(preferences)
        preferences.locale().should.equal('vi')

      it 'setter/getter with alternative casing', ->
        preferences.locale('en-GB').should.equal(preferences)
        preferences.locale().should.equal('en-GB')

      it 'setter/getter should correct the casing', ->
        preferences.locale('en-gb').should.equal(preferences)
        preferences.locale().should.equal('en-GB')

      it 'dont emit when setting to the same value', ->
        preferences.locale('en-GB')
        called = false
        preferences.on 'localechange', -> called = true
        preferences.locale('en-GB')
        called.should.equal(false)

      it 'emit when setting to new value', ->
        preferences.locale('en-GB')
        called = false
        preferences.on 'localechange', -> called = true
        preferences.locale('en-us')
        called.should.equal(true)

      it 'setter/getter for non supported value', ->
        spy = chai.spy.on(utils, 'consoleWarning')
        preferences.locale('vi').should.equal(preferences)
        preferences.locale('lemon').should.equal(preferences)
        preferences.locale().should.equal('vi')
        spy.should.have.been.called()

    describe 'timezone', ->
      afterEach ->
        preferences.timezone('UTC+00:00')

      it 'setter/getter', ->
        preferences.timezone('UTC+01:00').should.equal(preferences)
        preferences.timezone().should.equal('UTC+01:00')

      it 'dont emit when setting to the same value', ->
        preferences.timezone('UTC+00:00')
        called = false
        preferences.on 'timezonechange', -> called = true
        preferences.timezone('UTC+00:00')
        called.should.equal(false)

      it 'emit when setting to new value', ->
        preferences.timezone('UTC+00:00')
        called = false
        preferences.on 'timezonechange', -> called = true
        preferences.timezone('UTC+01:00')
        called.should.equal(true)

      it 'should not allow the use of unsupported timezones', ->
        spy = chai.spy.on(utils, 'consoleWarning')
        preferences.timezone('America').should.equal(preferences)
        spy.should.have.been.called()
