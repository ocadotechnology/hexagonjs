import { div, button } from 'hexagon-js'

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
    div(),
    button('hx-btn hx-btn-outline').text('Default'),
    button('hx-btn hx-btn-outline hx-positive').text('Positive'),
    button('hx-btn hx-btn-outline hx-warning').text('Warning'),
    button('hx-btn hx-btn-outline hx-negative').text('Negative'),
    button('hx-btn hx-btn-outline hx-info').text('Info'),
    button('hx-btn hx-btn-outline hx-action').text('Action')
  ]
}
