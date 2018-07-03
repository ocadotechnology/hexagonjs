import logger from 'logger/main'
import { Set as HSet} from 'set/main'
import { Map as HMap} from 'map/main'
import { List as HList} from 'list/main'

# consistent string to int hashing
hash = (str, maxValue) ->
  res = 0
  len = str.length-1
  for i in [0..len] by 1
    res = res * 31 + str.charCodeAt(i)
    res = res & res
  if maxValue then Math.abs(res) % maxValue else res

# transposes a 2d array
transpose = (data) ->
  if not data.length? then return undefined
  w = data.length
  if w==0 or not data[0].length? then return data
  h = data[0].length
  transposed = new Array(h)
  for i in [0...h] by 1
    transposed[i] = new Array(w)
    for j in [0...w] by 1
      transposed[i][j] = data[j][i]
  transposed

supportsTouch = undefined
supportsDate = undefined

supports = (name) ->
  switch name
    when 'touch'
      supportsTouch ?= 'ontouchstart' of window
    when 'date'
      if supportsDate is undefined
        input = document.createElement("input")
        input.setAttribute("type", "date")
        supportsDate = input.type != "text"
      supportsDate

debounce = (duration, fn) ->
  timeout = undefined
  return ->
    if timeout then clearTimeout(timeout)
    origArgs = arguments
    f = ->
      timeout = undefined
      fn.apply(fn, origArgs)
    timeout = setTimeout(f, duration)

clamp = (min, max, value) -> Math.min(max, Math.max(min, value))

clampUnit = (value) -> clamp(0, 1, value)

randomId = (size=16, alphabet='ABCEDEF0123456789') ->
  chars = alphabet.split('')
  alphabetSize = chars.length
  v = (chars[Math.floor(Math.random() * alphabetSize)] for _ in [0...size] by 1)
  v.join('')

min = (values) -> Math.min.apply(null, values?.filter(defined))

minBy = (values, f) ->
  if not values? or values.length is 0 then return undefined

  if f
    minimum = values[0]
    minValue = f(minimum)
    for i in [1...values.length] by 1
      v = values[i]
      fv = f(v)
      if minValue is undefined or (fv isnt undefined and fv < minValue)
        minimum = v
        minValue = fv
    minimum
  else
    minimum = values[0]
    for v in values
      if v isnt undefined and v < minimum
        minimum = v
    minimum

argmin = (values, f) ->
  if not values? or values.length is 0 then return undefined

  minIndex = 0
  minValue = undefined
  if f
    minValue = f(values[0])
    if values.length > 1
      for i in [1...values.length] by 1
        v = f(values[i])
        if minValue is undefined or (v isnt undefined and v < minValue)
          minValue = v
          minIndex = i
  else
    minValue = values[0]
    if values.length > 1
      for i in [1...values.length] by 1
        v = values[i]
        if minValue is undefined or (v isnt undefined and v < minValue)
          minValue = v
          minIndex = i

  if minValue is undefined then undefined else minIndex

max = (values) -> Math.max.apply(null, values?.filter(defined))

maxBy = (values, f) ->
  if not values? or values.length is 0 then return undefined

  if f
    maximum = values[0]
    maxValue = f(maximum)
    for i in [1...values.length] by 1
      v = values[i]
      fv = f(v)
      if maxValue is undefined or (fv isnt undefined and fv > maxValue)
        maximum = v
        maxValue = fv
    maximum
  else
    maximum = values[0]
    for v in values
      if v isnt undefined and v > maximum
        maximum = v
    maximum

argmax = (values, f) ->
  if not values? or values.length is 0 then return undefined

  maxIndex = 0
  maxValue = undefined
  if f
    maxValue = f(values[0])
    if values.length > 1
      for i in [1...values.length] by 1
        v = f(values[i])
        if maxValue is undefined or (v isnt undefined and v > maxValue)
          maxValue = v
          maxIndex = i
  else
    maxValue = values[0]
    if values.length > 1
      for i in [1...values.length] by 1
        v = values[i]
        if maxValue is undefined or (v isnt undefined and v > maxValue)
          maxValue = v
          maxIndex = i

  if maxValue is undefined then undefined else maxIndex

range = (length) -> (x for x in [0...length] by 1)

sum = (values, f) -> values.reduce(((a, b) -> a + b), 0)

flatten = (arr) -> [].concat.apply([], arr)

cycle = (list, i) -> list[i%list.length]

hashList = (list, str) -> list[hash(str, list.length)]

find = (arr, f) ->
  for d in arr
    if f(d) then return d
  undefined

isNumber = (x) -> typeof x is 'number' or x instanceof Number

isString = (x) -> typeof x == 'string' or x instanceof String

isFunction = (x) -> typeof x == "function"

isArray = Array.isArray

