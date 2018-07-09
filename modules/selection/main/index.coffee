
namespaces = {
  svg: 'http://www.w3.org/2000/svg'
  xhtml: 'http://www.w3.org/1999/xhtml'
  xlink: 'http://www.w3.org/1999/xlink'
  xml: 'http://www.w3.org/XML/1998/namespace'
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

# protect against dom clobbering
getMethod = (node, methodName) ->
  if node is window
    window[methodName]
  else if node instanceof Document
    Document.prototype[methodName]
  else
    Element.prototype[methodName]


# Should only be called with Function.call(node, selector)
matchPolyfill = (selector) ->
  node = this
  matchingNodes = (node.document or node.ownerDocument).querySelectorAll(selector)
  [].slice.call(matchingNodes).indexOf(node) > -1

getMatches = (node) ->
  node.matches or hx.vendor(node, 'matchesSelector') or matchPolyfill

selectSingle = (selector, node) -> getMethod(node, 'querySelector').call(node, selector)
selectAll = (selector, node) -> getMethod(node, 'querySelectorAll').call(node, selector)

shallowSelectSingle = (selector, node) ->
  if node.children?.length
    matchFn = getMatches(node)
    for child in node.children
      if matchFn.call(child, selector)
        return child

shallowSelectAll = (selector, node) ->
  if node.children?.length
    matchFn = getMatches(node)
    matchingNodes = []
    for child in node.children
      if matchFn.call(child, selector)
        matchingNodes.push child
    matchingNodes
  else []


getHexagonElementDataObject = (element, createIfNotExists = true) ->
  if createIfNotExists
    element.__hx__ ?= {}
    element.__hx__
  else
    if element.__hx__ then element.__hx__

class ElementSet
  constructor: ->
    @elements = new hx.List
    @ids = new hx.Set

  add: (element) ->
    d = getHexagonElementDataObject(element)
    d.id ?= hx.randomId()
    id = d.id

    if not @ids.has id
      @ids.add id
      @elements.add element

  remove: (element) ->
    d = getHexagonElementDataObject(element, false)
    if d and d.id
      if @ids.has d.id
        @elements.remove element
        @ids.delete d.id

  entries: -> @elements.entries()

  has: (element) ->
    d = getHexagonElementDataObject(element)
    d and d.id and @ids.has(d.id) or false

closestParent = (selector, node) ->
  node = node.parentNode
  while node and node isnt document
    if getMatches(node).call(node, selector) then return node
    node = node.parentNode

  undefined

flattenNodes = (nodes) ->
  set = new ElementSet
  for nodearray in nodes
    for node in nodearray
      set.add(node)
  set.entries()

#XXX: could check for the existance of classList (https://developer.mozilla.org/en-US/docs/Web/API/element.classList)
classed = (node, _class, include) ->
  selection = hx.select(node)
  c = selection.attr('class')
  newList = _class.split(' ').filter((d) -> d!='')
  if not c
    if include then selection.attr('class', newList.join(' '))
    return
  current = c.split(' ')

  for cls in newList
    if cls isnt ''
      i = current.indexOf(cls)
      if include and i == -1
        current.push(cls)
      else if not include and i != -1
        current.splice(i, 1)
      selection.attr('class', current.join(' '))
  return

reformed = (flatten, values) ->
  if not flatten
    values
  else
    if values.length == 0
      undefined
    else
      if values.length == 1
        values[0]
      else
        values

augmenters = []

class Selection

  constructor: (@nodes) ->
    @nodes = @nodes.filter((d) -> d?)
    @singleSelection = false

  # selects the first node matching the selector relative to this selection's nodes
  select: (selector) ->
    if not hx.isString(selector)
      hx.consoleWarning(
        'Selection.select was passed the wrong argument type',
        'Selection.select only accepts a string argument, you supplied:',
        selector
      )
      new Selection([])
    else
      s = new Selection(@nodes.map((node) -> selectSingle(selector, node)))
      s.singleSelection = @singleSelection
      s

  # selects all nodes matching the selector relative to this selection's nodes
  selectAll: (selector) ->
    if not hx.isString(selector)
      hx.consoleWarning(
        'Selection.selectAll was passed the wrong argument type',
        'Selection.selectAll only accepts a string argument, you supplied:',
        selector
      )
      new Selection([])
    else
      new Selection(flattenNodes(@nodes.map((node) -> selectAll(selector, node))))

  # selects the first node matching the selector that is a direct descendent of this selection
  shallowSelect: (selector) ->
    if not hx.isString(selector)
      hx.consoleWarning(
        'Selection.selectAll was passed the wrong argument type',
        'Selection.selectAll only accepts a string argument, you supplied:',
        selector
      )
      new Selection([])
    else
      s = new Selection(@nodes.map((node) -> shallowSelectSingle(selector, node)))
      s.singleSelection = @singleSelection
      s

  # selects all the nodes matching the selector that are a direct descendent of this selection
  shallowSelectAll: (selector) ->
    if not hx.isString(selector)
      hx.consoleWarning(
        'Selection.selectAll was passed the wrong argument type',
        'Selection.selectAll only accepts a string argument, you supplied:',
        selector
      )
      new Selection([])
    else
      new Selection(flattenNodes(@nodes.map((node) -> shallowSelectAll(selector, node))))


  # traverses up the dom to find the closest matching element. returns a selection containing the result
  closest: (selector) ->
    s = if not hx.isString(selector)
      hx.consoleWarning(
        'Selection.closest was passed the wrong argument type',
        'Selection.closest only accepts a string argument, you supplied:',
        selector
      )
      new Selection([])
    else
      new Selection(@nodes.map((node) -> closestParent(selector, node)))
    s.singleSelection = @singleSelection
    s

  # returns an array of the newly created nodes
  attachSingle = (selection, element, attacher) ->
    if element is undefined
      return []
    if not (hx.isString(element) or (element instanceof Selection) or (element instanceof Element))
      hx.consoleWarning('Selection Api error when attaching element', 'Expecting an Element, Selection or string argument, you supplied:', element)
      return []
    if not selection.singleSelection and (element instanceof Element or element instanceof Selection)
      hx.consoleWarning('Selection Api error when attaching element', 'You can not attach an existing element to a selection with multiple elements')
      return []
    if selection.empty()
      hx.consoleWarning('Selection Api error when attaching element', 'You can not attach an element to an empty selection')
      return []

    if element instanceof Element
      attacher(selection.nodes[0], element)
      [element]
    else if element instanceof Selection
      attacher(selection.nodes[0], node) for node in element.nodes
      element.nodes
    else
      for node in selection.nodes
        namespace = if namespaces.hasOwnProperty(element) then namespaces[element] else node.namespaceURI
        newNode = node.ownerDocument.createElementNS(namespace, element)
        attacher(node, newNode)
        newNode

  attach = (selection, name, attacher, reverse = false) ->
    singleSelection = selection.singleSelection
    newNodes = if hx.isArray(name)
      singleSelection = false
      dir = if reverse then -1 else 1
      ns = (attachSingle(selection, element, attacher) for element in name by dir)
      hx.flatten(if reverse then ns.reverse() else ns)
    else
      attachSingle(selection, name, attacher)

    s = new Selection(newNodes)
    s.singleSelection = singleSelection
    s

  # inserts the element inside the selected elements as the last child
  prepend: (name) -> attach(this, name, ((parent, node) -> parent.insertBefore(node, parent.firstChild)), true)

  # inserts the elements inside the selected elements as the first child
  append: (name) -> attach(this, name, (parent, node) -> parent.appendChild(node))

  # does the same as append, but returns the current selection for chaining.
  add: (name) -> @append(name); this

  # inserts the element before the selected (at the same level in the dom tree)
  insertBefore: (name) -> attach(this, name, (parent, node) -> parent.parentNode.insertBefore(node, parent))

  # inserts the element after the selected (at the same level in the dom tree)
  insertAfter: (name) -> attach(this, name, ((parent, node) -> parent.parentNode.insertBefore(node, parent.nextSibling)), true)

  # removes the selected elements from the dom
  remove: -> node.parentNode?.removeChild(node) for node in @nodes

  # removes all children from the selected nodes
  clear: ->
    for node in @nodes
      removeChild = getMethod(node, 'removeChild')
      while node.firstChild
        removeChild.call(node, node.firstChild)
    this

  # clears the contents of a node and then adds the children passed in
  set: (children) ->
    # The use of Promise.resolve can delay when the replacement happens, so
    # check to only do this when needed. This makes testing nicer when adding
    # non-promise content
    if children.then
      Promise.resolve(children).then((sel) => this.clear().add(sel))
    else
      this.clear().add(children)
    return this

  # replaces this selection with some other content
  replace: (content) ->
    # The use of Promise.resolve can delay when the replacement happens, so
    # check to only do this when needed. This makes testing nicer when adding
    # non-promise content
    if content.then
      Promise.resolve(content).then (sel) =>
        this.insertAfter(sel)
        this.remove()
    else
      this.insertAfter(content)
      this.remove()
    return this

  # gets the nth node in the selection, defaulting to the first
  node: (i=0) -> @nodes[i]

  # clones the nodes in the selection, and returns a new selection holding the cloned nodes
  clone: (deep = true) ->
    newNodes = (getMethod(node, 'cloneNode').call(node, deep) for node in @nodes)
    s = new Selection(newNodes)
    s.singleSelection = @singleSelection
    s

  # gets or sets a property for the nodes in the selection
  prop: (property, value) ->
    if arguments.length == 2
      if value? then (node[property] = value for node in @nodes)
      this
    else reformed(@singleSelection, node[property] for node in @nodes)

  # gets or sets an attribute of the nodes in the selection
  attr: (attribute, value) ->
    if attribute.indexOf(':') >= 0
      parts = attribute.split(':')
      namespace = namespaces[parts[0]]
      attr = parts[1]
    else
      attr = attribute

    if arguments.length == 2
      for node in @nodes
        if namespace
          if value isnt undefined
            getMethod(node, 'setAttributeNS').call(node, namespace, attr, value)
          else
            getMethod(node, 'removeAttributeNS').call(node, namespace, attr)
        else
          if value isnt undefined
            getMethod(node, 'setAttribute').call(node, attr, value)
          else
            getMethod(node, 'removeAttribute').call(node, attr)
      this
    else
      getVal = if namespace
        (node) -> getMethod(node, 'getAttributeNS').call(node, namespace, attr)
      else
        (node) -> getMethod(node, 'getAttribute').call(node, attr)

      reformed(@singleSelection, (if (val = getVal(node)) isnt null then val else undefined) for node in @nodes)

  # gets or sets a style attribute of the nodes in the selection
  style: (property, value) ->
    if arguments.length == 2
      for node in @nodes
        if value isnt undefined
          node.style.setProperty(property, value)
        else
          node.style.removeProperty(property)
      this
    else reformed(@singleSelection, window.getComputedStyle(node, null).getPropertyValue(property) for node in @nodes)

  # gets or sets the text of the nodes in the selection
  text: (text) ->
    if arguments.length == 1
      for node in @nodes
        node.textContent = if text? then text else ''
      this
    else
      reformed(@singleSelection, ((node.textContent or '') for node in @nodes))

  # gets or sets the inner html of the nodes in the selection
  html: (html) ->
    hx.deprecatedWarning('Selection::html', 'N/A')
    if arguments.length == 1
      for node in @nodes
        node.innerHTML = if html? then html else ''
      this
    else
      reformed(@singleSelection, ((node.innerHTML or '') for node in @nodes))

  # gets or sets the class attribute of the nodes in the selection
  class: (_class) ->
    if arguments.length == 1
      getMethod(node, 'setAttribute').call(node, 'class', _class or '') for node in @nodes
      this
    else
      reformed(@singleSelection, ((getMethod(node, 'getAttribute').call(node, 'class') or '') for node in @nodes))

  # adds, removes or gets a class in the class list for a node
  classed: (_class, include) ->
    if arguments.length == 1
      classes = ((getMethod(node, 'getAttribute').call(node, 'class') or '') for node in @nodes)
      reformed(@singleSelection, _class.split(' ').every((_cls) -> cls.split(' ').indexOf(_cls) != -1) for cls in classes )
    else
      classed(node, _class, include) for node in @nodes; this

  # gets or sets the value property of a node
  value: (value) -> if arguments.length == 1 then @prop('value', value) else @prop('value')

  # subscribe for dom events from the underlying nodes
  on: (name, namespace, f) ->
    if not hx.isString(namespace)
      f = namespace
      namespace = 'hx.selection'

    if namespace is 'default'
      namespace = 'hx.selection'

    for node in @nodes
      data = getHexagonElementDataObject(node)
      eventEmitter = if data.eventEmitter
        data.eventEmitter
      else
        data.eventEmitter = new hx.EventEmitter
      data.eventAugmenters ?= new hx.Map

      data.listenerNamesRegistered ?= new hx.Set

      if name.indexOf('pointer') isnt 0 and not data.listenerNamesRegistered.has(name)
        handler = (e) -> eventEmitter.emit(name, e)
        data.listenerNamesRegistered.add(name)
        getMethod(node, 'addEventListener').call(node, name, handler)
      eventEmitter.off(name, namespace)

      # set up any event augmenters that have not yet been set up
      if not data.eventAugmenters.has(name)
        handlerRemoverFunctions = []
        for augmenter in augmenters
          if augmenter.name is name
            handlerRemoverFunctions.push augmenter.setup(node, eventEmitter)
        data.eventAugmenters.set(name, handlerRemoverFunctions)

      if namespace
        eventEmitter.on name, namespace, f
      else
        eventEmitter.on name, f
    this

  # unsubscribe for dom events from the underlying nodes
  off: (name, namespace, f) ->
    if not hx.isString(namespace)
      f = namespace
      namespace = undefined

    if namespace is 'default'
      namespace = 'hx.selection'

    for node in @nodes
      data = getHexagonElementDataObject(node)

      # Remove listeners added by event augmenters
      if data.eventAugmenters?.has(name)
        for remover in data.eventAugmenters.get(name)
          remover()
        data.eventAugmenters.delete(name)

      data.eventEmitter?.off(name, namespace, f)
    this

  # attaches or reads some data from the underlying nodes
  data: (key, value) ->
    if arguments.length == 1
      values = for node in @nodes
        data = getHexagonElementDataObject(node)
        if data.data then data.data.get(key)
      reformed(@singleSelection, values)
    else
      values = for node in @nodes
        data = getHexagonElementDataObject(node)
        data.data ?= new hx.Map
        data.data.set(key, value)
      this

  # runs some function for each node in the selection
  forEach: (f) ->
    @nodes.map((node) -> select(node)).forEach(f)
    this

  # maps the selection to an array
  map: (f) -> reformed(@singleSelection, @nodes.map((node) -> select(node)).map(f))

  # creates a new selection with some of the nodes filtered out
  filter: (f) ->
    s = new Selection(@nodes.filter((node) -> f(select(node))))
    s.singleSelection = @singleSelection
    s

  # gets the client rect box for nodes in the selection
  box: -> reformed(@singleSelection, getMethod(node, 'getBoundingClientRect').call(node) for node in @nodes)

  # gets the widths of the nodes in the selection (in pixels)
  width: -> reformed(@singleSelection, getMethod(node, 'getBoundingClientRect').call(node).width for node in @nodes)

  # gets the heights of the nodes in the selection (in pixels)
  height: -> reformed(@singleSelection, getMethod(node, 'getBoundingClientRect').call(node).height for node in @nodes)

  # gets the number of nodes in the selection
  size: -> @nodes.length

  # checks if the selection is empty
  empty: -> @nodes.length == 0

  # checks if any of the nodes in the selection contain the supplied node
  contains: (element) ->
    for node in @nodes
      if getMethod(node, 'contains').call(node, element) then return true
    false

select = (selector, isArray) ->
  nodes = if isArray
    selector
  else
    if typeof selector is 'string' then [selectSingle(selector, document)] else [selector]
  s = new Selection(nodes)
  s.singleSelection = not isArray
  s

# expose
hx.select = (selector) ->
  if selector instanceof Selection
    selector
  else if not ((selector instanceof HTMLElement) or (selector instanceof SVGElement) or hx.isString(selector) or selector is document or selector is window)
    hx.consoleWarning(
      'hx.select was passed the wrong argument type',
      'hx.select only accepts a HTMLElement, SVGElement or string argument, you supplied:',
      selector
    )
    new Selection([])
  else
    select(selector)

hx.select.getHexagonElementDataObject = getHexagonElementDataObject

hx.select.addEventAugmenter = (augmenter) -> augmenters.push augmenter

hx.selectAll = (selector) ->
  if not (hx.isString(selector) or hx.isArray(selector))
    hx.consoleWarning(
      'hx.selectAll was passed the wrong argument type',
      'hx.selectAll only accepts a string argument, you supplied:',
      selector
    )
    new Selection([])
  else
    if hx.isArray(selector)
      select(selector, true)
    else
      select(document).selectAll(selector)

hx.detached = (name, namespace) ->
  namespace = if namespaces.hasOwnProperty(name) then namespaces[name] else namespaces.xhtml
  hx.select(document.createElementNS(namespace, name))

# expose the Selection prototype so that it can be extended
hx.Selection = Selection

hx._.selection = {
  ElementSet: ElementSet
}
