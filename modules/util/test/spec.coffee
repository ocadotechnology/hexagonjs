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

    expect(hx.transpose array) .toEqual transposed

  it "transpose: roundtrip", ->
    array = [
      [1,  2,  3,  4]
      [5,  6,  7,  8]
      [9, 10, 11, 12]
    ]

    expect(hx.transpose hx.transpose array) .toEqual array

  it "transpose: return identity for 1D array", ->
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    expect(hx.transpose array) .toEqual array

  it "transpose: return empty array for empty array argument", ->
    expect(hx.transpose []) .toEqual []

  it "transpose: return undefined for non array argument", ->
    expect(hx.transpose false) .toEqual undefined

  it "transpose: work with strings", ->
    expect(hx.transpose ["one", "two"])
      .toEqual [['o', 't'], ['n', 'w'], ['e', 'o']]

  it "unique: work with numbers", ->
    expect(hx.unique([1, 2, 3, 1, 2, 3, 4])) .toEqual [1, 2, 3, 4]

  it "unique: work with strings", ->
    expect(hx.unique(['1', '2', '3', '1', '2', '3', '4']))
      .toEqual ['1', '2', '3', '4']

  it "unique: work with booleans", ->
    expect(hx.unique([true, false, true])) .toEqual [true, false]
    expect(hx.unique([true, true])) .toEqual [true]
    expect(hx.unique([false, false, false])) .toEqual [false]

  it 'zip: works', ->
    expect(hx.zip([[1, 2], [3, 4]])) .toEqual [[1, 3], [2, 4]]
    expect(hx.zip([[1, 2, 3], [4, 5, 6]])) .toEqual [[1, 4], [2, 5], [3, 6]]

  it 'zip: works with more than two arrays', ->
    arrays = hx.range(10).map(-> hx.range(10))
    expected = hx.range(10).map( (i) -> hx.range(10).map(-> i))
    expect(hx.zip(arrays)) .toEqual expected

  it 'zip: doesnt blow up when given stupid arguments', ->
    expect(hx.zip()) .toEqual []
    expect(hx.zip([])) .toEqual []
    expect(hx.zip([1, 2, 3])) .toEqual []
    expect(hx.zip([[], []])) .toEqual []

  it 'hash: should give consistent results', ->
    expect(hx.hash('thing')).toEqual(hx.hash('thing'))
    expect(hx.hash('thing2')).toEqual(hx.hash('thing2'))
    expect(hx.hash('thing3')).toEqual(hx.hash('thing3'))
    expect(hx.hash('thing2')).not.toEqual(hx.hash('thing3'))

  it 'hash: should return a number', ->
    expect(hx.hash('thing')).toEqual(jasmine.any(Number))

  it 'hash: should not return a number > max', ->
    for i in [0..100]
      expect(hx.hash(hx.randomId(), 5)).toBeLessThan(5)

  it 'supports: should return boolean', ->
    expect(hx.supports('touch')).toEqual(jasmine.any(Boolean))
    expect(hx.supports('date')).toEqual(jasmine.any(Boolean))

    # check the cached branches dont error
    expect(hx.supports('touch')).toEqual(hx.supports('touch'))
    expect(hx.supports('date')).toEqual(hx.supports('date'))

  it 'deprecatedWarning', ->
    spyOn(console, 'warn')
    spyOn(console, 'trace')
    hx.deprecatedWarning('something', 'do something else')
    expect(console.warn).toHaveBeenCalled()
    expect(console.trace).toHaveBeenCalled()

  it 'deprecatedWarning', ->
    spyOn(console, 'trace')
    hx.deprecatedWarning('something')
    expect(console.trace).toHaveBeenCalled()

  it 'consoleWarning', ->
    spyOn(console, 'warn')
    spyOn(console, 'trace')
    hx.consoleWarning('something', 'you are doing something silly')
    expect(console.warn).toHaveBeenCalled()
    expect(console.trace).toHaveBeenCalled()

  it 'consoleWarning', ->
    spyOn(console, 'trace')
    hx.consoleWarning('something')
    expect(console.trace).toHaveBeenCalled()

  it 'clamp: should work', ->
    expect(hx.clamp(0, 10, 15)).toEqual(10)
    expect(hx.clamp(0, 10, 5)).toEqual(5)
    expect(hx.clamp(0, 10, 10)).toEqual(10)
    expect(hx.clamp(0, 10, -15)).toEqual(0)
    expect(hx.clamp(0, 10, 0)).toEqual(0)

  it 'clampUnit: should work', ->
    expect(hx.clampUnit(0.15)).toEqual(0.15)
    expect(hx.clampUnit(0.0)).toEqual(0)
    expect(hx.clampUnit(-0.15)).toEqual(0)
    expect(hx.clampUnit(1.15)).toEqual(1)
    expect(hx.clampUnit(2.15)).toEqual(1)

  it 'randomId: should work', ->
    expect(hx.randomId()).toEqual(jasmine.any(String))
    expect(hx.randomId().length).toEqual(16)
    expect(hx.randomId(24).length).toEqual(24)
    expect(hx.randomId(24, 'A')).toEqual('AAAAAAAAAAAAAAAAAAAAAAAA')

  it 'min: should work', ->
    expect(hx.min()).toEqual(Infinity)
    expect(hx.min([])).toEqual(Infinity)
    expect(hx.min([1, 5, 2])).toEqual(1)
    expect(hx.min([undefined, 5, 2])).toEqual(2)

  it 'minBy: should work', ->
    expect(hx.minBy()).toEqual(undefined)
    expect(hx.minBy([])).toEqual(undefined)
    expect(hx.minBy([1, 2, 3, 4])).toEqual(1)
    expect(hx.minBy([1, undefined, 3, 4])).toEqual(1)
    expect(hx.minBy([5, 2, 3, 4])).toEqual(2)
    expect(hx.minBy([1, 5, undefined, 3, 4], (d) -> -d)).toEqual(5)

  it 'max: should work', ->
    expect(hx.max()).toEqual(-Infinity)
    expect(hx.max([])).toEqual(-Infinity)
    expect(hx.max([1, 5, 2])).toEqual(5)
    expect(hx.max([undefined, 5, 2])).toEqual(5)

  it 'maxBy: should work', ->
    expect(hx.maxBy()).toEqual(undefined)
    expect(hx.maxBy([])).toEqual(undefined)
    expect(hx.maxBy([1, 2, 3, 4])).toEqual(4)
    expect(hx.maxBy([1, undefined, 3, 4])).toEqual(4)
    expect(hx.maxBy([1, 5, 3, 4])).toEqual(5)
    expect(hx.maxBy([5, 1, undefined, 5, 4], (d) -> -d)).toEqual(1)

  it 'range should work', ->
    expect(hx.range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  it 'sum should work', ->
    expect(hx.sum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(45)

  it "flatten: should flatten a 2d array into a 1d array", ->
    expect(hx.flatten([[1, 2], [2, 3], [3, 10]])) .toEqual [1, 2, 2, 3, 3, 10]

  it "cycle: should work", ->
    expect(hx.cycle([0, 1, 2], 0)).toEqual(0)
    expect(hx.cycle([0, 4, 8], 1)).toEqual(4)
    expect(hx.cycle([0, 1, 2], 20)).toEqual(2)
    expect(hx.cycle([0, 1, 2], 0)).toEqual(0)

  it "hashList: should work", ->
    expect(hx.hashList([0, 1, 2], "thing-1"))
      .toEqual(hx.hashList([0, 1, 2], "thing-1"))
    expect(hx.hashList([0, 1, 2], "thing-2")).toEqual(jasmine.any(Number))
    expect(hx.hashList([0, 1, 2], "thing-3")).toEqual(jasmine.any(Number))
    expect(hx.hashList([0, 1, 2], "thing-4")).toEqual(jasmine.any(Number))

  it "find: should work", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    expect(hx.find(values, (d) -> d.v is 2)).toEqual(values[2])
    expect(hx.find(values, (d) -> d.v is 5)).toEqual(values[0])
    expect(hx.find(values, (d) -> d.v is 7)).toEqual(values[1])

  it "find: should return undefined when nothing is found", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    expect(hx.find(values, (d) -> false)).toEqual(undefined)

  it "isString: should work", ->
    expect(hx.isString("this is a string")).toEqual(true)
    expect(hx.isString(new String("this is a string"))).toEqual(true)
    expect(hx.isString(123)).toEqual(false)
    expect(hx.isString({})).toEqual(false)
    expect(hx.isString([])).toEqual(false)
    expect(hx.isString(/b/)).toEqual(false)
    expect(hx.isString(->)).toEqual(false)
    expect(hx.isString(true)).toEqual(false)
    expect(hx.isString(false)).toEqual(false)

  it "isFunction: should work", ->
    expect(hx.isFunction("this is a string")).toEqual(false)
    expect(hx.isFunction(new String("this is a string"))).toEqual(false)
    expect(hx.isFunction(123)).toEqual(false)
    expect(hx.isFunction({})).toEqual(false)
    expect(hx.isFunction([])).toEqual(false)
    expect(hx.isFunction(/b/)).toEqual(false)
    expect(hx.isFunction(->)).toEqual(true)
    expect(hx.isFunction(true)).toEqual(false)
    expect(hx.isFunction(false)).toEqual(false)

  it "isArray: should work", ->
    expect(hx.isArray("this is a string")).toEqual(false)
    expect(hx.isArray(new String("this is a string"))).toEqual(false)
    expect(hx.isArray(123)).toEqual(false)
    expect(hx.isArray({})).toEqual(false)
    expect(hx.isArray([])).toEqual(true)
    expect(hx.isArray(/b/)).toEqual(false)
    expect(hx.isArray(->)).toEqual(false)
    expect(hx.isArray(true)).toEqual(false)
    expect(hx.isArray(false)).toEqual(false)

  it "isBoolean: should work", ->
    expect(hx.isBoolean("this is a string")).toEqual(false)
    expect(hx.isBoolean(new String("this is a string"))).toEqual(false)
    expect(hx.isBoolean(123)).toEqual(false)
    expect(hx.isBoolean({})).toEqual(false)
    expect(hx.isBoolean([])).toEqual(false)
    expect(hx.isBoolean(/b/)).toEqual(false)
    expect(hx.isBoolean(->)).toEqual(false)
    expect(hx.isBoolean(true)).toEqual(true)
    expect(hx.isBoolean(false)).toEqual(true)

  it "groupBy: should work", ->
    values = [
      {key: 'a', value: 1},
      {key: 'a', value: 2},
      {key: 'a', value: 3},
      {key: 'b', value: 4},
      {key: 'b', value: 5},
      {key: 'c', value: 6}
    ]

    expect(hx.groupBy(values, (d) -> d.key)).toEqual([
      ['a', [{key: 'a', value: 1}, {key: 'a', value: 2}, {key: 'a', value: 3}]],
      ['b', [{key: 'b', value: 4}, {key: 'b', value: 5} ]],
      ['c', [{key: 'c', value: 6}]]
    ])

  it "endsWith: should work", ->
    expect(hx.endsWith('test-string', 'ing')).toEqual(true)
    expect(hx.endsWith('test-string', '')).toEqual(true)
    expect(hx.endsWith('test-string', 'test')).toEqual(false)

  it "startsWith: should work", ->
    expect(hx.startsWith('test-string', 'ing')).toEqual(false)
    expect(hx.startsWith('test-string', '')).toEqual(true)
    expect(hx.startsWith('test-string', 'test')).toEqual(true)

  it 'tween: should work', ->
    expect(hx.tween(0, 10, 0.5)).toBeCloseTo(5)
    expect(hx.tween(0, 10, 1.5)).toBeCloseTo(15)
    expect(hx.tween(0, -3, 0.1)).toBeCloseTo(-0.3)

  it 'isObject: should work', ->
    class A
      constructor: ->

    expect(hx.isObject(new A)).toEqual(true)
    expect(hx.isObject({})).toEqual(true)
    expect(hx.isObject(document.createElement('div'))).toEqual(true)
    expect(hx.isObject(window)).toEqual(true)
    expect(hx.isObject(->)).toEqual(false)
    expect(hx.isObject("")).toEqual(false)
    expect(hx.isObject(123)).toEqual(false)
    expect(hx.isObject(/a/)).toEqual(true)
    expect(hx.isObject([])).toEqual(false)

  it 'isPlainObject: should work', ->
    class A
      constructor: ->

    expect(hx.isPlainObject(new A)).toEqual(false)
    expect(hx.isPlainObject({})).toEqual(true)
    expect(hx.isPlainObject(document.createElement('div'))).toEqual(false)
    expect(hx.isPlainObject(window)).toEqual(false)
    expect(hx.isPlainObject(->)).toEqual(false)
    expect(hx.isPlainObject("")).toEqual(false)
    expect(hx.isPlainObject(123)).toEqual(false)
    expect(hx.isPlainObject(/a/)).toEqual(false)
    expect(hx.isPlainObject([])).toEqual(false)
    expect(hx.isPlainObject(null)).toEqual(false)

  describe 'merge', ->

    it 'should work', ->
      class A
        constructor: -> @a = 1

      expect(hx.merge({a: {b: 2, c: {d: 3}}}))
        .toEqual({a: {b: 2, c: {d: 3}}})

      expect(hx.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: 'value'}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      expect(hx.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: new A}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: {}}}})

      expect(hx.merge({a: {b: 2}}, {a: {c: 3}}))
        .toEqual({a: {b: 2, c: 3}})

      expect(hx.merge({a: {b: 2}}, {a: 2}))
        .toEqual({a: 2})

      expect(hx.merge({a: {b: 2}}, {a: {c: new A}}))
        .toEqual({a: {b: 2, c: {}}})

      expect(hx.merge({a: {b: 2}}, {}))
        .toEqual({a: {b: 2}})

      expect(hx.merge({a: {b: 2}}, new A))
        .toEqual({a: {b: 2}})

    it 'should work when not retaining undefined values', ->
      class A
        constructor: -> @a = 1

      expect(hx.merge.defined({a: {b: 2, c: {d: 3}}}))
        .toEqual({a: {b: 2, c: {d: 3}}})

      expect(hx.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: 'value'}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      expect(hx.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: new A}}}))
        .toEqual({a: {b: 'hello', c: {d: 4, e: {}}}})

      expect(hx.merge.defined({a: {b: 2}}, {a: {c: 3}}))
        .toEqual({a: {b: 2, c: 3}})

      expect(hx.merge.defined({a: {b: 2}}, {a: 2}))
        .toEqual({a: 2})

      expect(hx.merge.defined({a: {b: 2}}, {a: {c: new A}}))
        .toEqual({a: {b: 2, c: {}}})

      expect(hx.merge.defined({a: {b: 2}}, {}))
        .toEqual({a: {b: 2}})

      expect(hx.merge.defined({a: {b: 2}}, new A))
        .toEqual({a: {b: 2}})

    it 'should retain undefined values', ->
      expect(hx.merge({'a': {'b': 5}}, {'a': {'b': undefined}}, {'b': 3}))
        .toEqual({'a': {'b': undefined}, 'b': 3})

    it 'bug check - should not throw an error when null is present', ->
      expect( -> hx.merge({}, {a: null}) ).not.toThrow()

    it 'merging with null should work', ->
      expect(hx.merge({a: '5'}, {a: null})).toEqual({a: null})

    it 'merge.defined should not retain undefined values', ->
      expect(hx.merge.defined({'a': {'b': 5}},
                              {'a': {'b': undefined}}, {'b': 3}))
        .toEqual({'a': {'b': 5}, 'b': 3})

    it 'shallowMerge should work', ->

      expect(hx.shallowMerge({'a': 1})).toEqual({'a': 1})
      expect(hx.shallowMerge({'a': 1}, {'a': 2})).toEqual({'a': 2})
      expect(hx.shallowMerge({'a': 1}, {'a': 2}, {'b': 3}))
        .toEqual({'a': 2, 'b': 3})

      src = {'a': 1}
      expect(hx.shallowMerge(src)).not.toBe(src)

      expect(hx.shallowMerge()).toEqual({})

      class A
        constructor: -> @a = 1

      expect(hx.shallowMerge(new A)).toEqual({})

      a = new A
      expect(hx.shallowMerge({'a': 1, 'b': a})).toEqual({'a': 1, b: a})


    it 'shallowMerge.defined should work', ->

      expect(hx.shallowMerge.defined({'a': 1})).toEqual({'a': 1})
      expect(hx.shallowMerge.defined({'a': 1}, {'a': 2})).toEqual({'a': 2})
      expect(hx.shallowMerge.defined({'a': 1}, {'a': 2}, {'b': 3}))
        .toEqual({'a': 2, 'b': 3})
      expect(hx.shallowMerge.defined({'a': 1}, {'a': [1, 2, 3]}, {'b': 3}))
        .toEqual({'a': [1, 2, 3], 'b': 3})

      src = {'a': 1}
      expect(hx.shallowMerge.defined(src)).not.toBe(src)

      expect(hx.shallowMerge()).toEqual({})

      class A
        constructor: -> @a = 1

      expect(hx.shallowMerge.defined(new A)).toEqual({})

      a = new A
      expect(hx.shallowMerge.defined({'a': 1, 'b': a})).toEqual({'a': 1, b: a})

    it 'shallowMerge: should retain undefined values', ->
      expect(hx.shallowMerge({'a': 1}, {'a': undefined}, {'b': 3}))
        .toEqual({'a': undefined, 'b': 3})

    it 'shallowMerge.defined: shallow merge should ignore undefined values', ->
      expect(hx.shallowMerge.defined({'a': 1}, {'a': undefined}, {'b': 3}))
        .toEqual({'a': 1, 'b': 3})

  it 'shallowClone should work', ->
    expect(hx.shallowClone(1)).toEqual(1)
    expect(hx.shallowClone('string')).toEqual('string')

    f = ->
    expect(hx.shallowClone(f)).toEqual(f)

    expect(hx.shallowClone({a: 1})).toEqual({a: 1})
    expect(hx.shallowClone({a: 5, b: 1})).toEqual({a: 5, b: 1})
    obj = {c: 3}
    expect(hx.shallowClone({a: 5, b: obj})).toEqual({a: 5, b: obj})
    expect(hx.shallowClone({a: 5, b: obj}).b).toBe(obj)

    expect(hx.shallowClone([1, 2, 3])).toEqual([1, 2, 3])

    l = new hx.List [1, "a", {}]
    s = new hx.Set [1, "a", {}]
    m = new hx.Map [["a", 5], [6, {}]]

    d = new Date
    expect hx.shallowClone d
      .toEqual d

    expect(hx.shallowClone(l).entries()).toEqual(l.entries())
    expect(hx.shallowClone(s).entries()).toEqual(s.entries())
    expect(hx.shallowClone(m).entries()).toEqual(m.entries())

  it '(deep) clone should work', ->
    expect(hx.clone(1)).toEqual(1)
    expect(hx.clone('string')).toEqual('string')

    d = new Date
    expect hx.clone d
      .toEqual d

    f = ->
    expect(hx.clone(f)).toEqual(f)

    expect(hx.clone({a: 1})).toEqual({a: 1})
    expect(hx.clone({a: 5, b: 1})).toEqual({a: 5, b: 1})
    obj = {c: 3}
    expect(hx.clone({a: 5, b: obj})).toEqual({a: 5, b: {c: 3}})
    expect(hx.clone({a: 5, b: obj}).b).not.toBe(obj)

    expect(hx.clone([1, 2, 3])).toEqual([1, 2, 3])
    l = new hx.List [1, "a", {}]
    s = new hx.Set [1, "a", {}]
    m = new hx.Map [["a", 5], [6, {}]]


    expect(hx.clone(l).entries()).toEqual(l.entries())
    expect(hx.clone(s).entries()).toEqual(s.entries())
    expect(hx.clone(m).entries()).toEqual(m.entries())



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
    container = hx.cleanNode(container)
    expect(container.childNodes.length).toEqual(2)
    expect(container.innerHTML).toEqual('<div></div><div>Dave<div></div></div>')
    expect(inner.childNodes.length).toEqual(2)
    expect(inner.innerHTML).toEqual('Dave<div></div>')
    expect(inner.childNodes[0].nodeValue).toEqual('Dave')
    expect(inner.childNodes[1].innerHTML).toEqual('')
