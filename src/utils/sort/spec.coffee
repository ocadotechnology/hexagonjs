import { state, sort, sortBy, compare, compareNullsLast, localeCompare } from 'utils/sort'

export default () ->
  describe 'hx-sort tests', ->

    runWithoutCollator = (tests) -> ->
      originalCollator = Intl?.Collator
      beforeEach ->
        if originalCollator? then Intl.Collator = undefined
        delete state.collator

      afterEach ->
        if originalCollator? then Intl.Collator = originalCollator
        delete state.collator

      tests()

    describe "sort", ->
      it "should work", ->
        a = [3, 1, 2]
        b = sort a
        b.should.eql([1, 2, 3])

        c = ['c', 'a', 'b']
        d = sort c
        d.should.eql(['a', 'b', 'c'])

     it "should not modify the original array", ->
       a = [3, 2, 1]
       b = sort a
       a[0].should.equal(3)
       b[0].should.equal(1)

    describe "sortBy", ->
      people = [
        {
          name: 'Bob'
          ageYears: 20
        }
        {
          name: 'Ganesh'
          ageYears: 19
        }
        {
          name: 'Kate'
          ageYears: 39
        }
        {
          name: 'Lazlo'
          ageYears: 18
        }
      ]
      it "should not modify the original array", ->
        peopleCopy = [people...]
        peopleCopySorted = sortBy peopleCopy, (x) -> x.ageYears
        peopleCopy[0].name.should.equal('Bob')
        peopleCopySorted[0].name.should.equal('Lazlo')

      it "should work", ->
        byName = sortBy people, (x) -> x.name
        byAge = sortBy people, (x) -> x.ageYears
        byName.map((x) -> x.name).should.eql(['Bob', 'Ganesh', 'Kate', 'Lazlo'])
        byAge.map((x) -> x.name).should.eql(['Lazlo', 'Ganesh', 'Bob', 'Kate'])

    compareTests = ->
      it 'Strings should return the right value', ->
        compare('a', 'b').should.equal(-1)
        compare('b', 'a').should.equal(1)
        compare('a', 'a').should.equal(0)

      it 'undefined should be treated as its string representation', ->
        compare(undefined, 't').should.equal(1)
        compare('t', undefined).should.equal(-1)
        compare(undefined, 'v').should.equal(-1)
        compare('v', undefined).should.equal(1)
        compare(undefined, null).should.equal(1)
        compare(null, undefined).should.equal(-1)
        compare(undefined, undefined).should.equal(0)

      it 'null should be treated as its string representation', ->
        compare(null, 'a').should.equal(1)
        compare('a', null).should.equal(-1)
        compare(null, 'z').should.equal(-1)
        compare('z', null).should.equal(1)
        compare(null, null).should.equal(0)

      it 'Arrays should return the right value', ->
        array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
        array.sort(compare).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
        array = ['c', null, 'a', undefined, 'b', null, 'aa', undefined, '1', '2']
        array.sort(compare).should
          .eql(['1', '2', 'a', 'aa', 'b', 'c', null, null, undefined, undefined])
        array = ['25', '10', '20', '42', '100']
        array.sort(compare).should.eql(['10', '20', '25', '42', '100'])
        array = ['25', null, '10', undefined, '20', null, '42', undefined, '100']
        array.sort(compareNullsLast).should
          .eql(['10', '20', '25', '42', '100', null, null, undefined, undefined])

      it 'Arrays of strings with undefined values should sort undefined to the end', ->
        array = ['b', undefined, null, 'z', undefined, 'a', null, 'p']
        array.sort(compare).should.eql(['a', 'b', null, null, 'p', 'z', undefined, undefined])

      it 'Numbers should return the right value', ->
        compare(1, 2).should.equal(-1)
        compare(2, 1).should.equal(1)
        compare(1, 1).should.equal(0)
        compare(1, undefined).should.equal(-1)
        compare(undefined, 1).should.equal(1)
        compare(1, null).should.equal(-1)
        compare(null, 1).should.equal(1)
        compare(0, null).should.equal(-1)
        compare(null, 0).should.equal(1)

      it 'Arrays of numbers should return the right value', ->
        array = [100, 200, 1, 20, 2, 10]
        array.sort(compare).should.eql([1, 2, 10, 20, 100, 200])
        array = [100, null, 200, undefined, 1, null, 20, undefined, 2, 10]
        array.sort(compare).should.eql([1, 2, 10, 20, 100, 200, null, null, undefined, undefined])

    describe 'using standard compare potentially with Intl.Collator. ', compareTests

    describe 'using standard compare without Intl.Collator', runWithoutCollator(compareTests)

    compareNullsLastTests = ->
      it 'Strings should return the right value', ->
        compareNullsLast('a', 'b').should.equal(-1)
        compareNullsLast('b', 'a').should.equal(1)
        compareNullsLast('a', 'a').should.equal(0)

      it 'undefined should always be sorted to the end', ->
        compareNullsLast(undefined, 'a').should.equal(1)
        compareNullsLast('a', undefined).should.equal(-1)
        compareNullsLast(undefined, 'z').should.equal(1)
        compareNullsLast('z', undefined).should.equal(-1)
        compareNullsLast(undefined, null).should.equal(1)
        compareNullsLast(null, undefined).should.equal(-1)
        compareNullsLast(undefined, undefined).should.equal(0)

      it 'null should be sorted after any defined value', ->
        compareNullsLast(null, 'a').should.equal(1)
        compareNullsLast('a', null).should.equal(-1)
        compareNullsLast(null, 'z').should.equal(1)
        compareNullsLast('z', null).should.equal(-1)
        compareNullsLast(null, null).should.equal(0)

      it 'Arrays should return the right value', ->
        array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
        array.sort(compareNullsLast).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
        array = ['z', null, 'a', undefined, 'b', null, 'aa', undefined, '1', '2']
        array.sort(compareNullsLast).should
          .eql(['1', '2', 'a', 'aa', 'b', 'z', null, null, undefined, undefined])
        array = ['25', '10', '20', '42', '100']
        array.sort(compareNullsLast).should.eql(['10', '20', '25', '42', '100'])
        array = ['25', null, '10', undefined, '20', null, '42', undefined, '100']
        array.sort(compareNullsLast).should
          .eql(['10', '20', '25', '42', '100', null, null, undefined , undefined])

      it 'Arrays of strings with undefined values should sort null and undefined to the end', ->
        array = ['b', undefined, null, 'z', undefined, 'a', null, 'p']
        array.sort(compareNullsLast).should.eql(['a', 'b', 'p', 'z', null, null, undefined, undefined])

      it 'Numbers should return the right value', ->
        compareNullsLast(1, 2).should.equal(-1)
        compareNullsLast(2, 1).should.equal(1)
        compareNullsLast(1, 1).should.equal(0)
        compareNullsLast(1, undefined).should.equal(-1)
        compareNullsLast(undefined, 1).should.equal(1)
        compareNullsLast(1, null).should.equal(-1)
        compareNullsLast(null, 1).should.equal(1)

      it 'Arrays of numbers should return the right value', ->
        array = [100, 200, 1, 20, 2, 10]
        array.sort(compareNullsLast).should.eql([1, 2, 10, 20, 100, 200])
        array = [100, null, 200, undefined, 1, null, 20, undefined, 2, 10]
        array.sort(compareNullsLast).should.eql([1, 2, 10, 20, 100, 200, null, null, undefined, undefined])

    describe 'using compareNullsLast potentially with Intl.Collator. ', compareNullsLastTests

    describe 'using compareNullsLast without Intl.Collator. ', runWithoutCollator(compareNullsLastTests)

    localeCompareTests = ->
      supportsOptions = ->
        try
          'a'.localeCompare('b', 'i')
        catch e
          e is 'RangeError'
        false

      it 'Strings should return the right value', ->
        localeCompare()('a', 'b').should.equal(-1)
        localeCompare()('b', 'a').should.equal(1)
        localeCompare()('a', 'a').should.equal(0)

      it 'should fail when using undefined or null', ->
        localeCompare()('a', undefined).should.equal(-1)
        localeCompare()(undefined, 'a').should.equal(1)
        localeCompare()('z', undefined).should.equal(1)
        localeCompare()(undefined, 'z').should.equal(-1)
        localeCompare()('a', null).should.equal(-1)
        localeCompare()(null, 'a').should.equal(1)
        localeCompare()('z', null).should.equal(1)
        localeCompare()(null, 'z').should.equal(-1)

      it 'Arrays should return the right value', ->
        array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
        array.sort(localeCompare()).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
        array = ['25', '10', '20', '42', '100']
        array.sort(localeCompare()).should.eql(['10', '20', '25', '42', '100'])

      it 'Numbers should return the right value', ->
        localeCompare()(1, 2).should.equal(-1)
        localeCompare()(2, 1).should.equal(1)
        localeCompare()(1, 1).should.equal(0)

      it 'Arrays of numbers should return the right value', ->
        array = [100, 200, 1, 20, 2, 10]
        array.sort(localeCompare()).should.eql([1, 2, 10, 20, 100, 200])


      it 'Array with localised characters should return the right value', ->
        if navigator.userAgent.indexOf 'Phantom' > -1
          true.should.equal(true)
        else
          array = ['é', 'e', 'z', 'è', 'a', 'ä']

          array.sort(localeCompare()).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
          if supportsOptions()
            array.sort(localeCompare('sv')).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
            array.sort(localeCompare('de')).should.eql(['a', 'e', 'é', 'è', 'z', 'ä'])

    describe 'using localeCompare potentially with Intl.Collator. ', localeCompareTests

    describe 'using localeCompare without Intl.Collator. ', runWithoutCollator(localeCompareTests)

    localeCompareNullsLastTests = ->
      supportsOptions = ->
        try
          'a'.localeCompare('b', {nullsLast: true})
        catch e
          e is 'RangeError'
        false

      it 'Strings should return the right value', ->
        localeCompare(undefined, {nullsLast: true})('a', 'b').should.equal(-1)
        localeCompare(undefined, {nullsLast: true})('b', 'a').should.equal(1)
        localeCompare(undefined, {nullsLast: true})('a', 'a').should.equal(0)
        localeCompare(undefined, {nullsLast: true})('a', undefined).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(undefined, 'a').should.equal(1)
        localeCompare(undefined, {nullsLast: true})('z', undefined).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(undefined, 'z').should.equal(1)
        localeCompare(undefined, {nullsLast: true})('a', null).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(null, 'a').should.equal(1)
        localeCompare(undefined, {nullsLast: true})('z', null).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(null, 'z').should.equal(1)

      it 'Arrays should return the right value', ->
        array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
        array.sort(localeCompare(undefined, {nullsLast: true})).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
        array = ['z', null, 'a', undefined, 'b', null, 'aa', undefined, '1', '2']
        array.sort(localeCompare(undefined, {nullsLast: true})).should
          .eql(['1', '2', 'a', 'aa', 'b', 'z', null, null, undefined, undefined])
        array = ['25', '10', '20', '42', '100']
        array.sort(localeCompare(undefined, {nullsLast: true})).should.eql(['10', '20', '25', '42', '100'])
        array = ['25', null, '10', undefined, '20', null, '42', undefined, '100']
        array.sort(localeCompare(undefined, {nullsLast: true})).should
          .eql(['10', '20', '25', '42', '100', null, null, undefined , undefined])

      it 'Numbers should return the right value', ->
        localeCompare(undefined, {nullsLast: true})(1, 2).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(2, 1).should.equal(1)
        localeCompare(undefined, {nullsLast: true})(1, 1).should.equal(0)
        localeCompare(undefined, {nullsLast: true})(1, undefined).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(undefined, 1).should.equal(1)
        localeCompare(undefined, {nullsLast: true})(1, null).should.equal(-1)
        localeCompare(undefined, {nullsLast: true})(null, 1).should.equal(1)

      it 'Arrays of numbers should return the right value', ->
        array = [100, null, 200, undefined, 1, null, 20, 2, 10]
        array.sort(localeCompare(undefined, {nullsLast: true})).should.eql([1, 2, 10, 20, 100, 200, null, null, undefined])

      it 'Array with localised characters should return the right value', ->
        if navigator.userAgent.indexOf 'Phantom' > -1
          true.should.equal(true)
        else
          array = ['e', 'z', 'è', 'a', 'é', 'ä']

          array.sort(localeCompare(undefined, {nullsLast: true})).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
          if supportsOptions()
            array.sort(localeCompareNullsLast('sv', {nullsLast: true})).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
            array.sort(localeCompareNullsLast('de', {nullsLast: true})).should.eql(['a', 'e', 'é', 'è', 'z', 'ä'])

      it 'Arrays with localised characters and undefined values should sort null and undefined to the end', ->
        if navigator.userAgent.indexOf 'Phantom' > -1
          true.should.equal(true)
        else
          array = ['é', null, 'e', undefined, 'z', null, 'è', undefined, 'a', 'ä']
          array.sort(localeCompare(undefined, {nullsLast: true})).should.eql(['a', 'ä', 'e', 'é', 'è', 'z', null, null, undefined, undefined])
          if supportsOptions()
            array.sort(localeCompareNullsLast('sv', {nullsLast: true})).should
              .eql(['a', 'ä', 'e', 'é', 'è', 'z', null, null, undefined, undefined])
            array.sort(localeCompareNullsLast('de', {nullsLast: true})).should
              .eql(['a', 'e', 'é', 'è', 'z', 'ä', null, null, undefined, undefined])

    describe 'using localeCompareNullsLast potentially with Intl.Collator. ', localeCompareNullsLastTests

    describe 'using localeCompareNullsLast without Intl.Collator. ', runWithoutCollator(localeCompareNullsLastTests)
