
import { userFacingText } from 'user-facing-text/main'

import utilsTests from './utils.spec'
import pieChartTests from './pie-chart.spec'
import sparklineTests from './sparkline.spec'
import seriesTests from './series.spec'
import axisTests from './axis.spec'
import graphTests from './graph.spec'

export default () ->
  describe "plot", ->
    it 'should have user facing text defined', ->
      userFacingText('plot','noData').should.equal('No Data')

    utilsTests()
    pieChartTests()
    sparklineTests()
    seriesTests()
    axisTests()
    graphTests()
