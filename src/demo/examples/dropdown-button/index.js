import {
  div,
  notify,
  dropdownButton,
} from 'hexagon-js';

export default () => {
  const items = [
    {
      text: 'Function #1',
      onClick: () => notify('Clicked Dropdown Button Action 1'),
    },
    {
      text: 'Function #2',
      onClick: () => notify('Clicked Dropdown Button Action 2'),
    },
    {
      text: 'Disabled',
      disabled: true,
      onClick: () => notify('Clicked Dropdown Button Action 3'),
    },
  ];

  const itemsFull = [
    {
      text: 'A very long function #1',
      onClick: () => notify('Clicked Dropdown Button Action 1'),
    },
    {
      text: 'Function #2',
      onClick: () => notify('Clicked Dropdown Button Action 2'),
    },
    {
      text: 'Disabled',
      disabled: true,
      onClick: () => notify('Clicked Dropdown Button Action 3'),
    },
    {
      text: 'Link #1',
      onClick: '#link-1',
    },
    {
      text: 'Link #2',
      onClick: '#link-2',
    },
    {
      text: 'Disabled',
      disabled: true,
      onClick: '#link-3',
    },
  ];

  const ddContexts = [undefined, 'primary', 'secondary'];
  const ddContextButtons = ddContexts.map(type => dropdownButton({
    type,
    items: type ? itemsFull : items,
    text: type || 'standard',
  }));

  return div().set([
    ...ddContextButtons,
  ]);
};
