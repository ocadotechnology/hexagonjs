import { div, label } from 'hexagon-js'

export default () => {
  return div('label-demo')
    .add(label().text('Default Label'))
    .add(label({ context: 'action' }).text('Action Label'))
    .add(label({ context: 'positive' }).text('Positive Label'))
    .add(label({ context: 'warning' }).text('Warning Label'))
    .add(label({ context: 'negative' }).text('Negative Label'))
    .add(label({ context: 'info' }).text('Info Label'))
    .add(label({ context: 'complement' }).text('Complement Label'))
    .add(label({ context: 'contrast' }).text('Contrast Label'))
}