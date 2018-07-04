
import { div } from 'selection'
import { DateTimePicker } from 'date-time-picker'

export default () => {
  describe('date-time-picker', () => {
    describe('return types:', () => {
      describe('should return this for getter setters with parameters:', () => {
        it('date', () => {
          const dp = new DateTimePicker(div())
          dp.date(new Date()).should.equal(dp)
        })
        it('day', () => {
          const dp = new DateTimePicker(div())
          dp.day(10).should.equal(dp)
        })
        it('hour', () => {
          const dp = new DateTimePicker(div())
          dp.hour(10).should.equal(dp)
        })
        it('minute', () => {
          const dp = new DateTimePicker(div())
          dp.minute(10).should.equal(dp)
        })
        it('month', () => {
          const dp = new DateTimePicker(div())
          dp.month(10).should.equal(dp)
        })
        it('second', () => {
          const dp = new DateTimePicker(div())
          dp.second(10).should.equal(dp)
        })
        it('year', () => {
          const dp = new DateTimePicker(div())
          dp.year(10).should.equal(dp)
        })
        it('locale', () => {
          const dp = new DateTimePicker(div())
          dp.locale('en-GB').should.equal(dp)
        })
        it('disabled', () => {
          const dp = new DateTimePicker(div())
          dp.disabled(true).should.equal(dp)
        })
      })

      describe('should return values for setter/getters without parameters:', () => {
        it('date', () => {
          const dp = new DateTimePicker(div())
          const date = new Date()
          dp.date(date).date().should.eql(date)
        })

        it('day', () => {
          const dp = new DateTimePicker(div())
          dp.day(10).day().should.equal(10)
        })
        it('hour', () => {
          const dp = new DateTimePicker(div())
          dp.hour(10).hour().should.equal(10)
        })
        it('minute', () => {
          const dp = new DateTimePicker(div())
          dp.minute(10).minute().should.equal(10)
        })
        it('month', () => {
          const dp = new DateTimePicker(div())
          dp.month(10).month().should.equal(10)
        })
        it('second', () => {
          const dp = new DateTimePicker(div())
          dp.second(10).second().should.equal(10)
        })
        it('year', () => {
          const dp = new DateTimePicker(div())
          dp.year(10).year().should.equal(10)
        })
        it('locale', () => {
          const dp = new DateTimePicker(div())
          dp.locale('en-GB').locale().should.equal('en-GB')
        })
        it('disabled', () => {
          const dp = new DateTimePicker(div())
          dp.disabled(true).disabled().should.equal(true)
        })
      })
    })
  })
}
