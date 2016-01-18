### istanbul ignore next: ignore coffeescript's extend function ###

getWindowMeasurement = (horizontal, scroll) ->
  if horizontal
    if scroll then window.scrollX
    else window.innerWidth
  else
    if scroll then window.scrollY
    else window.innerHeight

checkFixedPos = (node) ->
  elem = hx.select(node)
  if elem.size() > 0 and elem.style('position') is 'fixed' then true

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
        (node) => hx.select(node).html(dropdownContent)
      when hx.isFunction(dropdownContent)
        (node) => dropdownContent(node)
      else
        console.error('dropdown: dropdownContent is not a valid type ' +selector)
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
        _.dropdown.classed @options.ddClass, true

      _.setupDropdown(_.dropdown.node())
      _.clickDetector.removeAllExceptions()
      _.clickDetector.addException(_.dropdown.node())
      _.clickDetector.addException(_.selection.node())

      # Gets the maximum z-index of all the parent elements
      parentZIndex = hx.parentZIndex(_.selection.node(), true)

      if parentZIndex > 0
        _.dropdown.style('z-index', parentZIndex + 1)

      rect = _.selection.box()
      _.dropdown.style('display', 'block')
      if @options.matchWidth then _.dropdown.style('min-width', rect.width + 'px')
      dropdownRect = _.dropdown.box()
      ddMaxHeight = _.dropdown.style('max-height').replace('px','')

      horizontalPos = rect.left
      verticalPos = rect.top

      if _.alignments[0] is 'r' then horizontalPos = rect.right
      if _.alignments[1] is 'b' then verticalPos = rect.bottom
      if _.alignments[2] is 'r' then horizontalPos -= dropdownRect.width
      if _.alignments[3] is 'b' then verticalPos -= dropdownRect.height

      if _.alignments[0] isnt _.alignments[2]
        switch _.alignments[2]
          when 'l' then horizontalPos += @options.spacing
          when 'r' then horizontalPos -= @options.spacing

      if _.alignments[1] isnt _.alignments[3]
        switch _.alignments[3]
          when 't' then verticalPos += @options.spacing
          when 'b'
            invertY = true
            verticalPos -= @options.spacing

      scrollbarWidth = hx.scrollbarSize()

      # these checks move the dropdown when it flows outside the window boundaries
      if horizontalPos < 0 then horizontalPos = 0
      if (horizontalWindow = (horizontalPos + dropdownRect.width - getWindowMeasurement(true) + scrollbarWidth)) > 0
        horizontalPos -= horizontalWindow

      if verticalPos < 0 then verticalPos = 0

      ddHeight = if not isNaN(ddMaxHeight)
        Math.min(ddMaxHeight, dropdownRect.height)
      else
        dropdownRect.height

      if (verticalWindow = (verticalPos + ddHeight - getWindowMeasurement() )) > 0
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

      horizontalOverlap = checkOverlap(horizontalPos, (horizontalPos + dropdownRect.width), rect.left, (rect.left + rect.width))
      verticalOverlap = checkOverlap(verticalPos, (verticalPos + dropdownRect.height), rect.top, (rect.top + rect.height))

      # if both are greater than 0 then dd overlaps selection
      if horizontalOverlap > 0 and verticalOverlap > 0
        # dropdown overlaps at the top of the selection so should be moved down
        if verticalOverlap > 1 and not movedVertical
          invertY = false
          verticalPos = rect.top + rect.height + @options.spacing
        else
          invertY = true
          verticalPos = rect.top - dropdownRect.height - @options.spacing

          # check if dropdown goes off the screen after being moved up
          if verticalPos < 0
            invertY = false
            verticalPos = rect.top + rect.height + @options.spacing

      parentFixed = hx.checkParents(_.selection.node(), checkFixedPos)
      if parentFixed
        _.dropdown.style('position','fixed')
      else
        verticalPos += getWindowMeasurement(false, true)
        horizontalPos += getWindowMeasurement(true, true)

      yPos = 'top'

      # switches the dropdown position so it scales from the bottom instead of the top
      if invertY
        yPos = 'bottom'
        bodyDiff = document.body.scrollHeight - document.body.clientHeight
        verticalPos = document.body.scrollHeight - verticalPos - bodyDiff - dropdownRect.height

      _.dropdown.style('top', 'auto')
        .style(yPos, verticalPos + 'px')
        .style('left', horizontalPos + 'px')
        .style('width', dropdownRect.width + 'px')

      _.dropdown
        .style('height', '0px')
        .style(yPos, (verticalPos + 8) + 'px')
        .style('opacity', 0)
        .morph()
          .with('fadein', 150)
          .and('expandv', 150)
          .and =>
            _.dropdown.animate().style(yPos, verticalPos + 'px', 150)
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
      @emit('hidestart') # future proofing for adition of animations
      @emit('change', false)
      @emit('hideend') # future proofing for adition of animations
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