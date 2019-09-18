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

positionDropdown = ({selection, dropdown, useScroll}, {align, matchWidth}) ->
  dropdown.style('display', 'block')

  # extract measurements from the dom
  rect = selection.box()
  dropdownRect = dropdown.box()
  ddMaxHeight = dropdown.style('max-height').replace('px','')
  parentFixed = checkParents(selection.node(), checkFixedPos)
  zIndex = parentZIndex(selection.node(), true)

  # calculate the position of the dropdown
  {x, y, direction} = calculateDropdownPosition(
    dropdown.attr('data-direction') or align,
    { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
    { width: dropdownRect.width, height: dropdownRect.height },
    { width: window.innerWidth, height: window.innerHeight },
    ddMaxHeight,
    scrollbarSize(),
  )

  yPos = 'top'
  if not parentFixed
    x += window.scrollX || window.pageXOffset
    y += window.scrollY || window.pageYOffset

    if direction is 'up'
      yPos = 'bottom'
      y = document.body.clientHeight - y - dropdownRect.height

  # update the styles for the dropdown
  if zIndex > 0
    dropdown.style('z-index', zIndex + 1)

  if parentFixed
    dropdown.style('position', 'fixed')

  if matchWidth
    dropdown.style('min-width', rect.width + 'px')

  if useScroll and dropdown?
    dropdown.style('overflow-y','auto')

  dropdown
    .classed('hx-dropdown-up', direction is 'up')
    .classed('hx-dropdown-down', direction is 'down')
    .classed('hx-dropdown-left', direction is 'left')
    .classed('hx-dropdown-right', direction is 'right')
    .attr('data-direction', direction)
    .style('top', 'auto')
    .style('bottom', undefined)
    .style(yPos, y + 'px')
    .style('left', x + 'px')

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
      (node) -> select(node).html(dropdownContent)
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
      ddClass: '',
    }, options)

    setupDropdown = dropdownContentToSetupDropdown(dropdownContent)

    clickDetector = new ClickDetector
    clickDetector.on 'click', 'hx.dropdown', => @hide()

    onclick = => @toggle()
    onmouseover = => @show()
    onmouseout = => @hide()

    selection = select(selector)
      .api('dropdown', this)
      .api(this)

    @_ = {
      setupDropdown: setupDropdown,
      clickDetector: clickDetector,
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
    if @_.dropdown
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

      position = =>
        positionDropdown(_, @options)

      position();

      if MutationObserver
        contentChangeObserver = new MutationObserver (mutationsList, observer) ->
          position();

        contentChangeObserver.observe(_.dropdown.node(), {
          attributes: false,
          childList: true,
          subtree: true
        })

        _.contentChangeObserver = contentChangeObserver

      @emit('showstart')
      @emit('change', true)
      @emit('showend')
      cb?()
    this

  hide: (cb) ->
    _ = @_
    if _.visible
      _.visible = false
      _.contentChangeObserver?.disconnect()
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
