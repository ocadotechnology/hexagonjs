splitString = (string) ->
  regex = new RegExp(/[-+]?(?:\d+\.?\d*|\.?\d+)|((?:[^-+\d])+|\D+)/g)
  array = []
  while (a = regex.exec(string)) isnt null
    array.push(if isNaN(parseInt(a[0])) then a[0] else Number(a[0]))
  array

interpolateNumber = (a, b) ->
  a = +a
  b = +b
  (v) -> a * (1 - v) + b * v

hx.interpolate = (a, b) ->
  if typeof a is "number" then return interpolateNumber(a,b)

  colA  = hx.color(a)
  colB  = hx.color(b)

  if colA isnt undefined and colB isnt undefined
    (v) -> colA.clone().mix(colB, v).toString('rgba')
  else
    a = splitString(a)
    b = splitString(b)
    if a.length is b.length
      (v) ->
        c = []
        for i in [0..a.length] by 1
          if !isNaN(parseInt(a[i])) and !isNaN(parseInt(b[i]))
            c[i] = interpolateNumber(a[i], b[i])(v)
          else if a[i] is b[i]
            c[i] = a[i]
          else
            c[i] = b[i]

        c.join('')
    else
      res = b.join('')
      (v) -> res