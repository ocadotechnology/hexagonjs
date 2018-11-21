describe 'User Facing Text', ->
  origText = hx.clone hx._.userFacingText.localisedText
  origInitialText = hx.clone hx._.userFacingText.initialValues
  origConsoleWarning = hx.consoleWarning

  objectWithLength = {length: 1}

  beforeEach ->
    hx.consoleWarning = chai.spy()
    hx.consoleWarning.reset = () ->
      # XXX spy.reset was removed in a chai update
      this.__spy = {
        calls: []
        called: false
        name: name
      };
      return this
    hx._.userFacingText.localisedText = {}
    hx._.userFacingText.initialValues = {}

  after ->
    hx._.userFacingText.localisedText = origText
    hx._.userFacingText.initialValues = origInitialText
    hx.consoleWarning = origConsoleWarning

  it 'should register text using a string path', ->
    should.not.exist(hx.userFacingText('module', 'key', 'text'))
    hx.userFacingText().module.key.should.equal('text')
    hx.consoleWarning.should.not.have.been.called()

  it 'should return the correct value', ->
    should.not.exist(hx.userFacingText('module', 'key', 'text'))
    hx.userFacingText().module.key.should.equal('text')
    hx.userFacingText('module', 'key').should.equal('text')
    hx.consoleWarning.should.not.have.been.called()

  it 'should return the complete set of values when called with no arguments', ->
    hx.userFacingText().should.eql({})
    should.not.exist(hx.userFacingText('module', 'key', 'text'))
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
    should.not.exist(hx.userFacingText(textObj))
    hx.consoleWarning.should.not.have.been.called()
    hx.userFacingText().should.not.equal(textObj)
    hx.userFacingText().should.eql(textObj)

  it 'defaults: should return the first values that were set for a key/module', ->
    should.not.exist(hx.userFacingText('module', 'key', 'text1'))
    should.not.exist(hx.userFacingText('module', 'key', 'text2'))
    hx.userFacingText.defaults().should.eql({
      module:
        key: 'text1'
    })
    hx.consoleWarning.should.not.have.been.called()

  # "Bad" Path
  describe 'Errors', ->
    it 'when called with a module / key that does not exist', ->
      hx.userFacingText('module')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', 'key')
      hx.consoleWarning.should.have.been.called.once
      hx.userFacingText().should.eql({})


    it 'when called with an invalid module when getting', ->
      hx.userFacingText(undefined)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText(undefined, 'key')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText(3.1415, 'key')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText(objectWithLength, 'key')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText().should.eql({})


    it 'when called with an invalid module when setting', ->
      hx.userFacingText(undefined, 'key', 'value')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()
      hx.userFacingText().should.eql({})

      hx.userFacingText(3.1415, 'key', 'value')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText(objectWithLength, 'key', 'value')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText().should.eql({})


    it 'when called with an invalid key when getting', ->
      hx.userFacingText('module', undefined)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', 3.1415)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', objectWithLength)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText().should.eql({})


    it 'when called with an invalid key when setting', ->
      hx.userFacingText('module', undefined, 'value')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', 3.1415, 'value')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', objectWithLength, 'value')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText().should.eql({})


    it 'when called with an invalid value', ->
      hx.userFacingText('module', 'key', undefined)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', 'key', 3.1415)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText('module', 'key', objectWithLength)
      hx.consoleWarning.should.have.been.called.once
      hx.userFacingText().should.eql({})


    it 'when calling the global setter with an object with invalid values', ->
      hx.userFacingText({
        'module1':
          'key1': 'value1'
        'module2':
          'key2': undefined
        'module3':
          'key3': 3.1415
        'module4':
          'key4': objectWithLength
      })
      hx.consoleWarning.should.have.been.called.exactly(3)
      hx.userFacingText().should.eql({
        'module1':
          'key1': 'value1'
      })

    it 'when calling the global setter with a non-plain object', ->
      class Test
        constructor: ->
          @length = 1
          @module1 =
            key1: 'value'

      testObj = new Test
      hx.userFacingText(testObj)
      hx.consoleWarning.should.have.been.called.once
      hx.userFacingText().should.eql({})

    it 'when calling the global setter with an invalid value', ->
      hx.userFacingText('module')
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText(undefined)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()

      hx.userFacingText(3.1415)
      hx.consoleWarning.should.have.been.called.once
      hx.consoleWarning.reset()
