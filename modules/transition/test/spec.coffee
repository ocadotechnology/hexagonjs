transition = require('../main')
fakeTime = require('test/utils/fake-time')

describe 'hx-transition', ->
  savedHxLoop = transition.loop

  clock = undefined
  beforeEach ->
    clock = fakeTime.installFakeTimers()
    # mock transition.loop
    hx_requestAnimationFrame = (f) -> setTimeout(f, 1)
    hx_loop_update = (f, g) -> if not f() then hx_requestAnimationFrame(g)
    savedHxLoop = transition.loop
    transition.loop = (f) ->
      g = -> hx_loop_update(f, g)
      hx_loop_update(f, g)

    baseTime = new Date(2013, 0, 1)

  afterEach ->
    transition.loop = savedHxLoop
    clock.restore()

  it 'transition.loop: should not loop if true is returned', ->
    count = 0
    cb = ->
      count++
      true
    transition.loop cb
    clock.tick(5)
    count.should.equal(1)

  it 'transition.loop: should not loop if true is returned', ->
    count = 0
    cb = ->
      count++
      count==2
    transition.loop cb
    clock.tick(5)
    count.should.equal(2)

  it 'transition.ease: linear', ->
    transition.ease.linear(0.5).should.equal(0.5)
    transition.ease.linear(0).should.equal(0)
    transition.ease.linear(1).should.equal(1)
    transition.ease.linear(0.75).should.equal(0.75)

  it 'transition.ease: quad', ->
    transition.ease.quad(0.5).should.equal(0.25)
    transition.ease.quad(0).should.equal(0)
    transition.ease.quad(1).should.equal(1)
    transition.ease.quad(0.75).should.be.closeTo(0.5625, 0.0001)

  it 'transition.ease: cubic', ->
    transition.ease.cubic(0.5).should.equal(0.125)
    transition.ease.cubic(0).should.equal(0)
    transition.ease.cubic(1).should.equal(1)
    transition.ease.cubic(0.75).should.be.closeTo(0.421875, 0.000001)

  it 'transition.transition: should call the callback the right number of times', ->
    count = 0
    end = false
    transition.transition 5, (-> count++), undefined, ->
      end = true
    clock.tick(5)
    end.should.equal(true)
    count.should.be.above(1)

  it 'transition.transition: should be fine without an end callback', ->
    count = 0
    transition.transition(5, (-> count++))
    clock.tick(5)
    count.should.be.above(1)

  it 'transition.transition: should call the callback with the right values', ->
    values = []
    cb = (d) ->
      values.push d

    transition.transition 60, cb, transition.ease.linear

    clock.tick(60)

    values.should.eql(values.slice().sort()) # check the values are ascending
    values[values.length-1].should.equal(1)


  it 'transition.transition: should call the end callback', ->
    called = false
    transition.transition 1, (->), undefined, (cancelled) ->
      cancelled.should.equal(false)
      called = true

    clock.tick(1)
    called.should.equal(true)

  it 'transition.transition: cancelling should work', ->
    can = false
    stop = transition.transition 1000, (->), undefined, (cancelled) ->
      can = cancelled

    stop()
    clock.tick(1)
    can.should.equal(true)

  it 'transition.transition: giving negative duration should result in the transition instantly finishing', (done) ->
    stop = transition.transition -1000, (->), undefined, (cancelled) ->
      cancelled.should.equal(false)
      done()

  it 'transition.transition: giving negative duration should result in the transition instantly finishing', ->
    value = -1
    transition.transition -1000, ((v) -> value = v), undefined
    clock.tick(1)
    value.should.equal(1)
