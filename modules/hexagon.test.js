// add a handle for when the tests are finished
after(() => {
  if (window.hxTestFinished) {
    window.hxTestFinished()
  }
})

require('./set/test/spec')
require('./map/test/spec')

// test that the library is backwards compatible
const hx = require('./hexagon')

describe('backwards compatiblity tests', () => {

  function checkProperty (name) {
    it('should have the ' + name + ' function', () => {
      hx.should.have.property(name)
    })
  }

  it('hx should be on the window', () => {
    hx.should.be.defined
  })

  describe('Set', () => {
    checkProperty('Set')
  })

// describe('utils', () => {
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
