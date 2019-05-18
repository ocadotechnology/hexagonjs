import { detached } from 'hexagon-js';

export default () => {
  function row(n) {
    return detached('tr')
      .add(detached('td').text(`Row ${n} Cell 1`))
      .add(detached('td').text(`Row ${n} Cell 2`))
      .add(detached('td').text(`Row ${n} Cell 3`));
  }

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
};
