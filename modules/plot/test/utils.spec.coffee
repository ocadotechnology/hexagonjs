utils = require('../main/utils')

describe 'utils', ->
  array = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}]
  array2 = [{x: 1, y1: 4, y2: 3}, {x: 2, y1: 3, y2: 4}, {x: 3, y1: 5, y2: 5}]
  array3 = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 2}]

  it 'dataAverage: should return the average data point in an array', ->
    utils.dataAverage(array).should.eql({x: 2, y: 3})
    utils.dataAverage(array2).should.eql({x: 2, y1: 4, y2: 4})

  it 'maxTriangle: should return a data point', ->
    data1 = {x: 0, y: 0}
    data2 = {x: 4, y: 1}
    data3 = {x: 0, y1: 1, y2: 3}
    data4 = {x: 4, y1: 3, y2: 4}
    utils.maxTriangle(data1, array, data2).should.eql({x: 3, y: 4})
    utils.maxTriangle(data3, array2, data4).should.eql({x: 3, y1: 5, y2: 5})

  it 'LTTBFeather: should return a data array', ->
    utils.LTTBFeather(array, 3).should.eql(array)
    utils.LTTBFeather(array2, 3).should.eql(array2)
    utils.LTTBFeather(array, 2).should.eql([{x: 1, y: 2}, {x: 3, y: 4}])
    utils.LTTBFeather(array2, 2).should.eql([{x: 1, y1: 4, y2: 3}, {x: 3, y1: 5, y2: 5}])
    utils.LTTBFeather(array3, 3).should.eql([{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}])
    utils.LTTBFeather(array, 1).should.eql([{x: 2, y: 3}])
    utils.LTTBFeather(array, 0).should.eql([])
    utils.LTTBFeather([], 3).should.eql([])

  it 'splitAndFeather: should return a data array', ->
    utils.splitAndFeather(array, 3, (d)-> d.y != undefined).should.eql([array])
    utils.splitAndFeather(array2, 3, (d)-> d.y1 != undefined and d.y2 != undefined).should.eql([array2])
    utils.splitAndFeather(array3, 3, (d)-> d.y != undefined).should.eql([[{x: 1, y: 2}, {x: 3, y: 4}, {x: 4, y: 2}]])
