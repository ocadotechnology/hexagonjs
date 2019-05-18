import { max } from 'utils/utils'
import { select, detached } from 'utils/selection'

#XXX [2.0.0]: remove - not used in hexagon anymore since request.node().innerHTML = has gone
cachedParseHtml = null
export parseHTML = (html) ->
  if not cachedParseHtml
    # This try/catch is only run once, the first time parseHTML is called.
    # Subsequent calls use the cached cachedParseHtml function
    try
      document.createRange().createContextualFragment('')
      cachedParseHtml = (html) ->
        document.createRange().createContextualFragment(html)
    catch e
      cachedParseHtml = (html) ->
        docFrag = document.createDocumentFragment()
        template = document.createElement('div')
        template.innerHTML = html
        while child = template.firstChild
          docFrag.appendChild(child)
        docFrag
  cachedParseHtml(html)

#XXX [2.0.0]: remove - its not used in hexagon and is too specialist to be exposed
export cleanNode = (node, recurse = true) ->
  n = node.childNodes.length - 1
  while n >= 0
    child = node.childNodes[n]
    if child.nodeType is 3 and /\s/.test child.nodeValue
      node.removeChild child
    else if child.nodeType is 1 and recurse
      cleanNode child
    n -= 1
  return node

#XXX [2.0.0]: move to another module (for dom-related utils)
cachedScrollbarSize = undefined
export scrollbarSize = ->
  if not cachedScrollbarSize?
    inner = document.createElement('p')
    inner.style.width = '100%'
    inner.style.height = '200px'
    outer = document.createElement('div')

    inner = detached('p')
      .style('width', '100%')
      .style('height', '200px')

    outer = detached('div')
      .style('position', 'absolute')
      .style('top', '0')
      .style('left', '0')
      .style('visiblity', 'hidden')
      .style('width', '200px')
      .style('height', '150px')
      .style('overflow', 'hidden')

    outer.append(inner)

    select('body').append(outer)

    w1 = inner.node().offsetWidth
    outer.style('overflow', 'scroll')
    w2 = inner.node().offsetWidth

    if w1 is w2
      w2 = outer.node().clientWidth

    outer.remove()

    w1 - w2

    cachedScrollbarSize = w1 - w2

  cachedScrollbarSize

# XXX: [2.0.0]: If Selection::parents is added, this doesn't need to be a special function
# zIndexes = selection.parents()
#  .map(s => Number(s.style('z-index'))
#  .filter(x => !isNaN(x))
# parentZindex = max(zIndexes)
export parentZIndex = (node, findMax) ->
  check = (node) ->
    index = Number select(node).style('z-index')
    if !isNaN(index) and index > 0 then index

  res = checkParents(node, check, findMax)

  if findMax then max(res) else res

#XXX [2.0.0]: replace with the simpler Selection::parents
export checkParents = (node, check, returnArray) ->
  if node?
    checkNode = node
    resultArr = []
    while checkNode.nodeType isnt 9
      result = check(checkNode)
      if returnArray
        if result? then resultArr.push result
      else if result? then return result
      checkNode = checkNode.parentNode
      if not checkNode?
        break
      if returnArray and checkNode.nodeType is 9
        return resultArr
    if returnArray then [] else false

export isElement = (obj) -> !!(obj and obj.nodeType is 1)
