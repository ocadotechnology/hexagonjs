import { EventEmitter } from 'utils/event-emitter'
import { mergeDefined } from 'utils/utils'
import { select } from 'utils/selection'

class SideCollapsible extends EventEmitter
  constructor: (selector, options) ->
    super()

    @options = mergeDefined {
      position: 'left'
      animate: true
      visible: false
      rotateHeading: true
    }, options

    @selection = select(selector)
      .classed('hx-side-collapsible', true)
      .api(this)

    @openHeading = @selection.select('.hx-side-collapsible-heading-open')
      .classed('hx-side-collapsible-heading', true)

    @closedHeading = @selection.select('.hx-side-collapsible-heading-closed')
      .classed('hx-side-collapsible-heading', true)
      .classed('hx-side-collapsible-heading-' + @options.position, true)
      .classed('hx-side-collapsible-heading-no-rotate', not @options.rotateHeading)

    @content = @selection.select('.hx-side-collapsible-content')

    padding = Number(@closedHeading.style('padding').replace('px',''))

    whichSize = if @options.rotateHeading then 'height' else 'width'
    whichOpp = if @options.rotateHeading then 'width' else 'height'

    @closedSize = Number(@closedHeading.style(whichSize).replace('px', '')) + 2 + 2 * padding
    @selection.style('min-height', @closedSize + 'px')
    @closedHeading.style('min-' + whichOpp, Math.ceil(@selection.style('height').replace('px','') - 2 * padding) + 'px')

    if (closedToggle = @closedHeading.select('.hx-side-collapsible-toggle')).empty()
      @closedHeading.on 'click', 'hx.side-collapsible', => @show()
    else
      @closedHeading.classed('hx-side-collapsible-heading-no-hover', true)
      closedToggle.on 'click', 'hx.side-collapsible', => @show()

    if (openToggle = @openHeading.select('.hx-side-collapsible-toggle')).empty()
      @openHeading.on 'click', 'hx.side-collapsible', => @hide()
    else
      @openHeading.classed('hx-side-collapsible-heading-no-hover', true)
      openToggle.on 'click', 'hx.side-collapsible', => @hide()

    @visible = not @options.visible
    if @options.visible then @show(false) else @hide(false)


  show: (animate, cb) ->
    animate = if animate? then animate
    else @options.animate

    if not @visible
      @visible = true

      if animate
        @selection.style('width', @closedSize + 'px')
        @openHeading.style('width', @closedSize + 'px')
        @content.style('width', @closedSize + 'px')

        @openHeading.style('opacity', 0)
          .style('display', 'block')

        @content.style('opacity', 0)
          .style('display', 'block')

        morph = =>
          @closedHeading.style('display', 'none')
          @selection.style('width', '')
          @content.morph()
            .with('expandh', 100)
            .and('fadein', 100)
            .and( =>
              @openHeading.morph()
                .with('expandh', 100)
                .and('fadein', 100)
                .go(true)
            ).go(true)
          @emit 'showend'
          cb?()

        @closedHeading.morph()
          .with('fadeout', 100)
          .then(morph).go(true)
      else
        @selection.style('width', '')
        @closedHeading.style('display', 'none')
        @openHeading.style('display', 'block')
        @content.style('display', 'block')
        @emit 'showend'

    @emit 'showstart'
    @emit 'change', true
    this


  hide: (animate, cb) ->
    animate = if animate? then animate
    else @options.animate

    if @visible
      @visible = false

      if animate
        self = this
        @closedHeading.style('opacity', 0)
          .style('display', 'block')
        @content.morph()
          .with('collapseh', 100)
          .and('fadeout', 100)
          .and(=>
            @openHeading.morph()
              .with('collapseh', 100)
              .and('fadeout', 100)
              .go(true)
          ).then( =>
            @selection.style('width',@closedSize + 'px')
            @openHeading.style('width',@closedSize + 'px')
            @content.style('width',@closedSize + 'px')
            @closedHeading.morph()
              .with('fadein', 100)
              .go(true)
            @emit('hideend')
            cb?()
          ).go(true)

      else
        @selection.style('width', @closedSize + 'px')
        @closedHeading.style('display', 'block')
        @openHeading.style('display', 'none')
        @content.style('display', 'none')
        @emit 'hideend'

    @emit 'hidestart'
    @emit 'change', false
    this

  toggle: (animate) ->
    animate = if animate? then animate
    else @options.animate
    if @visible then @show(animate) else @hide(animate)
    this

export {
  SideCollapsible
}
