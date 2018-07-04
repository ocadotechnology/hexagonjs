import { range } from 'utils'
import { PivotTable } from 'pivot-table'
import { div } from 'selection'
import chai from 'chai'


export default () ->
  should = chai.should()

  describe 'Pivot Table', ->
    it 'should have the correct default options', ->
      topHead = range(2)
      leftHead = range(2)
      body = range(2).map (x) ->
        range(2).map (y) -> x * y

      data = {
        body: body,
        leftHead: leftHead,
        topHead: topHead
      }

      pt = new PivotTable(div())

      pt.options.stickyHeaders.should.equal(true)
      should.not.exist(pt.options.topLeftCellRender)
      pt.options.cellRender.should.be.a('function')
      pt.options.useResponsive.should.equal(true)
      should.not.exist(pt.options.data)
      should.not.exist(pt.options.fullWidth)

    it 'should not mutate the data', ->
      topHead = range(8)
      leftHead = range(8)
      body = range(8).map (x) ->
        range(8).map (y) -> x * y

      data = {
        body: body,
        leftHead: leftHead,
        topHead: topHead
      }

      pt = new PivotTable(div(), {
        data: data
      })
      topHead.should.eql([0,1,2,3,4,5,6,7])
      leftHead.should.eql([0,1,2,3,4,5,6,7])

      pt.data().should.not.equal(data)
      pt.data().should.eql(data)
      pt.data(pt.data()).should.equal(pt)

    it 'should pass the fullWidth option through to the sticky table', ->
      topHead = range(2)
      leftHead = range(2)
      body = range(2).map (x) ->
        range(2).map (y) -> x * y

      data = {
        body: body,
        leftHead: leftHead,
        topHead: topHead
      }

      pt = new PivotTable(div(), {
        data: data
        fullWidth: true
      })

      pt.options.fullWidth.should.equal(true)
      pt.stickyTableHeaders._.options.fullWidth.should.equal(true)

    it 'should use the fullWidth option when sticky tables are disabled', ->
      topHead = range(2)
      leftHead = range(2)
      body = range(2).map (x) ->
        range(2).map (y) -> x * y

      data = {
        body: body,
        leftHead: leftHead,
        topHead: topHead
      }

      sel = div()

      pt = new PivotTable(sel.node(), {
        data: data
        fullWidth: true
        stickyHeaders: false
      })

      pt.options.fullWidth.should.equal(true)
      should.not.exist(pt.stickyTableHeaders)
      sel.selectAll('.hx-table-full').size().should.equal(1)
