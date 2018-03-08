var pivotTable1 = new hx.PivotTable('#table1')
var pivotTable2 = new hx.PivotTable('#table2')
var pivotTable3 = new hx.PivotTable('#table3')
var pivotTable4 = new hx.PivotTable('#table4', { fullWidth: true })

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

var data2 = {
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

var data3 = {
  topHead: [
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

pivotTable1.data(data1)
pivotTable2.data(data2)
pivotTable3.data(data3)
pivotTable4.data(data1)
