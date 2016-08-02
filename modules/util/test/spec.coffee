util = require('modules/util/main')
HSet = require('modules/set/main')
HMap = require('modules/map/main')
HList = require('modules/list/main')
chai = require('chai')
should = chai.should()

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

    util.transpose(array).should.eql(transposed)

  it "transpose: roundtrip", ->
    array = [
      [1,  2,  3,  4]
      [5,  6,  7,  8]
      [9, 10, 11, 12]
    ]

    util.transpose(util.transpose(array)).should.eql(array)

  it "transpose: return identity for 1D array", ->
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    util.transpose(array).should.eql(array)

  it "transpose: return empty array for empty array argument", ->
    util.transpose([]).should.eql([])

  it "transpose: return undefined for non array argument", ->
    should.not.exist(util.transpose(false))

  it "transpose: work with strings", ->
    util.transpose(["one", "two"]).should.eql([['o', 't'], ['n', 'w'], ['e', 'o']])

  it "unique: work with numbers", ->
    util.unique([1, 2, 3, 1, 2, 3, 4]).should.eql([1, 2, 3, 4])

  it "unique: work with strings", ->
    util.unique(['1', '2', '3', '1', '2', '3', '4']).should.eql(['1', '2', '3', '4'])

  it "unique: work with booleans", ->
    util.unique([true, false, true]).should.eql([true, false])
    util.unique([true, true]).should.eql([true])
    util.unique([false, false, false]).should.eql([false])

  it 'zip: works', ->
    util.zip([[1, 2], [3, 4]]).should.eql([[1, 3], [2, 4]])
    util.zip([[1, 2, 3], [4, 5, 6]]).should.eql([[1, 4], [2, 5], [3, 6]])

  it 'zip: works with more than two arrays', ->
    arrays = util.range(10).map(-> util.range(10))
    expected = util.range(10).map( (i) -> util.range(10).map(-> i))
    util.zip(arrays).should.eql(expected)

  it 'zip: doesnt blow up when given stupid arguments', ->
    util.zip().should.eql([])
    util.zip([]).should.eql([])
    util.zip([1, 2, 3]).should.eql([])
    util.zip([[], []]).should.eql([])

  it 'hash: should give consistent results', ->
    util.hash('thing').should.equal(util.hash('thing'))
    util.hash('thing2').should.equal(util.hash('thing2'))
    util.hash('thing3').should.equal(util.hash('thing3'))
    util.hash('thing2').should.not.equal(util.hash('thing3'))

  it 'hash: should return a number', ->
    util.hash('thing').should.be.a('number')

  it 'hash: should not return a number > max', ->
    for i in [0..100]
      util.hash(util.randomId(), 5).should.be.below(5)

  it 'supports: should return boolean', ->
    util.supports('touch').should.be.a('boolean')
    util.supports('date').should.be.a('boolean')

    # check the cached branches dont error
    util.supports('touch').should.equal(util.supports('touch'))
    util.supports('date').should.equal(util.supports('date'))

  it 'deprecatedWarning', ->
    warn = chai.spy.on(console, 'warn')
    trace = chai.spy.on(console, 'trace')
    util.deprecatedWarning('something', 'do something else')
    warn.should.have.been.called()
    trace.should.have.been.called()

  it 'deprecatedWarning', ->
    trace = chai.spy.on(console, 'trace')
    util.deprecatedWarning('something')
    trace.should.have.been.called()

  it 'consoleWarning', ->
    warn = chai.spy.on(console, 'warn')
    trace = chai.spy.on(console, 'trace')
    util.consoleWarning('something', 'you are doing something silly')
    warn.should.have.been.called()
    trace.should.have.been.called()

  it 'consoleWarning', ->
    trace = chai.spy.on(console, 'trace')
    util.consoleWarning('something')
    trace.should.have.been.called()

  it 'clamp: should work', ->
    util.clamp(0, 10, 15).should.equal(10)
    util.clamp(0, 10, 5).should.equal(5)
    util.clamp(0, 10, 10).should.equal(10)
    util.clamp(0, 10, -15).should.equal(0)
    util.clamp(0, 10, 0).should.equal(0)

  it 'clampUnit: should work', ->
    util.clampUnit(0.15).should.equal(0.15)
    util.clampUnit(0.0).should.equal(0)
    util.clampUnit(-0.15).should.equal(0)
    util.clampUnit(1.15).should.equal(1)
    util.clampUnit(2.15).should.equal(1)

  it 'randomId: should work', ->
    util.randomId().should.be.a('string')
    util.randomId().length.should.equal(16)
    util.randomId(24).length.should.equal(24)
    util.randomId(24, 'A').should.equal('AAAAAAAAAAAAAAAAAAAAAAAA')

  it 'min: should work', ->
    util.min().should.equal(Infinity)
    util.min([]).should.equal(Infinity)
    util.min([1, 5, 2]).should.equal(1)
    util.min([undefined, 5, 2]).should.equal(2)
    util.min([1, undefined, 5, 2]).should.equal(1)

  it 'minBy: should work', ->
    should.not.exist(util.minBy())
    should.not.exist(util.minBy([]))
    should.not.exist(util.minBy([undefined, undefined, undefined]))
    util.minBy([1, 2, 3, 4]).should.equal(1)
    util.minBy([1, undefined, 3, 4]).should.equal(1)
    util.minBy([5, 2, 3, 4]).should.equal(2)
    util.minBy([5, 2, 3, 4, 1], (d) -> d).should.equal(1)
    util.minBy([1, 5, undefined, 3, 4], (d) -> if d is undefined then undefined else -d).should.equal(5)
    util.minBy([undefined, 1, 5, 3, 4], (d) -> if d is undefined then undefined else -d).should.equal(5)

  it 'argmin: should return the index of the smallest defined value', ->
    util.argmin([1, 4, -5, 9]).should.equal(2)
    util.argmin([undefined, -5, 9]).should.equal(1)
    util.argmin([1, undefined, -5, 9]).should.equal(2)
    util.argmin([-1, 5, -9], (d) -> -d).should.equal(1)
    should.not.exist(util.argmin([undefined, undefined]))
    should.not.exist(util.argmin([]))
    should.not.exist(util.argmin())

  it 'max: should work', ->
    util.max().should.equal(-Infinity)
    util.max([]).should.equal(-Infinity)
    util.max([1, 5, 2]).should.equal(5)
    util.max([undefined, 5, 2]).should.equal(5)
    util.max([1, undefined, 5, 2]).should.equal(5)

  it 'maxBy: should work', ->
    should.not.exist(util.maxBy())
    should.not.exist(util.maxBy([]))
    should.not.exist(util.maxBy([undefined, undefined, undefined]))
    util.maxBy([1, 2, 3, 4]).should.equal(4)
    util.maxBy([1, undefined, 3, 4]).should.equal(4)
    util.maxBy([1, 5, 3, 4]).should.equal(5)
    util.maxBy([5, 2, 3, 4, 1], (d) -> -d).should.equal(1)
    util.maxBy([5, 1, undefined, 5, 4], (d) -> if d is undefined then undefined else -d).should.equal(1)
    util.maxBy([undefined, 5, 1, 5, 4], (d) -> if d is undefined then undefined else -d).should.equal(1)

  it 'argmax: should return the index of the largest defined value', ->
    util.argmax([1, 4, -5, 9]).should.equal(3)
    util.argmax([undefined, -5, 9]).should.equal(2)
    util.argmax([1, undefined, -5, 9]).should.equal(3)
    util.argmax([1, -5, 9], (d) -> -d).should.equal(1)
    should.not.exist(util.argmax([undefined, undefined]))
    should.not.exist(util.argmax([]))
    should.not.exist(util.argmax())

  it 'range should work', ->
    util.range(10).should.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  it 'sum should work', ->
    util.sum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).should.equal(45)

  it "flatten: should flatten a 2d array into a 1d array", ->
    util.flatten([[1, 2], [2, 3], [3, 10]]).should.eql([1, 2, 2, 3, 3, 10])

  it "cycle: should work", ->
    util.cycle([0, 1, 2], 0).should.equal(0)
    util.cycle([0, 4, 8], 1).should.equal(4)
    util.cycle([0, 1, 2], 20).should.equal(2)
    util.cycle([0, 1, 2], 0).should.equal(0)

  it "hashList: should work", ->
    util.hashList([0, 1, 2], "thing-1").should.equal(util.hashList([0, 1, 2], "thing-1"))
    util.hashList([0, 1, 2], "thing-2").should.be.a('number')
    util.hashList([0, 1, 2], "thing-3").should.be.a('number')
    util.hashList([0, 1, 2], "thing-4").should.be.a('number')

  it "find: should work", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    util.find(values, (d) -> d.v is 2).should.equal(values[2])
    util.find(values, (d) -> d.v is 5).should.equal(values[0])
    util.find(values, (d) -> d.v is 7).should.equal(values[1])

  it "find: should return undefined when nothing is found", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    should.not.exist(util.find(values, (d) -> false))

  it "isString: should work", ->
    util.isString("this is a string").should.equal(true)
    util.isString(new String("this is a string")).should.equal(true)
    util.isString(undefined).should.equal(false)
    util.isString(null).should.equal(false)
    util.isString(123).should.equal(false)
    util.isString({}).should.equal(false)
    util.isString([]).should.equal(false)
    util.isString(/b/).should.equal(false)
    util.isString(->).should.equal(false)
    util.isString(true).should.equal(false)
    util.isString(false).should.equal(false)

  it "isFunction: should work", ->
    util.isFunction("this is a string").should.equal(false)
    util.isFunction(new String("this is a string")).should.equal(false)
    util.isFunction(undefined).should.equal(false)
    util.isFunction(null).should.equal(false)
    util.isFunction(123).should.equal(false)
    util.isFunction({}).should.equal(false)
    util.isFunction([]).should.equal(false)
    util.isFunction(/b/).should.equal(false)
    util.isFunction(->).should.equal(true)
    util.isFunction(true).should.equal(false)
    util.isFunction(false).should.equal(false)

  it "isArray: should work", ->
    util.isArray("this is a string").should.equal(false)
    util.isArray(new String("this is a string")).should.equal(false)
    util.isArray(undefined).should.equal(false)
    util.isArray(null).should.equal(false)
    util.isArray(123).should.equal(false)
    util.isArray({}).should.equal(false)
    util.isArray([]).should.equal(true)
    util.isArray(/b/).should.equal(false)
    util.isArray(->).should.equal(false)
    util.isArray(true).should.equal(false)
    util.isArray(false).should.equal(false)

  it "isBoolean: should work", ->
    util.isBoolean("this is a string").should.equal(false)
    util.isBoolean(new String("this is a string")).should.equal(false)
    util.isBoolean(undefined).should.equal(false)
    util.isBoolean(null).should.equal(false)
    util.isBoolean(123).should.equal(false)
    util.isBoolean({}).should.equal(false)
    util.isBoolean([]).should.equal(false)
    util.isBoolean(/b/).should.equal(false)
    util.isBoolean(->).should.equal(false)
    util.isBoolean(true).should.equal(true)
    util.isBoolean(false).should.equal(true)


  it "groupBy: should work", ->
    values = [
      {key: 'a', value: 1},
      {key: 'a', value: 2},
      {key: 'a', value: 3},
      {key: 'b', value: 4},
      {key: 'b', value: 5},
      {key: 'c', value: 6}
    ]

    util.groupBy(values, (d) -> d.key).should.eql([
      ['a', [{key: 'a', value: 1}, {key: 'a', value: 2}, {key: 'a', value: 3}]],
      ['b', [{key: 'b', value: 4}, {key: 'b', value: 5} ]],
      ['c', [{key: 'c', value: 6}]]
    ])

  it "endsWith: should work", ->
    util.endsWith('test-string', 'ing').should.equal(true)
    util.endsWith('test-string', '').should.equal(true)
    util.endsWith('test-string', 'test').should.equal(false)

  it "startsWith: should work", ->
    util.startsWith('test-string', 'ing').should.equal(false)
    util.startsWith('test-string', '').should.equal(true)
    util.startsWith('test-string', 'test').should.equal(true)

  it 'tween: should work', ->
    util.tween(0, 10, 0.5).should.be.closeTo(5, 0.1)
    util.tween(0, 10, 1.5).should.be.closeTo(15, 0.1)
    util.tween(0, -3, 0.1).should.be.closeTo(-0.3, 0.1)


  it 'isObject: should work', ->
    class A
      constructor: ->

    util.isObject(new A).should.equal(true)
    util.isObject({}).should.equal(true)
    util.isObject(document.createElement('div')).should.equal(true)
    util.isObject(window).should.equal(true)
    util.isObject(->).should.equal(false)
    util.isObject("").should.equal(false)
    util.isObject(123).should.equal(false)
    util.isObject(/a/).should.equal(true)
    util.isObject([]).should.equal(false)
    util.isObject(undefined).should.equal(false)
    util.isObject(null).should.equal(false)

  it 'isPlainObject: should work', ->
    class A
      constructor: ->

    util.isPlainObject(new A).should.equal(false)
    util.isPlainObject({}).should.equal(true)
    util.isPlainObject(document.createElement('div')).should.equal(false)
    util.isPlainObject(window).should.equal(false)
    util.isPlainObject(->).should.equal(false)
    util.isPlainObject("").should.equal(false)
    util.isPlainObject(123).should.equal(false)
    util.isPlainObject(/a/).should.equal(false)
    util.isPlainObject([]).should.equal(false)
    util.isPlainObject(null).should.equal(false)
    util.isPlainObject(undefined).should.equal(false)

  it 'isNumber: should work', ->
    class A
      constructor: ->

    util.isNumber(new A).should.equal(false)
    util.isNumber({}).should.equal(false)
    util.isNumber(document.createElement('div')).should.equal(false)
    util.isNumber(window).should.equal(false)
    util.isNumber(->).should.equal(false)
    util.isNumber("").should.equal(false)
    util.isNumber(123).should.equal(true)
    util.isNumber(NaN).should.equal(true)
    util.isNumber(/a/).should.equal(false)
    util.isNumber([]).should.equal(false)
    util.isNumber(undefined).should.equal(false)
    util.isNumber(null).should.equal(false)

  describe 'merge', ->

    it 'should work', ->
      class A
        constructor: -> @a = 1

      util.merge({a: {b: 2, c: {d: 3}}})
       .should.eql({a: {b: 2, c: {d: 3}}})

      util.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: 'value'}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      util.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: new A}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: {}}}})

      util.merge({a: {b: 2}}, {a: {c: 3}})
       .should.eql({a: {b: 2, c: 3}})

      util.merge({a: {b: 2}}, {a: 2})
       .should.eql({a: 2})

      util.merge({a: {b: 2}}, {a: {c: new A}})
       .should.eql({a: {b: 2, c: {}}})

      util.merge({a: {b: 2}}, {})
       .should.eql({a: {b: 2}})

      util.merge({a: {b: 2}}, new A)
       .should.eql({a: {b: 2}})

    it 'should work when not retaining undefined values', ->
      class A
        constructor: -> @a = 1

      util.merge.defined({a: {b: 2, c: {d: 3}}})
       .should.eql({a: {b: 2, c: {d: 3}}})

      util.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: 'value'}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      util.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: new A}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: {}}}})

      util.merge.defined({a: {b: 2}}, {a: {c: 3}})
       .should.eql({a: {b: 2, c: 3}})

      util.merge.defined({a: {b: 2}}, {a: 2})
       .should.eql({a: 2})

      util.merge.defined({a: {b: 2}}, {a: {c: new A}})
       .should.eql({a: {b: 2, c: {}}})

      util.merge.defined({a: {b: 2}}, {})
       .should.eql({a: {b: 2}})

      util.merge.defined({a: {b: 2}}, new A)
       .should.eql({a: {b: 2}})

    it 'should retain undefined values', ->
      util.merge({'a': {'b': 5}}, {'a': {'b': undefined}}, {'b': 3})
       .should.eql({'a': {'b': undefined}, 'b': 3})

    it 'bug check - should not throw an error when null is present', ->
       -> util.merge({}, {a: null}) .to.not.throw()

    it 'merging with null should work', ->
      util.merge({a: '5'}, {a: null}).should.eql({a: null})

    it 'merge.defined should not retain undefined values', ->
      util.merge.defined({'a': {'b': 5}},
                              {'a': {'b': undefined}}, {'b': 3})
       .should.eql({'a': {'b': 5}, 'b': 3})

    it 'shallowMerge should work', ->

      util.shallowMerge({'a': 1}).should.eql({'a': 1})
      util.shallowMerge({'a': 1}, {'a': 2}).should.eql({'a': 2})
      util.shallowMerge({'a': 1}, {'a': 2}, {'b': 3})
       .should.eql({'a': 2, 'b': 3})

      src = {'a': 1}
      util.shallowMerge(src).should.not.equal(src)

      util.shallowMerge().should.eql({})

      class A
        constructor: -> @a = 1

      util.shallowMerge(new A).should.eql({})

      a = new A
      util.shallowMerge({'a': 1, 'b': a}).should.eql({'a': 1, b: a})


    it 'shallowMerge.defined should work', ->
      util.shallowMerge.defined({'a': 1}).should.eql({'a': 1})
      util.shallowMerge.defined({'a': 1}, {'a': 2}).should.eql({'a': 2})
      util.shallowMerge.defined({'a': 1}, {'a': 2}, {'b': 3})
       .should.eql({'a': 2, 'b': 3})
      util.shallowMerge.defined({'a': 1}, {'a': [1, 2, 3]}, {'b': 3})
       .should.eql({'a': [1, 2, 3], 'b': 3})

      src = {'a': 1}
      util.shallowMerge.defined(src).should.not.equal(src)

      util.shallowMerge().should.eql({})

      class A
        constructor: -> @a = 1

      util.shallowMerge.defined(new A).should.eql({})

      a = new A
      util.shallowMerge.defined({'a': 1, 'b': a}).should.eql({'a': 1, b: a})

    it 'shallowMerge: should retain undefined values', ->
      util.shallowMerge({'a': 1}, {'a': undefined}, {'b': 3})
       .should.eql({'a': undefined, 'b': 3})

    it 'shallowMerge.defined: shallow merge should ignore undefined values', ->
      util.shallowMerge.defined({'a': 1}, {'a': undefined}, {'b': 3})
       .should.eql({'a': 1, 'b': 3})

  it 'shallowClone should work', ->
    util.shallowClone(1).should.equal(1)
    util.shallowClone('string').should.equal('string')

    f = ->
    util.shallowClone(f).should.equal(f)

    util.shallowClone({a: 1}).should.eql({a: 1})
    util.shallowClone({a: 5, b: 1}).should.eql({a: 5, b: 1})
    obj = {c: 3}
    util.shallowClone({a: 5, b: obj}).should.eql({a: 5, b: obj})
    util.shallowClone({a: 5, b: obj}).b.should.eql(obj)

    util.shallowClone([1, 2, 3]).should.eql([1, 2, 3])

    l = new HList [1, "a", {}]
    s = new HSet [1, "a", {}]
    m = new HMap [["a", 5], [6, {}]]

    d = new Date
    util.shallowClone(d).should.not.equal(d)
    util.shallowClone(d).should.eql(d)

    util.shallowClone(l).entries().should.eql(l.entries())
    util.shallowClone(s).entries().should.eql(s.entries())
    util.shallowClone(m).entries().should.eql(m.entries())

  it '(deep) clone should work', ->

    util.clone(1).should.equal(1)
    util.clone('string').should.equal('string')

    d = new Date
    util.clone(d).should.not.equal(d)
    util.clone(d).should.eql(d)

    f = ->

    util.clone(f).should.eql(f)

    util.clone({a: 1}).should.eql({a: 1})
    util.clone({a: 5, b: 1}).should.eql({a: 5, b: 1})
    obj = {c: 3}
    util.clone({a: 5, b: obj}).should.eql({a: 5, b: {c: 3}})
    util.clone({a: 5, b: obj}).b.should.not.equal(obj)

    util.clone([1, 2, 3]).should.eql([1, 2, 3])
    l = new HList [1, "a", {}]
    s = new HSet [1, "a", {}]
    m = new HMap [["a", 5], [6, {}]]


    util.clone(l).entries().should.eql(l.entries())
    util.clone(s).entries().should.eql(s.entries())
    util.clone(m).entries().should.eql(m.entries())

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

    container.childNodes.length.should.equal(4)
    inner.childNodes.length.should.equal(3)
    container = util.cleanNode(container)
    container.childNodes.length.should.equal(2)
    container.innerHTML.should.equal('<div></div><div>Dave<div></div></div>')
    inner.childNodes.length.should.equal(2)
    inner.innerHTML.should.equal('Dave<div></div>')
    inner.childNodes[0].nodeValue.should.equal('Dave')
    inner.childNodes[1].innerHTML.should.equal('')

  it 'defined: should return true for non-null and non-undefined values', ->
    hx.defined(123).should.equal(true)
    hx.defined("123").should.equal(true)
    hx.defined({}).should.equal(true)
    hx.defined(/123/).should.equal(true)

  it 'defined: should return false for null and undefined', ->
    hx.defined(null).should.equal(false)
    hx.defined(undefined).should.equal(false)
