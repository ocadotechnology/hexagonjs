updateScrollIndicators = (wrapper, top, right, bottom, left) ->
  # Sets the visibility of the scroll indicators (for devices with 0 width scrollbars)
  node = wrapper.node()

  canScrollUp = node.scrollTop > 0
  canScrollDown = node.scrollTop < node.scrollHeight - node.clientHeight
  canScrollLeft = node.scrollLeft > 0
  canScrollRight = node.scrollLeft < node.scrollWidth - node.clientWidth

  top.style('display', if canScrollUp then 'block' else '')
  right.style('display', if canScrollRight then 'block' else '')
  bottom.style('display', if canScrollDown then 'block' else '')
  left.style('display', if canScrollLeft then 'block' else '')

updateHeaderPositions = (container) ->
  # Set the relative positions of the two headers.
  # This method reduces flickering when scrolling on mobile devices.
  node = container.select('.hx-sticky-table-wrapper').node()
  leftOffset = - node.scrollLeft
  topOffset = - node.scrollTop
  container.select('.hx-sticky-table-header-top').select('.hx-table').style('left', leftOffset + 'px')
  container.select('.hx-sticky-table-header-left').select('.hx-table').style('top', topOffset + 'px')


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


class StickyTableHeaders
  constructor: (selector, options) ->
    hx.component.register(selector, this)

    resolvedOptions = hx.merge.defined {
      stickTableHead: true # stick thead element
      stickFirstColumn: false # stick first column
      useResponsive: true
      fullWidth: undefined
      containerClass: undefined # Class to add to container to allow styling - useful for situations where table is the root element
    }, options

    selection = hx.select(selector)

    table = if selection.classed('hx-table') or selection.node().nodeName.toLowerCase() is 'table'
      tableIsRootElement = true
      selection
    else
      tableIsRootElement = false
      selection.select('.hx-table')

    if table.classed('hx-table-full') and not options.fullWidth?
      options.fullWidth = true

    if resolvedOptions.stickTableHead and table.select('thead').select('tr').empty()
      # Cant stick something that isn't there
      hx.consoleWarning 'hx.StickyTableHeaders - ' + selector,
        'Sticky table headers initialized without thead element'
      resolvedOptions.stickTableHead = false

    # Create the container, this will always be the root element.
    container = if tableIsRootElement
      # If the table is the root element, we have to create a div alongside it
      # to allow structuring of the Sticky headers.
      # There's a higher chance of visual issues using this method.
      table.insertAfter('div').class('hx-sticky-table-headers')
    else
      selection.classed('hx-sticky-table-headers', true)

    # Table wrapper that allows scrolling on the table.
    wrapper = container.append('div').class('hx-sticky-table-wrapper')

    # Put the original table into the wrapper.
    wrapper.append(table)

    showScrollIndicators = hx.scrollbarSize() is 0

    if showScrollIndicators
      # We use four separate divs as using one overlay div prevents click-through
      topIndicator = container.append('div').class('hx-sticky-table-scroll-top')
      rightIndicator = container.append('div').class('hx-sticky-table-scroll-right')
      bottomIndicator = container.append('div').class('hx-sticky-table-scroll-bottom')
      leftIndicator = container.append('div').class('hx-sticky-table-scroll-left')

    # Does all the work of rendering the headers correctly
    wrapper.on 'scroll', 'hx.sticky-table-headers', ->
      if showScrollIndicators
        updateScrollIndicators(wrapper, topIndicator, rightIndicator, bottomIndicator, leftIndicator)
      updateHeaderPositions(container)

    @_ = {
      options: resolvedOptions,
      container: container,
      wrapper: wrapper,
      table: table,
      selection: selection,
      showScrollIndicators: showScrollIndicators
    }

    @render()

    if resolvedOptions.useResponsive
      self = this
      container.on 'resize', 'hx.sticky-table-headers', ->
        self.render()
        setTimeout (-> self.render()), 100

  render: ->
    _ = @_
    container = _.container
    wrapper = _.wrapper
    wrapperNode = wrapper.node()
    table = _.table
    options = _.options

    origScroll = wrapperNode.scrollTop

    container
      .style('height','')
      .style('width','')

    wrapper
      .style('height', '')
      .style('width', '')
      .style('margin-top', '')
      .style('margin-left', '')
      .style('max-width', '')
      .style('max-height', '')

    table
      .style('margin-top', '')
      .style('margin-left', '')
      .style('min-width', '')
      .style('min-height', '')

    offsetHeight = 0
    offsetWidth = 0

    if options.stickTableHead
      offsetHeight = table.select('thead').height()

    if options.stickFirstColumn
      offsetWidthElem = hx.select(table.select('tbody').select('tr').select('th, td').nodes[0])
      offsetWidth = offsetWidthElem.width() # + parseInt(offsetWidthElem.style('border-right'))

    totalHeight = container.style('height').replace('px','') - offsetHeight
    totalWidth = container.style('width').replace('px','') - offsetWidth


    wrapper
      .style('width', totalWidth  + 'px')
      .style('height', totalHeight + 'px')
      .style('margin-top', offsetHeight + 'px')
      .style('margin-left', offsetWidth + 'px')

    # resize and reposition stuff

    table
      .style('margin-top', - offsetHeight + 'px')
      .style('margin-left', - offsetWidth + 'px')

    tableBox = table.box()

    hasVerticalScroll = wrapperNode.scrollHeight > wrapperNode.clientHeight
    hasHorizontalScroll = wrapperNode.scrollWidth > wrapperNode.clientWidth
    heightScrollbarOffset = if hasHorizontalScroll then hx.scrollbarSize() else 0
    widthScrollbarOffset = if hasVerticalScroll then hx.scrollbarSize() else 0

    wrapperBox = wrapper.box()

    if options.fullWidth
      table
        .style('min-width', wrapperBox.width + offsetWidth - widthScrollbarOffset + 'px')
        .style('min-height', wrapperBox.height + offsetHeight - heightScrollbarOffset + 'px')
    else
      wrapper
        .style('max-width', tableBox.width - offsetWidth + widthScrollbarOffset + 'px')
        .style('max-height', tableBox.height - offsetHeight + heightScrollbarOffset + 'px')

    tableClone = table.clone(true)

    if options.stickTableHead
      # Append top
      topHead = container.select('.hx-sticky-table-header-top')
      if topHead.empty()
        topHead = container.prepend('div').class('hx-sticky-table-header-top')
        # We don't need to do this when the scrollbar size is 0 as there's no empty space shown
        # at the end of each sticky header when scrolling to the bottom right corner of a table.
        if not _.showScrollIndicators and options.fullWidth
          background = table.select('th').style('background-color')
          topHead.style('background-color', background)


      topHead.clear()

      topTable = topHead.append tableClone.clone(true)

      realNodes = table.select('thead').selectAll('tr').selectAll('th, td').nodes
      clonedNodes = topTable.select('thead').selectAll('tr').selectAll('th, td').nodes

      for i in [0...realNodes.length]
        cloneEvents(realNodes[i], clonedNodes[i])
        # hx.select(realNodes[i]).classed('hx-sticky-table-invisible', true)

    if options.stickFirstColumn
      # Append left
      leftHead = container.select('.hx-sticky-table-header-left')
      if leftHead.empty()
        leftHead = container.prepend('div').class('hx-sticky-table-header-left')

        if not _.showScrollIndicators and options.fullWidth
          background = table.select('th').style('background-color')
          leftHead.style('background-color', background)
        # scrollLeftHead = (event) ->
        #   event.preventDefault()
        #   wrapperNode.scrollTop = wrapperNode.scrollTop + event.deltaY
        #   updateHeaderPositions(container)

        # leftHead.on 'wheel', scrollLeftHead


      leftHead.clear()

      leftTable = leftHead.append tableClone.clone(true)

      realNodes = table.select('tbody').selectAll('tr').select('th, td').nodes
      clonedNodes = leftTable.select('tbody').selectAll('tr').select('th, td').nodes

      for i in [0...realNodes.length]
        cloneEvents(realNodes[i], clonedNodes[i])
        # hx.select(realNodes[i]).classed('hx-sticky-table-invisible', true)


    if options.stickTableHead and options.stickFirstColumn
      # Append top left
      topLeftHead = container.select('.hx-sticky-table-header-top-left')
      if topLeftHead.empty()
        topLeftHead = container.prepend('div').class('hx-sticky-table-header-top-left')
      topLeftHead.clear()

      topLeftTable = topLeftHead.append tableClone.clone(true)

      realNodes = table.select('thead').selectAll('tr').select('th, td').nodes
      clonedNodes = topLeftTable.select('thead').selectAll('tr').select('th, td').nodes

      for i in [0...realNodes.length]
        cloneEvents(realNodes[i], clonedNodes[i])
        # hx.select(realNodes[i]).classed('hx-sticky-table-invisible', true)


    topHead?.style('height', offsetHeight + 'px')
      .style('width', wrapperBox.width + 'px')
      .style('left', offsetWidth + 'px')

    topTable?.style('margin-left', - offsetWidth + 'px')

    leftHead?.style('height', wrapperBox.height + 'px')
      .style('width', offsetWidth + 'px')
      .style('top', offsetHeight + 'px')

    leftTable?.style('margin-top', - offsetHeight + 'px')

    topLeftHead?.style('width', leftHead?.style('width'))
      .style('height', topHead?.style('height'))

    wrapperNode.scrollTop = origScroll
    if _.showScrollIndicators
      scrollOffsetWidth = offsetWidth - 1
      scrollOffsetHeight = offsetHeight - 1

      topIndicator = container.select('.hx-sticky-table-scroll-top')
        .style('top', scrollOffsetHeight + 'px')
        .style('left', scrollOffsetWidth + 'px')
        .style('width', wrapperBox.width + 'px')

      rightIndicator = container.select('.hx-sticky-table-scroll-right')
        .style('top', scrollOffsetHeight + 'px')
        .style('height', wrapperBox.height + 'px')

      bottomIndicator = container.select('.hx-sticky-table-scroll-bottom')
        .style('left', scrollOffsetWidth + 'px')
        .style('width', wrapperBox.width + 'px')

      leftIndicator = container.select('.hx-sticky-table-scroll-left')
        .style('top', scrollOffsetHeight + 'px')
        .style('left', scrollOffsetWidth + 'px')
        .style('height', wrapperBox.height + 'px')

      updateScrollIndicators(wrapper, topIndicator, rightIndicator, bottomIndicator, leftIndicator)


    updateHeaderPositions(container)


hx.StickyTableHeaders = StickyTableHeaders