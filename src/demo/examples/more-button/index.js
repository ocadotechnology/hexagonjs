import {
  div,
  detached,
  button,
  moreButton,
  group,
  section,
  notify,
} from 'hexagon-js';

function note(text) {
  return detached('note')
    .text(text);
}

export default () => {
  const items = [
    {
      text: 'A very long function #1',
      onClick: () => notify('Clicked More Button Action 1'),
    },
    {
      text: 'Function #2',
      onClick: () => notify('Clicked More Button Action 2'),
    },
    {
      text: 'Disabled',
      disabled: true,
      onClick: () => notify('Clicked More Button Action 3'),
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

  const r1 = detached('tr')
    .add(detached('td').text('Cell 1'))
    .add(detached('td').text('Cell 2'))
    .add(detached('td').text('Normal size (for tablets) --> '))
    .add(detached('td').add(moreButton({ items })));

  const r2 = detached('tr')
    .add(detached('td').text('Cell 1'))
    .add(detached('td').text('Cell 2'))
    .add(detached('td').text('Small Button -->'))
    .add(detached('td').add(moreButton({ items, size: 'small' })));

  return div().set([
    detached('h2').text('Inside Tables'),
    detached('table').class('hx-table hx-flag-table')
      .add(detached('thead')
        .add(detached('tr')
          .add(detached('th').text('Header 1'))
          .add(detached('th').text('Header 2'))
          .add(detached('th').text('Header 3'))
          .add(detached('th').text('Actions'))))
      .add(detached('tbody')
        .add(r1)
        .add(r2)),
    detached('h2').text('Outside Tables'),
    note('The MoreButton attempts to align the bottom right corner of the button with the top right corner of the dropdown. When there is insufficient space, the dropdown is moved to accommodate.'),
    group({ compact: true })
      .add(section({ fixed: true })
        .add(moreButton({ items })))
      .add(section())
      .add(section({ fixed: true })
        .add(moreButton({ items }))),
<<<<<<< HEAD
    note('The more button can be used in an input group when there is a primary action and a list of secondary actions'),
    div('hx-input-group').set([
      button('hx-btn hx-flag-button').text('Primary action'),
      moreButton({ items }),
    ]),
=======
>>>>>>> feat: Add moreButton and dropdownButton to replace Menu
  ]);
};
