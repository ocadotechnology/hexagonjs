

class Layer
  triangle = (start, end) -> (x) -> 1 - Math.abs((Math.log(x) - start) * 2 / (end - start) - 1)
  ramp = (start, end) -> (x) -> 1 + Math.min((Math.log(x) - start) * 2 / (end - start) - 1, 0)

  constructor: (@drawing) ->
    @objects = []
    @visible = true
    @alpha = 1
    @alphaCurveFunction = null

  render: ->
    if @alphaCurveFunction
      @alpha = hx.clampUnit @alphaCurveFunction(@drawing.camera.actualZoom)
      @visible = @alpha > 0.01


    if @visible
      @drawing.setGlobalAlpha(@alpha)
      for object in @objects
        object.render(@drawing.ctx, @drawing, 0, 0)

  # create a new object
  create: (objectType, id) ->
    object = switch objectType
      when 'circle' then new Circle(id)
      when 'rectangle' then new Rectangle(id)
      when 'line' then new Line(id)
      when 'grid' then new Grid(id)
      when 'text' then new Text(id)
      when 'shape' then new Shape(id)
      when 'composite' then new Composite(id)

    if object then @objects.push object

    object

  delete: (obj) ->
    id = @objects.indexOf(obj)
    if id!=-1 then @objects.splice(id,1)

  # removes all objects from the layer
  deleteAll: ->
    @objects = []
    undefined

  find: (id) ->
    for object in @objects
      return object if object.id == id

  findBy: (ind) ->
    for object in @objects
      return object if ind(object)

  # returns a bounding box [x1, y1, x2, y2] that all objects in the layer are contained within
  getBoundingBox: ->
    if @objects.length > 0
      result = @objects[0].getBoundingBox(@drawing.ctx)
      if @objects.length > 1
        for i in [1..@objects.length-1] by 1
          bb = @objects[i].getBoundingBox(@drawing.ctx)
          if bb
            if result
              if bb[0] < result[0] then result[0] = bb[0]
              if bb[1] < result[1] then result[1] = bb[1]
              if bb[2] > result[2] then result[2] = bb[2]
              if bb[3] > result[3] then result[3] = bb[3]
            else
              result = bb
      result
    else
      null

  # set a function which transforms the current zoom into an alpha level for the layer. Setting this function will cause the alpha value of the layer to be calculated automatically every step
  setAlphaCurve: (type, start, end) ->
    @alphaCurveFunction = switch type
      when 'triangle' then triangle(start, end)
      when 'ramp' then ramp(start, end)
