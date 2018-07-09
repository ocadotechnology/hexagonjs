import { EventEmitter } from 'event-emitter'
import { mergeDefined } from 'utils'
import { select, i } from 'selection'

export class Sidebar extends EventEmitter
  constructor: (selector, opts) ->
    super()

    options = mergeDefined({
      autoAddSidebarClass: true
    }, opts)

    options.headerSelector = opts.headerSelector || '.hx-titlebar'
    options.contentSelector = opts.contentSelector || '.hx-content'

    @selection = select(selector)
      .api('sidebar', this)
      .api(this)

    opened = select('body').width() > 320 + 240
    @selection
      .classed('hx-sidebar', true)
      .classed('hx-openable', true)
      .classed('hx-opened', opened)

    select('body')
      .classed('hx-sidebar-opened', opened)
      .node().offsetHeight # force a reflow

    if options.autoAddSidebarClass
      select('body').classed('hx-sidebar-page', true)

    @selection.classed('hx-animate', true)
    select(options.contentSelector).classed('hx-animate', true)

    btn = select(options.headerSelector)
      .prepend('button')
        .attr('type', 'button')
        .class('hx-titlebar-sidebar-button')
        .add(i('hx-icon hx-icon-bars'))
      .on 'click', 'hx.sidebar', => @toggle()

  toggle: ->
    if @selection.classed('hx-opened') then @hide() else @show()
    this

  hide: ->
    @selection.classed('hx-opened', false)
    select('body').classed('hx-sidebar-opened', false)
    @emit 'hide'
    this

  show: ->
    @selection.classed('hx-opened', true)
    select('body').classed('hx-sidebar-opened', true)
    @emit 'show'
    this
