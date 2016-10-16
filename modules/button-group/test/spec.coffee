select = require('modules/selection/main')
NumberPicker = require('modules/number-picker/main').NumberPicker
chai = require('chai')
fakeTime = require('test/utils/fake-time')
emitEvent = require('test/utils/emit-event')

should = chai.should()

describe 'number picker', ->
