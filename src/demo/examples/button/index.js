import { div, button } from 'hexagon-js';

export default () => [
  div('hx-flag-button')
    .add(button('hx-btn hx-primary').text('Primary'))
    .add(button('hx-btn hx-secondary').text('Secondary'))
    .add(button('hx-btn').text('Standard'))
    .add(button('hx-btn hx-success').text('Success'))
    .add(button('hx-btn hx-danger').text('Danger'))
    .add(button('hx-btn hx-btn-link').text('Link'))
    .add(button('hx-btn').attr('disabled', true).text('Disabled')),
  div(),
  button('hx-btn').text('Default'),
  button('hx-btn hx-positive').text('Positive'),
  button('hx-btn hx-warning').text('Warning'),
  button('hx-btn hx-negative').text('Negative'),
  button('hx-btn hx-info').text('Info'),
  button('hx-btn hx-action').text('Action'),
  button('hx-btn hx-complement').text('Complement'),
  button('hx-btn hx-contrast').text('Contrast'),
  button('hx-btn hx-btn-invisible').text('Invisible'),
  button('hx-btn hx-disabled').text('Disabled'),
  div(),
  button('hx-btn hx-btn-outline').text('Default'),
  button('hx-btn hx-btn-outline hx-positive').text('Positive'),
  button('hx-btn hx-btn-outline hx-warning').text('Warning'),
  button('hx-btn hx-btn-outline hx-negative').text('Negative'),
  button('hx-btn hx-btn-outline hx-info').text('Info'),
  button('hx-btn hx-btn-outline hx-action').text('Action'),
  button('hx-btn hx-btn-outline hx-complement').text('Complement'),
  button('hx-btn hx-btn-outline hx-contrast').text('Contrast'),
];
