import {
  Drawing,
  Circle,
  Rectangle,
  Grid,
  Composite,
  Line,
  Shape,
  Text,
  pointRectangleIntersection,
  lineIntersection,
  horizontalLineIntersection,
  verticalLineIntersection,
} from 'components/drawing'

import chai from 'chai'

export default () ->
  describe "hx-drawing", ->
    should = chai.should()

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

        drawing = new Drawing(document.createElement('div'))

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

    describe "Circle", ->

      it "Should calculate the bounding rect correctly", ->
        circle = new Circle
        circle.set('position.x', 10)
        circle.set('position.y', 10)
        circle.set('radius', 20)

        bb = circle.getBoundingBox()
        bb.should.eql([-10, -10, 30, 30])

      describe "Set + Get", ->
        testSetGet 'position.x', [10, -10],  -> Circle
        testSetGet 'position.y', [10, -10], -> Circle
        testSetGet 'radius', [10, 100],  -> Circle
        testSetGet 'fill.enabled', [true, false], -> Circle
        testSetGet 'outline.enabled', [true, false], -> Circle
        testSetGet 'outline.width', [0.5, 10], -> Circle
        testSetGet 'selectable', [true, false], -> Circle
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Circle
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Circle


    describe "Grid", ->

      it "Should calculate the bounding rect correctly", ->
        grid = new Grid
        grid.set('position.x', 10)
        grid.set('position.y', 20)
        grid.set('gridSize.x', 5)
        grid.set('gridSize.y', 6)
        grid.set('cellSize.x', 11)
        grid.set('cellSize.y', 12)

        bb = grid.getBoundingBox()
        bb.should.eql([10, 20, 10 + 5* 11, 20 + 6 * 12])

      describe "Set + Get", ->
        testSetGet 'position.x', [10, -10],  -> Grid
        testSetGet 'position.y', [10, -10], -> Grid
        testSetGet 'cellSize.x', [10, 100],  -> Grid
        testSetGet 'cellSize.y', [10, 100], -> Grid
        testSetGet 'gridSize.x', [10, 100],  -> Grid
        testSetGet 'gridSize.y', [10, 100], -> Grid

        testSetGet 'gridLines.enabled', [true, false], -> Grid
        testSetGet 'gridLines.width', [0.5, 10], -> Grid

        testSetGet 'cells.states', [[true, false], [false, true]], -> Grid
        testSetGet 'cells.enabled', [true, false], -> Grid

        testSetGet 'cells.palette', [['not', 'a', 'real', 'color', 'palette']], -> Grid
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Grid
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Grid

    describe "Line", ->

      it "Should calculate the bounding rect correctly", ->
        line = new Line
        line.set('start.x', 10)
        line.set('start.y', 20)
        line.set('end.x', 30)
        line.set('end.y', 40)

        bb = line.getBoundingBox()
        bb.should.eql([10, 20, 30, 40])

      describe "Set + Get", ->
        testSetGet 'start.x', [10, -10],  -> Line
        testSetGet 'start.y', [10, -10], -> Line
        testSetGet 'end.x', [10, -10],  -> Line
        testSetGet 'end.y', [10, -10], -> Line
        testSetGet 'width', [10, 100],  -> Line
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Line
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Line


    describe "Rectangle", ->

      it "Should calculate the bounding rect correctly", ->
        rectangle = new Rectangle
        rectangle.set('position.x', 10)
        rectangle.set('position.y', 20)
        rectangle.set('width', 30)
        rectangle.set('height', 40)

        bb = rectangle.getBoundingBox()
        bb.should.eql([10, 20, 40, 60])

      describe "Set + Get", ->
        testSetGet 'position.x', [10, -10],  -> Rectangle
        testSetGet 'position.y', [10, -10], -> Rectangle
        testSetGet 'width', [10, 100],  -> Rectangle
        testSetGet 'height', [10, 100], -> Rectangle
        testSetGet 'fill.enabled', [true, false], -> Rectangle
        testSetGet 'outline.enabled', [true, false], -> Rectangle
        testSetGet 'outline.width', [0.5, 10], -> Rectangle
        testSetGet 'selectable', [true, false], -> Rectangle
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Rectangle
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Rectangle

    describe "Text", ->

      # how should this one work?
      #it "Should calculate the bounding rect correctly", ->


      describe "Set + Get", ->
        testSetGet 'position.x', [10, -10],  -> Text
        testSetGet 'position.y', [10, -10], -> Text
        testSetGet 'text', ["hello", "goodbye"],  -> Text
        testSetGet 'text', [12, 24],  -> Text
        testSetGet 'text', ['font1', 'font2'],  -> Text
        testSetGet 'align.x', ['start', 'end'], -> Text
        testSetGet 'align.y', ['start', 'end'], -> Text
        testSetGet 'selectable', [true, false], -> Text
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Text
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Text

    describe "Shape", ->

      it "Should calculate the bounding rect for polygon shapes", ->
        shape = new Shape
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
        shape = new Shape
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
        shape = new Shape
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
        testSetGet 'position.x', [10, -10],  -> Shape
        testSetGet 'position.y', [10, -10], -> Shape
        testSetGet 'curve', [[[10, 10, 20, 20], [10, 10, 20, 20]]],  -> Shape
        testSetGet 'polygon', [[[20, 20], [10, 10]]],  -> Shape
        testSetGet 'fill.enabled', [true, false], -> Shape
        testSetGet 'outline.enabled', [true, false], -> Shape
        testSetGet 'outline.width', [0.5, 10], -> Shape
        testSetGet 'selectable', [true, false], -> Shape
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Shape
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Shape

    describe "Composite", ->
      it "Create all drawing objects as children", ->
        (->
          composite = new Composite

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
          composite = new Composite

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
        testSetGet 'position.x', [10, -10],  -> Composite
        testSetGet 'position.y', [10, -10], -> Composite
        testSetGet 'angle', [10, -10], -> Composite
        testSetGet 'scale', [2, 10], -> Composite
        testSetGet 'selectable', [true, false], -> Composite
        testSetGet 'attr.test', [true, false, 1, 'attrvalue'], -> Composite
        testUndefinedSetGet 'attrthatshouldnotbeset', -> Composite

    describe "Collision checking", ->

      describe "line-segment vs line-segment", ->

        it "parallel lines do not intersect", ->
          lineIntersection(10, 10, 20, 20, 15, 10, 25, 20).should.equal(false)

        it "line segments that are not long enough to intersect (but would intersect if longer)", ->
          lineIntersection(0, 0, 10, 10, 0, 10, 4, 6).should.equal(false)

        it "intersecting segments should return true", ->
          lineIntersection(0, 0, 10, 10, 0, 10, 10, 0).should.equal(true)


      describe "point vs rectangle", ->

        it "point outside rectangle", ->
          pointRectangleIntersection(20, 0, -5, -5, 5, 5).should.equal(false)

        it "point inside rectangle", ->
          pointRectangleIntersection(0, 0, -5, -5, 5, 5).should.equal(true)

        it "point on rectangle corner", ->
          pointRectangleIntersection(5, 5, -5, -5, 5, 5).should.equal(true)

        it "point on rectangle edge", ->
          pointRectangleIntersection(5, 0, -5, -5, 5, 5).should.equal(true)


      describe "line-segment vs horizontal line-segment", ->

        it "parallel lines do not intersect", ->
          horizontalLineIntersection(10, 15, 20, 15, 10, 20, 16).should.equal(false)

        it "parallel lines do actually intersect, if they overlap", ->
          horizontalLineIntersection(-5, 0, 5, 0, 0, 5, 0).should.equal(true)

        it "horizontal parallel lines don't intersect, if they don't overlap", ->
          horizontalLineIntersection(-5, 0, 5, 0, 10, 15, 0).should.equal(false)

        it "line segments that are not long enough to intersect (but would intersect if longer)", ->
          horizontalLineIntersection(-5, -5, 5, 5, -5, -1, 0).should.equal(false)

        it "intersecting segments should return true", ->
          horizontalLineIntersection(-5, -5, 5, 5, -5, 5, 0).should.equal(true)


      describe "line-segment vs vertical line-segment", ->

        it "parallel lines do not intersect", ->
          verticalLineIntersection(15, 10, 15, 20, 10, 20, 16).should.equal(false)

        it "parallel lines do actually intersect, if they overlap", ->
          verticalLineIntersection(0, -5, 0, 5, 0, 5, 0).should.equal(true)

        it "vertical parallel lines don't intersect, if they don't overlap", ->
          verticalLineIntersection(0, -5, 0, 5, 10, 15, 0).should.equal(false)

        it "line segments that are not long enough to intersect (but would intersect if longer)", ->
          verticalLineIntersection(-5, -5, 5, 5, -5, -1, 0).should.equal(false)

        it "intersecting segments should return true", ->
          verticalLineIntersection(-5, -5, 5, 5, -5, 5, 0).should.equal(true)

