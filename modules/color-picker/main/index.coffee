class Position
  constructor: (@x, @y) ->

  add:(val) ->
    newPos = new Position(@x,@y)
    if val isnt null
      if not isNaN(val.x) then newPos.x += val.x
      if not isNaN(val.y) then newPos.y += val.y
    newPos

  subtract: (val) ->
    newPos = new Position(@x,@y)
    if val isnt null
      if not isNaN(val.x) then newPos.x -= val.x
      if not isNaN(val.y) then newPos.y -= val.y
    newPos

  min: (val) ->
    newPos = new Position(@x,@y)
    if val isnt null
      if not isNaN(val.x) and @x > val.x then newPos.x = val.x
      if not isNaN(val.y) and @y > val.y then newPos.y = val.y
    newPos

  max: (val) ->
    newPos = new Position(@x,@y)
    if val isnt null
      if not isNaN(val.x) and @x < val.x then newPos.x = val.x
      if not isNaN(val.y) and @y < val.y then newPos.y = val.y
    newPos

  bound: (min, max) ->
    newPos = @max(min)
    newPos.min(max)

  check: ->
    newPos = new Position(@x,@y)
    if isNaN(newPos.x) then newPos.x = 0
    if isNaN(newPos.y) then newPos.y = 0
    newPos

  apply: (elem) ->
    if not isNaN(@x) then elem.style('left', @x + 'px')
    if not isNaN(@y) then elem.style('top', @y + 'px')


