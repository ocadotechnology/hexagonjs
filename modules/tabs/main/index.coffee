onTabSelected = (tabs, element, i) ->
  tabs.selected = i
  selection = hx.select(tabs.selector)
  selection.selectAll('.hx-tab').classed('hx-tab-active', false)
  hx.select(element).classed('hx-tab-active', true)

  context = hx.palette.context(element)
  tabsContent = selection.select('.hx-tabs-content')
  hx.palette.borderContext(tabsContent, context)

  rootSelection = hx.select(tabs.selector)
  rootSelection.selectAll('.hx-tab-content')
    .classed('hx-tab-content-hidden', true)
  item = tabs.items()[i]
  if item?
    tabs._.options.contentRenderer tabsContent, item.content
  else
    tabToSelectSelector = '#' + hx.select(element).attr('data-content')
    tabToSelect = rootSelection.select(tabToSelectSelector)
    tabToSelect.classed('hx-tab-content-hidden', false)
  tabs.emit('change', {id: i})

class Tabs extends hx.EventEmitter

  constructor: (@selector, options) ->
    super

    defaultRenderer = (node, value) -> hx.select(node).text(value)

    defaultOpts = {
      items: []
      titleRenderer: defaultRenderer
      contentRenderer: defaultRenderer
    }

    resolvedOptions = hx.merge defaultOpts, options

    @_ = {}

    @_.options = resolvedOptions

    hx.component.register(@selector, this)

    rootSel = hx.select @selector

    rootSel.classed 'hx-tabs', true


    titleRenderer = resolvedOptions.titleRenderer or defaultRenderer

    tabsContent = rootSel.select '.hx-tabs-content'

    if tabsContent.empty()
      tabsContent = rootSel.append 'div'
        .class 'hx-tabs-content'


    @selected = -1

    self = this
    # register callbacks for when the tabs are clicked
    if resolvedOptions.items.length
      @items resolvedOptions.items
    else
      rootSel.selectAll('.hx-tab').forEach (node, i) ->
        node.on 'click', 'hx.tabs', -> onTabSelected(self, node.node(), i)

    # make the first tab active
    @select(0)


  items: (newItems) ->
    if arguments.length
      if newItems.length is 0
        hx.consoleWarning 'Setting items to empty array'
      else

        root = hx.select @selector
        tabsContent = root.select '.hx-tabs-content'

        root.selectAll '.hx-tab'
          .remove()

        tabsContent.clear()

        titleBarsToAdd = newItems.map ({ title, context, content }, i) =>
          tab = hx.detached 'div'
            .class 'hx-tab'
          @_.options.titleRenderer tab.node(), title
          hx.palette.context tab.node(), context
          tab.on 'click', 'hx.tabs', =>
            onTabSelected this, tab.node(), i
          tab
        tabsContent.insertBefore titleBarsToAdd

        @select 0

      @_.options.items = newItems

      this

    else
      @_.options.items

  select: (i, force) ->
    if @selected != i or force
      tab = hx.select(@selector).selectAll('.hx-tab').nodes[i]
      onTabSelected(this, tab, i)

hx.Tabs = Tabs

hx.tabs = (opts) ->
  ret = hx.detached 'div'
  tabs = new hx.Tabs ret.node(), opts
  ret
