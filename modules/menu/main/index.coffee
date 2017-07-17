import { EventEmitter } from 'event-emitter/main'
import { select, div } from 'selection/main'
import { Collapsible } from 'collapsible/main'
import { Dropdown } from 'dropdown/main'
import { isFunction, mergeDefined } from 'utils/main'
import { scrollbarSize } from 'dom-utils/main'
import { palette } from 'palette/main'

addItem = (item, context, menu) ->
  it = new MenuItem(item, context, menu)
  context._.menuItems.push it
  it

setupInner = (menu, dropdownData, current) ->
  # Clear menu items for the current item
  current._.menuItems = []
  for datum in dropdownData
    it = addItem(datum, current, menu)
    if datum.children then setupInner(menu, datum.children, it)

populateNode = (node, items) ->
  select(node).view('.hx-menu-item')
    .update (d, element) -> d.build(element)
    .apply(items)

# Generate a list of all the items in the order they appear, including children.
getAllItems = (menu) ->
  allItems = []
  pushItems = (arr, parentIndex) ->
    arr.forEach (d, i) ->
      d.parentIndex = parentIndex
      allItems.push(d)
      if d._.menuItems then pushItems d._.menuItems, i
  pushItems menu._.menuItems
  allItems

# If setActive is called on click, the dropdown is already hidden so
# offsetParent checking doesn't work.
setActive = (menu, pos, up, click) ->
  menu.dropdown._.dropdown?.selectAll('.hx-menu-item').classed('hx-menu-active',false)
  if pos >= 0
    allItems = getAllItems(menu)
    node = allItems[pos].node

    content = allItems[pos]?.content
    isEnabled = not content?.disabled and not content?.unselectable

    while (node.offsetParent is null or not isEnabled) and not click
      if up
        pos -= 1
      else
        pos += 1
      content = allItems[pos]?.content
      isEnabled = not content?.disabled and not content?.unselectable
      if allItems[pos]?
        node = allItems[pos].node
      else
        goUp = true
        break
    if goUp and not up
      setActive menu, pos-1, true
      return undefined
    else
      menu.cursorPos = pos
      if (dNode = menu.dropdown._.dropdown?.node())? and not click
        menuNode = select(node).classed('hx-menu-active',true)

        mNode = menuNode.node()

        offset = mNode.offsetTop
        collapsibleHeading = menuNode.select('.hx-menu-collapsible')
        itemHeight = if collapsibleHeading.size() > 0
          collapsibleHeading.node().clientHeight
        else
          mNode.clientHeight
        parentNode = select(mNode.parentNode)
        parentOffset = if parentNode.classed('hx-collapsible-content')
          parentNode.node().offsetTop
        else
          0
        totalOffset = offset + itemHeight + parentOffset
        ddScroll = if totalOffset > dNode.clientHeight
          totalOffset - dNode.clientHeight
        else
          0
        dNode.scrollTop = ddScroll

  if (selectedItem = allItems?[menu.cursorPos])?
    emitItem menu, selectedItem, 'highlight', if click then 'click' else 'arrow'

    # Item selected and active has been set.
    if click then emitItem menu, selectedItem, 'change', 'click'


moveSelectionUp = (menu) ->
  pos = menu.cursorPos
  if pos > 0
    pos -= 1
  else if pos is 0
    pos = -1
  menu.cursorPos = pos
  setActive(menu, pos, true)

moveSelectionDown = (menu) ->
  pos = menu.cursorPos
  allItems = getAllItems(menu)
  if pos < allItems.length - 1
    pos += 1
  menu.cursorPos = pos
  setActive(menu, pos, false)

toggleCollapsible = (collapsible, force, cb) ->
  switch force
    when true
      collapsible.show(true, cb)
    when false
      collapsible.hide(true, cb)
    else
      collapsible.toggle(true, cb)

dealWithEvent = (menu, force, eventType='enter') ->
  if eventType is 'tab'
    pos = Math.max(menu.cursorPos, 0)
  else
    pos = menu.cursorPos

  allItems = getAllItems(menu)
  selectedItem = allItems[pos]
  if force? and not force and selectedItem?.parent?.collapsible?
    toggleCollapsible selectedItem.parent.collapsible, force, ->
      if not selectedItem._.menuItems
        moveSelectionUp(menu)
  else if selectedItem?.collapsible?
    toggleCollapsible selectedItem.collapsible, force
  else if (force? and force) or !force?
    emitItem menu, selectedItem, 'change', eventType


emitItem = (menu, item, type, eventType) ->
  if menu.has type # select or activeset
    menu.emit type, {
      eventType: eventType # click, enter, tab or arrows
      content: item?.content
      menu: menu
    }


checkEvent = (e, self) ->
  switch e.which
    when 9 # tab
      dealWithEvent(self, undefined, 'tab')
    when 13 # enter
      e.preventDefault()
      dealWithEvent(self, undefined)
    when 37 # left
      dealWithEvent(self, false)
    when 38 # up
      e.preventDefault()
      moveSelectionUp(self)
    when 39 # right
      dealWithEvent(self, true)
    when 40 # down
      e.preventDefault()
      moveSelectionDown(self)

  self.emit('input', e)


