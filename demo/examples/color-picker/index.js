import { div, colorPicker } from 'hexagon-js'

export default () => {
  return div('color-picker-demo')
    .add(colorPicker())
}
