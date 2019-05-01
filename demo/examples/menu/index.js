import {
  div, select, button, Menu,
} from 'hexagon-js';

export default () => {
  const defaultMenuItems = ['item 1', 'item 2', 'item 3'];
  const defaultMenu = button('hx-btn').text('Default');

  new Menu(defaultMenu, {
    items: defaultMenuItems,
  });


  const disabledMenu = button('hx-btn').text('Disabled');

  const renderer = (elem, item) => select(elem).text(item.name);

  const disabledItems = [
    {
      name: 'Disabled Item 1',
      disabled: true,
    },
    {
      name: 'Disabled Item 2',
      disabled: true,
    },
    {
      name: 'Disabled Item 3',
      disabled: true,
    },
  ];

  new Menu(disabledMenu, {
    renderer,
    items: disabledItems,
  });

  const unselectable = button('hx-btn').text('Unselectable');

  const unselectableItems = [
    {
      name: 'Unselectable Item 1',
      unselectable: true,
    },
    {
      name: 'Unselectable Item 2',
      unselectable: true,
    },
    {
      name: 'Unselectable Item 3',
      unselectable: true,
    },
  ];

  new Menu(unselectable, {
    renderer,
    items: unselectableItems,
  });

  const mixed = button('hx-btn').text('Mixed');

  const mixedItems = [
    {
      name: 'Disabled Item 1',
      disabled: true,
    },
    {
      name: 'Item 1',
    },
    {
      name: 'Disabled Item 2',
      disabled: true,
    },
    {
      name: 'Unselectable Item 1',
      unselectable: true,
    },
    {
      name: 'Item 2',
    },
    {
      name: 'Unselectable Item 2',
      unselectable: true,
    },
  ];

  new Menu(mixed, {
    renderer,
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
