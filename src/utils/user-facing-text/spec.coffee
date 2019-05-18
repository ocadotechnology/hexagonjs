import chai from 'chai'

import logger from 'utils/logger'
import { clone } from 'utils/utils'
import { Selection } from 'utils/selection'
import { userFacingText, format, toMultilineSelection, userFacingTextDefaults, state } from 'utils/user-facing-text'

export default () ->
  should = chai.should()

  describe 'user-facing-text', ->
    origText = clone(state.localisedText)
    origInitialText = clone(state.initialValues)
    origConsoleWarning = logger.warn

    beforeEach ->
      logger.warn = chai.spy()
      state.localisedText = {}
      state.initialValues = {}

    after ->
      state.localisedText = origText
      state.initialValues = origInitialText
      logger.warn = origConsoleWarning

    describe 'userFacingText', ->
      # Get
      #
      # userFacingText() => { [module: string]: { [key: string]: value }}
      # userFacingText(module: string, key: string) => string
      # userFacingText(module: string, key: string, parseLater = false: boolean) => string // Warning when parseLater = false and parameter in string
      # userFacingText(module: string, key: string, parameters: { [key: string]: string }) => string // No warning

      describe 'when getting values', ->
        mockText = undefined
        beforeEach ->
          mockText = {
            moduleWithPlainStrings: {
              key1: 'value1',
              key2: 'value2',
            },
            moduleWithParams: {
              keyParam1: 'value $param1',
              keyParam2: 'value $100',
            },
          }
          userFacingText(mockText)

        describe 'from the whole object', ->
          textObject = undefined
          beforeEach ->
            textObject = userFacingText()

          it 'returns the complete object', ->
            textObject.should.eql(mockText)

          it 'returns a clone of the complete object', ->
            textObject.should.not.equal(mockText)

        describe 'using a missing module', ->
          value = undefined
          beforeEach ->
            value = userFacingText('bob', 'key1')

          it 'does not return anything', ->
            should.not.exist(value)

          it 'shows a console warning', ->
            logger.warn.should.have.been.called.with('userFacingText: No text was found for key: key1 in module: bob')

        describe 'using a missing key', ->
          value = undefined
          beforeEach ->
            value = userFacingText('moduleWithPlainStrings', 'bob')

          it 'does not return anything', ->
            should.not.exist(value)

          it 'shows a console warning', ->
            logger.warn.should.have.been.called.with('userFacingText: No text was found for key: bob in module: moduleWithPlainStrings')

        describe 'with an invalid module', ->
          value = undefined
          beforeEach ->
            value = userFacingText(123, 'bob')

          it 'does not return anything', ->
            should.not.exist(value)

          it 'shows a console warning', ->
            logger.warn "userFacingText: A module and key are expected as strings but was passed module: 123 and key: bob"

        describe 'with an invalid key', ->
          value = undefined
          beforeEach ->
            value = userFacingText('moduleWithParams', 123)

          it 'does not return anything', ->
            should.not.exist(value)

          it 'shows a console warning', ->
            logger.warn "userFacingText: A module and key are expected as strings but was passed module: moduleWithParams and key: 123"

        describe 'with plaintext module key', ->
          describe 'key1', ->
            value = undefined
            beforeEach ->
              value = userFacingText('moduleWithPlainStrings', 'key1')

            it 'returns the correct value', ->
              value.should.equal('value1')

            it 'does not log any warnings', ->
              logger.warn.should.not.have.been.called()

          describe 'key2', ->
            value = undefined
            beforeEach ->
              value = userFacingText('moduleWithPlainStrings', 'key2')

            it 'returns the correct value', ->
              value.should.equal('value2')

            it 'does not log any warnings', ->
              logger.warn.should.not.have.been.called()


        describe 'without params', ->
          describe 'with params module key', ->
            describe 'keyParam1', ->
              value = undefined
              beforeEach ->
                value = userFacingText('moduleWithParams', 'keyParam1')

              it 'returns the correct value', ->
                value.should.equal('value $param1')

              it 'logs a console warning', ->
                logger.warn.should.have.been.called.with('userFacingText: Parameterised string was returned without parsing parameters: value $param1.\nCall userFacingText(module, key, parameters) to replace the parameters or userFacingText(module, key, true) if you are handling this externally.')

            describe 'without params and parseLater flag', ->
              value = undefined
              beforeEach ->
                value = userFacingText('moduleWithParams', 'keyParam1', true)

              it 'returns the correct value', ->
                value.should.equal('value $param1')

              it 'does not log any warnings', ->
                logger.warn.should.not.have.been.called()

            describe 'with params', ->
              value = undefined
              beforeEach ->
                value = userFacingText('moduleWithParams', 'keyParam1', { param1: 'abc' })

              it 'returns the correct value', ->
                value.should.equal('value abc')

              it 'does not log any warnings', ->
                logger.warn.should.not.have.been.called()


          describe 'keyParam2 - sanity check for $ currency values', ->
            describe 'without params', ->
              value = undefined
              beforeEach ->
                value = userFacingText('moduleWithParams', 'keyParam2')

              it 'returns the correct value', ->
                value.should.equal('value $100')

              it 'does not log any warnings', ->
                logger.warn.should.not.have.been.called()

            describe 'without params and parseLater flag', ->
              value = undefined
              beforeEach ->
                value = userFacingText('moduleWithParams', 'keyParam2', true)

              it 'returns the correct value', ->
                value.should.equal('value $100')

              it 'does not log any warnings', ->
                logger.warn.should.not.have.been.called()

            describe 'with params', ->
              value = undefined
              beforeEach ->
                value = userFacingText('moduleWithParams', 'keyParam2', { 100: 'abc' })

              it 'returns the correct value', ->
                value.should.equal('value $100')

              it 'does not log any warnings', ->
                logger.warn.should.not.have.been.called()

      # Set
      #
      # userFacingText(module: string, key: string, value: string | array)
      # userFacingText({
      #   module: {
      #     key: 'value',
      #     pluralKey: [
      #         [null, 0, 'Value Zero'],
      #         [1, 1, 'Value Singular'],
      #         [2, null, 'Value Plural']
      #     ]
      #   },
      # })
      describe 'when setting values', ->
        describe 'per module', ->
          value = undefined
          beforeEach ->
            userFacingText('something', 'value', 'the value')
            value = userFacingText('something', 'value')

          it 'sets the value correctly', ->
            value.should.equal('the value')

        describe 'per module with a plural key', ->
          value = undefined
          valueZero = undefined
          valuePluralA = undefined
          valuePluralB = undefined
          beforeEach ->
            userFacingText('something', 'value', [
              [null, 0, 'Value Zero'],
              [1, 1, 'Value Singular'],
              [2, null, 'Value Plural']
            ])
            value = userFacingText('something', 'value')
            valueZero = userFacingText('something', 'value', { n: 0 })
            valuePluralA = userFacingText('something', 'value', { n: 2 })
            valuePluralB = userFacingText('something', 'value', { n: 100 })

          it 'sets the singular value correctly', ->
            value.should.equal('Value Singular')

          it 'sets the zero value correctly', ->
            valueZero.should.equal('Value Zero')

          it 'sets the plural value correctly', ->
            valuePluralA.should.equal('Value Plural')

          it 'sets the plural value correctly for larger numbers', ->
            valuePluralB.should.equal('Value Plural')

        describe 'with object', ->
          value1 = undefined
          value2 = undefined

          beforeEach ->
            userFacingText({
              something: {
                key: 'the value'
              },
              somethingElse: {
                key: 'the other value'
              },
            })
            value1 = userFacingText('something', 'key')
            value2 = userFacingText('somethingElse', 'key')

          it 'sets the something key correctly', ->
            value1.should.equal('the value')

          it 'sets the somethingElse key correctly', ->
            value2.should.equal('the other value')

        describe 'with object and plural values', ->
          value = undefined
          valueZero = undefined
          valuePluralA = undefined
          valuePluralB = undefined
          beforeEach ->
            userFacingText({
              something: {
                value: [
                  [null, 0, 'Value Zero'],
                  [1, 1, 'Value Singular'],
                  [2, null, 'Value Plural $n $something']
                ]
              }
            })
            value = userFacingText('something', 'value')
            valueZero = userFacingText('something', 'value', { n: 0 })
            valuePluralA = userFacingText('something', 'value', { n: 2 })
            valuePluralB = userFacingText('something', 'value', { n: 100, something: 'Else' })

          it 'sets the singular value correctly', ->
            value.should.equal('Value Singular')

          it 'sets the zero value correctly', ->
            valueZero.should.equal('Value Zero')

          it 'sets the plural value correctly', ->
            valuePluralA.should.equal('Value Plural 2 $something')

          it 'sets the plural value correctly for larger numbers', ->
            valuePluralB.should.equal('Value Plural 100 Else')

        describe 'with object and invalid values', ->
          testObj = undefined
          testNumber = undefined

          beforeEach ->
            testObj = { a: '123' }
            userFacingText({
              something: {
                key: testNumber
              },
              somethingElse: {
                key: testObj
              },
            })

          it 'shows the correct warnings', ->
            logger.warn.should.have.been.called.with("userFacingText: The value provided must be a string but was passed value: #{testNumber}")

          it 'calls a warning for an object', ->
            logger.warn.should.have.been.called.with("userFacingText: The value provided must be a string but was passed value: #{testObj}")

          it 'does not update the userFacingText', ->
            userFacingText().should.eql({})

        describe 'with a non-plain object', ->
          testObj = undefined
          beforeEach ->
            class Test
              constructor: ->
                @length = 1
                @module1 =
                  key1: 'value'
            testObj = new Test

            userFacingText(testObj)

          it 'shows a console warning', ->
            logger.warn.should.have.been.called.with("userFacingText: Expected a plain object but was instead passed: #{testObj}")

          it 'does not update the userFacingText', ->
            userFacingText().should.eql({})

        describe 'with an invalid value', ->
          testNumber = undefined
          beforeEach ->
            testNumber = 123

            userFacingText('a', 'b', testNumber)

          it 'shows a console warning', ->
            logger.warn.should.have.been.called.with("userFacingText: The value provided must be a string but was passed value: #{testNumber}")

          it 'does not update the userFacingText', ->
            userFacingText().should.eql({})


    describe 'format', ->
      it 'replaces simple params', ->
        format('XX$abcXX', { abc: 123 }).should.equal('XX123XX')

      it 'replaces numeric params', ->
        format('XXX$100XXX', { 100: 'abc'}).should.equal('XXXabcXXX')

      it 'replaces numeric params when the key is a string value', ->
        format('XXX$100XXX', { '100': 'abc'}).should.equal('XXXabcXXX')

      it 'replaces multiple params', ->
        format('$a123$b123$c123', { a: 'A', b: 'B', c: 'C'}).should.equal('A123B123C123')

      it 'replaces longest params first', ->
        format('$abcd$abc$ab$a', { a: 'A', ab: 'BB', abc: 'CCC', abcd: '123' }).should.equal('123CCCBBA')

      it 'always replaces the same way', ->
        format('$abc$abc$abc', { a: 'A', b: 'BB', c: 'CCC', abc: '123' }).should.equal('123123123')

      describe 'custom replacer', ->
        arrayReplacer = (str, key, array) -> str.replace(new RegExp("\\\{#{key}\\\}", 'g'), array[key])

        it 'uses the custom replacer', ->
          format('Hello {0}!', ['Bob'], arrayReplacer).should.equal('Hello Bob!')

        it 'uses the custom replacer for multiple keys', ->
          format('{0} {1} {2}', ['a', 'b', 'c'], arrayReplacer).should.equal('a b c')


    describe 'userFacingTextDefaults', ->
      beforeEach ->
        mockTextFirst = {
          module: {
            key1: 'value1orig',
            key2: 'value2orig',
            key4: 'value4orig'
          }
        }

        mockTextSecond = {
          module: {
            key1: 'value1changed',
            key3: 'value3orig',
            key4: 'value4changed',
          }
          otherModule: {
            key: 'valueorig',
          }
        }
        userFacingText(mockTextFirst)
        userFacingText(mockTextSecond)

      it 'user facing text is set correctly', ->
        userFacingText().should.eql({
          module: {
            key1: 'value1changed',
            key2: 'value2orig',
            key3: 'value3orig',
            key4: 'value4changed',
          },
          otherModule: {
            key: 'valueorig'
          }
        })

      it 'returns the first set values', ->
        userFacingTextDefaults().should.eql({
          module: {
            key1: 'value1orig',
            key2: 'value2orig',
            key3: 'value3orig',
            key4: 'value4orig',
          },
          otherModule: {
            key: 'valueorig'
          }
        })

    describe 'toMultilineSelection', ->
      multilineSelection = undefined
      stringWithMultiline = 'a.\nb c d\ne'

      describe 'when using the default element', ->
        beforeEach ->
          multilineSelection = toMultilineSelection(stringWithMultiline)

        it 'returns a selection', ->
          multilineSelection.should.be.an.instanceof(Selection)

        it 'returns a Selection with 5 items', ->
          multilineSelection.size().should.equal(5)

        it 'the first element is a <span>', ->
          multilineSelection.node(0).tagName.should.equal('SPAN')

        it 'the first element text is "a."', ->
          multilineSelection.node(0).textContent.should.equal('a.')

        it 'the second element is a <br>', ->
          multilineSelection.node(1).tagName.should.equal('BR')

        it 'the third element is a <span>', ->
          multilineSelection.node(2).tagName.should.equal('SPAN')

        it 'the third element text is is "b c d"', ->
          multilineSelection.node(2).textContent.should.equal('b c d')

        it 'the fourth element is a <br>', ->
          multilineSelection.node(3).tagName.should.equal('BR')

        it 'the fifth element is a <span>', ->
          multilineSelection.node(4).tagName.should.equal('SPAN')

        it 'the fifth element text is is "e"', ->
          multilineSelection.node(4).textContent.should.equal('e')

      describe 'when using a custom element', ->
        beforeEach ->
          multilineSelection = toMultilineSelection(stringWithMultiline, 'div')

        it 'returns a selection', ->
          multilineSelection.should.be.an.instanceof(Selection)

        it 'returns a Selection with 5 items', ->
          multilineSelection.size().should.equal(5)

        it 'the first element is a <div>', ->
          multilineSelection.node(0).tagName.should.equal('DIV')

        it 'the first element text is "a."', ->
          multilineSelection.node(0).textContent.should.equal('a.')

        it 'the second element is a <br>', ->
          multilineSelection.node(1).tagName.should.equal('BR')

        it 'the third element is a <div>', ->
          multilineSelection.node(2).tagName.should.equal('DIV')

        it 'the third element text is is "b c d"', ->
          multilineSelection.node(2).textContent.should.equal('b c d')

        it 'the fourth element is a <br>', ->
          multilineSelection.node(3).tagName.should.equal('BR')

        it 'the fifth element is a <div>', ->
          multilineSelection.node(4).tagName.should.equal('DIV')

        it 'the fifth element text is is "e"', ->
          multilineSelection.node(4).textContent.should.equal('e')

      describe 'when using a custom element and not inserting a BR', ->
        beforeEach ->
          multilineSelection = toMultilineSelection(stringWithMultiline, 'p', true)

        it 'returns a selection', ->
          multilineSelection.should.be.an.instanceof(Selection)

        it 'returns a Selection with 3 items', ->
          multilineSelection.size().should.equal(3)

        it 'the first element is a <p>', ->
          multilineSelection.node(0).tagName.should.equal('P')

        it 'the first element text is "a."', ->
          multilineSelection.node(0).textContent.should.equal('a.')

        it 'the second element is a <p>', ->
          multilineSelection.node(1).tagName.should.equal('P')

        it 'the second element text is is "b c d"', ->
          multilineSelection.node(1).textContent.should.equal('b c d')

        it 'the third element is a <p>', ->
          multilineSelection.node(2).tagName.should.equal('P')

        it 'the third element text is is "e"', ->
          multilineSelection.node(2).textContent.should.equal('e')


  describe 'User Facing Text (regression)', ->
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
