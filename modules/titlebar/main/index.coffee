select = require('modules/selection/main')
utils = require('modules/util/main/utils')

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


class TitleBar
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
        for d in ['hx-positive', 'hx-negative', 'hx-warning', 'hx-info']
          if cls == d then @_.cls = d # Inside loop to confirm that the class being set is real.
          select(@selector).select('.hx-titlebar').classed(d, cls == d)
      this
    else
      @_.cls

  active: (id) ->
    if arguments.length > 0
      selection = select.selectAll('.hx-titlebar-link').classed('hx-selected', false)
      if id?
        @_.active = if utils.isString(id)
          select(id).classed('hx-selected', true)
        else
          select(selection.node(id)).classed('hx-selected', true)
        this
    else
      @_.active

module.exports = {
  TitleBar
}

module.exports.hx = {
  TitleBar
}

# set up the titlebar
if select('.hx-heading').size() > 0 then module.exports.hx.titlebar = new TitleBar('.hx-heading')
