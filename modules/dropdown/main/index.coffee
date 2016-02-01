
dropdownAnimateSlideDistance = 8

checkFixedPos = (node) ->
  elem = hx.select(node)
  if elem.size() > 0 and elem.style('position') is 'fixed' then true

calculateDropdownPosition = (alignments, rect, dropdownRect, windowRect, spacing, ddMaxHeight, parentFixed, scrollbarWidth) ->
  horizontalPos = rect.x
  verticalPos = rect.y

  if alignments[0] is 'r' then horizontalPos = rect.x + rect.width
  if alignments[1] is 'b' then verticalPos = rect.y + rect.height
  if alignments[2] is 'r' then horizontalPos -= dropdownRect.width
  if alignments[3] is 'b' then verticalPos -= dropdownRect.height

  if alignments[0] isnt alignments[2]
    switch alignments[2]
      when 'l' then horizontalPos += spacing
      when 'r' then horizontalPos -= spacing

  if alignments[1] isnt alignments[3]
    switch alignments[3]
      when 't' then verticalPos += spacing
      when 'b'
        invertY = true
        verticalPos -= spacing

  # these checks move the dropdown when it flows outside the window boundaries
  if horizontalPos < 0 then horizontalPos = 0
  if (horizontalWindow = (horizontalPos + dropdownRect.width - windowRect.innerWidth + scrollbarWidth)) > 0
    horizontalPos -= horizontalWindow

  if verticalPos < 0 then verticalPos = 0

  ddHeight = if not isNaN(ddMaxHeight)
    Math.min(ddMaxHeight, dropdownRect.height)
  else
    dropdownRect.height

  if (verticalWindow = (verticalPos + ddHeight - windowRect.innerHeight )) > 0
    movedVertical = true
    verticalPos -= verticalWindow

  # inverval intersection check
  checkOverlap = (posA, posB, rectA, rectB) ->
    # posA/B are dropdown sides (left/right or top/bottom)  - [ ]
    # rectA/B are selection sides (left/right or top/bottom) - | |
    complete = posA < rectA and posB > rectB # [ | | ]
    partialA = posB >= rectB and posA < rectB and posA >= rectA # | [ | ]
    partialB = posA <= rectA and posB > rectA and posB <= rectB # [ | ] |

    if complete or partialA then 2
    else if partialB then 1
    else 0

  horizontalOverlap = checkOverlap(horizontalPos, (horizontalPos + dropdownRect.width), rect.x, (rect.x + rect.width))
  verticalOverlap = checkOverlap(verticalPos, (verticalPos + dropdownRect.height), rect.y, (rect.y + rect.height))

  # if both are greater than 0 then dd overlaps selection
  if horizontalOverlap > 0 and verticalOverlap > 0
    # dropdown overlaps at the top of the selection so should be moved down
    if verticalOverlap > 1 and not movedVertical
      invertY = false
      verticalPos = rect.y + rect.height + spacing
    else
      invertY = true
      verticalPos = rect.y - dropdownRect.height - spacing

      # check if dropdown goes off the screen after being moved up
      if verticalPos < 0
        invertY = false
        verticalPos = rect.y + rect.height + spacing


  if not parentFixed
    horizontalPos += windowRect.scrollX
    verticalPos += windowRect.scrollY

  # switches the dropdown position so it scales from the bottom instead of the top
  yPos = 'top'
  if invertY
    yPos = 'bottom'
    bodyDiff = document.body.scrollHeight - document.body.clientHeight
    verticalPos = document.body.scrollHeight - verticalPos - bodyDiff - dropdownRect.height

  {
    y: verticalPos,
    x: horizontalPos,
    yPos: yPos,
    xPos: 'left'
  }

