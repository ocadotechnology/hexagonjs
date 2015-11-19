class Sidebar extends hx.EventEmitter
  constructor: (container, pos = 'l', togglePos, populate) ->
    super
    @visible = false
    @selection = container.append('div').class('hx-drawing-sidebar hx-drawing-sidebar-' + pos)

    switch pos
      when 't', 'b'
        @selection.style('height', '0px')
        @expandEvt = 'expandv'
        @collapseEvt = 'collapsev'
      else
        @selection.style('width', '0px')
        @expandEvt = 'expandh'
        @collapseEvt = 'collapseh'

    if togglePos
      togglePos.split('')
      @toggleBtn = container.append('div')
        .class('hx-btn hx-drawing-sidebar-toggle')
        .classed('hx-drawing-sidebar-toggle-' + togglePos[0], true)
        .classed('hx-drawing-sidebar-toggle-' + togglePos[1], true)
        .on 'click', =>
          @toggle()

        .append('i').class('hx-icon hx-icon-bars')

    populate?(@selection.node())

  toggle: ->
    if @visible
      @hide()
    else
      @show()

  show: ->
    if not @visible
      @visible = true
      @selection.morph()
        .with(@expandEvt, 100)
        .and('fadein', 100)
        .go(true)
    this

  hide: ->
    if @visible
      @visible = false
      @selection.morph()
        .with('fadeout', 100)
        .and(@collapseEvt, 100)
        .go(true)
    this