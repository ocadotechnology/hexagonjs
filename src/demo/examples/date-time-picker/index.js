import { div, dateTimePicker } from 'hexagon-js';

export default () => [
  dateTimePicker(),
  div(),
  dateTimePicker({
    date: new Date(2019, 4, 22, 0, 20),
  }),
];
