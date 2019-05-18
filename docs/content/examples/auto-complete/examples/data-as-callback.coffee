data = (term, callback) ->
  if term.indexOf('a') is 0
    @options.noResultsMessage = ''
    callback nameData.filter (d) -> d.toLowerCase().indexOf('y') is 0
  else
    @options.noResultsMessage = 'No results found...'
    callback nameData
new hx.AutoComplete('#autoComplete-Function', data)