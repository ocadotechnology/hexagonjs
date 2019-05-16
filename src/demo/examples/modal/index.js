import { select, button, Modal } from 'hexagon-js';

export default () => {
  const modal = new Modal('Demo modal', (node) => {
    select(node).text('Hello');
  });

  return button('hx-btn')
    .text('Show Modal')
    .on('click', () => {
      modal.show();
    });
};
