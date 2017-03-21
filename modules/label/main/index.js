const palette = require('modules/palette/main')
const { span } = require('modules/selection/main')

// XXX: 2.0.0 moved modules (from fluid) - document this change

function label (options = {}) {
  const { context } = options
  return palette.context(span('hx-label'), context)
}

module.exports = label
module.exports.hx = {
  label
}
