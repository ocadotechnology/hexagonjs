import chai from 'chai'

import { select, div } from 'utils/selection'

import { Graph } from './graph'
import { LineSeries } from './series/line-series'
import { BandSeries } from './series/band-series'
import { ScatterSeries } from './series/scatter-series'
import { BarSeries } from './series/bar-series'
import { StraightLineSeries } from './series/straight-line-series'


export default () ->
  

  checkOptionAndSetterGetter = (SeriesType, property, valuesToCheck) ->

    it 'setter/getter ' + property + ' should set and get correctly', ->
      should = chai.should()
      series = new SeriesType
      valuesToCheck.forEach (v) ->
        series[property](v).should.equal(series)
        if v?
          series[property]().should.eql(v)
        else
          should.not.exist(series[property]())

    it 'option ' + property + ' should get passed through as the initial value', ->
      should = chai.should()
      valuesToCheck.forEach (v) ->
        opts = {}
        opts[property] = v
        series = new SeriesType(opts)
        if v?
          series[property]().should.eql(v)
        else
          should.not.exist(series[property]())

  describe "series", ->

    describe "LineSeries", ->

      checkOptionAndSetterGetter(LineSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(LineSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(LineSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(LineSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(LineSeries, 'strokeEnabled', [true, false])
      checkOptionAndSetterGetter(LineSeries, 'strokeColor', ['rgba(1, 2, 3, 0.5)', 'red', [{ yValue: -4, color: 'red' }, {yValue: 4, color: 'green'}]])
      checkOptionAndSetterGetter(LineSeries, 'fillEnabled', [true, false])
      checkOptionAndSetterGetter(LineSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red', undefined])
      checkOptionAndSetterGetter(LineSeries, 'markersEnabled', [true, false])
      checkOptionAndSetterGetter(LineSeries, 'markerFillColor', ['rgba(1, 2, 3, 0.5)', 'red', undefined])
      checkOptionAndSetterGetter(LineSeries, 'markerRadius', [0, 5, 120])
      checkOptionAndSetterGetter(LineSeries, 'sampleThreshold', [100, 200, undefined])
      checkOptionAndSetterGetter(LineSeries, 'group', ['group1', 'group2'])


    describe "ScatterSeries", ->

      checkOptionAndSetterGetter(ScatterSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(ScatterSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(ScatterSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(ScatterSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(ScatterSeries, 'radius', [2, 4, 6, 8])
      checkOptionAndSetterGetter(ScatterSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red'])


    describe "BandSeries", ->

      checkOptionAndSetterGetter(BandSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(BandSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(BandSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(BandSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(BandSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red'])
      checkOptionAndSetterGetter(BandSeries, 'sampleThreshold', [100, 200, undefined])


    describe "StraightLineSeries", ->

      checkOptionAndSetterGetter(StraightLineSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(StraightLineSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(StraightLineSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(StraightLineSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(StraightLineSeries, 'strokeColor', [
        'rgba(1, 2, 3, 0.5)'
        'red'
        [{
          yValue: -4
          color: 'red'
        }
        {
          yValue: 4
          color: 'green'
        }]
      ])

    describe "BarSeries", ->

      checkOptionAndSetterGetter(BarSeries, 'class', ['class1', 'class1 class2', undefined])
      checkOptionAndSetterGetter(BarSeries, 'title', ['title-1', 'title-2'])
      checkOptionAndSetterGetter(BarSeries, 'labelsEnabled', [true, false])
      checkOptionAndSetterGetter(BarSeries, 'labelRenderer', [(->), (x) -> x])

      checkOptionAndSetterGetter(BarSeries, 'fillColor', ['rgba(1, 2, 3, 0.5)', 'red', undefined])
      checkOptionAndSetterGetter(BarSeries, 'group', ['group1', 'group2'])

    describe "render", ->
      it 'should display when the height is positive', ->
        selection = div().style('height', '400px')
        select('body').add(selection)
        graph = new Graph(selection)
        axis = graph.addAxis('linear', 'linear')
        a1 = axis.addSeries()
        graph.render()
        selection.selectAll('.hx-series').size().should.equal(2)
        selection.remove()

      it 'should display when the height is positive using fluent api', ->
        graphOptions = {
          axes: [
            series: [
              { type: 'line' }
            ],
            x: {
              type: 'linear'
            },
            y: {
              type: 'linear'
            }
          ]
        }
        selection = div().style('height', '400px')
        graph = new Graph(selection, graphOptions)
        select('body').add(selection)
        graph.render()
        selection.selectAll('.hx-series').size().should.equal(2)
        selection.remove()
