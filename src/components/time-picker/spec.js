import { div } from 'utils/selection'

import { TimePicker } from 'components/time-picker'

export default () => {
  describe('time-picker', () => {
    describe('api', () => {
      it('hour', () => {
        const tp = new TimePicker(div())
        tp.hour(5).should.equal(tp)
        tp.hour().should.equal(5)
      })

      it('minute', () => {
        const tp = new TimePicker(div())
        tp.minute(5).should.equal(tp)
        tp.minute().should.equal(5)
      })

      it('second', () => {
        const tp = new TimePicker(div())
        tp.second(5).should.equal(tp)
        tp.second().should.equal(5)
      })

      it('date', () => {
        const tp = new TimePicker(div())
        const date = new Date()
        tp.date(date).should.equal(tp)
        tp.date().should.eql(date)
      })

      it('locale', () => {
        const tp = new TimePicker(div())
        tp.locale('en-GB').should.equal(tp)
        tp.locale().should.equal('en-GB')
      })
    })
  })
}
