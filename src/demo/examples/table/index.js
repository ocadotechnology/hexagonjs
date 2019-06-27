import {
  button,
  div,
  detached,
  notify,
  span,
} from 'hexagon-js';

const note = () => detached('note');
const br = () => detached('br');

export default () => {
  function row(n, clickable) {
    const r = detached('tr');
    if (clickable) {
      r.on('click', () => notify(`Row ${n} clicked!`));
    }

    return r
      .add(detached('td').text(`Row ${n} Cell 1`))
      .add(detached('td').text(`Row ${n} Cell 2`))
      .add(detached('td').add(n === 3 ? div().add(span().text('Line 1')).add(br()).add(span().text('Line 2')) : span().text(`Row ${n} Cell 3`)))
      .add(detached('td').add(n === 4 ? span().text('No action row') : button('hx-btn hx-btn-small').text('Action')));
  }

  function table(clickable) {
    return detached('table').class('hx-table')
      .add(detached('thead')
        .add(detached('tr')
          .add(detached('th').text('Header 1'))
          .add(detached('th').text('Header 2'))
          .add(detached('th').text('Header 3'))
          .add(detached('th').text('Actions'))))
      .add(detached('tbody')
        .add(row(1, clickable))
        .add(row(2, clickable))
        .add(row(3, clickable))
        .add(row(4, clickable))
        .add(row(5, clickable)));
  }

  return div().set([
    table(),
    note().text('Table with feature flag to apply font size and other style changes'),
    table().classed('hx-flag-table hx-flag-button', true),
    note().text('Table with feature clickable rows'),
    table(true).classed('hx-flag-table hx-flag-button hx-table-clickable-rows', true),
  ]);
};
