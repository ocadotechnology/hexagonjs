
import { userFacingText } from 'user-facing-text/main'

import utilsTests from './utils.spec'

export default () ->
  describe "plot", ->
    it 'should have user facing text defined', ->
      userFacingText('plot','noData').should.equal('No Data')

    utilsTests()

    # require('./graph.spec')
    # require('./axis.spec')
    # require('./series.spec')
    # require('./sparkline.spec')
    # require('./pie-chart.spec')
