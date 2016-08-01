const merge = (objs) => {
  const res = {}
  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj.hx).forEach((k) => {
        res[k] = obj.hx[k]
      })
      if (obj.hx && obj.hx.init) {
        obj.hx.init()
      }
    }
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
  require('./interpolate/main'),
  require('./animate/main'),
  require('./pointer-events/main'),
  require('./view/main')
])
