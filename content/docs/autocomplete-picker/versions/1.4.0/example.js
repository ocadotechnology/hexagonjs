var data = [{
  name: 'Moorgate',
  county: 'London'
}, {
  name: 'Old Street',
  county: 'London'
}, {
  name: 'Canterbury',
  county: 'Kent'
}, {
  name: 'Dover',
  county: 'Kent'
}]

function items (term, callback) {
  if (term.length > 0) {
    var a, county, d, name, i, len
    a = []
    len = data.length
    for (i = 0; i < len; i++) {
      d = data[i]
      name = d.name.toLowerCase()
      county = d.county.toLowerCase()
      term = term.toLowerCase()
      if (name.indexOf(term) > -1 || county.indexOf(term) > -1) {
        a.push(d)
      }
    }
    return callback(a)
  } else {
    return callback(data)
  }
}
function renderer (elem, item) {
  hx.select(elem)
    .add(hx.detached('span').text(item.name))
    .add(hx.label().text(item.county))
}
var autocompletePicker = new hx.AutocompletePicker('#autocompletePicker-externalMatch', items, {
  renderer: renderer,
  matchType: 'external'
})
