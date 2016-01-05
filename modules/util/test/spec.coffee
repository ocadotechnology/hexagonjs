util = require('modules/util/main')
hxSet = require('modules/set/main')
hxMap = require('modules/map/main')
hxList = require('modules/list/main')

describe "Util", ->

  it "transpose: inverts a 2D array", ->
    array = [
      [1,  2,  3,  4]
      [5,  6,  7,  8]
      [9, 10, 11, 12]
    ]

    transposed = [
      [1, 5,  9]
      [2, 6, 10]
      [3, 7, 11]
      [4, 8, 12]
    ]

    expect(util.transpose array) .toEqual transposed

  it "transpose: roundtrip", ->
    array = [
      [1,  2,  3,  4]
      [5,  6,  7,  8]
      [9, 10, 11, 12]
    ]

    expect(util.transpose util.transpose array) .toEqual array

  it "transpose: return identity for 1D array", ->
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    expect(util.transpose array) .toEqual array

  it "transpose: return empty array for empty array argument", ->
    expect(util.transpose []) .toEqual []

  it "transpose: return undefined for non array argument", ->
    expect(util.transpose false) .toEqual undefined

  it "transpose: work with strings", ->
    expect(util.transpose ["one", "two"])
      .toEqual [['o', 't'], ['n', 'w'], ['e', 'o']]

  it "unique: work with numbers", ->
    expect(util.unique([1, 2, 3, 1, 2, 3, 4])) .toEqual [1, 2, 3, 4]

  it "unique: work with strings", ->
    expect(util.unique(['1', '2', '3', '1', '2', '3', '4']))
      .toEqual ['1', '2', '3', '4']

  it "unique: work with booleans", ->
    expect(util.unique([true, false, true])) .toEqual [true, false]
    expect(util.unique([true, true])) .toEqual [true]
    expect(util.unique([false, false, false])) .toEqual [false]

  it 'zip: works', ->
    expect(util.zip([[1, 2], [3, 4]])) .toEqual [[1, 3], [2, 4]]
    expect(util.zip([[1, 2, 3], [4, 5, 6]])) .toEqual [[1, 4], [2, 5], [3, 6]]

  it 'zip: works with more than two arrays', ->
    arrays = util.range(10).map(-> util.range(10))
    expected = util.range(10).map( (i) -> util.range(10).map(-> i))
    expect(util.zip(arrays)) .toEqual expected

  it 'zip: doesnt blow up when given stupid arguments', ->
    expect(util.zip()) .toEqual []
    expect(util.zip([])) .toEqual []
    expect(util.zip([1, 2, 3])) .toEqual []
    expect(util.zip([[], []])) .toEqual []

  it 'hash: should give consistent results', ->
    expect(util.hash('thing')).toEqual(util.hash('thing'))
    expect(util.hash('thing2')).toEqual(util.hash('thing2'))
    expect(util.hash('thing3')).toEqual(util.hash('thing3'))
    expect(util.hash('thing2')).not.toEqual(util.hash('thing3'))

  it 'hash: should return a number', ->
    expect(util.hash('thing')).toEqual(jasmine.any(Number))

  it 'hash: should not return a number > max', ->
    for i in [0..100]
      expect(util.hash(util.randomId(), 5)).toBeLessThan(5)

  it 'supports: should return boolean', ->
    expect(util.supports('touch')).toEqual(jasmine.any(Boolean))
    expect(util.supports('date')).toEqual(jasmine.any(Boolean))

    # check the cached branches dont error
    expect(util.supports('touch')).toEqual(util.supports('touch'))
    expect(util.supports('date')).toEqual(util.supports('date'))

  it 'deprecatedWarning', ->
    spyOn(console, 'warn')
    spyOn(console, 'trace')
    util.deprecatedWarning('something', 'do something else')
    expect(console.warn).toHaveBeenCalled()
    expect(console.trace).toHaveBeenCalled()

  it 'deprecatedWarning', ->
    spyOn(console, 'trace')
    util.deprecatedWarning('something')
    expect(console.trace).toHaveBeenCalled()

  it 'consoleWarning', ->
    spyOn(console, 'warn')
    spyOn(console, 'trace')
    util.consoleWarning('something', 'you are doing something silly')
    expect(console.warn).toHaveBeenCalled()
    expect(console.trace).toHaveBeenCalled()

  it 'consoleWarning', ->
    spyOn(console, 'trace')
    util.consoleWarning('something')
    expect(console.trace).toHaveBeenCalled()

  it 'clamp: should work', ->
    expect(util.clamp(0, 10, 15)).toEqual(10)
    expect(util.clamp(0, 10, 5)).toEqual(5)
    expect(util.clamp(0, 10, 10)).toEqual(10)
    expect(util.clamp(0, 10, -15)).toEqual(0)
    expect(util.clamp(0, 10, 0)).toEqual(0)

  it 'clampUnit: should work', ->
    expect(util.clampUnit(0.15)).toEqual(0.15)
    expect(util.clampUnit(0.0)).toEqual(0)
    expect(util.clampUnit(-0.15)).toEqual(0)
    expect(util.clampUnit(1.15)).toEqual(1)
    expect(util.clampUnit(2.15)).toEqual(1)

  it 'randomId: should work', ->
    expect(util.randomId()).toEqual(jasmine.any(String))
    expect(util.randomId().length).toEqual(16)
    expect(util.randomId(24).length).toEqual(24)
    expect(util.randomId(24, 'A')).toEqual('AAAAAAAAAAAAAAAAAAAAAAAA')

  it 'min: should work', ->
    expect(util.min()).toEqual(Infinity)
    expect(util.min([])).toEqual(Infinity)
    expect(util.min([1, 5, 2])).toEqual(1)
    expect(util.min([undefined, 5, 2])).toEqual(2)

  it 'minBy: should work', ->
    expect(util.minBy()).toEqual(undefined)
    expect(util.minBy([])).toEqual(undefined)
    expect(util.minBy([1, 2, 3, 4])).toEqual(1)
    expect(util.minBy([1, undefined, 3, 4])).toEqual(1)
    expect(util.minBy([5, 2, 3, 4])).toEqual(2)
    expect(util.minBy([1, 5, undefined, 3, 4], (d) -> -d)).toEqual(5)

  it 'max: should work', ->
    expect(util.max()).toEqual(-Infinity)
    expect(util.max([])).toEqual(-Infinity)
    expect(util.max([1, 5, 2])).toEqual(5)
    expect(util.max([undefined, 5, 2])).toEqual(5)

  it 'maxBy: should work', ->
    expect(util.maxBy()).toEqual(undefined)
    expect(util.maxBy([])).toEqual(undefined)
    expect(util.maxBy([1, 2, 3, 4])).toEqual(4)
    expect(util.maxBy([1, undefined, 3, 4])).toEqual(4)
    expect(util.maxBy([1, 5, 3, 4])).toEqual(5)
    expect(util.maxBy([5, 1, undefined, 5, 4], (d) -> -d)).toEqual(1)

  it 'range should work', ->
    expect(util.range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  it 'sum should work', ->
    expect(util.sum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(45)

  it "flatten: should flatten a 2d array into a 1d array", ->
    expect(util.flatten([[1, 2], [2, 3], [3, 10]])) .toEqual [1, 2, 2, 3, 3, 10]

  it "cycle: should work", ->
    expect(util.cycle([0, 1, 2], 0)).toEqual(0)
    expect(util.cycle([0, 4, 8], 1)).toEqual(4)
    expect(util.cycle([0, 1, 2], 20)).toEqual(2)
    expect(util.cycle([0, 1, 2], 0)).toEqual(0)

  it "hashList: should work", ->
    expect(util.hashList([0, 1, 2], "thing-1"))
      .toEqual(util.hashList([0, 1, 2], "thing-1"))
    expect(util.hashList([0, 1, 2], "thing-2")).toEqual(jasmine.any(Number))
    expect(util.hashList([0, 1, 2], "thing-3")).toEqual(jasmine.any(Number))
    expect(util.hashList([0, 1, 2], "thing-4")).toEqual(jasmine.any(Number))

  it "find: should work", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    expect(util.find(values, (d) -> d.v is 2)).toEqual(values[2])
    expect(util.find(values, (d) -> d.v is 5)).toEqual(values[0])
    expect(util.find(values, (d) -> d.v is 7)).toEqual(values[1])

  it "find: should return undefined when nothing is found", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    expect(util.find(values, (d) -> false)).toEqual(undefined)

  it "isString: should work", ->
    expect(util.isString("this is a string")).toEqual(true)
    expect(util.isString(new String("this is a string"))).toEqual(true)
    expect(util.isString(123)).toEqual(false)
    expect(util.isString({})).toEqual(false)
    expect(util.isString([])).toEqual(false)
    expect(util.isString(/b/)).toEqual(false)
    expect(util.isString(->)).toEqual(false)
    expect(util.isString(true)).toEqual(false)
    expect(util.isString(false)).toEqual(false)

  it "isFunction: should work", ->
    expect(util.isFunction("this is a string")).toEqual(false)
    expect(util.isFunction(new String("this is a string"))).toEqual(false)
    expect(util.isFunction(123)).toEqual(false)
    expect(util.isFunction({})).toEqual(false)
    expect(util.isFunction([])).toEqual(false)
    expect(util.isFunction(/b/)).toEqual(false)
    expect(util.isFunction(->)).toEqual(true)
    expect(util.isFunction(true)).toEqual(false)
    expect(util.isFunction(false)).toEqual(false)

  it "isArray: should work", ->
    expect(util.isArray("this is a string")).toEqual(false)
    expect(util.isArray(new String("this is a string"))).toEqual(false)
    expect(util.isArray(123)).toEqual(false)
    expect(util.isArray({})).toEqual(false)
    expect(util.isArray([])).toEqual(true)
    expect(util.isArray(/b/)).toEqual(false)
    expect(util.isArray(->)).toEqual(false)
    expect(util.isArray(true)).toEqual(false)
    expect(util.isArray(false)).toEqual(false)

  it "isBoolean: should work", ->
    expect(util.isBoolean("this is a string")).toEqual(false)
    expect(util.isBoolean(new String("this is a string"))).toEqual(false)
    expect(util.isBoolean(123)).toEqual(false)
    expect(util.isBoolean({})).toEqual(false)
    expect(util.isBoolean([])).toEqual(false)
    expect(util.isBoolean(/b/)).toEqual(false)
    expect(util.isBoolean(->)).toEqual(false)
    expect(util.isBoolean(true)).toEqual(true)
    expect(util.isBoolean(false)).toEqual(true)

  it "groupBy: should work", ->
    values = [
      {key: 'a', value: 1},
      {key: 'a', value: 2},
      {key: 'a', value: 3},
      {key: 'b', value: 4},
      {key: 'b', value: 5},
      {key: 'c', value: 6}
    ]

    expect(util.groupBy(values, (d) -> d.key)).toEqual([
      ['a', [{key: 'a', value: 1}, {key: 'a', value: 2}, {key: 'a', value: 3}]],
      ['b', [{key: 'b', value: 4}, {key: 'b', value: 5} ]],
      ['c', [{key: 'c', value: 6}]]
    ])

  it "endsWith: should work", ->
    expect(util.endsWith('test-string', 'ing')).toEqual(true)
    expect(util.endsWith('test-string', '')).toEqual(true)
    expect(util.endsWith('test-string', 'test')).toEqual(false)

  it "startsWith: should work", ->
    expect(util.startsWith('test-string', 'ing')).toEqual(false)
    expect(util.startsWith('test-string', '')).toEqual(true)
    expect(util.startsWith('test-string', 'test')).toEqual(true)

  it 'tween: should work', ->
    expect(util.tween(0, 10, 0.5)).toBeCloseTo(5)
    expect(util.tween(0, 10, 1.5)).toBeCloseTo(15)
    expect(util.tween(0, -3, 0.1)).toBeCloseTo(-0.3)

  it 'isObject: should work', ->
    class A
      constructor: ->

    expect(util.isObject(new A)).toEqual(true)
    expect(util.isObject({})).toEqual(true)
    expect(util.isObject(document.createElement('div'))).toEqual(true)
    expect(util.isObject(window)).toEqual(true)
    expect(util.isObject(->)).toEqual(false)
    expect(util.isObject("")).toEqual(false)
    expect(util.isObject(123)).toEqual(false)
    expect(util.isObject(/a/)).toEqual(true)
    expect(util.isObject([])).toEqual(false)

  it 'isPlainObject: should work', ->
    class A
      constructor: ->

    expect(util.isPlainObject(new A)).toEqual(false)
    expect(util.isPlainObject({})).toEqual(true)
    expect(util.isPlainObject(document.createElement('div'))).toEqual(false)
    expect(util.isPlainObject(window)).toEqual(false)
    expect(util.isPlainObject(->)).toEqual(false)
    expect(util.isPlainObject("")).toEqual(false)
    expect(util.isPlainObject(123)).toEqual(false)
    expect(util.isPlainObject(/a/)).toEqual(false)
    expect(util.isPlainObject([])).toEqual(false)
    expect(util.isPlainObject(null)).toEqual(false)

  describe 'merge', ->

    it 'should work', ->
      class A
        constructor: -> @a = 1

      expect(util.merge({a: {b: 2, c: {d: 3}}}))
        .toEqual({a: {b: 2, c: {d: 3}}})

      expect(util.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: 'value'}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      expect(util.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: new A}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: {}}}})

      expect(util.merge({a: {b: 2}}, {a: {c: 3}}))
        .toEqual({a: {b: 2, c: 3}})

      expect(util.merge({a: {b: 2}}, {a: 2}))
        .toEqual({a: 2})

      expect(util.merge({a: {b: 2}}, {a: {c: new A}}))
        .toEqual({a: {b: 2, c: {}}})

      expect(util.merge({a: {b: 2}}, {}))
        .toEqual({a: {b: 2}})

      expect(util.merge({a: {b: 2}}, new A))
        .toEqual({a: {b: 2}})

    it 'should work when not retaining undefined values', ->
      class A
        constructor: -> @a = 1

      expect(util.merge.defined({a: {b: 2, c: {d: 3}}}))
        .toEqual({a: {b: 2, c: {d: 3}}})

      expect(util.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: 'value'}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      expect(util.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: new A}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: {}}}})

      expect(util.merge.defined({a: {b: 2}}, {a: {c: 3}}))
        .toEqual({a: {b: 2, c: 3}})

      expect(util.merge.defined({a: {b: 2}}, {a: 2}))
        .toEqual({a: 2})

      expect(util.merge.defined({a: {b: 2}}, {a: {c: new A}}))
        .toEqual({a: {b: 2, c: {}}})

      expect(util.merge.defined({a: {b: 2}}, {}))
        .toEqual({a: {b: 2}})

      expect(util.merge.defined({a: {b: 2}}, new A))
        .toEqual({a: {b: 2}})

    it 'should retain undefined values', ->
      expect(util.merge({'a': {'b': 5}}, {'a': {'b': undefined}}, {'b': 3}))
        .toEqual({'a': {'b': undefined}, 'b': 3})

    it 'bug check - should not throw an error when null is present', ->
      expect( -> util.merge({}, {a: null}) ).not.toThrow()

    it 'merging with null should work', ->
      expect(util.merge({a: '5'}, {a: null})).toEqual({a: null})

    it 'merge.defined should not retain undefined values', ->
      expect(util.merge.defined({'a': {'b': 5}},
                              {'a': {'b': undefined}}, {'b': 3}))
        .toEqual({'a': {'b': 5}, 'b': 3})

    it 'shallowMerge should work', ->

      expect(util.shallowMerge({'a': 1})).toEqual({'a': 1})
      expect(util.shallowMerge({'a': 1}, {'a': 2})).toEqual({'a': 2})
      expect(util.shallowMerge({'a': 1}, {'a': 2}, {'b': 3}))
        .toEqual({'a': 2, 'b': 3})

      src = {'a': 1}
      expect(util.shallowMerge(src)).not.toBe(src)

      expect(util.shallowMerge()).toEqual({})

      class A
        constructor: -> @a = 1

      expect(util.shallowMerge(new A)).toEqual({})

      a = new A
      expect(util.shallowMerge({'a': 1, 'b': a})).toEqual({'a': 1, b: a})


    it 'shallowMerge.defined should work', ->

      expect(util.shallowMerge.defined({'a': 1})).toEqual({'a': 1})
      expect(util.shallowMerge.defined({'a': 1}, {'a': 2})).toEqual({'a': 2})
      expect(util.shallowMerge.defined({'a': 1}, {'a': 2}, {'b': 3}))
        .toEqual({'a': 2, 'b': 3})
      expect(util.shallowMerge.defined({'a': 1}, {'a': [1, 2, 3]}, {'b': 3}))
        .toEqual({'a': [1, 2, 3], 'b': 3})

      src = {'a': 1}
      expect(util.shallowMerge.defined(src)).not.toBe(src)

      expect(util.shallowMerge()).toEqual({})

      class A
        constructor: -> @a = 1

      expect(util.shallowMerge.defined(new A)).toEqual({})

      a = new A
      expect(util.shallowMerge.defined({'a': 1, 'b': a})).toEqual({'a': 1, b: a})

    it 'shallowMerge: should retain undefined values', ->
      expect(util.shallowMerge({'a': 1}, {'a': undefined}, {'b': 3}))
        .toEqual({'a': undefined, 'b': 3})

    it 'shallowMerge.defined: shallow merge should ignore undefined values', ->
      expect(util.shallowMerge.defined({'a': 1}, {'a': undefined}, {'b': 3}))
        .toEqual({'a': 1, 'b': 3})

  it 'shallowClone should work', ->
    expect(util.shallowClone(1)).toEqual(1)
    expect(util.shallowClone('string')).toEqual('string')

    f = ->
    expect(util.shallowClone(f)).toEqual(f)

    expect(util.shallowClone({a: 1})).toEqual({a: 1})
    expect(util.shallowClone({a: 5, b: 1})).toEqual({a: 5, b: 1})
    obj = {c: 3}
    expect(util.shallowClone({a: 5, b: obj})).toEqual({a: 5, b: obj})
    expect(util.shallowClone({a: 5, b: obj}).b).toBe(obj)

    expect(util.shallowClone([1, 2, 3])).toEqual([1, 2, 3])

    l = new hxList [1, "a", {}]
    s = new hxSet [1, "a", {}]
    m = new hxMap [["a", 5], [6, {}]]

    d = new Date
    expect hx.shallowClone d
      .toEqual d

    expect(hx.shallowClone(l).entries()).toEqual(l.entries())
    expect(hx.shallowClone(s).entries()).toEqual(s.entries())
    expect(hx.shallowClone(m).entries()).toEqual(m.entries())

  it '(deep) clone should work', ->
    expect(util.clone(1)).toEqual(1)
    expect(util.clone('string')).toEqual('string')

    d = new Date
    expect hx.clone d
      .toEqual d

    f = ->
    expect(util.clone(f)).toEqual(f)

    expect(util.clone({a: 1})).toEqual({a: 1})
    expect(util.clone({a: 5, b: 1})).toEqual({a: 5, b: 1})
    obj = {c: 3}
    expect(util.clone({a: 5, b: obj})).toEqual({a: 5, b: {c: 3}})
    expect(util.clone({a: 5, b: obj}).b).not.toBe(obj)

    expect(util.clone([1, 2, 3])).toEqual([1, 2, 3])
    l = new hxList [1, "a", {}]
    s = new hxSet [1, "a", {}]
    m = new hxMap [["a", 5], [6, {}]]


    expect(util.clone(l).entries()).toEqual(l.entries())
    expect(util.clone(s).entries()).toEqual(s.entries())
    expect(util.clone(m).entries()).toEqual(m.entries())



  it 'cleanNode: should remove all whitespace nodes', ->
    container = document.createElement('div')
    inner = document.createElement('div')

    container.appendChild(document.createTextNode('\n'))
    container.appendChild(document.createElement('div'))
    container.appendChild(document.createTextNode('\t'))

    inner.appendChild(document.createTextNode('Dave'))
    inner.appendChild(document.createElement('div'))
    inner.appendChild(document.createTextNode('\n'))

    container.appendChild(inner)

    expect(container.childNodes.length).toEqual(4)
    expect(inner.childNodes.length).toEqual(3)
    container = util.cleanNode(container)
    expect(container.childNodes.length).toEqual(2)
    expect(container.innerHTML).toEqual('<div></div><div>Dave<div></div></div>')
    expect(inner.childNodes.length).toEqual(2)
    expect(inner.innerHTML).toEqual('Dave<div></div>')
    expect(inner.childNodes[0].nodeValue).toEqual('Dave')
    expect(inner.childNodes[1].innerHTML).toEqual('')
