
merge = (objs) ->
  res = {}
  for obj in objs
    for k of obj.hx
      res[k] = obj[k]

window.hx = hx = merge([
  require('./set/main'),
  require('./list/main'),
  require('./map/main')
])

module.export = hx