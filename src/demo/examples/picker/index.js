import {
  picker,
} from 'hexagon-js';

export default () => {
  const items = [
    'Item #1',
    'Item #2',
    'Item #3',
    { text: 'Item #4', value: 'Item #4', disabled: true },
  ];

  return [
    picker({ items }),
    picker({ items, class: 'hx-positive' }),
    picker({ items, class: 'hx-warning' }),
    picker({ items, class: 'hx-negative' }),
    picker({ items, class: 'hx-info' }),
    picker({ items, class: 'hx-action' }),
    picker({ items, class: 'hx-complement' }),
    picker({ items, class: 'hx-contrast' }),
  ];
};
