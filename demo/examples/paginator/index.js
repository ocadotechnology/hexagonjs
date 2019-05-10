import { div, paginator } from 'hexagon-js';

export default () => div('paginator-demo')
// .add(paginator())
  .add(paginator({
    v2Features: {
      showCentered: true,
      useAccessibleRendering: true,
    },
  }));
