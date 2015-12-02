updateScrollIndicators = ->
  # Sets the visibility of the scroll indicators (for devices with 0 width scrollbars)
  node = @wrapper.node()

  canScrollUp = node.scrollTop > 0
  canScrollDown = node.scrollTop < node.scrollHeight - node.clientHeight
  canScrollLeft = node.scrollLeft > 0
  canScrollRight = node.scrollLeft < node.scrollWidth - node.clientWidth

  @topScrollIndicator.style('display', if canScrollUp then 'block' else '')
  @rightScrollIndicator.style('display', if canScrollRight then 'block' else '')
  @bottomScrollIndicator.style('display', if canScrollDown then 'block' else '')
  @leftScrollIndicator.style('display', if canScrollLeft then 'block' else '')

updateHeaderPositions = ->
  # Set the relative positions of the two headers.
  # This method reduces flickering when scrolling on mobile devices.
  node = @wrapper.node()
  leftOffset = - node.scrollLeft
  if @options.stickTableHead and @options.stickFirstColumn
    leftOffset -= @widthOffset

  topOffset = - node.scrollTop

  @topHeader?.select('.hx-table').style('left', leftOffset + 'px')
  @leftHeader?.select('.hx-table').style('top', topOffset + 'px')

cloneEvents = (elem, clone) ->
  # Copy all events and recurse through children.
  if elem? and clone?
    elemData = hx.select.getHexagonElementDataObject(elem)
    listenerNamesRegistered = elemData.listenerNamesRegistered?.values()

    if listenerNamesRegistered and listenerNamesRegistered.length > 0
      origEmitter = elemData.eventEmitter

      cloneElem = hx.select(clone)
      for listener in listenerNamesRegistered
        cloneElem.on listener, -> return

      cloneEmitter = hx.select.getHexagonElementDataObject(clone).eventEmitter
      cloneEmitter.pipe(origEmitter)

    elemChildren = elem.childNodes
    if elemChildren
      cloneChildren = clone.childNodes
      cloneEvents elemChildren[i], cloneChildren[i] for i in [0..elemChildren.length]

fixSizes = (elem, fn) ->
  # Deal with situations where no node is present
  if not elem.empty()
    width = Number(elem.style('width').replace('px',''))
    height = Number(elem.style('height').replace('px',''))

    clone = elem.clone(true)

    cloneEvents elem.node(), clone.node()

    # XXX: Make sure changing this to only size the clones doesn't cause size issues
    clone
      .style('width', width + 'px')
      .style('min-width', width + 'px')
      .style('height', height + 'px')
      .style('min-height', height + 'px')

    fn clone

