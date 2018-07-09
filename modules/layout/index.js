import { div } from 'modules/selection'

// XXX 2.0.0: this has changed - needs documenting (it has moved module, and the api has changed)

function group (options = {}) {
  const {
    vertical = false,
    fixed = false
  } = options

  return div('hx-group')
    .classed('hx-horizontal', !vertical)
    .classed('hx-vertical', vertical)
    .classed('hx-fixed', fixed)
}

function section (options = {}) {
  const {
    fixed = false
  } = options

  return div('hx-section')
    .classed('hx-fixed', fixed)
}

export { group, section }
