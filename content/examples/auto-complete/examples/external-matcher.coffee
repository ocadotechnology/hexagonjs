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
      data = hx.filter.contains nameAndLocationData, term, {searchValues: (d) -> [d.name, d.county]}
      callback data
    , delay
  else
    callback []
new hx.AutoComplete('#autoComplete-External', data, options)