describe 'User Facing Text', ->
  origText = hx.clone hx.userFacingText._.localisedText
  origInitialText = hx.clone hx.userFacingText._.initialValues
  origConsoleWarning = hx.consoleWarning

  beforeEach ->
    hx.consoleWarning = chai.spy()
    hx.userFacingText._.localisedText = {}
    hx.userFacingText._.initialValues = {}

  after ->
    hx.userFacingText._.localisedText = origText
    hx.userFacingText._.initialValues = origInitialText
    hx.consoleWarning = origConsoleWarning

  it 'should register text using a string path', ->
    hx.userFacingText('module', 'key', 'text')
    hx.userFacingText().module.key.should.equal('text')
    hx.consoleWarning.should.not.have.been.called()

  it 'should return the correct value', ->
    hx.userFacingText('module', 'key', 'text')
    hx.userFacingText().module.key.should.equal('text')
    hx.userFacingText('module', 'key').should.equal('text')
    hx.consoleWarning.should.not.have.been.called()

  it 'should return the complete set of values when called with no arguments', ->
    hx.userFacingText().should.eql({})
    hx.userFacingText('module', 'key', 'text')
    hx.userFacingText().should.eql({
      module:
        key: 'text'
    })
    hx.consoleWarning.should.not.have.been.called()

  it 'should set multiple keys at once when calling with one argument', ->
    textObj = {
      module1:
        key1: 'text1'
        key2: 'text2'
      module2:
        key3: 'text3'
    }
    hx.userFacingText(textObj)
    hx.consoleWarning.should.not.have.been.called()
    hx.userFacingText().should.not.equal(textObj)
    hx.userFacingText().should.eql(textObj)

  it 'defaults: should return the first values that were set for a key/module', ->
    hx.userFacingText('module', 'key', 'text1')
    hx.userFacingText('module', 'key', 'text2')
    hx.userFacingText.defaults().should.eql({
      module:
        key: 'text1'
    })
    hx.consoleWarning.should.not.have.been.called()

  # "Bad" Path
  it 'should throw an error when called with an invalid value', ->
    hx.userFacingText('module', 'key', {})
    hx.consoleWarning.should.have.been.called.once()
    hx.consoleWarning.reset()
    hx.userFacingText('module', 'key', 3.1415)
    hx.consoleWarning.should.have.been.called.once()
    hx.userFacingText().should.eql({})

  it 'should throw an error when called with a module / key that does not exist', ->
    hx.userFacingText('module')
    hx.consoleWarning.should.have.been.called.once()
    hx.consoleWarning.reset()
    hx.userFacingText('module', 'key')
    hx.consoleWarning.should.have.been.called.once()

  it 'should throw an error when called with an invalid module or key', ->
    hx.userFacingText('module')
    hx.consoleWarning.should.have.been.called.once()
    hx.consoleWarning.reset()
    hx.userFacingText(3.1415, 'key')
    hx.consoleWarning.should.have.been.called.once()
    hx.consoleWarning.reset()
    hx.userFacingText('module', undefined)
    hx.consoleWarning.should.have.been.called.once()
    hx.consoleWarning.reset()
