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
    data = hx.filter.contains nameAndLocationData, term, {searchValues: (d) -> [d.name, d.county]}
    callback data
  , delay
new hx.AutoComplete('#autoComplete-ExternalMustMatch', data, options)