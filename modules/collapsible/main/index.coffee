EventEmitter = require('modules/event-emitter/main')
utils = require('modules/util/main/utils')
component = require('modules/component/main')
select = require('modules/selection/main')

class Collapsible extends EventEmitter

  constructor: (selector, options) ->
    super

    @options = utils.merge.defined({
      lazyContent: undefined
      visible: false
      addIcon: true
      animate: true
    }, options)

    component.register(selector, this)

    @lazyContentCreated = false

    @selection = select(selector)
      .classed('hx-openable', true)
      .classed('hx-collapsible', true)

    header = @selection.select('.hx-collapsible-heading')
    if not (toggleBtn = header.select('.hx-collapsible-toggle')).empty()
      header.classed('hx-collapsible-heading-no-hover', true)
      toggleBtn.on('click', 'hx.collapsible', => @toggle())
    else
      header.on('click', 'hx.collapsible', => @toggle())

    content = @selection.select('.hx-collapsible-content').style('height', 0).style('opacity', 0)

    if @options.addIcon
      if toggleBtn.empty()
        header.select('i').remove()
        header.prepend('i').class('hx-icon hx-icon-chevron-right hx-collapsible-icon')
      else
        toggleBtn.select('i').remove()
        toggleBtn.prepend('i').class('hx-icon hx-icon-chevron-right hx-collapsible-icon')

    @visible = undefined
    if @options.visible then @show(false) else @hide(false)

  toggle: (animate, cb) ->
    animate = if animate? then animate
    else @options.animate
    if @isOpen() then @hide(animate, cb) else @show(animate, cb)

  show: (animate, cb) ->
    animate = if animate? then animate
    else @options.animate
    if not @lazyContentCreated
      @lazyContentCreated = true
      if @options.lazyContent then @options.lazyContent(@selection.select('.hx-collapsible-content').node())

    if @visible isnt true
      # update the styles
      @selection.classed('hx-collapsible-expanded', true)
        .classed('hx-opened', true)

      content = @selection.select('.hx-collapsible-content')

      if animate
        self = this
        content.morph()
          .with('expandv', 100)
          .and('fadein', 100)
          .then( ->
            self.emit('showend')
            cb?()
          )
          .go(true)

        @selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph()
          .with('rotate-90', 200)
          .go(true)

      else
        content
          .style('display', '')
          .style('height', '')
          .style('opacity', '')

        @emit('showend')

      # update the state + emit events
      @visible = true
      @emit('showstart')
      @emit('change', true)
    this

  hide: (animate, cb) ->
    animate = if animate? then animate
    else @options.animate

    if @visible isnt false
      # update the styles
      @selection.classed('hx-collapsible-expanded', false)
        .classed('hx-opened',false)

      if animate
        self = this
        @selection.select('.hx-collapsible-content').morph()
          .with('fadeout', 100)
          .and('collapsev', 100)
          .then( ->
            self.emit('hideend')
            cb?()
          )
          .go(true)

        @selection.select('.hx-collapsible-heading').select('.hx-collapsible-icon').morph()
          .with('rotate-0', 200)
          .go(true)
      else
        @selection.select('.hx-collapsible-content')
          .style('display', 'none')
        @emit('hideend')


      # update the state + emit events
      @visible = false
      @emit('hidestart')
      @emit('change', false)
    this

  isOpen: -> @visible


# initialise all collapsibles that match the css selector, and return the result as an array of Collapsibles
initializeCollapsibles = (selector, options) ->
  select.selectAll(selector).nodes.map((d) -> new Collapsible(d, options))


module.exports = Collapsible
module.exports.initializeCollapsibles = initializeCollapsibles

module.exports.hx = {
  Collapsible: Collapsible,
  initializeCollapsibles: initializeCollapsibles
}
