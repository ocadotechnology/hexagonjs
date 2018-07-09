import { loop, transition, ease } from 'transition'
import { installFakeTimers } from 'test/utils/fake-time'

export default () => {
  describe('transition', () => {
    let clock = undefined

    beforeEach(() => {
      clock = installFakeTimers()
    })

    afterEach(() => {
      clock.restore()
    })

    describe('loop', () => {
      it('should not loop if true is returned', () => {
        let count = 0
        loop(() => {
          count++
          return true
        })
        clock.tick(5)
        clock.tick(5)
        clock.tick(5)
        count.should.equal(1)
      })

      it('should not loop if true is returned', () => {
        let count = 0
        loop(() => {
          count++
          return count === 2
        })
        clock.tick(5)
        clock.tick(5)
        clock.tick(5)
        count.should.equal(2)
      })
    })

    describe('ease', () => {
      it('linear does the right thing', () => {
        ease.linear(0.5).should.equal(0.5)
        ease.linear(0).should.equal(0)
        ease.linear(1).should.equal(1)
        ease.linear(0.75).should.equal(0.75)
      })

      it('quad does the right thing', () => {
        ease.quad(0.5).should.equal(0.25)
        ease.quad(0).should.equal(0)
        ease.quad(1).should.equal(1)
        ease.quad(0.75).should.be.closeTo(0.5625, 0.0001)
      })

      it('cubic does the right thing', () => {
        ease.cubic(0.5).should.equal(0.125)
        ease.cubic(0).should.equal(0)
        ease.cubic(1).should.equal(1)
        ease.cubic(0.75).should.be.closeTo(0.421875, 0.000001)
      })
    })

    describe('transition', () => {
      it('calls the callback the right number of times', () => {
        let count = 0
        let end = false
        function cb () {
          count++
        }
        transition(5, cb, undefined, () => {
          end = true
        })
        clock.tick(5)
        clock.tick(5)
        end.should.equal(true)
        count.should.be.above(1)
      })

      it('is fine without an end callback', () => {
        let count = 0
        transition(5, () => {
          count++
        })
        clock.tick(5)
        clock.tick(5)
        count.should.be.above(1)
      })

      it('calls the callback with the right values', () => {
        const values = []
        function cb (d) {
          values.push(d)
        }

        transition(60, cb, ease.linear)

        clock.tick(60)
        clock.tick(60)

        values.should.eql(values.slice().sort()) // check the values are ascending
        values[values.length - 1].should.equal(1)
      })

      it('calls the end callback', () => {
        let called = false
        function cb () {}
        transition(1, cb, undefined, (cancelled) => {
          cancelled.should.equal(false)
          called = true
        })

        clock.tick(1)
        clock.tick(1)
        called.should.equal(true)
      })

      it('cancelling should work', () => {
        let can = false
        function cb () {}

        const stop = transition(1000, cb, undefined, (cancelled) => {
          can = cancelled
        })

        stop()
        clock.tick(1)
        can.should.equal(true)
      })

      it('giving negative duration should result in the transition instantly finishing', (done) => {
        function cb () {}

        transition(-1000, cb, undefined, (cancelled) => {
          cancelled.should.equal(false)
          done()
        })
      })

      it('giving negative duration should result in the transition instantly finishing', () => {
        let value = -1
        function cb (v) {
          value = v
        }
        transition(-1000, cb, undefined)
        clock.tick(1)
        value.should.equal(1)
      })
    })
  })
}
