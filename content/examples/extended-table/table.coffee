window.table1 = table1 = new hx.Table('#testTable1')
window.table2 = table2 = new hx.Table('#testTable2')
window.table3 = table3 = new hx.Table('#testTable3')
window.table4 = table4 = new hx.Table('#testTable4')


hx.select('#testTable1').style('max-height', '500px')
hx.select('#testTable2').style('max-height', '500px')
hx.select('#testTable3').style('max-height', '500px')
hx.select('#testTable4').style('max-height', '500px')

new hx.Collapsible('.datasetInfo')

table1.on 'sort', (d) ->
  console.log 'Sort\n', d
table1.on 'filter', (d) ->
  console.log 'Filter\n', d
table1.on 'rowselect', (d) ->
  console.log 'Select\n', d
table2.on 'rowcollapsible', (d) ->
  console.log 'Row Change\n', d
table1.on 'clearselection', (d) ->
  console.log 'Clear Selection\n'

finiteData = (request, callback) ->
  if request.type == 'header'
    callback {
      'columns':[
        { 'value':'Name' },
        { 'value':'Age' },
        { 'value':'Gender' },
        { 'value':'Date of Birth' },
        { 'value':'Salary (£)' }
      ]
    }
  if request.type == 'rows'
    callback([request.startRow...request.endRow].map((i) -> [0+i, 1+i, 2+Math.random(), 3/i, 4*i]), if request.filters['name'] then 1000 else 1000000)
  if request.type == 'rowCount'
    callback(1000000)

unknownData = (request, callback) ->
  if request.type == 'header'
    callback {
      'columns':[
        { 'value':'Name' },
        { 'value':'Age' },
        { 'value':'Gender' },
        { 'value':'Date of Birth' },
        { 'value':'Salary (£)' }
      ]
    }
  if request.type == 'rows'
    if request.startRow < 1000
      callback([request.startRow...request.endRow].map((i) -> [0+i, 1+i, 2+Math.random(), 3/i, 4*i]), undefined)
    else
      callback([])
  if request.type == 'rowCount'
    callback(undefined)

infiniteData = (request, callback) ->
  if request.type == 'header'
    callback {
      'columns':[
        { 'value':'Name' },
        { 'value':'Age' },
        { 'value':'Gender' },
        { 'value':'Date of Birth' },
        { 'value':'Salary (£)' }
      ]
    }
  if request.type == 'rows'
    callback([request.startRow...request.endRow].map((i) -> [0+i, 1+i, 2+Math.random(), 3/i, 4*i]), undefined)
  if request.type == 'rowCount'
    callback(undefined)

objectCellsData =
  {
    'head': {
      'columns':[
        { 'value':'Name' },
        { 'value':'Age' },
        { 'value':'Gender' },
        { 'value':'Date of Birth' },
        { 'value':'Salary (£)' }
      ]
    }
    'body': [0...786].map((i) -> [{value: 0+i}, {value: 1+i}, {value: 2+Math.random()}, {value: 3/i}, {value: 4*i}])
  }

