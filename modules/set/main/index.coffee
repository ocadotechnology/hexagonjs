# Proper sets are coming in ECMAScript 6 (which at time of writing has a scheduled release date of June 2015).
# This set object tries to keep as close as possible to the currently planned spec for maps, which should make it
# easy to swap out for the native implementation when it arrives and is well supported enough in browsers.

# used to avoid naming clashes when using objects as maps
prefixString = '\0'
prefixChar = prefixString.charCodeAt(0)
prefix = (string) -> prefixString + string
checkPrefix = (string) -> string and string.charCodeAt(0) is prefixChar

class Set
  constructor: (iterable) ->
    @size = 0
    @nan = false
    @items = {}
    if iterable
      for x in iterable
        @add(x)

  # add a value to the set (if it isn't already there). returns this Set object
  add: (value) ->
    if typeof value is "number" and isNaN(value)
      if not @nan
        @size++
        @nan = true
    else
      prefixedKey = prefix value
      @items[prefixedKey] ?= []
      row = @items[prefixedKey]
      unless value in row
        @size++
        row.push value
    this

  # removes all entries from this Set object.
  clear: ->
    @items = {}
    @nan = false
    @size = 0
    undefined

  # remove an entry from the set (if it exists)
  delete: (value) ->
    if typeof value is "number" and isNaN(value)
      if @nan
        @size--
        @nan = false
    else
      prefixedKey = prefix(value)
      if prefixedKey of @items
        row = @items[prefixedKey]
        index = row.indexOf value
        out = index isnt -1
        if out
          @size--
          row.splice index, 1
          delete @items[prefixedKey] unless row.length
        out
      else
        false

  # returns an array of [value, value] arrays
  entries: ->
    items = []
    for k, v of @items
      if checkPrefix(k) then items = items.concat v.map (elem) -> [elem, elem]
    if @nan
      items.push([NaN, NaN])
    items

  # calls f once for each value present in this Set object. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
  forEach: (f, thisArg=this) ->
    for v in @entries()
      f.call thisArg, v[1]
    undefined

  # check if the set contains a value
  has: (value) ->
    if typeof value is "number" and isNaN(value)
      @nan
    else
      prefixedKey = prefix value
      prefixedKey of @items and value in @items[prefixedKey]

  # returns an array that contains the keys for each element in the Map.
  keys: -> @values()

  # get the items in the set
  values: -> (v[1] for v in @entries())

# expose
module.exports = Set

# backwards compatibility
module.exports.hx = {
  Set: Set
}
