filter = require('modules/filter/main')

describe 'filter tests', ->

  runSpecsForSource = (array, options, type) ->

    callFilter = (type, term, options) ->
      filter[type](array, term, options)

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

        callFilter('fuzzy', 'pete', options).should.eql([])
        callFilter('fuzzy', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('fuzzy', 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('fuzzy', 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        callFilter('fuzzy', 'ao', options).should.eql(getResult([{name: 'Alejandro', age: '90' }]))
        callFilter('fuzzy', 'ae', options).should.eql(getResult([{name: 'Alejandro', age: '90' }, {name: 'Dave', age: '12' }, {name: 'Kate', age: '56' }]))
        callFilter('fuzzy', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
        '.()-[]{}\\^|$?*+!'.split().forEach (char) ->
          callFilter('fuzzy', char, options).should.eql(getResult([{name: '.()-[]{}\\^|$?*+!', age: '32' }]))
        callFilter('fuzzy', '.()-[]{}\\^|$?*+!', options).should.eql(getResult([{name: '.()-[]{}\\^|$?*+!', age: '32' }]))


      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        callFilter('fuzzy', 'pete', options).should.eql([])
        callFilter('fuzzy', 'dave', options).should.eql([])
        callFilter('fuzzy', 'dav', options).should.eql([])
        callFilter('fuzzy', 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        callFilter('fuzzy', 'ao', options).should.eql(getResult([{name: 'Alejandro', age: '90' }]))
        callFilter('fuzzy', 'ae', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Kate', age: '56' }]))
        callFilter('fuzzy', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        callFilter('fuzzy', 'pete', options).should.eql([])
        callFilter('fuzzy', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('fuzzy', 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('fuzzy', 've', options).should.eql(getResult([{name: 'Steve', age: '34' }, {name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
        callFilter('fuzzy', 'ao', options).should.eql(getResult([{name: 'Alejandro', age: '90' }]))
        callFilter('fuzzy', 'ae', options).should.eql(getResult([{name: 'Kate', age: '56' }, {name: 'Dave', age: '12' }, {name: 'Alejandro', age: '90' }]))
        callFilter('fuzzy', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




    describe 'exact should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        callFilter('exact', 'pete', options).should.eql([])
        if type is 'str'
          callFilter('exact', 'dave', options).should.eql([])
        else
          callFilter('exact', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('exact', 'dav', options).should.eql([])
        callFilter('exact', 've', options).should.eql([])
        callFilter('exact', 'ao', options).should.eql([])
        callFilter('exact', 'ae', options).should.eql([])
        if type is 'str'
          callFilter('exact', '12', options).should.eql([])
        else
          callFilter('exact', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        callFilter('exact', 'pete', options).should.eql([])
        callFilter('exact', 'dave', options).should.eql([])
        callFilter('exact', 'dav', options).should.eql([])
        callFilter('exact', 've', options).should.eql([])
        callFilter('exact', 'ao', options).should.eql([])
        callFilter('exact', 'ae', options).should.eql([])
        if type is 'str'
          callFilter('exact', '12', options).should.eql([])
        else
          callFilter('exact', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        callFilter('exact', 'pete', options).should.eql([])
        if type is 'str'
          callFilter('exact', 'dave', options).should.eql([])
        else
          callFilter('exact', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('exact', 'dav', options).should.eql([])
        callFilter('exact', 've', options).should.eql([])
        callFilter('exact', 'ao', options).should.eql([])
        callFilter('exact', 'ae', options).should.eql([])
        if type is 'str'
          callFilter('exact', '12', options).should.eql([])
        else
          callFilter('exact', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




    describe 'startsWith should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        callFilter('startsWith', 'pete', options).should.eql([])
        callFilter('startsWith', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('startsWith', 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('startsWith', 've', options).should.eql([])
        callFilter('startsWith', 'ao', options).should.eql([])
        callFilter('startsWith', 'ae', options).should.eql([])
        if type is 'str'
          callFilter('startsWith', '12', options).should.eql([])
        else
          callFilter('startsWith', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        callFilter('startsWith', 'pete', options).should.eql([])
        callFilter('startsWith', 'dave', options).should.eql([])
        callFilter('startsWith', 'dav', options).should.eql([])
        callFilter('startsWith', 've', options).should.eql([])
        callFilter('startsWith', 'ao', options).should.eql([])
        callFilter('startsWith', 'ae', options).should.eql([])
        if type is 'str'
          callFilter('startsWith', '12', options).should.eql([])
        else
          callFilter('startsWith', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        callFilter('startsWith', 'pete', options).should.eql([])
        callFilter('startsWith', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('startsWith', 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('startsWith', 've', options).should.eql([])
        callFilter('startsWith', 'ao', options).should.eql([])
        callFilter('startsWith', 'ae', options).should.eql([])
        if type is 'str'
          callFilter('startsWith', '12', options).should.eql([])
        else
          callFilter('startsWith', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




    describe 'contains should return the right results', ->

      it 'when using default options', ->
        if type is 'str'
          options = undefined
        else
          options ?= {}
          options.caseSensitive = false
          options.sort = true

        callFilter('contains', 'pete', options).should.eql([])
        callFilter('contains', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('contains', 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('contains', 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        callFilter('contains', 'ao', options).should.eql([])
        callFilter('contains', 'ae', options).should.eql([])
        callFilter('contains', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when using case sensitivity', ->
        options ?= {}
        options.caseSensitive = true
        options.sort = true
        callFilter('contains', 'pete', options).should.eql([])
        callFilter('contains', 'dave', options).should.eql([])
        callFilter('contains', 'dav', options).should.eql([])
        callFilter('contains', 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
        callFilter('contains', 'ao', options).should.eql([])
        callFilter('contains', 'ae', options).should.eql([])
        callFilter('contains', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

      it 'when not sorting', ->
        options ?= {}
        options.caseSensitive = false
        options.sort = false
        callFilter('contains', 'pete', options).should.eql([])
        callFilter('contains', 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('contains', 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
        callFilter('contains', 've', options).should.eql(getResult([{name: 'Steve', age: '34' }, {name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
        callFilter('contains', 'ao', options).should.eql([])
        callFilter('contains', 'ae', options).should.eql([])
        callFilter('contains', '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))



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
