describe "hx-drawing", ->

  # suppress expected console.warns, and fail the test if they don't happen
  withDisabledConsoleWarn = (f) ->
    w = console.warn
    console.warn = chai.spy()
    f()
    console.warn.should.have.been.called()
    console.warn = w

  testSetGet = (prop, values, constructorFactory) ->
    it prop, ->
      for value in values
        obj = new (constructorFactory())
        obj.set(prop, value)
        obj.get(prop).should.eql(value)

  testUndefinedSetGet = (prop, constructorFactory) ->
    it "check undefined values that don't start with attr. don't get set", ->
      obj = new (constructorFactory())
      withDisabledConsoleWarn ->
        obj.set(prop, 'test')
      o = obj
      for p in prop.split('.')
        o = o[p]

      should.not.exist(o)

  describe "Layer", ->
    it "Should calculate the bounding rect correctly", ->

      drawing = new hx.Drawing(document.createElement('div'))

      layer = drawing.createLayer('test')

      circle = layer.create('circle')
      circle.set('position.x', 10)
      circle.set('position.y', 10)
      circle.set('radius', 20)

      circle = layer.create('circle')
      circle.set('position.x', 60)
      circle.set('position.y', 90)
      circle.set('radius', 10)

      bb = layer.getBoundingBox(drawing.ctx)
      bb.should.eql([-10, -10, 70, 100])

  xdescribe "DrawingColor", ->


  describe "Circle", ->

    it "Should calculate the bounding rect correctly", ->
      circle = new hx._.drawing.Circle
      circle.set('position.x', 10)
      circle.set('position.y', 10)
      circle.set('radius', 20)

      bb = circle.getBoundingBox()
      bb.should.eql([-10, -10, 30, 30])

    describe "Set + Get", ->
      testSetGet 'position.x', [10, -10],  -> hx._.drawing.Circle
      testSetGet 'position.y', [10, -10], -> hx._.drawing.Circle
      testSetGet 'radius', [10, 100],  -> hx._.drawing.Circle
      testSetGet 'fill.enabled', [true, false], -> hx._.drawing.Circle
      testSetGet 'outline.enabled', [true, false], -> hx._.drawing.Circle
      testSetGet 'outline.width', [0.5, 10], -> hx._.drawing.Circle
      testSetGet 'selectable', [true, false], -> hx._.drawing.Circle
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Circle
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Circle


  describe "Grid", ->

    it "Should calculate the bounding rect correctly", ->
      grid = new hx._.drawing.Grid
      grid.set('position.x', 10)
      grid.set('position.y', 20)
      grid.set('gridSize.x', 5)
      grid.set('gridSize.y', 6)
      grid.set('cellSize.x', 11)
      grid.set('cellSize.y', 12)

      bb = grid.getBoundingBox()
      bb.should.eql([10, 20, 10 + 5* 11, 20 + 6 * 12])

    describe "Set + Get", ->
      testSetGet 'position.x', [10, -10],  -> hx._.drawing.Grid
      testSetGet 'position.y', [10, -10], -> hx._.drawing.Grid
      testSetGet 'cellSize.x', [10, 100],  -> hx._.drawing.Grid
      testSetGet 'cellSize.y', [10, 100], -> hx._.drawing.Grid
      testSetGet 'gridSize.x', [10, 100],  -> hx._.drawing.Grid
      testSetGet 'gridSize.y', [10, 100], -> hx._.drawing.Grid

      testSetGet 'gridLines.enabled', [true, false], -> hx._.drawing.Grid
      testSetGet 'gridLines.width', [0.5, 10], -> hx._.drawing.Grid

      testSetGet 'cells.states', [[true, false], [false, true]], -> hx._.drawing.Grid
      testSetGet 'cells.enabled', [true, false], -> hx._.drawing.Grid

      testSetGet 'cells.palette', [['not', 'a', 'real', 'color', 'palette']], -> hx._.drawing.Grid
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Grid
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Grid

  describe "Line", ->

    it "Should calculate the bounding rect correctly", ->
      line = new hx._.drawing.Line
      line.set('start.x', 10)
      line.set('start.y', 20)
      line.set('end.x', 30)
      line.set('end.y', 40)

      bb = line.getBoundingBox()
      bb.should.eql([10, 20, 30, 40])

    describe "Set + Get", ->
      testSetGet 'start.x', [10, -10],  -> hx._.drawing.Line
      testSetGet 'start.y', [10, -10], -> hx._.drawing.Line
      testSetGet 'end.x', [10, -10],  -> hx._.drawing.Line
      testSetGet 'end.y', [10, -10], -> hx._.drawing.Line
      testSetGet 'width', [10, 100],  -> hx._.drawing.Line
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Line
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Line


  describe "Rectangle", ->

    it "Should calculate the bounding rect correctly", ->
      rectangle = new hx._.drawing.Rectangle
      rectangle.set('position.x', 10)
      rectangle.set('position.y', 20)
      rectangle.set('width', 30)
      rectangle.set('height', 40)

      bb = rectangle.getBoundingBox()
      bb.should.eql([10, 20, 40, 60])

    describe "Set + Get", ->
      testSetGet 'position.x', [10, -10],  -> hx._.drawing.Rectangle
      testSetGet 'position.y', [10, -10], -> hx._.drawing.Rectangle
      testSetGet 'width', [10, 100],  -> hx._.drawing.Rectangle
      testSetGet 'height', [10, 100], -> hx._.drawing.Rectangle
      testSetGet 'fill.enabled', [true, false], -> hx._.drawing.Rectangle
      testSetGet 'outline.enabled', [true, false], -> hx._.drawing.Rectangle
      testSetGet 'outline.width', [0.5, 10], -> hx._.drawing.Rectangle
      testSetGet 'selectable', [true, false], -> hx._.drawing.Rectangle
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Rectangle
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Rectangle

  describe "Text", ->

    # how should this one work?
    #it "Should calculate the bounding rect correctly", ->


    describe "Set + Get", ->
      testSetGet 'position.x', [10, -10],  -> hx._.drawing.Text
      testSetGet 'position.y', [10, -10], -> hx._.drawing.Text
      testSetGet 'text', ["hello", "goodbye"],  -> hx._.drawing.Text
      testSetGet 'text', [12, 24],  -> hx._.drawing.Text
      testSetGet 'text', ['font1', 'font2'],  -> hx._.drawing.Text
      testSetGet 'align.x', ['start', 'end'], -> hx._.drawing.Text
      testSetGet 'align.y', ['start', 'end'], -> hx._.drawing.Text
      testSetGet 'selectable', [true, false], -> hx._.drawing.Text
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Text
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Text

  describe "Shape", ->

    it "Should calculate the bounding rect for polygon shapes", ->
      shape = new hx._.drawing.Shape
      shape.set('position.x', 10)
      shape.set('position.y', 20)

      curve = [
        [ 10, 10]
        [ 20, 10]
        [ 20, 20]
        [ 20, 10]
      ]

      shape.set('polygon', curve)

      bb = shape.getBoundingBox()
      bb.should.eql([20, 30, 30, 40])

    it "Should calculate the bounding rect for curved concave shapes", ->
      shape = new hx._.drawing.Shape
      shape.set('position.x', 10)
      shape.set('position.y', 20)

      curve = [
        [ 10, 10, 15, 15 ]
        [ 20, 10, 15, 15 ]
        [ 20, 20, 15, 15 ]
        [ 20, 10, 15, 15 ]
      ]

      shape.set('curve', curve)

      bb = shape.getBoundingBox()
      bb.should.eql([20, 30, 30, 40])

    it "Should calculate the bounding rect for curved convex shapes", ->
      shape = new hx._.drawing.Shape
      shape.set('position.x', 10)
      shape.set('position.y', 20)

      curve = [
        [ 10, 10, 5, 5 ]
        [ 20, 10, 25, 5 ]
        [ 20, 20, 25, 25 ]
        [ 20, 10, 25, 5 ]
      ]

      shape.set('curve', curve)

      bb = shape.getBoundingBox()
      bb.should.eql([15, 25, 35, 45])

    describe "Set + Get", ->
      testSetGet 'position.x', [10, -10],  -> hx._.drawing.Shape
      testSetGet 'position.y', [10, -10], -> hx._.drawing.Shape
      testSetGet 'curve', [[[10, 10, 20, 20], [10, 10, 20, 20]]],  -> hx._.drawing.Shape
      testSetGet 'polygon', [[[20, 20], [10, 10]]],  -> hx._.drawing.Shape
      testSetGet 'fill.enabled', [true, false], -> hx._.drawing.Shape
      testSetGet 'outline.enabled', [true, false], -> hx._.drawing.Shape
      testSetGet 'outline.width', [0.5, 10], -> hx._.drawing.Shape
      testSetGet 'selectable', [true, false], -> hx._.drawing.Shape
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Shape
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Shape

  describe "Composite", ->
    it "Create all drawing objects as children", ->
      (->
        composite = new hx._.drawing.Composite

        composite.create('circle', 'one')
        composite.create('rectangle', 'two')
        composite.create('line', 'three')
        composite.create('grid', 'four')
        composite.create('text', 'five')
        composite.create('shape', 'six')
        composite.create('composite', 'seven')
      ).should.not.throw()



    describe "Set + Get for children", ->
      create = ->
        composite = new hx._.drawing.Composite

        composite.create('circle', 'one')
        composite.create('rectangle', 'two')
        composite.create('line', 'three')
        composite.create('grid', 'four')
        composite.create('text', 'five')
        composite.create('shape', 'six')
        composite.create('composite', 'seven')

      check = (composite, prop, value) ->
        composite.set(prop, value).get(prop).should.equal(value)

      it 'Circle', ->
        composite = create()
        check(composite, 'one.radius', 10)
        check(composite, 'one.radius', 20)
        withDisabledConsoleWarn ->
          composite.set('one.height', 0)

      it 'Rectangle', ->
        composite = create()
        check(composite, 'two.width', 20)
        check(composite, 'two.height', 10)
        withDisabledConsoleWarn ->
          composite.set('two.radius', 0)

      it 'Line', ->
        composite = create()
        check(composite, 'three.start.x', 10)
        check(composite, 'three.end.y', 20)
        withDisabledConsoleWarn ->
          composite.set('three.radius', 0)

      it 'Grid', ->
        composite = create()
        check(composite, 'four.gridSize.x', 10)
        check(composite, 'four.cellSize.y', 20)
        withDisabledConsoleWarn ->
          composite.set('four.radius', 0)

      it 'Text', ->
        composite = create()
        check(composite, 'five.size', 10)
        check(composite, 'five.align.y', 20)
        withDisabledConsoleWarn ->
          composite.set('five.radius', 0)

      it 'Shape', ->
        composite = create()
        check(composite, 'six.curve', [10, 11, 12])
        check(composite, 'six.curve', [12, 11, 12])
        withDisabledConsoleWarn ->
          composite.set('six.radius', 0)

      it 'Composite', ->
        composite = create()
        check(composite, 'seven.position.x', 10)
        check(composite, 'seven.position.y', 20)
        withDisabledConsoleWarn ->
          composite.set('seven.radius', 0)

    describe "Set + Get", ->
      testSetGet 'position.x', [10, -10],  -> hx._.drawing.Composite
      testSetGet 'position.y', [10, -10], -> hx._.drawing.Composite
      testSetGet 'angle', [10, -10], -> hx._.drawing.Composite
      testSetGet 'scale', [2, 10], -> hx._.drawing.Composite
      testSetGet 'selectable', [true, false], -> hx._.drawing.Composite
      testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> hx._.drawing.Composite
      testUndefinedSetGet 'attrthatshouldnotbeset', -> hx._.drawing.Composite

  describe "Collision checking", ->

    describe "line-segment vs line-segment", ->

      it "parallel lines do not intersect", ->
        hx._.drawing.lineIntersection(10, 10, 20, 20, 15, 10, 25, 20).should.equal(false)

      it "line segments that are not long enough to intersect (but would intersect if longer)", ->
        hx._.drawing.lineIntersection(0, 0, 10, 10, 0, 10, 4, 6).should.equal(false)

      it "intersecting segments should return true", ->
        hx._.drawing.lineIntersection(0, 0, 10, 10, 0, 10, 10, 0).should.equal(true)


    describe "point vs rectangle", ->

      it "point outside rectangle", ->
        hx._.drawing.pointRectangleIntersection(20, 0, -5, -5, 5, 5).should.equal(false)

      it "point inside rectangle", ->
        hx._.drawing.pointRectangleIntersection(0, 0, -5, -5, 5, 5).should.equal(true)

      it "point on rectangle corner", ->
        hx._.drawing.pointRectangleIntersection(5, 5, -5, -5, 5, 5).should.equal(true)

      it "point on rectangle edge", ->
        hx._.drawing.pointRectangleIntersection(5, 0, -5, -5, 5, 5).should.equal(true)


    describe "line-segment vs horizontal line-segment", ->

      it "parallel lines do not intersect", ->
        hx._.drawing.horizontalLineIntersection(10, 15, 20, 15, 10, 20, 16).should.equal(false)

      it "parallel lines do actually intersect, if they overlap", ->
        hx._.drawing.horizontalLineIntersection(-5, 0, 5, 0, 0, 5, 0).should.equal(true)

      it "horizontal parallel lines don't intersect, if they don't overlap", ->
        hx._.drawing.horizontalLineIntersection(-5, 0, 5, 0, 10, 15, 0).should.equal(false)

      it "line segments that are not long enough to intersect (but would intersect if longer)", ->
        hx._.drawing.horizontalLineIntersection(-5, -5, 5, 5, -5, -1, 0).should.equal(false)

      it "intersecting segments should return true", ->
        hx._.drawing.horizontalLineIntersection(-5, -5, 5, 5, -5, 5, 0).should.equal(true)


    describe "line-segment vs vertical line-segment", ->

      it "parallel lines do not intersect", ->
        hx._.drawing.verticalLineIntersection(15, 10, 15, 20, 10, 20, 16).should.equal(false)

      it "parallel lines do actually intersect, if they overlap", ->
        hx._.drawing.verticalLineIntersection(0, -5, 0, 5, 0, 5, 0).should.equal(true)

      it "vertical parallel lines don't intersect, if they don't overlap", ->
        hx._.drawing.verticalLineIntersection(0, -5, 0, 5, 10, 15, 0).should.equal(false)

      it "line segments that are not long enough to intersect (but would intersect if longer)", ->
        hx._.drawing.verticalLineIntersection(-5, -5, 5, 5, -5, -1, 0).should.equal(false)

      it "intersecting segments should return true", ->
        hx._.drawing.verticalLineIntersection(-5, -5, 5, 5, -5, 5, 0).should.equal(true)

