import { div, button, detached } from 'hexagon-js';

export default () => div('demo-error-page-container')
  .add(div('hx-error-message')
    .add(div('hx-error-message-heading').text('404'))
    .add(div()
      .add(detached('p')
        .text('The content you requested was not found')))
    .add(div()
      .add(button('hx-btn hx-positive').text('Go Back'))
      .add(button('hx-btn hx-positive').text('Go to home screen'))));
