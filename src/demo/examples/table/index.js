import { div, detached } from 'hexagon-js';
const note = () => detached('note');

export default () => {
  function row(n) {
    return detached('tr')
      .add(detached('td').text(`Row ${n} Cell 1`))
      .add(detached('td').text(`Row ${n} Cell 2`))
      .add(detached('td').text(`Row ${n} Cell 3`));
  }

  function table() {
    return detached('table').class('hx-table')
      .add(detached('thead')
        .add(detached('tr')
          .add(detached('th').text('Header 1'))
          .add(detached('th').text('Header 2'))
          .add(detached('th').text('Header 3'))))
      .add(detached('tbody')
        .add(row(1))
        .add(row(2))
        .add(row(3))
        .add(row(4))
        .add(row(5)));
  }

  return div().set([
    table(),
    note().text('Table with feature flag to apply font size and other style changes'),
    table().classed('hx-flag-table', true),
    note().text('Table with feature hoverable rows'),
    table().classed('hx-flag-table hx-table-clickable-rows', true),
  ]);
};
