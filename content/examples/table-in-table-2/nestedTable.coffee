renderNestedTable = (table, row, childData, nextLevelData) ->
  self = this

  if @options.showOriginal and @visible
    @hide(-> renderNestedTable.call self, table, row, childData, nextLevelData)
    return

  @nestedTableContainer = @tableContainer.insertAfter('div')

  if not @options.showOriginal
    # Make a single row table without sorts/filters
    @subTableContainer = @nestedTableContainer.insertBefore('div')

    subTable = new hx.Table(@subTableContainer.node(), {
      showSorts: false
      showFilters: false
    })

    rowData = {
      head: table._.header
      body: [row.data]
    }

    subTable.setData(rowData)

    subTable.on 'rowclick', ->
      self.hide()

    subTable.on 'render', ->
      newElem = self.subTableContainer.select('.hx-table-non-sticky')
      if newElem.classed('hx-table-mobile')
        newElem.select('tbody').class('hx-table-row-selected')
      else
        newElem.select('tbody').select('tr').class('hx-table-row-selected')
  else
    if row.elem.classed('hx-table-row-selected')
      @hide()
      row.elem.classed('hx-table-row-selected', false)
      return
    else
      @tableContainer.selectAll('.hx-table-row-selected').classed('hx-table-row-selected', false)
      row.elem.class('hx-table-row-selected')

  nestedTable = new hx.Table(@nestedTableContainer.node(), table.options)
  nestedTable.setData(childData)

  subOptions = {}

  if nextLevelData?
    subOptions.childData = nextLevelData

  subOptions = hx.merge(false, @options, subOptions)

  @nested = new NestedTable(nestedTable, subOptions)
  @nested.level = @level + 1

  @nested.pipe this

  nestedTable.on 'render', 'nestedTableRenderInner', ->
    if not self.options.showOriginal or self.origView is table._.useMobileView
      showNestedTable.call self

showNestedTable = ->
  self = this
  if not @visible and not @forceClose
    if @options.animate
      if not @options.showOriginal
        @tableContainer.morph().with('fadeout').and('collapsev').go(true)
        @subTableContainer?.style('opacity',0).morph().with('fadein').go(true)
      @nestedTableContainer.style('height',0).style('opacity',0).morph().with('expandv').and('fadein')
      .then(-> self.emit 'show', self.level)
      .go(true)
    else
      if not @options.showOriginal
        @tableContainer.style('display', 'none')
      @emit 'show', @level
    @visible = true
  return

hideNestedTable = (cb) ->
  self = this

  if @nested?.nested?
    @nested.subHide = true
    @nested.hide(-> self.hide(cb))
    return

  done = =>
    @subHide = false
    @nested = undefined
    @emit 'hide', @level
    cb?()

  if @visible
    @visible = false
    if @options.animate
      if not @options.showOriginal
        if not @subHide
          @tableContainer.morph().with('fadein').and('expandv').go(true)
        @subTableContainer.morph().with('fadeout').then(-> self.subTableContainer.remove()).go(true)

      @nestedTableContainer
        .morph()
        .with('fadeout')
        .and('collapsev')
        .then(-> self.nestedTableContainer.remove())
        .then(-> done())
        .go(true)
    else
      if not @options.showOriginal
        if not @subHide
          @tableContainer.style('display', '')
        @subTableContainer.remove()
      @nestedTableContainer.remove()
      done()
  return

class NestedTable extends hx.EventEmitter
  constructor: (table, options) ->
    super
    self = this

    @tableContainer = table._.container

    @options = hx.merge false, {
      animate: true
      childData: (row, cb) -> undefined
      showOriginal: false
    }, options

    @level = 0
    @visible = false

    table.on 'rowclick', 'nestedTableRowClick', (row) =>
      @options.childData? row.data, @level, (childData, nextLevelData) ->
        if childData then renderNestedTable.call self, table, row, childData, nextLevelData

    if @options.showOriginal
      @origView = table._.useMobileView

      table.on 'render', 'nestedTableRenderOuter', ->
        self.hide ->
          self.origView = table._.useMobileView

  hide: (cb) ->
    hideNestedTable.call this, cb
    this