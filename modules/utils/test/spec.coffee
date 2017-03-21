import chai from 'chai'
import { installFakeTimers } from 'test/utils/fake-time'

import * as utils from 'modules/utils/main'
import { Set as HSet } from 'modules/set/main'
import { Map as HMap } from 'modules/map/main'
import { List as HList } from 'modules/list/main'

should = chai.should()

export default () ->
  describe "util", ->
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

      utils.transpose(array).should.eql(transposed)

    it "transpose: roundtrip", ->
      array = [
        [1,  2,  3,  4]
        [5,  6,  7,  8]
        [9, 10, 11, 12]
      ]

      utils.transpose(utils.transpose(array)).should.eql(array)

    it "transpose: return identity for 1D array", ->
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      utils.transpose(array).should.eql(array)

    it "transpose: return empty array for empty array argument", ->
      utils.transpose([]).should.eql([])

    it "transpose: return undefined for non array argument", ->
      should.not.exist(utils.transpose(false))

    it "transpose: work with strings", ->
      utils.transpose(["one", "two"]).should.eql([['o', 't'], ['n', 'w'], ['e', 'o']])

    it "unique: work with numbers", ->
      utils.unique([1, 2, 3, 1, 2, 3, 4]).should.eql([1, 2, 3, 4])

    it "unique: work with strings", ->
      utils.unique(['1', '2', '3', '1', '2', '3', '4']).should.eql(['1', '2', '3', '4'])

    it "unique: work with booleans", ->
      utils.unique([true, false, true]).should.eql([true, false])
      utils.unique([true, true]).should.eql([true])
      utils.unique([false, false, false]).should.eql([false])

    it 'zip: works', ->
      utils.zip([[1, 2], [3, 4]]).should.eql([[1, 3], [2, 4]])
      utils.zip([[1, 2, 3], [4, 5, 6]]).should.eql([[1, 4], [2, 5], [3, 6]])

    it 'zip: works with more than two arrays', ->
      arrays = utils.range(10).map(-> utils.range(10))
      expected = utils.range(10).map( (i) -> utils.range(10).map(-> i))
      utils.zip(arrays).should.eql(expected)

    it 'zip: doesnt blow up when given stupid arguments', ->
      utils.zip().should.eql([])
      utils.zip([]).should.eql([])
      utils.zip([1, 2, 3]).should.eql([])
      utils.zip([[], []]).should.eql([])

    it 'hash: should give consistent results', ->
      utils.hash('thing').should.equal(utils.hash('thing'))
      utils.hash('thing2').should.equal(utils.hash('thing2'))
      utils.hash('thing3').should.equal(utils.hash('thing3'))
      utils.hash('thing2').should.not.equal(utils.hash('thing3'))

    it 'hash: should return a number', ->
      utils.hash('thing').should.be.a('number')

    it 'hash: should not return a number > max', ->
      for i in [0..100]
        utils.hash(utils.randomId(), 5).should.be.below(5)

    it 'supports: should return boolean', ->
      utils.supports('touch').should.be.a('boolean')
      utils.supports('date').should.be.a('boolean')

      # check the cached branches dont error
      utils.supports('touch').should.equal(utils.supports('touch'))
      utils.supports('date').should.equal(utils.supports('date'))

    it 'identity: should return what it is passed', ->
      a = {}
      utils.identity(a).should.equal(a)
      utils.identity(true).should.equal(true)
      utils.identity('').should.equal('')
      should.not.exist(utils.identity(undefined))

    it 'debounce: should prevent a function being called multiple times in quick succession', ->
      clock = installFakeTimers()
      fn = chai.spy()
      debounce = utils.debounce(100, fn)
      fn.should.not.have.been.called()
      debounce()
      fn.should.not.have.been.called()
      clock.tick(50)
      debounce()
      fn.should.not.have.been.called()
      clock.tick(50)
      debounce()
      fn.should.not.have.been.called()
      clock.tick(101)
      fn.should.have.been.called()
      clock.restore()

    it 'debounce: shold pass through arguments', ->
      clock = installFakeTimers()
      fn = chai.spy()
      debounce = utils.debounce(100, fn)
      fn.should.not.have.been.called()
      debounce('bob')
      clock.tick(101)
      fn.should.have.been.called.with('bob')
      clock.restore()

    it 'clamp: should work', ->
      utils.clamp(0, 10, 15).should.equal(10)
      utils.clamp(0, 10, 5).should.equal(5)
      utils.clamp(0, 10, 10).should.equal(10)
      utils.clamp(0, 10, -15).should.equal(0)
      utils.clamp(0, 10, 0).should.equal(0)

    it 'clampUnit: should work', ->
      utils.clampUnit(0.15).should.equal(0.15)
      utils.clampUnit(0.0).should.equal(0)
      utils.clampUnit(-0.15).should.equal(0)
      utils.clampUnit(1.15).should.equal(1)
      utils.clampUnit(2.15).should.equal(1)

    it 'randomId: should work', ->
      utils.randomId().should.be.a('string')
      utils.randomId().length.should.equal(16)
      utils.randomId(24).length.should.equal(24)
      utils.randomId(24, 'A').should.equal('AAAAAAAAAAAAAAAAAAAAAAAA')

    it 'min: should work', ->
      utils.min().should.equal(Infinity)
      utils.min([]).should.equal(Infinity)
      utils.min([1, 5, 2]).should.equal(1)
      utils.min([undefined, 5, 2]).should.equal(2)
      utils.min([1, undefined, 5, 2]).should.equal(1)

    it 'minBy: should work', ->
      should.not.exist(utils.minBy())
      should.not.exist(utils.minBy([]))
      should.not.exist(utils.minBy([undefined, undefined, undefined]))
      utils.minBy([1, 2, 3, 4]).should.equal(1)
      utils.minBy([1, undefined, 3, 4]).should.equal(1)
      utils.minBy([5, 2, 3, 4]).should.equal(2)
      utils.minBy([5, 2, 3, 4, 1], (d) -> d).should.equal(1)
      utils.minBy([1, 5, undefined, 3, 4], (d) -> if d is undefined then undefined else -d).should.equal(5)
      utils.minBy([undefined, 1, 5, 3, 4], (d) -> if d is undefined then undefined else -d).should.equal(5)

    it 'argmin: should return the index of the smallest defined value', ->
      utils.argmin([1, 4, -5, 9]).should.equal(2)
      utils.argmin([undefined, -5, 9]).should.equal(1)
      utils.argmin([1, undefined, -5, 9]).should.equal(2)
      utils.argmin([-1, 5, -9], (d) -> -d).should.equal(1)
      should.not.exist(utils.argmin([undefined, undefined]))
      should.not.exist(utils.argmin([]))
      should.not.exist(utils.argmin())

    it 'max: should work', ->
      utils.max().should.equal(-Infinity)
      utils.max([]).should.equal(-Infinity)
      utils.max([1, 5, 2]).should.equal(5)
      utils.max([undefined, 5, 2]).should.equal(5)
      utils.max([1, undefined, 5, 2]).should.equal(5)

    it 'maxBy: should work', ->
      should.not.exist(utils.maxBy())
      should.not.exist(utils.maxBy([]))
      should.not.exist(utils.maxBy([undefined, undefined, undefined]))
      utils.maxBy([1, 2, 3, 4]).should.equal(4)
      utils.maxBy([1, undefined, 3, 4]).should.equal(4)
      utils.maxBy([1, 5, 3, 4]).should.equal(5)
      utils.maxBy([5, 2, 3, 4, 1], (d) -> -d).should.equal(1)
      utils.maxBy([5, 1, undefined, 5, 4], (d) -> if d is undefined then undefined else -d).should.equal(1)
      utils.maxBy([undefined, 5, 1, 5, 4], (d) -> if d is undefined then undefined else -d).should.equal(1)

    it 'argmax: should return the index of the largest defined value', ->
      utils.argmax([1, 4, -5, 9]).should.equal(3)
      utils.argmax([undefined, -5, 9]).should.equal(2)
      utils.argmax([1, undefined, -5, 9]).should.equal(3)
      utils.argmax([1, -5, 9], (d) -> -d).should.equal(1)
      should.not.exist(utils.argmax([undefined, undefined]))
      should.not.exist(utils.argmax([]))
      should.not.exist(utils.argmax())

    it 'range should work', ->
      utils.range(10).should.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

    it 'sum should work', ->
      utils.sum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).should.equal(45)

    it "flatten: should flatten a 2d array into a 1d array", ->
      utils.flatten([[1, 2], [2, 3], [3, 10]]).should.eql([1, 2, 2, 3, 3, 10])

    it "cycle: should work", ->
      utils.cycle([0, 1, 2], 0).should.equal(0)
      utils.cycle([0, 4, 8], 1).should.equal(4)
      utils.cycle([0, 1, 2], 20).should.equal(2)
      utils.cycle([0, 1, 2], 0).should.equal(0)

    it "hashList: should work", ->
      utils.hashList([0, 1, 2], "thing-1").should.equal(utils.hashList([0, 1, 2], "thing-1"))
      utils.hashList([0, 1, 2], "thing-2").should.be.a('number')
      utils.hashList([0, 1, 2], "thing-3").should.be.a('number')
      utils.hashList([0, 1, 2], "thing-4").should.be.a('number')

    it "find: should work", ->
      values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
      utils.find(values, (d) -> d.v is 2).should.equal(values[2])
      utils.find(values, (d) -> d.v is 5).should.equal(values[0])
      utils.find(values, (d) -> d.v is 7).should.equal(values[1])

    it "find: should return undefined when nothing is found", ->
      values = [{v: 5, x: 10}, {v: 7, x: 20}, {v: 2, x: 30}]
      should.not.exist(utils.find(values, (d) -> false))

    it "isString: should work", ->
      utils.isString("this is a string").should.equal(true)
      utils.isString(new String("this is a string")).should.equal(true)
      utils.isString(undefined).should.equal(false)
      utils.isString(null).should.equal(false)
      utils.isString(123).should.equal(false)
      utils.isString({}).should.equal(false)
      utils.isString([]).should.equal(false)
      utils.isString(/b/).should.equal(false)
      utils.isString(->).should.equal(false)
      utils.isString(true).should.equal(false)
      utils.isString(false).should.equal(false)

    it "isFunction: should work", ->
      utils.isFunction("this is a string").should.equal(false)
      utils.isFunction(new String("this is a string")).should.equal(false)
      utils.isFunction(undefined).should.equal(false)
      utils.isFunction(null).should.equal(false)
      utils.isFunction(123).should.equal(false)
      utils.isFunction({}).should.equal(false)
      utils.isFunction([]).should.equal(false)
      utils.isFunction(/b/).should.equal(false)
      utils.isFunction(->).should.equal(true)
      utils.isFunction(true).should.equal(false)
      utils.isFunction(false).should.equal(false)

    it "isArray: should work", ->
      utils.isArray("this is a string").should.equal(false)
      utils.isArray(new String("this is a string")).should.equal(false)
      utils.isArray(undefined).should.equal(false)
      utils.isArray(null).should.equal(false)
      utils.isArray(123).should.equal(false)
      utils.isArray({}).should.equal(false)
      utils.isArray([]).should.equal(true)
      utils.isArray(/b/).should.equal(false)
      utils.isArray(->).should.equal(false)
      utils.isArray(true).should.equal(false)
      utils.isArray(false).should.equal(false)

    it "isBoolean: should work", ->
      utils.isBoolean("this is a string").should.equal(false)
      utils.isBoolean(new String("this is a string")).should.equal(false)
      utils.isBoolean(undefined).should.equal(false)
      utils.isBoolean(null).should.equal(false)
      utils.isBoolean(123).should.equal(false)
      utils.isBoolean({}).should.equal(false)
      utils.isBoolean([]).should.equal(false)
      utils.isBoolean(/b/).should.equal(false)
      utils.isBoolean(->).should.equal(false)
      utils.isBoolean(true).should.equal(true)
      utils.isBoolean(false).should.equal(true)


    it "groupBy: should work", ->
      values = [
        {key: 'a', value: 1},
        {key: 'a', value: 2},
        {key: 'a', value: 3},
        {key: 'b', value: 4},
        {key: 'b', value: 5},
        {key: 'c', value: 6}
      ]

      utils.groupBy(values, (d) -> d.key).should.eql([
        ['a', [{key: 'a', value: 1}, {key: 'a', value: 2}, {key: 'a', value: 3}]],
        ['b', [{key: 'b', value: 4}, {key: 'b', value: 5} ]],
        ['c', [{key: 'c', value: 6}]]
      ])

    it "endsWith: should work", ->
      utils.endsWith('test-string', 'ing').should.equal(true)
      utils.endsWith('test-string', '').should.equal(true)
      utils.endsWith('test-string', 'test').should.equal(false)

    it "startsWith: should work", ->
      utils.startsWith('test-string', 'ing').should.equal(false)
      utils.startsWith('test-string', '').should.equal(true)
      utils.startsWith('test-string', 'test').should.equal(true)

    it 'tween: should work', ->
      utils.tween(0, 10, 0.5).should.be.closeTo(5, 0.1)
      utils.tween(0, 10, 1.5).should.be.closeTo(15, 0.1)
      utils.tween(0, -3, 0.1).should.be.closeTo(-0.3, 0.1)


    it 'isObject: should work', ->
      class A
        constructor: ->

      utils.isObject(new A).should.equal(true)
      utils.isObject({}).should.equal(true)
      utils.isObject(document.createElement('div')).should.equal(true)
      utils.isObject(window).should.equal(true)
      utils.isObject(->).should.equal(false)
      utils.isObject("").should.equal(false)
      utils.isObject(123).should.equal(false)
      utils.isObject(/a/).should.equal(true)
      utils.isObject([]).should.equal(false)
      utils.isObject(undefined).should.equal(false)
      utils.isObject(null).should.equal(false)

    it 'isPlainObject: should work', ->
      class A
        constructor: ->

      utils.isPlainObject(new A).should.equal(false)
      utils.isPlainObject({}).should.equal(true)
      utils.isPlainObject(document.createElement('div')).should.equal(false)
      utils.isPlainObject(window).should.equal(false)
      utils.isPlainObject(->).should.equal(false)
      utils.isPlainObject("").should.equal(false)
      utils.isPlainObject(123).should.equal(false)
      utils.isPlainObject(/a/).should.equal(false)
      utils.isPlainObject([]).should.equal(false)
      utils.isPlainObject(null).should.equal(false)
      utils.isPlainObject(undefined).should.equal(false)

    it 'isNumber: should work', ->
      class A
        constructor: ->

      utils.isNumber(new A).should.equal(false)
      utils.isNumber({}).should.equal(false)
      utils.isNumber(document.createElement('div')).should.equal(false)
      utils.isNumber(window).should.equal(false)
      utils.isNumber(->).should.equal(false)
      utils.isNumber("").should.equal(false)
      utils.isNumber(123).should.equal(true)
      utils.isNumber(NaN).should.equal(true)
      utils.isNumber(/a/).should.equal(false)
      utils.isNumber([]).should.equal(false)
      utils.isNumber(undefined).should.equal(false)
      utils.isNumber(null).should.equal(false)

    describe 'merge', ->

      it 'should work', ->
        class A
          constructor: -> @a = 1

        utils.merge({a: {b: 2, c: {d: 3}}})
         .should.eql({a: {b: 2, c: {d: 3}}})

        utils.merge({a: {b: 2, c: {d: 3}}},
                        {a: {b: 'hello', c: {d: 4, e: 'value'}}})
         .should.eql({a: {b: 'hello', c: {d: 4, e: 'value'}}})

        utils.merge({a: {b: 2, c: {d: 3}}},
                        {a: {b: 'hello', c: {d: 4, e: new A}}})
         .should.eql({a: {b: 'hello', c: {d: 4, e: {}}}})

        utils.merge({a: {b: 2}}, {a: {c: 3}})
         .should.eql({a: {b: 2, c: 3}})

        utils.merge({a: {b: 2}}, {a: 2})
         .should.eql({a: 2})

        utils.merge({a: {b: 2}}, {a: {c: new A}})
         .should.eql({a: {b: 2, c: {}}})

        utils.merge({a: {b: 2}}, {})
         .should.eql({a: {b: 2}})

        utils.merge({a: {b: 2}}, new A)
         .should.eql({a: {b: 2}})

      it 'should work when not retaining undefined values', ->
        class A
          constructor: -> @a = 1

        utils.mergeDefined({a: {b: 2, c: {d: 3}}})
         .should.eql({a: {b: 2, c: {d: 3}}})

        utils.mergeDefined({a: {b: 2, c: {d: 3}}},
                                {a: {b: 'hello', c: {d: 4, e: 'value'}}})
         .should.eql({a: {b: 'hello', c: {d: 4, e: 'value'}}})

        utils.mergeDefined({a: {b: 2, c: {d: 3}}},
                                {a: {b: 'hello', c: {d: 4, e: new A}}})
         .should.eql({a: {b: 'hello', c: {d: 4, e: {}}}})

        utils.mergeDefined({a: {b: 2}}, {a: {c: 3}})
         .should.eql({a: {b: 2, c: 3}})

        utils.mergeDefined({a: {b: 2}}, {a: 2})
         .should.eql({a: 2})

        utils.mergeDefined({a: {b: 2}}, {a: {c: new A}})
         .should.eql({a: {b: 2, c: {}}})

        utils.mergeDefined({a: {b: 2}}, {})
         .should.eql({a: {b: 2}})

        utils.mergeDefined({a: {b: 2}}, new A)
         .should.eql({a: {b: 2}})

      it 'should retain undefined values', ->
        utils.merge({'a': {'b': 5}}, {'a': {'b': undefined}}, {'b': 3})
         .should.eql({'a': {'b': undefined}, 'b': 3})

      it 'bug check - should not throw an error when null is present', ->
         -> utils.merge({}, {a: null}) .to.not.throw()

      it 'merging with null should work', ->
        utils.merge({a: '5'}, {a: null}).should.eql({a: null})

      it 'mergeDefined should not retain undefined values', ->
        utils.mergeDefined({'a': {'b': 5}},
                                {'a': {'b': undefined}}, {'b': 3})
         .should.eql({'a': {'b': 5}, 'b': 3})

      it 'shallowMerge should work', ->

        utils.shallowMerge({'a': 1}).should.eql({'a': 1})
        utils.shallowMerge({'a': 1}, {'a': 2}).should.eql({'a': 2})
        utils.shallowMerge({'a': 1}, {'a': 2}, {'b': 3})
         .should.eql({'a': 2, 'b': 3})

        src = {'a': 1}
        utils.shallowMerge(src).should.not.equal(src)

        utils.shallowMerge().should.eql({})

        class A
          constructor: -> @a = 1

        utils.shallowMerge(new A).should.eql({})

        a = new A
        utils.shallowMerge({'a': 1, 'b': a}).should.eql({'a': 1, b: a})


      it 'shallowMergeDefined should work', ->
        utils.shallowMergeDefined({'a': 1}).should.eql({'a': 1})
        utils.shallowMergeDefined({'a': 1}, {'a': 2}).should.eql({'a': 2})
        utils.shallowMergeDefined({'a': 1}, {'a': 2}, {'b': 3})
         .should.eql({'a': 2, 'b': 3})
        utils.shallowMergeDefined({'a': 1}, {'a': [1, 2, 3]}, {'b': 3})
         .should.eql({'a': [1, 2, 3], 'b': 3})

        src = {'a': 1}
        utils.shallowMergeDefined(src).should.not.equal(src)

        utils.shallowMerge().should.eql({})

        class A
          constructor: -> @a = 1

        utils.shallowMergeDefined(new A).should.eql({})

        a = new A
        utils.shallowMergeDefined({'a': 1, 'b': a}).should.eql({'a': 1, b: a})

      it 'shallowMerge: should retain undefined values', ->
        utils.shallowMerge({'a': 1}, {'a': undefined}, {'b': 3})
         .should.eql({'a': undefined, 'b': 3})

      it 'shallowMergeDefined: shallow merge should ignore undefined values', ->
        utils.shallowMergeDefined({'a': 1}, {'a': undefined}, {'b': 3})
         .should.eql({'a': 1, 'b': 3})

    it 'shallowClone should work', ->
      utils.shallowClone(1).should.equal(1)
      utils.shallowClone('string').should.equal('string')

      f = ->
      utils.shallowClone(f).should.equal(f)

      utils.shallowClone({a: 1}).should.eql({a: 1})
      utils.shallowClone({a: 5, b: 1}).should.eql({a: 5, b: 1})
      obj = {c: 3}
      utils.shallowClone({a: 5, b: obj}).should.eql({a: 5, b: obj})
      utils.shallowClone({a: 5, b: obj}).b.should.eql(obj)

      utils.shallowClone([1, 2, 3]).should.eql([1, 2, 3])

      l = new HList [1, "a", {}]
      s = new HSet [1, "a", {}]
      m = new HMap [["a", 5], [6, {}]]

      d = new Date
      utils.shallowClone(d).should.not.equal(d)
      utils.shallowClone(d).should.eql(d)

      utils.shallowClone(l).entries().should.eql(l.entries())
      utils.shallowClone(s).entries().should.eql(s.entries())
      utils.shallowClone(m).entries().should.eql(m.entries())

    it '(deep) clone should work', ->

      utils.clone(1).should.equal(1)
      utils.clone('string').should.equal('string')

      d = new Date
      utils.clone(d).should.not.equal(d)
      utils.clone(d).should.eql(d)

      f = ->

      utils.clone(f).should.eql(f)

      utils.clone({a: 1}).should.eql({a: 1})
      utils.clone({a: 5, b: 1}).should.eql({a: 5, b: 1})
      obj = {c: 3}
      utils.clone({a: 5, b: obj}).should.eql({a: 5, b: {c: 3}})
      utils.clone({a: 5, b: obj}).b.should.not.equal(obj)

      utils.clone([1, 2, 3]).should.eql([1, 2, 3])
      l = new HList [1, "a", {}]
      s = new HSet [1, "a", {}]
      m = new HMap [["a", 5], [6, {}]]


      utils.clone(l).entries().should.eql(l.entries())
      utils.clone(s).entries().should.eql(s.entries())
      utils.clone(m).entries().should.eql(m.entries())


    it 'vendor: should find the property if it exists', ->
      obj = {
        prop: 'something'
      }
      utils.vendor(obj, 'prop').should.equal('something')


    it 'vendor: should find a prefixed property if it exists', ->
      obj = {
        webkitProp: 'webkit'
      }
      utils.vendor(obj, 'prop').should.equal('webkit')

    it 'defined: should return true for non-null and non-undefined values', ->
      utils.defined(123).should.equal(true)
      utils.defined("123").should.equal(true)
      utils.defined({}).should.equal(true)
      utils.defined(/123/).should.equal(true)

    it 'defined: should return false for null and undefined', ->
      utils.defined(null).should.equal(false)
      utils.defined(undefined).should.equal(false)
