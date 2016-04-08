describe 'User Facing Text', ->
  initialText = hx.merge hx.userFacingText._.localisedText
  trivialLocale = {'en': 'Thing'}
  trivialLocaleWithFrench = {'en': 'English Thing', 'fr': 'French Thing'}

  beforeEach ->
    hx.userFacingText._.localisedText = {}

  after ->
    hx.userFacingText._.localisedText = initialText

  it 'should register text using a string path', ->
    hx.userFacingText('thing', trivialLocale)

    # Must not be the same object but must have the same values
    hx.userFacingText._.localisedText.thing.should.not.equal(trivialLocale)
    hx.userFacingText._.localisedText.thing.should.eql(trivialLocale)

  it 'should register text using an array path', ->
    hx.userFacingText(['thing1', 'thing2', 'thing3'], trivialLocale)
    should.exist(hx.userFacingText._.localisedText.thing1)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2.thing3)

    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.not.equal(trivialLocale)
    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.eql(trivialLocale)

  it 'should merge text for existing locales using a string path', ->
    hx.userFacingText('thing', trivialLocale)

    hx.userFacingText._.localisedText.thing.should.not.equal(trivialLocale)
    hx.userFacingText._.localisedText.thing.should.eql(trivialLocale)

    hx.userFacingText('thing', trivialLocaleWithFrench)

    hx.userFacingText._.localisedText.thing.should.not.equal(trivialLocaleWithFrench)
    hx.userFacingText._.localisedText.thing.should.eql(trivialLocaleWithFrench)

  it 'should merge text for existing locales using an array path', ->
    hx.userFacingText(['thing1', 'thing2', 'thing3'], trivialLocale)

    should.exist(hx.userFacingText._.localisedText.thing1)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2.thing3)

    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.not.equal(trivialLocale)
    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.eql(trivialLocale)

    hx.userFacingText(['thing1', 'thing2', 'thing3'], trivialLocaleWithFrench)

    should.exist(hx.userFacingText._.localisedText.thing1)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2)
    should.exist(hx.userFacingText._.localisedText.thing1.thing2.thing3)

    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.not.equal(trivialLocaleWithFrench)
    hx.userFacingText._.localisedText.thing1.thing2.thing3.should.eql(trivialLocaleWithFrench)

  it 'should return an object with all defined locale texts', ->
    hx.userFacingText('thing1', trivialLocale)
    hx.userFacingText('thing2', trivialLocaleWithFrench)
    hx.userFacingText().should.eql({'thing1': trivialLocale, 'thing2': trivialLocaleWithFrench})

  it 'should return the text for the correct locale', ->
    hx.userFacingText('thing1', trivialLocaleWithFrench)

    hx.preferences.supportedLocales([
      {value: 'en', full: 'English'},
      {value: 'fr', full: 'French'}
    ])

    hx.preferences.locale('en')
    hx.userFacingText('thing1').should.equal('English Thing')

    hx.preferences.locale('fr')
    hx.userFacingText('thing1').should.equal('French Thing')

  it 'should fall back to english when text for a locale is not defined', ->
    hx.userFacingText('thing', trivialLocale)

    hx.preferences.supportedLocales([
      {value: 'en', full: 'English'},
      {value: 'fr', full: 'French'}
    ])

    hx.preferences.locale('en')
    hx.userFacingText('thing').should.equal('Thing')

    hx.preferences.locale('fr')
    hx.userFacingText('thing').should.equal('Thing')

