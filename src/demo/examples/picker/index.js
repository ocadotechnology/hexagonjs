import {
  picker,
} from 'hexagon-js';

export default () => {
  const items = [
    'Item #1',
    'Item #2',
    'Item #3',
    { text: 'Item #4', value: 'Item #4', disabled: true },
  ];

  return [
    picker({ items }),
    picker({ items, class: 'hx-positive' }),
    picker({ items, class: 'hx-warning' }),
    picker({ items, class: 'hx-negative' }),
    picker({ items, class: 'hx-info' }),
    picker({ items, class: 'hx-action' }),
    picker({ items, class: 'hx-complement' }),
    picker({ items, class: 'hx-contrast' }),
    hr(),
    group()
      .add(section().set([
        note().text('Before Input'),
        div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(picker({
              items,
              featureFlags: {
                useUpdatedStructure: true,
              },
            }))),
        note().text('After Input'),
        div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(picker({
              items,
              value: 'item 1',
              featureFlags: {
                useUpdatedStructure: true,
              },
            }))),
      ]))
      .add(section()
        .add(note().text('Error state'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(picker({
              items,
              featureFlags: {
                required: true,
                useUpdatedStructure: true,
              },
            }))
            .add(div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))),
    hr(),
    group()
      .add(section({ fixed: true })
        .add(note().text('Drop down with grouped options'))
        .add(note().text('First option for each group should be ‘all’ if applicable'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(picker({
              items,
              featureFlags: {
                useUpdatedStructure: true,
              },
            })))))
      .add(section({ fixed: true })
        .add(note().text('Drop down with disabled options'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(picker({
              items: disabledItem,
              featureFlags: {
                useUpdatedStructure: true,
              },
            }))))),
    hr(),
    group()
      .add(section({ fixed: true })
        .add(note().text('Drop down with grouped options'))
        .add(note().text('First option for each group should be ‘all’ if applicable'))
        .add(div('hx-form hx-flag-form')
          .add(div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(picker({
              items,
              featureFlags: {
                useUpdatedStructure: true,
                showFilter: true,
              },
            }))))),
  ];
};
