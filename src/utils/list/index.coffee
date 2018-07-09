# Provides a layer over standard javascript arrays that makes adding and removing objects from a list easier

export class List

  constructor: (@list = []) ->
    @size = @list.length

  # adds an item to the list
  add: (item) ->
    @list.push item
    @size++
    this

  # removes all entries from the list
  clear: ->
    @list = []
    @size = 0
    this

  # removes the item at the index given
  delete: (index) ->
    if 0 <= index < @list.length
      @list.splice(index, 1)
      @size--
      true
    else
      false

  # returns all items in the list as an array
  entries: -> @list

  # runs a function for each item in the list
  forEach: (f, thisArg=@) ->
    f.call(thisArg, item) for item in @list
    undefined

  # gets an item by index if it exists, or returns undefined otherwise
  get: (index) -> if 0 <= index < @list.length then @list[index] else undefined

  # checks if the value is in the list. returns true if the values is found
  has: (item) -> @list.indexOf(item) != -1

  # removes the first occurance of this value found
  remove: (value) ->
    if (i = @list.indexOf(value)) != -1
      @list.splice(i, 1)
      @size--
      true
    else false

  # removes all occuratnce of the value supplied from the list
  removeAll: (value) ->
    removed = 0
    while (i = @list.indexOf(value)) != -1
      @list.splice(i, 1)
      @size--
      removed++
    removed

  # the same as entries()
  values: -> @list
