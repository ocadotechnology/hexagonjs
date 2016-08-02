chai = require('chai')
should = chai.should()

utils = require('modules/util/main/utils')
userFacingText = require('modules/user-facing-text/main')
state = require('modules/user-facing-text/main/state')

describe 'User Facing Text', ->
  origText = utils.clone(state.localisedText)
  origInitialText = utils.clone(state.initialValues)
  origConsoleWarning = utils.consoleWarning

  objectWithLength = {length: 1}

  beforeEach ->
    utils.consoleWarning = chai.spy()
    state.localisedText = {}
    state.initialValues = {}

  after ->
    state.localisedText = origText
    state.initialValues = origInitialText
    utils.consoleWarning = origConsoleWarning

  it 'should register text using a string path', ->
    # console.log userFacingText('module', 'key', 'text')
    should.not.exist(userFacingText('module', 'key', 'text'))
    userFacingText().module.key.should.equal('text')
    utils.consoleWarning.should.not.have.been.called()

  it 'should return the correct value', ->
    should.not.exist(userFacingText('module', 'key', 'text'))
    userFacingText().module.key.should.equal('text')
    userFacingText('module', 'key').should.equal('text')
    utils.consoleWarning.should.not.have.been.called()

  it 'should return the complete set of values when called with no arguments', ->
    userFacingText().should.eql({})
    should.not.exist(userFacingText('module', 'key', 'text'))
    userFacingText().should.eql({
      module:
        key: 'text'
    })
    utils.consoleWarning.should.not.have.been.called()

  it 'should set multiple keys at once when calling with one argument', ->
    textObj = {
      module1: {
        key1: 'text1',
        key2: 'text2'
      },
      module2: {
        key3: 'text3'
      }
    }
    should.not.exist(userFacingText(textObj))
    utils.consoleWarning.should.not.have.been.called()
    userFacingText().should.not.equal(textObj)
    userFacingText().should.eql(textObj)

  it 'defaults: should return the first values that were set for a key/module', ->
    should.not.exist(userFacingText('module', 'key', 'text1'))
    should.not.exist(userFacingText('module', 'key', 'text2'))
    userFacingText.defaults().should.eql({
      module: {
        key: 'text1'
      }
    })
    utils.consoleWarning.should.not.have.been.called()

  # "Bad" Path
  describe 'Errors', ->
    it 'when called with a module / key that does not exist', ->
      userFacingText('module')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', 'key')
      utils.consoleWarning.should.have.been.called.once()
      userFacingText().should.eql({})


    it 'when called with an invalid module when getting', ->
      userFacingText(undefined)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText(undefined, 'key')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText(3.1415, 'key')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText(objectWithLength, 'key')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText().should.eql({})


    it 'when called with an invalid module when setting', ->
      userFacingText(undefined, 'key', 'value')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()
      userFacingText().should.eql({})

      userFacingText(3.1415, 'key', 'value')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText(objectWithLength, 'key', 'value')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText().should.eql({})


    it 'when called with an invalid key when getting', ->
      userFacingText('module', undefined)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', 3.1415)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', objectWithLength)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText().should.eql({})


    it 'when called with an invalid key when setting', ->
      userFacingText('module', undefined, 'value')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', 3.1415, 'value')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', objectWithLength, 'value')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText().should.eql({})


    it 'when called with an invalid value', ->
      userFacingText('module', 'key', undefined)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', 'key', 3.1415)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText('module', 'key', objectWithLength)
      utils.consoleWarning.should.have.been.called.once()
      userFacingText().should.eql({})


    it 'when calling the global setter with an object with invalid values', ->
      userFacingText({
        'module1': {
          'key1': 'value1'
        },
        'module2': {
          'key2': undefined
        },
        'module3': {
          'key3': 3.1415
        },
        'module4': {
          'key4': objectWithLength
        }
      })
      utils.consoleWarning.should.have.been.called.exactly(3)
      userFacingText().should.eql({
        'module1': {
          'key1': 'value1'
        }
      })

    it 'when calling the global setter with a non-plain object', ->
      class Test
        constructor: ->
          @length = 1
          @module1 = {
            key1: 'value'
          }

      testObj = new Test
      userFacingText(testObj)
      utils.consoleWarning.should.have.been.called.once()
      userFacingText().should.eql({})

    it 'when calling the global setter with an invalid value', ->
      userFacingText('module')
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText(undefined)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()

      userFacingText(3.1415)
      utils.consoleWarning.should.have.been.called.once()
      utils.consoleWarning.reset()
