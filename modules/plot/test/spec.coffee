
import { userFacingText } from 'user-facing-text/main'

describe "plot", ->
  it 'should have user facing text defined', ->
    userFacingText('plot','noData').should.equal('No Data')

  # require('./utils.spec')
  # require('./graph.spec')
  # require('./axis.spec')
  # require('./series.spec')
  # require('./sparkline.spec')
  # require('./pie-chart.spec')
