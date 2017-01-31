describe 'hx-sort tests', ->

  runWithoutCollator = (tests) -> ->
    originalCollator = Intl?.Collator
    beforeEach ->
      if originalCollator? then Intl.Collator = undefined
      delete hx._.sort.collator

    afterEach ->
      if originalCollator? then Intl.Collator = originalCollator
      delete hx._.sort.collator

    tests()

  describe "sort", ->
    it "should work", ->
      a = [3, 1, 2]
      b = hx.sort a
      b.should.eql([1, 2, 3])

      c = ['c', 'a', 'b']
      d = hx.sort c
      d.should.eql(['a', 'b', 'c'])

   it "should not modify the original array", ->
     a = [3, 2, 1]
     b = hx.sort a
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
      peopleCopySorted = hx.sortBy peopleCopy, (x) -> x.ageYears
      peopleCopy[0].name.should.equal('Bob')
      peopleCopySorted[0].name.should.equal('Lazlo')

    it "should work", ->
      byName = hx.sortBy people, (x) -> x.name
      byAge = hx.sortBy people, (x) -> x.ageYears
      byName.map((x) -> x.name).should.eql(['Bob', 'Ganesh', 'Kate', 'Lazlo'])
      byAge.map((x) -> x.name).should.eql(['Lazlo', 'Ganesh', 'Bob', 'Kate'])

  compareTests = ->
    it 'Strings should return the right value', ->
      hx.sort.compare('a', 'b').should.equal(-1)
      hx.sort.compare('b', 'a').should.equal(1)
      hx.sort.compare('a', 'a').should.equal(0)

    it 'undefined should be treated as its string representation', ->
      hx.sort.compare(undefined, 't').should.equal(1)
      hx.sort.compare('t', undefined).should.equal(-1)
      hx.sort.compare(undefined, 'v').should.equal(-1)
      hx.sort.compare('v', undefined).should.equal(1)
      hx.sort.compare(undefined, null).should.equal(1)
      hx.sort.compare(null, undefined).should.equal(-1)
      hx.sort.compare(undefined, undefined).should.equal(0)

    it 'null should be treated as its string representation', ->
      hx.sort.compare(null, 'a').should.equal(1)
      hx.sort.compare('a', null).should.equal(-1)
      hx.sort.compare(null, 'z').should.equal(-1)
      hx.sort.compare('z', null).should.equal(1)
      hx.sort.compare(null, null).should.equal(0)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      array.sort(hx.sort.compare).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['c', null, 'a', undefined, 'b', null, 'aa', undefined, '1', '2']
      array.sort(hx.sort.compare).should
        .eql(['1', '2', 'a', 'aa', 'b', 'c', null, null, undefined, undefined])
      array = ['25', '10', '20', '42', '100']
      array.sort(hx.sort.compare).should.eql(['10', '20', '25', '42', '100'])
      array = ['25', null, '10', undefined, '20', null, '42', undefined, '100']
      array.sort(hx.sort.compareNullsLast).should
        .eql(['10', '20', '25', '42', '100', null, null, undefined, undefined])

    it 'Arrays of strings with undefined values should sort undefined to the end', ->
      array = ['b', undefined, null, 'z', undefined, 'a', null, 'p']
      array.sort(hx.sort.compare).should.eql(['a', 'b', null, null, 'p', 'z', undefined, undefined])

    it 'Numbers should return the right value', ->
      hx.sort.compare(1, 2).should.equal(-1)
      hx.sort.compare(2, 1).should.equal(1)
      hx.sort.compare(1, 1).should.equal(0)
      hx.sort.compare(1, undefined).should.equal(-1)
      hx.sort.compare(undefined, 1).should.equal(1)
      hx.sort.compare(1, null).should.equal(-1)
      hx.sort.compare(null, 1).should.equal(1)
      hx.sort.compare(0, null).should.equal(-1)
      hx.sort.compare(null, 0).should.equal(1)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      array.sort(hx.sort.compare).should.eql([1, 2, 10, 20, 100, 200])
      array = [100, null, 200, undefined, 1, null, 20, undefined, 2, 10]
      array.sort(hx.sort.compare).should.eql([1, 2, 10, 20, 100, 200, null, null, undefined, undefined])

  describe 'using standard compare potentially with Intl.Collator. ', compareTests

  describe 'using standard compare without Intl.Collator', runWithoutCollator(compareTests)

  compareNullsLastTests = ->
    it 'Strings should return the right value', ->
      hx.sort.compareNullsLast('a', 'b').should.equal(-1)
      hx.sort.compareNullsLast('b', 'a').should.equal(1)
      hx.sort.compareNullsLast('a', 'a').should.equal(0)

    it 'undefined should always be sorted to the end', ->
      hx.sort.compareNullsLast(undefined, 'a').should.equal(1)
      hx.sort.compareNullsLast('a', undefined).should.equal(-1)
      hx.sort.compareNullsLast(undefined, 'z').should.equal(1)
      hx.sort.compareNullsLast('z', undefined).should.equal(-1)
      hx.sort.compareNullsLast(undefined, null).should.equal(1)
      hx.sort.compareNullsLast(null, undefined).should.equal(-1)
      hx.sort.compareNullsLast(undefined, undefined).should.equal(0)

    it 'null should be sorted after any defined value', ->
      hx.sort.compareNullsLast(null, 'a').should.equal(1)
      hx.sort.compareNullsLast('a', null).should.equal(-1)
      hx.sort.compareNullsLast(null, 'z').should.equal(1)
      hx.sort.compareNullsLast('z', null).should.equal(-1)
      hx.sort.compareNullsLast(null, null).should.equal(0)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      array.sort(hx.sort.compareNullsLast).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['z', null, 'a', undefined, 'b', null, 'aa', undefined, '1', '2']
      array.sort(hx.sort.compareNullsLast).should
        .eql(['1', '2', 'a', 'aa', 'b', 'z', null, null, undefined, undefined])
      array = ['25', '10', '20', '42', '100']
      array.sort(hx.sort.compareNullsLast).should.eql(['10', '20', '25', '42', '100'])
      array = ['25', null, '10', undefined, '20', null, '42', undefined, '100']
      array.sort(hx.sort.compareNullsLast).should
        .eql(['10', '20', '25', '42', '100', null, null, undefined , undefined])

    it 'Arrays of strings with undefined values should sort null and undefined to the end', ->
      array = ['b', undefined, null, 'z', undefined, 'a', null, 'p']
      array.sort(hx.sort.compareNullsLast).should.eql(['a', 'b', 'p', 'z', null, null, undefined, undefined])

    it 'Numbers should return the right value', ->
      hx.sort.compareNullsLast(1, 2).should.equal(-1)
      hx.sort.compareNullsLast(2, 1).should.equal(1)
      hx.sort.compareNullsLast(1, 1).should.equal(0)
      hx.sort.compareNullsLast(1, undefined).should.equal(-1)
      hx.sort.compareNullsLast(undefined, 1).should.equal(1)
      hx.sort.compareNullsLast(1, null).should.equal(-1)
      hx.sort.compareNullsLast(null, 1).should.equal(1)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      array.sort(hx.sort.compareNullsLast).should.eql([1, 2, 10, 20, 100, 200])
      array = [100, null, 200, undefined, 1, null, 20, undefined, 2, 10]
      array.sort(hx.sort.compareNullsLast).should.eql([1, 2, 10, 20, 100, 200, null, null, undefined, undefined])

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
      hx.sort.localeCompare()('a', 'b').should.equal(-1)
      hx.sort.localeCompare()('b', 'a').should.equal(1)
      hx.sort.localeCompare()('a', 'a').should.equal(0)

    it 'should fail when using undefined or null', ->
      hx.sort.localeCompare()('a', undefined).should.equal(-1)
      hx.sort.localeCompare()(undefined, 'a').should.equal(1)
      hx.sort.localeCompare()('z', undefined).should.equal(1)
      hx.sort.localeCompare()(undefined, 'z').should.equal(-1)
      hx.sort.localeCompare()('a', null).should.equal(-1)
      hx.sort.localeCompare()(null, 'a').should.equal(1)
      hx.sort.localeCompare()('z', null).should.equal(1)
      hx.sort.localeCompare()(null, 'z').should.equal(-1)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      array.sort(hx.sort.localeCompare()).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['25', '10', '20', '42', '100']
      array.sort(hx.sort.localeCompare()).should.eql(['10', '20', '25', '42', '100'])

    it 'Numbers should return the right value', ->
      hx.sort.localeCompare()(1, 2).should.equal(-1)
      hx.sort.localeCompare()(2, 1).should.equal(1)
      hx.sort.localeCompare()(1, 1).should.equal(0)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      array.sort(hx.sort.localeCompare()).should.eql([1, 2, 10, 20, 100, 200])


    it 'Array with localised characters should return the right value', ->
      if navigator.userAgent.indexOf 'Phantom' > -1
        true.should.equal(true)
      else
        array = ['é', 'e', 'z', 'è', 'a', 'ä']

        array.sort(hx.sort.localeCompare()).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
        if supportsOptions()
          array.sort(hx.sort.localeCompare('sv')).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
          array.sort(hx.sort.localeCompare('de')).should.eql(['a', 'e', 'é', 'è', 'z', 'ä'])

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
      hx.sort.localeCompare(undefined, {nullsLast: true})('a', 'b').should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})('b', 'a').should.equal(1)
      hx.sort.localeCompare(undefined, {nullsLast: true})('a', 'a').should.equal(0)
      hx.sort.localeCompare(undefined, {nullsLast: true})('a', undefined).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(undefined, 'a').should.equal(1)
      hx.sort.localeCompare(undefined, {nullsLast: true})('z', undefined).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(undefined, 'z').should.equal(1)
      hx.sort.localeCompare(undefined, {nullsLast: true})('a', null).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(null, 'a').should.equal(1)
      hx.sort.localeCompare(undefined, {nullsLast: true})('z', null).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(null, 'z').should.equal(1)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['z', null, 'a', undefined, 'b', null, 'aa', undefined, '1', '2']
      array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should
        .eql(['1', '2', 'a', 'aa', 'b', 'z', null, null, undefined, undefined])
      array = ['25', '10', '20', '42', '100']
      array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should.eql(['10', '20', '25', '42', '100'])
      array = ['25', null, '10', undefined, '20', null, '42', undefined, '100']
      array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should
        .eql(['10', '20', '25', '42', '100', null, null, undefined , undefined])

    it 'Numbers should return the right value', ->
      hx.sort.localeCompare(undefined, {nullsLast: true})(1, 2).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(2, 1).should.equal(1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(1, 1).should.equal(0)
      hx.sort.localeCompare(undefined, {nullsLast: true})(1, undefined).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(undefined, 1).should.equal(1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(1, null).should.equal(-1)
      hx.sort.localeCompare(undefined, {nullsLast: true})(null, 1).should.equal(1)

    it 'Arrays of numbers should return the right value', ->
      array = [100, null, 200, undefined, 1, null, 20, 2, 10]
      array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should.eql([1, 2, 10, 20, 100, 200, null, null, undefined])

    it 'Array with localised characters should return the right value', ->
      if navigator.userAgent.indexOf 'Phantom' > -1
        true.should.equal(true)
      else
        array = ['e', 'z', 'è', 'a', 'é', 'ä']

        array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
        if supportsOptions()
          array.sort(hx.sort.localeCompareNullsLast('sv', {nullsLast: true})).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
          array.sort(hx.sort.localeCompareNullsLast('de', {nullsLast: true})).should.eql(['a', 'e', 'é', 'è', 'z', 'ä'])

    it 'Arrays with localised characters and undefined values should sort null and undefined to the end', ->
      if navigator.userAgent.indexOf 'Phantom' > -1
        true.should.equal(true)
      else
        array = ['é', null, 'e', undefined, 'z', null, 'è', undefined, 'a', 'ä']
        array.sort(hx.sort.localeCompare(undefined, {nullsLast: true})).should.eql(['a', 'ä', 'e', 'é', 'è', 'z', null, null, undefined, undefined])
        if supportsOptions()
          array.sort(hx.sort.localeCompareNullsLast('sv', {nullsLast: true})).should
            .eql(['a', 'ä', 'e', 'é', 'è', 'z', null, null, undefined, undefined])
          array.sort(hx.sort.localeCompareNullsLast('de', {nullsLast: true})).should
            .eql(['a', 'e', 'é', 'è', 'z', 'ä', null, null, undefined, undefined])

  describe 'using localeCompareNullsLast potentially with Intl.Collator. ', localeCompareNullsLastTests

  describe 'using localeCompareNullsLast without Intl.Collator. ', runWithoutCollator(localeCompareNullsLastTests)
