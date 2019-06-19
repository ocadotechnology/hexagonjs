import {
  div,
  detached,
  input,
  group,
  section,
} from 'hexagon-js';

const fluidFactory = type => (cls = '') => detached(type).class(cls);

const label = fluidFactory('label');
const hr = fluidFactory('hr');
const vr = fluidFactory('vr');

const checkbox = (name, checked) => input().attr('type', 'checkbox')
  .attr('id', name)
  .attr('name', name)
  .class('hx-input-checkbox')
  .prop('checked', !!checked);

const invalidCheckbox = name => checkbox(name).attr('required', true);

export default () => div()
  .add(group({ compact: true, horizontal: true })
    .add(section()
      .add(div('hx-header-medium').text('Valid State'))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(div('hx-form-item')
            .add(checkbox('cba'))
            .add(label('hx-form-label').attr('for', 'cba').text('Check Box')))
          .add(div('hx-form-item')
            .add(checkbox('cbb'))
            .add(label('hx-form-label').attr('for', 'cbb').text('Check Box')))
          .add(div('hx-form-item')
            .add(checkbox('cbc', true))
            .add(label('hx-form-label').attr('for', 'cbc').text('Check Box')))
          .add(div('hx-form-item')
            .add(checkbox('cbd', true))
            .add(label('hx-form-label').attr('for', 'cbd').text('Check Box'))))))
    .add(vr())
    .add(section()
      .add(div('hx-header-medium').text('Invalid State'))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(div('hx-form-item')
            .add(invalidCheckbox('cbe'))
            .add(label('hx-form-label').attr('for', 'cbe').text('Check Box')))
          .add(div('hx-form-item')
            .add(invalidCheckbox('cbf'))
            .add(label('hx-form-label').attr('for', 'cbf').text('Check Box')))
          .add(div('hx-form-message').text('Warning message will be here'))))));
