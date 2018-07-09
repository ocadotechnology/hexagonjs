import { select, detached } from 'utils/selection'
import { palette } from 'utils/palette'
import { EventEmitter } from 'utils/event-emitter'
import { merge } from 'utils/utils'
import logger from 'utils/logger'

onTabSelected = (tabs, sel, idx, cause) ->
  tabs.selected = idx
  tabs.selection.selectAll('.hx-tab').classed('hx-tab-active', false)
  sel.classed('hx-tab-active', true)

  context = palette.context(sel)
  tabsContent = tabs.selection.select('.hx-tabs-content')
  palette.borderContext(tabsContent, context)

  tabs.selection.selectAll('.hx-tab-content')
    .classed('hx-tab-content-hidden', true)
  item = tabs.items()[idx]
  if item?
    tabsContent.clear()
    tabs._.options.contentRenderer tabsContent.node(), item.content
  else
    tabToSelectSelector = '#' + sel.attr('data-content')
    tabToSelect = tabs.selection.select(tabToSelectSelector)
    tabToSelect.classed('hx-tab-content-hidden', false)
  tabs.emit('change', {id: idx, value: idx, cause})

class Tabs extends EventEmitter
  constructor: (@selector, opts) ->
    super()

    defaultRenderer = (node, value) -> select(node).text(value)

    options = merge({
      items: [],
      titleRenderer: defaultRenderer,
      contentRenderer: defaultRenderer,
    }, opts)

    @_ = {}

    @_.options = options

    # XXX: Renamed for consistency - realised we now have selector,
    # selection, select and selected as properties of hx.Tabs
    # Need to standardise naming here?
    @selection = select(@selector)
      .classed('hx-tabs', true)
      .api(this)

    titleRenderer = options.titleRenderer

    tabsContent = @selection.select '.hx-tabs-content'

    if tabsContent.empty()
      tabsContent = @selection.append 'div'
        .class 'hx-tabs-content'

    # XXX: Should this be `selectedTab`
    @selected = -1

    self = this
    # register callbacks for when the tabs are clicked
    if options.items.length
      @items options.items
    else
      @selection.selectAll('.hx-tab').forEach (sel, idx) ->
        sel.on 'click', 'hx.tabs', ->
          onTabSelected self, sel, idx, 'user'

    # make the first tab active
    @select(0)

  items: (newItems) ->
    if arguments.length
      if newItems.length is 0
        logger.warn 'hx.Tabs::items', 'Setting items to empty array'
      else
        tabsContent = @selection.select '.hx-tabs-content'

        @selection.selectAll('.hx-tab').remove()
        tabsContent.clear()

        titleBarsToAdd = newItems.map ({ title, context, content }, idx) =>
          tab = detached 'div'
            .class 'hx-tab'
          @_.options.titleRenderer tab.node(), title
          palette.context tab.node(), context
          tab.on 'click', 'hx.tabs', =>
            onTabSelected this, tab, idx, 'user'
          tab
        tabsContent.insertBefore titleBarsToAdd

        @select 0, true

      @_.options.items = newItems

      this

    else
      @_.options.items

  value: (newValue) ->
    if arguments.length
      @select(newValue, false)
    else
      @selected

  select: (idx, force) ->
    if @selected != idx or force
      tab = select(@selection.selectAll('.hx-tab').node(idx))
      onTabSelected(this, tab, idx, 'api')

tabs = (opts) ->
  selection = detached 'div'
  new Tabs(selection, opts)
  selection

export {
  tabs,
  Tabs,
}
