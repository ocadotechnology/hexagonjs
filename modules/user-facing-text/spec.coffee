import chai from 'chai'

import logger from 'logger'
import { clone } from 'utils'
import { userFacingText, userFacingTextDefaults, state } from 'user-facing-text'

should = chai.should()

export default () ->
  describe 'user-facing-text', ->
    origText = clone(state.localisedText)
    origInitialText = clone(state.initialValues)
    origConsoleWarning = logger.warn

    objectWithLength = {length: 1}

    beforeEach ->
      logger.warn = chai.spy()
      state.localisedText = {}
      state.initialValues = {}

    after ->
      state.localisedText = origText
      state.initialValues = origInitialText
      logger.warn = origConsoleWarning

    it 'should register text using a string path', ->
      should.not.exist(userFacingText('module', 'key', 'text'))
      userFacingText().module.key.should.equal('text')
      logger.warn.should.not.have.been.called()

    it 'should return the correct value', ->
      should.not.exist(userFacingText('module', 'key', 'text'))
      userFacingText().module.key.should.equal('text')
      userFacingText('module', 'key').should.equal('text')
      logger.warn.should.not.have.been.called()

    it 'should return the complete set of values when called with no arguments', ->
      userFacingText().should.eql({})
      should.not.exist(userFacingText('module', 'key', 'text'))
      userFacingText().should.eql({
        module:
          key: 'text'
      })
      logger.warn.should.not.have.been.called()

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
      logger.warn.should.not.have.been.called()
      userFacingText().should.not.equal(textObj)
      userFacingText().should.eql(textObj)

    it 'defaults: should return the first values that were set for a key/module', ->
      should.not.exist(userFacingText('module', 'key', 'text1'))
      should.not.exist(userFacingText('module', 'key', 'text2'))
      userFacingTextDefaults().should.eql({
        module: {
          key: 'text1'
        }
      })
      logger.warn.should.not.have.been.called()

    # "Bad" Path
    describe 'Errors', ->
      it 'when called with a module / key that does not exist', ->
        userFacingText('module')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', 'key')
        logger.warn.should.have.been.called.once
        userFacingText().should.eql({})


      it 'when called with an invalid module when getting', ->
        userFacingText(undefined)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText(undefined, 'key')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText(3.1415, 'key')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText(objectWithLength, 'key')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText().should.eql({})


      it 'when called with an invalid module when setting', ->
        userFacingText(undefined, 'key', 'value')
        logger.warn.should.have.been.called.once
        logger.warn.reset()
        userFacingText().should.eql({})

        userFacingText(3.1415, 'key', 'value')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText(objectWithLength, 'key', 'value')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText().should.eql({})


      it 'when called with an invalid key when getting', ->
        userFacingText('module', undefined)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', 3.1415)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', objectWithLength)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText().should.eql({})


      it 'when called with an invalid key when setting', ->
        userFacingText('module', undefined, 'value')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', 3.1415, 'value')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', objectWithLength, 'value')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText().should.eql({})


      it 'when called with an invalid value', ->
        userFacingText('module', 'key', undefined)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', 'key', 3.1415)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText('module', 'key', objectWithLength)
        logger.warn.should.have.been.called.once
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
        logger.warn.should.have.been.called.exactly(3)
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
        logger.warn.should.have.been.called.once
        userFacingText().should.eql({})

      it 'when calling the global setter with an invalid value', ->
        userFacingText('module')
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText(undefined)
        logger.warn.should.have.been.called.once
        logger.warn.reset()

        userFacingText(3.1415)
        logger.warn.should.have.been.called.once
        logger.warn.reset()