renderWithData = (data, datai) ->
  showSorts = (hx.select('#toggleSort').attr('data') is 'true');
  showFilters = (hx.select('#toggleFilter').attr('data') is 'true');
  showSelection = (hx.select('#toggleSelection').attr('data') is 'true');
  rowsSelectable = (hx.select('#toggleRowSelect').attr('data') is 'true');
  useResponsive = (hx.select('#toggleResponsiveView').attr('data') is 'true');
  mobileView = (hx.select('#toggleMobileView').attr('data') is 'true');
  userSelectRowsPerPage = (hx.select('#toggleSelectRowsPerPage').attr('data') is 'true');
  allowHeaderWrap = (hx.select('#toggleHeaderWrap').attr('data') is 'true');
  maxRows = hx.select('#maxRows').value()

  setup = (table, i) ->
    table.options.showSorts = showSorts
    table.options.showFilters = showFilters
    table.options.showSelection = showSelection
    table.options.rowSelectable = rowsSelectable
    table.options.useResponsive = useResponsive
    table.options.alwaysMobile = mobileView
    table.options.userSelectRowsPerPage = userSelectRowsPerPage
    table.options.allowHeaderWrap = allowHeaderWrap
    table.options.collapsibleRow = undefined
    table.options.cellRenderers = {}
    table.options.rowSelectableLookup = (d, cb) ->
      canSelect = (if d.columns then d.columns else d).join('-').toLowerCase().indexOf('bob') is -1
      if not canSelect then hx.notify().warning('Bob cannot be selected')
      cb(canSelect)

    switch i
      when 1
        table.options.enabledFilters = []
      when 2
        table.options.collapsibleRow = (node, rowData) ->
          node.innerHTML = (rowData.columns or rowData).join ', '
      when 3
        table.options.cellRenderers =
          'Age': (data, node, index) ->
            val = Number if data.value then data.value else data
            hx.select(node).text(if val is 1 then val+ ' year old' else val+ ' years old')
          'sAlAry (£)': (data, node, index) ->
            val = Number if data.value then data.value else data

            int = if val > 100000 then 1 else if val < 50000 then -1 else 0

            hx.select(node)
               .text(val)
               .classed('hx-background-positive', int is 1)
               .classed('hx-background-warning', int is 0)
               .classed('hx-background-negative', int is -1)
      when 4
        table.options.enabledFilters = Object.keys(hx.filter)

    if datai is 7
      table.options.defaultCellRenderer = (data, node, index) ->
        hx.select(node).text(data.value)
      table.options.defaultCellValueLookup = (data) -> data.value
      table.options.cellValueLookup = {
        'Age': (data) -> data.value
      }
      table.options.cellSortValueLookup = {
        'Age': (data) -> data.value
      }
    else
      table.options.defaultCellRenderer = undefined
      table.options.defaultCellValueLookup = undefined
      table.options.cellValueLookup = undefined


    table.setData(data, undefined, true, true)

  setup(table1, 1)
  setup(table2, 2)
  setup(table3, 3)
  setup(table4, 4)


selectedSource = 1

render = (i) ->
  if i is undefined
    i = selectedSource
  else
    selectedSource = i

  hx.selectAll('.datasetBtn').classed('hx-contrast', false)
  hx.select('#data' + i).classed('hx-contrast', true)

  if i < 6
    hx.json 'data' + i + '.json', (err, data) -> renderWithData(data, i)
  else if i is 6
    hx.json 'data' + i + '.json', (err, data) ->
      data.body = hx.flatten hx.range(25000).map((d) -> data.body)
      renderWithData(data, i)
  else if i is 7
    renderWithData(objectCellsData, i)
  else if i is 8
    renderWithData(finiteData, i)
  else if i is 9
    renderWithData(unknownData, i)
  else if i is 10
    renderWithData(infiniteData, i)




render(1)

hx.select('#data1').on 'click', () -> render(1)
hx.select('#data2').on 'click', () -> render(2)
hx.select('#data3').on 'click', () -> render(3)
hx.select('#data4').on 'click', () -> render(4)
hx.select('#data5').on 'click', () -> render(5)
hx.select('#data6').on 'click', () -> render(6)
hx.select('#data7').on 'click', () -> render(7)
hx.select('#data8').on 'click', () -> render(8)
hx.select('#data9').on 'click', () -> render(9)
hx.select('#data10').on 'click', () -> render(10)

fn = -> render()

hx.select('#toggleSort').on 'click', fn, true
hx.select('#toggleFilter').on 'click', fn, true
hx.select('#toggleSelection').on 'click', fn, true
hx.select('#toggleRowSelect').on 'click', fn, true
hx.select('#toggleResponsiveView').on 'click', fn, true
hx.select('#toggleMobileView').on 'click', fn, true
hx.select('#toggleHeaderWrap').on 'click', fn, true
hx.select('#toggleSelectRowsPerPage').on 'click', fn, true
hx.select('#reload').on 'click', fn, true