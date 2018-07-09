createNodeView = (node, renderer, lazy) ->
  node.view('.hx-tree-node')
    .enter (d) -> @append(createTreeNode(d, renderer, lazy)).node()

createChildren = (children, renderer, lazy) ->
  children.map (child) -> createTreeNode(child, renderer, lazy)

createTreeNode = (data, renderer, lazy) ->
  treeNode = hx.detached('div').class('hx-tree-node')

  nodeContent = hx.detached('div').attr('class', 'hx-tree-node-content')
  renderer(nodeContent.node(), data)
  if data.children? and data.children.length > 0
    childContainer = hx.detached('div').class('hx-tree-node-children').style('display', 'none')
    if lazy
      childView = createNodeView(childContainer, renderer, lazy)
      hx.component.register(treeNode.node(), {
        renderChildren: -> childView.apply(data.children)
      })
    else
      childContainer.append(createChildren(data.children, renderer, lazy))

    treeNode.add(hx.detached('div').class('hx-tree-node-parent')
        .add(nodeContent))
      .add(childContainer)
  else
    treeNode.add(nodeContent)

formatChildren = (tree, children, animate) -> children.forEach((d) => format(tree, d.node(), animate))

formatIcon = (node, iconElement, animate) =>
  children = hx.select(node).shallowSelect('.hx-tree-node-children')

  if not children.selectAll('.hx-tree-node').empty()
    open = children.style('display') == 'block'
    hx.select(node).classed('hx-tree-node-open', open)
    if animate
      hx.select(iconElement).select('i').morph()
        .then(if open then 'rotate-90' else 'rotate-0')
        .go(true)

format = (tree, element, animate) ->
  treeNode = hx.select(element)
  treeNodeComponent = treeNode.component()

  renderLazyChildren = (rootNode, recursive) ->
    if rootNode.component()? and rootNode.selectAll('.hx-tree-node').empty()
      rootNode.component().renderChildren()
      formatChildren(tree, rootNode.selectAll('.hx-tree-node'), animate)
    if recursive
      rootNode.selectAll('.hx-tree-node').map((sel) -> renderLazyChildren(sel, recursive))

  toggle = (iconElement) =>
    selection = treeNode.select('.hx-tree-node-children')
    renderLazyChildren(treeNode)
    display = if selection.style('display') is 'none' then 'block' else 'none'
    selection.style('display', display)
    formatIcon(element, iconElement, tree.options.animate)

  # tries to open all children of the target toggle if it is already open, or if the node is closed, it simply opens it
  openAllOrToggle = (iconElement) =>
    renderLazyChildren(treeNode, true)
    treeNode.selectAll('.hx-tree-node-children').style('display', 'block')

    if treeNode.shallowSelect('.hx-tree-node-children').style('display') is 'block'
      formatChildren(tree, treeNode.selectAll('.hx-tree-node'), animate)
    else
      toggle(iconElement)

  siblings = hx.select(element.parentNode).shallowSelectAll('.hx-tree-node')
  siblingsHaveChildren = siblings
    .shallowSelect('.hx-tree-node-children')
    .shallowSelectAll('.hx-tree-node')
    .size() > 0

  siblingsHaveLazyChildren = siblingsHaveChildren or siblings.nodes.map((node) -> hx.component(node)?).some(hx.identity)
  showDisabled = if tree.options.hideDisabledButtons then false else siblingsHaveLazyChildren

  childTreeNodes = treeNode.select('.hx-tree-node-children')
  if treeNodeComponent? or childTreeNodes.selectAll('.hx-tree-node').size() > 0 or showDisabled
    innerElem = hx.select(element).select('.hx-tree-node-parent')

    if innerElem.size() > 0
      innerElem.view('.hx-tree-node-parent-icon')
        .enter ->
          selection = @append('div')
          selection.attr('class', 'hx-tree-node-parent-icon').append('i').attr('class', 'hx-icon hx-icon-chevron-right hx-tree-node-state-icon')
          selection.node()
        .update (d, node) ->
          isDouble = false
          cancelDouble = -> isDouble = false
          @on 'click', ->
            if isDouble then openAllOrToggle(node) else toggle(node)
            setTimeout(cancelDouble, 250)
            isDouble = true

          formatIcon(node.parentNode.parentNode, node, animate)
        .apply(this)
    else
      parent = hx.select(element)
      elem = parent.select('.hx-tree-node-content').node()
      newElem = parent.append('div').attr('class', 'hx-tree-node-parent').node()
      newElem.appendChild(elem)
      selection = hx.select(newElem).append('div')
      selection.attr('class', 'hx-tree-node-parent-icon hx-tree-node-parent-icon-disabled').append('i').attr('class', 'hx-icon hx-icon-chevron-right')

recurseUpTree = (node) ->
  nodeSel = hx.select(node)
  if nodeSel.classed('hx-tree-node')
    # jump an extra step as we know the tree structure means the parent will
    # be another tree node
    node = node.parentNode
    nodeSel.select(':scope > .hx-tree-node-children').style('display','block')
  closestParent = node.parentNode
  if closestParent? and @selection.node().contains(node)
    recurseUpTree.call this, closestParent


class Tree
  constructor: (@selector, options) ->
    hx.component.register(@selector, this)

    @options = hx.merge.defined {
      hideDisabledButtons: false
      animate: true
      renderer: (elem, data) -> hx.select(elem).node().innerHTML = data.name || data
      items: []
      lazy: false
    }, options

    @selection = hx.select(@selector).classed('hx-tree hx-openable', true)

    if @options.items? and @options.items.length > 0
      @items @options.items

    @refresh(false)

  refresh: (animate) ->
    animate = if animate? then animate else @options.animate
    formatChildren(this, @selection.selectAll('.hx-tree-node'), animate)
    this

  # useful for contructing a tree from something like json - lets you define the content of the node from the json description of that node
  # only requires you to define how to create the content for one node, and it will be called multiple times to construct the whole tree.
  # this means that the renderer you supply must be capable of returning the content for any of the nodes in your tree.
  renderer: (render) ->
    if render?
      @options.renderer = render
      this
    else
      @options.renderer

  items: (data) ->
    if data?
      @options.items = data
      @selection.clear()
      createNodeView(@selection, @renderer(), @options.lazy).apply(data)
      @refresh(false)
      this
    else
      @options.items

  show: (animate, node) ->
    animate = if animate? then animate else @options.animate

    if node? then recurseUpTree.call this, node
    else @selection.selectAll('.hx-tree-node-children').style('display', 'block')

    @selection.classed('hx-opened', true)
    @refresh(animate)
    this

  hide: (animate, node) ->
    if node?
      nodeSel = hx.select(node)

      if not nodeSel.classed('hx-tree-node')
        nodeSel = nodeSel.closest('.hx-tree-node')

      nodeSel.select(':scope > .hx-tree-node-children').style('display','none')

      childArr = @selection.selectAll('.hx-tree-node-children').style('display')
      if not childArr.some((d) -> d is 'block')
        @selection.classed('hx-opened', false)
    else
      @selection.classed('hx-opened', false)
      @selection.selectAll('.hx-tree-node-children').style('display', 'none')

    animate = if animate? then animate else @options.animate
    @refresh(animate)
    this

hx.tree = (options) ->
  selection = hx.detached('div')
  new Tree(selection.node(), options)
  selection

hx.Tree = Tree

# initialise all trees that match the css selector and return the result as an array of Trees
hx.initializeTrees = (selector) ->
  hx.selectAll(selector).nodes.map((d) -> new Tree(d))
