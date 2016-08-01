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

    hx.transpose(array).should.eql(transposed)

  it "transpose: roundtrip", ->
    array = [
      [1,  2,  3,  4]
      [5,  6,  7,  8]
      [9, 10, 11, 12]
    ]

    hx.transpose(hx.transpose(array)).should.eql(array)

  it "transpose: return identity for 1D array", ->
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    hx.transpose(array).should.eql(array)

  it "transpose: return empty array for empty array argument", ->
    hx.transpose([]).should.eql([])

  it "transpose: return undefined for non array argument", ->
    should.not.exist(hx.transpose(false))

  it "transpose: work with strings", ->
    hx.transpose(["one", "two"]).should.eql([['o', 't'], ['n', 'w'], ['e', 'o']])

  it "unique: work with numbers", ->
    hx.unique([1, 2, 3, 1, 2, 3, 4]).should.eql([1, 2, 3, 4])

  it "unique: work with strings", ->
    hx.unique(['1', '2', '3', '1', '2', '3', '4']).should.eql(['1', '2', '3', '4'])

  it "unique: work with booleans", ->
    hx.unique([true, false, true]).should.eql([true, false])
    hx.unique([true, true]).should.eql([true])
    hx.unique([false, false, false]).should.eql([false])

  it 'zip: works', ->
    hx.zip([[1, 2], [3, 4]]).should.eql([[1, 3], [2, 4]])
    hx.zip([[1, 2, 3], [4, 5, 6]]).should.eql([[1, 4], [2, 5], [3, 6]])

  it 'zip: works with more than two arrays', ->
    arrays = hx.range(10).map(-> hx.range(10))
    expected = hx.range(10).map( (i) -> hx.range(10).map(-> i))
    hx.zip(arrays).should.eql(expected)

  it 'zip: doesnt blow up when given stupid arguments', ->
    hx.zip().should.eql([])
    hx.zip([]).should.eql([])
    hx.zip([1, 2, 3]).should.eql([])
    hx.zip([[], []]).should.eql([])

  it 'hash: should give consistent results', ->
    hx.hash('thing').should.equal(hx.hash('thing'))
    hx.hash('thing2').should.equal(hx.hash('thing2'))
    hx.hash('thing3').should.equal(hx.hash('thing3'))
    hx.hash('thing2').should.not.equal(hx.hash('thing3'))

  it 'hash: should return a number', ->
    hx.hash('thing').should.be.a('number')

  it 'hash: should not return a number > max', ->
    for i in [0..100]
      hx.hash(hx.randomId(), 5).should.be.below(5)

  it 'supports: should return boolean', ->
    hx.supports('touch').should.be.a('boolean')
    hx.supports('date').should.be.a('boolean')

    # check the cached branches dont error
    hx.supports('touch').should.equal(hx.supports('touch'))
    hx.supports('date').should.equal(hx.supports('date'))

  it 'deprecatedWarning', ->
    warn = chai.spy.on(console, 'warn')
    trace = chai.spy.on(console, 'trace')
    hx.deprecatedWarning('something', 'do something else')
    warn.should.have.been.called()
    trace.should.have.been.called()

  it 'deprecatedWarning', ->
    trace = chai.spy.on(console, 'trace')
    hx.deprecatedWarning('something')
    trace.should.have.been.called()

  it 'consoleWarning', ->
    warn = chai.spy.on(console, 'warn')
    trace = chai.spy.on(console, 'trace')
    hx.consoleWarning('something', 'you are doing something silly')
    warn.should.have.been.called()
    trace.should.have.been.called()

  it 'consoleWarning', ->
    trace = chai.spy.on(console, 'trace')
    hx.consoleWarning('something')
    trace.should.have.been.called()

  it 'clamp: should work', ->
    hx.clamp(0, 10, 15).should.equal(10)
    hx.clamp(0, 10, 5).should.equal(5)
    hx.clamp(0, 10, 10).should.equal(10)
    hx.clamp(0, 10, -15).should.equal(0)
    hx.clamp(0, 10, 0).should.equal(0)

  it 'clampUnit: should work', ->
    hx.clampUnit(0.15).should.equal(0.15)
    hx.clampUnit(0.0).should.equal(0)
    hx.clampUnit(-0.15).should.equal(0)
    hx.clampUnit(1.15).should.equal(1)
    hx.clampUnit(2.15).should.equal(1)

  it 'randomId: should work', ->
    hx.randomId().should.be.a('string')
    hx.randomId().length.should.equal(16)
    hx.randomId(24).length.should.equal(24)
    hx.randomId(24, 'A').should.equal('AAAAAAAAAAAAAAAAAAAAAAAA')

  it 'min: should work', ->
    hx.min().should.equal(Infinity)
    hx.min([]).should.equal(Infinity)
    hx.min([1, 5, 2]).should.equal(1)
    hx.min([undefined, 5, 2]).should.equal(2)
    hx.min([1, undefined, 5, 2]).should.equal(1)

  it 'minBy: should work', ->
    should.not.exist(hx.minBy())
    should.not.exist(hx.minBy([]))
    should.not.exist(hx.minBy([undefined, undefined, undefined]))
    hx.minBy([1, 2, 3, 4]).should.equal(1)
    hx.minBy([1, undefined, 3, 4]).should.equal(1)
    hx.minBy([5, 2, 3, 4]).should.equal(2)
    hx.minBy([5, 2, 3, 4, 1], (d) -> d).should.equal(1)
    hx.minBy([1, 5, undefined, 3, 4], (d) -> if d is undefined then undefined else -d).should.equal(5)
    hx.minBy([undefined, 1, 5, 3, 4], (d) -> if d is undefined then undefined else -d).should.equal(5)

  it 'max: should work', ->
    hx.max().should.equal(-Infinity)
    hx.max([]).should.equal(-Infinity)
    hx.max([1, 5, 2]).should.equal(5)
    hx.max([undefined, 5, 2]).should.equal(5)
    hx.max([1, undefined, 5, 2]).should.equal(5)

  it 'maxBy: should work', ->
    should.not.exist(hx.maxBy())
    should.not.exist(hx.maxBy([]))
    should.not.exist(hx.maxBy([undefined, undefined, undefined]))
    hx.maxBy([1, 2, 3, 4]).should.equal(4)
    hx.maxBy([1, undefined, 3, 4]).should.equal(4)
    hx.maxBy([1, 5, 3, 4]).should.equal(5)
    hx.maxBy([5, 2, 3, 4, 1], (d) -> -d).should.equal(1)
    hx.maxBy([5, 1, undefined, 5, 4], (d) -> if d is undefined then undefined else -d).should.equal(1)
    hx.maxBy([undefined, 5, 1, 5, 4], (d) -> if d is undefined then undefined else -d).should.equal(1)

  it 'range should work', ->
    hx.range(10).should.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  it 'sum should work', ->
    hx.sum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).should.equal(45)

  it "flatten: should flatten a 2d array into a 1d array", ->
    hx.flatten([[1, 2], [2, 3], [3, 10]]).should.eql([1, 2, 2, 3, 3, 10])

  it "cycle: should work", ->
    hx.cycle([0, 1, 2], 0).should.equal(0)
    hx.cycle([0, 4, 8], 1).should.equal(4)
    hx.cycle([0, 1, 2], 20).should.equal(2)
    hx.cycle([0, 1, 2], 0).should.equal(0)

  it "hashList: should work", ->
    hx.hashList([0, 1, 2], "thing-1").should.equal(hx.hashList([0, 1, 2], "thing-1"))
    hx.hashList([0, 1, 2], "thing-2").should.be.a('number')
    hx.hashList([0, 1, 2], "thing-3").should.be.a('number')
    hx.hashList([0, 1, 2], "thing-4").should.be.a('number')

  it "find: should work", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    hx.find(values, (d) -> d.v is 2).should.equal(values[2])
    hx.find(values, (d) -> d.v is 5).should.equal(values[0])
    hx.find(values, (d) -> d.v is 7).should.equal(values[1])

  it "find: should return undefined when nothing is found", ->
    values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
    should.not.exist(hx.find(values, (d) -> false))

  it "isString: should work", ->
    hx.isString("this is a string").should.equal(true)
    hx.isString(new String("this is a string")).should.equal(true)
    hx.isString(undefined).should.equal(false)
    hx.isString(null).should.equal(false)
    hx.isString(123).should.equal(false)
    hx.isString({}).should.equal(false)
    hx.isString([]).should.equal(false)
    hx.isString(/b/).should.equal(false)
    hx.isString(->).should.equal(false)
    hx.isString(true).should.equal(false)
    hx.isString(false).should.equal(false)

  it "isFunction: should work", ->
    hx.isFunction("this is a string").should.equal(false)
    hx.isFunction(new String("this is a string")).should.equal(false)
    hx.isFunction(undefined).should.equal(false)
    hx.isFunction(null).should.equal(false)
    hx.isFunction(123).should.equal(false)
    hx.isFunction({}).should.equal(false)
    hx.isFunction([]).should.equal(false)
    hx.isFunction(/b/).should.equal(false)
    hx.isFunction(->).should.equal(true)
    hx.isFunction(true).should.equal(false)
    hx.isFunction(false).should.equal(false)

  it "isArray: should work", ->
    hx.isArray("this is a string").should.equal(false)
    hx.isArray(new String("this is a string")).should.equal(false)
    hx.isArray(undefined).should.equal(false)
    hx.isArray(null).should.equal(false)
    hx.isArray(123).should.equal(false)
    hx.isArray({}).should.equal(false)
    hx.isArray([]).should.equal(true)
    hx.isArray(/b/).should.equal(false)
    hx.isArray(->).should.equal(false)
    hx.isArray(true).should.equal(false)
    hx.isArray(false).should.equal(false)

  it "isBoolean: should work", ->
    hx.isBoolean("this is a string").should.equal(false)
    hx.isBoolean(new String("this is a string")).should.equal(false)
    hx.isBoolean(undefined).should.equal(false)
    hx.isBoolean(null).should.equal(false)
    hx.isBoolean(123).should.equal(false)
    hx.isBoolean({}).should.equal(false)
    hx.isBoolean([]).should.equal(false)
    hx.isBoolean(/b/).should.equal(false)
    hx.isBoolean(->).should.equal(false)
    hx.isBoolean(true).should.equal(true)
    hx.isBoolean(false).should.equal(true)

  it "groupBy: should work", ->
    values = [
      {key: 'a', value: 1},
      {key: 'a', value: 2},
      {key: 'a', value: 3},
      {key: 'b', value: 4},
      {key: 'b', value: 5},
      {key: 'c', value: 6}
    ]

    hx.groupBy(values, (d) -> d.key).should.eql([
      ['a', [{key: 'a', value: 1}, {key: 'a', value: 2}, {key: 'a', value: 3}]],
      ['b', [{key: 'b', value: 4}, {key: 'b', value: 5} ]],
      ['c', [{key: 'c', value: 6}]]
    ])

  it "endsWith: should work", ->
    hx.endsWith('test-string', 'ing').should.equal(true)
    hx.endsWith('test-string', '').should.equal(true)
    hx.endsWith('test-string', 'test').should.equal(false)

  it "startsWith: should work", ->
    hx.startsWith('test-string', 'ing').should.equal(false)
    hx.startsWith('test-string', '').should.equal(true)
    hx.startsWith('test-string', 'test').should.equal(true)

  it 'tween: should work', ->
    hx.tween(0, 10, 0.5).should.be.closeTo(5, 0.1)
    hx.tween(0, 10, 1.5).should.be.closeTo(15, 0.1)
    hx.tween(0, -3, 0.1).should.be.closeTo(-0.3, 0.1)

  it 'isObject: should work', ->
    class A
      constructor: ->

    hx.isObject(new A).should.equal(true)
    hx.isObject({}).should.equal(true)
    hx.isObject(document.createElement('div')).should.equal(true)
    hx.isObject(window).should.equal(true)
    hx.isObject(->).should.equal(false)
    hx.isObject("").should.equal(false)
    hx.isObject(123).should.equal(false)
    hx.isObject(/a/).should.equal(true)
    hx.isObject([]).should.equal(false)
    hx.isObject(undefined).should.equal(false)
    hx.isObject(null).should.equal(false)

  it 'isPlainObject: should work', ->
    class A
      constructor: ->

    hx.isPlainObject(new A).should.equal(false)
    hx.isPlainObject({}).should.equal(true)
    hx.isPlainObject(document.createElement('div')).should.equal(false)
    hx.isPlainObject(window).should.equal(false)
    hx.isPlainObject(->).should.equal(false)
    hx.isPlainObject("").should.equal(false)
    hx.isPlainObject(123).should.equal(false)
    hx.isPlainObject(/a/).should.equal(false)
    hx.isPlainObject([]).should.equal(false)
    hx.isPlainObject(null).should.equal(false)
    hx.isPlainObject(undefined).should.equal(false)

  it 'isNumber: should work', ->
    class A
      constructor: ->

    hx.isNumber(new A).should.equal(false)
    hx.isNumber({}).should.equal(false)
    hx.isNumber(document.createElement('div')).should.equal(false)
    hx.isNumber(window).should.equal(false)
    hx.isNumber(->).should.equal(false)
    hx.isNumber("").should.equal(false)
    hx.isNumber(123).should.equal(true)
    hx.isNumber(NaN).should.equal(true)
    hx.isNumber(/a/).should.equal(false)
    hx.isNumber([]).should.equal(false)
    hx.isNumber(undefined).should.equal(false)
    hx.isNumber(null).should.equal(false)

  describe 'merge', ->

    it 'should work', ->
      class A
        constructor: -> @a = 1

      hx.merge({a: {b: 2, c: {d: 3}}})
       .should.eql({a: {b: 2, c: {d: 3}}})

      hx.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: 'value'}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      hx.merge({a: {b: 2, c: {d: 3}}},
                      {a: {b: 'hello', c: {d: 4, e: new A}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: {}}}})

      hx.merge({a: {b: 2}}, {a: {c: 3}})
       .should.eql({a: {b: 2, c: 3}})

      hx.merge({a: {b: 2}}, {a: 2})
       .should.eql({a: 2})

      hx.merge({a: {b: 2}}, {a: {c: new A}})
       .should.eql({a: {b: 2, c: {}}})

      hx.merge({a: {b: 2}}, {})
       .should.eql({a: {b: 2}})

      hx.merge({a: {b: 2}}, new A)
       .should.eql({a: {b: 2}})

    it 'should work when not retaining undefined values', ->
      class A
        constructor: -> @a = 1

      hx.merge.defined({a: {b: 2, c: {d: 3}}})
       .should.eql({a: {b: 2, c: {d: 3}}})

      hx.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: 'value'}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: 'value'}}})

      hx.merge.defined({a: {b: 2, c: {d: 3}}},
                              {a: {b: 'hello', c: {d: 4, e: new A}}})
       .should.eql({a: {b: 'hello', c: {d: 4, e: {}}}})

      hx.merge.defined({a: {b: 2}}, {a: {c: 3}})
       .should.eql({a: {b: 2, c: 3}})

      hx.merge.defined({a: {b: 2}}, {a: 2})
       .should.eql({a: 2})

      hx.merge.defined({a: {b: 2}}, {a: {c: new A}})
       .should.eql({a: {b: 2, c: {}}})

      hx.merge.defined({a: {b: 2}}, {})
       .should.eql({a: {b: 2}})

      hx.merge.defined({a: {b: 2}}, new A)
       .should.eql({a: {b: 2}})

    it 'should retain undefined values', ->
      hx.merge({'a': {'b': 5}}, {'a': {'b': undefined}}, {'b': 3})
       .should.eql({'a': {'b': undefined}, 'b': 3})

    it 'bug check - should not throw an error when null is present', ->
       -> hx.merge({}, {a: null}) .to.not.throw()

    it 'merging with null should work', ->
      hx.merge({a: '5'}, {a: null}).should.eql({a: null})

    it 'merge.defined should not retain undefined values', ->
      hx.merge.defined({'a': {'b': 5}},
                              {'a': {'b': undefined}}, {'b': 3})
       .should.eql({'a': {'b': 5}, 'b': 3})

    it 'shallowMerge should work', ->

      hx.shallowMerge({'a': 1}).should.eql({'a': 1})
      hx.shallowMerge({'a': 1}, {'a': 2}).should.eql({'a': 2})
      hx.shallowMerge({'a': 1}, {'a': 2}, {'b': 3})
       .should.eql({'a': 2, 'b': 3})

      src = {'a': 1}
      hx.shallowMerge(src).should.not.equal(src)

      hx.shallowMerge().should.eql({})

      class A
        constructor: -> @a = 1

      hx.shallowMerge(new A).should.eql({})

      a = new A
      hx.shallowMerge({'a': 1, 'b': a}).should.eql({'a': 1, b: a})


    it 'shallowMerge.defined should work', ->

      hx.shallowMerge.defined({'a': 1}).should.eql({'a': 1})
      hx.shallowMerge.defined({'a': 1}, {'a': 2}).should.eql({'a': 2})
      hx.shallowMerge.defined({'a': 1}, {'a': 2}, {'b': 3})
       .should.eql({'a': 2, 'b': 3})
      hx.shallowMerge.defined({'a': 1}, {'a': [1, 2, 3]}, {'b': 3})
       .should.eql({'a': [1, 2, 3], 'b': 3})

      src = {'a': 1}
      hx.shallowMerge.defined(src).should.not.equal(src)

      hx.shallowMerge().should.eql({})

      class A
        constructor: -> @a = 1

      hx.shallowMerge.defined(new A).should.eql({})

      a = new A
      hx.shallowMerge.defined({'a': 1, 'b': a}).should.eql({'a': 1, b: a})

    it 'shallowMerge: should retain undefined values', ->
      hx.shallowMerge({'a': 1}, {'a': undefined}, {'b': 3})
       .should.eql({'a': undefined, 'b': 3})

    it 'shallowMerge.defined: shallow merge should ignore undefined values', ->
      hx.shallowMerge.defined({'a': 1}, {'a': undefined}, {'b': 3})
       .should.eql({'a': 1, 'b': 3})

  it 'shallowClone should work', ->
    hx.shallowClone(1).should.equal(1)
    hx.shallowClone('string').should.equal('string')

    f = ->
    hx.shallowClone(f).should.equal(f)

    hx.shallowClone({a: 1}).should.eql({a: 1})
    hx.shallowClone({a: 5, b: 1}).should.eql({a: 5, b: 1})
    obj = {c: 3}
    hx.shallowClone({a: 5, b: obj}).should.eql({a: 5, b: obj})
    hx.shallowClone({a: 5, b: obj}).b.should.eql(obj)

    hx.shallowClone([1, 2, 3]).should.eql([1, 2, 3])

    l = new hx.List [1, "a", {}]
    s = new hx.Set [1, "a", {}]
    m = new hx.Map [["a", 5], [6, {}]]

    d = new Date
    hx.shallowClone(d).should.not.equal(d)
    hx.shallowClone(d).should.eql(d)

    hx.shallowClone(l).entries().should.eql(l.entries())
    hx.shallowClone(s).entries().should.eql(s.entries())
    hx.shallowClone(m).entries().should.eql(m.entries())

  it '(deep) clone should work', ->
    hx.clone(1).should.equal(1)
    hx.clone('string').should.equal('string')

    d = new Date
    hx.clone(d).should.not.equal(d)
    hx.clone(d).should.eql(d)

    f = ->
    hx.clone(f).should.eql(f)

    hx.clone({a: 1}).should.eql({a: 1})
    hx.clone({a: 5, b: 1}).should.eql({a: 5, b: 1})
    obj = {c: 3}
    hx.clone({a: 5, b: obj}).should.eql({a: 5, b: {c: 3}})
    hx.clone({a: 5, b: obj}).b.should.not.equal(obj)

    hx.clone([1, 2, 3]).should.eql([1, 2, 3])
    l = new hx.List [1, "a", {}]
    s = new hx.Set [1, "a", {}]
    m = new hx.Map [["a", 5], [6, {}]]


    hx.clone(l).entries().should.eql(l.entries())
    hx.clone(s).entries().should.eql(s.entries())
    hx.clone(m).entries().should.eql(m.entries())



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
    container = hx.cleanNode(container)
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
