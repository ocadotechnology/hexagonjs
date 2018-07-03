import {
  filterExact,
  filterStartsWith,
  filterContains,
  filterExcludes,
  filterGreater,
  filterLess,
  filterFuzzy,
  filterRegex
} from 'filter/main'

export default () ->
  describe 'filter', ->

    runSpecsForSource = (array, options, type) ->

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

          filterFuzzy(array, 'pete', options).should.eql([])
          filterFuzzy(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterFuzzy(array, 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterFuzzy(array, 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
          filterFuzzy(array, 'ao', options).should.eql(getResult([{name: 'Alejandro', age: '90' }]))
          filterFuzzy(array, 'ae', options).should.eql(getResult([{name: 'Alejandro', age: '90' }, {name: 'Dave', age: '12' }, {name: 'Kate', age: '56' }]))
          filterFuzzy(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
          '.()-[]{}\\^|$?*+!'.split().forEach (char) ->
            filterFuzzy(array, char, options).should.eql(getResult([{name: '.()-[]{}\\^|$?*+!', age: '32' }]))
          filterFuzzy(array, '.()-[]{}\\^|$?*+!', options).should.eql(getResult([{name: '.()-[]{}\\^|$?*+!', age: '32' }]))


        it 'when using case sensitivity', ->
          options ?= {}
          options.caseSensitive = true
          options.sort = true
          filterFuzzy(array, 'pete', options).should.eql([])
          filterFuzzy(array, 'dave', options).should.eql([])
          filterFuzzy(array, 'dav', options).should.eql([])
          filterFuzzy(array, 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
          filterFuzzy(array, 'ao', options).should.eql(getResult([{name: 'Alejandro', age: '90' }]))
          filterFuzzy(array, 'ae', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Kate', age: '56' }]))
          filterFuzzy(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when not sorting', ->
          options ?= {}
          options.caseSensitive = false
          options.sort = false
          filterFuzzy(array, 'pete', options).should.eql([])
          filterFuzzy(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterFuzzy(array, 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterFuzzy(array, 've', options).should.eql(getResult([{name: 'Steve', age: '34' }, {name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
          filterFuzzy(array, 'ao', options).should.eql(getResult([{name: 'Alejandro', age: '90' }]))
          filterFuzzy(array, 'ae', options).should.eql(getResult([{name: 'Kate', age: '56' }, {name: 'Dave', age: '12' }, {name: 'Alejandro', age: '90' }]))
          filterFuzzy(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




      describe 'exact should return the right results', ->

        it 'when using default options', ->
          if type is 'str'
            options = undefined
          else
            options ?= {}
            options.caseSensitive = false
            options.sort = true

          filterExact(array, 'pete', options).should.eql([])
          if type is 'str'
            filterExact(array, 'dave', options).should.eql([])
          else
            filterExact(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterExact(array, 'dav', options).should.eql([])
          filterExact(array, 've', options).should.eql([])
          filterExact(array, 'ao', options).should.eql([])
          filterExact(array, 'ae', options).should.eql([])
          if type is 'str'
            filterExact(array, '12', options).should.eql([])
          else
            filterExact(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when using case sensitivity', ->
          options ?= {}
          options.caseSensitive = true
          options.sort = true
          filterExact(array, 'pete', options).should.eql([])
          filterExact(array, 'dave', options).should.eql([])
          filterExact(array, 'dav', options).should.eql([])
          filterExact(array, 've', options).should.eql([])
          filterExact(array, 'ao', options).should.eql([])
          filterExact(array, 'ae', options).should.eql([])
          if type is 'str'
            filterExact(array, '12', options).should.eql([])
          else
            filterExact(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when not sorting', ->
          options ?= {}
          options.caseSensitive = false
          options.sort = false
          filterExact(array, 'pete', options).should.eql([])
          if type is 'str'
            filterExact(array, 'dave', options).should.eql([])
          else
            filterExact(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterExact(array, 'dav', options).should.eql([])
          filterExact(array, 've', options).should.eql([])
          filterExact(array, 'ao', options).should.eql([])
          filterExact(array, 'ae', options).should.eql([])
          if type is 'str'
            filterExact(array, '12', options).should.eql([])
          else
            filterExact(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




      describe 'startsWith should return the right results', ->

        it 'when using default options', ->
          if type is 'str'
            options = undefined
          else
            options ?= {}
            options.caseSensitive = false
            options.sort = true

          filterStartsWith(array, 'pete', options).should.eql([])
          filterStartsWith(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterStartsWith(array, 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterStartsWith(array, 've', options).should.eql([])
          filterStartsWith(array, 'ao', options).should.eql([])
          filterStartsWith(array, 'ae', options).should.eql([])
          if type is 'str'
            filterStartsWith(array, '12', options).should.eql([])
          else
            filterStartsWith(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when using case sensitivity', ->
          options ?= {}
          options.caseSensitive = true
          options.sort = true
          filterStartsWith(array, 'pete', options).should.eql([])
          filterStartsWith(array, 'dave', options).should.eql([])
          filterStartsWith(array, 'dav', options).should.eql([])
          filterStartsWith(array, 've', options).should.eql([])
          filterStartsWith(array, 'ao', options).should.eql([])
          filterStartsWith(array, 'ae', options).should.eql([])
          if type is 'str'
            filterStartsWith(array, '12', options).should.eql([])
          else
            filterStartsWith(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when not sorting', ->
          options ?= {}
          options.caseSensitive = false
          options.sort = false
          filterStartsWith(array, 'pete', options).should.eql([])
          filterStartsWith(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterStartsWith(array, 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterStartsWith(array, 've', options).should.eql([])
          filterStartsWith(array, 'ao', options).should.eql([])
          filterStartsWith(array, 'ae', options).should.eql([])
          if type is 'str'
            filterStartsWith(array, '12', options).should.eql([])
          else
            filterStartsWith(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))




      describe 'contains should return the right results', ->

        it 'when using default options', ->
          if type is 'str'
            options = undefined
          else
            options ?= {}
            options.caseSensitive = false
            options.sort = true

          filterContains(array, 'pete', options).should.eql([])
          filterContains(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterContains(array, 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterContains(array, 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
          filterContains(array, 'ao', options).should.eql([])
          filterContains(array, 'ae', options).should.eql([])
          filterContains(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when using case sensitivity', ->
          options ?= {}
          options.caseSensitive = true
          options.sort = true
          filterContains(array, 'pete', options).should.eql([])
          filterContains(array, 'dave', options).should.eql([])
          filterContains(array, 'dav', options).should.eql([])
          filterContains(array, 've', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }, {name: 'Steve', age: '34' }]))
          filterContains(array, 'ao', options).should.eql([])
          filterContains(array, 'ae', options).should.eql([])
          filterContains(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))

        it 'when not sorting', ->
          options ?= {}
          options.caseSensitive = false
          options.sort = false
          filterContains(array, 'pete', options).should.eql([])
          filterContains(array, 'dave', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterContains(array, 'dav', options).should.eql(getResult([{name: 'Dave', age: '12' }]))
          filterContains(array, 've', options).should.eql(getResult([{name: 'Steve', age: '34' }, {name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))
          filterContains(array, 'ao', options).should.eql([])
          filterContains(array, 'ae', options).should.eql([])
          filterContains(array, '12', options).should.eql(getResult([{name: 'Dave', age: '12' }, {name: 'Steve', age: '12' }]))



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
