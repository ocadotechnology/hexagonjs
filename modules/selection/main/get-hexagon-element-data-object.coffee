module.exports = getHexagonElementDataObject = (element, createIfNotExists = true) ->
  if createIfNotExists
    element.__hx__ ?= {}
    element.__hx__
  else
    if element.__hx__ then element.__hx__
