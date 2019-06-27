import { div, autocompletePicker } from 'hexagon-js';

export default () => {
  function delayedItems(searchTerm, callback) {
    setTimeout(() => callback(['a', 'b', 'c']), 3000);
  }

  return div().set([
    autocompletePicker(['Item 1', 'Item 2', 'Item 3']),
    autocompletePicker(delayedItems),
  ]);
};
