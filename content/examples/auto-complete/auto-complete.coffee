# Data is shared across examples so is loaded before initialising the auto completes
townData = []
townAndCountyData = []

hx.json 'data.json', (error, result) ->
  townData = result
  dataLoaded()

hx.json 'data2.json', (error, result) ->
  townAndCountyData = result
  dataLoaded()

dataLoaded = ->
  if townData.length > 0 and townAndCountyData.length > 0
    init()

init = ->

  # Default
  data = townData
  new hx.AutoComplete('#autoComplete-Default', data)


  # Trim trailing spaces
  data = townData
  new hx.AutoComplete('#autoComplete-TrailingSpaces', data, {trimTrailingSpaces: true})


  # Data as a callback function
  data = (term, callback) ->
    if term.indexOf('a') is 0
      @options.noResultsMessage = ''
      callback townData.filter (d) -> d.toLowerCase().indexOf('y') is 0
    else
      @options.noResultsMessage = 'No results found...'
      callback townData
  new hx.AutoComplete('#autoComplete-Function', data)


  # Dont show all on first click
  options = {
    showAll: false
  }
  data = townData
  new hx.AutoComplete('#autoComplete-ShowAll', data, options)


  # Custom Input Map
  options = {
    inputMap: (item) -> item.name + ', ' + item.county
  }
  data = townAndCountyData
  new hx.AutoComplete('#autoComplete-InputMap', data, options)


  # Custom Renderer / Data Map
  options = {
    inputMap: (item) -> item.name
    renderer: (elem, item) ->
      hx.select(elem)
        .text(item.name)
        .append('span')
          .class('hx-label')
          .text(item.county)
  }
  data = townAndCountyData
  new hx.AutoComplete('#autoComplete-Renderer', data, options)


  # Placeholder Text
  options = {
    placeholder: 'Please enter a UK town...'
  }
  data = townData
  new hx.AutoComplete('#autoComplete-Placeholder', data, options)


  # Min Length
  options = {
    minLength: 2
  }
  data = townData
  new hx.AutoComplete('#autoComplete-Length', data, options)


  # Case Sensitive
  options = {
    filterOptions:
      caseSensitive: true
  }
  data = townData
  new hx.AutoComplete('#autoComplete-Case', data, options)


  # Exact match
  options = {
    matchType: 'exact'
  }
  data = townData
  new hx.AutoComplete('#autoComplete-Exact', data, options)


  # Exact case sensitive match
  options = {
    matchType:'exact'
    filterOptions:
      caseSensitive: true
  }
  data = townData
  new hx.AutoComplete('#autoComplete-ExactCase', data, options)


  # startsWith match
  options = {
    matchType: 'startsWith'
  }
  data = townData
  new hx.AutoComplete('#autoComplete-StartsWith', data, options)


  # startsWith case sensitive match
  options = {
    matchType:'startsWith'
    filterOptions:
      caseSensitive: true
  }
  data = townData
  new hx.AutoComplete('#autoComplete-StartsWithCase', data, options)


  # Final value must match value from suggestions
  options = {
    mustMatch: true
  }
  data = townData
  new hx.AutoComplete('#autoComplete-MustMatch', data, options)


  # External matcher, looks at county or town
  options = {
    matchType: 'external'
    inputMap: (item) -> item.name
    renderer: (elem, item) ->
      hx.select(elem).text(item.name + ', ' + item.county)
  }
  data = (term, callback) ->
    if term.length > 0
      delay = Math.round(Math.random()*3000) + 1000
      setTimeout =>
        data = hx.filter.contains townAndCountyData, term, {searchValues: (d) -> [d.name, d.county]}
        callback data
      , delay
    else
      callback []
  new hx.AutoComplete('#autoComplete-External', data, options)

  # External matcher, looks at county or town and must match
  options = {
    mustMatch: true
    matchType: 'external'
    inputMap: (item) -> item.name
    renderer: (elem, item) ->
      hx.select(elem).text(item.name + ', ' + item.county)
  }
  data = (term, callback) ->
    delay = Math.round(Math.random()*3000) + 1000
    setTimeout =>
      data = hx.filter.contains townAndCountyData, term, {searchValues: (d) -> [d.name, d.county]}
      callback data
    , delay
  new hx.AutoComplete('#autoComplete-ExternalMustMatch', data, options)


  # Fuzzy search
  options = {
    matchType: 'fuzzy'
  }
  data = townData
  new hx.AutoComplete('#autoComplete-Fuzzy', data, options)


  # Case sensitive Fuzzy Search
  options = {
    matchType: 'fuzzy'
    filterOptions:
      caseSensitive: true
  }
  data = townData
  new hx.AutoComplete('#autoComplete-FuzzyCase', data, options)


  # Show Other results
  options = {
    matchType: 'contains'
    showOtherResults: true
    otherResultsMessage: 'Other Places'
  }
  data = townData
  new hx.AutoComplete('#autoComplete-ShowOthers', data, options)