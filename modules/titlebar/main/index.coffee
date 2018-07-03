import { select, selectAll, detached, div, isSelection } from 'selection/main'
import { isString } from 'utils/main'
import { isElement } from 'dom-utils/main'

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

  animateTitlebar(select(@selector).selectAll('.hx-titlebar-menu-icons'))
  animateTitlebar(select(@selector).selectAll('.hx-titlebar-linkbar'))


export class TitleBar
  constructor: (@selector) ->
    @_ = {}

    selection = select(@selector).api(this)

    @isMobileFriendly = selection.select('.hx-titlebar-menu-icon-mobile').size() > 0
    hasLinkBar = selection.select('.hx-titlebar-linkbar').selectAll('.hx-titlebar-link').size() > 0
    isFixed = select('body').classed('hx-heading-fixed')
    isFullScreen = select('body').classed('hx-full-screen')

    if @isMobileFriendly
      selection.select('.hx-titlebar-menu-icon-mobile')
        .on 'click', 'hx.titlebar', => setVisibility.call(this, not @visible, true)
      @visible = true
      setVisibility.call(this, false, false)

    if hasLinkBar and (isFixed or isFullScreen)
      select('body').classed('hx-titlebar-link-padding', true)

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
          select(@selector).select('.hx-titlebar').classed(d, cls == d)
      this
    else
      @_.cls

  active: (id) ->
    if arguments.length > 0
      selection = selectAll('.hx-titlebar-link').classed('hx-selected', false)
      if id?
        @_.active = if isString(id) or isElement(id) or isSelection(id)
          select(id).classed('hx-selected', true)
        else
          node = selection.node(id)
          if node?
            select(node).classed('hx-selected', true)
        this
    else
      @_.active


export initTitleBar = () ->
  # set up the titlebar
  if select('.hx-heading').size() > 0
    titlebar = new TitleBar('.hx-heading')
    # backwards compatibility
    if window.hx
      window.hx.titlebar = titlebar
    return titlebar


export titleBar = (options = {}) ->
  {
    title = 'Title',
    subtitle = '',
    showIcon = true,
    iconLink = '#',
    iconClass = 'hx-logo'
  } = options

  icon = if showIcon
    detached('a')
      .class('hx-titlebar-icon')
      .attr('href', iconLink)
      .add(detached('img').class(iconClass))

  selection = div('hx-heading')
    .add(div('hx-titlebar')
      .add(div('hx-titlebar-container')
        .add(div('hx-titlebar-header')
          .add(icon)
          .add(if title then div('hx-titlebar-title').text(title))
          .add(if subtitle then div('hx-titlebar-subtitle').text(subtitle)))))

  new TitleBar(selection)

  return selection

# set up the titlebar
if select('.hx-heading').size() > 0 then titlebar = new TitleBar('.hx-heading')
