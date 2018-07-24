### istanbul ignore next: ignore coffeescript generated code that can't be covered  ###

# works on the single node given
class Animation extends hx.EventEmitter
  constructor: (@node, @ease=hx.ease.linear) ->
    super
    @cancelers = []
    @remaining = 0

    @finished = false
    @endCallback = (cancelled) =>
      @remaining--
      if @remaining <= 0 and not @finished and not cancelled
        @finished = true
        @emit 'end'

  transition = (iteration, duration) ->
    @remaining++
    @cancelers.push hx.transition(duration, iteration, @ease, @endCallback)
    this

  style: (property, value, duration) ->
    if @node
      if arguments.length == 4
        interpolator = hx.interpolate(arguments[1], arguments[2])
        iteration = (t, cancel) => if not cancel then @node.style.setProperty(property, interpolator(t))
        transition.call(this, iteration, arguments[3] or 200)
      else
        interpolator = hx.interpolate(window.getComputedStyle(@node, null).getPropertyValue(property), value)
        iteration = (t, cancel) => if not cancel then @node.style.setProperty(property, interpolator(t))
        transition.call(this, iteration, duration or 200)
    else
      @endCallback()
    this

  attr: (attribute, value, duration) ->
    if @node
      if arguments.length == 4
        interpolator = hx.interpolate(arguments[1], arguments[2])
        iteration = (t, cancel) => if not cancel then @node.setAttribute(attribute, interpolator(t))
        transition.call(this, iteration, arguments[3] or 200)
      else
        interpolator = hx.interpolate(@node.getAttribute(attribute), value)
        iteration = (t, cancel) => if not cancel then @node.setAttribute(attribute, interpolator(t))
        transition.call(this, iteration, duration or 200)
    else
      @endCallback()
    this

  cancel: ->
    @emit 'cancelled'
    for canceler in @cancelers
      canceler()
    this

hx.animate = (node, ease) -> new Animation(node, ease)

hx.Selection::animate = (ease) -> hx.animate(@nodes[0], ease)


# class for chaining animations and things together
class Morph extends hx.EventEmitter

  constructor: (@node, @trigger, start, cancellers) ->
    super
    @actions = []
    @start = start or (=> perform.call(this))
    @cancelers = cancellers or []
    @cancelled = false
    @finished = false

    # when the previous action ends, start this morph off
    if @trigger then @trigger.on 'end', 'hx.animate', =>
      @finished = true
      if not @cancelled
        perform.call(this)

  and: (f, duration = 200) ->
    if hx.isFunction(f)
      @actions.push f
    else
      if @node
        morphFactory = hx_morphs.get(f)
        if morphFactory
          @actions.push => morphFactory(@node, duration)
        else
          hx.consoleWarning(f + ' is not a registered morph', 'The available morphs are', hx_morphs.entries())
    this

  then: (f, duration = 200) ->
    if @actions.length > 0
      (new Morph(@node, this, @start, @cancelers)).and(f, duration)
    else
      @and(f, duration)

  # aliases for 'then', so that the chain of commands reads more like a sentence morph.with().and().then().and()
  with: (f, duration) -> @then(f, duration)

  # Style util methods
  applyStyle = (node, args) ->
    -> # Return function so the @and and @then work correctly.
      animElem = hx.animate(node)
      animElem.style.apply(animElem, args)

  andStyle: (property, value, duration) ->
    @and applyStyle(@node, arguments)

  thenStyle: (property, value, duration) ->
    @then applyStyle(@node, arguments)

  withStyle: (property, value, duration) ->
    @then applyStyle(@node, arguments)

  # Attr util methods
  applyAttr = (node, args) ->
    -> # Return function so the @and and @then work correctly.
      animElem = hx.animate(node)
      animElem.attr.apply(animElem, args)

  andAttr: (property, value, duration) ->
    @and applyAttr(@node, arguments)

  thenAttr: (property, value, duration) ->
    @then applyAttr(@node, arguments)

  withAttr: (property, value, duration) ->
    @then applyAttr(@node, arguments)


  cancel: ->
    if not @cancelled
      @emit 'cancelled'
      @cancelled = true
      for canceler in @cancelers
        if hx.isFunction(canceler.cancel) then canceler.cancel()
    this

  perform = ->
    if @actions.length > 0
      awaiting = @actions.length

      onEnd = =>
        awaiting--
        if awaiting ==0
          @emit('end')

      for action in @actions

        res = action(onEnd)

        if (res isnt undefined) and res.cancel
          @cancelers.push res

        if res instanceof hx.EventEmitter
          res.on 'end', 'hx.animate', onEnd
        else if action.length == 0 # the non async case
          onEnd()
    else
      # if there is nothing to do, emit end straight away
      @emit('end')

  go: (cancelOngoing) ->
    if cancelOngoing is true
      @cancelOngoing()

    @start()

    if @node
      obj = hx.select.getHexagonElementDataObject(@node, true)
      obj.morphs ?= []

      # remove all cancelled and finished morphs
      obj.morphs = obj.morphs.filter((morph) -> not morph.cancelled and not morph.finished)
      obj.morphs.push this

    this

  # cancels ongoing morphs for this node
  cancelOngoing: ->
    if @node
      obj = hx.select.getHexagonElementDataObject(@node, false)
      if obj
        if obj.morphs
          for morph in obj.morphs
            if not (morph.finished or morph.cancelled)
              morph.cancel()
          obj.morphs = []
    this


hx.morph = (node) -> new Morph(node)
hx.Selection::morph = -> new Morph(@nodes[0])

hx_morphs = new hx._.Map
hx.morph.register = (name, morph) -> hx_morphs.set(name, morph)

