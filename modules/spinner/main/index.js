const { div, span } = require('modules/selection/main')

// XXX: 2.0.0: this api has moved and has changed - document these changes
// - moved from fluid to spinner
// spinner.wide has become spinnerWide

function spinner () {
  return span('hx-spinner')
}

function spinnerWide () {
  return div('hx-spinner-wide')
}

module.exports = {
  spinner,
  spinnerWide,
  hx: {
    spinner,
    spinnerWide
  }
}
