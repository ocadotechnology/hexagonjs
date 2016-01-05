import hx from './hexagon'

// add a handle for when the tests are finished
after(() => {
  if (window.hxTestFinished) {
    window.hxTestFinished()
  }
})

require('./set/test/spec')
require('./map/test/spec')
require('./list/test/spec')
// require('./color/test/spec')

describe('backwards compatiblity tests', () => {

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

  // describe('color', () => {
  //   it('hx should have the color function', () => {
  //     hx.should.have.property('color')
  //   })

  //   it('hx should have the color.isColor function', () => {
  //     hx.color.should.have.property('isColor')
  //   })

  //   it('hx should have the color.isColorString function', () => {
  //     hx.color.should.have.property('isColorString')
  //   })
  // })

// describe('util', () => {
//   checkProperty('deprecatedWarning')
//   checkProperty('consoleWarning')
//   checkProperty('hash')
//   checkProperty('transpose')
//   checkProperty('supports')
//   checkProperty('debounce')
//   checkProperty('clamp')
//   checkProperty('clampUnit')
//   checkProperty('randomId')
//   checkProperty('min')
//   checkProperty('minBy')
//   checkProperty('max')
//   checkProperty('maxBy')
//   checkProperty('range')
//   checkProperty('sum')
//   checkProperty('flatten')
//   checkProperty('cycle')
//   checkProperty('hashList')
//   checkProperty('find')
//   checkProperty('isString')
//   checkProperty('isFunction')
//   checkProperty('isArray')
//   checkProperty('isObject')
//   checkProperty('isBoolean')
//   checkProperty('isPlainObject')
//   checkProperty('groupBy')
//   checkProperty('unique')
//   checkProperty('endsWith')
//   checkProperty('startsWith')
//   checkProperty('tween')
//   checkProperty('defined')
//   checkProperty('zip')
//   checkProperty('merge')
//   checkProperty('shallowMerge')
//   checkProperty('clone')
//   checkProperty('shallowClone')
//   checkProperty('vendor')
//   checkProperty('identity')
//   checkProperty('parseHTML')
//   checkProperty('cleanNode')
//   checkProperty('scrollbarSize')
//   checkProperty('parentZIndex')
//   checkProperty('checkParents')
// })
})
