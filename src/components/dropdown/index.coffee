import logger from 'utils/logger'
import { select, isSelection }  from 'utils/selection'
import { isString, isFunction, mergeDefined, shallowMerge } from 'utils/utils'
import { ClickDetector } from 'utils/click-detector'
import { EventEmitter } from 'utils/event-emitter'
import { checkParents, parentZIndex, scrollbarSize } from 'utils/dom-utils'

import { calculateDropdownPosition } from './positioning'

export config = {
  attachToSelector: 'body',
  dropdownAnimateSlideDistance: 8
}

checkFixedPos = (node) ->
  if select(node).style('position') is 'fixed' then true

  # flip from downwards to upwards (if needed and there is the space to)
  if direction is 'down' and y > windowRect.height - dropdownRect.height and selectionRect.y - dropdownRect.height > 0
    direction = 'up'
    y = selectionRect.y - dropdownRect.height
    if alignments[1] is alignments[3]
      y += selectionRect.height

  # flip from upwards to downwards (if needed and there is the space to)
  else if direction is 'up' and y < 0 and selectionRect.y + selectionRect.height +  dropdownRect.height < windowRect.height
    direction = 'down'
    y = selectionRect.y + selectionRect.height
    if alignments[1] is alignments[3]
      y -= selectionRect.height

  # flip from right to left (if needed and there is the space to)
  else if direction is 'right' and x > windowRect.width - dropdownRect.width and selectionRect.x - dropdownRect.width > 0
    direction = 'left'
    x = selectionRect.x - dropdownRect.width

  # flip from upwards to downwards (if needed and there is the space to)
  else if direction is 'left' and x < 0 and selectionRect.x + selectionRect.width +  dropdownRect.width < windowRect.width
    direction = 'right'
    x = selectionRect.x + selectionRect.width

  return {
    x: x,
    y: y,
    direction: direction
  }

dropdownContentToSetupDropdown = (dropdownContent) ->
  # XXX Breaking: Renderer
  # Needs updating to new renderer pattern
  return switch
    when isSelection(dropdownContent)
      (node) -> select(node).set(dropdownContent)
    # XXX Breaking: html -> text
    # when isString(dropdownContent)
    #   (node) -> select(node).text(dropdownContent)
    when isString(dropdownContent)
      (node) -> select(node).text(dropdownContent)
    # XXX Breaking: Renderer
    # when isFunction(dropdownContent)
    #   (node) -> select(node).set(dropdownContent())
    when isFunction(dropdownContent)
      (node) -> dropdownContent(node)
    else
      logger.warn('dropdown: dropdownContent is not a valid type. dropdownContent: ', dropdownContent)
      -> undefined


export class Dropdown extends EventEmitter

  constructor: (selector, dropdownContent, options) ->
    super()

    # XXX [2.0.0]: this should not be part of the public api (but should use setterGetter methods instead)
    # it has been documented so will have to stay here for the 1.x.x series (it should be removed in 2.0.0)
    @options = mergeDefined({
      mode: 'click',
      align: 'lblt',
      matchWidth: true,
      ddClass: ''
    }, options)

    setupDropdown = dropdownContentToSetupDropdown(dropdownContent)

    clickDetector = new ClickDetector
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

    selection = select(selector)
      .api('dropdown', this)
      .api(this)

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

  dropdownContent: (dropdownContent) ->
    if arguments.length
      setupDropdown = dropdownContentToSetupDropdown(dropdownContent)
      @_ = shallowMerge(@_, {
        setupDropdown,
        dropdownContent
      })
      @render()
      this
    else
      @_.dropdownContent

  addException: (node) ->
    @_.clickDetector.addException(node)
    this

  removeException: (node) ->
    @_.clickDetector.removeException(node)
    this

  toggle: (cb) ->
    if @isOpen() then @hide(cb) else @show(cb)
    this

  render: ->
    @_.setupDropdown(@_.dropdown.node())
    @emit('render')
    this

  show: (cb) ->
    _ = @_

    if _.visible
      @render()
      cb?()
    else
      _.visible = true

      _.dropdown = select(config.attachToSelector).append('div').attr('class', 'hx-dropdown')

      if @options.ddClass.length > 0
        _.dropdown.classed(@options.ddClass, true)

      @render()
      _.clickDetector.removeAllExceptions()
      _.clickDetector.addException(_.dropdown.node())
      _.clickDetector.addException(_.selection.node())

      _.dropdown.style('display', 'block')

      # extract measurements from the dom
      rect = _.selection.box()
      dropdownRect = _.dropdown.box()
      ddMaxHeight = _.dropdown.style('max-height').replace('px','')
      parentFixed = checkParents(_.selection.node(), checkFixedPos)
      zIndex = parentZIndex(_.selection.node(), true)

      # calculate the position of the dropdown
      {x, y} = calculateDropdownPosition(
        _.alignments,
        { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
        { width: dropdownRect.width, height: dropdownRect.height },
        { width: window.innerWidth, height: window.innerHeight },
        ddMaxHeight,
        scrollbarSize()
      )

      if not parentFixed
        x += window.scrollX || window.pageXOffset
        y += window.scrollY || window.pageYOffset

      # update the styles for the dropdown
      if zIndex > 0
        _.dropdown.style('z-index', zIndex + 1)

      if parentFixed
        _.dropdown.style('position', 'fixed')

      if @options.matchWidth
        _.dropdown.style('min-width', rect.width + 'px')

      _.dropdown
        .style('left', x + 'px')
        .style('top', (y + config.dropdownAnimateSlideDistance) + 'px')
        .style('height', '0px')
        .style('opacity', 0)
        .style('margin-top', @options.dropdown)
        .morph()
          .with('fadein', 150)
          .and('expandv', 150)
          .and ->
            _.dropdown.animate().style('top', y + 'px', 150)
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
