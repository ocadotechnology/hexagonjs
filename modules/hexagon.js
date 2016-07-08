const merge = (objs) => {
  const res = {}
  objs.forEach((obj) => {
    Object.keys(obj.hx).forEach((k) => {
      res[k] = obj.hx[k]
    })
  })

  return res
}

module.exports = merge([
  require('./set/main'),
  require('./map/main'),
  require('./list/main'),
  require('./color/main'),
  require('./util/main'),
  require('./event-emitter/main'),
  require('./selection/main'),
  require('./transition/main'),
  require('./interpolate/main')
])
