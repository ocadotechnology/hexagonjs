describe 'hx-transition', ->
  savedHxLoop = hx.loop

  clock = undefined
  beforeAll -> clock = sinon.useFakeTimers()
  afterAll -> clock.restore()

  beforeEach ->
    # mock hx.loop
    hx_requestAnimationFrame = (f) ->
      setTimeout(f, 1)
    hx_loop_update = (f, g) -> if not f() then hx_requestAnimationFrame(g)
    savedHxLoop = hx.loop
    hx.loop = hx_loop = (f) ->
      g = -> hx_loop_update(f, g)
      hx_loop_update(f, g)

    baseTime = new Date(2013, 0, 1)


  afterEach ->
    hx.loop = savedHxLoop

  it 'hx.loop: should not loop if true is returned', ->
    count = 0
    cb = ->
      count++
      true
    hx.loop cb
    clock.tick(5)
    count.should.equal(1)

  it 'hx.loop: should not loop if true is returned', ->
    count = 0
    cb = ->
      count++
      count==2
    hx.loop cb
    clock.tick(5)
    count.should.equal(2)

  it 'hx.ease: linear', ->
    hx.ease.linear(0.5).should.equal(0.5)
    hx.ease.linear(0).should.equal(0)
    hx.ease.linear(1).should.equal(1)
    hx.ease.linear(0.75).should.equal(0.75)

  it 'hx.ease: quad', ->
    hx.ease.quad(0.5).should.equal(0.25)
    hx.ease.quad(0).should.equal(0)
    hx.ease.quad(1).should.equal(1)
    hx.ease.quad(0.75).should.be.closeTo(0.5625, 0.0001)

  it 'hx.ease: cubic', ->
    hx.ease.cubic(0.5).should.equal(0.125)
    hx.ease.cubic(0).should.equal(0)
    hx.ease.cubic(1).should.equal(1)
    hx.ease.cubic(0.75).should.be.closeTo(0.421875, 0.000001)

  it 'hx.transition: should call the callback the right number of times', ->
    count = 0
    end = false
    hx.transition 5, (-> count++), undefined, ->
      end = true
    clock.tick(5)
    end.should.equal(true)
    count.should.be.above(1)

  it 'hx.transition: should be fine without an end callback', ->
    count = 0
    hx.transition(5, (-> count++))
    clock.tick(5)
    count.should.be.above(1)

  it 'hx.transition: should call the callback with the right values', ->
    values = []
    cb = (d) ->
      values.push d

    hx.transition 60, cb, hx.ease.linear

    clock.tick(60)

    values.should.eql(values.slice().sort()) # check the values are ascending
    values[values.length-1].should.equal(1)


  it 'hx.transition: should call the end callback', ->
    called = false
    hx.transition 1, (->), undefined, (cancelled) ->
      cancelled.should.equal(false)
      called = true

    clock.tick(1)
    called.should.equal(true)

  it 'hx.transition: cancelling should work', ->
    can = false
    stop = hx.transition 1000, (->), undefined, (cancelled) ->
      can = cancelled

    stop()
    clock.tick(1)
    can.should.equal(true)


  it 'hx.transition: giving negative duration should result in the transition instantly finishing', (done) ->
    stop = hx.transition -1000, (->), undefined, (cancelled) ->
      cancelled.should.equal(false)
      done()

  it 'hx.transition: giving negative duration should result in the transition instantly finishing', ->
    value = -1
    hx.transition -1000, ((v) -> value = v), undefined
    clock.tick(1)
    value.should.equal(1)
