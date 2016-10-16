const merge = (objs) => {
  const res = {}
  objs.forEach((obj) => {
    if (obj) {
      if (obj.hx) {
        Object.keys(obj.hx).forEach((k) => {
          res[k] = obj.hx[k]
        })
        if (obj.hx.init) {
          obj.hx.init()
        }
      }
    }
  })

  return res
}

module.exports = window.hx = merge([
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
  require('./view/main'),
  require('./sort/main'),
  require('./component/main'),
  require('./morphs/main'),
  require('./click-detector/main'),
  require('./modal/main'),
  require('./notify/main'),
  require('./filter/main'),
  require('./user-facing-text/main'),
  require('./form/main'),
  require('./dropdown/main'),
  require('./collapsible/main'),
  require('./palette/main'),
  require('./format/main'),
  require('./resize-events/main'),
  require('./menu/main'),
  require('./preferences/main'),
  require('./date-localizer/main'),
  require('./autocomplete/main'),
  require('./number-picker/main'),
  require('./drag-container/main'),
  require('./progress-bar/main'),
  require('./sticky-table-headers/main'),
  require('./autocomplete-feed/main'),
  require('./picker/main'),
  require('./button-group/main')
])
