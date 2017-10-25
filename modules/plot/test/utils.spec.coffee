import { range } from 'utils/main'
import { div, selectAll } from 'selection/main'
import {
  dataAverage,
  maxTriangle,
  LTTBFeather,
  splitAndFeather,
  doCollisionDetection
} from '../main/utils'

export default () ->
  describe 'utils', ->
    array = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}]
    array2 = [{x: 1, y1: 4, y2: 3}, {x: 2, y1: 3, y2: 4}, {x: 3, y1: 5, y2: 5}]
    array3 = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 2}]

    it 'dataAverage: should return the average data point in an array', ->
      dataAverage(array).should.eql({x: 2, y: 3})
      dataAverage(array2).should.eql({x: 2, y1: 4, y2: 4})

    it 'maxTriangle: should return a data point', ->
      data1 = {x: 0, y: 0}
      data2 = {x: 4, y: 1}
      data3 = {x: 0, y1: 1, y2: 3}
      data4 = {x: 4, y1: 3, y2: 4}
      maxTriangle(data1, array, data2).should.eql({x: 3, y: 4})
      maxTriangle(data3, array2, data4).should.eql({x: 3, y1: 5, y2: 5})

    it 'LTTBFeather: should return a data array', ->
      LTTBFeather(array, 3).should.eql(array)
      LTTBFeather(array2, 3).should.eql(array2)
      LTTBFeather(array, 2).should.eql([{x: 1, y: 2}, {x: 3, y: 4}])
      LTTBFeather(array2, 2).should.eql([{x: 1, y1: 4, y2: 3}, {x: 3, y1: 5, y2: 5}])
      LTTBFeather(array3, 3).should.eql([{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}])
      LTTBFeather(array, 1).should.eql([{x: 2, y: 3}])
      LTTBFeather(array, 0).should.eql([])
      LTTBFeather([], 3).should.eql([])

    it 'splitAndFeather: should return a data array', ->
      splitAndFeather(array, 3, (d)-> d.y != undefined).should.eql([array])
      splitAndFeather(array2, 3, (d)-> d.y1 != undefined and d.y2 != undefined).should.eql([array2])
      splitAndFeather(array3, 3, (d)-> d.y != undefined).should.eql([[{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}]])

    it 'doCollisionDetection: should hide text that gets in the way of other text', ->
      widthPx = 200
      intendedDistance = 2
      createSuspiciousElement = (i) ->
        div()
          .text(i)
          .style('left', "#{i * widthPx / intendedDistance}px")
          .style('width', "#{widthPx}px")
          .style('position', 'absolute')
          .node()

      suspiciousElements = range(4).map(createSuspiciousElement)
      suspiciousElementsSel = selectAll(suspiciousElements)

      expectedPrevText = ['0', '1', '2', '3']
      # Sense check
      suspiciousElementsSel.text().should.deep.equal expectedPrevText
      doCollisionDetection suspiciousElements

      expectedCurrText = expectedPrevText.map (val, i) -> if i % intendedDistance then '' else val
      suspiciousElementsSel.text().should.deep.equal expectedCurrText
