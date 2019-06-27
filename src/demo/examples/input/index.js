import {
  div,
  detached,
  span,
  input,
  group,
  section,
} from 'hexagon-js';

const fluidFactory = type => (cls = '') => detached(type).class(cls);
const invalidFactory = type => (cls = '') => {
  const sel = detached(type).class(cls);
  sel.node().setCustomValidity('Invalid State');
  return sel;
};

const label = fluidFactory('label');
const textarea = fluidFactory('textarea');
const hr = fluidFactory('hr');
const vr = fluidFactory('vr');
const note = fluidFactory('note');

const invalidInput = invalidFactory('input');
const invalidTextarea = invalidFactory('textarea');

export default () => div()
  .add(group({ compact: true, horizontal: true })
    .add(section()
      .add(div('hx-header-medium').text('Valid State'))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(input('hx-input').attr('placeholder', 'Placeholder Text'))))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(textarea('hx-input-textarea').attr('placeholder', 'Placeholder Text')))
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label').add(span('hx-form-label-optional').text('(Optional)')))
          .add(textarea('hx-input-textarea'))))
      .add(hr())
      .add(note().text('Disabled and Readonly are visually the same with the exception of the cursor on hover. Disabled fields are not sent when the form is submit'))
      .add(group({ compact: true, horizontal: true })
        .add(section()
          .add(div('hx-header-medium').text('Disabled State'))
          .add(hr())
          .add(div('hx-form hx-flag-form')
            .add(div('hx-form-group')
              .add(input('hx-input').attr('disabled', 'disabled').value('Disabled content here')))))
        .add(vr())
        .add(section()
          .add(div('hx-header-medium').text('Read Only State'))
          .add(hr())
          .add(div('hx-form hx-flag-form')
            .add(div('hx-form-group')
              .add(input('hx-input').attr('readonly', 'readonly').value('Read only content here')))))))
    .add(vr())
    .add(section()
      .add(div('hx-header-medium').text('Invalid State'))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(invalidInput('hx-input').attr('placeholder', 'Placeholder Text'))
          .add(div('hx-form-message hx-form-message-wrap').text('Warning message will be here and if very long but space does not allow it, wrap into more lines')))
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(invalidInput('hx-input').attr('required', true).value('Input text here'))
          .add(div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(invalidTextarea('hx-input-textarea').value('Input text here'))
          .add(div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))))
  .add(hr())
  .add(div()
    .add(div('do'))
    .add(div('hx-form hx-flag-form')
      .add(div('hx-form-group')
        .add(label('hx-form-label').text('Label'))
        .add(input('hx-input').attr('placeholder', 'Placeholder Text')))
      .add(div('hx-form-group')
        .add(label('hx-form-label').text('Label'))
        .add(invalidInput('hx-input').attr('placeholder', 'Placeholder Text'))
        .add(div('hx-form-message hx-form-message-wrap').text('Warning message will be here and if very long but space does not allow it, wrap into more lines')))
      .add(div('hx-form-group')
        .add(label('hx-form-label').text('Label'))
        .add(invalidInput('hx-input').attr('required', true).value('Input text here'))
        .add(div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component')))));
