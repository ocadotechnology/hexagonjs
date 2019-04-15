import { select, div } from 'utils/selection'
import { isFunction, mergeDefined, clone } from 'utils/utils'
import { EventEmitter } from 'utils/event-emitter'

import { StickyTableHeaders } from 'components/sticky-table-headers'

createTableView = (table, head, body) ->
  cellViewEnter = (data, index, isHead) ->
    isFirstColum = table._.leftShifted and index is 0
    cellIsHead = isHead or isFirstColum
    cellIsTopLeft = isHead and isFirstColum
    type = if cellIsHead or isFunction(data) then 'th' else 'td'
    cell = @append(type).class('hx-pivot-table-cell')
    if cellIsHead then cell.classed('hx-pivot-table-head-cell', true)
    if cellIsTopLeft then cell.classed('hx-table-head-no-border', true)
    cell.node()

  cellViewUpdate = (data, node, index, isHead) ->
    isFirstColum = table._.leftShifted and index is 0
    cellIsHead = isHead or isFirstColum
    selection = select(node)
    if isFunction(data) # Top left cell
      data(node)
    else if not data? # Top left cell when no renderer provided
      selection.text('')
    else table.options.cellRender(data, node, cellIsHead, index) # Head / Body cells

  rowViewEnter = (data, isHead) ->
    row = @append('tr')
    rowView = select(row).view('.hx-pivot-table-cell')
      .enter (datum) ->
        index = data.indexOf(datum)
        cellViewEnter.call(this, datum, index, isHead)
      .update (datum, node, index) ->
        cellViewUpdate(datum, node, index, isHead)
    # create the view once on enter and re-use it in the update
    row.api({ view: rowView })
    return row.node()

  rowViewUpdate = (data, node, index, isHead) ->
    select(node).api().view.apply(data)

  headView = head.view('tr')
    .enter (data) -> rowViewEnter.call(this, data, true)
    .update (data, node) -> rowViewUpdate(data, node, true)

  bodyView = body.view('tr')
    .enter (data) -> rowViewEnter.call(this, data, false)
    .update (data, node) -> rowViewUpdate(data, node, false)

  [headView, bodyView]

class PivotTable extends EventEmitter
  constructor: (@selector, options) ->
    super()
    self = this

    @options = mergeDefined({
      stickyHeaders: true
      topLeftCellRender: undefined
      # XXX Breaking: Renderer
      cellRender: (data, element, isHead, column) ->
        select(element).text(data)
      useResponsive: true
      data: undefined,
      fullWidth: undefined,
      highlightOnHover: true
    }, options)

    @_ = {}

    @selection = select(@selector)
      .classed('hx-pivot-table', true)
      .api('pivot-table', this)
      .api(this)

    @table = @selection.append('table').class('hx-table')
      .classed('hx-table-no-hover', not @options.highlightOnHover)

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

      clonedData = clone(data)
      topData = if clonedData.topHead?.length > 0 then clonedData.topHead else []
      leftData = if clonedData.leftHead?.length > 0 then clonedData.leftHead else []
      bodyData = if clonedData.body?.length > 0 then clonedData.body else []

      if topData.length > 0 and bodyData.length > 0
        if topData.length isnt bodyData[0].length
          logger.warn(
            'hx.PivotTable - ' + @selector,
            'The number of columns in the dataset is not equal to the number of headers provided in data.topHead'
          )

      if leftData.length > 0
        if leftData.length isnt bodyData.length
          logger.warn(
            'hx.PivotTable - ' + @selector,
            'The number of rows in the dataset is not equal to the number of headers provided in data.leftHead'
          )

        bodyData = bodyData.map (e, i) ->
          e.unshift leftData[i]
          e

        _.leftShifted = true

      if topData.length > 0 and _.leftShifted
        topData?.unshift @options.topLeftCellRender or undefined

      if topData?.length > 0
        @tableHeadView.apply([topData])

      @tableBodyView.apply(bodyData)

      @table.classed('hx-table-full', false)

      if @options.stickyHeaders
        if not @stickyTableHeaders
          @stickyTableHeaders = new StickyTableHeaders(@selector, {
            stickTableHead: topData.length > 0
            stickFirstColumn: leftData.length > 0
            useResponsive: @options.useResponsive,
            fullWidth: @options.fullWidth
          })
        else
          @stickyTableHeaders.render()
      else if @options.fullWidth
        @table.classed('hx-table-full', @options.fullWidth)
      this
    else
      @_.data

pivotTable = (options) ->
  selection = div()
  new PivotTable(selection, options)
  selection

export {
  pivotTable,
  PivotTable
}