# returns true if the thing passed in is an object, except for arrays
# which technically are objects, but in the eyes of this function are not
# objects
isObject = (obj) -> typeof obj is 'object' and not isArray(obj) and obj isnt null

isBoolean = (x) -> x is true or x is false or typeof x is 'boolean'

# Not plain objects:
# - Anything created with new (or equivalent)
# - DOM nodes
# - window
isPlainObject = (obj) ->
  (typeof obj is 'object') and
  (obj isnt null) and
  (not obj.nodeType) and
  obj.constructor and
  obj.constructor.prototype.hasOwnProperty('isPrototypeOf')

groupBy = (arr, f) ->
  map = new HMap
  for x in arr
    category = f(x)
    if not map.has(category) then map.set(category, new HList)
    map.get(category).add(x)
  values = map.entries()
  values.forEach((d) -> d[1] = d[1].entries())
  values

unique = (list) -> new HSet(list).values()

endsWith  = (string, suffix) ->
  string.indexOf(suffix, string.length - suffix.length) != -1

startsWith = (string, substring) -> string.lastIndexOf(substring, 0) is 0

tween = (start, end, amount) -> start + (end - start) * amount

defined = (x) -> x isnt undefined and x isnt null

zip = (arrays) ->
  if arrays
    if arrays.length > 0
      length = min(arrays.map (d) -> d.length or 0)
      if length > 0
        for i in [0...length] by 1
          arrays.map((arr) -> arr[i])
      else []
    else []
  else []

# gets all the things from the second object and plonks them into the first
# this does mutation, which is why it is not exposed
extend = (target, overlay, retainUndefined) ->
  for k, v of overlay
    if isPlainObject(v)
      target[k] ?= {}
      extend(target[k], v, retainUndefined)
    else
      if v isnt undefined or retainUndefined
        target[k] = clone(v)

mergeImpl = (deep, retainUndefined, objects) ->
  if deep
    res = {}
    for obj in objects
      if isPlainObject(obj)
        extend(res, obj, retainUndefined)
    res
  else
    res = {}
    for obj in objects
      if isPlainObject(obj)
        for k, v of obj
          if v isnt undefined or retainUndefined
            res[k] = v
    res

merge = (objects...) ->
  mergeImpl(true, true, objects)

# XXX [2.0.0]: This has changed from mergeDefined.defined
mergeDefined = (objects...) ->
  mergeImpl(true, false, objects)

shallowMerge = (objects...) ->
  mergeImpl(false, true, objects)

# XXX [2.0.0]: This has changed from shallowMerge.defined
shallowMergeDefined = (objects...) ->
  mergeImpl(false, false, objects)

clone = (obj) ->
  if isArray(obj)
    obj.map(clone)
  else if isPlainObject(obj)
    merge({}, obj)
  else if obj instanceof HList
    new HList(obj.entries().map(clone))
  else if obj instanceof HMap
    new HMap(obj.entries().map(([k, v]) -> [clone(k), clone(v)]))
  else if obj instanceof HSet
    new HSet(obj.keys().map(clone))
  else if obj instanceof Date
    new Date obj.getTime()
  else if isObject(obj) and obj isnt null
    logger.warn("Trying to clone #{obj} with constructor
                 #{obj?.constructor?.name},
                 it isn't really cloneable! Carrying on anyway.")
    {}
  else obj

shallowClone = (obj) ->
  if isArray(obj)
    obj.slice()
  else if isPlainObject(obj)
    shallowMerge({}, obj)
  else if obj instanceof HList
    new HList obj.entries()
  else if obj instanceof HMap
    new HMap obj.entries()
  else if obj instanceof HSet
    new HSet obj.keys()
  else if obj instanceof Date
    new Date obj.getTime()
  else if isObject(obj) and obj isnt null
    logger.warn("Trying to shallow clone #{obj} with constructor
                 #{obj?.constructor?.name},
                 it isn't really cloneable! Carrying on anyway.")
    {}
  else obj

vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"]

vendor = (obj, prop) ->
  if prop of obj then return obj[prop]
  for p in vendorPrefixes
    if (prefixedProp = p + prop.charAt(0).toUpperCase() + prop.slice(1)) of obj
      return obj[prefixedProp]

identity = (d) -> d

export {
  hash,
  transpose,
  supports,
  debounce,
  clamp,
  clampUnit,
  randomId,
  min,
  minBy,
  argmin,
  max,
  maxBy,
  argmax,
  range,
  sum,
  flatten,
  cycle,
  hashList,
  find,
  isNumber,
  isString,
  isFunction,
  isArray,
  isObject,
  isBoolean,
  isPlainObject,
  groupBy,
  unique,
  endsWith,
  startsWith,
  tween,
  defined,
  zip,
  extend,
  mergeImpl,
  merge,
  mergeDefined,
  shallowMerge,
  shallowMergeDefined,
  clone,
  shallowClone,
  vendor,
  identity
}
