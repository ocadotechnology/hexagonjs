
select = require('modules/selection/main')
utils = require('modules/util/main')
component = require('modules/component/main')
ClickDetector = require('modules/click-detector/main')
EventEmitter = require('modules/event-emitter/main')
calculateDropdownPosition = require('./positioning')

# #XXX [modules]: how should this work with modules?
# hx.theme = hx.theme || {}
# hx.theme.dropdown = {
#   spacing: 8
# }

config = {
  attachToSelector: 'body',
  dropdownAnimateSlideDistance: 8
}

checkFixedPos = (node) ->
  if select(node).style('position') is 'fixed' then true

class Dropdown extends EventEmitter

  constructor: (selector, dropdownContent, options) ->
    super

    component.register(selector, this)

    # XXX [2.0.0]: this should not be part of the public api (but should use setterGetter methods instead)
    # it has been documented so will have to stay here for the 1.x.x series (it should be removed in 2.0.0)
    @options = utils.merge.defined({
      mode: 'click',
      align: 'lblt',
      spacing: undefined,
      matchWidth: true,
      ddClass: ''
    }, options)

    setupDropdown = switch
      when utils.isString(dropdownContent)
        (node) -> select(node).html(dropdownContent)
      when utils.isFunction(dropdownContent)
        (node) -> dropdownContent(node)
      else
        utils.consoleWarning('dropdown: dropdownContent is not a valid type. dropdownContent: ', dropdownContent)
        () ->

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

      _.dropdown = select(config.attachToSelector).append('div').attr('class', 'hx-dropdown')

      if @options.ddClass.length > 0
        _.dropdown.classed(@options.ddClass, true)

      _.setupDropdown(_.dropdown.node())
      _.clickDetector.removeAllExceptions()
      _.clickDetector.addException(_.dropdown.node())
      _.clickDetector.addException(_.selection.node())

      _.dropdown.style('display', 'block')

      # extract measurements from the dom
      rect = _.selection.box()
      dropdownRect = _.dropdown.box()
      ddMaxHeight = _.dropdown.style('max-height').replace('px','')
      parentFixed = utils.checkParents(_.selection.node(), checkFixedPos)
      parentZIndex = utils.parentZIndex(_.selection.node(), true)

      # calculate the position of the dropdown
      {x, y} = calculateDropdownPosition(
        _.alignments,
        { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
        { width: dropdownRect.width, height: dropdownRect.height },
        { width: window.innerWidth, height: window.innerHeight },
        ddMaxHeight,
        utils.scrollbarSize()
      )

      if not parentFixed
        x += window.scrollX
        y += window.scrollY

      # update the styles for the dropdown
      if parentZIndex > 0
        _.dropdown.style('z-index', parentZIndex + 1)

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
          .and =>
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

module.exports = Dropdown
module.exports.config = config
module.exports.hx = {
  Dropdown: Dropdown
}
