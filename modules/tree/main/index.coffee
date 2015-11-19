formatIcon = (node, iconElement, animate) =>
  children = hx.select(node).select('.hx-tree-node-children')

  if not children.selectAll('.hx-tree-node').empty()
    open = children.style('display') == 'block'
    hx.select(node).classed('hx-tree-node-open', open)
    if animate
      hx.select(iconElement).select('i').morph()
        .then(if open then 'rotate-90' else 'rotate-0')
        .go(true)

format = (tree, element, animate) ->
  toggle = (iconElement) =>
    selection = hx.select(element).select('.hx-tree-node-children')
    display = if selection.style('display') is 'none' then 'block' else 'none'
    selection.style('display', display)
    formatIcon(element, iconElement, tree.options.animate)

  # tries to open all children of the target toggle if it is already open, or if the node is closed, it simply opens it
  openAllOrToggle = (iconElement) =>
    selection = hx.select(element).selectAll('.hx-tree-node-children')
    root = hx.select(element).select('.hx-tree-node-children')
    rootNode = root.node()

    if root.style('display') is 'block'
      selection.forEach (node) ->
        if node isnt rootNode
          if node.style('display') isnt 'block'
            parentNode = node.node().parentNode
            iconElement = hx.select(parentNode).select('.hx-tree-node-parent-icon').node()
            node.style('display', 'block')
            formatIcon(parentNode, iconElement, tree.options.animate)
    else
      toggle(iconElement)

  showDisabled = hx.select(element.parentNode).selectAll('.hx-tree-node').select('.hx-tree-node-children').selectAll('.hx-tree-node').size() > 0
  showDisabled = if tree.options.hideDisabledButtons then false else showDisabled

  if hx.select(element).select('.hx-tree-node-children').selectAll('.hx-tree-node').size() > 0 or showDisabled
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
      elem = parent.select(".hx-tree-node-content").node()
      newElem = parent.append("div").attr("class", "hx-tree-node-parent").node()
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
      renderer: (elem, data) -> hx.select(elem).html(data)
      items: []
    }, options

    @selection = hx.select(@selector).classed('hx-openable', true)

    if @options.items? and @options.items.length > 0
      @items @options.items

    @refresh(false)

  refresh: (animate) ->
    animate = if animate? then animate
    else @options.animate

    @selection.selectAll('.hx-tree-node').forEach( (d) => format(this, d.node(), animate))
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
      self = this

      @options.items = data

      setup = (element, data) ->
        if data.children? and data.children.length > 0
          parentContent = hx.select(element)
            .append('div').attr('class', 'hx-tree-node-parent')
              .append('div').attr('class', 'hx-tree-node-content')
          self.options.renderer(parentContent.node(), data)
          content = hx.select(element)
            .append('div').attr('class', 'hx-tree-node-children')
          setupNodeList(content, data.children)
        else
          content = hx.select(element)
            .append('div').attr('class', 'hx-tree-node-content')
          self.options.renderer(content.node(), data)

      setupNodeList = (selection, data) ->
        nodes = selection.view('.hx-tree-node')
          .enter (d) ->
            node = @append('div').attr('class', 'hx-tree-node').node()
            setup(node, d)
            node
          .apply(data)

      # remove the old tree
      @selection.selectAll('.hx-tree-node').remove()

      # construct the new tree
      setupNodeList(@selection, data)

      @refresh(false)
      this
    else
      @options.items

  show: (animate, node) ->
    animate = if animate? then animate
    else @options.animate

    if node? then recurseUpTree.call this, node
    else
      @selection.selectAll('.hx-tree-node-children').style('display', 'block')
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

    animate = if animate? then animate
    else @options.animate

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
