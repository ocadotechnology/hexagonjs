import { div, label } from 'hexagon-js'

export default () => {
  return [
    label().text('Default Label')),
    label({ context: 'action' }).text('Action Label')),
    label({ context: 'positive' }).text('Positive Label')),
    label({ context: 'warning' }).text('Warning Label')),
    label({ context: 'negative' }).text('Negative Label')),
    label({ context: 'info' }).text('Info Label')),
    label({ context: 'complement' }).text('Complement Label')),
    label({ context: 'contrast' }).text('Contrast Label')),
    div()),
    label().classed('hx-label-outline', true).text('Default Label')),
    label({ context: 'action' }).classed('hx-label-outline', true).text('Action Label')),
    label({ context: 'positive' }).classed('hx-label-outline', true).text('Positive Label')),
    label({ context: 'warning' }).classed('hx-label-outline', true).text('Warning Label')),
    label({ context: 'negative' }).classed('hx-label-outline', true).text('Negative Label')),
    label({ context: 'info' }).classed('hx-label-outline', true).text('Info Label')),
    label({ context: 'complement' }).classed('hx-label-outline', true).text('Complement Label')),
    label({ context: 'contrast' }).classed('hx-label-outline', true).text('Contrast Label'))
  ]
}
