import { picker } from 'hexagon-js'

export default () => {
  const items = [
    'item 1',
    'item 2',
    'item 3',
    { text: 'item 4', children: [ 'item 1', 'item 2'] }
  ]

  return [
    picker({ items }),
    picker({ items }).classed('hx-positive', true),
    picker({ items }).classed('hx-warning', true),
    picker({ items }).classed('hx-negative', true),
    picker({ items }).classed('hx-info', true),
    picker({ items }).classed('hx-action', true),
    picker({ items }).classed('hx-compliment', true),
    picker({ items }).classed('hx-contrast', true)
  ]
}
