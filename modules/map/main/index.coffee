# Proper maps are coming in ECMAScript 6 (which at time of writing has a scheduled release date of June 2015).
# This map object tries to keep as close as possible to the currently planned spec for maps, which should make it
# easier to swap out for the native implementation when it arrives and is well supported enough in browsers.

# used to avoid naming clashes when using objects as maps
prefixString = '\0'
prefixChar = prefixString.charCodeAt(0)
prefix = (string) -> prefixString + string
checkPrefix = (string) -> string and string.charCodeAt(0) is prefixChar

class Map
  constructor: (iterable) ->
    @size = 0
    @items = {}
    @nan = undefined
    if iterable
      for x in iterable
        @set(x[0], x[1])

  # removes all key/value pairs from this Map object. returns this Map object
  clear: ->
    @items = {}
    @nan = undefined
    @size = 0

  # remove an entry from the map (if it exists)
  delete: (key) ->
    if typeof key is "number" and isNaN(key)
      if @nan isnt undefined
        @size--
        @nan = undefined
    else
      prefixedKey = prefix key
      row = @items[prefixedKey]
      index = row?.keys?.indexOf key
      if index? and index isnt -1
        row.keys.splice index, 1
        row.values.splice index, 1
        delete @items[prefixedKey] unless row.keys.length
        @size--

    this

  # returns an array of [key, value] arrays
  entries: ->
    items = []
    for k, v of @items
      if checkPrefix k
        items = items.concat v.keys.map((key, i) -> [key, v.values[i]])
    if @nan isnt undefined
      items.push([NaN, @nan])
    items

  # calls f once for each key-value pair present in this Map object. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
  forEach: (f, thisArg=this) ->
    for v in @entries()
      f.call(thisArg, v[0], v[1])
    this

  # returns the value associated to the key, or undefined if there is none.
  get: (key) ->
    if typeof key is "number" and isNaN(key)
      @nan
    else
      prefixedKey = prefix key
      row = @items[prefixedKey]
      index = row?.keys?.indexOf key
      if index? and index isnt -1 then row.values[index] else undefined

  # check if the map contains a value
  has: (key) ->
    if typeof key is "number" and isNaN(key)
      @nan isnt undefined
    else
      index = @items[prefix(key)]?.keys?.indexOf key
      index? and index isnt -1

  # returns returns an array that contains the keys for each element in the Map.
  keys: -> (v[0] for v in @entries())

  # add an entry to the map (if it isn't already there)
  set: (key, value) ->
    if typeof key is "number" and isNaN(key)
      if @nan is undefined
        @size++
      @nan = value
    else
      prefixedKey = prefix key
      emptyRow =
        keys: []
        values: []
      row = @items[prefixedKey] ?= emptyRow
      index = row.keys.indexOf key
      if index isnt -1
        row.values[index] = value
      else
        @size++
        row.keys.push key
        row.values.push value
    this

  # get the values of the entries in the map
  values: -> (v[1] for v in @entries())

module.exports = Map

# backwards compatibility
module.exports.hx = {
  Map: Map
}
