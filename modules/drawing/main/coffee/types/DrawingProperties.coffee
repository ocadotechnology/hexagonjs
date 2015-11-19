class ColorProperty
  constructor: (initial) ->
    @value = hx.color()
    if hx.defined(initial) then @set(initial)

  set: (value, duration, callback) ->
    if hx.defined(@stop)
      @stop()
      @stop = undefined

    if hx.defined(duration)
      sr = @value.red()
      sg = @value.green()
      sb = @value.blue()
      sa = @value.alpha()

      c = hx.color(value)
      er = c.red()
      eg = c.green()
      eb = c.blue()
      ea = c.alpha()

      cb = if callback then (cancelled) =>
        @stop = undefined
        callback(not cancelled, @value)

      update = (x, cancelled) =>
        if not cancelled
          @value.red(sr + (er - sr) * x)
          @value.green(sg + (eg - sg) * x)
          @value.blue(sb + (eb - sb) * x)
          @value.alpha(sa + (ea - sa) * x)

      @stop = hx.transition duration, update, hx.ease.linear, cb
    else
      @value = hx.color(value)

class NumberProperty
  constructor: (@value) ->
    @stop = undefined

  set: (value, duration, callback) ->
    if hx.defined(@stop)
      @stop()
      @stop = undefined

    if hx.defined(duration)
      start = @value
      cb = if callback then (cancelled) =>
        @stop = undefined
        callback(not cancelled, @value)

      update = (x, cancelled) =>
        if not cancelled
          @value = start + (value - start) * x

      @stop = hx.transition duration, update, hx.ease.linear, cb
    else
      @value = value

class StringProperty
  constructor: (@value) ->
    @stop = undefined

  set: (value, duration, callback) ->
    if hx.defined(@stop)
      @stop()
      @stop = undefined

    if hx.defined(duration)
      interpolater = hx.interpolate(@value, value)
      cb = if callback then (cancelled) =>
        @stop = undefined
        callback(not cancelled, @value)

      update = (x, cancelled) =>
        if not cancelled
          @value = interpolater(x)

      @stop = hx.transition duration, update, hx.ease.linear,
    else
      @value = value

# a property that cannot be animated
class DiscreteProperty
  constructor: (@value) ->
  set: (value) ->
    @value = value