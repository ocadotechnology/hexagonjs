
# returns the first component for an element (this will be the most commonly used function)
hx.component = (selector) ->
  hx.select(selector).node()?.__hx__?.components?[0]

# lists the components for an element
hx.components = (selector) ->
  # take a copy in case the user does something to the array
  components = hx.select(selector).node()?.__hx__?.components
  if components then components.slice() else []

# clears components from an element
hx.components.clear = (selector) ->
  node = hx.select(selector).node()
  node.__hx__ ?= {}
  node.__hx__.components = []
  return

# registers a component against an element
hx.component.register = (selector, component) ->
  node = hx.select(selector).node()
  node.__hx__ ?= {}
  node.__hx__.components ?= []
  node.__hx__.components.push component
  return

if hx.Selection
  hx.Selection::component = ->
    if @singleSelection
      if @nodes[0] then hx.component(@nodes[0])
    else
      @nodes.map(hx.component)

  hx.Selection::components = ->
    if @singleSelection
      if @nodes[0] then hx.components(@nodes[0])
    else
      @nodes.map(hx.components)
