onTabSelected = (tabs, element, i) ->
  tabs.selected = i
  selection = hx.select(tabs.selector)
  selection.selectAll('.hx-tab').classed('hx-tab-active', false)
  hx.select(element).classed('hx-tab-active', true)

  context = hx.palette.context(element)
  hx.palette.borderContext(selection.select('.hx-tabs-content'), context)

  rootSelection = hx.select(tabs.selector)
  rootSelection.selectAll('.hx-tab-content')
    .classed('hx-tab-content-hidden', true)
  tabToSelectSelector = '#' + hx.select(element).attr('data-content')
  tabToSelect = rootSelection.select(tabToSelectSelector)
  tabToSelect.classed('hx-tab-content-hidden', false)
  tabs.emit('change', {id: i})

class Tabs extends hx.EventEmitter

  constructor: (@selector) ->
    super

    hx.component.register(@selector, this)

    @selected = -1

    self = this
    # register callbacks for when the tabs are clicked
    hx.select(@selector).selectAll('.hx-tab').forEach (node, i) ->
      node.on 'click', 'hx.tabs', -> onTabSelected(self, node.node(), i)

    # make the first tab active
    @select(0)

  select: (i, force) ->
    if @selected != i or force
      tab = hx.select(@selector).selectAll('.hx-tab').nodes[i]
      onTabSelected(this, tab, i)

hx.Tabs = Tabs
