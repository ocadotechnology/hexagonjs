#XXX: remove - replace with ColorProperty

class DrawingColor

  constructor: ->
    @c = hx.color()

  set: (name, value) ->

    switch name
      when 'color'
        @c = hx.color(value)
      when 'color.red'
        @c.red(hx.clamp(0, 255, value))
      when 'color.green'
        @c.green(hx.clamp(0, 255, value))
      when 'color.blue'
        @c.blue(hx.clamp(0, 255, value))
      when 'color.alpha'
        @c.alpha(hx.clampUnit(value))