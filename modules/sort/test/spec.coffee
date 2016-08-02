sort = require('modules/sort/main')

describe 'sort', ->

  describe "sort", ->
    it "should work", ->
      a = [3, 1, 2]
      b = sort.sort(a)
      b.should.eql([1, 2, 3])

      c = ['c', 'a', 'b']
      d = sort.sort(c)
      d.should.eql(['a', 'b', 'c'])

   it "should not modify the original array", ->
     a = [3, 2, 1]
     b = sort.sort(a)
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
      peopleCopySorted = sort.sortBy(peopleCopy, (x) -> x.ageYears)
      peopleCopy[0].name.should.equal('Bob')
      peopleCopySorted[0].name.should.equal('Lazlo')

    it "should work", ->
      byName = sort.sortBy(people, (x) -> x.name)
      byAge = sort.sortBy(people, (x) -> x.ageYears)
      byName.map((x) -> x.name).should.eql(['Bob', 'Ganesh', 'Kate', 'Lazlo'])
      byAge.map((x) -> x.name).should.eql(['Lazlo', 'Ganesh', 'Bob', 'Kate'])


  describe 'using standard compare. ', ->
    it 'Strings should return the right value', ->
      sort.compare('a','b').should.equal(-1)
      sort.compare('b','a').should.equal(1)
      sort.compare('a','a').should.equal(0)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      array.sort(sort.compare).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['25','10','20','42','100']
      array.sort(sort.compare).should.eql(['10','20','25','42','100'])

    it 'Numbers should return the right value', ->
      sort.compare(1,2).should.equal(-1)
      sort.compare(2,1).should.equal(1)
      sort.compare(1,1).should.equal(0)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      array.sort(sort.compare).should.eql([1,2,10,20,100,200])

  describe 'using localeCompare. ', ->
    supportsOptions = ->
      try
        'a'.localeCompare('b','i')
      catch e
        e is 'RangeError'
      false

    it 'Strings should return the right value', ->
      sort.localeCompare()('a','b').should.equal(-1)
      sort.localeCompare()('b','a').should.equal(1)
      sort.localeCompare()('a','a').should.equal(0)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      array.sort(sort.localeCompare()).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['25','10','20','42','100']
      array.sort(sort.localeCompare()).should.eql(['10','20','25','42','100'])

    it 'Numbers should return the right value', ->
      sort.localeCompare()(1, 2).should.equal(-1)
      sort.localeCompare()(2,1).should.equal(1)
      sort.localeCompare()(1,1).should.equal(0)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      array.sort(sort.localeCompare()).should.eql([1,2,10,20,100,200])


    it 'Array with localised characters should return the right value', ->
      if navigator.userAgent.indexOf 'Phantom' > -1
        true.should.equal(true)
      else
        array = ['é', 'e', 'z', 'è', 'a', 'ä']

        array.sort(sort.localeCompare()).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
        if supportsOptions()
          array.sort(sort.localeCompare('sv')).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
          array.sort(sort.localeCompare('de')).should.eql(['a', 'e', 'é', 'è', 'z', 'ä'])