renderStickyHeaders = ->
  # Set up some defaults to use in the rest of the function
  @widthOffset = 0
  @heightOffset = 0
  nonStickyHeightOffset = 0

  addedTopSticky = false
  addedLeftSticky = false

  # reset widths/heights
  @wrapper
    .style('height', '')
    .style('width', '')
    .style('margin-left', '')
    .style('margin-right', '')
    .style('max-height', @container.style('height'))
    .style('max-width', @container.style('width'))

  @table
    .style('height', '')
    .style('width', '')
    .style('margin-left', '')
    .style('margin-right', '')

  @container.style('max-height', '')

  wrapperNode = @wrapper.node()
  heightScrollOffset = if wrapperNode.scrollWidth > wrapperNode.clientWidth then hx.scrollbarSize() else 0
  widthScrollOffset = if wrapperNode.scrollHeight > wrapperNode.clientHeight then hx.scrollbarSize() else 0

  @table.style('width', @container.style('width').replace('px','') - widthScrollOffset + 'px')

  @tableSize = {
    width: @table.style('width').replace('px','')
    height: @table.style('height').replace('px','')
  }

  tableClone = @table.clone(true)
    .style('width', '')
    .style('height', '')
    .style('margin-left', '')
    .style('margin-top', '')
    .style('top', '')

  tableClone.selectAll('tbody, thead').remove()

  additionalLevel = false
  if tableClone.node().nodeName.toLowerCase() isnt 'table'
    additionalLevel = true

  # stick the headers along the top of the table (within the thead element.)
  if @options.stickTableHead
    # We want to fix the sizes for the cells whenever render is called.
    # We only want to add the sticky headers when there are scrollbars.
    if wrapperNode.scrollHeight > @wrapper.height() or @options.alwaysSticky
      headerTable = tableClone.clone(true)

      headerTableContent = if additionalLevel
        headerTable.select('table')
      else
        headerTable.append('thead')


      # Deals with grouped headers by selecting all the rows in the thead element
      @table.select('thead').selectAll('tr')
        .forEach (rowNode) ->
          newRowNode = headerTableContent.append('tr')
          rowNode.selectAll('th, td')
            .forEach (cellNode) ->
              fixSizes cellNode, (newNode) ->
                newRowNode.append newNode
                cellNode.classed('hx-sticky-table-invisible', true)

      @topHeader.clear()

      addedTopSticky = true
      @topHeader.append headerTable

      @heightOffset = Number headerTable.style('height').replace('px','')

      @topHeader
        .select('.hx-table')
        .style('width', @tableSize.width + 'px')
        .style('height', @heightOffset + 'px')

    else
      # Required when there's a thead element but it's not been made sticky
      nonStickyHeightOffset = Number @table.select('thead').style('height').replace('px', '')

  # stick the first column headers.
  if @options.stickFirstColumn

    # We want to fix the sizes for the cells whenever render is called.
    # We only want to add the sticky headers when there are scrollbars.
    if wrapperNode.scrollWidth > wrapperNode.clientWidth or @options.alwaysSticky
      bodyTable = tableClone.clone(true)

      bodyTableContent = if additionalLevel
        bodyTable.select('table')
      else
        bodyTable.append('tbody')

      @table.select('tbody').selectAll('tr')
        .forEach (rowNode) ->
          newRowNode = bodyTableContent.append('tr').class(rowNode.class())
          cellNode = rowNode.select('th, td')
          fixSizes rowNode.select('th, td'), (newNode) ->
            newRowNode.append newNode
            cellNode.classed('hx-sticky-table-invisible', true)

      @leftHeader.clear()

      addedLeftSticky = true
      @leftHeader.append bodyTable

      @widthOffset = Number bodyTable.style('width').replace('px','')

      @leftHeader
        .style('top', @heightOffset + nonStickyHeightOffset + 'px')
        .style('max-height', @container.height() - @heightOffset - nonStickyHeightOffset + 'px')
        .style('height', @tableSize.height - @heightOffset - nonStickyHeightOffset + 'px')
        .select('.hx-table')
          .style('width', @widthOffset + 'px')
          .style('height', @tableSize.height - @heightOffset - nonStickyHeightOffset + 'px')

  # If we've added both the headers, we need a top left cell and the top header
  # needs to be offset.
  if @options.stickFirstColumn and addedLeftSticky and @options.stickTableHead and addedTopSticky
    @topHeader.style('left', @widthOffset + 'px')

    @topLeftTable
      .style('width', @leftHeader.style('width'))
      .style('height', @topHeader.style('height'))

    topLeftTable = @topLeftTable.clear()
    @table.select('thead').selectAll('tr').forEach (rowNode) ->
      cellNode = rowNode.select('th, td')
      fixSizes cellNode, (newNode) ->
        topLeftTable.append('tr').append newNode
        cellNode.classed('hx-sticky-table-invisible', true)


  # This needs to be done after the left head has been added as otherwise the widthOffset is 0
  @topHeader?.style('max-width', @container.width() - @widthOffset  + 'px')
    .style('width', @tableSize.width - @widthOffset + 'px')

  # Get the sizes for the wrapper.
  totalHeight = @container.style('height').replace('px','') - @heightOffset #+ heightScrollOffset * 1
  totalWidth = @container.style('width').replace('px','') - @widthOffset

  @wrapper.style('height', totalHeight + 'px')
    .style('width', totalWidth + 'px')
    .style('margin-left', @widthOffset + 'px')
    .style('margin-top', @heightOffset + 'px')

  # The negative table margin 'hides' the real table headers outside the scrollable area for the wrapper.
  @table.style('margin-left', - @widthOffset + 'px')
    .style('margin-top', - @heightOffset + 'px')

  maxContainerHeight = @tableSize.height*1 + heightScrollOffset*1
  # if @container.style('height').replace('px', '') > maxContainerHeight
  @container.style('max-height', maxContainerHeight + 'px')

  # Move the scroll indicators so they touch the edges of the wrapper.
  if @showScrollIndicators
    @topScrollIndicator.style('top', @heightOffset + 'px').style('left', @widthOffset + 'px')
    @rightScrollIndicator.style('top', @heightOffset + 'px')
    @bottomScrollIndicator.style('left', @widthOffset + 'px')
    @leftScrollIndicator.style('left', @widthOffset + 'px').style('top', @heightOffset + 'px')
    updateScrollIndicators.call this

  updateHeaderPositions.call this
  @emit 'render'


