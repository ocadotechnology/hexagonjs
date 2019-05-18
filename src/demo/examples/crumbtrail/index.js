import { div, crumbtrail } from 'hexagon-js';

export default () => div('crumbtrail-demo')
  .add(crumbtrail({ items: ['Docs', 'Getting started', 'Installation'] }));
