import { range } from 'utils'
import { PivotTable } from 'pivot-table'
import { div } from 'selection'
import chai from 'chai'

export default () => {
  const should = chai.should()

  describe('Pivot Table', () => {
    it('should have the correct default options', () => {
      const pt = new PivotTable(div())

      pt.options.stickyHeaders.should.equal(true)
      should.not.exist(pt.options.topLeftCellRender)
      pt.options.cellRender.should.be.a('function')
      pt.options.useResponsive.should.equal(true)
      should.not.exist(pt.options.data)
      should.not.exist(pt.options.fullWidth)
    })

    it('should not mutate the data', () => {
      const topHead = range(8)
      const leftHead = range(8)
      const body = range(8).map(x => range(8).map(y => x * y))

      const data = {
        body,
        leftHead,
        topHead
      }

      const pt = new PivotTable(div(), {
        data
      })
      topHead.should.eql([0, 1, 2, 3, 4, 5, 6, 7])
      leftHead.should.eql([0, 1, 2, 3, 4, 5, 6, 7])

      pt.data().should.not.equal(data)
      pt.data().should.eql(data)
      pt.data(pt.data()).should.equal(pt)
    })

    it('should pass the fullWidth option through to the sticky table', () => {
      const topHead = range(2)
      const leftHead = range(2)
      const body = range(2).map(x => range(2).map(y => x * y))

      const data = {
        body,
        leftHead,
        topHead
      }

      const pt = new PivotTable(div(), {
        data,
        fullWidth: true
      })

      pt.options.fullWidth.should.equal(true)
      pt.stickyTableHeaders._.options.fullWidth.should.equal(true)
    })

    it('should use the fullWidth option when sticky tables are disabled', () => {
      const topHead = range(2)
      const leftHead = range(2)
      const body = range(2).map(x => range(2).map(y => x * y))

      const data = {
        body,
        leftHead,
        topHead
      }

      const sel = div()

      const pt = new PivotTable(sel.node(), {
        data,
        fullWidth: true,
        stickyHeaders: false
      })

      pt.options.fullWidth.should.equal(true)
      should.not.exist(pt.stickyTableHeaders)
      sel.selectAll('.hx-table-full').size().should.equal(1)
    })
  })
}
