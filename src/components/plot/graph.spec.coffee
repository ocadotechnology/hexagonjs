import chai from 'chai'

import { select, div } from 'utils/selection'

import { Graph } from './graph'
import { Axis } from './axis'

import { emit } from 'test/utils/fake-event'

export default () ->
  describe "Graph", ->
    describe 'setter/getters should work', ->
      checkSetterGetterAndOption = (property, valuesToCheck) ->
        it 'property ' + property + ' should set and get correctly', ->
          valuesToCheck.forEach (v) ->
            graph = new Graph(div())
            graph[property](v).should.equal(graph)
            graph[property]().should.equal(v)

        it 'option ' + property + ' should get passed through', ->
          valuesToCheck.forEach (v) ->
            opts = {}
            opts[property] = v
            graph = new Graph(div(), opts)
            graph[property]().should.equal(v)

      checkSetterGetterAndOption('zoomRangeStart', [0, 0.5, 1])
      checkSetterGetterAndOption('zoomRangeEnd', [0, 0.5, 1])
      checkSetterGetterAndOption('zoomEnabled', [true, false])
      checkSetterGetterAndOption('labelsEnabled', [true, false])
      checkSetterGetterAndOption('legendEnabled', [true, false])
      checkSetterGetterAndOption('legendLocation', ['auto', 'thingthatisnotavalidoption'])

      it 'should be able to get the list of axes', ->
        graph = new Graph(div())
        a1 = graph.addAxis()
        a2 = graph.addAxis()
        graph.axes().should.eql([a1, a2])

      it 'should be able to set the list of axes', ->
        graph = new Graph(div())
        a1 = graph.addAxis()
        a2 = graph.addAxis()
        graph.axes().should.eql([a1, a2])
        graph.axes([a2, a1]).should.eql(graph)
        graph.axes().should.eql([a2, a1])

    it 'constructing an axis with addAxis should work', ->
      graph = new Graph(div())
      axis = graph.addAxis()
      axis.x.scaleType().should.equal('linear')
      axis.y.scaleType().should.equal('linear')

      graph = new Graph(div())
      axis = graph.addAxis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}})
      axis.x.scaleType().should.equal('discrete')
      axis.y.scaleType().should.equal('time')

      graph = new Graph(div())
      axis = graph.addAxis(new Axis({x: {scaleType: 'discrete'}, y: {scaleType: 'time'}}))
      axis.x.scaleType().should.equal('discrete')
      axis.y.scaleType().should.equal('time')

    it 'should not redraw on resize when told not to', ->
      selection = div()
        .style('width', '500px')
        .style('height', '500px')
      select('body').add(selection)
      graph = new Graph(selection, redrawOnResize: false)
      axis = graph.addAxis(x: { title: 'foo' }, y: { title: 'bar' })
      axis.addSeries('line', data: [{ x: 0, y: 1 }])
      graph.render()

      renderSpy = chai.spy()
      graph.on('render', renderSpy)
      selection.style('width', '400px')
      emit(selection.node(), 'resize')
      renderSpy.should.not.have.been.called()
      selection.remove()

    it 'should redraw on resize by default', ->
      selection = div()
        .style('width', '500px')
        .style('height', '500px')
      select('body').add(selection)
      graph = new Graph(selection)
      axis = graph.addAxis(x: {title: 'foo'}, y: {title: 'bar'})
      axis.addSeries('line', data: [{x: 0, y: 1}])
      graph.render()

      renderCount = 0
      graph.on('render', () -> renderCount++)
      selection.style('width', '400px')
      emit(selection.node(), 'resize')
      renderCount.should.equal(1)
      selection.remove()
