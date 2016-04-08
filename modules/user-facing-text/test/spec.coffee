describe 'User Facing Text', ->
  origText = hx.merge hx.userFacingText._.localisedText
  origConsoleWarning = hx.consoleWarning

  localeObj = {'en': 'Thing'}
  localeObjWithFrench = {'en': 'English Thing', 'fr': 'French Thing'}

  beforeEach ->
    hx.consoleWarning = chai.spy()
    hx.userFacingText._.localisedText = {}

  after ->
    hx.userFacingText._.localisedText = origText
    hx.consoleWarning = origConsoleWarning

  it 'should register text using a string path', ->
    hx.userFacingText('thing', localeObj)

    # Must not be the same object but must have the same values
    hx.userFacingText._.localisedText.thing.should.not.equal(localeObj)
    hx.userFacingText._.localisedText.thing.should.eql(localeObj)
    hx.consoleWarning.should.not.have.been.called()

  it 'should register text using an array path', ->
    hx.userFacingText(['thing1', 'thing2', 'thing3'], localeObj)
    should.exist(hx.userFacingText._.localisedText.thing1)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2.thing3)

    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.not.equal(localeObj)
    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.eql(localeObj)
    hx.consoleWarning.should.not.have.been.called()

  it 'should merge text for existing locales using a string path', ->
    hx.userFacingText('thing', localeObj)

    hx.userFacingText._.localisedText.thing.should.not.equal(localeObj)
    hx.userFacingText._.localisedText.thing.should.eql(localeObj)
    hx.consoleWarning.should.not.have.been.called()

    hx.userFacingText('thing', localeObjWithFrench)

    hx.userFacingText._.localisedText.thing.should.not.equal(localeObjWithFrench)
    hx.userFacingText._.localisedText.thing.should.eql(localeObjWithFrench)
    hx.consoleWarning.should.not.have.been.called()

  it 'should merge text for existing locales using an array path', ->
    hx.userFacingText(['thing1', 'thing2', 'thing3'], localeObj)

    should.exist(hx.userFacingText._.localisedText.thing1)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2.thing3)

    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.not.equal(localeObj)
    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.eql(localeObj)
    hx.consoleWarning.should.not.have.been.called()

    hx.userFacingText(['thing1', 'thing2', 'thing3'], localeObjWithFrench)

    should.exist(hx.userFacingText._.localisedText.thing1)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2.thing3)

    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.not.equal(localeObjWithFrench)
    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.eql(localeObjWithFrench)
    hx.consoleWarning.should.not.have.been.called()

  it 'should return an object with all defined locale texts ', ->
    hx.userFacingText('thing1', localeObj)
    hx.userFacingText('thing2', localeObjWithFrench)
    hx.userFacingText().should.eql({'thing1': localeObj, 'thing2': localeObjWithFrench})
    hx.consoleWarning.should.not.have.been.called()

  it 'should return the text for the correct locale using a string path', ->
    hx.userFacingText('thing1', localeObjWithFrench)

    hx.preferences.supportedLocales([
      {value: 'en', full: 'English'},
      {value: 'fr', full: 'French'}
    ])

    hx.preferences.locale('en')
    hx.userFacingText('thing1').should.equal('English Thing')
    hx.consoleWarning.should.not.have.been.called()

    hx.preferences.locale('fr')
    hx.userFacingText('thing1').should.equal('French Thing')
    hx.consoleWarning.should.not.have.been.called()

  it 'should fall back to english when text for a locale is not defined using a string path', ->
    hx.userFacingText('thing', localeObj)

    hx.preferences.supportedLocales([
      {value: 'en', full: 'English'},
      {value: 'fr', full: 'French'}
    ])

    hx.preferences.locale('en')
    hx.userFacingText('thing').should.equal('Thing')
    hx.consoleWarning.should.not.have.been.called()

    hx.preferences.locale('fr')
    hx.userFacingText('thing').should.equal('Thing')
    hx.consoleWarning.should.not.have.been.called()

  it 'should return the text for the correct locale using an array path', ->
    hx.userFacingText(['thing1', 'thing2'], localeObjWithFrench)

    hx.preferences.supportedLocales([
      {value: 'en', full: 'English'},
      {value: 'fr', full: 'French'}
    ])

    hx.preferences.locale('en')
    hx.userFacingText(['thing1', 'thing2']).should.equal('English Thing')
    hx.consoleWarning.should.not.have.been.called()

    hx.preferences.locale('fr')
    hx.userFacingText(['thing1', 'thing2']).should.equal('French Thing')
    hx.consoleWarning.should.not.have.been.called()

  it 'should fall back to english when text for a locale is not defined using an array path', ->
    hx.userFacingText(['thing1', 'thing2'], localeObj)

    hx.preferences.supportedLocales([
      {value: 'en', full: 'English'},
      {value: 'fr', full: 'French'}
    ])

    hx.preferences.locale('en')
    hx.userFacingText(['thing1', 'thing2']).should.equal('Thing')
    hx.consoleWarning.should.not.have.been.called()

    hx.preferences.locale('fr')
    hx.userFacingText(['thing1', 'thing2']).should.equal('Thing')
    hx.consoleWarning.should.not.have.been.called()

  it 'should show a console warning when a text object could not be found', ->
    should.not.exist(hx.userFacingText('bob'))
    hx.consoleWarning.should.have.been.called()

  it 'should show a console warning when a text object could not be found in an array', ->
    should.not.exist(hx.userFacingText(['bob', 'dave']))
    hx.consoleWarning.should.have.been.called()

  it 'should show a console warning when a text object could not be found in an array when part of the string path exists', ->
    hx.userFacingText('thing', localeObj)
    should.not.exist(hx.userFacingText(['thing', 'bob', 'dave']))
    hx.consoleWarning.should.have.been.called()

  it 'should emit an event when the text for a locale is changed', ->
    fn = chai.spy()
    hx.userFacingText.emitter.on 'change', fn
    hx.userFacingText('thing', localeObj)
    fn.should.have.been.called()
    hx.consoleWarning.should.not.have.been.called()