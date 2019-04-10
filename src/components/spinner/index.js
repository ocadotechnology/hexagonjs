import { div, span } from 'utils/selection';

// XXX: 2.0.0: this api has moved and has changed - document these changes
// - moved from fluid to spinner
// spinner.wide has become spinnerWide

function spinner() {
  return span('hx-spinner');
}

function spinnerWide() {
  return div('hx-spinner-wide');
}

// XXX Deprecated: Fluid
spinner.wide = spinnerWide;

export {
  spinner,
  spinnerWide,
};
