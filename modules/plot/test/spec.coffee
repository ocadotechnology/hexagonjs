
import { userFacingText } from 'user-facing-text/main'

import utilsTests from './utils.spec'
import pieChartTests from './pie-chart.spec'
import sparklineTests from './sparkline.spec'

export default () ->
  describe "plot", ->
    it 'should have user facing text defined', ->
      userFacingText('plot','noData').should.equal('No Data')

    utilsTests()
    pieChartTests()
    sparklineTests()

    # require('./graph.spec')
    # require('./axis.spec')
    # require('./series.spec')