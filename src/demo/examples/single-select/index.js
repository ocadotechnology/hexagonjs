import {
  div,
  singleSelect,
  detached,
  group,
  section,
  range,
} from 'hexagon-js';

const fluidFactory = type => (cls = '') => detached(type).class(cls);
const label = fluidFactory('label');
const hr = fluidFactory('hr');
const note = fluidFactory('note');

export default () => {
  const items = [
    { text: 'Name of group', children: ['Item #1', 'Item #2'] },
    { text: 'Name of second group', children: ['Item #3', 'Item #4'] },
    'Item #5 (not in group)',
    'Item #6',
  ];

  const disabledItem = [
    'Item #1',
    'Item #2',
    'Item #3',
    'Item #4',
    { text: 'Item #5 (not available)', disabled: true },
    'Item #6',
  ];

  const filterItems = range(100).map(x => `Item ${x + 1}`);
  const delayedItems = (term, cb) => {
    setTimeout(() => cb(filterItems), Math.random() * 2000);
  };

  return [
    note().text('When used outside form elements, behaves as standard inline element'),
    singleSelect(filterItems),
    singleSelect(delayedItems),
    hr(),
    group({ compact: true })
      .add(section().set([
        note().text('Before Input'),
        div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(items))),
        note().text('After Input'),
        div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(items, {
              value: 'item 1',
            }))),
      ]))
      .add(section()
        .add(note().text('Error state'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(items, {
              required: true,
            }))
            .add(div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))),
    hr(),
    group({ compact: true })
      .add(section({ fixed: true })
        .add(note().text('Drop down with grouped options'))
        .add(note().text('First option for each group should be ‘all’ if applicable'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(items)))))
      .add(section({ fixed: true })
        .add(note().text('Drop down with disabled options'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(disabledItem))))),
    hr(),
    group({ compact: true })
      .add(section({ fixed: true })
        .add(note().text('Drop down with grouped options'))
        .add(note().text('First option for each group should be ‘all’ if applicable'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(items, {
              showSearch: true,
            }))))),
    hr(),
    note().text('Examples of Search'),
    group({ compact: true })
      .add(section({ fixed: true })
        .add(note().text('Filter with fixed items'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(filterItems, {
              showSearch: true,
            })))))
      .add(section({ fixed: true })
        .add(note().text('Filter with delayed items'))
        .add(note().text('Emulate loading items from backend'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(singleSelect(delayedItems, {
              showSearch: true,
            }))))),
  ];
};
