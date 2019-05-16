import { div, badge } from 'hexagon-js';

export default () => [
  badge().text('Default Label'),
  badge({ type: 'success' }).text('Success Label'),
  badge({ type: 'warning' }).text('Warning Label'),
  badge({ type: 'danger' }).text('Danger Label'),
  div(),
  badge({ inverse: true }).text('Default Inverse Label'),
  badge({ inverse: true, type: 'success' }).text('Success Label'),
  badge({ inverse: true, type: 'warning' }).text('Warning Label'),
  badge({ inverse: true, type: 'danger' }).text('Danger Label'),
];
