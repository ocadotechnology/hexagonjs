cellViewEnter = (d, i, isHead, topLeft) ->
  type = if isHead or hx.isFunction(d) then 'th' else 'td'
  cell = @append(type).class('hx-pivot-table-cell')
  if isHead then cell.classed('hx-pivot-table-head-cell', true)
  if topLeft then cell.classed('hx-table-head-no-border', true)
  cell.node()

cellViewUpdate = (d, e, i, cellRender, isHead) ->
  elem = hx.select(e)
  if hx.isFunction d # Top left cell
    d(e)
  else if not d? # Top left cell when no renderer provided
    elem.text('')
  else cellRender(d, e, isHead, i) # Head / Body cells

rowViewUpdate = (d, e, i, cellRender, isHead, shifted) ->
  # Account for first column headers so the cell view index is relative to the passed in data body.
  hx.select(e).view('.hx-pivot-table-cell')
    .enter (d, i) -> cellViewEnter.call(this, d, i, isHead or (shifted and i is 0), isHead and (shifted and i is 0))
    .update (d, e, i) -> cellViewUpdate(d, e, i, cellRender, isHead or (shifted and i is 0))
    .apply(d)

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
    }, options)

    @_ = {}

    @selection = hx.select(@selector).classed('hx-pivot-table', true)

    @table = @selection.append('table').class('hx-table')

    @tableHead = @table.append('thead')
    @tableBody = @table.append('tbody')

  data: (data) ->
    if data?
      self = this

      @_.data = data

      topData = if data.topHead?.length > 0 then data.topHead else []
      leftData = if data.leftHead?.length > 0 then data.leftHead else []

      if topData.length > 0 and data.body.length > 0
        if topData.length isnt data.body[0].length
          hx.consoleWarning 'hx.PivotTable - ' + @selector,
            'The number of columns in the dataset is not equal to the number of headers provided in data.topHead'

      if leftData.length > 0
        if leftData.length isnt data.body.length
          hx.consoleWarning 'hx.PivotTable - ' + @selector,
            'The number of rows in the dataset is not equal to the number of headers provided in data.leftHead'

        bodyData = data.body.map (e, i) ->
          e.unshift leftData[i]
          e

        leftShifted = true

      if topData.length > 0 and leftShifted
        topData?.unshift @options.topLeftCellRender or undefined

      bodyData ?= data.body

      @tableHeadView = @tableHead.view('tr','tr')
        .update (d, e, i) -> rowViewUpdate(d, e, i, self.options.cellRender, true, leftShifted)

      @tableBodyView = @tableBody.view('tr', 'tr')
        .update (d, e, i) -> rowViewUpdate(d, e, i, self.options.cellRender, false, leftShifted)

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