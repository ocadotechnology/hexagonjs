import logger from 'utils/logger'
import { Map as HMap } from 'utils/map'
import { select, getHexagonElementDataObject, Selection } from 'utils/selection'

class View
  constructor: (@rootSelection, @selector, @defaultType) ->
    self = this
    elementType = self.selector.split('.')[0]
    classes = self.selector.split('.').slice(1).join ' '
    @new = (datum) ->
      @append(elementType or self.defaultType)
        .class(classes)
        .node()
    @each = (datum, element) ->
    @old = (datum, element) -> @remove()
  enter: (f) -> @new = f; this
  exit: (f) -> @old = f; this
  update: (f) -> @each = f; this

  apply: (data, key) ->

    if @rootSelection.size()
      data = if Array.isArray(data) then data else [data]
      enterSet = []
      updateSet = []
      exitSet = []

      nodes = @rootSelection.shallowSelectAll(@selector).nodes

      if key
        # some temporary maps for keeping track of which nodes are entering, and which are exiting
        nodeByKey = new HMap

        dataByKey = new HMap data.map (datum) -> [key(datum), datum]
        for node in nodes
          nodeData = getHexagonElementDataObject(node)
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
                updateSet.push({element: node, datum: datum})
              else
                # the data no longer exists - the node should disappear
                exitSet.push({element: node, datum: d})
          else
            # remove unknown nodes
            exitSet.push({element: node, datum: undefined})

        enterSet = ({datum: d[1]} for d in dataByKey.entries())
      else
        i = 0
        for node in nodes
          if i < data.length
            nodeData = getHexagonElementDataObject(node)
            nodeData.datum = data[i]
            updateSet.push({element: node, datum: data[i]})
          else
            nodeData = getHexagonElementDataObject(node, false)
            exitSet.push({element: node, datum: nodeData.datum})
          i++
        if i < data.length
          for j in [i..data.length-1]
            enterSet.push({datum: data[j]})

      viewEnterWarning = (element, selector) ->
        logger.warn("view enter function returned", element, ". It didn't match selector", selector, ", so you may encounter odd behavior")

      classes = @selector.split('.')
      selectorContainsClasses = classes.length > 1
      classString = classes.slice(1).join(' ')

      newNodeSet = enterSet.map (d, i) =>
        datum = d.datum
        element = @new.call(@rootSelection, datum, i, data.indexOf(datum))

        # Checks isChild first as it's the quickest operation
        isChild = @rootSelection.contains(element)
        if not isChild
          viewEnterWarning(element, @selector)
        # Only do this check if the selector actually contains classes to check
        else if selectorContainsClasses
          isClassedCorrectly = select(element).classed(classString)
          if not isClassedCorrectly then viewEnterWarning(element, @selector)

        hedo = getHexagonElementDataObject(element)
        hedo.datum = datum
        ret = {
          element: element,
          datum: d.datum
        }


      @old.call(select(d.element), d.datum, d.element, i) for d, i in exitSet
      @each.call(select(d.element), d.datum, d.element, i) for d, i in updateSet.concat(newNodeSet)

      this

export initView = ->
  Selection::view = (selector, type='div') ->
    if @size() == 0 then logger.warn('.view() called on an empty selection')
    new View(this, selector, type)
