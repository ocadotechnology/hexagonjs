import { compare, localeCompare, sortBy, sort } from 'modules/sort/main'

export default () ->
  describe 'sort', ->
    describe "sort", ->
      it "sorts numbers", ->
        sort([3, 1, 2]).should.eql([1, 2, 3])

      it "sorts strings", ->
        sort(['c', 'a', 'b']).should.eql(['a', 'b', 'c'])

     it "should not modify the original array", ->
       a = [3, 2, 1]
       b = sort(a)
       a[0].should.equal(3)
       b[0].should.equal(1)

    describe "sortBy", ->
      it "should not modify the original array", ->
        people = [
          { name: 'Bob', age: 20 },
          { name: 'Ganesh', age: 19 },
          { name: 'Kate', age: 39 },
          { name: 'Lazlo', age: 18 }
        ]
        people = [people...]
        peopleSorted = sortBy(people, (x) -> x.age)
        people[0].name.should.equal('Bob')
        peopleSorted[0].name.should.equal('Lazlo')

      it "should work", ->
        people = [
          { name: 'Bob', age: 20 },
          { name: 'Ganesh', age: 19 },
          { name: 'Kate', age: 39 },
          { name: 'Lazlo', age: 18 }
        ]
        byName = sortBy(people, (x) -> x.name)
        byAge = sortBy(people, (x) -> x.age)
        byName.map((x) -> x.name).should.eql(['Bob', 'Ganesh', 'Kate', 'Lazlo'])
        byAge.map((x) -> x.name).should.eql(['Lazlo', 'Ganesh', 'Bob', 'Kate'])


    describe 'compare', ->
      it 'Strings should return the right value', ->
        compare('a','b').should.equal(-1)
        compare('b','a').should.equal(1)
        compare('a','a').should.equal(0)

      it 'Arrays should return the right value', ->
        array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
        array.sort(compare).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
        array = ['25','10','20','42','100']
        array.sort(compare).should.eql(['10','20','25','42','100'])

      it 'Numbers should return the right value', ->
        compare(1,2).should.equal(-1)
        compare(2,1).should.equal(1)
        compare(1,1).should.equal(0)

      it 'Arrays of numbers should return the right value', ->
        array = [100, 200, 1, 20, 2, 10]
        array.sort(compare).should.eql([1,2,10,20,100,200])

    describe 'localeCompare', ->
      supportsOptions = ->
        try
          'a'.localeCompare('b', 'i')
        catch e
          e is 'RangeError'
        false

      it 'Strings should return the right value', ->
        localeCompare()('a','b').should.equal(-1)
        localeCompare()('b','a').should.equal(1)
        localeCompare()('a','a').should.equal(0)

      it 'Arrays should return the right value', ->
        array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
        array.sort(localeCompare()).should.eql(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
        array = ['25','10','20','42','100']
        array.sort(localeCompare()).should.eql(['10','20','25','42','100'])

      it 'Numbers should return the right value', ->
        localeCompare()(1, 2).should.equal(-1)
        localeCompare()(2,1).should.equal(1)
        localeCompare()(1,1).should.equal(0)

      it 'Arrays of numbers should return the right value', ->
        array = [100, 200, 1, 20, 2, 10]
        array.sort(localeCompare()).should.eql([1,2,10,20,100,200])

      if navigator.userAgent.indexOf 'Phantom' > -1
        it 'Array with localised characters should return the right value', ->
          array = ['é', 'e', 'z', 'è', 'a', 'ä']
          array.sort(localeCompare()).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
          if supportsOptions()
            array.sort(localeCompare('sv')).should.eql(['a', 'ä', 'e', 'é', 'è', 'z'])
            array.sort(localeCompare('de')).should.eql(['a', 'e', 'é', 'è', 'z', 'ä'])