class Dropdown extends hx.EventEmitter

  constructor: (selector, dropdownContent, options) ->
    super

    hx.component.register(selector, this)

    # XXX [2.0.0]: this should not be part of the public api (but should use setterGetter methods instead)
    # it has been documented so will have to stay here for the 1.x.x series (it should be removed in 2.0.0)
    @options = hx.merge.defined({
      mode: 'click',
      align: 'lblt',
      spacing: Number(hx.theme.dropdown.spacing),
      matchWidth: true,
      ddClass: ''
    }, options)

    setupDropdown = switch
      when hx.isString(dropdownContent)
        (node) -> hx.select(node).html(dropdownContent)
      when hx.isFunction(dropdownContent)
        (node) -> dropdownContent(node)
      else
        hx.consoleWarning('dropdown: dropdownContent is not a valid type. dropdownContent: ', dropdownContent)
        () ->

    clickDetector = new hx.ClickDetector
    clickDetector.on 'click', 'hx.dropdown', => @hide()

    alignQuad = switch @options.align
      when 'up' then 'ltlb'
      when 'down' then 'lblt'
      when 'left' then 'ltrt'
      when 'right' then 'rtlt'
      else @options.align

    alignments = alignQuad.split('')

    onclick = => @toggle()
    onmouseover = => @show()
    onmouseout = => @hide()

    selection = hx.select(selector)

    @_ = {
      setupDropdown: setupDropdown,
      clickDetector: clickDetector,
      alignments: alignments,
      onclick: onclick,
      onmouseover: onmouseover,
      onmouseout: onmouseout,
      visible: false,
      dropdown: undefined,
      selection: selection,
      useScroll: false # XXX: used by autocomplete - this should be part of the public api if it is used by other modules
    }

    if @options.mode is 'click' or @options.mode is 'hover'
      selection.on('click', 'hx.dropdown', onclick)

    if @options.mode is 'hover'
      selection.on('mouseover', 'hx.dropdown', onmouseover)
      selection.on('mouseout', 'hx.dropdown', onmouseout)

  addException: (node) ->
    @_.clickDetector.addException(node)
    this

  removeException: (node) ->
    @_.clickDetector.removeException(node)
    this

  toggle: (cb) ->
    if @isOpen() then @hide(cb) else @show(cb)
    this

  show: (cb) ->
    _ = @_

    if not _.visible
      _.visible = true

      _.dropdown = hx.select(hx._.dropdown.attachToSelector).append('div').attr('class', 'hx-dropdown')

      if @options.ddClass.length > 0
        _.dropdown.classed(@options.ddClass, true)

      _.setupDropdown(_.dropdown.node())
      _.clickDetector.removeAllExceptions()
      _.clickDetector.addException(_.dropdown.node())
      _.clickDetector.addException(_.selection.node())

      _.dropdown.style('display', 'block')

      rect = _.selection.box()
      dropdownRect = _.dropdown.box()
      ddMaxHeight = _.dropdown.style('max-height').replace('px','')
      parentFixed = hx.checkParents(_.selection.node(), checkFixedPos)

      {xPos, yPos, x, y} = calculateDropdownPosition(
        _.alignments,
        { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
        { width: dropdownRect.width, height: dropdownRect.height },
        { scrollX: window.scrollX, scrollY: window.scrollY, innerWidth: window.innerWidth, innerHeight: window.innerHeight }
        @options.spacing,
        ddMaxHeight,
        parentFixed,
        hx.scrollbarSize()
      )

      # Gets the maximum z-index of all the parent elements
      parentZIndex = hx.parentZIndex(_.selection.node(), true)
      if parentZIndex > 0
        _.dropdown.style('z-index', parentZIndex + 1)

      if parentFixed
        _.dropdown.style('position','fixed')

      if @options.matchWidth then _.dropdown.style('min-width', rect.width + 'px')

      _.dropdown
        .style('top', 'auto')
        .style('bottom', 'auto')
        .style('left', 'auto')
        .style('right', 'auto')
        .style(xPos, x + 'px')
        .style(yPos, (y + dropdownAnimateSlideDistance) + 'px')
        .style('height', '0px')
        .style('opacity', 0)
        .morph()
          .with('fadein', 150)
          .and('expandv', 150)
          .and =>
            _.dropdown.animate().style(yPos, y + 'px', 150)
          .then =>
            if _.useScroll and _.dropdown?
              _.dropdown.style('overflow-y','auto')
            @emit('showend')
            cb?()
          .go()


      @emit('showstart')
      @emit('change', true)
    this

  hide: (cb) ->
    _ = @_
    if _.visible
      _.visible = false
      @emit('hidestart') # future proofing for addition of animations
      @emit('change', false)
      @emit('hideend') # future proofing for addition of animations
      cb?()
      _.dropdown.remove()
      _.dropdown = undefined
    this

  isOpen: -> @_.visible

  # to be called when this dropdown is removed from the page, and is no longer going to be referenced
  # it unlikely that you will need to call this, but if using dropdowns in dynamic content, it might be needed
  cleanUp: ->
    _ = @_
    _.clickDetector.cleanUp()

    if @options.mode is 'click' or @options.mode is 'hover'
      _.selection.off(_.onclick)

    if @options.mode is 'hover'
      _.selection.off('mouseover', 'hx.dropdown', _.onmouseover)
      _.selection.off('mouseout', 'hx.dropdown', _.onmouseout)

    this

hx.Dropdown = Dropdown

hx._.dropdown = {
  attachToSelector: 'body'
}