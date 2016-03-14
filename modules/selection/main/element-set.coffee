util = require('modules/util/main/utils')
hxList = require('modules/list/main')
hxSet = require('modules/set/main')
getHexagonElementDataObject = require('./get-hexagon-element-data-object')

module.exports = class ElementSet
  constructor: ->
    @elements = new hxList
    @ids = new hxSet

  add: (element) ->
    d = getHexagonElementDataObject(element)
    d.id ?= util.randomId()
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
