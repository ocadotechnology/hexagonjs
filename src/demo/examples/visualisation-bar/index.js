
import { visualisationBar } from 'hexagon-js';

export default () => [
  visualisationBar({ title: 'With maximum value static', buffer: 2, value: 1, max: 20, mock: false }),
  visualisationBar({ title: 'With disabled state', buffer: 2, value: 1, max: 20, disabled: true, content: 'Hello world!' }),
  visualisationBar({ title: 'With maximum value', buffer: 2, value: 5, max: 20, mock: true }),
  visualisationBar({ title: 'Without maximum value', buffer: 2, value: 5, mock: true, withPercent: true }),
  visualisationBar({ title: 'With content', buffer: 2, value: 5, mock: true, withPercent: true, content: 'Hello world!' })
];
