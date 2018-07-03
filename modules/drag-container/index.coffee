import { select, div } from 'modules/selection'
import { merge, defined } from 'modules/utils'
import { EventEmitter } from 'modules/event-emitter'

# A function for getting the grid of widgets and supplying the positions for
# each one to make working out where the placeholder should go while dragging.
getGrid = (container, elem) ->
  grid = []
  count = -1
  containerChildren(container).forEach (e) ->
    e = select(e)
    box = e.box()
    grid.push {
      index: count += 1
      x1: box.left
      x2: box.left + box.width
      y1: box.top
      y2: box.top + box.height
      width: e.style('width').replace('px','')
      height: e.style('height').replace('px','')
      elem: e
    }
  grid

startDrag = (container, elem, controlElem, e) ->
  _ = container._
  e.event.preventDefault()
  if _.dragging then endDrag(container, elem) # This deals with right clicks whilst dragging
  else if e.event.which < 2 # We only care about primary mouse events.

    # Add listeners to the dom for the events. There can only be one element dragged at a time so these don't need unique id's
    select(document)
      .on 'pointermove', 'hx.drag-container', (e) -> drag container, elem, controlElem, e
      .on 'pointerup', 'hx.drag-container', (e) -> endDrag container, elem, e

    # Used when accounting for scrolling.
    _.origPageYOffset = window.pageYOffset
    _.origPageXOffset = window.pageXOffset

    _.dragging = true
    _.grid = getGrid(container)
    _.origWidth = elem.style('width').replace('px', '')
    _.origHeight = elem.style('height').replace('px', '')

    _.placeholder = elem.insertAfter(elem.clone(true).clear()).classed('hx-drag-placeholder', true)

    # Use min height to allow flexbox to deal with sizing and append div so the
    # borders can be applied without changing the layout.
    _.placeholder
      .style('height', _.origHeight + 'px')
      .style('width', _.origWidth + 'px')
      .style('max-height', _.origHeight + 'px')
      .style('max-width', _.origWidth + 'px')
      .style('min-height', _.origHeight + 'px')
      .style('min-width', _.origWidth + 'px')
      .append('div')

    elem.classed('hx-drag-current', true)
      # fix the width to prevent the element being resized when absolutely positioned
      .style('width', _.origWidth + 'px')

    # Get the sizes of the various components used for positioning the element being dragged.
    _.selectionBox = elem.box()
    _.controlBox = controlElem.box()
    _.containerBox = container.selection.box()

    # We call this to move the element to the correct place as users won't click the exact centre of the drag control (and we don't want it to jump about)
    drag container, elem, controlElem, e
    _.currentPos = -1
    container.emit 'dragstart', elem.node()


drag = (container, elem, controlElem, e, preventGridMove) ->
  _ = container._
  if _.dragging
    e.event.preventDefault()
    # Calculate position to give the elem to align cursor with the center of the controlElem
    controlOffsetX = _.controlBox.left + (_.controlBox.width / 2)
    controlOffsetY = _.controlBox.top + (_.controlBox.height / 2)

    selectionOffsetX = _.containerBox.left - _.selectionBox.left
    selectionOffsetY = _.containerBox.top - _.selectionBox.top

    # Account for scrolling
    scrollOffsetX = window.pageXOffset - _.origPageXOffset
    scrollOffsetY = window.pageYOffset - _.origPageYOffset

    xVal = e.x - selectionOffsetX - controlOffsetX + scrollOffsetX
    yVal = e.y - selectionOffsetY - controlOffsetY + scrollOffsetY

    elem.style('left', xVal + 'px')
    elem.style('top', yVal + 'px')

    if not preventGridMove
      # Check which grid position the mouse is in and move the placeholder to the
      # correct location.
      xPos = e.x + scrollOffsetX
      yPos = e.y + scrollOffsetY

      before = true
      for box in _.grid
        inX = xPos >= box.x1 and xPos <= box.x2
        inY = yPos >= box.y1 and yPos <= box.y2

        if box.elem.node() is elem.node() then before = false

        if inX and inY
          if _.currentPos isnt box.index and _.currentPos > -1
            # Elements before the currently dragged element need to have the placeholder inserted before them because
            # of the currently dragged element being absolute positioned.
            if before
              box.elem.insertBefore(_.placeholder)
            else
              box.elem.insertAfter(_.placeholder)

            if _.options.resizeOnDrag
              # Resize the placeholder to fit the space it has been moved to
              _.placeholder
                .style('height', box.height + 'px')
                .style('width', box.width + 'px')
                .style('max-height', box.height + 'px')
                .style('max-width', box.width + 'px')
                .style('min-height', box.height + 'px')
                .style('min-width', box.width + 'px')

              # We only change the width as the content size may be different and we don't want to cause overlaps
              elem.style('width', _.placeholder.style('width'))

              # Re-create the boxes used by drag
              _.selectionBox = elem.box()
              _.controlBox = controlElem.box()

              drag container, elem, controlElem, e, true

            container.emit 'drag', elem.node()
          _.currentPos = box.index
          break

endDrag = (container, elem) ->
  _ = container._
  if _.dragging
    _.dragging = false

    # Remove document listeners
    select(document)
      .off 'pointermove', 'hx.drag-container'
      .off 'pointerup', 'hx.drag-container'

    # The position of the placeholder is important here as it is where the
    # currently selected element will be placed.
    _.placeholder.insertAfter(elem)
    _.placeholder.remove()

    # Reset styles and classes here. Don't change the height as it will break
    # widgets that have had the height option specified
    elem.style('top', '')
      .style('left', '')
      .style('width', '')
      .classed('hx-drag-current', false)

    container.emit 'dragend', elem.node()


# Find all the defined child elements and return them in an array (instead of a NodeList)
containerChildren = (container) ->
  children = container.selection.node().children
  items = for i in [0..children.length] by 1
    if children[i]? then children[i]
  items.filter(defined)


class DragContainer extends EventEmitter
  constructor: (selector, options) ->
    super()
    @selection = select(selector)
      .classed('hx-drag-container', true)
        .api(this)

    options = merge({
      lookup: (node) -> select(node).attr('data-id')
      resizeOnDrag: false
      order: undefined
    }, options)

    @_ = {}
    @_.options = options
    @_.initialOrder = @order()
    if options.order then @order(options.order)
    @setup()


  # Should be called whenever the direct children are changed to find new draggable elements.
  setup: ->
    @selection.selectAll('.hx-drag-control').off('pointerdown', 'hx.drag-container')
    containerChildren(this).forEach (elem) =>
      elem = select(elem)
      if elem.classed('hx-drag-element') # Only elements with hx-drag-element should be draggable.
        controlElem = select(elem.select('.hx-drag-control').node() or elem.node())
        controlElem.classed('hx-drag-control', true)
          .on 'pointerdown', 'hx.drag-container', (evt) =>
            if not controlElem.classed('hx-drag-disabled') then startDrag this, elem, controlElem, evt
    this


  order: (order) ->
    if arguments.length > 0
      map = {}
      for node in containerChildren(this)
        map[@lookup()(node)] = node
      for id in (order or @_.initialOrder)
        @selection.append(map[id])
      this
    else
      containerChildren(this).map(@lookup()).filter(defined)


  lookup: (fn) ->
    if fn?
      @_.options.lookup = fn
      this
    else
      @_.options.lookup

dragContainer = (options) ->
  selection = div()
  new DragContainer(selection.node(), options)
  selection

export { dragContainer, DragContainer }
