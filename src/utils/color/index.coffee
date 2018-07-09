import { range, isString, clamp } from 'utils/utils'

componentToHex = (c) ->
  hex = c.toString(16)
  if hex.length is 1 then '0' + hex else hex

hueToRGB = (p, q, t) ->
  if t < 0 then t += 1
  if t > 1 then t -= 1
  if t < 1 / 6 then return p + (q - p) * 6 * t
  if t < 1 / 2 then return q
  if t < 2 / 3 then return p + (q - p) * (2 / 3 - t) * 6
  return p

update = (obj, hslToRgb) ->
  if hslToRgb
    h = obj.h / 360
    s = obj.s / 100
    l = obj.l / 100
    if s is 0 then r = g = b = l
    else
      q = if l < 0.5 then (l * (1 + s)) else (l + s - l * s)
      p = 2 * l - q
      r = hueToRGB(p,q,h + 1/3)
      g = hueToRGB(p,q,h)
      b = hueToRGB(p,q,h - 1/3)
    obj.r = r * 255
    obj.g = g * 255
    obj.b = b * 255
  else
    r = obj.r / 255
    g = obj.g / 255
    b = obj.b / 255
    max = Math.max(r,g,b)
    min = Math.min(r,g,b)
    l = (max + min) / 2
    c = max - min
    if max is min then h = s = 0
    else
      s = if l > 0.5 then c / (2 - max - min)  else c / (max + min)
      switch max
        when r then h = (g - b) / c + (if g < b then 6 else 0)
        when g then h = (b - r) / c + 2
        when b then h = (r - g) / c + 4
      h /= 6
    obj.h = h * 360
    obj.s = s * 100
    obj.l = l * 100
  obj


class Color
  constructor: ->
    @_ = { # Max:
      r: 0 # 255
      g: 0 # 255
      b: 0 # 255
      h: 0 # 360
      s: 0 # 100
      l: 0 # 100
      a: 1 # 1
    }

  property = (prop, isHSL, isAlphaValue) ->
    min = 0
    max = switch prop
      when 'h' then 360
      when 's', 'l' then 100
      when 'r', 'g', 'b' then 255
      when 'a' then 1

    (value) ->
      if arguments.length > 0
        if value? and not isNaN(value)
          @_[prop] = clamp(min, max, value)
          if not isAlphaValue then update(@_, isHSL)
        this
      else
        if isAlphaValue
          Math.round(@_[prop] * 100) / 100
        else
          Math.round(@_[prop])

  red: property('r', false)
  green: property('g', false)
  blue: property('b', false)
  hue: property('h', true)
  saturation: property('s', true)
  lightness: property('l', true)
  alpha: property('a', null, true)

  hsl: (arr) ->
    if arguments.length > 0
      arr ?= []
      property('h', true, false).call(this, arr[0])
      property('s', true, false).call(this, arr[1])
      property('l', true, false).call(this, arr[2])
      @alpha(arr[3])
      update(@_, true)
      this
    else
      [@hue(), @saturation(), @lightness(), @alpha()]

  rgb: (arr) ->
    if arguments.length > 0
      arr ?= []
      property('r', false, false).call(this, arr[0])
      property('g', false, false).call(this, arr[1])
      property('b', false, false).call(this, arr[2])
      @alpha(arr[3])
      update(@_, false)
      this
    else
      [@red(), @green(), @blue(), @alpha()]


  # Modifiers
  saturate: (amount) -> @saturation(@_.s + (@_.s * amount))
  lighten: (amount) -> @lightness(@_.l + (@_.l * amount))
  fade: (amount) -> @alpha(@_.a + (@_.a * amount))

  mix: (col, amount = 0.5) ->
    c = if not isColor(col) then color(col) else col
    r = @_.r * (1 - amount) + c._.r * amount
    g = @_.g * (1 - amount) + c._.g * amount
    b = @_.b * (1 - amount) + c._.b * amount
    a = @_.a * (1 - amount) + c._.a * amount
    @rgb([r, g, b, a])

  # Getters
  textCol: ->
    yiq = ((@red() * 299) + (@green() * 587) + (@blue() * 114))/1000
    if yiq >= 128 then 'black' else 'white'

  toString: (type) ->
    h = @hue()
    s = @saturation()
    l = @lightness()
    r = @red()
    g = @green()
    b = @blue()
    a = @alpha()
    switch type
      when 'hsla'
        "hsla(#{h},#{s}%,#{l}%,#{a})"
      when 'rgba'
        "rgba(#{r},#{g},#{b},#{a})"
      when 'hsl'
        "hsl(#{h},#{s}%,#{l}%)"
      when 'rgb'
        "rgb(#{r},#{g},#{b})"
      else
        if a isnt 1
          "rgba(#{r},#{g},#{b},#{a})"
        else
          '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)

  range: (numLight=3, numDark=3, maxRange = 0.5, outputFormat) ->
    step = maxRange / Math.max(numLight, numDark, 1)
    self = this
    light = range(numLight + 1).map((i) -> self.clone().lighten(step * i ))
    dark = range(numDark).reverse().map((i) -> self.clone().lighten(- step * (i + 1)))
    list = dark.concat light
    if outputFormat
      if outputFormat is 'array'
        list.map((c) -> c.rgb())
      else
        list.map((c) -> c.toString(outputFormat))
    else list

  clone: -> new Color().rgb(@rgb())


fromString = (str) ->
  if not isString(str) then return undefined

  if str.indexOf('#') isnt -1
    str = str.substring(1)
    if str.length is 3 then multiplier = 1 else multiplier = 2
    rgbArr = [
      str.substring(0, multiplier)
      str.substring(multiplier, 2 * multiplier)
      str.substring(2 * multiplier, 3 * multiplier)
    ]
    if multiplier is 1
      rgbArr[0] += '' + rgbArr[0]
      rgbArr[1] += '' + rgbArr[1]
      rgbArr[2] += '' + rgbArr[2]
    r = parseInt(rgbArr[0], 16)
    g = parseInt(rgbArr[1], 16)
    b = parseInt(rgbArr[2], 16)
    a = 1
    rgb = [r,g,b,a]
  else if str.indexOf('rgb') isnt -1
    string = str.replace('rgb(', '').replace('rgba(', '').replace(')', '')
    rgb = string.split(',')
  else if str.indexOf('hsl') isnt -1
    string = str.replace('hsl(', '').replace('hsla(', '').replace(')', '').replace('%', '').replace('%', '').replace('%', '')
    hsl = string.split(',')
    if hsl.some((d) -> isNaN(Number(d))) then return undefined
    hsl[3] ?= 1
    return (new Color).hsl(hsl)
  else return undefined

  rgb[3] ?= 1
  if rgb.some((d) -> isNaN(Number(d))) then return undefined

  (new Color).rgb(rgb)

export color = ->
  if arguments.length >= 3
    (new Color).rgb([arguments[0], arguments[1], arguments[2], arguments[3]])
  else if arguments.length is 1
    if Array.isArray(arguments[0])
      (new Color).rgb(arguments[0])
    else if isColor(arguments[0])
      arguments[0]
    else
      fromString(arguments[0])
  else
    new Color()

# returns true if the string passed in represents a color
export isColorString = (str) -> fromString(str) isnt undefined

# check if an object is a Color instance
export isColor = (obj) -> obj instanceof Color