class StickyTableHeaders extends hx.EventEmitter
  constructor: (selector, options) ->
    super
    @options = hx.merge.defined {
      stickTableHead: true # stick thead element
      stickFirstColumn: false # stick first column
      useResponsive: true
      alwaysSticky: false
      containerClass: undefined # Class to add to container to allow styling - useful for situations where table is the root element
    }, options

    hx.component.register(selector, this)

    @selection = hx.select(selector)

    if @selection.classed('hx-table') or @selection.node().nodeName.toLowerCase() is 'table'
      tableIsRootElement = true
      @table = @selection
    else
      tableIsRootElement = false
      @table = @selection.select('.hx-table')

    @selection.classed('hx-sticky-table-centered', @table.classed('hx-table-centered'))

    if @options.stickTableHead and @table.select('thead').select('tr').empty()
      # Cant stick something that isn't there
      hx.consoleWarning 'hx.StickyTableHeaders - ' + selector,
        'Sticky table headers initialized without thead element'
      @options.stickTableHead = false

    # Create the container, this will always be the root element.
    @container = if tableIsRootElement
      # If the table is the root element, we have to create a div alongside it
      # to allow structuring of the Sticky headers.
      # There's a higher chance of visual issues using this method.
      @table.insertAfter('div').class('hx-sticky-table-headers')
    else
      @selection.classed('hx-sticky-table-headers', true)

    @container.style 'max-height', ''

    # The scroll indicators are only needed when the scrollbar width is 0 (e.g. when on mobile devices.)
    if @showScrollIndicators = hx.scrollbarSize() is 0
      # We use four separate divs as using one overlay div prevents click-through
      @topScrollIndicator = @container.append('div').class('hx-sticky-table-scroll-top')
      @rightScrollIndicator = @container.append('div').class('hx-sticky-table-scroll-right')
      @bottomScrollIndicator = @container.append('div').class('hx-sticky-table-scroll-bottom')
      @leftScrollIndicator = @container.append('div').class('hx-sticky-table-scroll-left')

    # Add the optional container class
    if @options.containerClass?.length > 0
      @container.classed(@options.containerClass, true)

    # We only create the sticky elements if we need them
    if @options.stickTableHead
      @topHeader = @container.append('div').class('hx-sticky-table-header-top')

    if @options.stickFirstColumn
      @leftHeader = @container.append('div').class('hx-sticky-table-header-left')

    # We don't need to do this when the scrollbar size is 0 as there's no empty space shown
    # at the end of each sticky header when scrolling to the bottom right corner of a table.
    if (@options.stickTableHead or @options.stickFirstColumn) and not @showScrollIndicators
      background = @table.select('th').style('background-color')
      @topHeader?.style('background-color', background)
      @leftHeader?.style('background-color', background)


    # If we're sticking both headers, the first cell for the thead should be stuck to the
    # top left corner
    if @options.stickFirstColumn and @options.stickTableHead
      @topLeftTable = @container.append('table').class('hx-sticky-table-header-top-left hx-table').append('thead')


    # Table wrapper that allows scrolling on the table.
    @wrapper = @container.append('div').class('hx-sticky-table-wrapper')

    # Put the original table into the wrapper.
    @wrapper.append(@table)

    # Does all the work of rendering the headers correctly
    @wrapper.on 'scroll', 'hx.sticky-table-headers', =>
      if @showScrollIndicators
        updateScrollIndicators.call this
      updateHeaderPositions.call this

    @render()

    if @options.useResponsive
      @container.on 'resize', 'hx.sticky-table-headers', =>
        @render()
        setTimeout (=> @render()), 100

  render: ->
    renderStickyHeaders.call this

hx.StickyTableHeaders = StickyTableHeaders