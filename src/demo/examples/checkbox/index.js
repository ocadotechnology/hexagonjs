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

const checkbox = checked => input().attr('type', 'checkbox').class('hx-input-checkbox').prop('checked', !!checked);
const invalidCheckbox = cls => checkbox(cls).attr('required', true);

export default () => div()
  .add(group({ compact: true, horizontal: true })
    .add(section()
      .add(div('hx-header-medium').text('Valid State'))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(div('hx-form-item')
            .add(checkbox())
            .add(div('hx-form-label').text('Check Box')))
          .add(div('hx-form-item')
            .add(checkbox())
            .add(div('hx-form-label').text('Check Box')))
          .add(div('hx-form-item')
            .add(checkbox(true))
            .add(div('hx-form-label').text('Check Box')))
          .add(div('hx-form-item')
            .add(checkbox(true))
            .add(div('hx-form-label').text('Check Box'))))))
    .add(vr())
    .add(section()
      .add(div('hx-header-medium').text('Invalid State'))
      .add(hr())
      .add(div('hx-form hx-flag-form')
        .add(div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(div('hx-form-item')
            .add(invalidCheckbox())
            .add(div('hx-form-label').text('Check Box')))
          .add(div('hx-form-item')
            .add(invalidCheckbox())
            .add(div('hx-form-label').text('Check Box')))
          .add(div('hx-form-message').text('Warning message will be here'))))));

// <div class="hx-compact-group">
//   <div class="hx-section">
//     <h1>Checklists</h1>
//     <div class="hx-form-group">
//       <div class="hx-form-label">Label</div>
//       <div class="hx-form-columns-2">
//         <div class="hx-form-item">
//           <input class="hx-input-checkbox" type="checkbox">
//           <div class="hx-form-label">Check Box</div>
//         </div>
//         <div class="hx-form-item">
//           <input class="hx-input-checkbox" type="checkbox" checked>
//           <div class="hx-form-label">Check Box</div>
//         </div>
//         <div class="hx-form-item">
//           <input class="hx-input-checkbox" type="checkbox">
//           <div class="hx-form-label">Check Box</div>
//         </div>
//         <div class="hx-form-item">
//           <input class="hx-input-checkbox" type="checkbox" checked>
//           <div class="hx-form-label">Check Box</div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <vr></vr>
//   <div class="hx-section hx-medium">
//     <h1>Errors</h1>
//     <div class="hx-form-group">
//       <div class="hx-form-label">Label</div>
//       <div class="hx-form-item">
//         <input class="hx-input-checkbox" type="checkbox" required>
//         <div class="hx-form-label">Check Box</div>
//       </div>
//       <div class="hx-form-item">
//         <input class="hx-input-checkbox" type="checkbox" required>
//         <div class="hx-form-label">Check Box</div>
//       </div>
//       <div class="hx-form-message">
//         Warning message will be here
//       </div>
//     </div>
//   </div>
// </div>
