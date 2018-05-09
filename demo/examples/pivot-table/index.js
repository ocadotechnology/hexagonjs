import { pivotTable } from 'hexagon-js'

var data1 = {
  topHead: [
    'Head 1',
    'Head 2',
    'Head 3'
  ],
  leftHead: [
    'Head 1',
    'Head 2',
    'Head 3'
  ],
  body: [
    [
      'Cell 1',
      'Cell 2',
      'Cell 3'
    ],
    [
      'Cell 1',
      'Cell 2',
      'Cell 3'
    ],
    [
      'Cell 1',
      'Cell 2',
      'Cell 3'
    ]
  ]
}

export default () => {
  return [
    pivotTable({ data: data1 })
  ]
}
