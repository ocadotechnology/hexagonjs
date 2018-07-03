import { div, i, button, detached } from 'hexagon-js'

export default () => {
  return div('hx-input-group')
    .add(i('fa fa-search'))
    .add(detached('input').attr('value', 'input'))
    .add(button('hx-btn hx-positive').add(i('fa fa-arrow-right')))
}