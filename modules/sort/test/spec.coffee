describe 'hx-sort tests', ->

  describe "sort", ->
    it "should work", ->
      a = [3, 1, 2]
      b = hx.sort a
      expect b
        .toEqual [1, 2, 3]

      c = ['c', 'a', 'b']
      d = hx.sort c
      expect d
        .toEqual ['a', 'b', 'c']

   it "should not modify the original array", ->
     a = [3, 2, 1]
     b = hx.sort a
     expect a[0]
       .toEqual 3
     expect b[0]
       .toEqual 1

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
      expect peopleCopy[0].name
        .toEqual 'Bob'
      expect peopleCopySorted[0].name
        .toEqual 'Lazlo'

    it "should work", ->
      byName = hx.sortBy people, (x) -> x.name
      byAge = hx.sortBy people, (x) -> x.ageYears
      expect byName.map (x) -> x.name
        .toEqual ['Bob', 'Ganesh', 'Kate', 'Lazlo']
      expect byAge.map (x) -> x.name
        .toEqual ['Lazlo', 'Ganesh', 'Bob', 'Kate']


  describe 'using standard compare. ', ->
    it 'Strings should return the right value', ->
      expect(hx.sort.compare('a','b')).toEqual(-1)
      expect(hx.sort.compare('b','a')).toEqual(1)
      expect(hx.sort.compare('a','a')).toEqual(0)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      expect(array.sort hx.sort.compare).toEqual(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['25','10','20','42','100']
      expect(array.sort hx.sort.compare).toEqual(['10','20','25','42','100'])

    it 'Numbers should return the right value', ->
      expect(hx.sort.compare(1,2)).toEqual(-1)
      expect(hx.sort.compare(2,1)).toEqual(1)
      expect(hx.sort.compare(1,1)).toEqual(0)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      expect(array.sort hx.sort.compare).toEqual([1,2,10,20,100,200])

  describe 'using localeCompare. ', ->
    supportsOptions = ->
      try
        'a'.localeCompare('b','i')
      catch e
        e is 'RangeError'
      false

    it 'Strings should return the right value', ->
      expect(hx.sort.localeCompare()('a','b')).toEqual(-1)
      expect(hx.sort.localeCompare()('b','a')).toEqual(1)
      expect(hx.sort.localeCompare()('a','a')).toEqual(0)

    it 'Arrays should return the right value', ->
      array = ['c', 'a', 'b', 'aa', 'ab', 'ac', '1', '2']
      expect(array.sort hx.sort.localeCompare()).toEqual(['1', '2', 'a', 'aa', 'ab', 'ac', 'b', 'c'])
      array = ['25','10','20','42','100']
      expect(array.sort hx.sort.localeCompare()).toEqual(['10','20','25','42','100'])

    it 'Numbers should return the right value', ->
      expect(hx.sort.localeCompare()(1, 2)).toEqual(-1)
      expect(hx.sort.localeCompare()(2,1)).toEqual(1)
      expect(hx.sort.localeCompare()(1,1)).toEqual(0)

    it 'Arrays of numbers should return the right value', ->
      array = [100, 200, 1, 20, 2, 10]
      expect(array.sort hx.sort.localeCompare()).toEqual([1,2,10,20,100,200])


    it 'Array with localised characters should return the right value', ->
      if navigator.userAgent.indexOf 'Phantom' > -1
        expect(true).toEqual(true)
      else
        array = ['é', 'e', 'z', 'è', 'a', 'ä']

        expect(array.sort(hx.sort.localeCompare())).toEqual(['a', 'ä', 'e', 'é', 'è', 'z'])
        if supportsOptions()
          expect(array.sort(hx.sort.localeCompare('sv'))).toEqual(['a', 'ä', 'e', 'é', 'è', 'z'])
          expect(array.sort(hx.sort.localeCompare('de'))).toEqual(['a', 'e', 'é', 'è', 'z', 'ä'])
