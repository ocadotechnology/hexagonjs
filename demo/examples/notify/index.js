import {
  button,
  notify,
  notifyPositive,
  notifyWarning,
  notifyNegative,
  notifyInfo,
  notifyLoading
} from 'hexagon-js'

export default () => {
  return [
    button('hx-btn').text('Notify').on('click', () => notify("Hello")),
    button('hx-btn').text('Positive').on('click', () => notifyPositive("Positive notification")),
    button('hx-btn').text('Warning').on('click', () => notifyWarning("Warning notification")),
    button('hx-btn').text('Negative').on('click', () => notifyNegative("Negative notification")),
    button('hx-btn').text('Info').on('click', () => notifyInfo("Info notification")),
    button('hx-btn').text('Loading').on('click', () => notifyLoading("Loading notification"))
  ]
}
