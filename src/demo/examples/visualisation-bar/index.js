
import { visualisationBar } from 'hexagon-js';

export default () => [
  visualisationBar({ title: 'With maximum value static', buffer: 2, value: 18, max: 20, mock: false }),
  visualisationBar({ title: 'With maximum value', buffer: 2, value: 5, max: 20, mock: true }),
  visualisationBar({ title: 'Without maximum value', buffer: 2, value: 5, mock: true })
];
