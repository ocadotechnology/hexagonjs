import {
  div,
  button,
  Menu,
} from 'hexagon-js';

export default () => {
  const defaultMenuItems = ['item 1', 'item 2', 'item 3'];
  const defaultMenu = button('hx-btn').text('Default');

  new Menu(defaultMenu, {
    items: defaultMenuItems,
  });


  const disabledMenu = button('hx-btn').text('Disabled');

  const disabledItems = [
    {
      text: 'Disabled Item 1',
      disabled: true,
    },
    {
      text: 'Disabled Item 2',
      disabled: true,
    },
    {
      text: 'Disabled Item 3',
      disabled: true,
    },
  ];

  new Menu(disabledMenu, {
    items: disabledItems,
  });

  const unselectable = button('hx-btn').text('Unselectable');

  const unselectableItems = [
    {
      text: 'Unselectable Item 1',
      unselectable: true,
    },
    {
      text: 'Unselectable Item 2',
      unselectable: true,
    },
    {
      text: 'Unselectable Item 3',
      unselectable: true,
    },
  ];

  new Menu(unselectable, {
    items: unselectableItems,
  });

  const mixed = button('hx-btn').text('Mixed');

  const mixedItems = [
    {
      text: 'Disabled Item 1',
      disabled: true,
    },
    {
      text: 'Item 1',
    },
    {
      text: 'Disabled Item 2',
      disabled: true,
    },
    {
      text: 'Unselectable Item 1',
      unselectable: true,
    },
    {
      text: 'Item 2',
    },
    {
      text: 'Unselectable Item 2',
      unselectable: true,
    },
  ];

  new Menu(mixed, {
    items: mixedItems,
  });


  const contexts = ['default', 'action', 'positive', 'warning', 'negative', 'complement', 'contrast'];
  const contextButtons = contexts.map((ctx) => {
    const contextClass = `hx-${ctx}`;
    const sel = button(`hx-btn ${contextClass}`).text(contextClass);
    new Menu(sel, {
      items: defaultMenuItems,
    });
    return sel;
  });

  return div().set([
    defaultMenu,
    disabledMenu,
    unselectable,
    mixed,
    div(),
    ...contextButtons,
  ]);
};
