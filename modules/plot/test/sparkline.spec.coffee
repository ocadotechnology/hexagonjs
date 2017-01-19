Sparkline = require('../main/sparkline')
select = require('modules/selection/main')

describe 'Sparkline', ->
  it 'should use the correct default value for redrawOnResize', ->
    sparkLine = new Sparkline(select.detached('div').node())
    sparkLine._.graph.redrawOnResize().should.equal(true)
    sparkLine.redrawOnResize().should.equal(true)

  it 'should pass the redrawOnResize option to its Graph', ->
    sparkLine = new Sparkline(select.detached('div').node(), redrawOnResize: false)
    sparkLine._.graph.redrawOnResize().should.equal(false)
    sparkLine.redrawOnResize().should.equal(false)
    sparkLine.redrawOnResize(true)
    sparkLine._.graph.redrawOnResize().should.equal(true)
    sparkLine.redrawOnResize().should.equal(true)

  it 'should set the min value properly', ->
    sparkLine = new Sparkline(select.detached('div').node(), {min: 5})
    sparkLine._.graph.axes()[0].y.min().should.equal(5)

  it 'should set the max value properly', ->
    sparkLine = new Sparkline(select.detached('div').node(), {max: 5})
    sparkLine._.graph.axes()[0].y.max().should.equal(5)

  it 'should use auto for the default min/max values', ->
    sparkLine = new Sparkline(select.detached('div').node())
    sparkLine._.graph.axes()[0].y.min().should.equal('auto')
    sparkLine._.graph.axes()[0].y.max().should.equal('auto')
