import { picker } from 'hexagon-js'

export default () => {
  const items = [
    'item 1',
    'item 2',
    'item 3',
    { text: 'item 4', children: [ 'item 1', 'item 2'] }
  ]

  return [
    picker({ items,  }),
    picker({ items, class: 'hx-positive' }),
    picker({ items, class: 'hx-warning' }),
    picker({ items, class: 'hx-negative' }),
    picker({ items, class: 'hx-info' }),
    picker({ items, class: 'hx-action' }),
    picker({ items, class: 'hx-complement' }),
    picker({ items, class: 'hx-contrast' })
  ]
}
