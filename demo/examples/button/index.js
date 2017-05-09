import { button } from 'hexagon-js'

export default () => {
  return [
    button('hx-btn').text('Default'),
    button('hx-btn hx-positive').text('Positive'),
    button('hx-btn hx-warning').text('Warning'),
    button('hx-btn hx-negative').text('Negative'),
    button('hx-btn hx-info').text('Info'),
    button('hx-btn hx-action').text('Action'),
    button('hx-btn hx-btn-invisible').text('Invisible'),
    button('hx-btn hx-disabled').text('Disabled'),
    button('hx-btn hx-btn-invert').text('Default'),
    button('hx-btn hx-btn-invert hx-positive').text('Positive'),
    button('hx-btn hx-btn-invert hx-warning').text('Warning'),
    button('hx-btn hx-btn-invert hx-negative').text('Negative'),
    button('hx-btn hx-btn-invert hx-info').text('Info'),
    button('hx-btn hx-btn-invert hx-action').text('Action')
  ]
}
