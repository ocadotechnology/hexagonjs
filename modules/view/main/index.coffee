
class View
  constructor: (@rootSelection, @selector, @defaultType) ->
    self = this
    @new = (datum) -> if self.selector.charAt(0)=='.' then @append(self.defaultType).class(self.selector.substring(1)).node() else @append(self.defaultType).node()
    @each = (datum, element) ->
    @old = (datum, element) -> @remove()
  enter: (f) -> @new = f; this
  exit: (f) -> @old = f; this
  update: (f) -> @each = f; this

  #XXX: Tidy and optimise
  apply: (data, key) ->

    if @rootSelection.size() == 0 then return

    if data not instanceof Array then data = [data]
    enterSet = []
    updateSet = []
    exitSet = []

    nodes = @rootSelection.selectAll(@selector).nodes

    if key
      # some temporary maps for keeping track of which nodes are entering, and which are exiting
      nodeByKey = new hx.Map
      dataByKey = new hx.Map

      for datum in data
        k = key(datum)
        dataByKey.set(k, datum)

      for node in nodes
        nodeData = hx.select.getHexagonElementDataObject(node)
        if nodeData.datum
          d = nodeData.datum
          k = key(d)
          if nodeByKey.has(k)
            # found a duplicate - do it should go into the exit set
            exitSet.push {element: node, datum: d}
          else
            nodeByKey.set(k, node)
            if dataByKey.has(k)
              datum = dataByKey.get(k)
              dataByKey.delete(k)
              updateSet.push {element: node, datum: datum}
            else
              # the data no longer exists - the node should disappear
              exitSet.push {element: node, datum: d}
        else
          # remove unknown nodes
          exitSet.push {element: node, datum: undefined}

      enterSet = ({datum: d[1]} for d in dataByKey.entries())
    else
      i = 0
      for node in nodes
        if i < data.length
          nodeData = hx.select.getHexagonElementDataObject(node)
          nodeData.datum = data[i]
          updateSet.push {element: node, datum: data[i]}
        else
          nodeData = hx.select.getHexagonElementDataObject(node, false)
          exitSet.push {element: node, datum: nodeData.datum}
        i++
      if i < data.length
        for j in [i..data.length-1]
          enterSet.push {datum: data[j]}


    newNodeSet = ({element: @new.call(@rootSelection, d.datum, i), datum: d.datum} for d, i in enterSet)

    for d in newNodeSet
      hx.select.getHexagonElementDataObject(d.element).datum = d.datum

    @old.call(hx.select(d.element), d.datum, d.element, i) for d, i in exitSet
    @each.call(hx.select(d.element), d.datum, d.element, i) for d, i in updateSet.concat(newNodeSet)

    this


hx.Selection::view = (selector, type='div') ->
  #TODO: remove from minified build
  if @size() == 0 then hx.consoleWarning('.view() called on an empty selection')
  new View(this, selector, type)
