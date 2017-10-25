import { Sparkline } from '../main/sparkline'
import { div } from 'selection/main'

export default () ->
  describe 'Sparkline', ->
    it 'should use the correct default value for redrawOnResize', ->
      sparkLine = new Sparkline(div())
      sparkLine._.graph.redrawOnResize().should.equal(true)
      sparkLine.redrawOnResize().should.equal(true)

    it 'should pass the redrawOnResize option to its Graph', ->
      sparkLine = new Sparkline(div(), redrawOnResize: false)
      sparkLine._.graph.redrawOnResize().should.equal(false)
      sparkLine.redrawOnResize().should.equal(false)
      sparkLine.redrawOnResize(true)
      sparkLine._.graph.redrawOnResize().should.equal(true)
      sparkLine.redrawOnResize().should.equal(true)

    it 'should set the min value properly', ->
      sparkLine = new Sparkline(div(), {min: 5})
      sparkLine._.graph.axes()[0].y.min().should.equal(5)

    it 'should set the max value properly', ->
      sparkLine = new Sparkline(div(), {max: 5})
      sparkLine._.graph.axes()[0].y.max().should.equal(5)

    it 'should use auto for the default min/max values', ->
      sparkLine = new Sparkline(div())
      sparkLine._.graph.axes()[0].y.min().should.equal('auto')
      sparkLine._.graph.axes()[0].y.max().should.equal('auto')