class MenuItem
  constructor: (@content, @parent, @menu) ->
    @_ = {}

  build: (container) ->
    @node = container
    container = select(container)

    if @_.menuItems?.length > 0
      container.view('.hx-collapsible').apply(this)
      collapsibleNode = container.select('.hx-collapsible')

      collapsibleNode.view('.hx-collapsible-heading').apply(this)
      collapsibleNode.view('.hx-collapsible-content').update(-> @style('display', 'none')).apply(this)

      headerNode = collapsibleNode.select('.hx-collapsible-heading').classed('hx-menu-collapsible', true).node()
      contentNode = container.select('.hx-collapsible-content').node()

      @menu.options.renderer(headerNode, @content)
      @collapsible = new Collapsible(collapsibleNode.node())

      populateNode(contentNode, @_.menuItems)
    else
      linkEnabled = not @content.unselectable and not @content.disabled
      container.classed('hx-menu-link', linkEnabled)
        .classed('hx-menu-item-disabled', @content.disabled)
        .classed('hx-menu-unselectable', @content.unselectable)
      @menu.options.renderer(container.node(), @content)



export class Menu extends EventEmitter
  constructor: (@selector, options = {}) ->
    super

    @options = mergeDefined({
      dropdownOptions: {
        align: undefined
        mode: 'click',
        ddClass: '',
        disabled: false
      }
      renderer: (node, data) ->
        select(node).text(if data.text then data.text else data)
      items: []
    }, options)

    self = this

    @_ = {
      items: @options.items
      itemsChanged: true # First time in this should be true
    }

    select(@selector).api(this)

    if @options.dropdownOptions.ddClass? and @options.dropdownOptions.ddClass.length is 0
      colorClass = palette.context(@selector)

    @options.dropdownOptions.ddClass = 'hx-menu ' + if colorClass? then 'hx-' + colorClass else @options.dropdownOptions.ddClass

    dropdownContent = (node) ->
      elem = div()
      menuItems = elem.select('.hx-menu-items')
      if menuItems.empty()
        menuItems = elem.append('div').class('hx-menu-items')

      doneFn = (items) ->
        if self._.itemsChanged # We don't want to keep making lots of new menu items if the items haven't changed
          self._.itemsChanged = false
          setupInner(self, items, self)
        populateNode(menuItems.node(), self._.menuItems)

      # Items as set by the user.
      rawItems = self._.items

      if isFunction(rawItems)
        self._.itemsChanged = true # Items have always changed when being returned from a function
        rawItems (items) -> doneFn(items)
      else
        doneFn(rawItems)
      return

    @dropdown = new Dropdown(@selector, dropdownContent, @options.dropdownOptions)

    @dropdown.on 'showend', =>
      if @dropdown._.dropdown?
        node = @dropdown._.dropdown.node()
        ddNode = select(node)
        if node.scrollTop < node.scrollHeight - node.clientHeight
          ddNode.style('width', ddNode.width() + scrollbarSize() + 'px')
          if @dropdown._.alignments[2] is 'r'
            ddNode.style('left', Math.max(0, ddNode.box().left - scrollbarSize()) + 'px')

    selection = select(@selector)

    selection.off 'click', 'hx.dropdown'

    selection.on 'click', 'hx.menu', =>
      if not @options.disabled
        if @dropdown.isOpen()
          @dropdown.hide()
        else
          if not @loading
            if @data? and isFunction(@data)
              @loading = true
              loading = selection.prepend('span')
              loading.append('i').class('hx-menu-loading hx-icon hx-icon-spin hx-icon-spinner')
              @data (data) ->
                self.loading = false
                loading.remove()
                setupItems(self, data)
            @dropdown.show()

    if selection.node().nodeName.toLowerCase() is 'input'
      isInput = true
      targetElem = selection

    @dropdown.on 'showstart', 'hx.menu', ->
      self.cursorPos = -1

      if !isInput
        targetElem = self.dropdown._.dropdown
        targetElem.attr('tabindex','-1')
        targetElem.node().focus()

      targetElem.on 'keydown', 'hx.menu', (e) ->
        if self.dropdown.isOpen()
          checkEvent(e, self)
        self.emit 'keydown', e

      self.dropdown._.dropdown?.on 'click', 'hx.menu', (e) ->
        # get the closest menu item - uses nodes as blank selection can be
        # returned if the target is a hx-menu-item

        target = if select(e.target).classed('hx-menu-link')
          e.target
        else
          select(e.target).closest('.hx-menu-item').node()

        if target

          index = -1

          t = select(target)
          if t.classed('hx-menu-link')
            allItems = getAllItems(self)
            i = 0
            while index < 0 and i < allItems.length
              if allItems[i].node is target
                index = i
                break
              i += 1
            setActive(self, index, undefined, true)
          targetElem.node().focus()


    # pipe the dropdown events through
    @dropdown.pipe(this, 'dropdown')

    if @options.disabled then @disabled(@options.disabled)

  renderer: (f) ->
    if arguments.length > 0
      @options.renderer = f
      this
    else
      @options.renderer

  addException: (element) ->
    @dropdown.clickDetector.addException(element)
    this

  hide: ->
    @dropdown.hide()
    this

  items: (items) ->
    if arguments.length > 0
      items ?= [] # Prevent undefined items being set.
      @_.itemsChanged = true
      @_.items = items
      this
    else
      @_.items

  disabled: (disabled) ->
    if disabled?
      @options.disabled = disabled
      select(@selector)
        .attr('disabled', if disabled then true else undefined)
        .classed('hx-disabled', disabled)
      if @dropdown.isOpen() and disabled is true then @hide()
      this
    else
      !!@options.disabled
