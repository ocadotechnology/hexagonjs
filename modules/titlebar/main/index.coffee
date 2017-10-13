setVisibility = (show, animate=true) ->
  if not @isMobileFriendly then return
  if show is @visible then return

  @visible = show

  animateTitlebar = (elem) ->
    if show
      elem.classed('hx-titlebar-mobile-hide', false)
      if animate
        elem.style('height', '0px')
          .morph().with('expandv', 150).go()
    else
      if animate
        elem.morph().with('collapsev', 50)
          .then(-> elem.classed('hx-titlebar-mobile-hide', true))
          .thenStyle('display', '')
          .go()
      else
        elem.classed('hx-titlebar-mobile-hide', true)

  animateTitlebar(hx.select(@selector).selectAll('.hx-titlebar-menu-icons'))
  animateTitlebar(hx.select(@selector).selectAll('.hx-titlebar-linkbar'))


isElement = (obj) -> !!(obj and obj.nodeType is 1)

isSelection = (obj) -> obj instanceof hx.Selection

class TitleBar
  constructor: (@selector) ->
    hx.component.register(@selector, this)

    @_ = {}

    @isMobileFriendly = hx.select(@selector).select('.hx-titlebar-menu-icon-mobile').size() > 0
    hasLinkBar = hx.select(@selector).select('.hx-titlebar-linkbar').selectAll('.hx-titlebar-link').size() > 0
    isFixed = hx.select('body').classed('hx-heading-fixed')
    isFullScreen = hx.select('body').classed('hx-full-screen')

    if @isMobileFriendly
      hx.select(@selector).select('.hx-titlebar-menu-icon-mobile')
        .on 'click', 'hx.titlebar', => setVisibility.call(this, not @visible, true)
      @visible = true
      setVisibility.call(this, false, false)

    if hasLinkBar and (isFixed or isFullScreen)
      hx.select('body').classed('hx-titlebar-link-padding', true)

  show: (animate) ->
    setVisibility.call(this, true, animate)

  hide: (animate) ->
    setVisibility.call(this, false, animate)

  contextClass: (cls) ->
    if arguments.length > 0
      if cls?
        @_.cls = undefined
        for d in ['hx-action', 'hx-positive', 'hx-negative', 'hx-warning', 'hx-info']
          if cls == d then @_.cls = d # Inside loop to confirm that the class being set is real.
          hx.select(@selector).select('.hx-titlebar').classed(d, cls == d)
      this
    else
      @_.cls

  active: (id) ->
    if arguments.length > 0
      selection = hx.selectAll('.hx-titlebar-link').classed('hx-selected', false)
      if id?
        @_.active = if hx.isString(id)
          hx.select(id).classed('hx-selected', true)
        else if hx.isNumber(id)
          hx.select(selection.node(id)).classed('hx-selected', true)
        else if isElement(id) or isSelection(id)
          hx.select(id).classed('hx-selected', true)
        this
    else
      @_.active


hx.TitleBar = TitleBar

hx.titleBar = (options = {}) ->
  {
    title = 'Title',
    subtitle = '',
    showIcon = true,
    iconLink = '#',
    iconClass = 'hx-logo'
  } = options

  icon = if showIcon
    hx.detached('a')
      .class('hx-titlebar-icon')
      .attr('href', iconLink)
      .add(hx.detached('img').class(iconClass))

  selection = hx.div('hx-heading')
    .add(hx.div('hx-titlebar')
      .add(hx.div('hx-titlebar-container')
        .add(hx.div('hx-titlebar-header')
          .add(icon)
          .add(if title then hx.div('hx-titlebar-title').text(title))
          .add(if subtitle then hx.div('hx-titlebar-subtitle').text(subtitle)))))

  new hx.TitleBar(selection)

  return selection

# set up the titlebar
if hx.select('.hx-heading').size() > 0 then hx.titlebar = new hx.TitleBar('.hx-heading')
