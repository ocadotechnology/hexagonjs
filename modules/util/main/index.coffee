hx.deprecatedWarning = (deprecatedItem, messages...) ->
  heading = "Deprecation Warning: #{deprecatedItem}"
  messages = ['Alternatives:'].concat messages.map (d) -> '  ' + d
  messages = messages.map (d) -> '  ' + d
  console.warn [heading].concat(messages).join('\n')
  console.trace('Stack Trace')

hx.consoleWarning = (heading, messages...) ->
  #messages = messages.map (d) -> '  ' + d
  console.warn.apply(console, [heading].concat(messages))
  console.trace('Stack Trace')

# consistent string to int hashing
hx.hash = (str, max) ->
  res = 0
  len = str.length-1
  for i in [0..len] by 1
    res = res * 31 + str.charCodeAt(i)
    res = res & res
  if max then Math.abs(res) % max else res

# transposes a 2d array
hx.transpose = (data) ->
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

hx.supports = (name) ->
  switch name
    when 'touch'
      supportsTouch ?= 'ontouchstart' of window
    when 'date'
      if supportsDate is undefined
        input = document.createElement("input")
        input.setAttribute("type", "date")
        supportsDate = input.type != "text"
      supportsDate

hx.debounce = (duration, fn) ->
  timeout = undefined
  return ->
    if timeout then clearTimeout(timeout)
    f = ->
      timeout = undefined
      fn()
    timeout = setTimeout(f, duration)

hx.clamp = (min, max, value) -> Math.min(max, Math.max(min, value))

hx.clampUnit = (value) -> hx.clamp(0, 1, value)

hx.randomId = (size=16, alphabet='ABCEDEF0123456789') ->
  chars = alphabet.split('')
  alphabetSize = chars.length
  v = (chars[Math.floor(Math.random() * alphabetSize)] for _ in [0...size] by 1)
  v.join('')

hx.min = (values) -> Math.min.apply(null, values?.filter(hx.defined))

hx.minBy = (values, f) ->
  if not values? or values.length is 0 then return undefined

  if f
    min = values[0]
    minValue = f(min)
    for i in [1...values.length-1] by 1
      v = values[i]
      if v isnt undefined
        fv = f(v)
        if fv isnt undefined and fv < minValue
          min = v
          minValue = fv
    min
  else
    min = values[0]
    for v in values
      if v isnt undefined and v < min
        min = v
    min

hx.max = (values) -> Math.max.apply(null, values?.filter(hx.defined))

hx.maxBy = (values, f) ->
  if not values? or values.length is 0 then return undefined

  if f
    max = values[0]
    maxValue = f(max)
    for i in [1...values.length-1] by 1
      v = values[i]
      if v isnt undefined
        fv = f(v)
        if fv isnt undefined and fv > maxValue
          max = v
          maxValue = fv
    max
  else
    max = values[0]
    for v in values
      if v isnt undefined and v > max
        max = v
    max

hx.range = (length) -> (x for x in [0...length] by 1)

hx.sum = (values, f) -> values.reduce(((a, b) -> a + b), 0)

hx.flatten = (arr) -> [].concat.apply([], arr)

hx.cycle = (list, i) -> list[i%list.length]

hx.hashList = (list, str) -> list[hx.hash(str, list.length)]

hx.find = (arr, f) ->
  for d in arr
    if f(d) then return d
  undefined

hx.isString = (x) -> typeof x == 'string' or x instanceof String

hx.isFunction = (x) -> typeof x == "function"

#XXX: is this needed? should we just use Array.isArray?
hx.isArray = (x) -> x instanceof Array

# returns true if the thing passed in is an object, except for arrays
# which technically are objects, but in the eyes of this function are not
# objects
hx.isObject = (obj) -> typeof obj is 'object' and not hx.isArray(obj) and obj isnt null

hx.isBoolean = (x) -> x is true or x is false or typeof x is 'boolean'

# Not plain objects:
# - Anything created with new (or equivalent)
# - DOM nodes
# - window
hx.isPlainObject = (obj) ->
  (typeof obj is 'object') and
  (obj isnt null) and
  (not obj.nodeType) and
  obj.constructor and
  obj.constructor.prototype.hasOwnProperty('isPrototypeOf')

hx.groupBy = (arr, f) ->
  map = new hx.Map
  for x in arr
    category = f(x)
    if not map.has(category) then map.set(category, new hx.List)
    map.get(category).add(x)
  values = map.entries()
  values.forEach((d) -> d[1] = d[1].entries())
  values

hx.unique = (list) -> new hx.Set(list).values()

hx.endsWith  = (string, suffix) ->
  string.indexOf(suffix, string.length - suffix.length) != -1

hx.startsWith = (string, substring) -> string.lastIndexOf(substring, 0) is 0

hx.tween = (start, end, amount) -> start + (end - start) * amount

hx.defined = (x) -> x isnt undefined

hx.zip = (arrays) ->
  if arrays
    if arrays.length > 0
      length = hx.min(arrays.map (d) -> d.length or 0)
      if length > 0
        for i in [0...length] by 1
          arrays.map((arr) -> arr[i])
      else []
    else []
  else []

