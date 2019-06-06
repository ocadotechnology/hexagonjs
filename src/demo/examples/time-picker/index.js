import { div, timePicker } from 'hexagon-js';

export default () => [
  timePicker(),
  div(),
  timePicker({
    date: new Date(2019, 4, 22, 0, 20),
  }),
];
