select = require('modules/selection/main')

#XXX [2.0.0]: make these part of the selection api as setter getters (with optional names)
#             so that this entire api can be removed and absorbed into the selection api

# returns the first component for an element (this will be the most commonly used function)
component = (selector) ->
  select(selector).node()?.__hx__?.components?[0]

# lists the components for an element
components = (selector) ->
  # take a copy in case the user does something to the array
  components = select(selector).node()?.__hx__?.components
  if components then components.slice() else []

# clears components from an element
clear = (selector) ->
  node = select(selector).node()
  node.__hx__ ?= {}
  node.__hx__.components = []
  return

# registers a component against an element
register = (selector, component) ->
  node = select(selector).node()
  node.__hx__ ?= {}
  node.__hx__.components ?= []
  node.__hx__.components.push component
  return

select.Selection::component = ->
  if @singleSelection
    if @nodes[0] then component(@nodes[0])
  else
    @nodes.map(component)

select.Selection::components = ->
  if @singleSelection
    if @nodes[0] then components(@nodes[0])
  else
    @nodes.map(components)

component.register = register
components.clear = clear

module.exports = {
  component: component,
  components: components,
  clear: clear,
  register: register,
  hx: {
    component,
    components
  }
}
