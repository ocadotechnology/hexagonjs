class Sidebar extends hx.EventEmitter
  constructor: (selector, options) ->
    super()
    hx.component.register(selector, this)

    options = hx.merge.defined {
      headerSelector: '.hx-titlebar-header'
      contentSelector: '.hx-content'
      autoAddSidebarClass: true
    }, options

    @selection = hx.select(selector)
    opened = hx.select('body').width() > 320 + 240
    @selection
      .classed('hx-sidebar', true)
      .classed('hx-openable', true)
      .classed('hx-opened', opened)

    hx.select('body')
      .classed('hx-sidebar-opened', opened)
      .node().offsetHeight # force a reflow

    if options.autoAddSidebarClass
      hx.select('body').classed('hx-sidebar-page', true)

    @selection.classed('hx-animate', true)
    hx.select(options.contentSelector).classed('hx-animate', true)

    btn = hx.select(options.headerSelector).prepend('button')
      .attr('type', 'button')
      .class('hx-titlebar-sidebar-button')
      .html('<i class="hx-icon hx-icon-bars"></i>')
    btn.on 'click', 'hx.sidebar', => @toggle()

  toggle: ->
    if @selection.classed('hx-opened') then @hide() else @show()
    this

  hide: ->
    @selection.classed('hx-opened', false)
    hx.select('body').classed('hx-sidebar-opened', false)
    @emit 'hide'
    this

  show: ->
    @selection.classed('hx-opened', true)
    hx.select('body').classed('hx-sidebar-opened', true)
    @emit 'show'
    this

hx.Sidebar = Sidebar