Graph = require('../main/graph')
Axis = require('../main/axis')
select = require('modules/selection/main')

chai = require('chai')
emitEvent = require('test/utils/emit-event')

describe "Graph", ->
  describe 'setter/getters should work', ->
    checkSetterGetterAndOption = (property, valuesToCheck) ->
      it 'property ' + property + ' should set and get correctly', ->
        valuesToCheck.forEach (v) ->
          graph = new Graph(select.detached('div').node())
          graph[property](v).should.equal(graph)
          graph[property]().should.equal(v)

      it 'option ' + property + ' should get passed through', ->
        valuesToCheck.forEach (v) ->
          opts = {}
          opts[property] = v
          graph = new Graph(select.detached('div').node(), opts)
          graph[property]().should.equal(v)

    checkSetterGetterAndOption('zoomRangeStart', [0, 0.5, 1])
    checkSetterGetterAndOption('zoomRangeEnd', [0, 0.5, 1])
    checkSetterGetterAndOption('zoomEnabled', [true, false])
    checkSetterGetterAndOption('labelsEnabled', [true, false])
    checkSetterGetterAndOption('legendEnabled', [true, false])
    checkSetterGetterAndOption('legendLocation', ['auto', 'thingthatisnotavalidoption'])

    it 'should be able to get the list of axes', ->
      graph = new Graph(select.detached('div').node())
      a1 = graph.addAxis()
      a2 = graph.addAxis()
      graph.axes().should.eql([a1, a2])

    it 'should be able to set the list of axes', ->
      graph = new Graph(select.detached('div').node())
      a1 = graph.addAxis()
      a2 = graph.addAxis()
      graph.axes().should.eql([a1, a2])
      graph.axes([a2, a1]).should.eql(graph)
      graph.axes().should.eql([a2, a1])

  it 'constructing an axis with addAxis should work', ->
    graph = new Graph(select.detached('div').node())
    axis = graph.addAxis()
    axis.x.scaleType().should.equal('linear')
    axis.y.scaleType().should.equal('linear')

    graph = new Graph(select.detached('div').node())
    axis = graph.addAxis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}})
    axis.x.scaleType().should.equal('discrete')
    axis.y.scaleType().should.equal('time')

    graph = new Graph(select.detached('div').node())
    axis = graph.addAxis(new Axis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}}))
    axis.x.scaleType().should.equal('discrete')
    axis.y.scaleType().should.equal('time')

  it 'should not redraw on resize when told not to', ->
    selection = hx.select('body').append('div')
      .style 'width', '500px'
      .style 'height', '500px'
    graph = new Graph(selection.node(), redrawOnResize: false)
    axis = graph.addAxis(x: { title: 'foo' }, y: { title: 'bar' })
    axis.addSeries('line', data: [{ x: 0, y: 1 }])
    graph.render()

    renderSpy = chai.spy()
    graph.on 'render', renderSpy
    selection.style 'width', '400px'
    emitEvent(selection.node(), 'resize')
    renderSpy.should.not.have.been.called()

  it 'should redraw on resize by default', ->
    selection = hx.select('body').append('div')
      .style 'width', '500px'
      .style 'height', '500px'
    graph = new Graph(selection.node())
    axis = graph.addAxis(x: {title: 'foo'}, y: {title: 'bar'})
    axis.addSeries('line', data: [{x: 0, y: 1}])
    graph.render()

    renderSpy = chai.spy()
    graph.on 'render', renderSpy
    selection.style 'width', '400px'
    emitEvent(selection.node(), 'resize')
    renderSpy.should.have.been.called()
