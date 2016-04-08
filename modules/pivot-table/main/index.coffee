createTableView = (table, head, body) ->
  cellViewEnter = (data, index, isHead) ->
    isFirstColum = table._.leftShifted and index is 0
    cellIsHead = isHead or isFirstColum
    cellIsTopLeft = isHead and isFirstColum
    type = if cellIsHead or hx.isFunction(data) then 'th' else 'td'
    cell = @append(type).class('hx-pivot-table-cell')
    if cellIsHead then cell.classed('hx-pivot-table-head-cell', true)
    if cellIsTopLeft then cell.classed('hx-table-head-no-border', true)
    cell.node()

  cellViewUpdate = (data, node, index, isHead) ->
    isFirstColum = table._.leftShifted and index is 0
    cellIsHead = isHead or isFirstColum
    selection = hx.select(node)
    if hx.isFunction(data) # Top left cell
      data(node)
    else if not data? # Top left cell when no renderer provided
      selection.text('')
    else table.options.cellRender(data, node, cellIsHead, index) # Head / Body cells

  rowViewEnter = (data, isHead) ->
    rowNode = @append('tr').node()
    rowView = hx.select(rowNode).view('.hx-pivot-table-cell')
      .enter (datum, index) ->
        # index starts at 0 for new cells added to a row so we override the
        # value here.
        index = data.indexOf(datum)
        cellViewEnter.call(this, datum, index, isHead)
      .update (datum, node, index) ->
        index = data.indexOf(datum)
        cellViewUpdate(datum, node, index, isHead)
    # create the view once on enter and re-use it in the update
    hx.component.register(rowNode, { view: rowView })
    rowNode

  rowViewUpdate = (data, node, index, isHead) ->
    hx.component(node).view.apply(data)

  headView = head.view('tr')
    .enter (data) -> rowViewEnter.call(this, data, true)
    .update (data, node) -> rowViewUpdate(data, node, true)

  bodyView = body.view('tr')
    .enter (data) -> rowViewEnter.call(this, data, false)
    .update (data, node) -> rowViewUpdate(data, node, false)

  [headView, bodyView]

class PivotTable extends hx.EventEmitter
  constructor: (@selector, options) ->
    super
    self = this
    hx.component.register(@selector, this)

    @options = hx.merge.defined({
      stickyHeaders: true
      topLeftCellRender: undefined
      cellRender: (data, element, isHead, column) ->
        hx.select(element).text(data)
      useResponsive: true
      data: undefined
    }, options)

    @_ = {}

    @selection = hx.select(@selector).classed('hx-pivot-table', true)

    @table = @selection.append('table').class('hx-table')

    @tableHead = @table.append('thead')
    @tableBody = @table.append('tbody')

    # Create the re-usable views
    [@tableHeadView, @tableBodyView] =
      createTableView(this, @tableHead, @tableBody)

    if @options.data?
      @data(@options.data)

  data: (data) ->
    if data?
      _ = @_
      _.data = data
      _.leftShifted = false

      clonedData = hx.merge(data, true)

      topData = if clonedData.topHead?.length > 0 then clonedData.topHead else []
      leftData = if clonedData.leftHead?.length > 0 then clonedData.leftHead else []
      bodyData = if clonedData.body?.length > 0 then clonedData.body else []

      if topData.length > 0 and bodyData.length > 0
        if topData.length isnt bodyData[0].length
          hx.consoleWarning 'hx.PivotTable - ' + @selector,
            'The number of columns in the dataset is not equal to the number of headers provided in data.topHead'

      if leftData.length > 0
        if leftData.length isnt bodyData.length
          hx.consoleWarning 'hx.PivotTable - ' + @selector,
            'The number of rows in the dataset is not equal to the number of headers provided in data.leftHead'

        bodyData = bodyData.map (e, i) ->
          e.unshift leftData[i]
          e

        _.leftShifted = true

      if topData.length > 0 and _.leftShifted
        topData?.unshift @options.topLeftCellRender or undefined

      if topData?.length > 0
        @tableHeadView.apply([topData])

      @tableBodyView.apply(bodyData)

      if @options.stickyHeaders
        if not @stickyTableHeaders
          @stickyTableHeaders = new hx.StickyTableHeaders(@selector, {
            stickTableHead: topData.length > 0
            stickFirstColumn: leftData.length > 0
            useResponsive: @options.useResponsive
          })
        else
          @stickyTableHeaders.render()
      this
    else
      @_.data

hx.pivotTable = (options) ->
  selection = hx.detached('div')
  new PivotTable(selection.node(), options)
  selection

hx.PivotTable = PivotTable