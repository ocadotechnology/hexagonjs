import { tagInput, detached } from 'hexagon-js';

export default () => [
  tagInput({ items: ['tag-1', 'tag-2', 'tag-3'] }),
  detached('br'),
  tagInput({
    classifier(value) {
      switch (value) {
        case 'hello':
          return 'hx-positive';
        case 'goodbye':
          return 'hx-negative';
        default:
          return undefined;
      }
    },
    items: ['hello', 'goodbye', 'tag', 'tag2'],
  }),
];
