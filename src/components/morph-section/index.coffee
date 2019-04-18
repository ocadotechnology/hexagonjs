import { EventEmitter } from 'utils/event-emitter'
import { ClickDetector } from 'utils/click-detector'
import { select } from 'utils/selection'

import { mergeDefined } from 'utils/utils'

export class MorphSection extends EventEmitter
  constructor: (@selector, options) ->
    super()

    @options = mergeDefined {
      animate: true
    }, options

    @expanded = false

    selection = select(@selector)
      .classed('hx-openable', true)
      .classed('hx-morph-section', true)
      .api('morph-section', this)
      .api(this)

    selection.select('.hx-morph-toggle').on 'click', 'hx.morph-section', => @toggle()
    selection.select('.hx-morph-content').style('display', 'none')

  # sets the visibility of the (usually) hidden content
  visible: (show) ->
    if show is undefined
      return @expanded
    else
      selection = select(@selector)
        .classed('hx-opened', show)
      toggle = selection.select('.hx-morph-toggle')
      content = selection.select('.hx-morph-content')

      if @options.animate
        content.morph()
          .cancelOngoing()
          .with((if show then 'expand' else 'fadeout'), 100)
          .and((if show then 'fadein' else 'collapse'), 100)
          .go()
      else
        content.style('display', if show then '' else 'none')

      @expanded = show
      @emit (if show then 'show' else 'hide'), {toggle: toggle.node(), content: content.node()}
      return

  toggle: -> @visible(not @expanded)

  show: -> @visible(true)

  hide: -> @visible(false)

export class InlineMorphSection extends MorphSection
  constructor: (selector, enterEditMode, exitEditMode, options) ->
    # MorphSection registers the component

    options = mergeDefined({animate: false}, options)

    super(selector, options)

    morphSection = this
    @on 'show', 'hx.morph-section', (data) ->
      morphSection.detector = new ClickDetector(data.content)
      enterEditMode.call(morphSection, data.toggle, data.content)
      select(data.toggle).style('display', 'none')
      morphSection.detector.addException(data.content)
      morphSection.detector.on 'click', 'hx.morph-section', ->
        morphSection.detector.cleanUp()
        morphSection.detector = undefined
        morphSection.hide()
    @on 'hide', 'hx.morph-section', (data) ->
      exitEditMode?.call(morphSection, data.toggle, data.content)
      select(data.toggle).style('display', '')
