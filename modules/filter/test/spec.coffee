describe 'hx-filter tests', ->

  runSpecsForSource = (array, options, type) ->

    callFilter = (type, term, options) ->
      hx.filter[type](array, term, options)

    getResult = (terms) ->
      switch type
        when 'str'
          terms.map (d) -> d.name + ' ' + d.age
        when 'arr'
          terms.map (d) -> [d.name, d.age]
        when 'obj'
          terms



    describe 'fuzzy should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        expect(callFilter('fuzzy', 'pete', options)).toEqual([])
        expect(callFilter('fuzzy', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('fuzzy', 'dav', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('fuzzy', 've', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        expect(callFilter('fuzzy', 'ao', options)).toEqual(getResult([{name: 'Alejandro', age: '90' }]))
        expect(callFilter('fuzzy', 'ae', options)).toEqual(getResult([{name: 'Alejandro', age: '90' }, {name: 'Dave', age: '12' }, {name: 'Kate', age: '56' }]))
        expect(callFilter('fuzzy', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
        '.()-[]{}\\^|$?*+!'.split().forEach (char) ->
          expect(callFilter('fuzzy', char, options)).toEqual(getResult([{name: '.()-[]{}\\^|$?*+!', age: '32' }]))
        expect(callFilter('fuzzy', '.()-[]{}\\^|$?*+!', options)).toEqual(getResult([{name: '.()-[]{}\\^|$?*+!', age: '32' }]))


      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        expect(callFilter('fuzzy', 'pete', options)).toEqual([])
        expect(callFilter('fuzzy', 'dave', options)).toEqual([])
        expect(callFilter('fuzzy', 'dav', options)).toEqual([])
        expect(callFilter('fuzzy', 've', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        expect(callFilter('fuzzy', 'ao', options)).toEqual(getResult([{name: 'Alejandro', age: '90' }]))
        expect(callFilter('fuzzy', 'ae', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Kate', age: '56' }]))
        expect(callFilter('fuzzy', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        expect(callFilter('fuzzy', 'pete', options)).toEqual([])
        expect(callFilter('fuzzy', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('fuzzy', 'dav', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('fuzzy', 've', options)).toEqual(getResult([{name: 'Steve', age: '34' }, {name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
        expect(callFilter('fuzzy', 'ao', options)).toEqual(getResult([{name: 'Alejandro', age: '90' }]))
        expect(callFilter('fuzzy', 'ae', options)).toEqual(getResult([{name: 'Kate', age: '56' }, {name: 'Dave', age: '12' }, {name: 'Alejandro', age: '90' }]))
        expect(callFilter('fuzzy', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




    describe 'exact should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        expect(callFilter('exact', 'pete', options)).toEqual([])
        if type is 'str'
          expect(callFilter('exact', 'dave', options)).toEqual([])
        else
          expect(callFilter('exact', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('exact', 'dav', options)).toEqual([])
        expect(callFilter('exact', 've', options)).toEqual([])
        expect(callFilter('exact', 'ao', options)).toEqual([])
        expect(callFilter('exact', 'ae', options)).toEqual([])
        if type is 'str'
          expect(callFilter('exact', '12', options)).toEqual([])
        else
          expect(callFilter('exact', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        expect(callFilter('exact', 'pete', options)).toEqual([])
        expect(callFilter('exact', 'dave', options)).toEqual([])
        expect(callFilter('exact', 'dav', options)).toEqual([])
        expect(callFilter('exact', 've', options)).toEqual([])
        expect(callFilter('exact', 'ao', options)).toEqual([])
        expect(callFilter('exact', 'ae', options)).toEqual([])
        if type is 'str'
          expect(callFilter('exact', '12', options)).toEqual([])
        else
          expect(callFilter('exact', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        expect(callFilter('exact', 'pete', options)).toEqual([])
        if type is 'str'
          expect(callFilter('exact', 'dave', options)).toEqual([])
        else
          expect(callFilter('exact', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('exact', 'dav', options)).toEqual([])
        expect(callFilter('exact', 've', options)).toEqual([])
        expect(callFilter('exact', 'ao', options)).toEqual([])
        expect(callFilter('exact', 'ae', options)).toEqual([])
        if type is 'str'
          expect(callFilter('exact', '12', options)).toEqual([])
        else
          expect(callFilter('exact', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




    describe 'startsWith should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        expect(callFilter('startsWith', 'pete', options)).toEqual([])
        expect(callFilter('startsWith', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('startsWith', 'dav', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('startsWith', 've', options)).toEqual([])
        expect(callFilter('startsWith', 'ao', options)).toEqual([])
        expect(callFilter('startsWith', 'ae', options)).toEqual([])
        if type is 'str'
          expect(callFilter('startsWith', '12', options)).toEqual([])
        else
          expect(callFilter('startsWith', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        expect(callFilter('startsWith', 'pete', options)).toEqual([])
        expect(callFilter('startsWith', 'dave', options)).toEqual([])
        expect(callFilter('startsWith', 'dav', options)).toEqual([])
        expect(callFilter('startsWith', 've', options)).toEqual([])
        expect(callFilter('startsWith', 'ao', options)).toEqual([])
        expect(callFilter('startsWith', 'ae', options)).toEqual([])
        if type is 'str'
          expect(callFilter('startsWith', '12', options)).toEqual([])
        else
          expect(callFilter('startsWith', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        expect(callFilter('startsWith', 'pete', options)).toEqual([])
        expect(callFilter('startsWith', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('startsWith', 'dav', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('startsWith', 've', options)).toEqual([])
        expect(callFilter('startsWith', 'ao', options)).toEqual([])
        expect(callFilter('startsWith', 'ae', options)).toEqual([])
        if type is 'str'
          expect(callFilter('startsWith', '12', options)).toEqual([])
        else
          expect(callFilter('startsWith', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




    describe 'contains should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        expect(callFilter('contains', 'pete', options)).toEqual([])
        expect(callFilter('contains', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('contains', 'dav', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('contains', 've', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        expect(callFilter('contains', 'ao', options)).toEqual([])
        expect(callFilter('contains', 'ae', options)).toEqual([])
        expect(callFilter('contains', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        expect(callFilter('contains', 'pete', options)).toEqual([])
        expect(callFilter('contains', 'dave', options)).toEqual([])
        expect(callFilter('contains', 'dav', options)).toEqual([])
        expect(callFilter('contains', 've', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        expect(callFilter('contains', 'ao', options)).toEqual([])
        expect(callFilter('contains', 'ae', options)).toEqual([])
        expect(callFilter('contains', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        expect(callFilter('contains', 'pete', options)).toEqual([])
        expect(callFilter('contains', 'dave', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('contains', 'dav', options)).toEqual(getResult([{name: 'Dave', age: '12' }]))
        expect(callFilter('contains', 've', options)).toEqual(getResult([{name: 'Steve', age: '34' }, {name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
        expect(callFilter('contains', 'ao', options)).toEqual([])
        expect(callFilter('contains', 'ae', options)).toEqual([])
        expect(callFilter('contains', '12', options)).toEqual(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))



  stringArray = [
    'Steve 34'
    'Kate 56'
    'Dave 12'
    'Steve 12'
    'Bob 78'
    'Alejandro 90',
    '.()-[]{}\\^|$?*+! 32'
  ]
  objectArray = [
    {
      name: 'Steve'
      age: '34'
    },{
      name: 'Kate'
      age: '56'
    },{
      name: 'Dave'
      age: '12'
    },{
      name: 'Steve'
      age: '12'
    },{
      name: 'Bob'
      age: '78'
    },{
      name: 'Alejandro'
      age: '90'
    }, {
      name: '.()-[]{}\\^|$?*+!'
      age: '32'
    }
  ]
  nestedArray = [
    ['Steve', '34']
    ['Kate', '56']
    ['Dave', '12']
    ['Steve', '12']
    ['Bob', '78']
    ['Alejandro', '90']
    ['.()-[]{}\\^|$?*+!', '32']
  ]

  describe 'a string based array using hx.filter', ->
    runSpecsForSource(stringArray, {}, 'str')

  describe 'an object based array using hx.filter', ->
    runSpecsForSource(objectArray, {searchValues: ((d) -> [d.name, d.age])}, 'obj')

  describe 'a nested array using hx.filter', ->
    runSpecsForSource(nestedArray, {searchValues: ((d) ->  d)}, 'arr')
