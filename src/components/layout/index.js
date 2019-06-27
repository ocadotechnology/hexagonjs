import { div } from 'utils/selection';

// XXX 2.0.0: this has changed - needs documenting (it has moved module, and the api has changed)

function group(options = {}) {
  const {
    vertical = false,
    fixed = false,
    compact = false,
  } = options;

  return div(compact ? 'hx-compact-group' : 'hx-group')
    .classed('hx-horizontal', !vertical)
    .classed('hx-vertical', vertical)
    .classed('hx-fixed', fixed);
}

const sectionSizes = ['small', 'medium', 'large'];
function section(options = {}) {
  const {
    fixed = false,
    size = undefined,
  } = options;

  const sectionSel = div('hx-section')
    .classed('hx-fixed', fixed);

  if (size && sectionSizes.includes(size)) {
    sectionSel.classed(`hx-${size}`, true);
  }

  return sectionSel;
}

// XXX Deprecated: Fluid
group.vertical = () => group({ vertical: true });
group.vertical.fixed = () => group({ vertical: true, fixed: true });
group.fixed = () => group({ fixed: true });
section.fixed = () => section({ fixed: true });

export { group, section };
