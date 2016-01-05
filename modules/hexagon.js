const merge = (objs) => {
  const res = {}
  objs.forEach((obj) => {
    Object.keys(obj.hx).forEach((k) => {
      res[k] = obj.hx[k]
    })
  })

  return res
}

export default merge([
  require('./set/main'),
  require('./map/main'),
  require('./list/main')
])