class ColorPicker extends hx.EventEmitter
  constructor: (selector, options) ->
    super

    @options = hx.merge.defined {
      startColor: '#000'
      showInputs: 0
      align: 'lblt'
      disabled: false
    }, options

    hx.component.register(selector, this)

    @_ = {}

    _ = @_

    buildDropdown = (elem) =>
      if @options.disabled
        @dropdown.hide()
        return false

      cancelEvent = (e) ->
        e = if e then e else window.event
        if e.stopPropogation then e.stopPropogation()
        if e.preventDefault then e.preventDefault()
        e.cancelBubble = e.cancel = true
        e.returnValue = false
        false

      correctOffset = (pos, offset, neg) =>
        if neg then pos.subtract(offset)
        else pos.add(offset)

      getMousePos = (e) =>
        e = if e then e else window.event
        if isNaN(e.layerX) and e.offsetX then pos = new Position(e.offsetX, e.offsetY)
        else if touches = (e.touches or e.targetTouches)
          elem = hx.select(touches[0].target).box()
          pos = new Position(touches[0].pageX - elem.left - window.scrollX, touches[0].pageY - elem.top - window.scrollY)
        else pos = new Position(e.layerX, e.layerY)
        correctOffset(pos,pointerOffset,true)

      absoluteCursorPosition = (e) =>
        e = if e then e else window.event
        if isNaN(window.scrollX) and e.clientX
          new Position( e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft,
                        e.clientY + document.documentElement.scrollTop + document.body.scrollTop)
        else if touches = (e.touches or e.targetTouches)
          new Position(touches[0].clientX + window.scrollX, touches[0].clientY + window.scrollY)
        else
          new Position( e.clientX + window.scrollX, e.clientY + window.scrollY);

      getEventTarget = (e) =>
        e = if e then e else window.event
        if e.target then e.target else e.srcElement

      endMovement = () =>
        if @options.showInputs then staticColorBox.style('background', _.currentColor.toString())
        @emit('changeend', _.currentColor)

      colorChanged = (source) =>
        if @options.showInputs
          hexInput.value(_.currentColor.toString().toUpperCase())
          redInput.value(_.currentColor.red())
          greenInput.value(_.currentColor.green())
          blueInput.value(_.currentColor.blue())
          hueInput.value(_.currentColor.hue())
          saturationInput.value(_.currentColor.saturation())
          lightnessInput.value(_.currentColor.lightness())
          quickColorBox.style('background',_.currentColor.toString())

        if source is 'slider' or source is 'box'
          gridBG = hx.color().hsl([_.currentColor.hue(), 100, 50])
          grid.style('background-color', gridBG.toString())
        if source is 'box'
          sliderPicker.style('top', (gridSize - ((_.currentColor.hue() / 360) * gridSize) - sliderOffset.y) + 'px')
          pos = new Position((_.currentColor.saturation() / 100) * gridSize, (1 - _.currentColor.lightness() / 100) * gridSize)
          pos = correctOffset(pos, circleOffset, true)
          pos.apply(circlePicker)
          endMovement()
        @emit('change', _.currentColor)

      hexBoxChanged = (e) =>
        if hx.color.isColorString(hexInput.value())
          _.currentColor = hx.color(hexInput.value())
          colorChanged('box')

      redBoxChanged = (e) =>
        _.currentColor.rgb([parseInt(redInput.value()) or 0, _.currentColor.green(), _.currentColor.blue()])
        colorChanged('box')

      greenBoxChanged = (e) =>
        _.currentColor.rgb([_.currentColor.red(), parseInt(greenInput.value()) or 0, _.currentColor.blue()])
        colorChanged('box')

      blueBoxChanged = (e) =>
        _.currentColor.rgb([_.currentColor.red(), _.currentColor.green(), parseInt(blueInput.value()) or 0])
        colorChanged('box')

      hueBoxChanged = (e) =>
        _.currentColor.hsl([parseInt(hueInput.value()) or 0, _.currentColor.saturation(), _.currentColor.lightness()])
        colorChanged('box')

      saturationBoxChanged = (e) =>
        _.currentColor.hsl([_.currentColor.hue(), (parseInt(saturationInput.value())) or 0, _.currentColor.lightness()])
        colorChanged('box')

      lightnessBoxChanged = (e) =>
        _.currentColor.hsl([_.currentColor.hue(), _.currentColor.saturation(), (parseInt(lightnessInput.value())) or 0])
        colorChanged('box')

      sliderMoved = (pos, elem) =>
        pos = correctOffset(pos, sliderOffset, false);
        _.currentColor.hsl([((gridSize - pos.y)/gridSize) * 360, _.currentColor.saturation(), _.currentColor.lightness()])
        colorChanged('slider')

      circleMoved = (pos, elem) =>
        pos = correctOffset(pos, circleOffset, false)
        _.currentColor.hsl([_.currentColor.hue(), (pos.x/gridSize) * 100, (1-pos.y/gridSize) * 100])
        colorChanged('circle')

      sliderDown = (e, elem) =>
        pos = getMousePos(e)
        if getEventTarget(e) is elem.node()
          pos.y += parseInt(elem.style('top'))
        pos = correctOffset(pos,sliderOffset,true)
        pos = pos.bound(slidermin,slidermax)
        pos.apply(elem)
        sliderMoved(pos)

      circleDown = (e, elem) =>
        pos = getMousePos(e)
        if getEventTarget(e) is elem.node()
          pos.x += parseInt(elem.style('left'))
          pos.y += parseInt(elem.style('top'))
        pos = correctOffset(pos, circleOffset, true)
        pos = pos.bound(circlemin, circlemax)
        pos.apply(elem)
        circleMoved(pos)

      dragObject = (elem, parent, min, max, startCallback, moveCallback, endCallback) ->
        cursorStartPos = elementStartPos = dragging = listening = disposed = null

        if min isnt null and max isnt null
          temp = min.min(max)
          max = min.max(max)
          min = temp

        dragStart = (e) ->
          e = e.event
          if dragging or not listening or disposed then return
          dragging = true
          if startCallback isnt null then startCallback(e, elem)
          cursorStartPos = absoluteCursorPosition(e)
          elementStartPos = new Position(parseInt(elem.style('left')), parseInt(elem.style('top')))
          elementStartPos = elementStartPos.check()
          hx.select(document).on 'pointermove', 'hx.color-picker', dragGo
          hx.select(document).on 'pointerup', 'hx.color-picker', dragStopHook

        dragGo = (e) ->
          e = e.event
          if !dragging or disposed then return
          newPos = absoluteCursorPosition(e)
          newPos = newPos.add(elementStartPos).subtract(cursorStartPos)
          newPos = newPos.bound(min, max)
          newPos.apply(elem)
          if moveCallback isnt null then moveCallback(newPos, elem)
          cancelEvent(e)

        dragStopHook = (e) ->
          dragStop()
          e = e.event
          cancelEvent(e)

        dragStop = ->
          if not dragging or disposed then return true
          hx.select(document).off 'pointermove', 'hx.color-picker', dragGo
          hx.select(document).off 'pointerup', 'hx.color-picker', dragStopHook
          cursorStartPos = elementStartPos = null;
          if endCallback isnt null then endCallback(elem)
          dragging = false

        dispose: ->
          if disposed then return
          @StopListening(true)
          elem = parent = min = max = startCallback = moveCallback = endCallback = null
          disposed = true

        StartListening = ->
          if listening or disposed then return
          listening = true
          parent.on 'pointerdown', 'hx.color-picker', dragStart

        StopListening = ->
          if not listening or disposed then return
          parent.off 'pointerdown', 'hx.color-picker', dragStart
          if stopCurrentDragging and dragging then dragStop()

        StartListening()

      picker = hx.select(elem).append('div').class('hx-colorpicker')

      pickerInner = picker.append('div').class('hx-colorpicker-inner')
      pickerFields = pickerInner.append('div').class('hx-colorpicker-fields')

      grid = pickerFields.append('div').class('hx-colorpicker-grid')
      circlePicker = grid.append('div').class('hx-colorpicker-picker')

      slider = pickerFields.append('div').class('hx-colorpicker-slider')
      sliderPicker = slider.append('div').class('hx-colorpicker-picker')


      if @options.showInputs
        inputs = pickerInner.append('div').class('hx-colorpicker-inputs')

        colorGroup = inputs.append('div').class('hx-colorpicker-input-group')

        quickColorBox = colorGroup.append('div').class('hx-colorpicker-quick-color')
        staticColorBox = colorGroup.append('div').class('hx-colorpicker-static-color')

        makeInput = (parent, name, text) ->
          parent.append('div').class('hx-colorpicker-input')
            .append('label').attr('for', name).text(text)
            .insertAfter('input').attr('name', name).attr('size', 7).attr('maxlength', 3)

        hexInput = makeInput(inputs, 'hex', 'Hex:')

        rgbGroup = inputs.append('div').class('hx-colorpicker-input-group')

        redInput = makeInput(rgbGroup, 'red', 'R:')
        greenInput = makeInput(rgbGroup, 'green', 'G:')
        blueInput = makeInput(rgbGroup, 'blue', 'B:')

        hslGroup = inputs.append('div').class('hx-colorpicker-input-group')

        hueInput = makeInput(hslGroup, 'hue', 'H:')
        saturationInput = makeInput(hslGroup, 'saturation', 'S:')
        lightnessInput = makeInput(hslGroup, 'lightness', 'L:')

      if @options.showInputs
        hexInput.on 'change', 'hx.color-picker', hexBoxChanged
        redInput.on 'change', 'hx.color-picker', redBoxChanged
        greenInput.on 'change', 'hx.color-picker', greenBoxChanged
        blueInput.on 'change', 'hx.color-picker', blueBoxChanged
        hueInput.on 'change', 'hx.color-picker', hueBoxChanged
        saturationInput.on 'change', 'hx.color-picker', saturationBoxChanged
        lightnessInput.on 'change', 'hx.color-picker', lightnessBoxChanged
        quickColorBox.style 'background', _.currentColor.toString()
        staticColorBox.style 'background', _.currentColor.toString()

      sliderHeight = sliderPicker.node().offsetHeight
      circleHeight = circlePicker.node().offsetHeight
      gridSize = grid.node().offsetHeight - 2
      slidermin = new Position(0, - sliderHeight / 2)
      slidermax = new Position(0, gridSize - sliderHeight / 2)
      circlemin = new Position(- (circleHeight / 2), - ( circleHeight / 2))
      circlemax = new Position(gridSize - (circleHeight / 2), gridSize - (circleHeight / 2))
      pointerOffset = new Position((if navigator.userAgent.indexOf('Firefox') >= 0 then 1 else 0), (if navigator.userAgent.indexOf('Firefox') >= 0 then 1 else 0))
      circleOffset = new Position(circleHeight/2, circleHeight/2)
      sliderOffset = new Position(0, sliderHeight/2)

      sliderDragObject = circleDragObject = ''
      sliderDragObject = new dragObject(sliderPicker, slider, slidermin, slidermax, sliderDown, sliderMoved, endMovement)
      circleDragObject = new dragObject(circlePicker, grid, circlemin, circlemax, circleDown, circleMoved, endMovement)
      colorChanged('box')

    @dropdown = new hx.Dropdown selector, buildDropdown, {align: @options.align}
    _.selector = selector

    @value(@options.startColor)

    @dropdown.pipe this, 'dropdown'

    if @options.disabled then @disabled(@options.disabled)

  value: (color) ->
    _ = @_
    if color?
      _.currentColor = if typeof color is 'string' then hx.color(color) else color
      if @dropdown.isOpen()
        @dropdown.hide()
        @dropdown.show()
      this
    else
      _.currentColor.toString()


  disabled: (disabled) ->
    if arguments.length > 0
      @options.disabled = disabled
      hx.select(@_.selector)
        .attr('disabled', if disabled then true else undefined)
        .classed('hx-disabled', disabled)
      if @dropdown.isOpen() and disabled is true
        @dropdown.hide()
      this
    else
      @options.disabled

hx.colorPicker = (options) ->
  selection = hx.detached('div')
  new ColorPicker(selection.node(), options)
  selection

hx.ColorPicker = ColorPicker