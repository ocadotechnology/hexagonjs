
import { progressBar } from 'hexagon-js';

export default () => [
  progressBar({ value: 0.25 }),
  progressBar({ value: 0.33 }).classed('hx-action', true),
  progressBar({ value: 0.42 }).classed('hx-positive', true),
  progressBar({ value: 0.5 }).classed('hx-warning', true),
  progressBar({ value: 0.58 }).classed('hx-negative', true),
  progressBar({ value: 0.67 }).classed('hx-complement', true),
  progressBar({ value: 0.75 }).classed('hx-contrast', true),
];