# gets all the things from the second object and plonks them into the first
# this does mutation, which is why it is not exposed
hx_extend = (target, overlay, retainUndefined) ->
  for k, v of overlay
    if hx.isPlainObject(v)
      target[k] ?= {}
      hx_extend(target[k], v, retainUndefined)
    else
      if v isnt undefined or retainUndefined
        target[k] = hx.clone(v)

hx_merge = (deep, retainUndefined, objects) ->
  if deep
    res = {}
    for obj in objects
      if hx.isPlainObject(obj)
        hx_extend(res, obj, retainUndefined)
    res
  else
    res = {}
    for obj in objects
      if hx.isPlainObject(obj)
        for k, v of obj
          if v isnt undefined or retainUndefined
            res[k] = v
    res

hx.merge = (objects...) ->
  hx_merge(true, true, objects)

hx.merge.defined = (objects...) ->
  hx_merge(true, false, objects)

hx.shallowMerge = (objects...) ->
  hx_merge(false, true, objects)

hx.shallowMerge.defined = (objects...) ->
  hx_merge(false, false, objects)

hx.clone = (obj) ->
  if hx.isArray(obj)
    obj.map(hx.clone)
  else if hx.isPlainObject(obj)
    hx.merge({}, obj)
  else if obj instanceof hx.List
    new hx.List(obj.entries().map(hx.clone))
  else if obj instanceof hx.Map
    new hx.Map(obj.entries().map(([k, v]) -> [hx.clone(k), hx.clone(v)]))
  else if obj instanceof hx.Set
    new hx.Set(obj.keys().map(hx.clone))
  else if obj instanceof Date
    new Date obj.getTime()
  else if hx.isObject(obj) and obj isnt null
    hx.consoleWarning("Trying to clone #{obj} with constructor
                       #{obj?.constructor?.name},
                       it isn't really cloneable! Carrying on anyway.")
    {}
  else obj

hx.shallowClone = (obj) ->
  if hx.isArray(obj)
    obj.slice()
  else if hx.isPlainObject(obj)
    hx.shallowMerge({}, obj)
  else if obj instanceof hx.List
    new hx.List obj.entries()
  else if obj instanceof hx.Map
    new hx.Map obj.entries()
  else if obj instanceof hx.Set
    new hx.Set obj.keys()
  else if obj instanceof Date
    new Date obj.getTime()
  else if hx.isObject(obj) and obj isnt null
    hx.consoleWarning("Trying to shallow clone #{obj} with constructor
                       #{obj?.constructor?.name},
                       it isn't really cloneable! Carrying on anyway.")
    {}
  else obj

vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"]

hx.vendor = (obj, prop) ->
  if prop of obj then return obj[prop]
  for p in vendorPrefixes
    if (prefixedProp = p + prop.charAt(0) + prop.slice(1)) of obj
      return obj[prefixedProp]

hx.identity = (d) -> d

hx_parseHTML = null
hx.parseHTML = (html) ->
  if not hx_parseHTML
    ###
    istanbul ignore next:
    phantom/safari dont support create contextual fragment so use a slower
    method.
    ###
    
    # This try/catch is only run once, the first time hx.parseHTML is called.
    # Subsequent calls use the cached hx_parseHTML function
    try
      document.createRange().createContextualFragment('')
      hx_parseHTML = (html) ->
        document.createRange().createContextualFragment(html)
    catch e
      hx_parseHTML = (html) ->
        docFrag = document.createDocumentFragment()
        template = document.createElement('div')
        template.innerHTML = html
        while child = template.firstChild
          docFrag.appendChild(child)
        docFrag
  hx_parseHTML(html)

hx.cleanNode = (node, recurse = true) ->
  n = node.childNodes.length - 1
  while n >= 0
    child = node.childNodes[n]
    if child.nodeType is 3 and /\s/.test child.nodeValue
      node.removeChild child
    else if child.nodeType is 1 and recurse
      hx.cleanNode child
    n -= 1
  return node


scrollbarSize = undefined
hx.scrollbarSize = ->
  if not scrollbarSize?
    inner = document.createElement('p')
    inner.style.width = '100%'
    inner.style.height = '200px'
    outer = document.createElement('div')

    inner = hx.detached('p')
      .style('width', '100%')
      .style('height', '200px')

    outer = hx.detached('div')
      .style('position', 'absolute')
      .style('top', '0')
      .style('left', '0')
      .style('visiblity', 'hidden')
      .style('width', '200px')
      .style('height', '150px')
      .style('overflow', 'hidden')

    outer.append(inner)

    hx.select('body').append(outer)

    w1 = inner.node().offsetWidth
    outer.style('overflow', 'scroll')
    w2 = inner.node().offsetWidth

    if w1 is w2
      w2 = outer.node().clientWidth

    outer.remove()

    w1 - w2

    scrollbarSize = w1 - w2

  scrollbarSize


hx.parentZIndex = (node, findMax) ->
  check = (node) ->
    index = Number hx.select(node).style('z-index')
    if !isNaN(index) and index > 0 then index

  res = hx.checkParents(node, check, findMax)

  if findMax
    hx.max(res)
  else
    res


hx.checkParents = (node, check, returnArray) ->
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
