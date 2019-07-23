import {
  div,
  button,
  message,
  alert,
  detached,
} from 'hexagon-js';

export default () => [
  div('hx-header-small').text('Alerts'),
  detached('br'),
  button('hx-btn hx-flag-button').text('Success').on('click', () => alert({
    title: 'This is a success alert.',
    body: 'Use it to let users know that something was successful.',
    type: 'success',
  })),
  button('hx-btn hx-flag-button').text('Warning').on('click', () => alert({
    title: 'This is a warning alert.',
    body: 'Use it to tell users about something that could be a problem, but won\'t block them from doing things yet.',
    type: 'warning',
  })),
  button('hx-btn hx-flag-button').text('Danger').on('click', () => alert({
    title: 'This is an error alert.',
    body: 'Use it to tell users about errors. Include steps that the user can take to resolve the error, even if it\'s just "Try again".',
    type: 'danger',
  })),
  button('hx-btn hx-flag-button').text('Default').on('click', () => alert({
    title: 'This is an information alert.',
    body: 'Use it for alerts that don\'t fit into the other three categories.',
  })),
  detached('br'),
  detached('br'),
  detached('hr'),
  div('hx-header-small').text('Messages'),
  detached('br'),
  button('hx-btn hx-flag-button').text('Success').on('click', () => message({
    title: 'This is a success message.',
    body: 'Use it to let users know that something was successful.',
    type: 'success',
  })),
  button('hx-btn hx-flag-button').text('Default').on('click', () => message({
    title: 'This is an information message.',
    body: 'Use it for messages that don\'t fit into the other three categories.',
  })),
];
