import {
  div,
  detached,
  span,
  button,
  badge,
} from 'hexagon-js';

export default () => div('hx-flag-typography hx-flag-button hx-flag-tabs').set([
  detached('h1').text('Header 1'),
  detached('h2').text('Header 2'),
  detached('h3').text('Header 3'),
  div(),
  detached('note').text('Helper classes - Sometimes semantically you don\'t want a h1 tag but still want the styles of a h1'),
  div('hx-header-large').text('.hx-header-large'),
  div('hx-header-medium').text('.hx-header-medium'),
  div('hx-header-small').text('.hx-header-small'),
  detached('hr'),
  detached('p').class('hx-text-large').text('This an introduction text. It has a fixed size, and a custom line height, so you can experiment with it. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
  detached('p').text('This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat.'),
  detached('p').class('hx-text-small').text('This is small body text used for notes and comments. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat.'),
  detached('hr'),
  button('hx-btn hx-primary').text('Primary'),
  button('hx-btn hx-secondary').text('Secondary'),
  button('hx-btn').attr('disabled', true).text('Disabled'),
  button('hx-btn hx-primary hx-btn-small').text('Small'),
  button('hx-btn hx-primary hx-btn-micro').text('Micro'),
  detached('hr'),
  badge().text('Default'),
  badge({ type: 'success' }).text('Successful'),
  detached('hr'),
  div('hx-form-label').text('Input label text').add(span('hx-form-label-optional').text('(Optional)')),
  div('hx-form-message').text('Messaging text error'),
  detached('hr'),
  div('hx-tab').text('Tab title'),
  div('hx-tab hx-tab-active').text('Selected tab title'),
]);
