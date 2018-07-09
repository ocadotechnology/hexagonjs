import { div, span } from 'utils/selection'

// XXX: 2.0.0: this api has moved and has changed - document these changes
// - moved from fluid to spinner
// spinner.wide has become spinnerWide

export function spinner () {
  return span('hx-spinner')
}

export function spinnerWide () {
  return div('hx-spinner-wide')
}
