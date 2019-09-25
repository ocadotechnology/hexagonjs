import { div, Stepper } from 'hexagon-js';

export default () => {
  const s = div();
  new Stepper(s, ['aaa', 'bbb']);
  return s;
};
