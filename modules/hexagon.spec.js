import hx from './hexagon'

var chai = require('chai')
var spies = require('chai-spies')
chai.use(spies)

describe('HexagonJS Test Suite', () => {

  // add a handle for when the tests are finished
  after(() => {
    if (window.hxTestFinished) {
      window.hxTestFinished()
    }
  })

  require('modules/set/test/spec')
  require('modules/map/test/spec')
  require('modules/list/test/spec')
  require('modules/event-emitter/test/spec')
  require('modules/util/test/spec')
  require('modules/color/test/spec')
  require('modules/selection/test/spec')
  require('modules/transition/test/spec')
  require('modules/interpolate/test/spec')

  describe('1.x.x backwards compatiblity tests', () => {

    function checkProperty (name, obj = hx) {
      it('hx should have the ' + name + ' function', () => {
        obj.should.have.property(name)
        obj[name].should.be.a.function
      })
    }

    it('hx should be on the window', () => {
      hx.should.be.defined
    })

    describe('set', () => {
      it('hx should have the Set prototype', () => {
        hx.should.have.property('Set')
      })
    })

    describe('map', () => {
      it('hx should have the Map prototype', () => {
        hx.should.have.property('Map')
      })
    })

    describe('list', () => {
      it('hx should have the List prototype', () => {
        hx.should.have.property('List')
      })
    })

    describe('color', () => {
      checkProperty('color')
      checkProperty('isColor', hx.color)
      checkProperty('isColorString', hx.color)
    })

    describe('event-emitter', () => {
      it('hx should have the EventEmitter prototype', () => {
        hx.should.have.property('EventEmitter')
        hx.EventEmitter.should.be.a.function
      })
    })

    describe('util', () => {
      checkProperty('deprecatedWarning')
      checkProperty('consoleWarning')
      checkProperty('hash')
      checkProperty('transpose')
      checkProperty('supports')
      checkProperty('debounce')
      checkProperty('clamp')
      checkProperty('clampUnit')
      checkProperty('randomId')
      checkProperty('min')
      checkProperty('minBy')
      checkProperty('max')
      checkProperty('maxBy')
      checkProperty('range')
      checkProperty('sum')
      checkProperty('flatten')
      checkProperty('cycle')
      checkProperty('hashList')
      checkProperty('find')
      checkProperty('isString')
      checkProperty('isFunction')
      checkProperty('isArray')
      checkProperty('isObject')
      checkProperty('isBoolean')
      checkProperty('isPlainObject')
      checkProperty('groupBy')
      checkProperty('unique')
      checkProperty('endsWith')
      checkProperty('startsWith')
      checkProperty('tween')
      checkProperty('defined')
      checkProperty('zip')
      checkProperty('merge')
      checkProperty('shallowMerge')
      checkProperty('clone')
      checkProperty('shallowClone')
      checkProperty('vendor')
      checkProperty('identity')
      checkProperty('parseHTML')
      checkProperty('cleanNode')
      checkProperty('scrollbarSize')
      checkProperty('parentZIndex')
      checkProperty('checkParents')
    })

    describe('selection', () => {
      checkProperty('select')
      checkProperty('selectAll')
      checkProperty('detached')
      checkProperty('getHexagonElementDataObject', hx.select)
      checkProperty('addEventAugmenter', hx.select)
    })

    describe('transition', () => {
      checkProperty('transition')
      checkProperty('loop')
      checkProperty('ease')
    })

    describe('interpolate', () => {
      checkProperty('interpolate')
    })
  })

})

module.exports = hx
