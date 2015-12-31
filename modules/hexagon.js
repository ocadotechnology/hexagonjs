const merge = (objs) => {
  const res = {}
  objs.forEach((obj) => {
    Object.keys(obj.hx).forEach((k) => {
      res[k] = obj.hx[k]
    })
  })
  return res
}

module.export = merge([
  require('./set/main'),
// require('./list/main'),
// require('./map/main')
])
